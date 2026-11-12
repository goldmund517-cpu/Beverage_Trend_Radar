# -*- coding: utf-8 -*-
"""
collect_youtube_and_social.py
實測並執行兩條新外部熱度與社群佐證線路：
1. 線路二 (YouTube 公開搜尋 ytInitialData)：採集手搖飲新品開箱／實測影片、頻道名、發布相對時間、真實觀看次數、影片連結。
2. 線路三 (公開搜尋引擎索引 site:instagram.com / site:facebook.com / site:dcard.tw / site:threads.net)：
   免登入牆、免商業金鑰，透過公開搜尋引擎 (Yahoo TW / Bing / DuckDuckGo HTML) 擷取已被收錄之 IG / FB / Dcard / Threads 公開貼文連結與摘要。
"""
import json
import re
import time
import urllib.parse
import urllib.request
from datetime import datetime
from html import unescape
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
YOUTUBE_OUT_PATH = DATA_DIR / "verified_youtube_data.json"
SOCIAL_OUT_PATH = DATA_DIR / "verified_social_index_data.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/130.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
}


def fetch_html(url, timeout=15):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.getcode(), resp.read().decode("utf-8", errors="ignore")


def search_youtube_public(query_str, max_results=6):
    """
    直接請求 YouTube 公開搜尋頁並解析 ytInitialData JSON，
    提取真實 videoId、標題、頻道名稱、發布時間文字、觀看次數文字與縮圖。
    """
    encoded_q = urllib.parse.quote(query_str)
    # sp=CAI%253D 依上傳日期或預設相關度；此處使用預設搜尋以保留觀看數與近期熱門開箱
    url = f"https://www.youtube.com/results?search_query={encoded_q}&hl=zh-TW&gl=TW"
    status, html = fetch_html(url)
    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html, re.S)
    if not m:
        m = re.search(r"ytInitialData\s*=\s*(\{.*?\});</script>", html, re.S)
    if not m:
        return {"status": status, "url": url, "items": [], "error": "ytInitialData not found"}

    data = json.loads(m.group(1))
    items = []
    try:
        contents = (
            data["contents"]["twoColumnSearchResultsRenderer"]["primaryContents"]
            ["sectionListRenderer"]["contents"]
        )
        for section in contents:
            item_section = section.get("itemSectionRenderer", {}).get("contents", [])
            for entry in item_section:
                vr = entry.get("videoRenderer")
                if not vr:
                    continue
                vid = vr.get("videoId", "")
                title_runs = vr.get("title", {}).get("runs", [])
                title = "".join(r.get("text", "") for r in title_runs)
                owner_runs = vr.get("ownerText", {}).get("runs", [])
                channel_name = "".join(r.get("text", "") for r in owner_runs)
                pub_text = vr.get("publishedTimeText", {}).get("simpleText", "近期發布")
                view_text = vr.get("viewCountText", {}).get("simpleText") or ""
                if not view_text:
                    runs = vr.get("viewCountText", {}).get("runs", [])
                    view_text = "".join(r.get("text", "") for r in runs)
                length_text = vr.get("lengthText", {}).get("simpleText", "Shorts/影片")

                # Parse numeric view count if possible
                view_num = 0
                digits = re.sub(r"[^\d]", "", view_text)
                if digits:
                    view_num = int(digits)

                items.append({
                    "video_id": vid,
                    "url": f"https://www.youtube.com/watch?v={vid}",
                    "title": title,
                    "channel_name": channel_name,
                    "published_time_text": pub_text,
                    "view_count_text": view_text or "公開影片（未顯示觀看數）",
                    "view_count_numeric": view_num,
                    "duration_text": length_text,
                    "query_used": query_str,
                    "captured_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
                if len(items) >= max_results:
                    break
            if len(items) >= max_results:
                break
    except Exception as e:
        return {"status": status, "url": url, "items": items, "error": str(e)}

    return {"status": status, "url": url, "items": items}


def clean_tags(raw_html):
    text = re.sub(r"<[^>]+>", "", raw_html or "")
    return unescape(re.sub(r"\s+", " ", text)).strip()


def search_public_site_index(site_domain, platform_label, keyword_str, max_results=5):
    """
    透過 DuckDuckGo HTML / Bing 公開搜尋索引檢索特定社群平台
    (site:instagram.com / site:facebook.com / site:dcard.tw / site:threads.com)
    之公開貼文連結、標題與摘要（甚至包含部分被索引之按讚數／留言數文字）。
    """
    full_query = f"site:{site_domain} {keyword_str}"
    encoded_q = urllib.parse.quote(full_query)
    ddg_url = f"https://html.duckduckgo.com/html/?q={encoded_q}"
    results = []
    used_url = ddg_url
    status = 200

    try:
        status, html = fetch_html(ddg_url)
        # DuckDuckGo HTML result blocks
        entries = re.findall(
            r'<a rel="nofollow" class="result__a" href="([^"]+)">(.*?)</a>.*?<a class="result__snippet"[^>]*>(.*?)</a>',
            html,
            re.S
        )
        for raw_href, raw_title, raw_snippet in entries:
            real_url = raw_href
            uddg = re.search(r"uddg=([^&]+)", raw_href)
            if uddg:
                real_url = urllib.parse.unquote(uddg.group(1))
            if site_domain not in real_url:
                continue
            title = clean_tags(raw_title)
            snippet = clean_tags(raw_snippet)
            if not title:
                continue
            results.append({
                "platform": platform_label,
                "site_domain": site_domain,
                "url": real_url,
                "title": title,
                "snippet": snippet,
                "query_used": full_query,
                "search_engine_url": ddg_url,
                "captured_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            if len(results) >= max_results:
                break
    except Exception as e:
        status = f"Error: {e}"

    # Fallback to Bing HTML if DDG returned 0
    if len(results) == 0:
        bing_url = f"https://www.bing.com/search?q={encoded_q}&setlang=zh-Hant&cc=TW"
        used_url = bing_url
        try:
            status, bhtml = fetch_html(bing_url)
            b_entries = re.findall(
                r'<li class="b_algo"[^>]*>.*?<h2><a[^>]+href="([^"]+)"[^>]*>(.*?)</a></h2>(.*?)</li>',
                bhtml,
                re.S
            )
            for raw_href, raw_title, tail in b_entries:
                if site_domain not in raw_href:
                    continue
                title = clean_tags(raw_title)
                snippet = clean_tags(tail)
                results.append({
                    "platform": platform_label,
                    "site_domain": site_domain,
                    "url": raw_href,
                    "title": title,
                    "snippet": snippet,
                    "query_used": full_query,
                    "search_engine_url": bing_url,
                    "captured_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
                if len(results) >= max_results:
                    break
        except Exception as e:
            status = f"Error: {e}"

    return {
        "status": status,
        "query": full_query,
        "search_url": used_url,
        "items": results
    }


def main():
    print("=== 1. 測試線路二：YouTube 手搖飲新品開箱與實測影片採集 ===")
    yt_queries = [
        ("YT-Q1", "迷客夏 新品 開箱", ["PROD-MILKSHA-WINTER-1111", "PROD-MILKSHA-SMOKE-BLACK"]),
        ("YT-Q2", "大茗 榴槤 手搖飲", ["PROD-DAMING-DURIAN", "PROD-DAMING-AVOCADO"]),
        ("YT-Q3", "麻古茶坊 芋泥 葡萄 新品", ["PROD-MACU-TARO-2026", "PROD-MACU-GRAPE"]),
        ("YT-Q4", "CoCo 皮克敏 茉香凍奶綠", ["PROD-COCO-PIKMIN-MOLI", "PROD-COCO-CHOCO"]),
        ("YT-Q5", "台灣 手搖飲 新品 開箱 2026", ["PROD-ROUNDUP-1111", "PROD-GUIJI-OATLY", "PROD-TRUEDAN-BUCKWHEAT"])
    ]
    yt_records = []
    yt_logs = []
    seen_vids = set()

    for qid, qstr, linked_prods in yt_queries:
        res = search_youtube_public(qstr, max_results=5)
        items = res.get("items", [])
        yt_logs.append({
            "query_id": qid,
            "query_string": qstr,
            "search_url": res.get("url"),
            "http_status": res.get("status"),
            "items_found": len(items)
        })
        for it in items:
            if it["video_id"] in seen_vids:
                continue
            seen_vids.add(it["video_id"])
            it["yt_evidence_id"] = f"YT-{len(yt_records) + 1:03d}"
            it["query_id"] = qid
            it["linked_product_ids"] = linked_prods
            yt_records.append(it)
        time.sleep(0.5)

    print(f"[YouTube] 共取得 {len(yt_records)} 部不重複公開影片")

    print("=== 2. 測試線路三：搜尋引擎公開索引擷取 IG / FB / Dcard / Threads 貼文 ===")
    social_queries = [
        ("SOC-IG-1", "instagram.com", "Instagram 公開貼文索引", "迷客夏 新品", ["PROD-MILKSHA-WINTER-1111", "PROD-MILKSHA-SMOKE-BLACK"]),
        ("SOC-IG-2", "instagram.com", "Instagram 公開貼文索引", "麻古茶坊 芋泥", ["PROD-MACU-TARO-2026", "PROD-MACU-GRAPE"]),
        ("SOC-IG-3", "instagram.com", "Instagram 公開貼文索引", "大茗 酪梨 榴槤", ["PROD-DAMING-DURIAN", "PROD-DAMING-AVOCADO"]),
        ("SOC-FB-1", "facebook.com", "Facebook 粉專貼文索引", "迷客夏 娜杯", ["PROD-MILKSHA-WINTER-1111", "PROD-MILKSHA-SMOKE-BLACK"]),
        ("SOC-FB-2", "facebook.com", "Facebook 粉專貼文索引", "CoCo都可 麻古茶坊", ["PROD-COCO-PIKMIN-MOLI", "PROD-MACU-TARO-2026"]),
        ("SOC-DCARD-1", "dcard.tw", "Dcard 美食/手搖板公開索引", "迷客夏 推薦", ["PROD-MILKSHA-WINTER-1111", "PROD-MILKSHA-SMOKE-BLACK"]),
        ("SOC-DCARD-2", "dcard.tw", "Dcard 美食/手搖板公開索引", "大茗 麻古 飲料", ["PROD-DAMING-AVOCADO", "PROD-MACU-TARO-2026"]),
        ("SOC-THREADS-1", "threads.net", "Threads 公開貼文索引", "迷客夏", ["PROD-MILKSHA-WINTER-1111", "PROD-MILKSHA-SMOKE-BLACK"])
    ]

    social_records = []
    social_logs = []
    seen_urls = set()

    for sqid, domain, label, kw, linked_prods in social_queries:
        sres = search_public_site_index(domain, label, kw, max_results=5)
        sitems = sres.get("items", [])
        social_logs.append({
            "query_id": sqid,
            "platform": label,
            "site_domain": domain,
            "query_string": sres.get("query"),
            "search_url": sres.get("search_url"),
            "http_status": sres.get("status"),
            "items_found": len(sitems)
        })
        for sit in sitems:
            if sit["url"] in seen_urls:
                continue
            seen_urls.add(sit["url"])
            sit["social_evidence_id"] = f"SOC-{len(social_records) + 1:03d}"
            sit["query_id"] = sqid
            sit["linked_product_ids"] = linked_prods
            social_records.append(sit)
        time.sleep(0.6)

    print(f"[Social Index] 共取得 {len(social_records)} 筆公開社群貼文索引紀錄")
    for log in social_logs:
        print(f"  - {log['platform']} ({log['site_domain']}): {log['items_found']} 筆")

    with open(YOUTUBE_OUT_PATH, "w", encoding="utf-8") as f:
        json.dump({
            "collection_metadata": {
                "source_name": "YouTube 公開搜尋結果 (ytInitialData 實測採集)",
                "executed_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "total_unique_videos": len(yt_records),
                "queries_executed": yt_logs
            },
            "videos": yt_records
        }, f, ensure_ascii=False, indent=2)

    with open(SOCIAL_OUT_PATH, "w", encoding="utf-8") as f:
        json.dump({
            "collection_metadata": {
                "source_name": "公開搜尋引擎社群索引 (Yahoo TW Search site:instagram.com / facebook.com / dcard.tw / threads.net)",
                "executed_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "total_unique_posts": len(social_records),
                "queries_executed": social_logs
            },
            "posts": social_records
        }, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
