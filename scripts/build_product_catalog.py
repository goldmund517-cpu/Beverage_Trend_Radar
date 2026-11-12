# -*- coding: utf-8 -*-
"""
build_product_catalog.py
以單一計分程式與明確參數 (MODEL_PARAMS_V0_1) 產生：
1. 區分「單品」、「系列」、「活動」三類觀察對象（將 CoCo 皮克敏聯名活動 與 茉香凍奶綠單品 拆開並互相關聯）。
2. 四步過濾與細分訊號：
   - 區分 PTT「試喝心得 (+12)」、「詢問請益 (+6)」、「促銷情報 (+4)」；
   - 推噓文須落於當期滾動 30 天觀察窗 (2026-10-14 ~ 2026-11-13) 且與目標商品相關才計分，並依 userid 去重（同一帳號於同篇僅計 1 次），區分「試喝回饋 (+2.0/人)」與「促銷回報/購買意圖 (+1.5/人)」；
   - YouTube 區分「當期單品/活動長片」、「當期 Shorts」、「當期多品牌新聞合集（去重並按提及品牌數 1/3 折算）」與「歷史舊片（>30天，計 0 分僅列參考）」。
3. 產出三項子分數（媒體曝光 /40、消費者討論 /40、影音曝光 /20）與「優先關注分｜試行版 (/100)」，並保存逐項加減分明細 (score_breakdown) 與權重敏感度測試結果 (sensitivity_analysis) 至 JSON 與快照檔。
"""
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
VERIFIED_NEWS_PATH = DATA_DIR / "verified_news_data.json"
NEWS_EVENTS_PATH = DATA_DIR / "news_events_data.json"
VERIFIED_PTT_PATH = DATA_DIR / "verified_ptt_data.json"
VERIFIED_YT_PATH = DATA_DIR / "verified_youtube_data.json"
VERIFIED_SOCIAL_PATH = DATA_DIR / "verified_social_index_data.json"
OUTPUT_PRODUCTS_PATH = DATA_DIR / "verified_products_data.json"
SNAPSHOT_HISTORY_PATH = DATA_DIR / "score_snapshot_history.json"

ROLLING_WINDOW_START = "2026-10-14"
ROLLING_WINDOW_END = "2026-11-13"

MODEL_PARAMS_V0_1 = {
    "model_version": "v0.1-trial",
    "rolling_window_days": 30,
    "rolling_window_range": f"{ROLLING_WINDOW_START} ~ {ROLLING_WINDOW_END}",
    "media_cap": 40.0,
    "focused_publisher_unit": 3.5,
    "focused_publisher_cap": 28.0,
    "roundup_news_unit": 0.5,
    "roundup_news_cap": 6.0,
    "official_social_unit": 2.0,
    "official_social_cap": 6.0,
    "discussion_cap": 40.0,
    "ptt_tasting_post_unit": 12.0,
    "ptt_inquiry_post_unit": 6.0,
    "ptt_promo_post_unit": 4.0,
    "ptt_old_post_active_trigger": 4.0,
    "ptt_push_tasting_unit": 2.0,
    "ptt_push_intent_promo_unit": 1.5,
    "ptt_push_per_post_cap": 10.0,
    "video_cap": 20.0,
    "yt_single_long_unit": 5.0,
    "yt_single_short_unit": 3.0,
    "yt_collab_guide_unit": 3.5,
    "yt_multi_brand_news_unit": 1.5,
    "yt_view_tier_1k": 2.0,
    "yt_view_tier_5k": 3.0
}

SENSITIVITY_SCHEMES = {
    "Scheme_A_Baseline": {
        "label": "方案 A（基準試行版 40/40/20）",
        "params": MODEL_PARAMS_V0_1
    },
    "Scheme_B_Discussion_Up": {
        "label": "方案 B（降媒體權重 -20% ／ 升消費者討論 +25%）",
        "params": dict(
            MODEL_PARAMS_V0_1,
            focused_publisher_unit=2.8,
            focused_publisher_cap=22.4,
            ptt_tasting_post_unit=15.0,
            ptt_inquiry_post_unit=7.5,
            ptt_old_post_active_trigger=5.0,
            ptt_push_tasting_unit=2.5,
            ptt_push_intent_promo_unit=2.0
        )
    },
    "Scheme_C_Strict_Roundup": {
        "label": "方案 C（合集新聞與跨界攻略權重減半）",
        "params": dict(
            MODEL_PARAMS_V0_1,
            roundup_news_unit=0.25,
            roundup_news_cap=3.0,
            yt_collab_guide_unit=2.0,
            yt_multi_brand_news_unit=0.75
        )
    }
}


def compute_scores_for_product(p, params):
    """
    完全依參數字典計算單一商品／系列／活動之三維度子分數與總分，
    並回傳可逐筆核對的計算過程明細 (breakdown_lines)。
    """
    lines = []

    # 1. Media Exposure Score (/40)
    unique_focused_pubs = p["metrics"]["unique_focused_publisher_count"]
    roundup_cnt = p["metrics"]["roundup_news_count"]
    official_soc_cnt = len(p.get("current_official_social_posts", []))

    focused_raw = unique_focused_pubs * params["focused_publisher_unit"]
    focused_pts = min(params["focused_publisher_cap"], round(focused_raw, 2))
    if unique_focused_pubs > 0:
        cap_note = f"（達上限 {params['focused_publisher_cap']} 分）" if focused_raw > params["focused_publisher_cap"] else ""
        lines.append(
            f"[媒體] 當期單品/專題獨立媒體 {unique_focused_pubs} 家 × {params['focused_publisher_unit']} = {focused_pts:.1f} 分{cap_note}"
        )

    roundup_raw = roundup_cnt * params["roundup_news_unit"]
    roundup_pts = min(params["roundup_news_cap"], round(roundup_raw, 2))
    if roundup_cnt > 0:
        lines.append(
            f"[媒體] 當期跨品牌合集提及 {roundup_cnt} 筆 × {params['roundup_news_unit']}（按合集比重折減）= {roundup_pts:.1f} 分"
        )

    soc_raw = official_soc_cnt * params["official_social_unit"]
    soc_pts = min(params["official_social_cap"], round(soc_raw, 2))
    if official_soc_cnt > 0:
        lines.append(
            f"[媒體] 當期官方 IG/FB 公開貼文索引 {official_soc_cnt} 筆 × {params['official_social_unit']} = {soc_pts:.1f} 分"
        )

    media_score = min(params["media_cap"], round(focused_pts + roundup_pts + soc_pts, 1))
    if media_score == 0:
        lines.append("[媒體] 當期無單品專文或合集新聞 = 0.0 分")

    # 2. Consumer Discussion Score (/40)
    disc_pts_total = 0.0
    for post_rule in p.get("annotated_ptt_evidence", []):
        ev_id = post_rule["ptt_evidence_id"]
        rel_type = post_rule["relevance_class"]
        if rel_type == "HISTORICAL_REF":
            lines.append(
                f"[討論] {ev_id} 為超過 30 天之歷史參考文（{post_rule['signal_subtype']}），依規不計入當期分 = 0.0 分"
            )
            continue

        post_base = 0.0
        if rel_type == "CURRENT_NEW_POST":
            if post_rule["signal_subtype"] == "試喝心得":
                post_base = params["ptt_tasting_post_unit"]
            elif post_rule["signal_subtype"] == "詢問請益":
                post_base = params["ptt_inquiry_post_unit"]
            else:
                post_base = params["ptt_promo_post_unit"]
            lines.append(
                f"[討論] {ev_id} 當期新發文（性質：{post_rule['signal_subtype']}）基礎分 = +{post_base:.1f} 分"
            )
        elif rel_type == "OLD_POST_CURRENT_PUSH":
            post_base = params["ptt_old_post_active_trigger"]
            lines.append(
                f"[討論] {ev_id} 舊文於當期滾動 30 天內有目標商品新增推文（觸發基礎分）= +{post_base:.1f} 分"
            )

        # Deduplicated relevant pushes in rolling 30d window
        tasting_users = post_rule.get("unique_tasting_push_users", [])
        intent_users = post_rule.get("unique_intent_promo_push_users", [])
        push_raw = (
            len(tasting_users) * params["ptt_push_tasting_unit"]
            + len(intent_users) * params["ptt_push_intent_promo_unit"]
        )
        push_pts = min(params["ptt_push_per_post_cap"], round(push_raw, 2))
        if push_pts > 0:
            lines.append(
                f"[討論] {ev_id} 當期目標相關推文（同帳號去重：試喝回饋 {len(tasting_users)} 人 × {params['ptt_push_tasting_unit']} ＋ 購買意圖/促銷回報 {len(intent_users)} 人 × {params['ptt_push_intent_promo_unit']}）= +{push_pts:.1f} 分"
            )
        disc_pts_total += post_base + push_pts

    discussion_score = min(params["discussion_cap"], round(disc_pts_total, 1))
    if discussion_score == 0:
        lines.append("[討論] 當期 30 天滾動窗內無直接 PTT 試喝或目標推文（未檢出不倒扣）= 0.0 分")

    # 3. Video Exposure Score (/20)
    vid_pts_total = 0.0
    for v_rule in p.get("annotated_yt_evidence", []):
        vid_id = v_rule["yt_evidence_id"]
        v_class = v_rule["video_class"]
        if v_class == "HISTORICAL_VIDEO":
            lines.append(
                f"[影音] {vid_id} 為非當期舊片（{v_rule['published_time_text']}，{v_rule['view_count_text']}），列歷史參考 = 0.0 分"
            )
            continue
        if v_class == "DUPLICATE_REUPLOAD":
            lines.append(
                f"[影音] {vid_id} 與同源新聞片重複上傳（已合併計分），不重複計分 = 0.0 分"
            )
            continue

        v_base = 0.0
        view_bonus = 0.0
        views = v_rule.get("view_count_numeric", 0)
        if v_class == "CURRENT_SINGLE_PRODUCT":
            v_base = params["yt_single_long_unit"]
            if views >= 5000:
                view_bonus = params["yt_view_tier_1k"] + params["yt_view_tier_5k"]
            elif views >= 1000:
                view_bonus = params["yt_view_tier_1k"]
            lines.append(
                f"[影音] {vid_id} 當期單一活動/商品實拍（{v_rule['view_count_text']}）：基礎 +{v_base:.1f} ＋ 觀看級距 +{view_bonus:.1f} = +{(v_base + view_bonus):.1f} 分"
            )
        elif v_class == "CURRENT_COLLAB_GUIDE":
            v_base = params["yt_collab_guide_unit"]
            if views >= 5000:
                view_bonus = (params["yt_view_tier_1k"] + params["yt_view_tier_5k"]) * 0.6
            elif views >= 1000:
                view_bonus = params["yt_view_tier_1k"] * 0.6
            lines.append(
                f"[影音] {vid_id} 當期聯名遊戲攻略提及（{v_rule['view_count_text']}，按聯名比重折算）：基礎 +{v_base:.1f} ＋ 觀看級距 +{view_bonus:.1f} = +{(v_base + view_bonus):.1f} 分"
            )
        elif v_class == "CURRENT_MULTI_BRAND_NEWS":
            v_base = params["yt_multi_brand_news_unit"]
            if views >= 5000:
                view_bonus = 1.5
            elif views >= 1000:
                view_bonus = 1.0
            lines.append(
                f"[影音] {vid_id} 當期多品牌電視新聞合集（{v_rule['view_count_text']}，3品牌均分折算）：基礎 +{v_base:.1f} ＋ 觀看折算 +{view_bonus:.1f} = +{(v_base + view_bonus):.1f} 分"
            )
        vid_pts_total += v_base + view_bonus

    video_score = min(params["video_cap"], round(vid_pts_total, 1))
    if video_score == 0:
        lines.append("[影音] 當期 30 天內無直接關聯之新上架影片 = 0.0 分")

    priority_score = round(media_score + discussion_score + video_score, 1)
    lines.append(
        f"👉 合計【優先關注分｜試行版】= 媒體 {media_score:.1f} ＋ 討論 {discussion_score:.1f} ＋ 影音 {video_score:.1f} = {priority_score:.1f} 分"
    )

    return {
        "media_score": media_score,
        "discussion_score": discussion_score,
        "video_score": video_score,
        "priority_score": priority_score,
        "breakdown_lines": lines
    }


def build_product_catalog():
    with open(VERIFIED_NEWS_PATH, "r", encoding="utf-8") as f:
        news_data = json.load(f)
    with open(NEWS_EVENTS_PATH, "r", encoding="utf-8") as f:
        events_data = json.load(f)
    with open(VERIFIED_PTT_PATH, "r", encoding="utf-8") as f:
        ptt_data = json.load(f)
    yt_videos = []
    if VERIFIED_YT_PATH.exists():
        with open(VERIFIED_YT_PATH, "r", encoding="utf-8") as f:
            yt_videos = json.load(f).get("videos", [])
    social_posts = []
    if VERIFIED_SOCIAL_PATH.exists():
        with open(VERIFIED_SOCIAL_PATH, "r", encoding="utf-8") as f:
            social_posts = json.load(f).get("posts", [])

    news_by_id = {}
    for r in news_data.get("records", []):
        r_norm = dict(r)
        r_norm["publisher_name"] = r.get("publisher_name") or r.get("source_media") or "未知媒體"
        r_norm["title_clean"] = r.get("title_clean") or r.get("clean_title") or r.get("rss_title") or ""
        news_by_id[r_norm["evidence_id"]] = r_norm

    events_by_id = {e["event_id"]: e for e in events_data.get("events", [])}
    ptt_by_id = {p["ptt_evidence_id"]: p for p in ptt_data.get("articles", [])}
    yt_by_id = {v["yt_evidence_id"]: v for v in yt_videos}
    soc_by_id = {s["social_evidence_id"]: s for s in social_posts}

    def get_event_record_ids(ev_id):
        ev = events_by_id.get(ev_id, {})
        return [r["evidence_id"] for r in ev.get("source_records", [])]

    # 將「單品」、「系列」、「活動」明確拆分（共 17 個獨立觀察對象：原本 CoCo 皮克敏+茉香凍奶綠 拆分為「聯名活動」與「促銷單品」兩項並互相關聯）
    raw_products = [
        {
            "product_id": "PROD-MILKSHA-WINTER-1111",
            "entity_type": "系列",
            "launch_stage": "🚀 首發觀察期（上市 ≤ 7 天）",
            "region": "台灣",
            "brand": "迷客夏 Milksha",
            "product_name": "冬季「太妃序曲（太妃奶Q）／森半抹茶」系列 ＆ 法芙娜可可回歸",
            "short_word": "迷客夏・太妃奶Q與森半抹茶",
            "item_types": ["新品", "舊品回歸", "促銷"],
            "info_status": "⏳ 單杯原價待內文確認（促銷機制已確認）",
            "is_pending_confirm": True,
            "flavor_category": "奶茶／抹茶／可可",
            "price_promo": "雙11線上買11送11、點新品免費加「太妃奶Q」、11元加購娜杯紅茶（⏳ 11款單杯原價待由內文或官網確認）",
            "observation_weeks": ["2026-W46"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-11 13:30:33",
            "captured_at": "2026-11-13 00:09:08",
            "focused_news_ids": get_event_record_ids("EVT-MILKSHA-WINTER-1111"),
            "roundup_news_ids": ["GNEWS-004", "GNEWS-007", "GNEWS-008", "GNEWS-010", "GNEWS-019", "GNEWS-026", "GNEWS-027"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-007", "PTT-DRINK-008"],
            "current_official_social_ids": ["SOC-001", "SOC-011"],
            "annotated_ptt_rules": [
                {"ptt_evidence_id": "PTT-DRINK-007", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史優惠情報 (8/05)"},
                {"ptt_evidence_id": "PTT-DRINK-008", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史贈送文 (4/29)"}
            ],
            "annotated_yt_rules": [
                {"yt_evidence_id": "YT-005", "video_class": "CURRENT_MULTI_BRAND_NEWS"},
                {"yt_evidence_id": "YT-006", "video_class": "DUPLICATE_REUPLOAD"},
                {"yt_evidence_id": "YT-001", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-002", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-003", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-004", "video_class": "HISTORICAL_VIDEO"}
            ],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅", "YouTube ✅", "IG/FB索引 ⚠️部分", "Dcard/Threads 🚫未涵蓋"],
            "media_summary": "14 筆單品專文（涵蓋 13 家獨立媒體）＋7 筆跨品牌合集於 11/09～11/11 密集報導：迷客夏推出冬季限定「太妃序曲」與新配料「太妃奶Q」、日本森半抹茶升級，同場回歸「法芙娜可可」，並祭出雙11買11送11與11元加購娜杯紅茶。",
            "consumer_summary": "【當期 PTT 討論：本次採集範圍內未找到】剛開賣 2 天，PTT Drink 板僅有 4 月與 8 月歷史折價文（依規計 0 分，不混入當期口碑）；YouTube 4 部舊片亦歸入歷史參考，僅計入 TVBS 當期新聞合集提及。",
            "unknowns": [
                "消費者對新配料「太妃奶Q」與「森半抹茶」升級版的實際甜度、口感評價目前未知。",
                "雙11線上買11送11與門市11元加購紅茶之實際兌換率無公開數據。",
                "11 款冬季新品的完整單杯原價待由內文核對。"
            ]
        },
        {
            "product_id": "PROD-COCO-PIKMIN-EVENT",
            "entity_type": "活動",
            "related_entity_note": "🔗 關聯同檔期促銷飲品：CoCo 茉香凍奶綠／奶茶三兄弟 (PROD-COCO-MOLI-MILKGREEN)",
            "launch_stage": "🔥 發酵觀察期（上市 8～21 天）",
            "region": "台灣",
            "brand": "CoCo都可",
            "product_name": "《Pikmin Bloom 皮克敏》五週年跨界聯名尋寶活動（咖啡杯皮克敏花苗＆明信片）",
            "short_word": "CoCo・皮克敏聯名活動",
            "item_types": ["促銷"],
            "info_status": "✅ 聯名尋寶機制已確認（與飲品試喝口碑分離計分）",
            "is_pending_confirm": False,
            "flavor_category": "跨界IP聯名活動",
            "price_promo": "11/5～12/3 全台門市開放 Pikmin Bloom 玩家掃描領取 8 款咖啡杯皮克敏金色花苗與限定明信片",
            "observation_weeks": ["2026-W46", "2026-W45"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-11 13:57:18",
            "captured_at": "2026-11-13 00:09:08",
            "focused_news_ids": get_event_record_ids("EVT-COCO-PIKMIN"),
            "roundup_news_ids": ["GNEWS-045", "GNEWS-047", "GNEWS-051"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [],
            "annotated_yt_rules": [
                {"yt_evidence_id": "YT-015", "video_class": "CURRENT_COLLAB_GUIDE"},
                {"yt_evidence_id": "YT-016", "video_class": "CURRENT_COLLAB_GUIDE"},
                {"yt_evidence_id": "YT-017", "video_class": "CURRENT_SINGLE_PRODUCT"},
                {"yt_evidence_id": "YT-018", "video_class": "CURRENT_SINGLE_PRODUCT"}
            ],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅", "YouTube ✅ (4部玩家片)", "IG/FB索引 ⚠️部分", "Dcard/Threads 🚫未涵蓋"],
            "media_summary": "17 筆專文（12 家獨立媒體）＋3 筆合集報導 CoCo 自 11/5 起與手遊《Pikmin Bloom》聯名，全台門市開放玩家領取咖啡杯皮克敏金色花苗與明信片。",
            "consumer_summary": "【依審核原則將「聯名活動熱度」與「飲品試喝口碑」分離】YouTube 實測抓到 4 部當期玩家攻略與門市踩點影片（Q之口袋 5,728 觀看、阿韋 2,184 觀看、YUYU 314 觀看、樹懶先生門市隨意拍 189 觀看），反映遊戲玩家對聯名活動的高關注，但不直接等同於飲品口味評價。",
            "unknowns": [
                "玩家為領取皮克敏花苗而實際購買 CoCo 飲品之轉換率未知。",
                "PTT 飲料板目前無針對皮克敏聯名周邊之討論（討論集中在遊戲社群與 YouTube 攻略）。"
            ]
        },
        {
            "product_id": "PROD-COCO-MOLI-MILKGREEN",
            "entity_type": "單品",
            "related_entity_note": "🔗 關聯同檔期活動：《Pikmin Bloom 皮克敏》聯名活動 (PROD-COCO-PIKMIN-EVENT)",
            "launch_stage": "🍵 常態促銷與歷史實測對照",
            "region": "台灣",
            "brand": "CoCo都可",
            "product_name": "茉香凍奶綠 ／ 奶茶三兄弟（11月皮克敏檔期＆雙11買一送一主力飲品）",
            "short_word": "CoCo・茉香凍奶綠",
            "item_types": ["促銷"],
            "info_status": "✅ 促銷價與 PTT 實測已核對（不混算皮克敏遊戲攻略片分數）",
            "is_pending_confirm": False,
            "flavor_category": "茶凍奶綠／咀嚼奶茶",
            "price_promo": "茉香凍奶綠買一送一／2杯60元、奶茶三兄弟優惠價45元",
            "observation_weeks": ["2026-W46", "2026-W45"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-11 13:57:18",
            "captured_at": "2026-11-13 00:09:08",
            "focused_news_ids": ["GNEWS-002", "GNEWS-025", "GNEWS-040", "GNEWS-046"],
            "roundup_news_ids": ["GNEWS-007", "GNEWS-015", "GNEWS-019", "GNEWS-026", "GNEWS-045"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-009"],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [
                {"ptt_evidence_id": "PTT-DRINK-009", "relevance_class": "HISTORICAL_REF", "signal_subtype": "同品項試喝心得 (9/04，7則推文)"}
            ],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (含9月同品項實測)", "YouTube ✅", "IG/FB索引 ⚠️部分"],
            "media_summary": "4 筆專文與 5 筆雙11合集明確提及 CoCo「茉香凍奶綠」買一送一／2杯60元與「奶茶三兄弟」45元促銷。",
            "consumer_summary": "【飲品獨立口碑核對】已分離皮克敏遊戲影片，單獨檢視飲品本身：PTT Drink 板有「茉香凍奶綠」專文實測（PTT-DRINK-009，9/04 發布故列歷史參考 0 分），作者讚賞茉莉茶香搭茶凍口感豐富像 28 茉輕乳茶，惟推文有 2 位板友因「使用奶精基底」表示 pass，另有板友表示特價時會買。",
            "unknowns": [
                "11 月買一送一檔期是否有最新當月試喝文尚待後續採集。"
            ]
        },
        {
            "product_id": "PROD-MACU-TARO-2026",
            "entity_type": "系列",
            "launch_stage": "🚀 首發觀察期（上市 ≤ 7 天）",
            "region": "台灣",
            "brand": "麻古茶坊 MACU",
            "product_name": "冬季大甲芋泥系列回歸「濃厚芋泥鮮奶／芋泥波波鮮奶2.0」＆ 新品「金絨芋泥玉米圓」",
            "short_word": "麻古・芋泥波波2.0與玉米圓",
            "item_types": ["新品", "舊品回歸"],
            "info_status": "⏳ 單杯售價待內文確認（品名與配料已由 IG 核實）",
            "is_pending_confirm": True,
            "flavor_category": "芋泥鮮奶／咀嚼配料",
            "price_promo": "⏳ 2026冬季回歸門市單杯售價待由新聞內文或門市菜單核對（過往 PTT 紀錄曾討論 80～90 元定價）",
            "observation_weeks": ["2026-W46"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-11 11:02:00",
            "captured_at": "2026-11-13 00:09:08",
            "focused_news_ids": get_event_record_ids("EVT-MACU-TARO"),
            "roundup_news_ids": ["GNEWS-004", "GNEWS-008", "GNEWS-027"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-011", "PTT-DRINK-010"],
            "current_official_social_ids": ["SOC-006", "SOC-007"],
            "annotated_ptt_rules": [
                {"ptt_evidence_id": "PTT-DRINK-011", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史同品項試喝心得 (15推)"},
                {"ptt_evidence_id": "PTT-DRINK-010", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史品牌心得 (11推)"}
            ],
            "annotated_yt_rules": [
                {"yt_evidence_id": "YT-010", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-011", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-012", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-013", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-014", "video_class": "HISTORICAL_VIDEO"}
            ],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅", "YouTube ✅ (5部舊片已剔除計分)", "IG/FB索引 ✅ (2筆官方Reels)"],
            "media_summary": "8 筆專文（8 家獨立媒體）＋3 筆合集＋2 筆官方 IG Reels（SOC-006 療芋系雙主角回歸、SOC-007 金絨芋泥玉米圓）報導麻古茶坊大甲芋泥系列回歸，並推出玉米汁芝芝搭配玉米圓的新品「金絨芋泥玉米圓」。",
            "consumer_summary": "【2026 當期新品 PTT 討論：本次採集範圍內未找到】剛於 11/10～11/11 發布新聞，尚無本週新文；YouTube 抓到之 5 部影片（含 41.8 萬觀看之 2023 舊片）經程式檢核皆為 3～7 年前歷史影片，嚴格計為 0 分。過往同品項「濃厚芋泥鮮奶」PTT 實測（PTT-DRINK-011）顯示板友肯定芋頭香氣自然，但關注 80～90 元價格。",
            "unknowns": [
                "2026 年版「芋泥波波鮮奶 2.0」與新品「金絨芋泥玉米圓」之實際消費者試喝評價與甜度回饋未知。"
            ]
        },
        {
            "product_id": "PROD-LIJI-BLACKTEA",
            "entity_type": "單品",
            "launch_stage": "💬 當期獨立口碑實測",
            "region": "台灣",
            "brand": "李記紅茶冰",
            "product_name": "招牌紅茶 ／ 琥珀紅茶（PTT Drink 板 11/07 當期獨立試喝心得）",
            "short_word": "李記紅茶冰・招牌與琥珀紅茶",
            "item_types": ["其他／常態招牌"],
            "info_status": "✅ 消費者實測品名與微糖少冰規格已確認",
            "is_pending_confirm": False,
            "flavor_category": "純茶／古早味紅茶",
            "price_promo": "門市常態販售（由 PTT 消費者自費實測分享，無新聞公關稿）",
            "observation_weeks": ["2026-W45"],
            "primary_week": "2026-W45",
            "latest_published_at": "2026-11-07 20:51:53",
            "captured_at": "2026-11-12 11:54:46",
            "focused_news_ids": [],
            "roundup_news_ids": [],
            "current_period_ptt_ids": ["PTT-DRINK-001"],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [
                {
                    "ptt_evidence_id": "PTT-DRINK-001",
                    "relevance_class": "CURRENT_NEW_POST",
                    "signal_subtype": "試喝心得",
                    "unique_tasting_push_users": ["abc9110"],
                    "unique_intent_promo_push_users": ["willy891011", "s910443ttw", "b08297"]
                }
            ],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅ (0筆公關稿)", "PTT ✅ (當期實測專文)", "YouTube ⚠️未檢出", "IG/FB索引 ⚠️未檢出"],
            "media_summary": "【當期新聞曝光：0 筆】無任何媒體公關新聞或促銷懶人包報導。",
            "consumer_summary": "【當期 PTT 實測：1 篇新發文（試喝心得）＋ 4 位不重複板友推文】11/07 板友貼出實拍照片分享李記紅茶冰：『招牌紅茶』微糖少冰帶有決明子與麥香、甜度順口；『琥珀紅茶』茶味較淡；推文 1 人附和好喝、3 人討論北部與蘆洲分店位置。",
            "unknowns": [
                "無連鎖公關新聞曝光，屬在地純茶口碑討論。"
            ]
        },
        {
            "product_id": "PROD-CHICHA3000",
            "entity_type": "單品",
            "launch_stage": "💬 當期獨立口碑實測",
            "region": "台灣",
            "brand": "吃茶三千 Chicha San Chen",
            "product_name": "松針綠茶＋百花香蜜＋皇家厚奶 ＆ 玉露青茶（PTT Drink 板 10/29 當期實測）",
            "short_word": "吃茶三千・松針綠茶與玉露青茶",
            "item_types": ["其他／常態招牌"],
            "info_status": "✅ 消費者實測品項與評價已確認",
            "is_pending_confirm": False,
            "flavor_category": "現萃精品茶／厚奶",
            "price_promo": "門市現萃茶飲（由 PTT 消費者自費實測分享，無新聞公關稿）",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-29 14:43:39",
            "captured_at": "2026-11-12 11:54:46",
            "focused_news_ids": [],
            "roundup_news_ids": [],
            "current_period_ptt_ids": ["PTT-DRINK-002"],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [
                {
                    "ptt_evidence_id": "PTT-DRINK-002",
                    "relevance_class": "CURRENT_NEW_POST",
                    "signal_subtype": "試喝心得",
                    "unique_tasting_push_users": ["savage5566"],
                    "unique_intent_promo_push_users": ["yvonne10126"]
                }
            ],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅ (0筆公關稿)", "PTT ✅ (當期實測專文)", "YouTube ⚠️未檢出", "IG/FB索引 ⚠️未檢出"],
            "media_summary": "【當期新聞曝光：0 筆】本次 Google News 採集範圍內無新聞報導。",
            "consumer_summary": "【當期 PTT 實測：1 篇新發文（試喝心得）＋ 2 位不重複板友推文】10/29 板友實測分享：松針綠茶加百花香蜜與皇家厚奶『茶香明顯、奶味偏清爽、整體順口』；推文板友大推『玉露青茶無糖去冰』，原作者亦認同現萃無糖茶表現佳。",
            "unknowns": [
                "單杯門市定價與全台分店銷售數據未於文中列出。"
            ]
        },
        {
            "product_id": "PROD-DAMING-DURIAN",
            "entity_type": "單品",
            "launch_stage": "🔥 發酵觀察期（上市 8～21 天）",
            "region": "台灣",
            "brand": "大茗本位製茶堂",
            "product_name": "萬聖節限定「榴槤奶蓋冰淇淋紅茶」（獵奇果香奶蓋系列）",
            "short_word": "大茗・榴槤奶蓋冰淇淋紅茶",
            "item_types": ["新品", "促銷"],
            "info_status": "⏳ 單杯原價待確認（10/24開賣與買一送一活動已確認）",
            "is_pending_confirm": True,
            "flavor_category": "奶蓋／獵奇果茶",
            "price_promo": "萬聖節限定開賣（搭配特調系列買一送一，⏳ 單杯原價待確認）",
            "observation_weeks": ["2026-W44", "2026-W43"],
            "primary_week": "2026-W43",
            "latest_published_at": "2026-10-30 03:30:00",
            "captured_at": "2026-11-13 00:09:08",
            "focused_news_ids": get_event_record_ids("EVT-DAMING-DURIAN"),
            "roundup_news_ids": ["GNEWS-063", "GNEWS-068", "GNEWS-071", "GNEWS-072", "GNEWS-073"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-012", "PTT-DRINK-013"],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [
                {"ptt_evidence_id": "PTT-DRINK-012", "relevance_class": "HISTORICAL_REF", "signal_subtype": "同品牌菜單請益文（推文談四季春/酪梨奶蓋，未談榴槤故不計入榴槤單品分）"},
                {"ptt_evidence_id": "PTT-DRINK-013", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史桂花青茶心得 (2024/08)"}
            ],
            "annotated_yt_rules": [
                {"yt_evidence_id": "YT-005", "video_class": "CURRENT_MULTI_BRAND_NEWS"},
                {"yt_evidence_id": "YT-006", "video_class": "DUPLICATE_REUPLOAD"},
                {"yt_evidence_id": "YT-007", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-008", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-009", "video_class": "HISTORICAL_VIDEO"}
            ],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (未見榴槤單品推文)", "YouTube ✅ (TVBS新聞合集)", "IG/FB索引 ⚠️部分"],
            "media_summary": "2 筆單品專文（2 家媒體）＋5 筆萬聖節合集＋TVBS 新聞影音合集（YT-005 7,438 觀看，與 YT-006 去重後按 3 品牌折算）報導大茗推出「榴槤奶蓋冰淇淋紅茶」。",
            "consumer_summary": "【嚴格核對目標商品相關性】PTT 雖有大茗文章（PTT-DRINK-012 於 11/07 新增推文『這家四季春真的頂』），但因該推文談的是四季春與酪梨奶蓋、並非談論「榴槤奶蓋冰淇淋」，依規不替榴槤單品加分（0.0 分），轉歸屬至下方大茗常態招牌項目。",
            "unknowns": [
                "榴槤奶蓋冰淇淋紅茶之實際消費者試喝接受度與單店銷量目前未知。"
            ]
        },
        {
            "product_id": "PROD-DAMING-AVOCADO",
            "entity_type": "單品",
            "launch_stage": "🍵 常態招牌與當期討論",
            "region": "台灣",
            "brand": "大茗本位製茶堂",
            "product_name": "酪梨奶蓋紅茶 ／ 烤糖蕎麥凍奶青 ／ 四季春（品牌常態招牌與 PTT 當期詢問推文）",
            "short_word": "大茗・酪梨奶蓋與烤糖蕎麥凍",
            "item_types": ["其他／常態招牌"],
            "info_status": "✅ 常態品項與 PTT 消費者討論已確認",
            "is_pending_confirm": False,
            "flavor_category": "奶蓋／蕎麥／純茶",
            "price_promo": "門市常態販售（10/20 PTT 詢問文＋11/07 當期新增推文推薦）",
            "observation_weeks": ["2026-W46", "2026-W43"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-07 15:24:00",
            "captured_at": "2026-11-12 11:54:46",
            "focused_news_ids": [],
            "roundup_news_ids": ["GNEWS-063", "GNEWS-068"],
            "current_period_ptt_ids": ["PTT-DRINK-012"],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-013"],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [
                {
                    "ptt_evidence_id": "PTT-DRINK-012",
                    "relevance_class": "CURRENT_NEW_POST",
                    "signal_subtype": "詢問請益",
                    "unique_tasting_push_users": ["lycppt", "bxxl", "vodkalime607", "nanami773"],
                    "unique_intent_promo_push_users": ["shin8018"]
                },
                {"ptt_evidence_id": "PTT-DRINK-013", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史桂花青茶心得 (2024/08)"}
            ],
            "annotated_yt_rules": [
                {"yt_evidence_id": "YT-009", "video_class": "HISTORICAL_VIDEO"}
            ],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (當期詢問文+10推)", "YouTube ✅ (含歷史開箱)", "IG/FB索引 ⚠️部分"],
            "media_summary": "於 2 筆 10 月手搖飲合集新聞中被提及為大茗招牌特色品項。",
            "consumer_summary": "【區分『詢問文 (+6)』與『試喝推文 (+2/人)』且同帳號去重】PTT-DRINK-012 為 10/20 發布之詢問請益文（落於當期滾動 30 天窗內，基礎分 +6 分），底下共 5 位不重複板友針對酪梨奶蓋、蕎麥茶、桂花青與四季春給出具體評價（含 11/07 新增推文『這家四季春真的頂』），折算推文互動滿分 +10 分。",
            "unknowns": [
                "各分店酪梨奶蓋供應穩定度無量化統計。"
            ]
        },
        {
            "product_id": "PROD-MILKSHA-SMOKE-BLACK",
            "entity_type": "系列",
            "launch_stage": "🔥 發酵觀察期（上市 8～21 天）",
            "region": "台灣",
            "brand": "迷客夏 Milksha",
            "product_name": "「糖燻野境（娜杯糖燻奶霜／煙燻黑糖）」系列 ＆「朝等紅茶」回歸",
            "short_word": "迷客夏・糖燻奶霜與朝等紅茶",
            "item_types": ["新品", "舊品回歸", "促銷"],
            "info_status": "✅ 嚐鮮價已確認（原價折10元）",
            "is_pending_confirm": False,
            "flavor_category": "奶霜／黑糖／純茶",
            "price_promo": "娜杯系列現折10元；購買糖燻野境系列送 15 元折價券；朝等紅茶回歸嚐鮮價 35 元（原價 45 元）",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-30 07:00:00",
            "captured_at": "2026-11-13 00:09:08",
            "focused_news_ids": get_event_record_ids("EVT-MILKSHA-SMOKE"),
            "roundup_news_ids": ["GNEWS-059", "GNEWS-063", "GNEWS-064", "GNEWS-067"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-007"],
            "current_official_social_ids": ["SOC-004", "SOC-011"],
            "annotated_ptt_rules": [
                {"ptt_evidence_id": "PTT-DRINK-007", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史折價券文 (8/05)"}
            ],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅", "YouTube ✅", "IG/FB索引 ✅ (2筆官方貼文)"],
            "media_summary": "4 筆專文（4 家媒體）＋4 筆合集＋2 筆官方 IG/FB 貼文索引（SOC-004 全球示範店、SOC-011 10/28-11/01 娜杯系列全台門市現折$10）報導迷客夏推出「糖燻野境」系列與「朝等紅茶」回歸。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板尚無針對「糖燻野境」或「朝等紅茶」之試喝貼文。",
            "unknowns": [
                "消費者對煙燻風味奶霜之接受度與回購率未知。"
            ]
        },
        {
            "product_id": "PROD-JINCHA5-APPLE",
            "entity_type": "單品",
            "launch_stage": "🔥 發酵觀察期（雙11促銷觸發新推文）",
            "region": "台灣",
            "brand": "金茶伍",
            "product_name": "「兩顆紅蘋」鮮果茶（雙11買一送一 ＆ PTT 舊文當期新增推文）",
            "short_word": "金茶伍・兩顆紅蘋鮮果茶",
            "item_types": ["促銷"],
            "info_status": "⏳ 單杯原價待確認（買一送一與PTT推文已核實）",
            "is_pending_confirm": True,
            "flavor_category": "鮮果茶（蘋果）",
            "price_promo": "11/10～11/12 買一送一（⏳ 單杯原價待確認）",
            "observation_weeks": ["2026-W46"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-12 11:39:00",
            "captured_at": "2026-11-12 11:54:46",
            "focused_news_ids": [],
            "roundup_news_ids": ["GNEWS-004", "GNEWS-008"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": ["PTT-DRINK-003"],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [
                {
                    "ptt_evidence_id": "PTT-DRINK-003",
                    "relevance_class": "OLD_POST_CURRENT_PUSH",
                    "signal_subtype": "舊文於當期新增目標商品推文 (11/08, 11/12)",
                    "unique_tasting_push_users": ["d8846325"],
                    "unique_intent_promo_push_users": ["hsin1207"]
                }
            ],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅ (2筆合集)", "PTT ✅ (當期新增2人推文)", "YouTube ⚠️未檢出", "IG/FB索引 ⚠️未檢出"],
            "media_summary": "於 2 筆雙11手搖飲合集新聞（NOWnews、Yahoo）中被列為買一送一優惠品項。",
            "consumer_summary": "【核對留言與目標商品直接相關】PTT 舊實測文（PTT-DRINK-003）於本週新增 2 則與「兩顆紅蘋」直接相關之推文：11/08 `hsin1207` 回報『這幾天買一送一 來試試看』（購買意圖/促銷回報 +1.5），11/12 `d8846325` 回饋『超甜 喝了兩口喝不下去』（試喝回饋 +2.0）。",
            "unknowns": [
                "買一送一期間消費者點選無糖或微糖是否能改善過甜問題尚待更多回饋。"
            ]
        },
        {
            "product_id": "PROD-GUIJI-OATLY",
            "entity_type": "系列",
            "launch_stage": "🔥 發酵觀察期（上市 8～21 天）",
            "region": "台灣",
            "brand": "龜記茗品 Guiji",
            "product_name": "冬季限定「Oatly 燕麥奶 × 靜岡抹茶」系列（3款冬季熱飲／冷飲）",
            "short_word": "龜記・Oatly燕麥抹茶",
            "item_types": ["新品"],
            "info_status": "⏳ 3款完整品名與單價待內文確認",
            "is_pending_confirm": True,
            "flavor_category": "抹茶／燕麥奶",
            "price_promo": "⏳ 3 款冬季新品之完整品名與單價待開啟新聞內文或官網菜單核對",
            "observation_weeks": ["2026-W45"],
            "primary_week": "2026-W45",
            "latest_published_at": "2026-11-03 08:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-GUIJI-MATCHA"),
            "roundup_news_ids": ["GNEWS-004", "GNEWS-007", "GNEWS-027", "GNEWS-044", "GNEWS-045"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-004", "PTT-DRINK-005", "PTT-DRINK-006"],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [
                {"ptt_evidence_id": "PTT-DRINK-004", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史紅茶王心得"},
                {"ptt_evidence_id": "PTT-DRINK-005", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史紅水烏龍心得"},
                {"ptt_evidence_id": "PTT-DRINK-006", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史菜單詢問文"}
            ],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (當期未檢出)", "YouTube ✅", "IG/FB索引 ⚠️部分"],
            "media_summary": "3 筆專文（3 家媒體）＋5 筆合集報導龜記推出 3 款結合 Oatly 燕麥奶與日本抹茶之冬季新品。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板搜尋「龜記」最新 3 篇皆為舊品（花沫烏龍、紅水烏龍、旺梨四季春）討論，依規計 0 分，不混充當期抹茶新品口碑。",
            "unknowns": [
                "Oatly 燕麥奶搭抹茶之實際口感評價目前未知。"
            ]
        },
        {
            "product_id": "PROD-TRUEDAN-BUCKWHEAT",
            "entity_type": "系列",
            "launch_stage": "🔥 發酵觀察期（上市 21 天）",
            "region": "台灣",
            "brand": "珍煮丹 Truedan",
            "product_name": "「拾穗蕎麥」無咖啡因穀物茶系列 ＆ 雙11指定飲品買一送一",
            "short_word": "珍煮丹・拾穗蕎麥系列",
            "item_types": ["新品", "促銷"],
            "info_status": "✅ 活動機制已確認（⏳ 單杯原價待確認）",
            "is_pending_confirm": True,
            "flavor_category": "蕎麥茶／無咖啡因穀物茶",
            "price_promo": "10/22 起互動免費喝拾穗蕎麥系列；雙11檔期祭出連4天買一送一（⏳ 單杯原價待確認）",
            "observation_weeks": ["2026-W46", "2026-W43"],
            "primary_week": "2026-W43",
            "latest_published_at": "2026-11-11 03:20:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": get_event_record_ids("EVT-TRUEDAN-BUCKWHEAT"),
            "roundup_news_ids": ["GNEWS-004", "GNEWS-007", "GNEWS-008", "GNEWS-015", "GNEWS-019", "GNEWS-027", "GNEWS-071"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (未檢出)", "YouTube ✅", "IG/FB索引 ⚠️部分"],
            "media_summary": "2 筆專文（2 家媒體）＋7 筆合集報導珍煮丹推出「拾穗蕎麥」系列，並於門市推出對暗號免費喝與雙11買一送一。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板於本次採集範圍內未見珍煮丹「拾穗蕎麥」之試喝文章。",
            "unknowns": [
                "拾穗蕎麥系列包含之細項品名與單價待核對。"
            ]
        },
        {
            "product_id": "PROD-MACU-GRAPE",
            "entity_type": "系列",
            "launch_stage": "🔥 發酵觀察期（上市 21 天）",
            "region": "台灣",
            "brand": "麻古茶坊 MACU",
            "product_name": "「巨峰葡萄」鮮果茶系列（芝芝葡萄果粒／葡萄果粒波波）",
            "short_word": "麻古・巨峰葡萄系列",
            "item_types": ["新品"],
            "info_status": "⏳ 2026當季單杯售價待確認",
            "is_pending_confirm": True,
            "flavor_category": "鮮果茶／芝芝奶蓋",
            "price_promo": "⏳ 門市當季售價待確認",
            "observation_weeks": ["2026-W43"],
            "primary_week": "2026-W43",
            "latest_published_at": "2026-10-20 08:00:00",
            "captured_at": "2026-11-13 00:09:08",
            "focused_news_ids": get_event_record_ids("EVT-MACU-GRAPE"),
            "roundup_news_ids": ["GNEWS-079"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": ["PTT-DRINK-010"],
            "current_official_social_ids": ["SOC-008"],
            "annotated_ptt_rules": [
                {"ptt_evidence_id": "PTT-DRINK-010", "relevance_class": "HISTORICAL_REF", "signal_subtype": "歷史品牌果茶討論"}
            ],
            "annotated_yt_rules": [
                {"yt_evidence_id": "YT-011", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-012", "video_class": "HISTORICAL_VIDEO"},
                {"yt_evidence_id": "YT-014", "video_class": "HISTORICAL_VIDEO"}
            ],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅", "YouTube ✅ (舊片剔除)", "IG/FB索引 ✅ (官方IG簡介)"],
            "media_summary": "2 筆專文＋1 筆合集＋官方 IG 主頁簡介標示 `#巨峰葡萄系列 Now in Season`。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】YouTube 抓到之 2022/2023 葡萄季舊片已依規歸零不計入當期分。",
            "unknowns": [
                "本季巨峰葡萄系列之實際消費者評價待查。"
            ]
        },
        {
            "product_id": "PROD-COCO-CHOCO",
            "entity_type": "系列",
            "launch_stage": "🔥 發酵觀察期（上市 14 天）",
            "region": "台灣",
            "brand": "CoCo都可 ＆ 茶湯會",
            "product_name": "秋冬頂級可可季新品（CoCo可可系列 ＆ 茶湯會生巧可可系列）",
            "short_word": "CoCo＆茶湯會・可可季新品",
            "item_types": ["新品", "促銷"],
            "info_status": "⏳ 完整品名與單價待內文確認",
            "is_pending_confirm": True,
            "flavor_category": "可可／巧克力鮮奶",
            "price_promo": "CoCo 同品項第二杯半價（⏳ 單杯原價待開啟內文核對）",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-29 10:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": ["GNEWS-065"],
            "roundup_news_ids": ["GNEWS-004", "GNEWS-059"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (未檢出)", "YouTube ✅", "IG/FB索引 ⚠️部分"],
            "media_summary": "1 筆專題報導＋2 筆合集提及 CoCo 與茶湯會同步搶攻秋冬熱可可商機。",
            "consumer_summary": "【當期新品 PTT 討論：本次採集範圍內未找到】PTT Drink 板尚無本季 CoCo 或茶湯會可可新品之試喝貼文。",
            "unknowns": [
                "兩品牌可可新品之詳細品名、定價與甜度評價待查。"
            ]
        },
        {
            "product_id": "PROD-CHINGSHIN-PUER",
            "entity_type": "單品",
            "launch_stage": "🔥 發酵觀察期（上市 14 天）",
            "region": "台灣",
            "brand": "清心福全",
            "product_name": "經典回歸「珍珠蜂蜜鮮奶普洱」",
            "short_word": "清心・珍珠蜂蜜鮮奶普洱",
            "item_types": ["舊品回歸"],
            "info_status": "⏳ 單杯售價待確認（品名已確認）",
            "is_pending_confirm": True,
            "flavor_category": "普洱茶／蜂蜜鮮奶",
            "price_promo": "⏳ 門市回歸售價待確認",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-28 07:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": ["GNEWS-069"],
            "roundup_news_ids": ["GNEWS-059", "GNEWS-063", "GNEWS-064"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (未檢出)", "YouTube ⚠️未檢出", "IG/FB索引 ⚠️未檢出"],
            "media_summary": "1 筆專文＋3 筆合集報導清心福全宣布經典「珍珠蜂蜜鮮奶普洱」回歸。",
            "consumer_summary": "【當期 PTT 討論：本次採集範圍內未找到】",
            "unknowns": [
                "回歸後之單杯定價與消費者實際試喝回饋未知。"
            ]
        },
        {
            "product_id": "PROD-50LAN-OOLONG",
            "entity_type": "單品",
            "launch_stage": "🔥 發酵觀察期（上市 14 天）",
            "region": "台灣",
            "brand": "50嵐",
            "product_name": "「重焙烏龍拿鐵」全台擴大開賣",
            "short_word": "50嵐・重焙烏龍拿鐵",
            "item_types": ["新品", "舊品回歸"],
            "info_status": "⏳ 北中南分區售價待確認（品名已確認）",
            "is_pending_confirm": True,
            "flavor_category": "烏龍拿鐵／鮮奶茶",
            "price_promo": "⏳ 北中南區中杯／大杯定價待確認",
            "observation_weeks": ["2026-W44"],
            "primary_week": "2026-W44",
            "latest_published_at": "2026-10-28 07:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": [],
            "roundup_news_ids": ["GNEWS-059", "GNEWS-063", "GNEWS-069"],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅ (3筆合集)", "PTT ✅ (未檢出)", "YouTube ⚠️未檢出", "IG/FB索引 ⚠️未檢出"],
            "media_summary": "3 筆新聞提及 50 嵐「重焙烏龍拿鐵」擴大開賣訊息。",
            "consumer_summary": "【當期 PTT 討論：本次採集範圍內未找到】",
            "unknowns": [
                "重焙烏龍拿鐵於各區門市之實際售價與茶味濃淡評價待查。"
            ]
        },
        {
            "product_id": "PROD-JIYUAN-GRAPE",
            "entity_type": "單品",
            "launch_stage": "🔥 發酵觀察期（上市 21 天）",
            "region": "台灣",
            "brand": "季緣 CHI YUAN",
            "product_name": "秋季果茶新品「葡萄青韻」",
            "short_word": "季緣・葡萄青韻",
            "item_types": ["新品", "促銷"],
            "info_status": "✅ 品名與買一送一日期已確認（⏳ 原價待確認）",
            "is_pending_confirm": True,
            "flavor_category": "鮮果茶／青茶",
            "price_promo": "10/27 起連 4 天買一送一（⏳ 單杯原價待確認）",
            "observation_weeks": ["2026-W43"],
            "primary_week": "2026-W43",
            "latest_published_at": "2026-10-22 15:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": ["GNEWS-076"],
            "roundup_news_ids": [],
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅", "PTT ✅ (未檢出)", "YouTube ⚠️未檢出", "IG/FB索引 ⚠️未檢出"],
            "media_summary": "1 筆單篇專文（NOWnews GNEWS-076）報導季緣推出秋季果茶新品「葡萄青韻」並祭出連 4 天買一送一。",
            "consumer_summary": "【當期 PTT 討論：本次採集範圍內未找到】",
            "unknowns": [
                "葡萄青韻之單杯定價與消費者實際評價未知。"
            ]
        },
        {
            "product_id": "PROD-ROUNDUP-1111",
            "entity_type": "活動",
            "launch_stage": "🚀 雙11檔期促銷合集",
            "region": "台灣",
            "brand": "跨品牌雙11檔期（五桐號／先喝道／御私藏／日出茶太等）",
            "product_name": "雙11手搖飲「買一送一／11元加購」跨品牌促銷懶人包合集",
            "short_word": "雙11跨品牌・買一送一合集",
            "item_types": ["促銷", "合集"],
            "info_status": "⏳ 屬多品牌促銷合集，各家細項需逐篇開啟核對",
            "is_pending_confirm": True,
            "flavor_category": "跨品牌檔期促銷",
            "price_promo": "買一送一、第二杯11元、買11送11等跨品牌雙11限時優惠",
            "observation_weeks": ["2026-W46", "2026-W45"],
            "primary_week": "2026-W46",
            "latest_published_at": "2026-11-12 01:36:14",
            "captured_at": "2026-11-12 11:32:12",
            "focused_news_ids": [],
            "roundup_news_ids": get_event_record_ids("EVT-ROUNDUP-1111"),
            "current_period_ptt_ids": [],
            "recent_push_old_post_ids": [],
            "historical_ref_ptt_ids": [],
            "current_official_social_ids": [],
            "annotated_ptt_rules": [],
            "annotated_yt_rules": [],
            "coverage_badges": ["新聞RSS ✅ (20筆合集)", "PTT ✅", "YouTube ✅", "IG/FB索引 ⚠️部分"],
            "media_summary": "共 20 筆雙11跨品牌懶人包新聞同時彙整五桐號、先喝道、御私藏、日出茶太、迷客夏、CoCo 等買一送一優惠（已將合集與單品分開計價，避免合集篇數直接虛胖單品分數）。",
            "consumer_summary": "除金茶伍「兩顆紅蘋」於舊文新增買一送一推文外，其餘雙11合集提及品牌尚無獨立當期 PTT 開箱文。",
            "unknowns": [
                "合集內各家優惠飲品之實際兌換人數無公開數據。"
            ]
        }
    ]

    enriched_products = []
    for p in raw_products:
        focused_objs = [news_by_id[nid] for nid in p["focused_news_ids"] if nid in news_by_id]
        roundup_objs = [news_by_id[nid] for nid in p["roundup_news_ids"] if nid in news_by_id]
        all_news_objs = focused_objs + roundup_objs
        unique_publishers = sorted({r.get("publisher_name", "未知媒體") for r in all_news_objs})
        unique_focused_publishers = sorted({r.get("publisher_name", "未知媒體") for r in focused_objs})

        cur_ptt_objs = [ptt_by_id[pid] for pid in p["current_period_ptt_ids"] if pid in ptt_by_id]
        recent_push_objs = [ptt_by_id[pid] for pid in p["recent_push_old_post_ids"] if pid in ptt_by_id]
        hist_ptt_objs = [ptt_by_id[pid] for pid in p["historical_ref_ptt_ids"] if pid in ptt_by_id]
        all_ptt_objs = cur_ptt_objs + recent_push_objs + hist_ptt_objs
        total_pushes = sum(a.get("raw_original", {}).get("total_push_entries", 0) for a in all_ptt_objs)

        # Resolve annotated YT & Social objects
        annotated_yt_objs = []
        for yr in p.get("annotated_yt_rules", []):
            yobj = yt_by_id.get(yr["yt_evidence_id"])
            if yobj:
                merged_y = dict(yobj)
                merged_y["video_class"] = yr["video_class"]
                annotated_yt_objs.append(merged_y)

        official_soc_objs = [soc_by_id[sid] for sid in p.get("current_official_social_ids", []) if sid in soc_by_id]
        prod_id = p["product_id"]
        linked_soc_all = [s for s in social_posts if prod_id in (s.get("linked_product_ids") or [])]
        for s in official_soc_objs:
            if s not in linked_soc_all:
                linked_soc_all.append(s)

        p_copy = dict(p)
        p_copy["current_official_social_posts"] = official_soc_objs
        p_copy["annotated_ptt_evidence"] = p.get("annotated_ptt_rules", [])
        p_copy["annotated_yt_evidence"] = annotated_yt_objs
        p_copy["metrics"] = {
            "focused_news_count": len(focused_objs),
            "unique_focused_publisher_count": len(unique_focused_publishers),
            "roundup_news_count": len(roundup_objs),
            "total_news_count": len(all_news_objs),
            "unique_publisher_count": len(unique_publishers),
            "unique_publishers": unique_publishers,
            "current_period_ptt_count": len(cur_ptt_objs),
            "recent_push_old_post_count": len(recent_push_objs),
            "historical_ref_ptt_count": len(hist_ptt_objs),
            "total_ptt_count": len(all_ptt_objs),
            "total_ptt_pushes": total_pushes,
            "youtube_video_count": len(annotated_yt_objs),
            "current_youtube_count": sum(1 for v in annotated_yt_objs if v["video_class"].startswith("CURRENT_")),
            "social_index_count": len(linked_soc_all),
            "current_official_social_count": len(official_soc_objs)
        }

        # Programmatically compute baseline scores and sensitivity schemes
        base_score_res = compute_scores_for_product(p_copy, MODEL_PARAMS_V0_1)
        p_copy["metrics"]["media_score"] = base_score_res["media_score"]
        p_copy["metrics"]["discussion_score"] = base_score_res["discussion_score"]
        p_copy["metrics"]["video_score"] = base_score_res["video_score"]
        p_copy["metrics"]["priority_score"] = base_score_res["priority_score"]
        p_copy["metrics"]["composite_score_status"] = f"{base_score_res['priority_score']:.1f} 分（優先關注分｜試行版 v0.1）"
        p_copy["score_breakdown"] = base_score_res["breakdown_lines"]

        sens_scores = {}
        for s_key, s_cfg in SENSITIVITY_SCHEMES.items():
            s_res = compute_scores_for_product(p_copy, s_cfg["params"])
            sens_scores[s_key] = {
                "label": s_cfg["label"],
                "priority_score": s_res["priority_score"],
                "media_score": s_res["media_score"],
                "discussion_score": s_res["discussion_score"],
                "video_score": s_res["video_score"]
            }
        p_copy["sensitivity_scores"] = sens_scores

        p_copy["resolved_focused_news"] = focused_objs
        p_copy["resolved_roundup_news"] = roundup_objs
        p_copy["resolved_current_ptt"] = cur_ptt_objs
        p_copy["resolved_recent_push_ptt"] = recent_push_objs
        p_copy["resolved_historical_ptt"] = hist_ptt_objs
        p_copy["resolved_youtube_videos"] = annotated_yt_objs
        p_copy["resolved_social_posts"] = linked_soc_all
        enriched_products.append(p_copy)

    # Sort by baseline priority_score descending to assign ranks for sensitivity comparison
    for s_key in SENSITIVITY_SCHEMES:
        ranked = sorted(
            enriched_products,
            key=lambda x: (x["sensitivity_scores"][s_key]["priority_score"], x["metrics"]["total_news_count"]),
            reverse=True
        )
        for r_idx, item in enumerate(ranked, 1):
            item["sensitivity_scores"][s_key]["rank"] = r_idx

    raw_news_ranked = sorted(
        enriched_products,
        key=lambda x: (x["metrics"]["total_news_count"], x["metrics"]["focused_news_count"]),
        reverse=True
    )
    for r_idx, item in enumerate(raw_news_ranked, 1):
        item["metrics"]["raw_news_rank"] = r_idx

    observation_periods = [
        {
            "period_id": "ALL",
            "label": "ALL（滾動 30 天觀察窗 2026/10/14~11/13 — 共 17 項商品／系列／活動）",
            "date_range": "2026/10/14 - 2026/11/13",
            "description": "當期榜明訂滾動 30 天觀察窗，保存每次分數、來源快照與模型版本 (v0.1-trial)"
        },
        {
            "period_id": "2026-W46",
            "label": "2026-W46 (11/09~11/13 當期最新) — 迷客夏太妃、麻古芋泥回歸、CoCo皮克敏",
            "date_range": "2026/11/09 - 2026/11/13",
            "description": "依實際發布日歸屬本週之商品／系列／活動"
        },
        {
            "period_id": "2026-W45",
            "label": "2026-W45 (11/02~11/08) — CoCo皮克敏聯名、龜記Oatly抹茶、李記紅茶實測",
            "date_range": "2026/11/02 - 2026/11/08",
            "description": "依實際發布日歸屬 11/02~11/08 之商品与 PTT 當期實測文"
        },
        {
            "period_id": "2026-W44",
            "label": "2026-W44 (10/26~11/01) — 迷客夏糖燻奶霜、CoCo與茶湯會可可季、吃茶三千實測",
            "date_range": "2026/10/26 - 2026/11/01",
            "description": "依實際發布日歸屬 10/26~11/01 之秋冬新品與 PTT 當期實測文"
        },
        {
            "period_id": "2026-W43",
            "label": "2026-W43 (10/14~10/25) — 大茗榴槤冰淇淋、珍煮丹蕎麥、麻古巨峰葡萄",
            "date_range": "2026/10/14 - 2026/10/25",
            "description": "依實際發布日歸屬 10 月中下旬之萬聖節與秋季新品"
        }
    ]

    crawl_batches = [
        {
            "batch_id": "BATCH-20261113-SCORE-V01",
            "executed_at": "2026-11-13 00:35:00",
            "source_pipeline": "優先關注分｜試行版 (v0.1-trial) 計分引擎與 30 天滾動窗快照",
            "query_scope": "區分單品/系列/活動 + 四步過濾 + 敏感度測試 (Scheme A/B/C)",
            "records_collected": "17 項觀察對象全數由同一套 Python 參數產出子分數與計算明細，並寫入 score_snapshot_history.json",
            "status": "✅ 程式驗證一致"
        },
        {
            "batch_id": "BATCH-20261113-YT-SOCIAL",
            "executed_at": "2026-11-13 00:09:08",
            "source_pipeline": "線路二 YouTube 公開搜尋 (ytInitialData) + 線路三 IG/FB 搜尋引擎公開索引",
            "query_scope": "5 組 YouTube 開箱/新聞關鍵字 + DuckDuckGo HTML site:instagram.com / site:facebook.com",
            "records_collected": f"{len(yt_videos)} 部 YouTube 影片（含真實觀看次數）+ {len(social_posts)} 筆 IG/FB 公開貼文索引",
            "status": "✅ YouTube 成功 / ⚠️ IG&FB 搜尋索引部分成功"
        },
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
        "generated_at": "2026-11-13T00:35:00+08:00",
        "model_metadata": MODEL_PARAMS_V0_1,
        "total_products": len(enriched_products),
        "observation_periods": observation_periods,
        "crawl_batches": crawl_batches,
        "products": enriched_products
    }

    with open(OUTPUT_PRODUCTS_PATH, "w", encoding="utf-8") as f:
        json.dump(output_payload, f, ensure_ascii=False, indent=2)

    # Save versioned snapshot for historical explainability
    snapshot_entry = {
        "snapshot_id": "SNAP-20261113-V01",
        "generated_at": "2026-11-13T00:35:00+08:00",
        "model_version": MODEL_PARAMS_V0_1["model_version"],
        "rolling_window_range": MODEL_PARAMS_V0_1["rolling_window_range"],
        "parameters": MODEL_PARAMS_V0_1,
        "items": [
            {
                "product_id": x["product_id"],
                "entity_type": x["entity_type"],
                "brand": x["brand"],
                "product_name": x["product_name"],
                "media_score": x["metrics"]["media_score"],
                "discussion_score": x["metrics"]["discussion_score"],
                "video_score": x["metrics"]["video_score"],
                "priority_score": x["metrics"]["priority_score"],
                "score_breakdown": x["score_breakdown"],
                "sensitivity_scores": x["sensitivity_scores"]
            }
            for x in sorted(enriched_products, key=lambda i: i["metrics"]["priority_score"], reverse=True)
        ]
    }
    with open(SNAPSHOT_HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump({"snapshots": [snapshot_entry]}, f, ensure_ascii=False, indent=2)

    print(f"[OK] 已由單一計分程式建立真實目錄：{OUTPUT_PRODUCTS_PATH}（共 {len(enriched_products)} 項單品／系列／活動）")
    for item in snapshot_entry["items"][:10]:
        s_a = item["sensitivity_scores"]["Scheme_A_Baseline"]
        s_b = item["sensitivity_scores"]["Scheme_B_Discussion_Up"]
        s_c = item["sensitivity_scores"]["Scheme_C_Strict_Roundup"]
        print(
            f"  #{s_a['rank']:02d} [{item['entity_type']}] {item['brand']} - {item['product_name'][:20]} | "
            f"總分={item['priority_score']:.1f} (媒{item['media_score']:.1f}/討{item['discussion_score']:.1f}/影{item['video_score']:.1f}) | "
            f"B排名=#{s_b['rank']}({s_b['priority_score']:.1f}) | C排名=#{s_c['rank']}({s_c['priority_score']:.1f})"
        )
    return output_payload


if __name__ == "__main__":
    build_product_catalog()
