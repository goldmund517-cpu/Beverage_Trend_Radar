# -*- coding: utf-8 -*-
"""
build_product_catalog.py
將已驗證之 Google News RSS (95筆依連結去重紀錄 / 20個事件) 與 PTT 飲料板 (14篇文章 / 79則推噓文)
接回「以商品為主」的趨勢觀察工作流，建立多對多證據關聯與真實觀察期間分組（不補造歷史、不填入模擬分數）。
"""
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
VERIFIED_NEWS_PATH = DATA_DIR / "verified_news_data.json"
NEWS_EVENTS_PATH = DATA_DIR / "news_events_data.json"
VERIFIED_PTT_PATH = DATA_DIR / "verified_ptt_data.json"
OUTPUT_PRODUCTS_PATH = DATA_DIR / "verified_products_data.json"


def build_product_catalog():
    with open(VERIFIED_NEWS_PATH, "r", encoding="utf-8") as f:
        news_data = json.load(f)
    with open(NEWS_EVENTS_PATH, "r", encoding="utf-8") as f:
        events_data = json.load(f)
    with open(VERIFIED_PTT_PATH, "r", encoding="utf-8") as f:
        ptt_data = json.load(f)

    news_by_id = {r["evidence_id"]: r for r in news_data.get("records", [])}
    events_by_id = {e["event_id"]: e for e in events_data.get("events", [])}
    ptt_by_id = {p["ptt_evidence_id"]: p for p in ptt_data.get("articles", [])}

    def get_event_record_ids(ev_id):
        ev = events_by_id.get(ev_id, {})
        return [r["evidence_id"] for r in ev.get("source_records", [])]

    raw_products = [
        {
            "product_id": "PROD-MILKSHA-WINTER-1111",
            "region": "台灣",
            "brand": "迷客夏 Milksha",
            "product_name": "冬季「太妃序曲（太妃奶Q）／森半抹茶」系列 ＆ 法芙娜可可回歸",
            "short_word": "迷客夏・太妃奶Q與森半抹茶",
            "item_types": ["新品", "舊品回歸", "促銷"],
            "info_status": "⏳ 單杯原價待內文確認（促銷價已確認）",
            "is_pending_confirm": True,
            "flavor_category": "奶茶／抹茶／可可",
            "price_promo": "雙11線上買11送11、點新品免費加「太妃奶Q」、11元加購娜杯紅茶（⏳ 11款單杯原價待由內文或官網確認）",
            "observation_weeks": ["2026-W46"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-11 13:30:33",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-MILKSHA-WINTER-1111"),
            "roundup_news_ids": ["GNEWS-004", "GNEWS-007", "GNEWS-008", "GNEWS-010", "GNEWS-019", "GNEWS-026", "GNEWS-027"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-007", "PTT-DRINK-008"],
            "media_summary": "14 筆單品專文＋7 筆跨品牌合集（共 21 筆紀錄）密集於 11/09～11/11 報導：迷客夏推出冬季限定「太妃序曲」與全新咀嚼配料「太妃奶Q」、日本森半抹茶與焙茶升級，同場回歸「法芙娜可可」，並祭出雙11線上買11送11與11元加購娜杯紅茶。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】上市初期雖有高達 21 筆媒體報導（部分標題稱「未開賣就爆紅」），但 PTT Drink 板最新搜尋僅有 8/05 折價券贈送文与 4/29 九折優惠討論，尚無 11 月冬季新品試喝心得。",
            "unknowns": [
                "消費者對新配料「太妃奶Q」與「森半抹茶」升級版的實際甜度、口感評價目前未知。",
                "雙11線上買11送11與門市11元加購紅茶之實際兌換率與門市排隊狀況無公開量化數據。",
                "11 款冬季新品的完整單杯原價尚未從 RSS 標題取得，需開啟新聞內文或官網菜單核對。"
            ]
        },
        {
            "product_id": "PROD-COCO-PIKMIN-MOLI",
            "region": "台灣",
            "brand": "CoCo都可",
            "product_name": "《Pikmin Bloom 皮克敏》聯名活動 ＆ 茉香凍奶綠／奶茶三兄弟促銷",
            "short_word": "CoCo・皮克敏聯名與茉香凍奶綠",
            "item_types": ["促銷"],
            "info_status": "✅ 活動機制與促銷價已確認",
            "is_pending_confirm": False,
            "flavor_category": "果茶／奶茶／跨界聯名",
            "price_promo": "來店免費領8款咖啡杯皮克敏金色花苗與明信片；茉香凍奶綠買一送一／2杯60元、奶茶三兄弟45元",
            "observation_weeks": ["2026-W46", "2026-W45"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-11 13:57:18",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-COCO-PIKMIN"),
            "roundup_news_ids": ["GNEWS-045", "GNEWS-047", "GNEWS-051"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-009"],
            "media_summary": "17 筆專文＋3 筆合集（共 20 筆紀錄）報導 CoCo 自 11/5 起與手遊《Pikmin Bloom》聯名，全台門市開放掃描領取 8 款咖啡杯飾品皮克敏金色花苗與明信片，並搭配茉香凍奶綠買一送一與奶茶三兄弟 45 元促銷。",
            "consumer_summary": "【聯名活動本身 PTT 討論：本次採集範圍內未找到】但同波促銷飲品「茉香凍奶綠」已採集到 PTT 實測心得（PTT-DRINK-009）：作者讚賞茉莉茶香搭茶凍口感豐富像 28 茉輕乳茶，惟推文有 2 位板友因「使用奶精基底」表示 pass，另有板友表示特價時會買。",
            "unknowns": [
                "玩家因免費領取金色花苗而實際在門市消費購買飲品的轉換率未知。",
                "皮克敏玩家的打卡討論可能集中於遊戲專板或 Threads，在 PTT Drink 板未見聯名討論。"
            ]
        },
        {
            "product_id": "PROD-COCO-COCOSWEET",
            "region": "台灣",
            "brand": "CoCo都可",
            "product_name": "冬季「可可甜心」系列（可可珍奶、蕎麥可可）",
            "short_word": "CoCo・可可珍奶與蕎麥可可",
            "item_types": ["新品", "促銷"],
            "info_status": "⏳ 單杯原價待確認（任選2杯85元已確認）",
            "is_pending_confirm": True,
            "flavor_category": "可可／穀物蕎麥",
            "price_promo": "可可珍奶、蕎麥可可任選 2 杯 85 元；日焙珍珠奶茶買一送一大杯 32.5 元（⏳ 單杯原價待內文確認）",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-31 15:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-COCO-COCOSWEET"),
            "roundup_news_ids": ["GNEWS-060", "GNEWS-064", "GNEWS-065"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-009", "PTT-DRINK-010"],
            "media_summary": "3 筆單品專文＋3 筆巧克力季跨品牌合集（共 6 筆紀錄）報導 CoCo 於 11/1 推出冬季「可可甜心」系列，主打「可可珍奶」與無咖啡因穀物風味「蕎麥可可」雙口味，享任選 2 杯 85 元優惠。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板目前尚未出現「可可甜心／蕎麥可可」之試喝文；既有 CoCo 冬季濃厚系心得（PTT-DRINK-010）則對週一特價 49 元之「酪梨奶昔杯杯」給予高CP值正面評價。",
            "unknowns": [
                "「蕎麥可可」與「可可珍奶」的實際甜度、可可濃度及是否使用奶精或鮮奶尚未有 PTT 板友實測回報。"
            ]
        },
        {
            "product_id": "PROD-MILKSHA-SMOKED-CREAM",
            "region": "台灣",
            "brand": "迷客夏 Milksha",
            "product_name": "「迷客夏 3.0」概念店＆秋季新品「娜杯糖燻奶霜」",
            "short_word": "迷客夏・娜杯糖燻奶霜",
            "item_types": ["新品", "促銷"],
            "info_status": "⏳ 單杯原價待內文確認（折10元／2杯99元已確認）",
            "is_pending_confirm": True,
            "flavor_category": "鮮奶茶／奶蓋",
            "price_promo": "新品「娜杯糖燻奶霜」全台折 10 元、鮮奶茶 2 杯 99 元（⏳ 單杯原價待確認）",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-28 15:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-MILKSHA-SMOKED-CREAM"),
            "roundup_news_ids": ["GNEWS-072"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-007"],
            "media_summary": "3 筆單品專文＋1 筆秋季新品合集（共 4 筆紀錄）報導迷客夏 3.0 新店型開幕（設試聞茶瓶體驗），同步推出秋季新品「娜杯糖燻奶霜」表面呈現乳牛斑點炙燒糖燻視覺，享全台折 10 元優惠。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板在本次採集範圍內未見「娜杯糖燻奶霜」之消費者開箱或甜度回饋。",
            "unknowns": [
                "炙燒糖燻奶霜的實際煙燻風味接受度與攪勻後甜度表現目前未知。"
            ]
        },
        {
            "product_id": "PROD-MILKSHA-DOLLY",
            "region": "台灣",
            "brand": "迷客夏 Milksha",
            "product_name": "金馬入圍動畫《歡迎來到朵莉之家》聯名限定套組",
            "short_word": "迷客夏・朵莉之家聯名套組",
            "item_types": ["促銷"],
            "info_status": "⏳ 套組品項明細待內文確認",
            "is_pending_confirm": True,
            "flavor_category": "跨界聯名",
            "price_promo": "獨家聯名優惠套組 75 折（⏳ 套組搭配飲品與周邊單價待內文確認）",
            "observation_weeks": ["2026-W44", "2026-W43"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-28 15:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-MILKSHA-DOLLY"),
            "roundup_news_ids": ["GNEWS-068"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "media_summary": "3 筆專文＋1 筆金馬手搖周邊報導（共 4 筆紀錄）指出迷客夏攜手台灣原創金馬入圍動畫《歡迎來到朵莉之家》，推出獨家 75 折限定飲品套組與應援周邊。",
            "consumer_summary": "【當期活動 PTT 討論：本次採集範圍內未找到】PTT Drink 板未見相關聯名套組討論。",
            "unknowns": [
                "75 折限定套組的實際指定飲品組合與門市兌換熱度待查。"
            ]
        },
        {
            "product_id": "PROD-DAMING-DURIAN",
            "region": "台灣",
            "brand": "大茗本位製茶堂",
            "product_name": "萬聖節限定「榴槤冰淇淋茶飲（榴槤奶茶／紅玉）」與芒果美式",
            "short_word": "大茗・榴槤冰淇淋茶飲與玉露青",
            "item_types": ["新品", "促銷"],
            "info_status": "⏳ 單杯原價待確認（限時79折已確認）",
            "is_pending_confirm": True,
            "flavor_category": "果茶／特調獵奇",
            "price_promo": "萬聖節限定只賣 3 天、新品限時 79 折（⏳ 單杯原價待內文確認）",
            "observation_weeks": ["2026-W46", "2026-W43"],
            "primary_week": "2026-W43",
            "latest_published_at": "2026-11-07 23:28:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-DAMING-DURIAN"),
            "roundup_news_ids": ["GNEWS-079", "GNEWS-089"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": ["PTT-DRINK-013"],
            "historical_ref_ptt_ids": ["PTT-DRINK-014"],
            "media_summary": "2 筆單品專文＋2 筆跨品牌合集（共 4 筆紀錄）報導大茗於萬聖節推出獵奇限定「榴槤冰淇淋手搖飲（榴槤奶茶、紅玉紅茶）」只賣 3 天享 79 折，並同步上市「芒果美式」。",
            "consumer_summary": "【榴槤新品 PTT 討論：本次採集範圍內未找到】但舊文 `PTT-DRINK-013`（大茗/麻古酪梨評比，24則推文）於當期 11/07 新增 2 則推文，板友 `pkmu8426` 盛讚「大茗的玉露青 終於找到順口有喉韻的口感了，根本就是一沐日沒換茶葉時的水準」；另 `PTT-DRINK-014` 討論大茗草莓優格飲與翡翠莓香好喝但偏貴。",
            "unknowns": [
                "萬聖節 3 天限定「榴槤冰淇淋茶飲」與常態新品「芒果美式」的消費者實際試喝評價未知。",
                "注意區分：11/07 新增之 2 則 PTT 推文為針對大茗常態基底「玉露青」與「酪梨奶蓋」之回饋，已嚴格標示為「舊文近期新增推文」，不混算為榴槤新品討論。"
            ]
        },
        {
            "product_id": "PROD-GUIJI-OATLY-MATCHA",
            "region": "台灣",
            "brand": "龜記茗品",
            "product_name": "龜記 × Oatly 聯名「3 款抹茶手搖新品（抹茶燕麥乳系列）」",
            "short_word": "龜記・Oatly抹茶燕麥乳",
            "item_types": ["新品"],
            "info_status": "⏳ 11/16開賣・3款完整品名與定價待內文確認",
            "is_pending_confirm": True,
            "flavor_category": "抹茶／燕麥奶",
            "price_promo": "預計 11/16 開賣，聯手 Oatly 燕麥奶主打乳糖不耐友善（⏳ 3款完整品名與單杯定價待確認）",
            "observation_weeks": ["2026-W45"],
            "primary_week": "2026-W45",
            "latest_published_at": "2026-11-02 16:28:22",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-GUIJI-OATLY-MATCHA"),
            "roundup_news_ids": [],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-011", "PTT-DRINK-012"],
            "media_summary": "2 筆單品專文（卡優新聞網、COOL-STYLE）於 11/02 預告龜記將推出 3 款抹茶系列新品，並聯手 Oatly 推出「抹茶燕麥乳」，預計 11/16 正式開賣。",
            "consumer_summary": "【當期新品 PTT 討論：11/16 才開賣，本次採集範圍內未找到】同品牌歷史 PTT 討論呈現兩極：7/08 `PTT-DRINK-011` 推薦「雷夢蘆薈蜜」不另加糖酸甜解膩；但 4/20 `PTT-DRINK-012`（20 則推文）針對「紅柚翡翠」改用調合果汁罐且未標示含糖引發板友強烈負評。",
            "unknowns": [
                "商品於 11/16 才正式開賣，目前尚無任何消費者試喝體驗。",
                "3 款抹茶新品的完整品名與售價區間需開啟新聞內文或待官方公布菜單確認。"
            ]
        },
        {
            "product_id": "PROD-MACU-TARO-RETURN",
            "region": "台灣",
            "brand": "麻古茶坊 MACU",
            "product_name": "冬季「濃厚芋泥系列」三款人氣飲品回歸開賣",
            "short_word": "麻古・濃厚芋泥系列回歸",
            "item_types": ["舊品回歸"],
            "info_status": "⏳ 2026本波3款品名與最新定價待確認（前波芋泥奶茶$75）",
            "is_pending_confirm": True,
            "flavor_category": "芋泥／鮮奶茶",
            "price_promo": "前一波 PTT 實測芋泥奶茶 NT$75（⏳ 2026/11 本波回歸之三款完整品名與最新定價待確認）",
            "observation_weeks": ["2026-W46"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-11 13:12:25",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-MACU-TARO-RETURN"),
            "roundup_news_ids": ["GNEWS-004"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": ["PTT-DRINK-013"],
            "historical_ref_ptt_ids": ["PTT-DRINK-010"],
            "media_summary": "1 筆單品專文（卡優新聞網 `GNEWS-014`）＋1 筆雙11合集（`GNEWS-004`）報導麻古茶坊於 11/10 宣布冬季人氣「濃厚芋泥系列」三款飲品正式回歸。",
            "consumer_summary": "【本波 11/10 剛開賣未見新文｜已採集前一波同款「麻古芋泥奶茶」實測心得】`PTT-DRINK-010` 作者實測「麻古茶坊芋泥奶茶 $75：能喝得到芋泥&吃到細小芋頭顆粒，芋頭味夠，想試米麻糬芋泥奶茶」；另 `PTT-DRINK-013` 多位板友推文肯定麻古季節限定「料多、飽到天靈蓋」。",
            "unknowns": [
                "2026/11 本波回歸的三款飲品具體品名與是否調漲價格（相較 2025/12 的 $75）尚待確認。",
                "本波回歸後的當期消費者新試喝心得尚待開賣後追蹤。"
            ]
        },
        {
            "product_id": "PROD-MACU-GRAPE",
            "region": "台灣",
            "brand": "麻古茶坊 MACU",
            "product_name": "「巨峰葡萄系列」回歸 ＆ 萬聖節限定紙杯",
            "short_word": "麻古・巨峰葡萄系列",
            "item_types": ["舊品回歸", "促銷"],
            "info_status": "⏳ 單杯定價與詳細品項待內文確認",
            "is_pending_confirm": True,
            "flavor_category": "果茶（葡萄）",
            "price_promo": "搭配萬聖節限定紙杯開賣（⏳ 單杯定價待內文確認）",
            "observation_weeks": ["2026-W43"],
            "primary_week": "2026-W43",
            "latest_published_at": "2026-10-20 15:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": [],
            "roundup_news_ids": ["GNEWS-080", "GNEWS-092", "GNEWS-094", "GNEWS-095"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-013"],
            "media_summary": "4 筆跨品牌新品與促銷合集（NOWnews、玩咖Playing、中天、造咖）於 10/13～10/20 報導麻古茶坊「巨峰葡萄系列」回歸並換上萬聖節限定紙杯。",
            "consumer_summary": "【當期品項 PTT 討論：本次採集範圍內未找到】PTT Drink 板在本次採集範圍內未見巨峰葡萄系列之試喝文。",
            "unknowns": [
                "由於 4 筆新聞均為多品牌合集報導，巨峰葡萄系列的具體子品名（如芝芝葡萄或葡萄果粒茶）與單價需開啟內文確認。"
            ]
        },
        {
            "product_id": "PROD-TRUEDAN-BUCKWHEAT",
            "region": "台灣",
            "brand": "珍煮丹",
            "product_name": "秋季「蕎麥系列」3 款無咖啡因穀物新品",
            "short_word": "珍煮丹・蕎麥系列3新品",
            "item_types": ["新品"],
            "info_status": "⏳ 3款完整品名與單杯定價待內文確認",
            "is_pending_confirm": True,
            "flavor_category": "穀物蕎麥／無咖啡因",
            "price_promo": "⏳ 3款完整品名與單杯定價待由新聞內文確認",
            "observation_weeks": ["2026-W46", "2026-W44", "2026-W43"],
            "primary_week": "2026-W43",
            "latest_published_at": "2026-11-11 13:12:25",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": [],
            "roundup_news_ids": ["GNEWS-004", "GNEWS-072", "GNEWS-080", "GNEWS-081"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "media_summary": "4 筆跨品牌合集報導（ETtoday、Yahoo、玩咖Playing、NOWnews）於 10/20～11/11 提及珍煮丹開賣秋季「蕎麥系列」3 款新品，並參與雙11優惠。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板未見珍煮丹蕎麥系列討論（但同期間 `PTT-DRINK-010` 板友提及全家金焙蕎麥醇奶茶好喝，顯示蕎麥茶底具討論熱度）。",
            "unknowns": [
                "珍煮丹 3 款蕎麥新品的完整品名、配料與價格待進入內文確認。"
            ]
        },
        {
            "product_id": "PROD-TPTEA-COCOA",
            "region": "台灣",
            "brand": "茶湯會",
            "product_name": "冬季「茶韻可可系列」3 款可可拿鐵新品",
            "short_word": "茶湯會・茶韻可可3新品",
            "item_types": ["新品", "促銷"],
            "info_status": "⏳ 3款完整品名與單杯定價待內文確認",
            "is_pending_confirm": True,
            "flavor_category": "可可／拿鐵",
            "price_promo": "3 款可可拿鐵享限時折扣優惠（⏳ 單杯原價與折扣金額待內文確認）",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-31 15:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": [],
            "roundup_news_ids": ["GNEWS-060", "GNEWS-064", "GNEWS-065"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "media_summary": "3 筆巧克力季跨品牌合集（網路溫度計、食尚玩家、UDN）於 10/29～10/31 同步報導茶湯會推出「茶韻可可系列」3 款可可拿鐵新品並祭出限時優惠。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板在本次採集範圍內未見茶湯會茶韻可可系列試喝文。",
            "unknowns": [
                "3 款茶韻可可拿鐵分別搭配何種茶底（鐵觀音／紅茶／翡翠）及單杯售價待查。"
            ]
        },
        {
            "product_id": "PROD-KEBUKE-WOOTEA-AUTUMN",
            "region": "台灣",
            "brand": "可不可熟成紅茶 ／ 五桐號",
            "product_name": "可不可「紅烏龍茶王／檸檬冷露紅烏龍」＆ 五桐號「泰奶雪沙」秋季新品",
            "short_word": "可不可・紅烏龍與檸檬冷露",
            "item_types": ["新品", "促銷"],
            "info_status": "✅ 可不可檸檬冷露紅烏龍實測價$65（⏳ 五桐號泰奶雪沙定價待查）",
            "is_pending_confirm": True,
            "flavor_category": "紅烏龍／檸檬／泰奶",
            "price_promo": "可不可檸檬冷露紅烏龍 PTT 實測價 NT$65；五桐號雙11買一送一（⏳ 泰奶雪沙定價待確認）",
            "observation_weeks": ["2026-W46", "2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-11-10 05:03:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": [],
            "roundup_news_ids": ["GNEWS-020", "GNEWS-075"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-003"],
            "media_summary": "妞新聞秋季手搖新品懶人包（`GNEWS-075`）推薦五桐號「泰奶雪沙」與可不可「紅烏龍茶王」為秋季必喝新品；NOWnews（`GNEWS-020`）報導五桐號雙11買一送一。",
            "consumer_summary": "【已採集 PTT 強烈負評實測 1 篇】針對可不可紅烏龍延伸品項「檸檬冷露紅烏龍」，PTT Drink 板最新列表 `PTT-DRINK-003`（作者 `wild2012`，3則推文）給予強烈負評：「一杯還65，微冰微糖紅烏龍沒有味道，檸檬味更是一點也沒有，只剩下甜味」；推文板友 `PHXD` 亦吐槽「裡面有檸檬凍（完全沒檸檬味），還配細吸管的操作不能理解」。完美示範將「媒體推薦曝光」與「消費者真實負評」分開呈現。",
            "unknowns": [
                "純茶款「紅烏龍茶王」無糖表現是否優於檸檬冷露特調，以及五桐號「泰奶雪沙」的實際消費者評價待查。"
            ]
        },
        {
            "product_id": "PROD-JINCHAWU-APPLE",
            "region": "台灣",
            "brand": "金茶伍",
            "product_name": "「兩顆紅蘋」現榨富士蘋果茶（PTT 飲料板當期新增推文熱議）",
            "short_word": "金茶伍・兩顆紅蘋蘋果茶",
            "item_types": ["新品"],
            "info_status": "⏳ 單杯確切售價待確認（板友推文詢問價錢）",
            "is_pending_confirm": True,
            "flavor_category": "果茶（蘋果）",
            "price_promo": "店員現場直接拿兩顆富士蘋果榨汁搭配茶王基底（⏳ 單杯確切售價待查，作者稱有點貴）",
            "observation_weeks": ["2026-W46", "2026-W45"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-12 09:48:00",
            "captured_at": "2026-11-12 11:54:38",
            "focused_news_ids": [],
            "roundup_news_ids": [],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": ["PTT-DRINK-002"],
            "historical_ref_ptt_ids": [],
            "media_summary": "【新聞曝光 0 筆】本次 Google News RSS 採集範圍內無媒體公關報導，完全由 PTT 飲料板真實消費者自發開箱發掘。",
            "consumer_summary": "【PTT 實測心得 1 篇＋10 則推文（含 11/08、11/12 當期新增 2 則推文）】`PTT-DRINK-002` 作者 `goodapple807` 盛讚店員直接榨兩顆蘋果，無糖仍帶富士蘋果香甜加茶王茶香「近期喝過最頂」；11/08 板友 `harebell2011` 新推文回饋「兩家（金茶伍與樂法）在今天都解鎖了，覺得還是樂法比較好喝」，11/12 板友 `kittymay79` 推文「愛蘋果系列茶飲 想試試」。",
            "unknowns": [
                "單杯確切售價（推文板友 `LisaPrincess` 詢問價錢尚未獲回）以及全台各分店供應狀況待查。"
            ]
        },
        {
            "product_id": "PROD-LEEJI-BLACKTEA",
            "region": "台灣",
            "brand": "李記紅茶冰",
            "product_name": "新北三重集美店「特大杯 XL 古早味決明子紅茶冰」",
            "short_word": "李記紅茶冰・特大杯決明子紅茶",
            "item_types": ["其他／常態招牌"],
            "info_status": "✅ 門市實測品名與售價 NT$35 已確認",
            "is_pending_confirm": False,
            "flavor_category": "純茶／古早味紅茶",
            "price_promo": "L 大杯約 NT$30、XL 特大杯招牌李記紅茶冰 NT$35（特調系列 NT$35~65）",
            "observation_weeks": ["2026-W45"],
            "primary_week": "2026-W45",
            "latest_published_at": "2026-11-03 23:56:37",
            "captured_at": "2026-11-12 11:54:40",
            "focused_news_ids": [],
            "roundup_news_ids": [],
            "current_period_ptt_ids": ["PTT-DRINK-006"],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "media_summary": "【新聞曝光 0 筆】無主流商業新聞公關稿，屬在地傳統茶飲店實測。",
            "consumer_summary": "【當期 11/03 PTT 新發實測文 1 篇】`PTT-DRINK-006` 作者 `LoveFood` 實測新北三重集美店（原中正南店遷址）：特大杯 XL 僅 35 元，遵循古法熬煮紅茶加入焙炒決明子與小碎冰，正常冰甜依然溫和不膩口、回甘生津。",
            "unknowns": [
                "該篇食記目前推噓文數為 0，尚待更多板友回報其他特調品項（如甘蔗青、紅心芭樂檸檬）評價。"
            ]
        },
        {
            "product_id": "PROD-CHICHA-KING-BUBBLE",
            "region": "港澳／台灣品牌出海",
            "brand": "吃茶三千 CHICHA San Chen",
            "product_name": "澳門新八佰伴店「國王珍珠奶茶」與現萃茶系列",
            "short_word": "吃茶三千・國王珍珠奶茶",
            "item_types": ["其他／常態招牌"],
            "info_status": "✅ 門市實測品名與售價 MOP 48 已確認",
            "is_pending_confirm": False,
            "flavor_category": "鮮奶茶／珍珠",
            "price_promo": "單杯售價 48 澳門幣（約折合 NT$190），全店區間 MOP 48~53",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-26 02:50:21",
            "captured_at": "2026-11-12 11:54:40",
            "focused_news_ids": [],
            "roundup_news_ids": [],
            "current_period_ptt_ids": ["PTT-DRINK-005"],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "media_summary": "【新聞曝光 0 筆】台灣台中精品茶飲品牌出海門市實測。",
            "consumer_summary": "【當期 10/26 PTT 新發實測文 1 篇】`PTT-DRINK-005` 實測澳門新八佰伴百貨 1 樓專櫃：主打專利高溫高壓現萃茶機（松針綠茶、水仙桂花蜜、玉露青茶、凍頂烏龍），冠軍飲品「國王珍珠奶茶」以焙火鳳眉紅茶搭皇家厚牛奶與慢火國王珍珠，店內並設苔蘚綠植內用區。",
            "unknowns": [
                "單杯折合台幣約 190 元屬高價位精品茶飲，一般日常回購率與台灣門市價差討論待更多推文回饋。"
            ]
        },
        {
            "product_id": "PROD-JIYUAN-GRAPE",
            "region": "台灣",
            "brand": "季緣",
            "product_name": "秋季新品「葡萄青韻」暨連 4 天買一送一",
            "short_word": "季緣・葡萄青韻買一送一",
            "item_types": ["新品", "促銷"],
            "info_status": "⏳ 單杯原價待內文確認（連4天買一送一已確認）",
            "is_pending_confirm": True,
            "flavor_category": "果茶（葡萄）",
            "price_promo": "10/27 起連喝 4 天買一送一（⏳ 單杯原價待內文確認）",
            "observation_weeks": ["2026-W44", "2026-W43"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-22 15:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": ["GNEWS-076"],
            "roundup_news_ids": [],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "media_summary": "1 筆單篇新聞（NOWnews `GNEWS-076`）報導手搖品牌「季緣」推出秋季果茶新品「葡萄青韻」，並於 10/27 起祭出連 4 天買一送一優惠。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板未見季緣「葡萄青韻」之試喝心得。",
            "unknowns": [
                "葡萄青韻之單杯定價、果肉含量與消費者實際評價目前未知。"
            ]
        }
    ]

    # Enrich each product with resolved source objects and exact counts
    enriched_products = []
    for p in raw_products:
        focused_objs = [news_by_id[nid] for nid in p["focused_news_ids"] if nid in news_by_id]
        roundup_objs = [news_by_id[nid] for nid in p["roundup_news_ids"] if nid in news_by_id]
        all_news_objs = focused_objs + roundup_objs
        unique_publishers = sorted({r.get("publisher_name", "未知媒體") for r in all_news_objs})

        cur_ptt_objs = [ptt_by_id[pid] for pid in p["current_period_ptt_ids"] if pid in ptt_by_id]
        recent_push_objs = [ptt_by_id[pid] for pid in p["recent_push_old_post_ids"] if pid in ptt_by_id]
        hist_ptt_objs = [ptt_by_id[pid] for pid in p["historical_ref_ptt_ids"] if pid in ptt_by_id]
        all_ptt_objs = cur_ptt_objs + recent_push_objs + hist_ptt_objs

        total_pushes = sum(a.get("raw_original", {}).get("total_push_entries", 0) for a in all_ptt_objs)

        p_copy = dict(p)
        p_copy["metrics"] = {
            "focused_news_count": len(focused_objs),
            "roundup_news_count": len(roundup_objs),
            "total_news_count": len(all_news_objs),
            "unique_publisher_count": len(unique_publishers),
            "unique_publishers": unique_publishers,
            "current_period_ptt_count": len(cur_ptt_objs),
            "recent_push_old_post_count": len(recent_push_objs),
            "historical_ref_ptt_count": len(hist_ptt_objs),
            "total_ptt_count": len(all_ptt_objs),
            "total_ptt_pushes": total_pushes,
            "composite_score_status": "修訂中（暫不顯示模擬分）"
        }
        p_copy["resolved_focused_news"] = focused_objs
        p_copy["resolved_roundup_news"] = roundup_objs
        p_copy["resolved_current_ptt"] = cur_ptt_objs
        p_copy["resolved_recent_push_ptt"] = recent_push_objs
        p_copy["resolved_historical_ptt"] = hist_ptt_objs
        enriched_products.append(p_copy)

    observation_periods = [
        {
            "period_id": "ALL",
            "label": "ALL (10/13~11/12 全部已採集期間 — 共 16 款商品／活動)",
            "date_range": "2026/10/13 - 2026/11/12",
            "description": "完整涵蓋本次實際採集之 95 筆 Google News 新聞紀錄與 14 篇 PTT 飲料板原文"
        },
        {
            "period_id": "2026-W46",
            "label": "2026-W46 (11/09~11/12 當期最新) — 雙11檔期、迷客夏太妃與麻古芋泥回歸",
            "date_range": "2026/11/09 - 2026/11/12",
            "description": "依實際發布日歸屬本週之商品與當期新增 PTT 推文"
        },
        {
            "period_id": "2026-W45",
            "label": "2026-W45 (11/02~11/08) — CoCo皮克敏聯名、龜記Oatly抹茶與李記紅茶實測",
            "date_range": "2026/11/02 - 2026/11/08",
            "description": "依實際發布日歸屬 11/02~11/08 之商品與 PTT 當期實測文"
        },
        {
            "period_id": "2026-W44",
            "label": "2026-W44 (10/26~11/01) — 迷客夏糖燻奶霜、CoCo與茶湯會可可季、吃茶三千實測",
            "date_range": "2026/10/26 - 2026/11/01",
            "description": "依實際發布日歸屬 10/26~11/01 之秋冬新品與 PTT 當期實測文"
        },
        {
            "period_id": "2026-W43",
            "label": "2026-W43 (10/13~10/25) — 大茗榴槤冰淇淋、珍煮丹蕎麥、麻古巨峰葡萄",
            "date_range": "2026/10/13 - 2026/10/25",
            "description": "依實際發布日歸屬 10 月中下旬之萬聖節與秋季新品"
        }
    ]

    crawl_batches = [
        {
            "batch_id": "BATCH-20261112-PTT",
            "executed_at": "2026-11-12 11:54:46",
            "source_pipeline": "PTT 飲料板 (bbs/Drink) 端到端採集 + 20個新聞事件歸納",
            "query_scope": "Drink 板最新列表 + 5 大品牌搜尋 (迷客夏/CoCo/龜記/麻古/大茗)",
            "records_collected": "14 篇 PTT 全文 + 79 則推噓文；整理 20 個新聞事件",
            "status": "✅ 實測成功 (HTTP 200)"
        },
        {
            "batch_id": "BATCH-20261112-GNEWS",
            "executed_at": "2026-11-12 11:32:12",
            "source_pipeline": "Google News RSS 台灣手搖飲新品與品牌檢索",
            "query_scope": "Q1 (手搖飲新品/聯名/買一送一 30d) + Q2 (13家連鎖品牌新品 30d)",
            "records_collected": "原始 142 筆 RSS ➔ 依連結去重保存 95 筆新聞紀錄（涵蓋 23 家媒體）",
            "status": "✅ 實測成功 (HTTP 200)"
        }
    ]

    output_payload = {
        "generated_at": "2026-11-12T22:30:00+08:00",
        "total_products": len(enriched_products),
        "observation_periods": observation_periods,
        "crawl_batches": crawl_batches,
        "products": enriched_products
    }

    with open(OUTPUT_PRODUCTS_PATH, "w", encoding="utf-8") as f:
        json.dump(output_payload, f, ensure_ascii=False, indent=2)

    print(f"[OK] 已建立真實商品目錄：{OUTPUT_PRODUCTS_PATH}（共 {len(enriched_products)} 款候選商品／活動）")
    return output_payload


if __name__ == "__main__":
    build_product_catalog()
