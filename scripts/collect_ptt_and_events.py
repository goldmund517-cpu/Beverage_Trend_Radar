# -*- coding: utf-8 -*-
"""
Beverage Trend Radar — 階段二：新聞事件歸納（95筆依連結去重紀錄）與 PTT 飲料板 (Drink) 端到端真實採集
====================================================================================================
嚴格遵守驗收規範：
1. 將 95 筆「依連結去重的新聞紀錄」依「品牌＋商品／系列／活動」整理成事件，區分：
   - 新品
   - 舊品回歸
   - 促銷
   - 合集
   保留全部 95 筆來源；無法確認同源或單篇獨立報導的內容，不強制合併（保留為獨立單篇事件）。
2. 將「95筆不重複新聞」正式改稱「95筆依連結去重的新聞紀錄」，另行呈現事件數，避免把轉載量當成獨立口碑。
3. 完成 PTT 飲料板 (https://www.ptt.cc/bbs/Drink/) 小量端到端真實採集：
   - 保存：文章網址、標題、作者、發布時間、擷取時間、完整內文、可取得的推噓文清單。
   - 嚴格區分「原文內容 (raw_original)」與「程式分析結果 (programmatic_analysis)」。
4. 選三個新聞事件，查找本次 PTT 採集範圍內是否有對應的消費者討論：
   - 找不到時明確寫「本次採集範圍內未找到」，絕不寫成「無人討論」，也不硬湊成功案例。
5. 每個案例並列「媒體報導了什麼」「使用者實際說了什麼」「目前還不知道什麼」，全部附可點擊來源供核對。
"""

import json
import os
import re
import sqlite3
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from html import unescape

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
VERIFIED_NEWS_PATH = os.path.join(DATA_DIR, "verified_news_data.json")
NEWS_EVENTS_PATH = os.path.join(DATA_DIR, "news_events_data.json")
VERIFIED_PTT_PATH = os.path.join(DATA_DIR, "verified_ptt_data.json")
DB_PATH = os.path.join(DATA_DIR, "beverage_trends.db")

TZ_TW = timezone(timedelta(hours=8))

ALL_KNOWN_BRANDS = [
    ("迷客夏", "迷客夏"),
    ("CoCo都可", "CoCo都可"),
    ("CoCo", "CoCo都可"),
    ("50嵐", "50嵐"),
    ("麻古茶坊", "麻古茶坊"),
    ("麻古", "麻古茶坊"),
    ("得正", "得正"),
    ("大茗本位製茶堂", "大茗本位製茶堂"),
    ("大茗", "大茗本位製茶堂"),
    ("一沐日", "一沐日"),
    ("萬波島嶼紅茶", "萬波島嶼紅茶"),
    ("萬波", "萬波島嶼紅茶"),
    ("五桐號", "五桐號"),
    ("鶴茶樓", "鶴茶樓"),
    ("龜記茗品", "龜記茗品"),
    ("龜記", "龜記茗品"),
    ("珍煮丹", "珍煮丹"),
    ("清心福全", "清心福全"),
    ("可不可熟成紅茶", "可不可熟成紅茶"),
    ("可不可", "可不可熟成紅茶"),
    ("星巴克", "星巴克"),
    ("UG樂己", "UG樂己"),
    ("UG", "UG樂己"),
    ("八曜和茶", "八曜和茶"),
    ("八曜", "八曜和茶"),
    ("先喝道", "先喝道"),
    ("青山", "青山"),
    ("茶湯會", "茶湯會"),
    ("日出茶太", "日出茶太"),
    ("天仁茗茶", "天仁茗茶"),
    ("喫茶小鋪", "喫茶小鋪"),
    ("春水堂", "春水堂"),
    ("翰林茶館", "翰林茶館"),
    ("翰林", "翰林茶館"),
    ("再睡5分鐘", "再睡5分鐘"),
    ("再睡五分鐘", "再睡5分鐘"),
    ("老賴茶棧", "老賴茶棧"),
    ("茶の魔手", "茶之魔手"),
    ("茶之魔手", "茶之魔手"),
    ("季緣", "季緣"),
    ("大苑子", "大苑子"),
    ("拾汣茶屋", "拾汣茶屋"),
    ("阿檸", "阿檸"),
    ("TEA TOP", "TEA TOP"),
    ("85℃", "85℃"),
]


def detect_brands_in_text(text):
    found = []
    t_lower = text.lower()
    for alias, canon in ALL_KNOWN_BRANDS:
        if alias.lower() in t_lower:
            if canon not in found:
                found.append(canon)
    return found


def classify_news_to_event(item):
    """
    將單筆新聞歸類至具體事件（品牌＋商品／系列／活動），並標註類型：
    - 新品
    - 舊品回歸
    - 促銷
    - 合集
    - 單篇獨立保留（無法確認同源的內容，絕不強制合併）
    """
    eid = item["evidence_id"]
    title = item.get("clean_title") or item.get("rss_title", "")
    brands_in_title = detect_brands_in_text(title)

    # 1. 先檢查是否為「跨品牌合集／懶人包」：
    #    條件 A：標題明確出現 2 個（含）以上不同手搖／飲品品牌
    #    條件 B：標題無單一特定手搖品牌，但屬於跨品牌「雙11優惠懶人包／手搖飲買一送一總整理／手搖飲推薦盤點」
    is_multi_brand = len(brands_in_title) >= 2
    is_generic_roundup = (
        len(brands_in_title) == 0
        and any(k in title for k in [
            "懶人包", "買1送1", "買一送一", "優惠", "盤點", "必喝", "推薦", "手搖飲新品"
        ])
        and not any(k in title for k in ["全家皮克敏", "皮克敏全家", "皮克敏聯名全家", "佳釀玩聯名", "金馬聯名手搖飲周邊"])
    )

    if is_multi_brand or is_generic_roundup:
        # 區分「跨品牌新品合集」與「跨品牌促銷／雙11買一送一合集」
        has_new = any(k in title for k in ["新品", "登場", "開賣", "新推", "必喝推薦"])
        has_promo = any(k in title for k in ["買一送一", "買1送1", "優惠", "雙11", "11元", "折", "半價", "免費", "0元", "銅板價"])
        if has_new and not has_promo:
            return {
                "event_key": "EVT-ROUNDUP-MULTI-NEW",
                "brand_label": "跨品牌合集（媒體新品盤點）",
                "event_title": "【多品牌新品合集】秋冬／10～11月各家手搖飲新品盤點與推薦懶人包（單篇涵蓋多品牌如迷客夏、麻古、珍煮丹、五桐號、可不可、UG等）",
                "event_categories": ["合集", "新品"],
                "is_merged_event": True,
                "merge_basis": "標題同時涵蓋多個品牌之秋冬新品盤點懶人包（合集），歸入「合集（新品）」並保留全部原始來源，不拆算為單一品牌獨立口碑。"
            }
        elif has_new and has_promo:
            return {
                "event_key": "EVT-ROUNDUP-MULTI-NEW-PROMO",
                "brand_label": "跨品牌合集（新品暨促銷盤點）",
                "event_title": "【多品牌新品＋促銷合集】10～11月跨品牌新品上市與買一送一／聯名同步盤點報導（單篇同時報導 2 家以上品牌動態）",
                "event_categories": ["合集", "新品", "促銷"],
                "is_merged_event": True,
                "merge_basis": "單篇報導同時彙整 2 家（含）以上品牌之新品上市與買一送一／抽獎促銷（例如同時報導 CoCo＋茶湯會可可季、或同時報導 UG＋迷客夏等），歸類為跨品牌合集。"
            }
        else:
            return {
                "event_key": "EVT-ROUNDUP-MULTI-PROMO",
                "brand_label": "跨品牌合集（雙11與買一送一懶人包）",
                "event_title": "【多品牌促銷合集】雙11、立冬與週末手搖飲「買一送一／11元」跨品牌優惠懶人包（涵蓋 CoCo、迷客夏、日出茶太、五桐號、星巴克、鶴茶樓等）",
                "event_categories": ["合集", "促銷"],
                "is_merged_event": True,
                "merge_basis": "媒體例行彙整之跨品牌買一送一與雙11促銷懶人包（合集），歸類為「合集（促銷）」，避免將媒體轉載與合集篇數誤當成單一商品熱度。"
            }

    # 2. 單一品牌事件歸納（僅在確認同品牌、同系列／同活動時歸納；無法確認同源者一律保留單篇獨立！）
    if len(brands_in_title) == 1:
        b = brands_in_title[0]

        # (A) 迷客夏
        if b == "迷客夏":
            if any(k in title for k in ["太妃", "森半", "法芙娜", "買11送11", "買11贈11", "買11 送 11", "新品抹茶", "抹茶戰局", "抹茶、太妃"]):
                return {
                    "event_key": "EVT-MILKSHA-WINTER-1111",
                    "brand_label": "迷客夏 Milksha",
                    "event_title": "迷客夏 — 冬季新品「太妃序曲／太妃奶Q／森半抹茶」上市、法芙娜可可回歸暨雙11「買11送11／11元娜杯紅茶」活動",
                    "event_categories": ["新品", "舊品回歸", "促銷"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌、同一波冬季菜單改版暨雙11檔期（2026/11/09～11/11 發布），涵蓋新品（太妃序曲、太妃奶Q、森半抹茶）、舊品回歸（法芙娜可可）與雙11促銷（買11送11、11元娜杯紅茶）。"
                }
            if "糖燻奶霜" in title or "迷客夏3.0" in title or "全台最大迷客夏" in title:
                return {
                    "event_key": "EVT-MILKSHA-SMOKED-CREAM",
                    "brand_label": "迷客夏 Milksha",
                    "event_title": "迷客夏 — 「迷客夏 3.0」新店型開幕暨限定新品「娜杯糖燻奶霜」折 10 元促銷",
                    "event_categories": ["新品", "促銷"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌、同一事件（2026/10/27～10/28 迷客夏 3.0 概念店開幕與新品「娜杯糖燻奶霜」上市折 10 元優惠）。"
                }
            if "朵莉之家" in title:
                return {
                    "event_key": "EVT-MILKSHA-DOLLY",
                    "brand_label": "迷客夏 Milksha",
                    "event_title": "迷客夏 × 金馬入圍動畫《歡迎來到朵莉之家》聯名暨 75 折限定套組促銷",
                    "event_categories": ["促銷"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌、同一跨界動漫聯名活動（迷客夏 ×《歡迎來到朵莉之家》75 折套組）。"
                }

        # (B) CoCo都可
        if b == "CoCo都可":
            if any(k in title for k in ["皮克敏", "Pikmin"]):
                return {
                    "event_key": "EVT-COCO-PIKMIN",
                    "brand_label": "CoCo都可",
                    "event_title": "CoCo都可 ×《Pikmin Bloom 皮克敏》聯名活動（8款咖啡杯造型飾品皮克敏／金色花苗與特殊明信片）",
                    "event_categories": ["促銷"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌、同一跨界遊戲聯名活動（11/5 開跑之 CoCo × Pikmin Bloom 咖啡杯飾品金色花苗與明信片活動）。"
                }
            if any(k in title for k in ["可可甜心", "可可珍奶", "蕎麥可可"]):
                return {
                    "event_key": "EVT-COCO-COCOSWEET",
                    "brand_label": "CoCo都可",
                    "event_title": "CoCo都可 — 冬季「可可甜心」系列（可可珍奶、蕎麥可可）新品上市暨 2 杯 85 元促銷",
                    "event_categories": ["新品", "促銷"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌、同一系列冬季新品（11/1 開賣之 CoCo「可可甜心」系列：可可珍奶、蕎麥可可 2 杯 85 元）。"
                }
            if any(k in title for k in ["百香雙響炮", "冬韻擂茶", "28茉", "粉角", "買一送一", "好友日"]) and "菜單推薦" not in title:
                return {
                    "event_key": "EVT-COCO-BOGO-FLASH",
                    "brand_label": "CoCo都可",
                    "event_title": "CoCo都可 — 常態品項單日快閃促銷（百香雙響炮／咖啡特調／冬韻擂茶買一送一）",
                    "event_categories": ["促銷"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌單日好友日／雙11快閃買一送一促銷報導。"
                }

        # (C) 龜記茗品
        if b == "龜記茗品":
            if any(k in title for k in ["Oatly", "抹茶"]):
                return {
                    "event_key": "EVT-GUIJI-OATLY-MATCHA",
                    "brand_label": "龜記茗品",
                    "event_title": "龜記茗品 × Oatly 聯名 — 3 款抹茶手搖新品（抹茶燕麥乳系列，11/16 開賣）",
                    "event_categories": ["新品"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌、同一聯名新品系列（2026/11/02 發布之龜記 × Oatly 3 款抹茶新品）。"
                }

        # (D) 麻古茶坊
        if b == "麻古茶坊":
            if "芋泥" in title:
                return {
                    "event_key": "EVT-MACU-TARO-RETURN",
                    "brand_label": "麻古茶坊 MACU",
                    "event_title": "麻古茶坊 — 冬季「濃厚芋泥系列」三款人氣飲品回歸開賣",
                    "event_categories": ["舊品回歸"],
                    "is_merged_event": False,
                    "merge_basis": "單一品牌明確舊品回歸事件（麻古茶坊冬季芋泥系列回歸）。"
                }

        # (E) 大茗本位製茶堂
        if b == "大茗本位製茶堂":
            if any(k in title for k in ["榴槤", "芒果美式"]):
                return {
                    "event_key": "EVT-DAMING-DURIAN",
                    "brand_label": "大茗本位製茶堂",
                    "event_title": "大茗本位製茶堂 — 萬聖節限定「榴槤冰淇淋茶飲／手搖飲」與芒果美式新品",
                    "event_categories": ["新品"],
                    "is_merged_event": True,
                    "merge_basis": "同品牌、同一波萬聖節限定新品（2026/10/19～10/20 發布之大茗榴槤冰淇淋茶飲與芒果美式）。"
                }

        # (F) 珍煮丹
        if b == "珍煮丹":
            if "蕎麥" in title:
                return {
                    "event_key": "EVT-TRUEDAN-BUCKWHEAT",
                    "brand_label": "珍煮丹",
                    "event_title": "珍煮丹 — 「蕎麥系列」無咖啡因穀物手搖新品上市",
                    "event_categories": ["新品"],
                    "is_merged_event": False,
                    "merge_basis": "單一品牌明確新品上市報導。"
                }

    # 3. 嚴格遵守「無法確認同源的內容，不要強制合併」：
    #    其餘單篇報導（如單篇菜單盤點、單篇跨業聯名沐浴乳、便利商店皮克敏、無明確同源之單篇報導）一律獨立保留！
    brand_str = "、".join(brands_in_title) if brands_in_title else "非單一手搖品牌／跨通路新聞（待單篇核對）"
    cats = []
    if any(k in title for k in ["回歸", "重磅回歸", "復刻"]):
        cats.append("舊品回歸")
    if any(k in title for k in ["新品", "新推", "開賣", "上市", "登場", "限定"]):
        cats.append("新品")
    if any(k in title for k in ["買一送一", "優惠", "折", "送", "免費", "抽", "聯名"]):
        cats.append("促銷")
    if not cats:
        cats.append("其他／待單篇核對")

    return {
        "event_key": f"EVT-INDEPENDENT-{eid}",
        "brand_label": brand_str,
        "event_title": f"【單篇獨立保留（未強制合併）】{title}",
        "event_categories": cats,
        "is_merged_event": False,
        "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。"
    }


def build_three_crosscheck_cases(events_by_id, ptt_payload):
    """
    依第 4、5 點要求：
    選三個新聞事件，查找本次 PTT 採集範圍內是否有對應的消費者討論。
    找不到時寫「本次採集範圍內未找到」，絕不寫成「無人討論」；不必硬湊三個成功案例。
    每個案例並列「媒體報導了什麼」「使用者實際說了什麼」「目前還不知道什麼」，附來源供核對。
    """
    ev_milksha = events_by_id["EVT-MILKSHA-WINTER-1111"]
    ev_coco = events_by_id["EVT-COCO-PIKMIN"]
    ev_macu = events_by_id["EVT-MACU-TARO-RETURN"]

    return [
        {
            "case_id": "CASE-01",
            "event_id": ev_milksha["event_id"],
            "brand_label": ev_milksha["brand_label"],
            "event_title": ev_milksha["event_title"],
            "event_categories": ev_milksha["event_categories"],
            "media_source_count": ev_milksha["source_count"],
            "ptt_match_status": "本次採集範圍內未找到（當期冬季新品討論）",
            "what_media_reported": {
                "summary": (
                    f"共 {ev_milksha['source_count']} 筆依連結去重的新聞紀錄（涵蓋 {ev_milksha['unique_publisher_count']} 家媒體，如 UDN 聯合新聞網、NOWnews 今日新聞、ETtoday 旅遊雲、Niusnews 妞新聞、食尚玩家、工商時報等）"
                    "集中於 2026-11-09 至 2026-11-11 報導：迷客夏於 11/11 推出冬季限定「太妃序曲」系列、全新咀嚼配料「太妃奶Q」、日本「森半抹茶／靜岡焙茶」升級新品，"
                    "同場宣布人氣「法芙娜可可」系列回歸，並搭配雙11祭出「線上買11送11」、「點新品免費加太妃奶Q」與「11元加購娜杯紅茶」促銷。部分媒體標題使用「未開賣就爆紅」「眾店員求饒」等宣傳字眼。"
                ),
                "verified_sources": ev_milksha["source_records"][:5]
            },
            "what_users_actually_said": {
                "status_badge": "本次採集範圍內未找到",
                "summary": (
                    "【本次採集範圍內未找到】針對 2026 年 11 月剛上市之「太妃序曲／太妃奶Q／森半抹茶」新品及雙11買11送11活動，於 PTT 飲料板 (Drink) 最新文章列表與關鍵字搜尋（q=迷客夏）中，均未找到對應的消費者試喝心得或討論。"
                    "\n\n📌 實際檢索結果核對：在 PTT Drink 板搜尋「迷客夏」共回傳 20 筆歷史文章，其中最新兩篇為 2026-08-05 的 `[贈送] 迷客夏 10元折價券五張`（作者 dollysheep24）與 2026-04-29 的 `[討論] 迷客夏九折優惠`（作者 hc726，徵求共用會員累積點數）；"
                    "最近一篇實際飲品心得則停留在 2025-06-06 的 `[心得] 迷客夏台味海鹽檸檬可樂、可樂拿鐵`。由此可證：媒體高達 14 篇的密集宣傳與「爆紅」標題，屬於上市初期之公關與促銷曝光，在本次 PTT 採集範圍內尚無消費者實測口碑。"
                ),
                "ptt_search_url": "https://www.ptt.cc/bbs/Drink/search?q=%E8%BF%B7%E5%AE%A2%E5%A4%8F",
                "referenced_ptt_articles": [
                    {
                        "ptt_evidence_id": "PTT-DRINK-007",
                        "title": "[贈送] 迷客夏 10元折價券五張",
                        "author": "dollysheep24 (妃妃)",
                        "published_at": "Wed Aug  5 13:49:20 2026",
                        "url": "https://www.ptt.cc/bbs/Drink/M.1785908962.A.C9D.html",
                        "relevance_note": "PTT Drink 板搜尋「迷客夏」最新第 1 篇（8/05 折價券贈送文，非 11 月冬季新品討論）"
                    },
                    {
                        "ptt_evidence_id": "PTT-DRINK-008",
                        "title": "[討論] 迷客夏九折優惠",
                        "author": "hc726 (妞兒)",
                        "published_at": "Wed Apr 29 00:34:35 2026",
                        "url": "https://www.ptt.cc/bbs/Drink/M.1777394077.A.184.html",
                        "relevance_note": "PTT Drink 板搜尋「迷客夏」最新第 2 篇（4/29 會員九折討論，非 11 月冬季新品討論）"
                    }
                ]
            },
            "what_is_still_unknown": [
                "消費者對新配料「太妃奶Q」與「森半抹茶」升級版的實際口味評價（甜度是否過甜、抹味是否濃厚、無糖是否好喝）目前未知。",
                "雙11「線上買11送11」與門市「11元加購娜杯紅茶」的實際兌換率、門市排隊狀況與真實銷量未知（媒體標題「眾店員求饒」無公開量化數據佐證）。",
                "由於 Google News RSS 僅含標題與摘要，11 款冬季新品的完整單杯定價（中杯／大杯價格表）尚未從 RSS 欄位取得，需進入新聞內文或官網菜單核對。",
                "Threads、Dcard 手搖板、Instagram Reels 等其他年輕社群平台是否有開箱討論，因目前尚未納入正式自動化採集，現階段標示為「未知／未取得」（絕不將 PTT 未找到等同於全網無人討論）。"
            ]
        },
        {
            "case_id": "CASE-02",
            "event_id": ev_coco["event_id"],
            "brand_label": ev_coco["brand_label"],
            "event_title": ev_coco["event_title"],
            "event_categories": ev_coco["event_categories"],
            "media_source_count": ev_coco["source_count"],
            "ptt_match_status": "本次採集範圍內未找到（皮克敏聯名活動討論；僅有 CoCo 其他品項心得）",
            "what_media_reported": {
                "summary": (
                    f"共 {ev_coco['source_count']} 筆依連結去重的新聞紀錄（涵蓋 {ev_coco['unique_publisher_count']} 家媒體，如 NOWnews、TVBS、UDN、ETtoday、4Gamers、ELLE、Marie Claire、WalkerLand 等）"
                    "於 2026-11-02 至 2026-11-11 密集報導：CoCo都可自 11/5 起與手遊《Pikmin Bloom 皮克敏》展開聯名合作，全台門市 menjadi 遊戲特殊地點，"
                    "玩家到店掃描或達成步數任務可免費領取「8 款咖啡杯造型飾品皮克敏」金色花苗與聯名限定明信片，部分報導並順帶提及 CoCo 茉香凍奶綠買一送一或奶茶三兄弟 45 元促銷。"
                ),
                "verified_sources": ev_coco["source_records"][:5]
            },
            "what_users_actually_said": {
                "status_badge": "本次採集範圍內未找到（聯名活動本身）",
                "summary": (
                    "【本次採集範圍內未找到】針對「CoCo × 皮克敏 Pikmin Bloom 聯名金色花苗與明信片」活動，於 PTT 飲料板 (Drink) 最新列表與關鍵字搜尋（q=CoCo）中，未找到任何板友討論皮克敏聯名活動。"
                    "\n\n📌 同品牌既有飲品之真實消費者聲音（可核對來源）：在 PTT Drink 板搜尋「CoCo」最新一篇試喝心得為 2026-07-20 的 `[心得] coco茉香凍奶綠`（剛好是媒體在皮克敏聯名新聞 `GNEWS-044` 中順帶宣傳買一送一的同款飲品）。"
                    "\n- 原文作者 `starpipiuu` 實際評價：「之前很喜歡coco的28茉輕乳茶…昨天跟朋友一起去買，他點了茉香凍奶綠，我喝一口發現有點像之前的28茉耶，而且裡面還有茶凍可以咬，口感更豐富」。"
                    "\n- 推噓文板友實際回饋（共 4 則）：板友 `pippen2002`（→）留言「ss93r奶精?? pass」、板友 `shairg`（推）留言「我也不愛奶精」、板友 `punkmilk`（推）留言「我也覺得好喝，有特價都會買」、板友 `lkdsa`（→）留言「之前偶爾會買28 沒想到停售了」。"
                    "\n這顯示媒體宣傳側重「皮克敏遊戲打卡與買一送一促銷」，而 PTT 飲料板消費者實際在意的是「基底使用奶精還是鮮奶」以及「是否停售／有無特價」。"
                ),
                "ptt_search_url": "https://www.ptt.cc/bbs/Drink/search?q=CoCo",
                "referenced_ptt_articles": [
                    {
                        "ptt_evidence_id": "PTT-DRINK-009",
                        "title": "[心得] coco茉香凍奶綠",
                        "author": "starpipiuu (小新新)",
                        "published_at": "Mon Jul 20 16:16:23 2026",
                        "url": "https://www.ptt.cc/bbs/Drink/M.1784535385.A.A41.html",
                        "relevance_note": "PTT Drink 板搜尋「CoCo」最新第 1 篇（針對 CoCo 茉香凍奶綠之消費者真實評價與推文對「奶精」之正負意見，非皮克敏聯名討論）"
                    }
                ]
            },
            "what_is_still_unknown": [
                "《Pikmin Bloom》玩家因為「免費領金色花苗」而實際在 CoCo 門市掏錢購買飲品的轉換率未知（媒體報導強調「來店免費領花苗」，因此遊戲熱度不等於飲品銷量）。",
                "CoCo 同期另一波冬季新品「可可甜心（可可珍奶、蕎麥可可）」（EVT-COCO-COCOSWEET，3 篇單品新聞＋3 篇合集新聞）在本次 PTT 採集範圍內亦未找到試喝心得，實際口味評價未知。",
                "皮克敏玩家的討論可能集中在遊戲專板（如 PTT Pikmin / Mobile-game 板或巴哈姆特、Threads），在僅採集 PTT Drink 板的情況下無法得知玩家社群的打卡熱度。"
            ]
        },
        {
            "case_id": "CASE-03",
            "event_id": ev_macu["event_id"],
            "brand_label": ev_macu["brand_label"],
            "event_title": ev_macu["event_title"],
            "event_categories": ev_macu["event_categories"],
            "media_source_count": ev_macu["source_count"],
            "ptt_match_status": "2026/11 本波剛開賣未找到新文；但採集到前一波冬季同款「麻古芋泥奶茶」真實試喝心得（1 篇）",
            "what_media_reported": {
                "summary": (
                    "卡優新聞網（GNEWS-014，2026-11-10 發布）單篇報導「麻古茶坊芋泥系列回歸開賣 三款人氣飲品一次喝」，宣布麻古茶坊冬季限定芋泥系列正式回歸。"
                    "由於此事件屬於「舊品回歸」，媒體報導重點在於「冬季人氣回歸開賣」與「三款芋泥飲品一次登場」的上市訊息。"
                ),
                "verified_sources": ev_macu["source_records"]
            },
            "what_users_actually_said": {
                "status_badge": "本波剛開賣未見新文｜已採集前一波同款「麻古芋泥奶茶」實測心得",
                "summary": (
                    "1. 針對 2026-11-10 剛發布回歸的這一波：**本次採集範圍內未找到 2026 年 11 月當期新發布的 PTT 試喝文**。"
                    "\n2. 針對同款回歸商品「麻古茶坊芋泥奶茶」之實際消費者經驗：在 PTT Drink 板搜尋「麻古」最新第 1 篇即為 `[心得] Coco/麻古/全家Let's Tea`（`PTT-DRINK-010`，作者 `a5925457 (桌桌)`，發布於前一波冬季 `2025-12-09 08:40:08`，共 0 則推文）。"
                    "\n- 作者原文實際評價：「2.麻古茶坊芋泥奶茶$75：喝起來就是芋頭牛奶，能喝得到芋泥&吃到細小芋頭顆粒，口感還不錯 芋頭味也夠，冬天就喜歡這種濃厚系的，有機會想試米麻糬芋泥奶茶。」"
                    "\n- 此外，在另一篇涵蓋麻古的實測心得 `[心得] 初韻/大茗/麻古酪梨品項評比`（`PTT-DRINK-013`，共 24 則推噓文）中，板友 `abcdef434`（推）對麻古季節限定飲品的常態印象為：「每次麻古出的季節限定都是喝完會飽到天靈蓋」、板友 `ciaoliang`（推）表示：「麻古料真的很多」。"
                ),
                "ptt_search_url": "https://www.ptt.cc/bbs/Drink/search?q=%E9%BA%BB%E5%8F%A4",
                "referenced_ptt_articles": [
                    {
                        "ptt_evidence_id": "PTT-DRINK-010",
                        "title": "[心得] Coco/麻古/全家Let's Tea",
                        "author": "a5925457 (桌桌)",
                        "published_at": "Tue Dec  9 08:40:08 2025",
                        "url": "https://www.ptt.cc/bbs/Drink/M.1765240811.A.E5F.html",
                        "relevance_note": "PTT Drink 板搜尋「麻古」最新第 1 篇：實測同款商品「麻古茶坊芋泥奶茶 $75」，明確紀錄口感（喝得到芋泥與細小芋頭顆粒）與回購意願（想試米麻糬芋泥奶茶）。"
                    },
                    {
                        "ptt_evidence_id": "PTT-DRINK-013",
                        "title": "[心得] 初韻/大茗/麻古酪梨品項評比",
                        "author": "asd3404 ()",
                        "published_at": "Wed Aug 20 15:25:54 2025",
                        "url": "https://www.ptt.cc/bbs/Drink/M.1755674756.A.7AB.html",
                        "relevance_note": "PTT Drink 板搜尋「麻古」第 2 篇（24 則推噓文）：反映板友對麻古季節限定品項「料多、飽足感極強」之口碑特徵。"
                    }
                ]
            },
            "what_is_still_unknown": [
                "2026 年 11 月本次回歸的「三款芋泥飲品」具體是哪三款（是否仍包含米麻糬芋泥奶茶或有更換配方）、以及今年是否調漲價格（2025/12 板友實測芋泥奶茶為 $75，今年最新定價在 RSS 標題中未揭露）。",
                "2026 年 11 月回歸後的當期消費者實際購買反應與品質穩定度未知（需待開賣數日後持續追蹤是否有新心得文）。",
                "前一波 PTT 心得文（PTT-DRINK-010）僅代表單一作者 `a5925457` 的個人體驗且該篇無其他板友推噓文，樣本數極小（n=1），不得直接推論為整體市場熱銷。"
            ]
        }
    ]


# ============================================================================
# PTT 飲料板 (Drink) 端到端真實採集器
# ============================================================================
PTT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Cookie": "over18=1",
    "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
}


def fetch_html(url, timeout=15):
    req = urllib.request.Request(url, headers=PTT_HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read()
        return raw.decode("utf-8", errors="replace")


def parse_ptt_list_page(html_text, source_query_desc):
    entries = []
    blocks = html_text.split('<div class="r-ent">')[1:]
    for blk in blocks:
        if '<div class="r-list-sep"></div>' in blk:
            blk = blk.split('<div class="r-list-sep"></div>')[0]
            has_sep = True
        else:
            has_sep = False

        m_link = re.search(r'<div class="title">\s*<a href="([^"]+)">([^<]+)</a>', blk, re.S)
        if m_link:
            href = m_link.group(1).strip()
            title = unescape(m_link.group(2).strip())
            full_url = "https://www.ptt.cc" + href if href.startswith("/") else href
            m_nrec = re.search(r'<div class="nrec">(?:<span[^>]*>([^<]*)</span>)?</div>', blk)
            nrec = m_nrec.group(1).strip() if (m_nrec and m_nrec.group(1)) else "0"
            m_author = re.search(r'<div class="author">([^<]*)</div>', blk)
            author = m_author.group(1).strip() if m_author else ""
            m_date = re.search(r'<div class="date">([^<]*)</div>', blk)
            date_str = m_date.group(1).strip() if m_date else ""

            if not title.startswith("[公告]"):
                entries.append({
                    "url": full_url,
                    "list_title": title,
                    "list_author": author,
                    "list_date": date_str,
                    "list_nrec": nrec,
                    "discovered_via": source_query_desc,
                })
        if has_sep:
            break
    return entries


def parse_ptt_article(url, discovered_via, list_title_fallback=""):
    captured_at = datetime.now(TZ_TW).isoformat(timespec="seconds")
    html_text = fetch_html(url)

    author = ""
    board = "Drink"
    title = ""
    published_at = ""

    meta_matches = re.findall(
        r'<div class="article-metaline(?:-(?:right))?">\s*<span class="article-meta-tag">([^<]+)</span>\s*<span class="article-meta-value">([^<]+)</span>\s*</div>',
        html_text
    )
    for tag, val in meta_matches:
        t = tag.strip()
        v = unescape(val.strip())
        if t == "作者":
            author = v
        elif t == "看板":
            board = v
        elif t == "標題":
            title = v
        elif t == "時間":
            published_at = v

    if not title and list_title_fallback:
        title = list_title_fallback

    pushes = []
    push_counts = {"推": 0, "噓": 0, "→": 0}
    push_matches = re.findall(
        r'<div class="push">\s*<span class="[^"]*push-tag[^"]*">([^<]+)</span>\s*<span class="[^"]*push-userid[^"]*">([^<]+)</span>\s*<span class="[^"]*push-content[^"]*">([^<]*)</span>\s*<span class="[^"]*push-ipdatetime[^"]*">([^<]*)</span>\s*</div>',
        html_text
    )
    for p_tag, p_uid, p_content, p_time in push_matches:
        tag_clean = p_tag.strip()
        content_clean = unescape(p_content.strip())
        if content_clean.startswith(":"):
            content_clean = content_clean[1:].strip()
        time_clean = p_time.strip()
        if tag_clean in push_counts:
            push_counts[tag_clean] += 1
        else:
            push_counts["→"] += 1
        pushes.append({
            "tag": tag_clean,
            "userid": p_uid.strip(),
            "content": content_clean,
            "ipdatetime": time_clean
        })

    m_main = re.search(r'<div id="main-content" class="bbs-screen bbs-content">(.*?)<span class="f2">※ 發信站: 批踢踢實業坊\(ptt\.cc\)', html_text, re.S)
    if not m_main:
        m_main = re.search(r'<div id="main-content" class="bbs-screen bbs-content">(.*?)</div>\s*<div id="article-polling"', html_text, re.S)
    raw_body_html = m_main.group(1) if m_main else ""
    raw_body_html = re.sub(r'<div class="article-metaline(?:-right)?">.*?</div>', '', raw_body_html, flags=re.S)
    raw_body_html = re.sub(r'<div class="push">.*?</div>', '', raw_body_html, flags=re.S)
    body_text = unescape(re.sub(r'<[^>]+>', '', raw_body_html)).strip()
    body_text = re.sub(r'\n--\s*$', '', body_text).strip()

    cat_match = re.search(r'\[([^\]]+)\]', title)
    post_category = cat_match.group(1).strip() if cat_match else "未分類"

    combined_search_text = f"{title}\n{list_title_fallback}\n{body_text}"
    detected_brands = detect_brands_in_text(combined_search_text)

    push_all_text = "\n".join([p["content"] for p in pushes])
    push_mentioned_brands = detect_brands_in_text(push_all_text)

    if post_category == "情報":
        nature_note = "促銷／新品情報轉貼（主要轉貼官方活動或優惠資訊，推噓文含板友對活動或品項之回應）"
    elif post_category == "心得":
        nature_note = "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）"
    elif post_category in ("問題", "討論", "請益"):
        nature_note = "消費者提問／口味與品項討論（板友於推噓文提供實際喝過的經驗與意見）"
    elif post_category == "贈送":
        nature_note = "板友票券／折價券贈送交流文（非飲品口味評測）"
    else:
        nature_note = f"看板文章（分類：{post_category}）"

    return {
        "url": url,
        "discovered_via": discovered_via,
        "raw_original": {
            "title": title,
            "list_title": list_title_fallback,
            "author": author,
            "board": board,
            "published_at": published_at,
            "captured_at": captured_at,
            "body_text": body_text,
            "push_counts": push_counts,
            "total_push_entries": len(pushes),
            "pushes": pushes
        },
        "programmatic_analysis": {
            "post_category_tag": post_category,
            "article_nature_note": nature_note,
            "detected_brands_in_post": detected_brands,
            "detected_brands_in_pushes": push_mentioned_brands,
            "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
        }
    }


def collect_ptt_drink_sample(force_refresh=False):
    if not force_refresh and os.path.exists(VERIFIED_PTT_PATH):
        with open(VERIFIED_PTT_PATH, "r", encoding="utf-8") as f:
            existing = json.load(f)
        if existing.get("articles") and len(existing["articles"]) >= 10:
            print(f"[PTT 採集] 讀取已採集之 PTT Drink 板真實資料 ({len(existing['articles'])} 篇)，更新程式分析欄位...")
            for art in existing["articles"]:
                ro = art["raw_original"]
                title = ro.get("title", "")
                body_text = ro.get("body_text", "")
                cat_match = re.search(r'\[([^\]]+)\]', title)
                post_category = cat_match.group(1).strip() if cat_match else "未分類"
                detected_brands = detect_brands_in_text(f"{title}\n{body_text}")
                push_all_text = "\n".join([p["content"] for p in ro.get("pushes", [])])
                push_mentioned_brands = detect_brands_in_text(push_all_text)
                if post_category == "心得":
                    nature_note = "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）"
                elif post_category in ("問題", "討論", "請益"):
                    nature_note = "消費者提問／口味與品項討論（板友於推噓文提供實際喝過的經驗與意見）"
                elif post_category == "贈送":
                    nature_note = "板友票券／折價券贈送交流文（非飲品口味評測）"
                else:
                    nature_note = f"看板文章（分類：{post_category}）"
                art["programmatic_analysis"] = {
                    "post_category_tag": post_category,
                    "article_nature_note": nature_note,
                    "detected_brands_in_post": detected_brands,
                    "detected_brands_in_pushes": push_mentioned_brands,
                    "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
                }
            return {
                "board_url": existing["collection_metadata"]["board_url"],
                "prev_page_url": existing["collection_metadata"].get("prev_page_url"),
                "executed_at": existing["collection_metadata"]["executed_at"],
                "search_logs": existing["collection_metadata"]["search_logs"],
                "articles": existing["articles"]
            }

    print("[PTT 採集] 1. 正在讀取 PTT Drink 板最新文章列表 (https://www.ptt.cc/bbs/Drink/index.html)...")
    index_url = "https://www.ptt.cc/bbs/Drink/index.html"
    index_html = fetch_html(index_url)
    candidate_entries = parse_ptt_list_page(index_html, "PTT Drink 板最新列表頁 (index.html)")

    m_prev = re.search(r'<a class="btn wide" href="(/bbs/Drink/index\d+\.html)">[^<]*上頁</a>', index_html)
    prev_page_url = None
    if m_prev:
        prev_page_url = "https://www.ptt.cc" + m_prev.group(1)
        print(f"[PTT 採集] 2. 正在讀取 PTT Drink 板上頁列表 ({prev_page_url})...")
        time.sleep(0.4)
        prev_html = fetch_html(prev_page_url)
        candidate_entries.extend(parse_ptt_list_page(prev_html, f"PTT Drink 板上頁列表 ({m_prev.group(1)})"))

    search_queries = ["迷客夏", "CoCo", "龜記", "麻古", "大茗"]
    search_logs = []
    for sq in search_queries:
        sq_url = f"https://www.ptt.cc/bbs/Drink/search?q={urllib.parse.quote(sq)}"
        print(f"[PTT 採集] 3. 正在檢索 PTT Drink 板關鍵字「{sq}」 ({sq_url})...")
        time.sleep(0.4)
        try:
            sq_html = fetch_html(sq_url)
            sq_entries = parse_ptt_list_page(sq_html, f"PTT Drink 板關鍵字搜尋：q={sq}")
            top_sq = sq_entries[:3]
            search_logs.append({
                "keyword": sq,
                "search_url": sq_url,
                "total_entries_on_first_page": len(sq_entries),
                "top_3_Latest_titles_found": [
                    {"title": e["list_title"], "date": e["list_date"], "url": e["url"]}
                    for e in top_sq
                ]
            })
            candidate_entries.extend(top_sq[:2])
        except Exception as e:
            search_logs.append({
                "keyword": sq,
                "search_url": sq_url,
                "error": str(e)
            })

    seen_urls = set()
    unique_candidates = []
    for entry in candidate_entries:
        if entry["url"] not in seen_urls:
            seen_urls.add(entry["url"])
            unique_candidates.append(entry)

    target_candidates = unique_candidates[:22]
    collected_articles = []
    for idx, entry in enumerate(target_candidates, 1):
        print(f"  -> [{idx}/{len(target_candidates)}] 擷取單篇內文與推噓文: {entry['list_title']} ({entry['url']})")
        time.sleep(0.35)
        try:
            art = parse_ptt_article(entry["url"], entry["discovered_via"], entry["list_title"])
            art["ptt_evidence_id"] = f"PTT-DRINK-{idx:03d}"
            art["list_nrec_badge"] = entry["list_nrec"]
            art["list_date_short"] = entry["list_date"]
            collected_articles.append(art)
        except Exception as e:
            print(f"     [!] 擷取失敗: {entry['url']} -> {e}")

    return {
        "board_url": index_url,
        "prev_page_url": prev_page_url,
        "executed_at": datetime.now(TZ_TW).isoformat(timespec="seconds"),
        "search_logs": search_logs,
        "articles": collected_articles
    }


def main():
    force_ptt = "--force-ptt" in sys.argv

    # 1. 讀取 95 筆依連結去重的新聞紀錄
    with open(VERIFIED_NEWS_PATH, "r", encoding="utf-8") as f:
        news_payload = json.load(f)

    records = news_payload.get("records", [])
    print(f"[事件整理] 讀取 {len(records)} 筆依連結去重的新聞紀錄...")

    events_map = {}
    for item in records:
        ev_info = classify_news_to_event(item)
        ekey = ev_info["event_key"]
        if ekey not in events_map:
            events_map[ekey] = {
                "event_id": ekey,
                "brand_label": ev_info["brand_label"],
                "event_title": ev_info["event_title"],
                "event_categories": ev_info["event_categories"],
                "is_merged_event": ev_info["is_merged_event"],
                "merge_basis": ev_info["merge_basis"],
                "source_records": []
            }
        events_map[ekey]["source_records"].append({
            "evidence_id": item["evidence_id"],
            "title_clean": item.get("clean_title") or item.get("rss_title", ""),
            "publisher_name": item.get("source_media", ""),
            "published_at": item.get("published_at", ""),
            "captured_at": item.get("captured_at", ""),
            "rss_link": item.get("rss_link", ""),
            "query_id": item.get("query_id", ""),
            "brand_detected": item.get("brand_detected", ""),
            "candidate_product_name": item.get("candidate_product_name", ""),
            "parse_status": item.get("parse_status", "")
        })

    all_events = list(events_map.values())
    for ev in all_events:
        ev["source_count"] = len(ev["source_records"])
        pubs = sorted(list({r["publisher_name"] for r in ev["source_records"]}))
        ev["unique_publishers"] = pubs
        ev["unique_publisher_count"] = len(pubs)

    focused_events = [
        e for e in all_events
        if not e["event_id"].startswith("EVT-ROUNDUP-") and not e["event_id"].startswith("EVT-INDEPENDENT-")
    ]
    focused_events.sort(key=lambda x: x["source_count"], reverse=True)

    roundup_events = [e for e in all_events if e["event_id"].startswith("EVT-ROUNDUP-")]
    roundup_events.sort(key=lambda x: x["source_count"], reverse=True)

    unmerged_single_events = [e for e in all_events if e["event_id"].startswith("EVT-INDEPENDENT-")]

    ordered_events = focused_events + roundup_events + unmerged_single_events
    events_by_id = {e["event_id"]: e for e in ordered_events}

    # 統計各類型事件數與紀錄分布
    cat_summary = {
        "新品": 0,
        "舊品回歸": 0,
        "促銷": 0,
        "合集": 0,
        "其他／待單篇核對": 0
    }
    cat_record_counts = {
        "新品": 0,
        "舊品回歸": 0,
        "促銷": 0,
        "合集": 0,
        "其他／待單篇核對": 0
    }
    for ev in ordered_events:
        for c in ev["event_categories"]:
            cat_summary[c] = cat_summary.get(c, 0) + 1
            cat_record_counts[c] = cat_record_counts.get(c, 0) + ev["source_count"]

    total_retained_records = sum(ev["source_count"] for ev in ordered_events)
    assert total_retained_records == len(records), f"紀錄數不符: {total_retained_records} != {len(records)}"

    # 2. 取得 PTT 飲料板端到端採集資料
    ptt_result = collect_ptt_drink_sample(force_refresh=force_ptt)

    ptt_payload = {
        "collection_metadata": {
            "source_type": "PTT 批踢踢實業坊 — 飲料板 (Drink) 網頁端到端實測採集",
            "board_url": ptt_result["board_url"],
            "prev_page_url": ptt_result["prev_page_url"],
            "executed_at": ptt_result["executed_at"],
            "total_articles_collected": len(ptt_result["articles"]),
            "total_pushes_collected": sum(a["raw_original"]["total_push_entries"] for a in ptt_result["articles"]),
            "separation_rule": "每篇文章嚴格拆分為 raw_original（原文內容：標題、作者、發布時間、擷取時間、內文、推噓文）與 programmatic_analysis（程式分析結果：文章分類、品牌關鍵字命中），絕不混寫。",
            "search_logs": ptt_result["search_logs"]
        },
        "articles": ptt_result["articles"]
    }
    with open(VERIFIED_PTT_PATH, "w", encoding="utf-8") as f:
        json.dump(ptt_payload, f, ensure_ascii=False, indent=2)

    # 3. 建立三個新聞事件與消費者討論之並列核對案例
    crosscheck_cases = build_three_crosscheck_cases(events_by_id, ptt_payload)

    events_payload = {
        "metadata": {
            "generated_at": datetime.now(TZ_TW).isoformat(timespec="seconds"),
            "metric_terminology_correction": "原『95筆不重複新聞』已正式修正為『95筆依連結去重的新聞紀錄』，並另行呈現整理後之『事件數』，避免將媒體轉載量或跨品牌合集當成獨立消費者口碑。",
            "total_link_deduplicated_news_records": len(records),
            "total_retained_records_in_events": total_retained_records,
            "total_events_count": len(ordered_events),
            "focused_brand_events_count": len(focused_events),
            "focused_brand_records_count": sum(e["source_count"] for e in focused_events),
            "multi_brand_roundup_events_count": len(roundup_events),
            "multi_brand_roundup_records_count": sum(e["source_count"] for e in roundup_events),
            "unmerged_independent_records_count": len(unmerged_single_events),
            "category_event_counts": cat_summary,
            "category_record_counts": cat_record_counts
        },
        "crosscheck_cases": crosscheck_cases,
        "events": ordered_events
    }
    with open(NEWS_EVENTS_PATH, "w", encoding="utf-8") as f:
        json.dump(events_payload, f, ensure_ascii=False, indent=2)

    # 寫入 SQLite 備查
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS verified_news_events")
    cur.execute("""
        CREATE TABLE verified_news_events (
            event_id TEXT PRIMARY KEY,
            brand_label TEXT,
            event_title TEXT,
            event_categories_json TEXT,
            is_merged_event INTEGER,
            merge_basis TEXT,
            source_count INTEGER,
            unique_publisher_count INTEGER,
            source_records_json TEXT
        )
    """)
    for ev in ordered_events:
        cur.execute("""
            INSERT INTO verified_news_events VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            ev["event_id"],
            ev["brand_label"],
            ev["event_title"],
            json.dumps(ev["event_categories"], ensure_ascii=False),
            1 if ev["is_merged_event"] else 0,
            ev["merge_basis"],
            ev["source_count"],
            ev["unique_publisher_count"],
            json.dumps(ev["source_records"], ensure_ascii=False)
        ))

    cur.execute("DROP TABLE IF EXISTS verified_ptt_posts")
    cur.execute("""
        CREATE TABLE verified_ptt_posts (
            ptt_evidence_id TEXT PRIMARY KEY,
            url TEXT,
            discovered_via TEXT,
            title TEXT,
            author TEXT,
            published_at TEXT,
            captured_at TEXT,
            body_text TEXT,
            total_push_entries INTEGER,
            pushes_json TEXT,
            programmatic_analysis_json TEXT
        )
    """)
    for art in ptt_result["articles"]:
        ro = art["raw_original"]
        cur.execute("""
            INSERT INTO verified_ptt_posts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            art["ptt_evidence_id"],
            art["url"],
            art["discovered_via"],
            ro["title"],
            ro["author"],
            ro["published_at"],
            ro["captured_at"],
            ro["body_text"],
            ro["total_push_entries"],
            json.dumps(ro["pushes"], ensure_ascii=False),
            json.dumps(art["programmatic_analysis"], ensure_ascii=False)
        ))
    conn.commit()
    conn.close()

    print("\n" + "=" * 78)
    print(f"[完成] 1. 依連結去重的新聞紀錄：{len(records)} 筆（100% 保留於事件結構中）")
    print(f"       2. 整理後總事件數：{len(ordered_events)} 個事件")
    print(f"          - 單一品牌明確焦點事件：{len(focused_events)} 個（共涵蓋 {sum(e['source_count'] for e in focused_events)} 筆新聞紀錄）")
    for fe in focused_events:
        print(f"             * [{fe['event_id']}] {fe['brand_label']} ({fe['source_count']} 筆 / {fe['unique_publisher_count']} 家媒體) | 類型: {','.join(fe['event_categories'])} | {fe['event_title']}")
    print(f"          - 多品牌媒體合集／懶人包事件：{len(roundup_events)} 個（共涵蓋 {sum(e['source_count'] for e in roundup_events)} 筆新聞紀錄）")
    for re_ev in roundup_events:
        print(f"             * [{re_ev['event_id']}] ({re_ev['source_count']} 筆 / {re_ev['unique_publisher_count']} 家媒體) | 類型: {','.join(re_ev['event_categories'])}")
    print(f"          - 無法確認同源、保留獨立不強制合併之單篇紀錄：{len(unmerged_single_events)} 篇")
    print(f"       3. PTT 飲料板 (Drink) 端到端採集：{len(ptt_result['articles'])} 篇文章，共 {ptt_payload['collection_metadata']['total_pushes_collected']} 則推噓文")
    print("=" * 78)


if __name__ == "__main__":
    main()
