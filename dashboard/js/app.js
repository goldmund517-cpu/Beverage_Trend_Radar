// ============================================================================
// 公開商品熱度觀察室 — 階段二：新聞事件歸納 × PTT 飲料板消費者討論對照
// 1. 「95筆依連結去重的新聞紀錄」歸納為 20 個事件（區分新品、舊品回歸、促銷、合集、單篇獨立保留）
// 2. 完成 PTT 飲料板 (Drink) 14 篇文章＋79 則推噓文端到端採集，嚴格分離「原文內容」與「程式分析結果」
// 3. 並列呈現 3 個新聞事件之「媒體報導了什麼」「使用者實際說了什麼」「目前還不知道什麼」
// ============================================================================

const verifiedNewsData = {
  "captured_at": "2026-11-12 11:32:12",
  "total_unique_records": 95,
  "queries": [
    {
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "rss_url": "https://news.google.com/rss/search?q=%28%E6%89%8B%E6%90%96%E9%A3%B2%20OR%20%E6%89%8B%E6%90%96%E6%9D%AF%29%20%28%E6%96%B0%E5%93%81%20OR%20%E6%96%B0%E4%B8%8A%E5%B8%82%20OR%20%E8%81%AF%E5%90%8D%20OR%20%E8%B2%B7%E4%B8%80%E9%80%81%E4%B8%80%29%20when%3A30d&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
      "captured_at": "2026-11-12 11:32:12",
      "http_status": 200,
      "raw_items_returned": 31,
      "unique_items_saved": 31,
      "status": "已測試可取得"
    },
    {
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "rss_url": "https://news.google.com/rss/search?q=%28%E8%BF%B7%E5%AE%A2%E5%A4%8F%20OR%20%E5%BE%97%E6%AD%A3%20OR%20%E4%B8%80%E6%B2%90%E6%97%A5%20OR%20%E4%BA%94%E6%A1%90%E8%99%9F%20OR%20%E9%BE%9C%E8%A8%98%20OR%20%E5%85%AB%E6%9B%9C%E5%92%8C%E8%8C%B6%20OR%20%E5%A4%A7%E8%8C%97%20OR%20CoCo%20OR%20%E9%BA%BB%E5%8F%A4%E8%8C%B6%E5%9D%8A%29%20%28%E6%96%B0%E5%93%81%20OR%20%E6%8E%A8%E5%87%BA%20OR%20%E9%96%8B%E8%B3%A3%20OR%20%E8%81%AF%E5%90%8D%29%20when%3A30d&hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
      "captured_at": "2026-11-12 11:32:12",
      "http_status": 200,
      "raw_items_returned": 75,
      "unique_items_saved": 64,
      "status": "已測試可取得"
    }
  ],
  "records": [
    {
      "evidence_id": "GNEWS-001",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-12 08:48:19",
      "published_at_raw": "Thu, 12 Nov 2026 00:48:19 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Marie Claire 美麗佳人",
      "source_media_home": "https://www.marieclaire.com.tw",
      "rss_title": "2026雙11優惠懶人包！手搖飲買1送1、飯店餐券6折與11元家電開搶 - Marie Claire 美麗佳人",
      "clean_title": "2026雙11優惠懶人包！手搖飲買1送1、飯店餐券6折與11元家電開搶",
      "rss_link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFBKWERXQ1p1Vy1LbVZyTU5XMU5MWjY3STJxcm5nMXNvS08ySUNxb1lvdU9oeVB6WV9ZZ3ZoREhsTlhJWG9lUThBSkN0MlN1ZGxaa1JtRmt3QWIxVFNqSjNISg?oc=5",
      "rss_description_text": "2026雙11優惠懶人包！手搖飲買1送1、飯店餐券6折與11元家電開搶 Marie Claire 美麗佳人",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-002",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 13:57:18",
      "published_at_raw": "Wed, 11 Nov 2026 05:57:18 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "皮克敏全家、CoCo金色花苗不要囤！遊戲隱藏機制曝光：會影響任務 - NOWnews今日新聞",
      "clean_title": "皮克敏全家、CoCo金色花苗不要囤！遊戲隱藏機制曝光：會影響任務",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE1nNHIweHUwVG5PVXIwQkx2RmpSU05SWWdMd1JiWmxJUl92QkRoN1ZFRkRIdVNVYUhHYXBtX0xYMlVqVHF4a3BjUks4Ylk1RDlUOGfSAVJBVV95cUxNZzRyMHh1MFRuT1VyMEJMdkZqUlNOUllnTHdSYlpsSVJfdkJEaDdWRUZESHVTVWFIR2FwbV9MWDJValRxeGtwY1JLOGJZNUQ5VDhn?oc=5",
      "rss_description_text": "皮克敏全家、CoCo金色花苗不要囤！遊戲隱藏機制曝光：會影響任務 NOWnews今日新聞",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-003",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 13:30:33",
      "published_at_raw": "Wed, 11 Nov 2026 05:30:33 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "JUKSY 街星",
      "source_media_home": "https://www.juksy.com",
      "rss_title": "迷客夏新品抹茶好喝嗎？最新菜單、價格、飲品推薦一次看！ - JUKSY 街星",
      "clean_title": "迷客夏新品抹茶好喝嗎？最新菜單、價格、飲品推薦一次看！",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9maUJpbkZ4eVdJWXRVTnRIcW82bkZhOHlsYmRRRTAzQXQxcmQ2NlFBbXpqZFNZa1REWEplR00tYkFRdmw1Zk5NcTdSanA?oc=5",
      "rss_description_text": "迷客夏新品抹茶好喝嗎？最新菜單、價格、飲品推薦一次看！ JUKSY 街星",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-004",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 13:12:25",
      "published_at_raw": "Wed, 11 Nov 2026 05:12:25 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "雙11優惠CoCo買一送一！迷客夏11元　麻古、珍煮丹、大苑子8家曝 - NOWnews今日新聞",
      "clean_title": "雙11優惠CoCo買一送一！迷客夏11元　麻古、珍煮丹、大苑子8家曝",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE83OVUxdFR4ejhXbDFqNGZwWXJSYTIyLVo4dTlneGljNk9TZG50ejNFLXZIaGpCRURSVlo1ME43bXAxa1R3a3Mtd1ZVczNJRUt2QUHSAVJBVV95cUxPNzlVMXRUeHo4V2wxajRmcFlyUmEyMi1aOHU5Z3hpYzZPU2RudHozRS12SGhqQkVEUlZaNTBON21wMWtUd2tzLXdWVXMzSUVLdkFB?oc=5",
      "rss_description_text": "雙11優惠CoCo買一送一！迷客夏11元 麻古、珍煮丹、大苑子8家曝 NOWnews今日新聞",
      "brand_detected": "多品牌提及（迷客夏、CoCo都可、麻古茶坊、珍煮丹、大苑子）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-005",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 11:56:35",
      "published_at_raw": "Wed, 11 Nov 2026 03:56:35 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "udn",
      "source_media_home": "https://travel.udn.com",
      "rss_title": "迷客夏「11元娜杯紅茶」！雙11「線上買11送11」 冬季新品「太妃序曲」開賣、「法芙娜可可」回歸 - udn",
      "clean_title": "迷客夏「11元娜杯紅茶」！雙11「線上買11送11」 冬季新品「太妃序曲」開賣、「法芙娜可可」回歸",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9NMmpfbE9WQkpmeGFVLXdVSTVQMHJYTWVNanAwbVA0ZmU0SmRqWjdUYWtDd2dIb0JfQl9TWFRObjY5aE1MRHllNUtFWTFWZ29ic1lYcDc4SmpsT0xL?oc=5",
      "rss_description_text": "迷客夏「11元娜杯紅茶」！雙11「線上買11送11」 冬季新品「太妃序曲」開賣、「法芙娜可可」回歸 udn",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-006",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 11:18:26",
      "published_at_raw": "Wed, 11 Nov 2026 03:18:26 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "迷客夏新品抹茶、太妃今開賣爆紅！雙11優惠菜單價格　眾店員求饒 - NOWnews今日新聞",
      "clean_title": "迷客夏新品抹茶、太妃今開賣爆紅！雙11優惠菜單價格　眾店員求饒",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTFBNelhwOHhGNTZjdHIyanVVVlEwQkhvZjFaTjdLaVVMRE4taVM1cEFFVzRJNGhmeklVa000UzZIVVp5STZKRVIxM0o0SmUwWXNzb0HSAVJBVV95cUxQTXpYcDh4RjU2Y3RyMmp1VVZRMEJIb2YxWk43S2lVTEROLWlTNXBBRVc0STRoZnpJVWtNNFM2SFVaeUk2SkVSMTNKNEplMFlzc29B?oc=5",
      "rss_description_text": "迷客夏新品抹茶、太妃今開賣爆紅！雙11優惠菜單價格 眾店員求饒 NOWnews今日新聞",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-007",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 11:15:00",
      "published_at_raw": "Wed, 11 Nov 2026 03:15:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "ETtoday旅遊雲",
      "source_media_home": "https://travel.ettoday.net",
      "rss_title": "手搖飲雙11優惠　日出茶太買1送1、迷客夏娜杯紅茶11元 - ETtoday旅遊雲",
      "clean_title": "手搖飲雙11優惠　日出茶太買1送1、迷客夏娜杯紅茶11元",
      "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFA3VTB5TU1Kd2JIdmU4TE84YXBScGg2T3VtNlVvRE1aZTI0bVlTN3RmSzBmVEp3alJYYTVTVWkzNVl2UFpNRjNLRHktMWwyRGljaHA4Qm1ZSVB5d9IBT0FVX3lxTE5BdEp4ZHFMYWJYbk5pQlFyclZ0QTVpOUIwZkNJUU5FdkgtcEtaYTdEMFBDcFd4TlFaM0pxN1FfQUotdDZrR0NneTlBOE5tY1E?oc=5",
      "rss_description_text": "手搖飲雙11優惠 日出茶太買1送1、迷客夏娜杯紅茶11元 ETtoday旅遊雲",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-008",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 11:12:00",
      "published_at_raw": "Wed, 11 Nov 2026 03:12:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "TVBS新聞網",
      "source_media_home": "https://news.tvbs.com.tw",
      "rss_title": "雙11手搖優惠！CoCo雙響炮買1送1 迷客夏買11送11 - TVBS新聞網",
      "clean_title": "雙11手搖優惠！CoCo雙響炮買1送1 迷客夏買11送11",
      "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9nVlN1LWROcUE1YXlGMGdoYW10QjJJbWFOeXNPd0ZVTkdYV2JBZWFGUFNxRzFGREJJVGhNWGFiOWdqZUlmTjI5c0hacF9zdw?oc=5",
      "rss_description_text": "雙11手搖優惠！CoCo雙響炮買1送1 迷客夏買11送11 TVBS新聞網",
      "brand_detected": "多品牌提及（迷客夏、CoCo都可）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-009",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-11 09:08:21",
      "published_at_raw": "Wed, 11 Nov 2026 01:08:21 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Zeek玩家誌",
      "source_media_home": "https://zeekmagazine.com",
      "rss_title": "迷客夏冬季限定「太妃序曲」系列開賣！限時免費加料「太妃奶Q」、加11元再多一杯 - Zeek玩家誌",
      "clean_title": "迷客夏冬季限定「太妃序曲」系列開賣！限時免費加料「太妃奶Q」、加11元再多一杯",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE10Z3pVcTQ0MFhVX0ZqNUdGNFpGVjEtNTZlempMd3VNUFRSanNGTEp6TGNjT3JiZTA0UVZCSXdObng0RmpGYWNjNEExNFNzby0xUlE?oc=5",
      "rss_description_text": "迷客夏冬季限定「太妃序曲」系列開賣！限時免費加料「太妃奶Q」、加11元再多一杯 Zeek玩家誌",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-010",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 16:16:00",
      "published_at_raw": "Tue, 10 Nov 2026 08:16:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "CoCo買一送一、迷客夏紅茶11元！雙11「手搖飲優惠」11間，鶴茶樓第２杯半價 - 食尚玩家",
      "clean_title": "CoCo買一送一、迷客夏紅茶11元！雙11「手搖飲優惠」11間，鶴茶樓第２杯半價",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5rQ2ZRRnBxcmtld2U0YVFLbGgtZHVjNTFzZnpzRUtXZi1tdzJTZkpnNmxQTjIwamVpd3U5T3g0bHBqcWhiNDFRNFdneGtyMHZjdHV3dw?oc=5",
      "rss_description_text": "CoCo買一送一、迷客夏紅茶11元！雙11「手搖飲優惠」11間，鶴茶樓第２杯半價 食尚玩家",
      "brand_detected": "多品牌提及（迷客夏、CoCo都可、鶴茶樓）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-011",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 16:00:00",
      "published_at_raw": "Tue, 10 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "今周刊",
      "source_media_home": "https://www.businesstoday.com.tw",
      "rss_title": "皮克敏11月活動！CoCo聯名活動開跑，飾品皮克敏怎麼拿？新玩法「神秘洞窟」將上線…社群日、巨菇時間先筆記 - 今周刊",
      "clean_title": "皮克敏11月活動！CoCo聯名活動開跑，飾品皮克敏怎麼拿？新玩法「神秘洞窟」將上線…社群日、巨菇時間先筆記",
      "rss_link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxOYzNQMjdIWWNMSEJ1UnBlWXU0bm1PT0tJRF9QSTRDcUhUTzRRMzFnenNTSXdfd0ZaZUJNTnpYdnF4TlJsczlPdG9EMmp0VW05RHVhX3lFNGRFdVdTenlsMnZ1d1NUZERPTGw1RENzZjU5dzgxY2VzdV9nZUFJWV9Kag?oc=5",
      "rss_description_text": "皮克敏11月活動！CoCo聯名活動開跑，飾品皮克敏怎麼拿？新玩法「神秘洞窟」將上線…社群日、巨菇時間先筆記 今周刊",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認候選：神秘洞窟（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-012",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 16:00:00",
      "published_at_raw": "Tue, 10 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Niusnews妞新聞",
      "source_media_home": "https://www.niusnews.com",
      "rss_title": "迷客夏冬季「太妃序曲」新品登場！10款必喝推薦懶人包，法芙娜可可回歸、靜岡焙焙鮮奶激推 - Niusnews妞新聞",
      "clean_title": "迷客夏冬季「太妃序曲」新品登場！10款必喝推薦懶人包，法芙娜可可回歸、靜岡焙焙鮮奶激推",
      "rss_link": "https://news.google.com/rss/articles/CBMiS0FVX3lxTFBVaHlSTklOVDhDX19uOHVsN2FmNmx6dWxMUjVMUF9WaXdObWtUbjZBVkkzMHpYQnVRMkoyVWJwQkgxRDJZM0thc2FUcw?oc=5",
      "rss_description_text": "迷客夏冬季「太妃序曲」新品登場！10款必喝推薦懶人包，法芙娜可可回歸、靜岡焙焙鮮奶激推 Niusnews妞新聞",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認候選：太妃序曲（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-013",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 15:22:40",
      "published_at_raw": "Tue, 10 Nov 2026 07:22:40 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Cosmopolitan",
      "source_media_home": "https://www.cosmopolitan.com",
      "rss_title": "「雙11優惠」11/11限定，手搖飲買1送1、好市多現折600元、繼光香香雞可樂餅免費送！ - Cosmopolitan",
      "clean_title": "「雙11優惠」11/11限定，手搖飲買1送1、好市多現折600元、繼光香香雞可樂餅免費送！",
      "rss_link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQeTI3Y1Y5Q0YzbEczZDllTGZRNlcyUFNzMlYzdThFb3hZT01waTdCUGNqVjlYaUJHMVVBbmhXN0Q2SlZrNEtkeHBmdXo5MlA4eWdXem5Vb0ZKU3BWZGdFdi1rc3N5LUdOWWhiUW9MbWIzZUlJWC0wYUdCUTBJWlFpSVFmcUw1ci1kQk84SUJYWVg?oc=5",
      "rss_description_text": "「雙11優惠」11/11限定，手搖飲買1送1、好市多現折600元、繼光香香雞可樂餅免費送！ Cosmopolitan",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-014",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 15:21:18",
      "published_at_raw": "Tue, 10 Nov 2026 07:21:18 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "卡優新聞網",
      "source_media_home": "https://www.cardu.com.tw",
      "rss_title": "麻古茶坊芋泥系列回歸開賣 三款人氣飲品一次喝 - 卡優新聞網",
      "clean_title": "麻古茶坊芋泥系列回歸開賣 三款人氣飲品一次喝",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE53RmJleDZMQXhIcGV5Y2FJVXJfNmZob3IyT0dvcmxpaXVUSHJPQ0lfM184TTdnVEROU1RIUUszYU04b2JoNjNfRUFyUXItNmotY1p2RGVlVG4xOFdl?oc=5",
      "rss_description_text": "麻古茶坊芋泥系列回歸開賣 三款人氣飲品一次喝 卡優新聞網",
      "brand_detected": "麻古茶坊",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-015",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 14:00:00",
      "published_at_raw": "Tue, 10 Nov 2026 06:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "上報Up Media",
      "source_media_home": "https://www.upmedia.mg",
      "rss_title": "【雙11優惠】咖啡、手搖飲買一送一！四大超商、全聯、星巴克、CoCo、大苑子等14 家飲品優惠懶人包 - 上報Up Media",
      "clean_title": "【雙11優惠】咖啡、手搖飲買一送一！四大超商、全聯、星巴克、CoCo、大苑子等14 家飲品優惠懶人包",
      "rss_link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTFBNRDRIOW1tN3JpWjFGQ0I5WDJOZUo2NENMSHZvS0VnU1NFRUMwNC1QWDB4TS1DYVZqR3VSRThVWXpzc0Z3WFhMMkZjb1kwelBwdFQ2X2l6bDZrS3c?oc=5",
      "rss_description_text": "【雙11優惠】咖啡、手搖飲買一送一！四大超商、全聯、星巴克、CoCo、大苑子等14 家飲品優惠懶人包 上報Up Media",
      "brand_detected": "多品牌提及（CoCo都可、星巴克、大苑子）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-016",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 12:00:00",
      "published_at_raw": "Tue, 10 Nov 2026 04:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "TVBS新聞網",
      "source_media_home": "https://news.tvbs.com.tw",
      "rss_title": "全家皮克敏聯名開跑！7款「零食皮克敏」金色花苗、特殊地點與加碼攻略 - TVBS新聞網",
      "clean_title": "全家皮克敏聯名開跑！7款「零食皮克敏」金色花苗、特殊地點與加碼攻略",
      "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9acHNBbW92VkFBTVJpMzhkd085ak9nNHgyWEpJQmFIYTE2akYtbDlIQ0ZGZF8yMVRvbENxcEFzdHhJdUpUbW9tckFQNmw3UQ?oc=5",
      "rss_description_text": "全家皮克敏聯名開跑！7款「零食皮克敏」金色花苗、特殊地點與加碼攻略 TVBS新聞網",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-017",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 11:40:00",
      "published_at_raw": "Tue, 10 Nov 2026 03:40:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "TVBS新聞網",
      "source_media_home": "https://news.tvbs.com.tw",
      "rss_title": "皮克敏11月活動懶人包》全家與CoCo聯名、天竺葵社群日與5週年飾品 - TVBS新聞網",
      "clean_title": "皮克敏11月活動懶人包》全家與CoCo聯名、天竺葵社群日與5週年飾品",
      "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTFBBNnRSekI3b0NlRk4tMTZkUG5wN3VfbVd0Q080YUYwb0lzMC1ibjJQXzZVZG5YMGFnRXpWaWt4Nzd1VDhfZ1JVdzJkNXRGZw?oc=5",
      "rss_description_text": "皮克敏11月活動懶人包》全家與CoCo聯名、天竺葵社群日與5週年飾品 TVBS新聞網",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-018",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 11:04:22",
      "published_at_raw": "Tue, 10 Nov 2026 03:04:22 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "udn",
      "source_media_home": "https://travel.udn.com",
      "rss_title": "2026「雙11美食優惠」懶人包！咖啡、手搖飲、麥當勞買1送1 肯德基蛋撻11元 摩斯加11元多1件 - udn",
      "clean_title": "2026「雙11美食優惠」懶人包！咖啡、手搖飲、麥當勞買1送1 肯德基蛋撻11元 摩斯加11元多1件",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9IYVhzYjZrTFN6QVQ3RFgwVTdjV3Y1MWRjRjVVb0VLakxLN2dhWjF2YWV5blRabG5lOS1ObmI2dnBFOUhXLVJNWXdsQlY3eXNMMXdLZVB5aUxoQUlZ?oc=5",
      "rss_description_text": "2026「雙11美食優惠」懶人包！咖啡、手搖飲、麥當勞買1送1 肯德基蛋撻11元 摩斯加11元多1件 udn",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-019",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 10:11:00",
      "published_at_raw": "Tue, 10 Nov 2026 02:11:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "買飲料竟能抽演唱會門票！UG告五人限定杯登場，迷客夏11元加購紅茶 - 食尚玩家",
      "clean_title": "買飲料竟能抽演唱會門票！UG告五人限定杯登場，迷客夏11元加購紅茶",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1LOERyZnRHcmNRZFdEbFRzeG5leFFzb1JRTXFVNWVDMEVBOFFBZGRQc1VHbEdiYTNVMFltbG94NGhRdXNmVTU3bXp6NkZxd3hBT1Bzdw?oc=5",
      "rss_description_text": "買飲料竟能抽演唱會門票！UG告五人限定杯登場，迷客夏11元加購紅茶 食尚玩家",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-020",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 05:03:00",
      "published_at_raw": "Mon, 09 Nov 2026 21:03:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "雙11飲料優惠！CoCo、日出茶太、五桐號買一送一　翰林珍奶40元 - NOWnews今日新聞",
      "clean_title": "雙11飲料優惠！CoCo、日出茶太、五桐號買一送一　翰林珍奶40元",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFA1Z1hiMlo1d0R0NDFfY1M3eVh3M3dUaHJQcjg2V29jbnJ5UEQyZ0pJTnFIY3dGMi1YUm1aWDIwZVpkdFpocWpQZUJwZUPSAVJBVV95cUxPSF9PREZPRTd5NUxTSGVHVmlQaDNiZE5iNUpnbjZQTVhhWTJKQ0duSjNwVVBmeG93ZlVDOXc0Z0g2eDFLdFJRUlhHNXhMblY4NUdB?oc=5",
      "rss_description_text": "雙11飲料優惠！CoCo、日出茶太、五桐號買一送一 翰林珍奶40元 NOWnews今日新聞",
      "brand_detected": "多品牌提及（五桐號、CoCo都可）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-021",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-10 02:37:00",
      "published_at_raw": "Mon, 09 Nov 2026 18:37:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "WalkerLand 窩客島",
      "source_media_home": "https://www.walkerland.com.tw",
      "rss_title": "Pikmin Bloom皮克敏迷快衝全家！7款五週年限定造型開放收集，CoCo都可再推8款咖啡杯皮克敏 - WalkerLand 窩客島",
      "clean_title": "Pikmin Bloom皮克敏迷快衝全家！7款五週年限定造型開放收集，CoCo都可再推8款咖啡杯皮克敏",
      "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTFBCdmFTeUVTN3JsSW5zRGVBZTd4d1ZTSnVVREppVUJLNTgyRGRVUU1ic2IzbkpEd2FXdi1pUGJINUx0LTFzMHVXVU00MTZxek5SNEZSX2NHX214RHZpZ3c?oc=5",
      "rss_description_text": "Pikmin Bloom皮克敏迷快衝全家！7款五週年限定造型開放收集，CoCo都可再推8款咖啡杯皮克敏 WalkerLand 窩客島",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-022",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 23:04:00",
      "published_at_raw": "Mon, 09 Nov 2026 15:04:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "城市學",
      "source_media_home": "https://city.gvm.com.tw",
      "rss_title": "皮克敏全家聯名11/10登場！7款五週年零食飾品怎麼拿？3個「特殊地點」藏限時驚喜 - 城市學",
      "clean_title": "皮克敏全家聯名11/10登場！7款五週年零食飾品怎麼拿？3個「特殊地點」藏限時驚喜",
      "rss_link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTE5OQThxdkRDNW02dlhvSHNqZ20xTjMyeEZRdXBFZVVyaUMtdHlfU1pPOVpCQ1FvY0d0SU1rSmpsTjRabFhPMFdLREh0WmtxS1U?oc=5",
      "rss_description_text": "皮克敏全家聯名11/10登場！7款五週年零食飾品怎麼拿？3個「特殊地點」藏限時驚喜 城市學",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-023",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 20:58:46",
      "published_at_raw": "Mon, 09 Nov 2026 12:58:46 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "COOL-STYLE 潮流生活網",
      "source_media_home": "https://www.cool-style.com.tw",
      "rss_title": "小資族這篇快收藏！雙11手搖、速食優惠懶人包：大比薩199元、多款手搖飲買一送一 - COOL-STYLE 潮流生活網",
      "clean_title": "小資族這篇快收藏！雙11手搖、速食優惠懶人包：大比薩199元、多款手搖飲買一送一",
      "rss_link": "https://news.google.com/rss/articles/CBMi3wJBVV95cUxPTGRsb1ZIeFFuam5rUU5KbHNQZHBTZG42cnpZVG13aFpZZkQwblNjOXJLd1Zub3pSNUJ0MFViSzVxaFVMVV9PY0FXam1BRGtjRkVfampvUzNoRTJ3SURBNjlxLWVSb1QyenlTYUltZWR5cldjTk9nOHRZOHBlNHB3U3pBU245RDRNbHpZcVA2bHc3SHBkLTJwQWkyb0Z3dktNRWJaYkJnaXQ5czhxanpNV1QySFNEV1JSOVRCbFFST3ZoSE1tY21BbmVnTHcxa3puSWJGY202V3lpcllMQ1BILW1OaHFzbjgxVDZrMHF0SkY2WkltOHdMa3JGUGdDZEpHdWZqWjFjMmZVTVNYbmR2TEMySDFxbmlJWHZjZlJZanlVaVY3Qzg4bWRJR1hITnZiYzY3OTFVelJybFdOMW54SHExeEpWVGs1WjhqTWEwNUt1c1ZYRTZfWEwxQVpfZ2PSAeQCQVVfeXFMTVdkOU5IRjVLQVRKUWhZLXpkcnBJQVo2RVg4NEZmOEY4ZUZYNHRxbDZILVQ1emRZTm9qWUtuX0JFdFRvRW53Rk9DbmJaRmpiZ1lHSGtrbEk2aGk4QVRpU2sweDVLLU1walBwQXYwY1htZF9lZndRZTZPNWctaEltV254UTBzRlBMSDhOOGZPRUdYYnJWdFJZVEZzMXAzNWxHNTZlQVFRaTVpSDFlZ2hhdGNUTEVrazBmRTR2RjhtVkQ0ZHVIMmlaaWgtT25XZVNRYWczeF96ZGhTc0dCWVQ5WTFPWEZUVFRIc2FPVUtzNG5pSldtMXNvaG1ZNWUwZ0RIejhieUFhZnNFRnlzbEwwaHowaThYZzJ0SVBuUDhVVVQ3bnBBLTZ0RDJPX2VPNzlVSjhlaWh2UTg4eGVSTVIwbVIzUVBGWGVkVFVzNWFJTnVmSHVIMVltYk82YXJEenJnWFFNaE8?oc=5",
      "rss_description_text": "小資族這篇快收藏！雙11手搖、速食優惠懶人包：大比薩199元、多款手搖飲買一送一 COOL-STYLE 潮流生活網",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-024",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 20:16:49",
      "published_at_raw": "Mon, 09 Nov 2026 12:16:49 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "中天新聞網",
      "source_media_home": "https://ctinews.com",
      "rss_title": "手搖優惠大戰！迷客夏11元開喝、拾汣茶屋祭99元殺紅眼 - 中天新聞網",
      "clean_title": "手搖優惠大戰！迷客夏11元開喝、拾汣茶屋祭99元殺紅眼",
      "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE1VOVJTbk43Y011SWRJbmtDS3dFR2RBb29GMnZCWkhMX2U0WUM4aHJITDJucG9nRkI3YWJEc0FQZUZUem1Mb0tyVlFQZGlYUnV6Ym13?oc=5",
      "rss_description_text": "手搖優惠大戰！迷客夏11元開喝、拾汣茶屋祭99元殺紅眼 中天新聞網",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-025",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 17:50:00",
      "published_at_raw": "Mon, 09 Nov 2026 09:50:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "BEAUTY美人圈",
      "source_media_home": "https://www.beauty321.com",
      "rss_title": "迷客夏冬季新品「太妃序曲」上市！日本抹茶、焙茶及法芙娜可可同步登場，再推雙11優惠 - BEAUTY美人圈",
      "clean_title": "迷客夏冬季新品「太妃序曲」上市！日本抹茶、焙茶及法芙娜可可同步登場，再推雙11優惠",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFBRVGlHam1XV25zbUhRX0ZVdkNXZDZRZUdRaXg3ZTRMNFhEdmNTdmgtbkptMmN2a3hoLUoyUDh2QnBSVW9MbVpwZHFuTGzSAVJBVV95cUxNQ2hfNWZ5SGNsNzY4TXJTVGs1eVFadzdDRjRCV1pvSk9QVmJfaFFqWkg4M0VwSGljVGtBNEgxelZ3SFAzOTh5NFdMYy1sVm1FSHFn?oc=5",
      "rss_description_text": "迷客夏冬季新品「太妃序曲」上市！日本抹茶、焙茶及法芙娜可可同步登場，再推雙11優惠 BEAUTY美人圈",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認候選：太妃序曲（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-026",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 17:47:00",
      "published_at_raw": "Mon, 09 Nov 2026 09:47:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "鏡週刊Mirror Media",
      "source_media_home": "https://www.mirrormedia.mg",
      "rss_title": "UG一撕免費看告五人演唱會　迷客夏新品曝 - 鏡週刊Mirror Media",
      "clean_title": "UG一撕免費看告五人演唱會　迷客夏新品曝",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5Xc1hzTDV0SVZZTXlXanVUdXNLR2hFVGdZOFdNU096b3NhNjdqYkk4WmtKblBtbWk4NG9KaHQxWXF3Q2VRNlZCVUJKS2tBalUtX3dHOWRKMG5iRHQ00gFiQVVfeXFMTnpnYjROYnNvSU80QTJaT0FrTjVZSXZkX1RXeVVZNDZKRGM3Ylc5UkVfeGVQQXNSZ0NqMm43Z2NpYlFRcVJYaVlZRy00d1AwbnFUMm5MVWUxbUZjVHZCcHB4dUE?oc=5",
      "rss_description_text": "UG一撕免費看告五人演唱會 迷客夏新品曝 鏡週刊Mirror Media",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-027",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 17:47:00",
      "published_at_raw": "Mon, 09 Nov 2026 09:47:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "三立新聞網SETN.com",
      "source_media_home": "https://www.setn.com",
      "rss_title": "雙11開喝！翰林、日出茶太、迷客夏優惠一次看　UG一撕開看告五人演唱會 - 三立新聞網SETN.com",
      "clean_title": "雙11開喝！翰林、日出茶太、迷客夏優惠一次看　UG一撕開看告五人演唱會",
      "rss_link": "https://news.google.com/rss/articles/CBMiSEFVX3lxTE13VlZIOWxGTkF6SWttZnZKQ3V1ZEZ1OFlwaTI5SElYOHhpSmY0ZlFXZ1NWR2lVaW5fSlY5SjN6X3luV0NlY2xRTdIBTEFVX3lxTE5XcHoxclRVNFhjV2tFT3hXVlNVNWNfeks5bTNqbElyOGd2N3RiU0NwaEE2YzEzTVM1US1LSWZzdHR4SXdMNUljRVM5WEc?oc=5",
      "rss_description_text": "雙11開喝！翰林、日出茶太、迷客夏優惠一次看 UG一撕開看告五人演唱會 三立新聞網SETN.com",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-028",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 17:20:00",
      "published_at_raw": "Mon, 09 Nov 2026 09:20:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "WalkerLand 窩客島",
      "source_media_home": "https://www.walkerland.com.tw",
      "rss_title": "迷客夏買11送11寄杯喝！抹茶、焙茶、娜杯太妃、可可9大新品，未開賣就爆紅|美食 - WalkerLand 窩客島",
      "clean_title": "迷客夏買11送11寄杯喝！抹茶、焙茶、娜杯太妃、可可9大新品，未開賣就爆紅|美食",
      "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTE9TbDRGRHJUVWJhcHBfWENlS2dWMTZVZnI2SEp1SXdpdXZyay1pSmRjdWFoelo5aEFFWXk5Yl9tbkdqQnZQbFhLeGZFdzVGUHNCZ1hDUmNKVkFZQjdydXc?oc=5",
      "rss_description_text": "迷客夏買11送11寄杯喝！抹茶、焙茶、娜杯太妃、可可9大新品，未開賣就爆紅|美食 WalkerLand 窩客島",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-029",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 16:52:53",
      "published_at_raw": "Mon, 09 Nov 2026 08:52:53 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Cosmopolitan",
      "source_media_home": "https://www.cosmopolitan.com",
      "rss_title": "皮克敏聯名全家便利商店！「5週年紀念零食飾品皮克敏」限時登場，送金色花苗＋明信片，領取限制一次看 - Cosmopolitan",
      "clean_title": "皮克敏聯名全家便利商店！「5週年紀念零食飾品皮克敏」限時登場，送金色花苗＋明信片，領取限制一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQZTljOFI5Q19aZG1ZYXk0UklhZ1V0d0NrRzNGS0hGU0NFeDhHQlY4dlpZWHZHZFRaU2c5RTRNcm9sYlVrdEZ2ekIzdk83TDRnZFFUbTlXMlZBYXlMc1ZYMXdGM2R5Z3RPLWpzRnh0eFJQdnNDWGJJNVlMOGtpcmdfdXFsbjJPRVZEdjl1Qmx1RkpRb09NYkdzN0JIbEc4T3R3X2x2b0FGX3pzTUdC?oc=5",
      "rss_description_text": "皮克敏聯名全家便利商店！「5週年紀念零食飾品皮克敏」限時登場，送金色花苗＋明信片，領取限制一次看 Cosmopolitan",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-030",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 16:30:00",
      "published_at_raw": "Mon, 09 Nov 2026 08:30:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "上報Up Media",
      "source_media_home": "https://www.upmedia.mg",
      "rss_title": "【完整菜單】迷客夏買11 送 11、太妃奶Q 免費加！太妃糖、抹茶、焙茶三大系列冬季飲品新推薦法芙娜可可同步回歸 - 上報Up Media",
      "clean_title": "【完整菜單】迷客夏買11 送 11、太妃奶Q 免費加！太妃糖、抹茶、焙茶三大系列冬季飲品新推薦法芙娜可可同步回歸",
      "rss_link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTE1iQjJuRG5Mb1Fnck5yZFRqckY3X1R2Y3JrVjVFc05tRDc3NzcwRV9BeUV6NWg0MDF2anZSc0U2Yk43aDdYMXB4SlpCU09Gb0RfT1pvZnl3NGxZYXM?oc=5",
      "rss_description_text": "【完整菜單】迷客夏買11 送 11、太妃奶Q 免費加！太妃糖、抹茶、焙茶三大系列冬季飲品新推薦法芙娜可可同步回歸 上報Up Media",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-031",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 15:40:47",
      "published_at_raw": "Mon, 09 Nov 2026 07:40:47 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "卡優新聞網",
      "source_media_home": "https://www.cardu.com.tw",
      "rss_title": "迷客夏太妃冬季新品11/11開賣！全新配料太妃奶Q必吃 - 卡優新聞網",
      "clean_title": "迷客夏太妃冬季新品11/11開賣！全新配料太妃奶Q必吃",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1nQ19UdE15V0FibHdiUEctUFdIZXp3TTRhVWFVYzNOTF92OFFfa0tvZG9UcDhMczZlRXJMZmdITnp5TmVSWUpvLVpBaTFMVjBpVW9QNmJxSVg2M25l?oc=5",
      "rss_description_text": "迷客夏太妃冬季新品11/11開賣！全新配料太妃奶Q必吃 卡優新聞網",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-032",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 14:31:03",
      "published_at_raw": "Mon, 09 Nov 2026 06:31:03 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "迷客夏太妃奶Q免費加料！森半抹茶、法芙娜可可　雙11開賣優惠曝 - NOWnews今日新聞",
      "clean_title": "迷客夏太妃奶Q免費加料！森半抹茶、法芙娜可可　雙11開賣優惠曝",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5GS2NkUWFFVUFEOXptRVhuSE1OMEFpWU5MV2sydFFmejhZNVBhMklzOEYtU0xkVjJBNGppWFNRYWlWS2dGa3NDUmdab0NJdE1uUXfSAVJBVV95cUxORktjZFFhRVVBRDl6bUVYbkhNTjBBaVlOTFdrMnRRZno4WTVQYTJJczhGLVNMZFYyQTRqaVhTUWFpVktnRmtzQ1JnWm9DSXRNblF3?oc=5",
      "rss_description_text": "迷客夏太妃奶Q免費加料！森半抹茶、法芙娜可可 雙11開賣優惠曝 NOWnews今日新聞",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-033",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 12:57:16",
      "published_at_raw": "Mon, 09 Nov 2026 04:57:16 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "COOL-STYLE 潮流生活網",
      "source_media_home": "https://www.cool-style.com.tw",
      "rss_title": "迷客夏也加入「抹茶」戰局！同場加碼法芙娜可可系列回歸，焙茶、太妃飲品冬季新菜單登場！ - COOL-STYLE 潮流生活網",
      "clean_title": "迷客夏也加入「抹茶」戰局！同場加碼法芙娜可可系列回歸，焙茶、太妃飲品冬季新菜單登場！",
      "rss_link": "https://news.google.com/rss/articles/CBMi6AJBVV95cUxQV2pTLWh2cU1tMi1lb044QXNyYlp4TUFLMG1wNURPeGE2MS1tQXZfVkpjcnh5YnJIX3JTc0ZGdF9GMDI0RTF5Ri1BV1V3SndmWWl6bWtpVWE3aHNrWGNEY21mNHZmOHUyc3VxV0R2RGJHLWVtRVVoRGVrVmhkR0hFc1R2MkRaOElKYVlLeHN1Q0Q4M2V4amUwc3NfMGYxQzh2aWFkQlhWR2F3VzhuNkhmZE81YXVKT09qeVh6bW1KSW1kb0FDUm8tLXNhNDk3MFctV2o4MWJaZ2R0ZGNJbmVaVnZIUmFlWG90T2cyVk50VHZzekVTZVNLeW13WXNtaVc0Z0YtcVU4ZG5WSTBkU29LajJfdlZ0RS1QUmhnUjd3Y2hlRVlkOU5pT0xnRU13bDhYelZ4SnFpOTkyRUM5QlFXT0s3QWNYQmlBeEVpV2UwRzRDVEhJZHNNdktLWXppWWpnRU45cEI5NGvSAe4CQVVfeXFMTzNsUnUyaWUxXy1UZm1VTkZtR1l1aGJ4Nk9QNVU0eXBjVnR1SlR4cTllZGtOQS1QYkotQkNIcXl0NlVEVVVmUHMtTjJCTER5UXVjTDdXOE0yczhnSHItcFM2X0JTQU5uSElsMkhXQmFuUEsyUWh6WWJUSE1VclRXdERVOGh0NDVfQWdMZkxzaXJlaHl2c1lvR1pzVWhWMTJoZkVMU2R3X0YzdVc1bFo1SDZtWl9wYnN5eXQ1UkQxeTRCaHhsZjVlU3c0NmlndnlqbENRRzVzcGluOGRqa1Q5MTVWOUxkNjdvV1NtT2R4c2Vfb2taMGF6UXVBSkt0N2E2c2tEYWZfVUpzNXZEd0R6UGw1Q1YwRXNJSkxzbHFNXzVBVUJpb2lfMmZIemdvSUZjQkVQS0JpLThLc0cySTlWU0xvX3FvZGJzZFhaV3U4NEx0c01aVjNHYlZIVkVuaFBWdDdscXprVEV6aUNsd213?oc=5",
      "rss_description_text": "迷客夏也加入「抹茶」戰局！同場加碼法芙娜可可系列回歸，焙茶、太妃飲品冬季新菜單登場！ COOL-STYLE 潮流生活網",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認候選：抹茶（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-034",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 11:55:00",
      "published_at_raw": "Mon, 09 Nov 2026 03:55:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "工商時報",
      "source_media_home": "https://www.ctee.com.tw",
      "rss_title": "迷客夏冬季新品「太妃序曲」11月11日香甜上市 雙11限定「買11贈11」！ - 工商時報",
      "clean_title": "迷客夏冬季新品「太妃序曲」11月11日香甜上市 雙11限定「買11贈11」！",
      "rss_link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE52UEpQNlpSM3lLMDYtMFZXUHFKcG9SSDl4SUZScEJCY1NTZ01RUGt1aGFPNjkxNWtvb19hZjlBZ2dfWk5UTC1VdU95YVNWZWpyMEcyMGNJcnZTaFZsUHc4?oc=5",
      "rss_description_text": "迷客夏冬季新品「太妃序曲」11月11日香甜上市 雙11限定「買11贈11」！ 工商時報",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-035",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 11:38:00",
      "published_at_raw": "Mon, 09 Nov 2026 03:38:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "ETtoday旅遊雲",
      "source_media_home": "https://travel.ettoday.net",
      "rss_title": "迷客夏「太妃序曲」後天上市　買新品免費加料、11元加購紅茶 - ETtoday旅遊雲",
      "clean_title": "迷客夏「太妃序曲」後天上市　買新品免費加料、11元加購紅茶",
      "rss_link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTFA5LVk2QUJTVFBJSkNrS3ZhTjYtWENlV3NZVldIeDkxRHVfS1YwR2l2b0tjRzFUcU83V2Z4U2tPNEZIbHJhZVFRUl9mQ1NxRTTSAU9BVV95cUxQOS1ZNkFCU1RQSUpDa0t2YU42LVhDZVdzWVZXSHg5MUR1X0tWMEdpdm9LY0cxVHFPN1dmeFNrTzRGSGxyYWVRUVJfZkNTcUU0?oc=5",
      "rss_description_text": "迷客夏「太妃序曲」後天上市 買新品免費加料、11元加購紅茶 ETtoday旅遊雲",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認候選：太妃序曲（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-036",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 10:59:34",
      "published_at_raw": "Mon, 09 Nov 2026 02:59:34 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "迷客夏11款冬季菜單！太妃奶Q飲登場，抹茶升級、焙茶可可回歸，雙11買11送11 - 食尚玩家",
      "clean_title": "迷客夏11款冬季菜單！太妃奶Q飲登場，抹茶升級、焙茶可可回歸，雙11買11送11",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5TNW5nR01Jamdzekp3MjZaWnk2a3BkalpralpsdnVpU0w5X2NKdFZMWGxBc1laWGFRQ29yeVVnT1VXbW8zTFdMMWZ1ZmhRSzNYMWlJSg?oc=5",
      "rss_description_text": "迷客夏11款冬季菜單！太妃奶Q飲登場，抹茶升級、焙茶可可回歸，雙11買11送11 食尚玩家",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-037",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-09 06:20:00",
      "published_at_raw": "Sun, 08 Nov 2026 22:20:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "WalkerLand 窩客島",
      "source_media_home": "https://www.walkerland.com.tw",
      "rss_title": "連3天喝買一送一！CoCo「咖啡特調、百香雙響炮」0元多一杯，雙11優惠飲料先喝|美食 - WalkerLand 窩客島",
      "clean_title": "連3天喝買一送一！CoCo「咖啡特調、百香雙響炮」0元多一杯，雙11優惠飲料先喝|美食",
      "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTE5DRVZOZ2p0bTd2RFRXdy1Sd1hPNWpYc0c4QXVwZHhENi1ISEx0THZZOEJJR1VzQUpqYjN1aUNSaDVySUVYcGtfQWV0Sks5Vzl1aHcxVXl5WE94ZElkMVE?oc=5",
      "rss_description_text": "連3天喝買一送一！CoCo「咖啡特調、百香雙響炮」0元多一杯，雙11優惠飲料先喝|美食 WalkerLand 窩客島",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認候選：咖啡特調、百香雙響炮（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-038",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-07 16:00:00",
      "published_at_raw": "Sat, 07 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "ELLE",
      "source_media_home": "https://www.elle.com",
      "rss_title": "皮克敏×CoCo都可聯名活動開跑！咖啡杯飾品免費拿，走2000步再送特殊金色花苗 - ELLE",
      "clean_title": "皮克敏×CoCo都可聯名活動開跑！咖啡杯飾品免費拿，走2000步再送特殊金色花苗",
      "rss_link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE5SRkV1UU1adWlxSmVPLWNpUjlycmdSX2pNTC1ubUtOTURSNWdyOGo4TUF5dFRmMUxnTHNSV0ZqM0tTSnRxX0JKakd0Q1czbTBGSkJHNzZCejdCRy1yamFQNVluMkhJMThnc05ybHRmSFJLa3M4NUdlZlJNSQ?oc=5",
      "rss_description_text": "皮克敏×CoCo都可聯名活動開跑！咖啡杯飾品免費拿，走2000步再送特殊金色花苗 ELLE",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-039",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-07 10:27:53",
      "published_at_raw": "Sat, 07 Nov 2026 02:27:53 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Marie Claire 美麗佳人",
      "source_media_home": "https://www.marieclaire.com.tw",
      "rss_title": "皮克敏ＸCoCo都可聯名登場！搶拿咖啡杯皮克敏，再享雙11買1送1好康優惠 - Marie Claire 美麗佳人",
      "clean_title": "皮克敏ＸCoCo都可聯名登場！搶拿咖啡杯皮克敏，再享雙11買1送1好康優惠",
      "rss_link": "https://news.google.com/rss/articles/CBMiYkFVX3lxTE8ySk9HREJ4Q2I5WFVkNE1UeVU2MmlIN3hhRG92STZzeENrdndSZUluUVZQdWI1bFRybjU3dXkyeEJNdGxmOWRaSFVrWm1zTHFBNEg3WmV2dFVGUnZUZVA3NnRB?oc=5",
      "rss_description_text": "皮克敏ＸCoCo都可聯名登場！搶拿咖啡杯皮克敏，再享雙11買1送1好康優惠 Marie Claire 美麗佳人",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-040",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-05 18:09:52",
      "published_at_raw": "Thu, 05 Nov 2026 10:09:52 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Cosmopolitan",
      "source_media_home": "https://www.cosmopolitan.com",
      "rss_title": "皮克敏CoCo聯名今開跑！免費拿咖啡杯皮克敏，解鎖隱藏任務多拿限定花苗 - Cosmopolitan",
      "clean_title": "皮克敏CoCo聯名今開跑！免費拿咖啡杯皮克敏，解鎖隱藏任務多拿限定花苗",
      "rss_link": "https://news.google.com/rss/articles/CBMilAFBVV95cUxOWjhfQ1VVbVBhRDlaMnVHcUdDeEhMbkp3a2J4M0JXQXY4NExCdWZ2V0E0YncxaTdCZklFODFSU1lOMGpZc3BXamNiV0c3TzlmblA1cEUyNlNqblBJYUVEbldjN0xqYWtacnZTUkZwMl9EaWswaWxNV2Z3VWpYdlBBVVlYeS1aTXVsQU5LOXBReHN4UkN5?oc=5",
      "rss_description_text": "皮克敏CoCo聯名今開跑！免費拿咖啡杯皮克敏，解鎖隱藏任務多拿限定花苗 Cosmopolitan",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-041",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-05 16:15:20",
      "published_at_raw": "Thu, 05 Nov 2026 08:15:20 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Marie Claire 美麗佳人",
      "source_media_home": "https://www.marieclaire.com.tw",
      "rss_title": "【Threads上紅什麼】龜記手搖飲竟然變沐浴乳！沙威隆聯名「蘋果紅萱、三十三茶王」，連洗澡都能聞到熟悉茶香 - Marie Claire 美麗佳人",
      "clean_title": "【Threads上紅什麼】龜記手搖飲竟然變沐浴乳！沙威隆聯名「蘋果紅萱、三十三茶王」，連洗澡都能聞到熟悉茶香",
      "rss_link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE9PY0ltRnhWSWExUC0wNUdGOEtNbmVPcVNzMGVHMHZQQUZZMmJzTlBDOXo2X0hPalEwRjVvcnNaWU9aZkgzWVNMT3dHdkQxdW1CdGJneTFYNUlQV3hTcE1TTFFUb2RjSXQxb2c?oc=5",
      "rss_description_text": "【Threads上紅什麼】龜記手搖飲竟然變沐浴乳！沙威隆聯名「蘋果紅萱、三十三茶王」，連洗澡都能聞到熟悉茶香 Marie Claire 美麗佳人",
      "brand_detected": "龜記",
      "candidate_product_name": "待確認候選：蘋果紅萱、三十三茶王（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-042",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-05 06:30:32",
      "published_at_raw": "Wed, 04 Nov 2026 22:30:32 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Yahoo新聞",
      "source_media_home": "https://tw.news.yahoo.com",
      "rss_title": "手搖飲新品！阿檸推琥珀珍珠鮮乳茶、清心福全攜咖波推限量周邊 - Yahoo新聞",
      "clean_title": "手搖飲新品！阿檸推琥珀珍珠鮮乳茶、清心福全攜咖波推限量周邊",
      "rss_link": "https://news.google.com/rss/articles/CBMimgNBVV95cUxNbzYtNFZYN2QzYk0zVHVXcVExOVhHcHJnWWJmeTVVTVgxSXNvekctWGxCZGc2X3RGR1JaRkczTmxvbDl2MHBZYUlfa21PLWtFeDhzdzRqczlwX1l4UjNBSngyWHViMVlJaHJ4bzRScmVGOWRxR1NXNlZUaVlLRjVhVl8wNnUzRldjOFZzcmktWjZrZko0a0hFX0RJdmhMREtrRFJ4cG82TU9OVXpOUjZaYmFDdnF6SEhRN1FVMmphX0Q1cTI1QVZLZ1VWa1ZGLUlVSVFkWXVtUEd2WjJ2RElUdEdFVDd5VTh3QzlrNFp3c3pfSXJkcWIyNWlNV0U0S0dEWWc3X1RIOE9WNUVNcllLeGVxYnpXdzI5anMzcUpkNW9sOU5ZV1dRNFp6eU1sSF8wUXM2NFk1Ti02VWZHaWYzR2I4cFJGS0gwZjVZN3ZxOWEyRmtrbXFObm1VVFFUelExZzRDT2J5Qi1RbktWaU9wTXloa0o1czAtTy1zeGZ3QkpVU0xNaEQ4bTdvVkxQWk95MWNGZGUxa0ZjZw?oc=5",
      "rss_description_text": "手搖飲新品！阿檸推琥珀珍珠鮮乳茶、清心福全攜咖波推限量周邊 Yahoo新聞",
      "brand_detected": "清心福全",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-043",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-05 04:30:00",
      "published_at_raw": "Wed, 04 Nov 2026 20:30:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "皮克敏CoCo聯名今天開跑！8款咖啡杯金色花苗免費拿、攻略一次看 - NOWnews今日新聞",
      "clean_title": "皮克敏CoCo聯名今天開跑！8款咖啡杯金色花苗免費拿、攻略一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE5lRVlUNVByenAtRVBhaV9FenRubll6aklkNmRJRzY2Y2Zkd2ZPRWo3U21wVXdBWW5neXcxMXQySG5ZX0NOUktSZkE3dnnSAVJBVV95cUxNOG9UMG9aNE9xSFRLUnVTLTIwOEZ3ZTZ4Z1NodXBuMm5kUWxudlVYbDJXeVl0TE1jZVhhQTFqdTBsSHdvdXdGQWNxUlRPQ0tqVzNn?oc=5",
      "rss_description_text": "皮克敏CoCo聯名今天開跑！8款咖啡杯金色花苗免費拿、攻略一次看 NOWnews今日新聞",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-044",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-04 09:57:22",
      "published_at_raw": "Wed, 04 Nov 2026 01:57:22 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "CoCo茉香凍奶綠買一送一！奶茶三兄弟45元喝整個11月　皮克敏聯名 - NOWnews今日新聞",
      "clean_title": "CoCo茉香凍奶綠買一送一！奶茶三兄弟45元喝整個11月　皮克敏聯名",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE1SQzFYdFp3S2hEdlVYRV9fV3FpY0Y3YXAybjFMZ3MzMTJ6VVdpU0Vjc2VUSWFuWGFXcnF5Q1FxdTZKQUFpRDBQc291M2jSAVJBVV95cUxQUW9TUVJnNThrdUxXN3hoTkFrZFBQcEZGZ3JJb01RclRmdVN4eG1CT0NlREZuY2EwYU1KM3dvQ1h5T1FxOGd4LVZIMDZUR2hpMnpB?oc=5",
      "rss_description_text": "CoCo茉香凍奶綠買一送一！奶茶三兄弟45元喝整個11月 皮克敏聯名 NOWnews今日新聞",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-045",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-04 09:46:00",
      "published_at_raw": "Wed, 04 Nov 2026 01:46:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "壹蘋新聞網",
      "source_media_home": "https://news.nextapple.com",
      "rss_title": "今起飆高溫！手搖飲推買1送1、珍奶40元 皮克敏限定花苗開搶 - 壹蘋新聞網",
      "clean_title": "今起飆高溫！手搖飲推買1送1、珍奶40元 皮克敏限定花苗開搶",
      "rss_link": "https://news.google.com/rss/articles/CBMifkFVX3lxTE1JeHVRajM3TDBzWXlzY3JxdVVmSVNPR2ZRc0lodUlWalVUTUZkTXNJWWhFemtYeVlkRmRCWGd6VjZYOTRXcDRFQmZSekVhSVFhaG1Gc0Y3SU5tUmNEd3lsakhHaDA5UVF5Q0Z1cU95bUNpWkZGNjIwM0R0VHZBdw?oc=5",
      "rss_description_text": "今起飆高溫！手搖飲推買1送1、珍奶40元 皮克敏限定花苗開搶 壹蘋新聞網",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-046",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-03 16:00:43",
      "published_at_raw": "Tue, 03 Nov 2026 08:00:43 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "清心福全、CoCo買一送一！11月「手搖飲優惠」６間，麻古現折80元 - 食尚玩家",
      "clean_title": "清心福全、CoCo買一送一！11月「手搖飲優惠」６間，麻古現折80元",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTFB2QWRhNGlLZGVEckhOM3BGTW1QQnI2S252TC05TUwzVW9TTkhGM3EwUGx1dzZtdFpOUldFcW05SDBsV1ZVN0VGWVhRM1NsTi1XOG9KdQ?oc=5",
      "rss_description_text": "清心福全、CoCo買一送一！11月「手搖飲優惠」６間，麻古現折80元 食尚玩家",
      "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、清心福全）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-047",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-03 16:00:00",
      "published_at_raw": "Tue, 03 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "中時新聞網",
      "source_media_home": "https://www.chinatimes.com",
      "rss_title": "手搖飲買1送1來了！茉香凍奶綠2杯60元 優惠一次看 - 中時新聞網",
      "clean_title": "手搖飲買1送1來了！茉香凍奶綠2杯60元 優惠一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE42SzdwQXRybms5eWRyQlAtOHZuUEExTlhFQ1psdEc1NEs0SWdzVWFBZWd0aXVxT1RKZnZZRlI3R0JDQ0lYeUFfOXQtNzBJTWRFUUJNYU5HT2xGNUdyaUVuQWIwMENEa2RiTnk4ejZn?oc=5",
      "rss_description_text": "手搖飲買1送1來了！茉香凍奶綠2杯60元 優惠一次看 中時新聞網",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-048",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-03 16:00:00",
      "published_at_raw": "Tue, 03 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "UDN",
      "source_media_home": "https://travel.udn.com",
      "rss_title": "CoCo都可超強聯名「皮克敏」！8款咖啡杯造型限定飾品登場 11／5起全台門市開收 - UDN",
      "clean_title": "CoCo都可超強聯名「皮克敏」！8款咖啡杯造型限定飾品登場 11／5起全台門市開收",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5RaUNpLVl6UUpMeDlDU1hzY0FoNVpPNXZNVWxHWllQUWczQjNVU1ZkbVJPLWxEWlFFb0MzOEw1d0R6S3IxUFJYSGdjZkZWdmQzaXhxV2NMZWFCN21f?oc=5",
      "rss_description_text": "CoCo都可超強聯名「皮克敏」！8款咖啡杯造型限定飾品登場 11／5起全台門市開收 UDN",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認候選：皮克敏（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-049",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-03 16:00:00",
      "published_at_raw": "Tue, 03 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "CoCo聯手皮克敏《Pikmin Bloom》！金盆拿法攻略　全台門市一次看 - NOWnews今日新聞",
      "clean_title": "CoCo聯手皮克敏《Pikmin Bloom》！金盆拿法攻略　全台門市一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE5wNzljWDh6TWtSUzBTd1VHakdYTllnSFFSUElUU1dZS0VNZjhRbGR3QTlnS0F1MHRadGs3RDE4V3V3TEFHRDFRaXBTTGXSAVJBVV95cUxOUlQtY3M3TTZpb2hLM3pBX18zejJLZTdURjZxRFhESUs5ZnRyM251UFN1REZQOWZkSV96S1ZCeTBQQXk4enl0N2dqZHdmRzI4M2tR?oc=5",
      "rss_description_text": "CoCo聯手皮克敏《Pikmin Bloom》！金盆拿法攻略 全台門市一次看 NOWnews今日新聞",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-050",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:28:22",
      "published_at_raw": "Mon, 02 Nov 2026 08:28:22 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "卡優新聞網",
      "source_media_home": "https://www.cardu.com.tw",
      "rss_title": "龜記推3款抹茶手搖新品！Oatly聯名抹茶燕麥乳11/16開賣 - 卡優新聞網",
      "clean_title": "龜記推3款抹茶手搖新品！Oatly聯名抹茶燕麥乳11/16開賣",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1NckRiWnE2a05OQUhXV0lSbUktLUpraGQtV096X1NvSDZiSF8zVjR3eE9CTUNsQnoxcGxmNXlPT1ZnU09pSUJUTmNVcXdFaHRWY2QwUnhVZlNNdENs?oc=5",
      "rss_description_text": "龜記推3款抹茶手搖新品！Oatly聯名抹茶燕麥乳11/16開賣 卡優新聞網",
      "brand_detected": "龜記",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-051",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:00:00",
      "published_at_raw": "Mon, 02 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "中天新聞網",
      "source_media_home": "https://ctinews.com",
      "rss_title": "「胖妃」殺進手搖飲！甄嬛傳聯名大苑子、CoCo迎皮克敏 - 中天新聞網",
      "clean_title": "「胖妃」殺進手搖飲！甄嬛傳聯名大苑子、CoCo迎皮克敏",
      "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE5DQ0ZQZWFQMFhoYU5qM1hoVGlzNS1UaTd4N2tLVXVibHJVRW5FOUFiN1U5dXpxM0VvbFQzR0ZHVGNBZ0NCSHd0UWNHalJJbEM2d3RN?oc=5",
      "rss_description_text": "「胖妃」殺進手搖飲！甄嬛傳聯名大苑子、CoCo迎皮克敏 中天新聞網",
      "brand_detected": "多品牌提及（CoCo都可、大苑子）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-052",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:00:00",
      "published_at_raw": "Mon, 02 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "玩咖Playing",
      "source_media_home": "https://playing.ltn.com.tw",
      "rss_title": "皮克敏CoCo聯名金盆&明信片免費送！手搖飲、咖啡買一送一接力喝 - 玩咖Playing",
      "clean_title": "皮克敏CoCo聯名金盆&明信片免費送！手搖飲、咖啡買一送一接力喝",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5tclZNblo2VzdxZ29vdmVCV2xRczhRcDB6VTk0VlBWOS1WMjNNUEEydzFzYmVxeVFrUjlxNHcxTnlyMjczQ2dCd1RIQl9YZFVNSWc?oc=5",
      "rss_description_text": "皮克敏CoCo聯名金盆&明信片免費送！手搖飲、咖啡買一送一接力喝 玩咖Playing",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-053",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:00:00",
      "published_at_raw": "Mon, 02 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "ETtoday旅遊雲",
      "source_media_home": "https://travel.ettoday.net",
      "rss_title": "CoCo聯名皮克敏11/5開跑　來店領咖啡杯飾品金色花苗、明信片 - ETtoday旅遊雲",
      "clean_title": "CoCo聯名皮克敏11/5開跑　來店領咖啡杯飾品金色花苗、明信片",
      "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBNYTRUR1ozQXh2dzBvNUx1YTJ0ck1KUlNWYS1pNWZnWUVVa0U5ZEM5a0UyTHVTNXhpYTMwbUFKMDhCd3VUM2lFR3VsbEFxZWZoTHhOT2NjRUVkQdIBT0FVX3lxTE5JMGVNS1F6NTg0b1Z1anF4ZWFTRnJHdC1xZk1vYThXMWVQNDE2N0p2V0o4VWdPSXYyQThoMDFEY21QOEF5RmdwcFZ0UkEycWM?oc=5",
      "rss_description_text": "CoCo聯名皮克敏11/5開跑 來店領咖啡杯飾品金色花苗、明信片 ETtoday旅遊雲",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-054",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:00:00",
      "published_at_raw": "Mon, 02 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "CoCo聯名皮克敏！８款咖啡杯造型免費收集，皮克敏路跑早鳥送超萌周邊 - 食尚玩家",
      "clean_title": "CoCo聯名皮克敏！８款咖啡杯造型免費收集，皮克敏路跑早鳥送超萌周邊",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE8zbkp3dDlOYlZTU3NNRXpWU1RzcGg1a3dLTUdwelZMcmE2RUxHTDhNTVZIRWF1cGVueWJreWM5NThnY3VjNDc2aHJSVXJaUmttcGh5Rg?oc=5",
      "rss_description_text": "CoCo聯名皮克敏！８款咖啡杯造型免費收集，皮克敏路跑早鳥送超萌周邊 食尚玩家",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-055",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:00:00",
      "published_at_raw": "Mon, 02 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "4Gamers",
      "source_media_home": "https://www.4gamers.com.tw",
      "rss_title": "《Pikmin Bloom》CoCo都可聯名11/5開跑 蒐集兩款金色花苗與特殊明信片 - 4Gamers",
      "clean_title": "《Pikmin Bloom》CoCo都可聯名11/5開跑 蒐集兩款金色花苗與特殊明信片",
      "rss_link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxONzcySmRpajdhM0NtdnBzWXFZaUNqVnVlOE53UXJ1ZDNldThJNWxQeDhGLW1EeDdLZG44cmIteVpsdzRPelUyM2VUbXBTYTZnLXgyTHhsWnFXa285SXI4TkNpcnpTbEYyQWJuVmhKNmo4Q0YxczJnUXB5VmdpTkxwTDVIa3NhWTI3dHg4OV9iMjU?oc=5",
      "rss_description_text": "《Pikmin Bloom》CoCo都可聯名11/5開跑 蒐集兩款金色花苗與特殊明信片 4Gamers",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-056",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:00:00",
      "published_at_raw": "Mon, 02 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "皮克敏CoCo聯名11/5開跑！2款金色花苗、明信片全台門市免費送 - NOWnews今日新聞",
      "clean_title": "皮克敏CoCo聯名11/5開跑！2款金色花苗、明信片全台門市免費送",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE13c1QxUXp6MXJDdHFqTnBMaU04S3JxNW00REQzM3d2Q1pobnEtN3V1MUJRTFFRRXBHSW9TbFh0TllQMEF5aE1ZV1Q3Y3PSAVJBVV95cUxPNVl2RG1GNmFTSFJaYUVfSTlocUZEdFVObkFJMFFNOUttTDN0RWJjejdEWVNFaW5wNHFSOHZ5Q1Vzem5WM19Vb1BMU1NlODNKcG5R?oc=5",
      "rss_description_text": "皮克敏CoCo聯名11/5開跑！2款金色花苗、明信片全台門市免費送 NOWnews今日新聞",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-057",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 16:00:00",
      "published_at_raw": "Mon, 02 Nov 2026 08:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "TVBS新聞網",
      "source_media_home": "https://news.tvbs.com.tw",
      "rss_title": "玩家注意！CoCo聯名皮克敏 金色花苗、明信片免費送 - TVBS新聞網",
      "clean_title": "玩家注意！CoCo聯名皮克敏 金色花苗、明信片免費送",
      "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE5PRDNJQWNEM1ZUVVZPdUdVb2d3TDFPZlp0QUZmRGlCVHAyTTRpNGFRSm5kTThZZHpfTVg5Mk1mclRTM0VHVDBfd1hoSUpnQQ?oc=5",
      "rss_description_text": "玩家注意！CoCo聯名皮克敏 金色花苗、明信片免費送 TVBS新聞網",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-058",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-11-02 10:28:28",
      "published_at_raw": "Mon, 02 Nov 2026 02:28:28 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "COOL-STYLE 潮流生活網",
      "source_media_home": "https://www.cool-style.com.tw",
      "rss_title": "抹茶熱潮燒進手搖飲！龜記抹茶系列3款新品登場，聯手 Oatly 燕麥奶乳糖不耐也能喝！ - COOL-STYLE 潮流生活網",
      "clean_title": "抹茶熱潮燒進手搖飲！龜記抹茶系列3款新品登場，聯手 Oatly 燕麥奶乳糖不耐也能喝！",
      "rss_link": "https://news.google.com/rss/articles/CBMi6gJBVV95cUxNelBHNjZ0MDFTUXBKWmljbkFnWGt2N3lObElKSXNPWmFLUlZVVWk1NXRteFc4ZHlWWWtvYzViNEF6UHkzWVdfajlqd1J3eGdqSnduUDFmWmN2dzg3X1J4NkhETVBaTGUzWGlBamtocnBiWWVPaEh3V1B2STBMTHp6UEJLWjFwOHNiS1k3cDJ5cmhuU2tTcVVPVUlZYXFsWVlkbk80V3Q1dkFhT29uZTcyVUt5V3pJU1NXWUFwalJLUVB2N1h1czkwU0VQSHlWQkR6YVVwZjVUZExHemNwM3hTUTVfb0c4blpPZFdEOWJjdUhuZ3p5ZldJLV9LQ1ZaNEItWFlzaVVrMmtISjB4WUVWTnF5LWhqQS12WExSeVVjeXM4ZzZibERXVjB5RTk3QWRoTW03YzRQZ1gxTXVzMUR4UnFmMklicnlfam1PTzJjM3pjX3F1U3lZdEFGcjRTVFNpTEM1dTRBSEVsQdIB7wJBVV95cUxPb09GYVlDOW84QUROMXlJUWZnXzNoQ1pLR3B3cndxa1djQnhuTEhQbDhBTERfVVFCaTlmNjBvdVltdkF3SzBxMzkzTjd1VXdwQ1d5OHFVSG5aaE1STWNudUd1NnRZc2RyM2U1TnB5SHVMQlYtSDFQZGVBUkJYMTNLM1RJdW9KVWt5cm9xbEFyYl9WTXJRaUEyZnZ6NGNBUDZBMEFpcGY3dWNUZHVPSGVNakhzNmVLRGl0dmQzbW1NUVpjRlFOdjBDeVQyb2s0dDlNSlFpRGNycm9FVXp2dVdnQkQxVFJRVGNWZi05UEJzV2xlalZGeDNwbmI2a0k1NGd6RUcwVEV1ZDQyYmJ4RlZZSnVHdGpLUGtjUnVOQXVzMHRmNWFoOGU2MHIwMS1UbDA0a3VFSmlROV9CcFNzRlJHVjJmeEtXYzdtUG5LN0JvQ3FDclBoWk8zWFJmZ3ExZmZEQTY0eEozdHAybGUtbjVv?oc=5",
      "rss_description_text": "抹茶熱潮燒進手搖飲！龜記抹茶系列3款新品登場，聯手 Oatly 燕麥奶乳糖不耐也能喝！ COOL-STYLE 潮流生活網",
      "brand_detected": "龜記",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-059",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-31 15:00:00",
      "published_at_raw": "Sat, 31 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "ETtoday旅遊雲",
      "source_media_home": "https://travel.ettoday.net",
      "rss_title": "手搖飲萬聖節優惠　TEA TOP免費加料、CoCo買1送1 - ETtoday旅遊雲",
      "clean_title": "手搖飲萬聖節優惠　TEA TOP免費加料、CoCo買1送1",
      "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE44NlhpMGh3TEpLdW9ob0MtcmxSMFNvNWozbHB5b2hDMi0yaWRjSjlxUVZ2bzNUYm5SdF9WNENjNXV4d0wxbkZBZ0FXaXBQR21ZeXJxWmtYSGJhQdIBT0FVX3lxTE03RGdQUk92by1PNG5uYlhtNkdPTkdSOER1alp5bFFtNGU1QURTT3huWmxURzdDNTVWWUstbDhWVUtEMm5SZGFnVzBiRVJyLTA?oc=5",
      "rss_description_text": "手搖飲萬聖節優惠 TEA TOP免費加料、CoCo買1送1 ETtoday旅遊雲",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-060",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-31 15:00:00",
      "published_at_raw": "Sat, 31 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "網路溫度計 DailyView",
      "source_media_home": "https://dailyview.tw",
      "rss_title": "CoCo、茶湯會推巧克力新品優惠！可可甜心2杯85元、茶韻可可系列享限時折扣｜熱門話題 - 網路溫度計 DailyView",
      "clean_title": "CoCo、茶湯會推巧克力新品優惠！可可甜心2杯85元、茶韻可可系列享限時折扣｜熱門話題",
      "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE5WRzdSZXlxN1Btb0JFa0RoS2ZFa0FMSVhuQmMwb2F5Qm1RQXdHQlNYRS1JZ2UzUklGX3pXUExsZHRsQ19hYmlGNU56QmZqMFdMZzZZ?oc=5",
      "rss_description_text": "CoCo、茶湯會推巧克力新品優惠！可可甜心2杯85元、茶韻可可系列享限時折扣｜熱門話題 網路溫度計 DailyView",
      "brand_detected": "多品牌提及（CoCo都可、茶湯會）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-061",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-30 15:00:00",
      "published_at_raw": "Fri, 30 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "BEAUTY美人圈",
      "source_media_home": "https://www.beauty321.com",
      "rss_title": "2026 CoCo 都可菜單推薦！網評必喝Top10、最新菜單＆價格一次看 - BEAUTY美人圈",
      "clean_title": "2026 CoCo 都可菜單推薦！網評必喝Top10、最新菜單＆價格一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFA3amd0R0FrVjJPNVNkYTNVSUNKV1hrTmEyNmFZdjNDNkVrOF80NktTMmVJQmdjTDhOSUpXdmJDX29mVmR0VXZmcG1IWlLSAVJBVV95cUxQRFFBZmhmNGZxOUVXZW16S2lIWkE1UkFobFpEUEVLQmk5YlluVExsdlJJcWxYdjlqcFlJbEM3WFlENS03VmFpck1CV3dybzQtZDJB?oc=5",
      "rss_description_text": "2026 CoCo 都可菜單推薦！網評必喝Top10、最新菜單＆價格一次看 BEAUTY美人圈",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-062",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-30 15:00:00",
      "published_at_raw": "Fri, 30 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "風傳媒",
      "source_media_home": "https://www.storm.mg",
      "rss_title": "CoCo可可甜心11月登場 珍奶蕎麥雙口味暖心開喝 | 程霽玥 | 地方新聞 - 風傳媒",
      "clean_title": "CoCo可可甜心11月登場 珍奶蕎麥雙口味暖心開喝 | 程霽玥 | 地方新聞",
      "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE56dXp1dklzNTdnQUlMMnhBeU1lOUxVTkk4ZTcwNWhJQnZRRWNQbzNJR2lkUnZIWWhFaUpFOFMyamhwUEtiTTVTMnRlVm9kUQ?oc=5",
      "rss_description_text": "CoCo可可甜心11月登場 珍奶蕎麥雙口味暖心開喝 | 程霽玥 | 地方新聞 風傳媒",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-063",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-29 15:00:00",
      "published_at_raw": "Thu, 29 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "WalkerLand 窩客島",
      "source_media_home": "https://www.walkerland.com.tw",
      "rss_title": "CoCo開賣巧克力手搖！可可珍奶、蕎麥可可任選2杯才85元，45元奶茶三兄弟加碼喝|美食 - WalkerLand 窩客島",
      "clean_title": "CoCo開賣巧克力手搖！可可珍奶、蕎麥可可任選2杯才85元，45元奶茶三兄弟加碼喝|美食",
      "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTFB6X0FPemxsb29OSzVieUZYWDQ0LUN1Ti14SGNRLVpETG5kM21WQXBpU2xxNzhwdlYzRFQ1R1BJM2pSREx5bnhiYUdvX2dxV3dvQXRsODhuamwyMUQxcGc?oc=5",
      "rss_description_text": "CoCo開賣巧克力手搖！可可珍奶、蕎麥可可任選2杯才85元，45元奶茶三兄弟加碼喝|美食 WalkerLand 窩客島",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-064",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-29 15:00:00",
      "published_at_raw": "Thu, 29 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "巧克力控開喝！CoCo可可珍奶２杯85元、茶湯會３款可可拿鐵限時優惠 - 食尚玩家",
      "clean_title": "巧克力控開喝！CoCo可可珍奶２杯85元、茶湯會３款可可拿鐵限時優惠",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE9rUUtsaXd3bkVhSVlaZTU3cjB1Zk5na2ZHNUpjNmtpNW1vZVNXbWZWbzNiWGx2Y3c1Znh3OWlIeDhYNUhDOHRCeWFhMElfVmQ5YUMtZQ?oc=5",
      "rss_description_text": "巧克力控開喝！CoCo可可珍奶２杯85元、茶湯會３款可可拿鐵限時優惠 食尚玩家",
      "brand_detected": "多品牌提及（CoCo都可、茶湯會）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-065",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-29 15:00:00",
      "published_at_raw": "Thu, 29 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "UDN",
      "source_media_home": "https://travel.udn.com",
      "rss_title": "巧克力控暴動！ CoCo、茶湯會、必勝客「可可新品系列」手搖與邪惡甜點一次看，這款還有買一送一 - UDN",
      "clean_title": "巧克力控暴動！ CoCo、茶湯會、必勝客「可可新品系列」手搖與邪惡甜點一次看，這款還有買一送一",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE0wYUtrMXhfTXlPTFBWN3NVMXEwb3hYOGVUSUdQc2lYVGVXMFYzaGpYVzdNYU10U2ltbVNLZVBMLTBCOFc1ZkdaaUYtbEhGd2kyMjFBWjU0U1B3aFZN?oc=5",
      "rss_description_text": "巧克力控暴動！ CoCo、茶湯會、必勝客「可可新品系列」手搖與邪惡甜點一次看，這款還有買一送一 UDN",
      "brand_detected": "多品牌提及（CoCo都可、茶湯會）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-066",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-29 04:11:12",
      "published_at_raw": "Wed, 28 Oct 2026 20:11:12 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "中時新聞網",
      "source_media_home": "https://www.chinatimes.com",
      "rss_title": "佳釀玩聯名名車手搖飲碰撞新意- 時尚消費- 中國時報 - 中時新聞網",
      "clean_title": "佳釀玩聯名名車手搖飲碰撞新意- 時尚消費- 中國時報",
      "rss_link": "https://news.google.com/rss/articles/CBMia0FVX3lxTFBLakRZeXFHdHVmbWpSemtjbGpsTDZlTFg0d1dzaWtlbFBLN3JNbTVFdG15RWEyZC0yX3FBWFNDT3dDWkdEbnk5OVBYaW9LcjNYQmxXZnYtQ2ZKUjNBQkNQUGRfRm53OUZzSTJ3?oc=5",
      "rss_description_text": "佳釀玩聯名名車手搖飲碰撞新意- 時尚消費- 中國時報 中時新聞網",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-067",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-28 15:00:00",
      "published_at_raw": "Wed, 28 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "玩咖Playing",
      "source_media_home": "https://playing.ltn.com.tw",
      "rss_title": "手搖飲買一送一爽喝CoCo！春水堂滿額免費喝珍奶、金馬聯名周邊登場 - 玩咖Playing",
      "clean_title": "手搖飲買一送一爽喝CoCo！春水堂滿額免費喝珍奶、金馬聯名周邊登場",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE02dWFmY3dNQ2JNeFNmb2RGYXhEdk93eTFBRVZxUkpVYkc1cE4zUC1Bbkw2bnRlekNfZ3RZWnl5UDdvc1h5WG5lc3RvV0pqTktlelE?oc=5",
      "rss_description_text": "手搖飲買一送一爽喝CoCo！春水堂滿額免費喝珍奶、金馬聯名周邊登場 玩咖Playing",
      "brand_detected": "多品牌提及（CoCo都可、春水堂）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-068",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-28 15:00:00",
      "published_at_raw": "Wed, 28 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "中時新聞網",
      "source_media_home": "https://www.chinatimes.com",
      "rss_title": "金馬聯名手搖飲周邊商品吸睛- 時尚消費- 中國時報 - 中時新聞網",
      "clean_title": "金馬聯名手搖飲周邊商品吸睛- 時尚消費- 中國時報",
      "rss_link": "https://news.google.com/rss/articles/CBMia0FVX3lxTE5HV2VUUDgwUlZVMEJJd040TzYtUGo5cEp2X3NmdXltYzduZkU5Z1VKWWowaVloa3dPWGpiWDh2X2R0M1g0MVpGOEdqdWVpVFpvYlZMSF91QThfTHZwbGpTeXAtMkpSSW1yUDZJ?oc=5",
      "rss_description_text": "金馬聯名手搖飲周邊商品吸睛- 時尚消費- 中國時報 中時新聞網",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-069",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-28 15:00:00",
      "published_at_raw": "Wed, 28 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "CoCo日焙珍珠奶茶買一送一！大杯才32.5元　可可甜心新品11/1開賣 - NOWnews今日新聞",
      "clean_title": "CoCo日焙珍珠奶茶買一送一！大杯才32.5元　可可甜心新品11/1開賣",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE1mSVRDV3dtNmRGTXpFU1dWU2psSE54VHNSOFRWTDJ4MV9iNkgzdFZQWHRLb1U2RktPTXIxYzR2amxnYks3N2pkMTUwMnfSAVJBVV95cUxNYWF6bDNCVFdxT1dPN2JyUVBIcjdDWThKMHJZSTdGNWFRQzY5UF9kYWYtcVNDdkpDZGRPVGxQYndLSXZDUVc0UmltX0Z2MDQ1T21B?oc=5",
      "rss_description_text": "CoCo日焙珍珠奶茶買一送一！大杯才32.5元 可可甜心新品11/1開賣 NOWnews今日新聞",
      "brand_detected": "CoCo都可",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-070",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-28 15:00:00",
      "published_at_raw": "Wed, 28 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "WalkerLand 窩客島",
      "source_media_home": "https://www.walkerland.com.tw",
      "rss_title": "迷客夏3.0升級亮點！新品「娜杯糖燻奶霜」折10元、鮮奶茶2杯99元，極簡風、試聞茶瓶要踩點|美食 - WalkerLand 窩客島",
      "clean_title": "迷客夏3.0升級亮點！新品「娜杯糖燻奶霜」折10元、鮮奶茶2杯99元，極簡風、試聞茶瓶要踩點|美食",
      "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTFAwbkZxN0ZXdTNoc2FOUjhrTmdyODdPSFhUV01JeEpqbEJiRjQ4S3hydnJhTmh0dzVQck9uOXlVRWVYVVQtb1VpVkh2VzlNZHBBUEtCVFRZV3JfZU1IRmc?oc=5",
      "rss_description_text": "迷客夏3.0升級亮點！新品「娜杯糖燻奶霜」折10元、鮮奶茶2杯99元，極簡風、試聞茶瓶要踩點|美食 WalkerLand 窩客島",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認候選：娜杯糖燻奶霜（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-071",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-27 15:00:00",
      "published_at_raw": "Tue, 27 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "壹蘋新聞網",
      "source_media_home": "https://news.nextapple.com",
      "rss_title": "金馬入圍動畫跨界手搖飲！迷客夏聯名《朵莉之家》 - 壹蘋新聞網",
      "clean_title": "金馬入圍動畫跨界手搖飲！迷客夏聯名《朵莉之家》",
      "rss_link": "https://news.google.com/rss/articles/CBMihAFBVV95cUxPamQ4OU5ZTUVDUWx2M1B2MGs1empfZFNCMkFWT1RiUklWTlB1cy0xOUs3ZTJobmJQNmE1WXQzb2s4dGxFRkZSYUltbVlYVWYxUzFiVC13RXl4TEJ6MGVpLUp6ZlFhdzdrWUJJTnY2U1BybnA1V2dpZDhISWpOU0lEY2Fkd0s?oc=5",
      "rss_description_text": "金馬入圍動畫跨界手搖飲！迷客夏聯名《朵莉之家》 壹蘋新聞網",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-072",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-27 15:00:00",
      "published_at_raw": "Tue, 27 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Yahoo新聞",
      "source_media_home": "https://tw.news.yahoo.com",
      "rss_title": "手搖飲秋季新品！迷客夏糖燻奶霜、珍煮丹蕎麥系列登場 - Yahoo新聞",
      "clean_title": "手搖飲秋季新品！迷客夏糖燻奶霜、珍煮丹蕎麥系列登場",
      "rss_link": "https://news.google.com/rss/articles/CBMi6gJBVV95cUxOamNqSDdpLUVZU256VjJIZV9jbU5uLTlwdVZjd2pJNUhBNXVpb2xpem1CeUt1WnlvbDU3YVMwT2x1enRVbjVmWU5BOTdZNmFXclNsS1BVRjM2STlIMWVSbTBfWVJaano0c2NFU244TEYtMC1YeDIyRVd2MlcyQTZzalRKdklyRDgwa0dWODJ2ZEhzTlhHTkVRODk4WTNvQkFrdFVDNTgwTjNUdmhEZG0xRkVxQjlvd2dSY0J3cjEtWjZ5T3RpamV6TXNQeG85eG9aUXBLVDJZdGlqRDdEZ2NScDl4ZDZmTW9ybHNuMl9qci1NU1NmVjVuU2hfdS1penV2N3NoT251RUY0NWx1dVNCYjY2eVRnaEdhdWF1QkZMa2lPYnY5cHQwM1hmZzJxWmlBWjlCVkYtUWw1OS11VVYxbC1XMURMMDFaMmhTeTViS2xxZ2dRM3ZlclEtcGk0cjRMX0s5WjFIZFFvZw?oc=5",
      "rss_description_text": "手搖飲秋季新品！迷客夏糖燻奶霜、珍煮丹蕎麥系列登場 Yahoo新聞",
      "brand_detected": "多品牌提及（迷客夏、珍煮丹）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-073",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-27 15:00:00",
      "published_at_raw": "Tue, 27 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "迷客夏3.0新店開幕！娜杯糖燻奶霜開賣送托特包　全台折10元優惠 - NOWnews今日新聞",
      "clean_title": "迷客夏3.0新店開幕！娜杯糖燻奶霜開賣送托特包　全台折10元優惠",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFBHY2pnV2tSbGVWT1dkbXdRUVJuei1hblpxQm1UdDV4NHFUX0hrQ2ZSMHhfeUVSVDdsWEJ5ZXZHOHUtdVBIcXgxczVOdjDSAVJBVV95cUxOS204eUtlZFdJdzg4Nm5TT3czdVdoOC01dGE0SmhEdy00TnRNU2RNSFRocUlpN1RpVC1YSXlPWEJaZWtxYm9Qc3FKanpaV2xLcU13?oc=5",
      "rss_description_text": "迷客夏3.0新店開幕！娜杯糖燻奶霜開賣送托特包 全台折10元優惠 NOWnews今日新聞",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-074",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-27 15:00:00",
      "published_at_raw": "Tue, 27 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "「全台最大迷客夏」開在這！10坪新門市亮相，「娜杯糖燻奶霜」乳牛斑點萌翻 - 食尚玩家",
      "clean_title": "「全台最大迷客夏」開在這！10坪新門市亮相，「娜杯糖燻奶霜」乳牛斑點萌翻",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTFB4SGRtWmZyT3BtMEFmTFBfTVg4WHpsWUFWOWRORTBYaWUwRXdVZ0ZoYy1SZUdwTUNoZUxsNHJEM1R3RHlOSlA4UTVLdllQTkkwSkRreQ?oc=5",
      "rss_description_text": "「全台最大迷客夏」開在這！10坪新門市亮相，「娜杯糖燻奶霜」乳牛斑點萌翻 食尚玩家",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-075",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-23 15:00:00",
      "published_at_raw": "Fri, 23 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Niusnews妞新聞",
      "source_media_home": "https://www.niusnews.com",
      "rss_title": "2026秋季手搖新品懶人包！五桐號泰奶雪沙、可不可紅烏龍茶王，11家必喝推薦一次看 - Niusnews妞新聞",
      "clean_title": "2026秋季手搖新品懶人包！五桐號泰奶雪沙、可不可紅烏龍茶王，11家必喝推薦一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMiS0FVX3lxTE5BeGtKb19BWjd0RF9OVmJQNF8zSnhNU2dBdVZGeDUwZ1o2SzFZSU5URVhGUmdFN2JMODZRbWE0enVuaDJZYUJGa1MzSQ?oc=5",
      "rss_description_text": "2026秋季手搖新品懶人包！五桐號泰奶雪沙、可不可紅烏龍茶王，11家必喝推薦一次看 Niusnews妞新聞",
      "brand_detected": "多品牌提及（五桐號、可不可）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-076",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-22 15:00:00",
      "published_at_raw": "Thu, 22 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "季緣買一送一！10/27起連喝4天手搖飲料優惠　葡萄青韻新品開喝 - NOWnews今日新聞",
      "clean_title": "季緣買一送一！10/27起連喝4天手搖飲料優惠　葡萄青韻新品開喝",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9pZ3ZSUDVpQWV1em9oUVVNbVIzVDZWb3FTZkxGUDRqUC14UU50YWVCQjBSV3c0YlphUV9JZ01hbmY5N1paWTRMN2ZuWVjSAVJBVV95cUxQV21YazVYWkptVjBCandRdGtocEJnQjJHakNuWC1RZFZvaW5zWURubnBmeXVnbWFWdjBGdERnQzE4YkU0SGhUeW5uMkt2OG9ubDRB?oc=5",
      "rss_description_text": "季緣買一送一！10/27起連喝4天手搖飲料優惠 葡萄青韻新品開喝 NOWnews今日新聞",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-077",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-22 15:00:00",
      "published_at_raw": "Thu, 22 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "CARTURE 車勢文化",
      "source_media_home": "https://www.carture.com.tw",
      "rss_title": "迷客夏聯名《歡迎來到朵莉之家》 獨家推「75折限定套組」搶攻動漫商機 - CARTURE 車勢文化",
      "clean_title": "迷客夏聯名《歡迎來到朵莉之家》 獨家推「75折限定套組」搶攻動漫商機",
      "rss_link": "https://news.google.com/rss/articles/CBMi1wNBVV95cUxQbUVKODhranNiTXFaWUFYaElvUERobG5mUWQ3VW9ycTBvYy1mNDJxdU5palNodzVDMGNXZlp6RDRGbkpJVGVkV2pMYXpKWDZGMzRIN05wM0pBTm9CWGZCSWJkSUx0dUdGdTVEV2dZTTItdGNUTlZJclBmNXZwMlhyenlQbDJkeXMyR3RVUWEzRC12YmhDbjBmdHpIRGJBMmtxd1BZbUMydFhCMVkxQVc5OW41cUcxdFh5MmF5Rzc0eXNpNUpiajhNekNNWFp2QWlIMTNSbW92TUNCU0tkY2lZQTBCQWtIWS1qQVpRS1FhRmZZcUdmbjExcEcwS2o2TmR2bHJmYUZfUnBOSklyNElEZ3d0MWx1MXFVXy1vdk5TalI3c3lZR1hKRmkydl9wN01nd09pakx2OTNzQ3pHcU00bFJST1NYczBxUU1PZWRQRVExVmNncGJSRVEzVTdyTV9oN2JXal9DbUdyQTc2MTR0dWliVDNxY1ZKLUNhTVFfaG9wWDc2dVFlLXQ5eXEtcWF4ZG1xLTZIOHBtaEd0eGZXOG5fUFo3WTlOWHF0eUI2SXZ4STIyeHJEZi1QWHk3MVpIODFsbnhPMXR1UDhDbTlscGRNY3pxeUk?oc=5",
      "rss_description_text": "迷客夏聯名《歡迎來到朵莉之家》 獨家推「75折限定套組」搶攻動漫商機 CARTURE 車勢文化",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-078",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-22 15:00:00",
      "published_at_raw": "Thu, 22 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "玩咖Playing",
      "source_media_home": "https://playing.ltn.com.tw",
      "rss_title": "迷客夏聯名《歡迎來到朵莉之家》！優惠套組75折應援台灣原創金獎動畫 - 玩咖Playing",
      "clean_title": "迷客夏聯名《歡迎來到朵莉之家》！優惠套組75折應援台灣原創金獎動畫",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTFAxR0lSSU8za1ZNOGtNUm5oQTRiV29RMExhUXduYUZ5MGVGbW1fT1lPUVU2blRKcW1WSWlhVm50eW5NbXpHSjFOYVBZMkVZRWNBblE?oc=5",
      "rss_description_text": "迷客夏聯名《歡迎來到朵莉之家》！優惠套組75折應援台灣原創金獎動畫 玩咖Playing",
      "brand_detected": "迷客夏",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-079",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-21 15:00:00",
      "published_at_raw": "Wed, 21 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "UDN",
      "source_media_home": "https://travel.udn.com",
      "rss_title": "大茗萬聖節推「榴槤冰淇淋」新品限時79折 CoCo「葡萄柚果粒茶」買1送1 - UDN",
      "clean_title": "大茗萬聖節推「榴槤冰淇淋」新品限時79折 CoCo「葡萄柚果粒茶」買1送1",
      "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1HNVVkSWJSOXBLVlZRVlpSZVZTTVZKX3VjZmE0LTI1cDBoaFJ4Njh6WkZORzJxZGJkWlNFQjdiS1gwZXNZRnRPX0NHeVg2Ync4bjJ5UWpmMDdoMzJY?oc=5",
      "rss_description_text": "大茗萬聖節推「榴槤冰淇淋」新品限時79折 CoCo「葡萄柚果粒茶」買1送1 UDN",
      "brand_detected": "多品牌提及（CoCo都可、大茗）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-080",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-20 15:00:00",
      "published_at_raw": "Tue, 20 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "玩咖Playing",
      "source_media_home": "https://playing.ltn.com.tw",
      "rss_title": "手搖飲買一送一爽喝CoCo！麻古茶坊巨峰葡萄回歸、珍煮丹推蕎麥新品 - 玩咖Playing",
      "clean_title": "手搖飲買一送一爽喝CoCo！麻古茶坊巨峰葡萄回歸、珍煮丹推蕎麥新品",
      "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5MU2w1WFJEVmJjWE55RXNpQ2pBTGpESDJiN1Zwa3A2VTJqRmdzTnU0MmVHajhaWm1DdzhZRTBLMHhHSGtGY0VLd2hrbEVISm9pVHc?oc=5",
      "rss_description_text": "手搖飲買一送一爽喝CoCo！麻古茶坊巨峰葡萄回歸、珍煮丹推蕎麥新品 玩咖Playing",
      "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、珍煮丹）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-081",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-20 15:00:00",
      "published_at_raw": "Tue, 20 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "ETtoday旅遊雲",
      "source_media_home": "https://travel.ettoday.net",
      "rss_title": "珍煮丹開賣「蕎麥系列」3新品　CoCo葡萄柚果粒茶明買1送1 - ETtoday旅遊雲",
      "clean_title": "珍煮丹開賣「蕎麥系列」3新品　CoCo葡萄柚果粒茶明買1送1",
      "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFB3RHR0aXJnY3VkMEFkdjg3R3U2b1dvUE00MTUxTFNHV2tOeGFCaWk2UGRvekVDTzYtOEVMQUFWR0pCME5RbDNKd2w0cVQ5dmtocVAzaUdkRFE2Z9IBT0FVX3lxTE9jdHZhaHBZVUJLRnZyRTRIZm9INWYyV3BrdDh5LTRzM3F0RDEzXzNZWEdXR3UwbzJDamFXejg1eG4xWEhHYzNOQzJmVXZVSHc?oc=5",
      "rss_description_text": "珍煮丹開賣「蕎麥系列」3新品 CoCo葡萄柚果粒茶明買1送1 ETtoday旅遊雲",
      "brand_detected": "多品牌提及（CoCo都可、珍煮丹）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-082",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-19 15:00:00",
      "published_at_raw": "Mon, 19 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "本週手搖３大優惠！CoCo買一送一、鶴茶樓免費喝，大苑子送府城鑰匙圈 - 食尚玩家",
      "clean_title": "本週手搖３大優惠！CoCo買一送一、鶴茶樓免費喝，大苑子送府城鑰匙圈",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5QUFhsaTdZNTByeGl6eTllWmdQWG1Ca2ktUmRBN2NObzZUVHV1bEZqT25FVVFhVW1kekZHVmxTSVJSaXVoY1llNUlRNUVSN1hHdV9OUA?oc=5",
      "rss_description_text": "本週手搖３大優惠！CoCo買一送一、鶴茶樓免費喝，大苑子送府城鑰匙圈 食尚玩家",
      "brand_detected": "多品牌提及（CoCo都可、鶴茶樓、大苑子）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-083",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-19 15:00:00",
      "published_at_raw": "Mon, 19 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "大茗推「榴槤冰淇淋手搖飲」！２款萬聖飲限定喝，榴槤奶茶、紅玉紅茶來挑戰 - 食尚玩家",
      "clean_title": "大茗推「榴槤冰淇淋手搖飲」！２款萬聖飲限定喝，榴槤奶茶、紅玉紅茶來挑戰",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1xeEE3OGdxVWhCTFlteUVsbWlXMTRrSnduQlkwTjRNeHBLV1RBNGVna0ZqU3JYaTJjOWlzckpIZGJaOF9kTUY3ZGNKeVZkWmhET2xTXw?oc=5",
      "rss_description_text": "大茗推「榴槤冰淇淋手搖飲」！２款萬聖飲限定喝，榴槤奶茶、紅玉紅茶來挑戰 食尚玩家",
      "brand_detected": "大茗",
      "candidate_product_name": "待確認候選：榴槤冰淇淋手搖飲（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-084",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-19 15:00:00",
      "published_at_raw": "Mon, 19 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "ETtoday旅遊雲",
      "source_media_home": "https://travel.ettoday.net",
      "rss_title": "大茗「榴槤冰淇淋茶飲」只賣3天　芒果美式明起上市 - ETtoday旅遊雲",
      "clean_title": "大茗「榴槤冰淇淋茶飲」只賣3天　芒果美式明起上市",
      "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE8yTENhbGlKZVg0ZUpoc1ctMjBkUHNYWXZNUnRybnlOclFWMlZ0R01tRDJmX0tIcEh6Y2ZDOXk4LWY4bWFVOVdZWTNwc1BDVGU5UUVDTGJzbnR5QdIBT0FVX3lxTE81U011WnJrQ18xZkd0blZXeXlGTlA1SmczdlFEOTJGZFZqdFJjVDYzZFN4M05JdDBaazFseGc2VjM5RlByNzNKV3I4d1hybDA?oc=5",
      "rss_description_text": "大茗「榴槤冰淇淋茶飲」只賣3天 芒果美式明起上市 ETtoday旅遊雲",
      "brand_detected": "大茗",
      "candidate_product_name": "待確認候選：榴槤冰淇淋茶飲（取自標題引號，需核對內文）",
      "parse_status": "單一候選待確認",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-085",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-17 15:00:00",
      "published_at_raw": "Sat, 17 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Cosmopolitan",
      "source_media_home": "https://www.cosmopolitan.com",
      "rss_title": "【10/12-10/18本週全台優惠】超商咖啡優惠、手搖飲、天丼買1送1一次看 - Cosmopolitan",
      "clean_title": "【10/12-10/18本週全台優惠】超商咖啡優惠、手搖飲、天丼買1送1一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxQQUppVTRlVFBTUUFDRHdhYnVlTlNOYzk1WlNpbU10RzJ4dHBPWVBBaVIwUWwwdG93ejhoTWJCRVVGRDVEQld0bmV3Tk9OMkJwVUpfb1Z3d1F2bFFRVnBNNUUzSmFucXJEcWNyRG41NXVXYTJYSlR6YUtBOXhhWGpMZEYtTERVUHdRSHNzSg?oc=5",
      "rss_description_text": "【10/12-10/18本週全台優惠】超商咖啡優惠、手搖飲、天丼買1送1一次看 Cosmopolitan",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-086",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-17 15:00:00",
      "published_at_raw": "Sat, 17 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "TVBS新聞網",
      "source_media_home": "https://news.tvbs.com.tw",
      "rss_title": "鶴茶樓、CoCo買一送一！大苑子2新品台南限定 手搖優惠快看 - TVBS新聞網",
      "clean_title": "鶴茶樓、CoCo買一送一！大苑子2新品台南限定 手搖優惠快看",
      "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTFBzMTdMRERsMWFXeGtPYTBaNklNSWF3cDJUblhwbWJsU1RURV90LWVQb21WWlVPR2xraVF4LUhzaWdwSHVOMDlEUjU5eHdNQQ?oc=5",
      "rss_description_text": "鶴茶樓、CoCo買一送一！大苑子2新品台南限定 手搖優惠快看 TVBS新聞網",
      "brand_detected": "多品牌提及（CoCo都可、鶴茶樓、大苑子）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-087",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-16 15:00:00",
      "published_at_raw": "Fri, 16 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "風傳媒",
      "source_media_home": "https://www.storm.mg",
      "rss_title": "不只鶴茶樓、COCO！手搖飲週末買一送一優惠來了， 最新十月新品總整理一次看 - 風傳媒",
      "clean_title": "不只鶴茶樓、COCO！手搖飲週末買一送一優惠來了， 最新十月新品總整理一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTE5DbTBNVzlCRXA2SmVQcWpESGVCUy12T1BmY1d3aUplNkVXMnZwa1kwQ1RJM05UbXR2aGV5Rmx2RnhrdDFmSndIdjkyRWxkZWk3?oc=5",
      "rss_description_text": "不只鶴茶樓、COCO！手搖飲週末買一送一優惠來了， 最新十月新品總整理一次看 風傳媒",
      "brand_detected": "鶴茶樓",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-088",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-16 15:00:00",
      "published_at_raw": "Fri, 16 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "Yahoo新聞",
      "source_media_home": "https://tw.news.yahoo.com",
      "rss_title": "鶴茶樓、CoCo都可「買1送1、免費喝」！ 大苑子2新品台南才喝得到 - Yahoo新聞",
      "clean_title": "鶴茶樓、CoCo都可「買1送1、免費喝」！ 大苑子2新品台南才喝得到",
      "rss_link": "https://news.google.com/rss/articles/CBMi3gJBVV95cUxQdjVadUtZMWZnQ3RkTXNVc1lYa0RZM05hVHMwMmJWVnVQZ1Jia3JYa0lfcUlTRGJqWFR2RjJjalowRWhwMkNWZmhNeDlYTGp1bzIyTHByVEJ5ZUNDXzFfaXB4VW5JVjk2MUJRSjdJVm92cG1HZXI4Rm1ycmlWZzh6RlRaRGpvU1RUd3A0OUtkWDN1OVFQVEFZeFhlR1JXY0FSdTB6andOalc0SXFiNk9EUjRRNHFSdFNndzI0Q2RtUVQyQzNGS3dySUhmaC1wS1FRa0M1ekxlWmV4eDJtX25IdG15bVBtY0FIOTRZVUYyeUxVR1Y0QnZjRk5jOW00VHduNFNMcjFNb2JHNTVMUHVZRGlFME9EZmE3TURwdHpBSERpa2JUMTJfOWk5V0NMYlNqdlpLMDdscWlOVERKcS1aTFNIcklRcThSRXZiV1FQOTFqS3Y4R1hVNnA3d1kxUQ?oc=5",
      "rss_description_text": "鶴茶樓、CoCo都可「買1送1、免費喝」！ 大苑子2新品台南才喝得到 Yahoo新聞",
      "brand_detected": "多品牌提及（CoCo都可、鶴茶樓、大苑子）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-089",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-16 15:00:00",
      "published_at_raw": "Fri, 16 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "BEAUTY美人圈",
      "source_media_home": "https://www.beauty321.com",
      "rss_title": "買一送一！10月最新手搖優惠：50嵐、大茗、UG、大苑子、鶴茶樓都有，再睡五分鐘推新品 - BEAUTY美人圈",
      "clean_title": "買一送一！10月最新手搖優惠：50嵐、大茗、UG、大苑子、鶴茶樓都有，再睡五分鐘推新品",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9vMUkyckJvTkg3VjgtLXlZZ2hDWXR4ZTIzazNWSmxFR2JfWjFhalJaQktjZl9HSFRnd0hqN2JaUDN6RTJ4VlVyOUppMHXSAVJBVV95cUxQaWxpQ0U4aEFLbDVjTGVOelJXcW5TRFpEWWVMNUQ1Z2oyZEs3SGhmWFNxYVB3c2ZJZWJqT3dTU3JYU1VEQ0dPTHAxc0NQWmlBUDZn?oc=5",
      "rss_description_text": "買一送一！10月最新手搖優惠：50嵐、大茗、UG、大苑子、鶴茶樓都有，再睡五分鐘推新品 BEAUTY美人圈",
      "brand_detected": "多品牌提及（大茗、鶴茶樓、大苑子）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-090",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-14 15:00:00",
      "published_at_raw": "Wed, 14 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "風傳媒",
      "source_media_home": "https://www.storm.mg",
      "rss_title": "限時買一送一來了！CoCo/星巴克/85℃/麻古10 月優惠一次看 - 風傳媒",
      "clean_title": "限時買一送一來了！CoCo/星巴克/85℃/麻古10 月優惠一次看",
      "rss_link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTFBtUGJybUNCTnJNb3dsbUNqazR3VVo4YlctaHdzUmRwNDZzSXJ5UjFUUkljT3o3VmRkZEIxYXdjLWFMQXczem9aWE5nQU1uMjQy?oc=5",
      "rss_description_text": "限時買一送一來了！CoCo/星巴克/85℃/麻古10 月優惠一次看 風傳媒",
      "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、星巴克）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-091",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-14 15:00:00",
      "published_at_raw": "Wed, 14 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "壹蘋新聞網",
      "source_media_home": "https://news.nextapple.com",
      "rss_title": "手搖飲買1送1！萬聖節新品開賣 1招可現折20元 - 壹蘋新聞網",
      "clean_title": "手搖飲買1送1！萬聖節新品開賣 1招可現折20元",
      "rss_link": "https://news.google.com/rss/articles/CBMifkFVX3lxTE1EUUVEdWdtRmtDWDl4YUc5WDNNSGhfVjl0dkxyNDZ3ZHgyVVdOOEFBbWgzeHhCQlZPMUs1ZHVFbzhweFUtclp4UTVVLXNycnFjNlpqbDJLNklKS3hvZW9EWDByZ01sdTFtMGhRZy12OEFpNC1GOGxQeXNFTU9sQQ?oc=5",
      "rss_description_text": "手搖飲買1送1！萬聖節新品開賣 1招可現折20元 壹蘋新聞網",
      "brand_detected": "待確認品牌",
      "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
      "parse_status": "品名未明",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-092",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-14 15:00:00",
      "published_at_raw": "Wed, 14 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "NOWnews今日新聞",
      "source_media_home": "https://www.nownews.com",
      "rss_title": "CoCo買一送一！粉角奶茶30元　麻古「巨峰葡萄」萬聖節紙杯明開賣 - NOWnews今日新聞",
      "clean_title": "CoCo買一送一！粉角奶茶30元　麻古「巨峰葡萄」萬聖節紙杯明開賣",
      "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9KSGlVclJhNW82cFZSZ2N4UWlIVDNRVVRwLVdkbVpzYUlVcjc1VENnakd3b0xld1g3QWtuNGZnVkFvRXM3WXcxRHFuQUPSAVJBVV95cUxQVDQ0eXFjZjFiYkZINmdRMHl2ampiNEJJOHEtS1gzc29uaUdxUUttWWhTSG1SLUszVHViZ2Z0bUl1bHk0T2FHTHNZd3FNOFNDZGRB?oc=5",
      "rss_description_text": "CoCo買一送一！粉角奶茶30元 麻古「巨峰葡萄」萬聖節紙杯明開賣 NOWnews今日新聞",
      "brand_detected": "多品牌提及（CoCo都可、麻古茶坊）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-093",
      "query_id": "Q1_TW_BEVERAGE_NEW",
      "query_string": "(手搖飲 OR 手搖杯) (新品 OR 新上市 OR 聯名 OR 買一送一) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-13 15:00:00",
      "published_at_raw": "Tue, 13 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "食尚玩家",
      "source_media_home": "https://supertaste.tvbs.com.tw",
      "rss_title": "手搖店竟然賣茶葉蛋！ 鶴茶樓限定門市開賣、烏龍茶買一送一，CoCo優惠跟上 - 食尚玩家",
      "clean_title": "手搖店竟然賣茶葉蛋！ 鶴茶樓限定門市開賣、烏龍茶買一送一，CoCo優惠跟上",
      "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1sVDNkQUJIM0x6UVdiWlZZMzBRUEplMnFBSkY0djRvOHlRSHdHRks4S1laVlBsTFowMmlseVhDWVNCU1gtSEM1WkYxdzU5VUdoZFFPNA?oc=5",
      "rss_description_text": "手搖店竟然賣茶葉蛋！ 鶴茶樓限定門市開賣、烏龍茶買一送一，CoCo優惠跟上 食尚玩家",
      "brand_detected": "多品牌提及（CoCo都可、鶴茶樓）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-094",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-13 15:00:00",
      "published_at_raw": "Tue, 13 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "中天新聞網",
      "source_media_home": "https://ctinews.com",
      "rss_title": "秋天涼涼喝新品！麻古、鶴茶樓攜新品登場 CoCo都可買1送1 - 中天新聞網",
      "clean_title": "秋天涼涼喝新品！麻古、鶴茶樓攜新品登場 CoCo都可買1送1",
      "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE1icFZEenNuZExPR2YyVUlxT1lRVUJmUUJDeTNDeXJZYUNad1R3NnI4T3JVNFotUXBUbFFyMlFZbzBGZXRPNGZvMzBLRE5Pc3ZBS1k4?oc=5",
      "rss_description_text": "秋天涼涼喝新品！麻古、鶴茶樓攜新品登場 CoCo都可買1送1 中天新聞網",
      "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、鶴茶樓）",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    },
    {
      "evidence_id": "GNEWS-095",
      "query_id": "Q2_TW_BRANDS",
      "query_string": "(迷客夏 OR 得正 OR 一沐日 OR 五桐號 OR 龜記 OR 八曜和茶 OR 大茗 OR CoCo OR 麻古茶坊) (新品 OR 推出 OR 開賣 OR 聯名) when:30d",
      "captured_at": "2026-11-12 11:32:12",
      "published_at": "2026-10-13 15:00:00",
      "published_at_raw": "Tue, 13 Oct 2026 07:00:00 GMT",
      "source_platform": "Google News RSS",
      "source_role": "media",
      "source_media": "造咖",
      "source_media_home": "https://cava.tw",
      "rss_title": "9大手搖新品！麻古茶坊「巨峰葡萄系列」、UG「檸檬冰奶」 - 造咖",
      "clean_title": "9大手搖新品！麻古茶坊「巨峰葡萄系列」、UG「檸檬冰奶」",
      "rss_link": "https://news.google.com/rss/articles/CBMiV0FVX3lxTE8wcTdOaHF4ZFQ2czJqaldJREpxZ1hnbVpMMGZsSmU2Y053d2hHdTVRLV9QaWk1RElnZS1odC1lXzR1ZHF5dVFOdVprN0Y5aGwwLXVKcDAxVQ?oc=5",
      "rss_description_text": "9大手搖新品！麻古茶坊「巨峰葡萄系列」、UG「檸檬冰奶」 造咖",
      "brand_detected": "麻古茶坊",
      "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
      "parse_status": "多商品或合集報導",
      "data_scope": "僅 RSS XML 欄位（未進入目標新聞網站爬取內文）",
      "article_body_fetched": false,
      "price_from_article": "未取得（RSS 不含內文價格）",
      "social_engagement": "未取得（新聞來源無社群互動數）",
      "sentiment_and_intent": "未取得（未爬取消費者留言）",
      "commercial_signals": "未取得（無排隊/售罄/銷量實證）"
    }
  ]
};

const newsEventsData = {
  "metadata": {
    "generated_at": "2026-11-12T11:59:51+08:00",
    "metric_terminology_correction": "原『95筆不重複新聞』已正式修正為『95筆依連結去重的新聞紀錄』，並另行呈現整理後之『事件數』，避免將媒體轉載量或跨品牌合集當成獨立消費者口碑。",
    "total_link_deduplicated_news_records": 95,
    "total_retained_records_in_events": 95,
    "total_events_count": 20,
    "focused_brand_events_count": 9,
    "focused_brand_records_count": 46,
    "multi_brand_roundup_events_count": 3,
    "multi_brand_roundup_records_count": 41,
    "unmerged_independent_records_count": 8,
    "category_event_counts": {
      "新品": 10,
      "舊品回歸": 2,
      "促銷": 15,
      "合集": 3,
      "其他／待單篇核對": 1
    },
    "category_record_counts": {
      "新品": 47,
      "舊品回歸": 15,
      "促銷": 85,
      "合集": 41,
      "其他／待單篇核對": 1
    }
  },
  "crosscheck_cases": [
    {
      "case_id": "CASE-01",
      "event_id": "EVT-MILKSHA-WINTER-1111",
      "brand_label": "迷客夏 Milksha",
      "event_title": "迷客夏 — 冬季新品「太妃序曲／太妃奶Q／森半抹茶」上市、法芙娜可可回歸暨雙11「買11送11／11元娜杯紅茶」活動",
      "event_categories": [
        "新品",
        "舊品回歸",
        "促銷"
      ],
      "media_source_count": 14,
      "ptt_match_status": "本次採集範圍內未找到（當期冬季新品討論）",
      "what_media_reported": {
        "summary": "共 14 筆依連結去重的新聞紀錄（涵蓋 13 家媒體，如 UDN 聯合新聞網、NOWnews 今日新聞、ETtoday 旅遊雲、Niusnews 妞新聞、食尚玩家、工商時報等）集中於 2026-11-09 至 2026-11-11 報導：迷客夏於 11/11 推出冬季限定「太妃序曲」系列、全新咀嚼配料「太妃奶Q」、日本「森半抹茶／靜岡焙茶」升級新品，同場宣布人氣「法芙娜可可」系列回歸，並搭配雙11祭出「線上買11送11」、「點新品免費加太妃奶Q」與「11元加購娜杯紅茶」促銷。部分媒體標題使用「未開賣就爆紅」「眾店員求饒」等宣傳字眼。",
        "verified_sources": [
          {
            "evidence_id": "GNEWS-003",
            "title_clean": "迷客夏新品抹茶好喝嗎？最新菜單、價格、飲品推薦一次看！",
            "publisher_name": "JUKSY 街星",
            "published_at": "2026-11-11 13:30:33",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9maUJpbkZ4eVdJWXRVTnRIcW82bkZhOHlsYmRRRTAzQXQxcmQ2NlFBbXpqZFNZa1REWEplR00tYkFRdmw1Zk5NcTdSanA?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "迷客夏",
            "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
            "parse_status": "品名未明"
          },
          {
            "evidence_id": "GNEWS-005",
            "title_clean": "迷客夏「11元娜杯紅茶」！雙11「線上買11送11」 冬季新品「太妃序曲」開賣、「法芙娜可可」回歸",
            "publisher_name": "udn",
            "published_at": "2026-11-11 11:56:35",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9NMmpfbE9WQkpmeGFVLXdVSTVQMHJYTWVNanAwbVA0ZmU0SmRqWjdUYWtDd2dIb0JfQl9TWFRObjY5aE1MRHllNUtFWTFWZ29ic1lYcDc4SmpsT0xL?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "迷客夏",
            "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
            "parse_status": "多商品或合集報導"
          },
          {
            "evidence_id": "GNEWS-006",
            "title_clean": "迷客夏新品抹茶、太妃今開賣爆紅！雙11優惠菜單價格　眾店員求饒",
            "publisher_name": "NOWnews今日新聞",
            "published_at": "2026-11-11 11:18:26",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTFBNelhwOHhGNTZjdHIyanVVVlEwQkhvZjFaTjdLaVVMRE4taVM1cEFFVzRJNGhmeklVa000UzZIVVp5STZKRVIxM0o0SmUwWXNzb0HSAVJBVV95cUxQTXpYcDh4RjU2Y3RyMmp1VVZRMEJIb2YxWk43S2lVTEROLWlTNXBBRVc0STRoZnpJVWtNNFM2SFVaeUk2SkVSMTNKNEplMFlzc29B?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "迷客夏",
            "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
            "parse_status": "品名未明"
          },
          {
            "evidence_id": "GNEWS-009",
            "title_clean": "迷客夏冬季限定「太妃序曲」系列開賣！限時免費加料「太妃奶Q」、加11元再多一杯",
            "publisher_name": "Zeek玩家誌",
            "published_at": "2026-11-11 09:08:21",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE10Z3pVcTQ0MFhVX0ZqNUdGNFpGVjEtNTZlempMd3VNUFRSanNGTEp6TGNjT3JiZTA0UVZCSXdObng0RmpGYWNjNEExNFNzby0xUlE?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "迷客夏",
            "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
            "parse_status": "多商品或合集報導"
          },
          {
            "evidence_id": "GNEWS-012",
            "title_clean": "迷客夏冬季「太妃序曲」新品登場！10款必喝推薦懶人包，法芙娜可可回歸、靜岡焙焙鮮奶激推",
            "publisher_name": "Niusnews妞新聞",
            "published_at": "2026-11-10 16:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiS0FVX3lxTFBVaHlSTklOVDhDX19uOHVsN2FmNmx6dWxMUjVMUF9WaXdObWtUbjZBVkkzMHpYQnVRMkoyVWJwQkgxRDJZM0thc2FUcw?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "迷客夏",
            "candidate_product_name": "待確認候選：太妃序曲（取自標題引號，需核對內文）",
            "parse_status": "單一候選待確認"
          }
        ]
      },
      "what_users_actually_said": {
        "status_badge": "本次採集範圍內未找到",
        "summary": "【本次採集範圍內未找到】針對 2026 年 11 月剛上市之「太妃序曲／太妃奶Q／森半抹茶」新品及雙11買11送11活動，於 PTT 飲料板 (Drink) 最新文章列表與關鍵字搜尋（q=迷客夏）中，均未找到對應的消費者試喝心得或討論。\n\n📌 實際檢索結果核對：在 PTT Drink 板搜尋「迷客夏」共回傳 20 筆歷史文章，其中最新兩篇為 2026-08-05 的 `[贈送] 迷客夏 10元折價券五張`（作者 dollysheep24）與 2026-04-29 的 `[討論] 迷客夏九折優惠`（作者 hc726，徵求共用會員累積點數）；最近一篇實際飲品心得則停留在 2025-06-06 的 `[心得] 迷客夏台味海鹽檸檬可樂、可樂拿鐵`。由此可證：媒體高達 14 篇的密集宣傳與「爆紅」標題，屬於上市初期之公關與促銷曝光，在本次 PTT 採集範圍內尚無消費者實測口碑。",
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
      "event_id": "EVT-COCO-PIKMIN",
      "brand_label": "CoCo都可",
      "event_title": "CoCo都可 ×《Pikmin Bloom 皮克敏》聯名活動（8款咖啡杯造型飾品皮克敏／金色花苗與特殊明信片）",
      "event_categories": [
        "促銷"
      ],
      "media_source_count": 17,
      "ptt_match_status": "本次採集範圍內未找到（皮克敏聯名活動討論；僅有 CoCo 其他品項心得）",
      "what_media_reported": {
        "summary": "共 17 筆依連結去重的新聞紀錄（涵蓋 12 家媒體，如 NOWnews、TVBS、UDN、ETtoday、4Gamers、ELLE、Marie Claire、WalkerLand 等）於 2026-11-02 至 2026-11-11 密集報導：CoCo都可自 11/5 起與手遊《Pikmin Bloom 皮克敏》展開聯名合作，全台門市 menjadi 遊戲特殊地點，玩家到店掃描或達成步數任務可免費領取「8 款咖啡杯造型飾品皮克敏」金色花苗與聯名限定明信片，部分報導並順帶提及 CoCo 茉香凍奶綠買一送一或奶茶三兄弟 45 元促銷。",
        "verified_sources": [
          {
            "evidence_id": "GNEWS-002",
            "title_clean": "皮克敏全家、CoCo金色花苗不要囤！遊戲隱藏機制曝光：會影響任務",
            "publisher_name": "NOWnews今日新聞",
            "published_at": "2026-11-11 13:57:18",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE1nNHIweHUwVG5PVXIwQkx2RmpSU05SWWdMd1JiWmxJUl92QkRoN1ZFRkRIdVNVYUhHYXBtX0xYMlVqVHF4a3BjUks4Ylk1RDlUOGfSAVJBVV95cUxNZzRyMHh1MFRuT1VyMEJMdkZqUlNOUllnTHdSYlpsSVJfdkJEaDdWRUZESHVTVWFIR2FwbV9MWDJValRxeGtwY1JLOGJZNUQ5VDhn?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "CoCo都可",
            "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
            "parse_status": "品名未明"
          },
          {
            "evidence_id": "GNEWS-011",
            "title_clean": "皮克敏11月活動！CoCo聯名活動開跑，飾品皮克敏怎麼拿？新玩法「神秘洞窟」將上線…社群日、巨菇時間先筆記",
            "publisher_name": "今周刊",
            "published_at": "2026-11-10 16:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxOYzNQMjdIWWNMSEJ1UnBlWXU0bm1PT0tJRF9QSTRDcUhUTzRRMzFnenNTSXdfd0ZaZUJNTnpYdnF4TlJsczlPdG9EMmp0VW05RHVhX3lFNGRFdVdTenlsMnZ1d1NUZERPTGw1RENzZjU5dzgxY2VzdV9nZUFJWV9Kag?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "CoCo都可",
            "candidate_product_name": "待確認候選：神秘洞窟（取自標題引號，需核對內文）",
            "parse_status": "單一候選待確認"
          },
          {
            "evidence_id": "GNEWS-017",
            "title_clean": "皮克敏11月活動懶人包》全家與CoCo聯名、天竺葵社群日與5週年飾品",
            "publisher_name": "TVBS新聞網",
            "published_at": "2026-11-10 11:40:00",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTFBBNnRSekI3b0NlRk4tMTZkUG5wN3VfbVd0Q080YUYwb0lzMC1ibjJQXzZVZG5YMGFnRXpWaWt4Nzd1VDhfZ1JVdzJkNXRGZw?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "CoCo都可",
            "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
            "parse_status": "品名未明"
          },
          {
            "evidence_id": "GNEWS-021",
            "title_clean": "Pikmin Bloom皮克敏迷快衝全家！7款五週年限定造型開放收集，CoCo都可再推8款咖啡杯皮克敏",
            "publisher_name": "WalkerLand 窩客島",
            "published_at": "2026-11-10 02:37:00",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTFBCdmFTeUVTN3JsSW5zRGVBZTd4d1ZTSnVVREppVUJLNTgyRGRVUU1ic2IzbkpEd2FXdi1pUGJINUx0LTFzMHVXVU00MTZxek5SNEZSX2NHX214RHZpZ3c?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "CoCo都可",
            "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
            "parse_status": "品名未明"
          },
          {
            "evidence_id": "GNEWS-038",
            "title_clean": "皮克敏×CoCo都可聯名活動開跑！咖啡杯飾品免費拿，走2000步再送特殊金色花苗",
            "publisher_name": "ELLE",
            "published_at": "2026-11-07 16:00:00",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE5SRkV1UU1adWlxSmVPLWNpUjlycmdSX2pNTC1ubUtOTURSNWdyOGo4TUF5dFRmMUxnTHNSV0ZqM0tTSnRxX0JKakd0Q1czbTBGSkJHNzZCejdCRy1yamFQNVluMkhJMThnc05ybHRmSFJLa3M4NUdlZlJNSQ?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "CoCo都可",
            "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
            "parse_status": "品名未明"
          }
        ]
      },
      "what_users_actually_said": {
        "status_badge": "本次採集範圍內未找到（聯名活動本身）",
        "summary": "【本次採集範圍內未找到】針對「CoCo × 皮克敏 Pikmin Bloom 聯名金色花苗與明信片」活動，於 PTT 飲料板 (Drink) 最新列表與關鍵字搜尋（q=CoCo）中，未找到任何板友討論皮克敏聯名活動。\n\n📌 同品牌既有飲品之真實消費者聲音（可核對來源）：在 PTT Drink 板搜尋「CoCo」最新一篇試喝心得為 2026-07-20 的 `[心得] coco茉香凍奶綠`（剛好是媒體在皮克敏聯名新聞 `GNEWS-044` 中順帶宣傳買一送一的同款飲品）。\n- 原文作者 `starpipiuu` 實際評價：「之前很喜歡coco的28茉輕乳茶…昨天跟朋友一起去買，他點了茉香凍奶綠，我喝一口發現有點像之前的28茉耶，而且裡面還有茶凍可以咬，口感更豐富」。\n- 推噓文板友實際回饋（共 4 則）：板友 `pippen2002`（→）留言「ss93r奶精?? pass」、板友 `shairg`（推）留言「我也不愛奶精」、板友 `punkmilk`（推）留言「我也覺得好喝，有特價都會買」、板友 `lkdsa`（→）留言「之前偶爾會買28 沒想到停售了」。\n這顯示媒體宣傳側重「皮克敏遊戲打卡與買一送一促銷」，而 PTT 飲料板消費者實際在意的是「基底使用奶精還是鮮奶」以及「是否停售／有無特價」。",
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
      "event_id": "EVT-MACU-TARO-RETURN",
      "brand_label": "麻古茶坊 MACU",
      "event_title": "麻古茶坊 — 冬季「濃厚芋泥系列」三款人氣飲品回歸開賣",
      "event_categories": [
        "舊品回歸"
      ],
      "media_source_count": 1,
      "ptt_match_status": "2026/11 本波剛開賣未找到新文；但採集到前一波冬季同款「麻古芋泥奶茶」真實試喝心得（1 篇）",
      "what_media_reported": {
        "summary": "卡優新聞網（GNEWS-014，2026-11-10 發布）單篇報導「麻古茶坊芋泥系列回歸開賣 三款人氣飲品一次喝」，宣布麻古茶坊冬季限定芋泥系列正式回歸。由於此事件屬於「舊品回歸」，媒體報導重點在於「冬季人氣回歸開賣」與「三款芋泥飲品一次登場」的上市訊息。",
        "verified_sources": [
          {
            "evidence_id": "GNEWS-014",
            "title_clean": "麻古茶坊芋泥系列回歸開賣 三款人氣飲品一次喝",
            "publisher_name": "卡優新聞網",
            "published_at": "2026-11-10 15:21:18",
            "captured_at": "2026-11-12 11:32:12",
            "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE53RmJleDZMQXhIcGV5Y2FJVXJfNmZob3IyT0dvcmxpaXVUSHJPQ0lfM184TTdnVEROU1RIUUszYU04b2JoNjNfRUFyUXItNmotY1p2RGVlVG4xOFdl?oc=5",
            "query_id": "Q2_TW_BRANDS",
            "brand_detected": "麻古茶坊",
            "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
            "parse_status": "品名未明"
          }
        ]
      },
      "what_users_actually_said": {
        "status_badge": "本波剛開賣未見新文｜已採集前一波同款「麻古芋泥奶茶」實測心得",
        "summary": "1. 針對 2026-11-10 剛發布回歸的這一波：**本次採集範圍內未找到 2026 年 11 月當期新發布的 PTT 試喝文**。\n2. 針對同款回歸商品「麻古茶坊芋泥奶茶」之實際消費者經驗：在 PTT Drink 板搜尋「麻古」最新第 1 篇即為 `[心得] Coco/麻古/全家Let's Tea`（`PTT-DRINK-010`，作者 `a5925457 (桌桌)`，發布於前一波冬季 `2025-12-09 08:40:08`，共 0 則推文）。\n- 作者原文實際評價：「2.麻古茶坊芋泥奶茶$75：喝起來就是芋頭牛奶，能喝得到芋泥&吃到細小芋頭顆粒，口感還不錯 芋頭味也夠，冬天就喜歡這種濃厚系的，有機會想試米麻糬芋泥奶茶。」\n- 此外，在另一篇涵蓋麻古的實測心得 `[心得] 初韻/大茗/麻古酪梨品項評比`（`PTT-DRINK-013`，共 24 則推噓文）中，板友 `abcdef434`（推）對麻古季節限定飲品的常態印象為：「每次麻古出的季節限定都是喝完會飽到天靈蓋」、板友 `ciaoliang`（推）表示：「麻古料真的很多」。",
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
  ],
  "events": [
    {
      "event_id": "EVT-COCO-PIKMIN",
      "brand_label": "CoCo都可",
      "event_title": "CoCo都可 ×《Pikmin Bloom 皮克敏》聯名活動（8款咖啡杯造型飾品皮克敏／金色花苗與特殊明信片）",
      "event_categories": [
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌、同一跨界遊戲聯名活動（11/5 開跑之 CoCo × Pikmin Bloom 咖啡杯飾品金色花苗與明信片活動）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-002",
          "title_clean": "皮克敏全家、CoCo金色花苗不要囤！遊戲隱藏機制曝光：會影響任務",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-11 13:57:18",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE1nNHIweHUwVG5PVXIwQkx2RmpSU05SWWdMd1JiWmxJUl92QkRoN1ZFRkRIdVNVYUhHYXBtX0xYMlVqVHF4a3BjUks4Ylk1RDlUOGfSAVJBVV95cUxNZzRyMHh1MFRuT1VyMEJMdkZqUlNOUllnTHdSYlpsSVJfdkJEaDdWRUZESHVTVWFIR2FwbV9MWDJValRxeGtwY1JLOGJZNUQ5VDhn?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-011",
          "title_clean": "皮克敏11月活動！CoCo聯名活動開跑，飾品皮克敏怎麼拿？新玩法「神秘洞窟」將上線…社群日、巨菇時間先筆記",
          "publisher_name": "今周刊",
          "published_at": "2026-11-10 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxOYzNQMjdIWWNMSEJ1UnBlWXU0bm1PT0tJRF9QSTRDcUhUTzRRMzFnenNTSXdfd0ZaZUJNTnpYdnF4TlJsczlPdG9EMmp0VW05RHVhX3lFNGRFdVdTenlsMnZ1d1NUZERPTGw1RENzZjU5dzgxY2VzdV9nZUFJWV9Kag?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認候選：神秘洞窟（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-017",
          "title_clean": "皮克敏11月活動懶人包》全家與CoCo聯名、天竺葵社群日與5週年飾品",
          "publisher_name": "TVBS新聞網",
          "published_at": "2026-11-10 11:40:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTFBBNnRSekI3b0NlRk4tMTZkUG5wN3VfbVd0Q080YUYwb0lzMC1ibjJQXzZVZG5YMGFnRXpWaWt4Nzd1VDhfZ1JVdzJkNXRGZw?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-021",
          "title_clean": "Pikmin Bloom皮克敏迷快衝全家！7款五週年限定造型開放收集，CoCo都可再推8款咖啡杯皮克敏",
          "publisher_name": "WalkerLand 窩客島",
          "published_at": "2026-11-10 02:37:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTFBCdmFTeUVTN3JsSW5zRGVBZTd4d1ZTSnVVREppVUJLNTgyRGRVUU1ic2IzbkpEd2FXdi1pUGJINUx0LTFzMHVXVU00MTZxek5SNEZSX2NHX214RHZpZ3c?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-038",
          "title_clean": "皮克敏×CoCo都可聯名活動開跑！咖啡杯飾品免費拿，走2000步再送特殊金色花苗",
          "publisher_name": "ELLE",
          "published_at": "2026-11-07 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMie0FVX3lxTE5SRkV1UU1adWlxSmVPLWNpUjlycmdSX2pNTC1ubUtOTURSNWdyOGo4TUF5dFRmMUxnTHNSV0ZqM0tTSnRxX0JKakd0Q1czbTBGSkJHNzZCejdCRy1yamFQNVluMkhJMThnc05ybHRmSFJLa3M4NUdlZlJNSQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-039",
          "title_clean": "皮克敏ＸCoCo都可聯名登場！搶拿咖啡杯皮克敏，再享雙11買1送1好康優惠",
          "publisher_name": "Marie Claire 美麗佳人",
          "published_at": "2026-11-07 10:27:53",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiYkFVX3lxTE8ySk9HREJ4Q2I5WFVkNE1UeVU2MmlIN3hhRG92STZzeENrdndSZUluUVZQdWI1bFRybjU3dXkyeEJNdGxmOWRaSFVrWm1zTHFBNEg3WmV2dFVGUnZUZVA3NnRB?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-040",
          "title_clean": "皮克敏CoCo聯名今開跑！免費拿咖啡杯皮克敏，解鎖隱藏任務多拿限定花苗",
          "publisher_name": "Cosmopolitan",
          "published_at": "2026-11-05 18:09:52",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMilAFBVV95cUxOWjhfQ1VVbVBhRDlaMnVHcUdDeEhMbkp3a2J4M0JXQXY4NExCdWZ2V0E0YncxaTdCZklFODFSU1lOMGpZc3BXamNiV0c3TzlmblA1cEUyNlNqblBJYUVEbldjN0xqYWtacnZTUkZwMl9EaWswaWxNV2Z3VWpYdlBBVVlYeS1aTXVsQU5LOXBReHN4UkN5?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-043",
          "title_clean": "皮克敏CoCo聯名今天開跑！8款咖啡杯金色花苗免費拿、攻略一次看",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-05 04:30:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE5lRVlUNVByenAtRVBhaV9FenRubll6aklkNmRJRzY2Y2Zkd2ZPRWo3U21wVXdBWW5neXcxMXQySG5ZX0NOUktSZkE3dnnSAVJBVV95cUxNOG9UMG9aNE9xSFRLUnVTLTIwOEZ3ZTZ4Z1NodXBuMm5kUWxudlVYbDJXeVl0TE1jZVhhQTFqdTBsSHdvdXdGQWNxUlRPQ0tqVzNn?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-044",
          "title_clean": "CoCo茉香凍奶綠買一送一！奶茶三兄弟45元喝整個11月　皮克敏聯名",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-04 09:57:22",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE1SQzFYdFp3S2hEdlVYRV9fV3FpY0Y3YXAybjFMZ3MzMTJ6VVdpU0Vjc2VUSWFuWGFXcnF5Q1FxdTZKQUFpRDBQc291M2jSAVJBVV95cUxQUW9TUVJnNThrdUxXN3hoTkFrZFBQcEZGZ3JJb01RclRmdVN4eG1CT0NlREZuY2EwYU1KM3dvQ1h5T1FxOGd4LVZIMDZUR2hpMnpB?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-048",
          "title_clean": "CoCo都可超強聯名「皮克敏」！8款咖啡杯造型限定飾品登場 11／5起全台門市開收",
          "publisher_name": "UDN",
          "published_at": "2026-11-03 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5RaUNpLVl6UUpMeDlDU1hzY0FoNVpPNXZNVWxHWllQUWczQjNVU1ZkbVJPLWxEWlFFb0MzOEw1d0R6S3IxUFJYSGdjZkZWdmQzaXhxV2NMZWFCN21f?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認候選：皮克敏（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-049",
          "title_clean": "CoCo聯手皮克敏《Pikmin Bloom》！金盆拿法攻略　全台門市一次看",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-03 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE5wNzljWDh6TWtSUzBTd1VHakdYTllnSFFSUElUU1dZS0VNZjhRbGR3QTlnS0F1MHRadGs3RDE4V3V3TEFHRDFRaXBTTGXSAVJBVV95cUxOUlQtY3M3TTZpb2hLM3pBX18zejJLZTdURjZxRFhESUs5ZnRyM251UFN1REZQOWZkSV96S1ZCeTBQQXk4enl0N2dqZHdmRzI4M2tR?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-052",
          "title_clean": "皮克敏CoCo聯名金盆&明信片免費送！手搖飲、咖啡買一送一接力喝",
          "publisher_name": "玩咖Playing",
          "published_at": "2026-11-02 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5tclZNblo2VzdxZ29vdmVCV2xRczhRcDB6VTk0VlBWOS1WMjNNUEEydzFzYmVxeVFrUjlxNHcxTnlyMjczQ2dCd1RIQl9YZFVNSWc?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-053",
          "title_clean": "CoCo聯名皮克敏11/5開跑　來店領咖啡杯飾品金色花苗、明信片",
          "publisher_name": "ETtoday旅遊雲",
          "published_at": "2026-11-02 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBNYTRUR1ozQXh2dzBvNUx1YTJ0ck1KUlNWYS1pNWZnWUVVa0U5ZEM5a0UyTHVTNXhpYTMwbUFKMDhCd3VUM2lFR3VsbEFxZWZoTHhOT2NjRUVkQdIBT0FVX3lxTE5JMGVNS1F6NTg0b1Z1anF4ZWFTRnJHdC1xZk1vYThXMWVQNDE2N0p2V0o4VWdPSXYyQThoMDFEY21QOEF5RmdwcFZ0UkEycWM?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-054",
          "title_clean": "CoCo聯名皮克敏！８款咖啡杯造型免費收集，皮克敏路跑早鳥送超萌周邊",
          "publisher_name": "食尚玩家",
          "published_at": "2026-11-02 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE8zbkp3dDlOYlZTU3NNRXpWU1RzcGg1a3dLTUdwelZMcmE2RUxHTDhNTVZIRWF1cGVueWJreWM5NThnY3VjNDc2aHJSVXJaUmttcGh5Rg?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-055",
          "title_clean": "《Pikmin Bloom》CoCo都可聯名11/5開跑 蒐集兩款金色花苗與特殊明信片",
          "publisher_name": "4Gamers",
          "published_at": "2026-11-02 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxONzcySmRpajdhM0NtdnBzWXFZaUNqVnVlOE53UXJ1ZDNldThJNWxQeDhGLW1EeDdLZG44cmIteVpsdzRPelUyM2VUbXBTYTZnLXgyTHhsWnFXa285SXI4TkNpcnpTbEYyQWJuVmhKNmo4Q0YxczJnUXB5VmdpTkxwTDVIa3NhWTI3dHg4OV9iMjU?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-056",
          "title_clean": "皮克敏CoCo聯名11/5開跑！2款金色花苗、明信片全台門市免費送",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-02 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE13c1QxUXp6MXJDdHFqTnBMaU04S3JxNW00REQzM3d2Q1pobnEtN3V1MUJRTFFRRXBHSW9TbFh0TllQMEF5aE1ZV1Q3Y3PSAVJBVV95cUxPNVl2RG1GNmFTSFJaYUVfSTlocUZEdFVObkFJMFFNOUttTDN0RWJjejdEWVNFaW5wNHFSOHZ5Q1Vzem5WM19Vb1BMU1NlODNKcG5R?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-057",
          "title_clean": "玩家注意！CoCo聯名皮克敏 金色花苗、明信片免費送",
          "publisher_name": "TVBS新聞網",
          "published_at": "2026-11-02 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE5PRDNJQWNEM1ZUVVZPdUdVb2d3TDFPZlp0QUZmRGlCVHAyTTRpNGFRSm5kTThZZHpfTVg5Mk1mclRTM0VHVDBfd1hoSUpnQQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 17,
      "unique_publishers": [
        "4Gamers",
        "Cosmopolitan",
        "ELLE",
        "ETtoday旅遊雲",
        "Marie Claire 美麗佳人",
        "NOWnews今日新聞",
        "TVBS新聞網",
        "UDN",
        "WalkerLand 窩客島",
        "今周刊",
        "玩咖Playing",
        "食尚玩家"
      ],
      "unique_publisher_count": 12
    },
    {
      "event_id": "EVT-MILKSHA-WINTER-1111",
      "brand_label": "迷客夏 Milksha",
      "event_title": "迷客夏 — 冬季新品「太妃序曲／太妃奶Q／森半抹茶」上市、法芙娜可可回歸暨雙11「買11送11／11元娜杯紅茶」活動",
      "event_categories": [
        "新品",
        "舊品回歸",
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌、同一波冬季菜單改版暨雙11檔期（2026/11/09～11/11 發布），涵蓋新品（太妃序曲、太妃奶Q、森半抹茶）、舊品回歸（法芙娜可可）與雙11促銷（買11送11、11元娜杯紅茶）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-003",
          "title_clean": "迷客夏新品抹茶好喝嗎？最新菜單、價格、飲品推薦一次看！",
          "publisher_name": "JUKSY 街星",
          "published_at": "2026-11-11 13:30:33",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9maUJpbkZ4eVdJWXRVTnRIcW82bkZhOHlsYmRRRTAzQXQxcmQ2NlFBbXpqZFNZa1REWEplR00tYkFRdmw1Zk5NcTdSanA?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-005",
          "title_clean": "迷客夏「11元娜杯紅茶」！雙11「線上買11送11」 冬季新品「太妃序曲」開賣、「法芙娜可可」回歸",
          "publisher_name": "udn",
          "published_at": "2026-11-11 11:56:35",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9NMmpfbE9WQkpmeGFVLXdVSTVQMHJYTWVNanAwbVA0ZmU0SmRqWjdUYWtDd2dIb0JfQl9TWFRObjY5aE1MRHllNUtFWTFWZ29ic1lYcDc4SmpsT0xL?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-006",
          "title_clean": "迷客夏新品抹茶、太妃今開賣爆紅！雙11優惠菜單價格　眾店員求饒",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-11 11:18:26",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTFBNelhwOHhGNTZjdHIyanVVVlEwQkhvZjFaTjdLaVVMRE4taVM1cEFFVzRJNGhmeklVa000UzZIVVp5STZKRVIxM0o0SmUwWXNzb0HSAVJBVV95cUxQTXpYcDh4RjU2Y3RyMmp1VVZRMEJIb2YxWk43S2lVTEROLWlTNXBBRVc0STRoZnpJVWtNNFM2SFVaeUk2SkVSMTNKNEplMFlzc29B?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-009",
          "title_clean": "迷客夏冬季限定「太妃序曲」系列開賣！限時免費加料「太妃奶Q」、加11元再多一杯",
          "publisher_name": "Zeek玩家誌",
          "published_at": "2026-11-11 09:08:21",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE10Z3pVcTQ0MFhVX0ZqNUdGNFpGVjEtNTZlempMd3VNUFRSanNGTEp6TGNjT3JiZTA0UVZCSXdObng0RmpGYWNjNEExNFNzby0xUlE?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-012",
          "title_clean": "迷客夏冬季「太妃序曲」新品登場！10款必喝推薦懶人包，法芙娜可可回歸、靜岡焙焙鮮奶激推",
          "publisher_name": "Niusnews妞新聞",
          "published_at": "2026-11-10 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiS0FVX3lxTFBVaHlSTklOVDhDX19uOHVsN2FmNmx6dWxMUjVMUF9WaXdObWtUbjZBVkkzMHpYQnVRMkoyVWJwQkgxRDJZM0thc2FUcw?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認候選：太妃序曲（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-025",
          "title_clean": "迷客夏冬季新品「太妃序曲」上市！日本抹茶、焙茶及法芙娜可可同步登場，再推雙11優惠",
          "publisher_name": "BEAUTY美人圈",
          "published_at": "2026-11-09 17:50:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFBRVGlHam1XV25zbUhRX0ZVdkNXZDZRZUdRaXg3ZTRMNFhEdmNTdmgtbkptMmN2a3hoLUoyUDh2QnBSVW9MbVpwZHFuTGzSAVJBVV95cUxNQ2hfNWZ5SGNsNzY4TXJTVGs1eVFadzdDRjRCV1pvSk9QVmJfaFFqWkg4M0VwSGljVGtBNEgxelZ3SFAzOTh5NFdMYy1sVm1FSHFn?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認候選：太妃序曲（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-028",
          "title_clean": "迷客夏買11送11寄杯喝！抹茶、焙茶、娜杯太妃、可可9大新品，未開賣就爆紅|美食",
          "publisher_name": "WalkerLand 窩客島",
          "published_at": "2026-11-09 17:20:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTE9TbDRGRHJUVWJhcHBfWENlS2dWMTZVZnI2SEp1SXdpdXZyay1pSmRjdWFoelo5aEFFWXk5Yl9tbkdqQnZQbFhLeGZFdzVGUHNCZ1hDUmNKVkFZQjdydXc?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-030",
          "title_clean": "【完整菜單】迷客夏買11 送 11、太妃奶Q 免費加！太妃糖、抹茶、焙茶三大系列冬季飲品新推薦法芙娜可可同步回歸",
          "publisher_name": "上報Up Media",
          "published_at": "2026-11-09 16:30:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTE1iQjJuRG5Mb1Fnck5yZFRqckY3X1R2Y3JrVjVFc05tRDc3NzcwRV9BeUV6NWg0MDF2anZSc0U2Yk43aDdYMXB4SlpCU09Gb0RfT1pvZnl3NGxZYXM?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-031",
          "title_clean": "迷客夏太妃冬季新品11/11開賣！全新配料太妃奶Q必吃",
          "publisher_name": "卡優新聞網",
          "published_at": "2026-11-09 15:40:47",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1nQ19UdE15V0FibHdiUEctUFdIZXp3TTRhVWFVYzNOTF92OFFfa0tvZG9UcDhMczZlRXJMZmdITnp5TmVSWUpvLVpBaTFMVjBpVW9QNmJxSVg2M25l?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-032",
          "title_clean": "迷客夏太妃奶Q免費加料！森半抹茶、法芙娜可可　雙11開賣優惠曝",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-09 14:31:03",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5GS2NkUWFFVUFEOXptRVhuSE1OMEFpWU5MV2sydFFmejhZNVBhMklzOEYtU0xkVjJBNGppWFNRYWlWS2dGa3NDUmdab0NJdE1uUXfSAVJBVV95cUxORktjZFFhRVVBRDl6bUVYbkhNTjBBaVlOTFdrMnRRZno4WTVQYTJJczhGLVNMZFYyQTRqaVhTUWFpVktnRmtzQ1JnWm9DSXRNblF3?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-033",
          "title_clean": "迷客夏也加入「抹茶」戰局！同場加碼法芙娜可可系列回歸，焙茶、太妃飲品冬季新菜單登場！",
          "publisher_name": "COOL-STYLE 潮流生活網",
          "published_at": "2026-11-09 12:57:16",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMi6AJBVV95cUxQV2pTLWh2cU1tMi1lb044QXNyYlp4TUFLMG1wNURPeGE2MS1tQXZfVkpjcnh5YnJIX3JTc0ZGdF9GMDI0RTF5Ri1BV1V3SndmWWl6bWtpVWE3aHNrWGNEY21mNHZmOHUyc3VxV0R2RGJHLWVtRVVoRGVrVmhkR0hFc1R2MkRaOElKYVlLeHN1Q0Q4M2V4amUwc3NfMGYxQzh2aWFkQlhWR2F3VzhuNkhmZE81YXVKT09qeVh6bW1KSW1kb0FDUm8tLXNhNDk3MFctV2o4MWJaZ2R0ZGNJbmVaVnZIUmFlWG90T2cyVk50VHZzekVTZVNLeW13WXNtaVc0Z0YtcVU4ZG5WSTBkU29LajJfdlZ0RS1QUmhnUjd3Y2hlRVlkOU5pT0xnRU13bDhYelZ4SnFpOTkyRUM5QlFXT0s3QWNYQmlBeEVpV2UwRzRDVEhJZHNNdktLWXppWWpnRU45cEI5NGvSAe4CQVVfeXFMTzNsUnUyaWUxXy1UZm1VTkZtR1l1aGJ4Nk9QNVU0eXBjVnR1SlR4cTllZGtOQS1QYkotQkNIcXl0NlVEVVVmUHMtTjJCTER5UXVjTDdXOE0yczhnSHItcFM2X0JTQU5uSElsMkhXQmFuUEsyUWh6WWJUSE1VclRXdERVOGh0NDVfQWdMZkxzaXJlaHl2c1lvR1pzVWhWMTJoZkVMU2R3X0YzdVc1bFo1SDZtWl9wYnN5eXQ1UkQxeTRCaHhsZjVlU3c0NmlndnlqbENRRzVzcGluOGRqa1Q5MTVWOUxkNjdvV1NtT2R4c2Vfb2taMGF6UXVBSkt0N2E2c2tEYWZfVUpzNXZEd0R6UGw1Q1YwRXNJSkxzbHFNXzVBVUJpb2lfMmZIemdvSUZjQkVQS0JpLThLc0cySTlWU0xvX3FvZGJzZFhaV3U4NEx0c01aVjNHYlZIVkVuaFBWdDdscXprVEV6aUNsd213?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認候選：抹茶（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-034",
          "title_clean": "迷客夏冬季新品「太妃序曲」11月11日香甜上市 雙11限定「買11贈11」！",
          "publisher_name": "工商時報",
          "published_at": "2026-11-09 11:55:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE52UEpQNlpSM3lLMDYtMFZXUHFKcG9SSDl4SUZScEJCY1NTZ01RUGt1aGFPNjkxNWtvb19hZjlBZ2dfWk5UTC1VdU95YVNWZWpyMEcyMGNJcnZTaFZsUHc4?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-035",
          "title_clean": "迷客夏「太妃序曲」後天上市　買新品免費加料、11元加購紅茶",
          "publisher_name": "ETtoday旅遊雲",
          "published_at": "2026-11-09 11:38:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTFA5LVk2QUJTVFBJSkNrS3ZhTjYtWENlV3NZVldIeDkxRHVfS1YwR2l2b0tjRzFUcU83V2Z4U2tPNEZIbHJhZVFRUl9mQ1NxRTTSAU9BVV95cUxQOS1ZNkFCU1RQSUpDa0t2YU42LVhDZVdzWVZXSHg5MUR1X0tWMEdpdm9LY0cxVHFPN1dmeFNrTzRGSGxyYWVRUVJfZkNTcUU0?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認候選：太妃序曲（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-036",
          "title_clean": "迷客夏11款冬季菜單！太妃奶Q飲登場，抹茶升級、焙茶可可回歸，雙11買11送11",
          "publisher_name": "食尚玩家",
          "published_at": "2026-11-09 10:59:34",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5TNW5nR01Jamdzekp3MjZaWnk2a3BkalpralpsdnVpU0w5X2NKdFZMWGxBc1laWGFRQ29yeVVnT1VXbW8zTFdMMWZ1ZmhRSzNYMWlJSg?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 14,
      "unique_publishers": [
        "BEAUTY美人圈",
        "COOL-STYLE 潮流生活網",
        "ETtoday旅遊雲",
        "JUKSY 街星",
        "NOWnews今日新聞",
        "Niusnews妞新聞",
        "WalkerLand 窩客島",
        "Zeek玩家誌",
        "udn",
        "上報Up Media",
        "卡優新聞網",
        "工商時報",
        "食尚玩家"
      ],
      "unique_publisher_count": 13
    },
    {
      "event_id": "EVT-COCO-COCOSWEET",
      "brand_label": "CoCo都可",
      "event_title": "CoCo都可 — 冬季「可可甜心」系列（可可珍奶、蕎麥可可）新品上市暨 2 杯 85 元促銷",
      "event_categories": [
        "新品",
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌、同一系列冬季新品（11/1 開賣之 CoCo「可可甜心」系列：可可珍奶、蕎麥可可 2 杯 85 元）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-062",
          "title_clean": "CoCo可可甜心11月登場 珍奶蕎麥雙口味暖心開喝 | 程霽玥 | 地方新聞",
          "publisher_name": "風傳媒",
          "published_at": "2026-10-30 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE56dXp1dklzNTdnQUlMMnhBeU1lOUxVTkk4ZTcwNWhJQnZRRWNQbzNJR2lkUnZIWWhFaUpFOFMyamhwUEtiTTVTMnRlVm9kUQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-063",
          "title_clean": "CoCo開賣巧克力手搖！可可珍奶、蕎麥可可任選2杯才85元，45元奶茶三兄弟加碼喝|美食",
          "publisher_name": "WalkerLand 窩客島",
          "published_at": "2026-10-29 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTFB6X0FPemxsb29OSzVieUZYWDQ0LUN1Ti14SGNRLVpETG5kM21WQXBpU2xxNzhwdlYzRFQ1R1BJM2pSREx5bnhiYUdvX2dxV3dvQXRsODhuamwyMUQxcGc?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-069",
          "title_clean": "CoCo日焙珍珠奶茶買一送一！大杯才32.5元　可可甜心新品11/1開賣",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-10-28 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE1mSVRDV3dtNmRGTXpFU1dWU2psSE54VHNSOFRWTDJ4MV9iNkgzdFZQWHRLb1U2RktPTXIxYzR2amxnYks3N2pkMTUwMnfSAVJBVV95cUxNYWF6bDNCVFdxT1dPN2JyUVBIcjdDWThKMHJZSTdGNWFRQzY5UF9kYWYtcVNDdkpDZGRPVGxQYndLSXZDUVc0UmltX0Z2MDQ1T21B?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 3,
      "unique_publishers": [
        "NOWnews今日新聞",
        "WalkerLand 窩客島",
        "風傳媒"
      ],
      "unique_publisher_count": 3
    },
    {
      "event_id": "EVT-MILKSHA-SMOKED-CREAM",
      "brand_label": "迷客夏 Milksha",
      "event_title": "迷客夏 — 「迷客夏 3.0」新店型開幕暨限定新品「娜杯糖燻奶霜」折 10 元促銷",
      "event_categories": [
        "新品",
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌、同一事件（2026/10/27～10/28 迷客夏 3.0 概念店開幕與新品「娜杯糖燻奶霜」上市折 10 元優惠）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-070",
          "title_clean": "迷客夏3.0升級亮點！新品「娜杯糖燻奶霜」折10元、鮮奶茶2杯99元，極簡風、試聞茶瓶要踩點|美食",
          "publisher_name": "WalkerLand 窩客島",
          "published_at": "2026-10-28 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTFAwbkZxN0ZXdTNoc2FOUjhrTmdyODdPSFhUV01JeEpqbEJiRjQ4S3hydnJhTmh0dzVQck9uOXlVRWVYVVQtb1VpVkh2VzlNZHBBUEtCVFRZV3JfZU1IRmc?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認候選：娜杯糖燻奶霜（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-073",
          "title_clean": "迷客夏3.0新店開幕！娜杯糖燻奶霜開賣送托特包　全台折10元優惠",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-10-27 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFBHY2pnV2tSbGVWT1dkbXdRUVJuei1hblpxQm1UdDV4NHFUX0hrQ2ZSMHhfeUVSVDdsWEJ5ZXZHOHUtdVBIcXgxczVOdjDSAVJBVV95cUxOS204eUtlZFdJdzg4Nm5TT3czdVdoOC01dGE0SmhEdy00TnRNU2RNSFRocUlpN1RpVC1YSXlPWEJaZWtxYm9Qc3FKanpaV2xLcU13?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-074",
          "title_clean": "「全台最大迷客夏」開在這！10坪新門市亮相，「娜杯糖燻奶霜」乳牛斑點萌翻",
          "publisher_name": "食尚玩家",
          "published_at": "2026-10-27 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTFB4SGRtWmZyT3BtMEFmTFBfTVg4WHpsWUFWOWRORTBYaWUwRXdVZ0ZoYy1SZUdwTUNoZUxsNHJEM1R3RHlOSlA4UTVLdllQTkkwSkRreQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        }
      ],
      "source_count": 3,
      "unique_publishers": [
        "NOWnews今日新聞",
        "WalkerLand 窩客島",
        "食尚玩家"
      ],
      "unique_publisher_count": 3
    },
    {
      "event_id": "EVT-MILKSHA-DOLLY",
      "brand_label": "迷客夏 Milksha",
      "event_title": "迷客夏 × 金馬入圍動畫《歡迎來到朵莉之家》聯名暨 75 折限定套組促銷",
      "event_categories": [
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌、同一跨界動漫聯名活動（迷客夏 ×《歡迎來到朵莉之家》75 折套組）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-071",
          "title_clean": "金馬入圍動畫跨界手搖飲！迷客夏聯名《朵莉之家》",
          "publisher_name": "壹蘋新聞網",
          "published_at": "2026-10-27 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMihAFBVV95cUxPamQ4OU5ZTUVDUWx2M1B2MGs1empfZFNCMkFWT1RiUklWTlB1cy0xOUs3ZTJobmJQNmE1WXQzb2s4dGxFRkZSYUltbVlYVWYxUzFiVC13RXl4TEJ6MGVpLUp6ZlFhdzdrWUJJTnY2U1BybnA1V2dpZDhISWpOU0lEY2Fkd0s?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-077",
          "title_clean": "迷客夏聯名《歡迎來到朵莉之家》 獨家推「75折限定套組」搶攻動漫商機",
          "publisher_name": "CARTURE 車勢文化",
          "published_at": "2026-10-22 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMi1wNBVV95cUxQbUVKODhranNiTXFaWUFYaElvUERobG5mUWQ3VW9ycTBvYy1mNDJxdU5palNodzVDMGNXZlp6RDRGbkpJVGVkV2pMYXpKWDZGMzRIN05wM0pBTm9CWGZCSWJkSUx0dUdGdTVEV2dZTTItdGNUTlZJclBmNXZwMlhyenlQbDJkeXMyR3RVUWEzRC12YmhDbjBmdHpIRGJBMmtxd1BZbUMydFhCMVkxQVc5OW41cUcxdFh5MmF5Rzc0eXNpNUpiajhNekNNWFp2QWlIMTNSbW92TUNCU0tkY2lZQTBCQWtIWS1qQVpRS1FhRmZZcUdmbjExcEcwS2o2TmR2bHJmYUZfUnBOSklyNElEZ3d0MWx1MXFVXy1vdk5TalI3c3lZR1hKRmkydl9wN01nd09pakx2OTNzQ3pHcU00bFJST1NYczBxUU1PZWRQRVExVmNncGJSRVEzVTdyTV9oN2JXal9DbUdyQTc2MTR0dWliVDNxY1ZKLUNhTVFfaG9wWDc2dVFlLXQ5eXEtcWF4ZG1xLTZIOHBtaEd0eGZXOG5fUFo3WTlOWHF0eUI2SXZ4STIyeHJEZi1QWHk3MVpIODFsbnhPMXR1UDhDbTlscGRNY3pxeUk?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-078",
          "title_clean": "迷客夏聯名《歡迎來到朵莉之家》！優惠套組75折應援台灣原創金獎動畫",
          "publisher_name": "玩咖Playing",
          "published_at": "2026-10-22 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTFAxR0lSSU8za1ZNOGtNUm5oQTRiV29RMExhUXduYUZ5MGVGbW1fT1lPUVU2blRKcW1WSWlhVm50eW5NbXpHSjFOYVBZMkVZRWNBblE?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 3,
      "unique_publishers": [
        "CARTURE 車勢文化",
        "壹蘋新聞網",
        "玩咖Playing"
      ],
      "unique_publisher_count": 3
    },
    {
      "event_id": "EVT-GUIJI-OATLY-MATCHA",
      "brand_label": "龜記茗品",
      "event_title": "龜記茗品 × Oatly 聯名 — 3 款抹茶手搖新品（抹茶燕麥乳系列，11/16 開賣）",
      "event_categories": [
        "新品"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌、同一聯名新品系列（2026/11/02 發布之龜記 × Oatly 3 款抹茶新品）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-050",
          "title_clean": "龜記推3款抹茶手搖新品！Oatly聯名抹茶燕麥乳11/16開賣",
          "publisher_name": "卡優新聞網",
          "published_at": "2026-11-02 16:28:22",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1NckRiWnE2a05OQUhXV0lSbUktLUpraGQtV096X1NvSDZiSF8zVjR3eE9CTUNsQnoxcGxmNXlPT1ZnU09pSUJUTmNVcXdFaHRWY2QwUnhVZlNNdENs?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "龜記",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-058",
          "title_clean": "抹茶熱潮燒進手搖飲！龜記抹茶系列3款新品登場，聯手 Oatly 燕麥奶乳糖不耐也能喝！",
          "publisher_name": "COOL-STYLE 潮流生活網",
          "published_at": "2026-11-02 10:28:28",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMi6gJBVV95cUxNelBHNjZ0MDFTUXBKWmljbkFnWGt2N3lObElKSXNPWmFLUlZVVWk1NXRteFc4ZHlWWWtvYzViNEF6UHkzWVdfajlqd1J3eGdqSnduUDFmWmN2dzg3X1J4NkhETVBaTGUzWGlBamtocnBiWWVPaEh3V1B2STBMTHp6UEJLWjFwOHNiS1k3cDJ5cmhuU2tTcVVPVUlZYXFsWVlkbk80V3Q1dkFhT29uZTcyVUt5V3pJU1NXWUFwalJLUVB2N1h1czkwU0VQSHlWQkR6YVVwZjVUZExHemNwM3hTUTVfb0c4blpPZFdEOWJjdUhuZ3p5ZldJLV9LQ1ZaNEItWFlzaVVrMmtISjB4WUVWTnF5LWhqQS12WExSeVVjeXM4ZzZibERXVjB5RTk3QWRoTW03YzRQZ1gxTXVzMUR4UnFmMklicnlfam1PTzJjM3pjX3F1U3lZdEFGcjRTVFNpTEM1dTRBSEVsQdIB7wJBVV95cUxPb09GYVlDOW84QUROMXlJUWZnXzNoQ1pLR3B3cndxa1djQnhuTEhQbDhBTERfVVFCaTlmNjBvdVltdkF3SzBxMzkzTjd1VXdwQ1d5OHFVSG5aaE1STWNudUd1NnRZc2RyM2U1TnB5SHVMQlYtSDFQZGVBUkJYMTNLM1RJdW9KVWt5cm9xbEFyYl9WTXJRaUEyZnZ6NGNBUDZBMEFpcGY3dWNUZHVPSGVNakhzNmVLRGl0dmQzbW1NUVpjRlFOdjBDeVQyb2s0dDlNSlFpRGNycm9FVXp2dVdnQkQxVFJRVGNWZi05UEJzV2xlalZGeDNwbmI2a0k1NGd6RUcwVEV1ZDQyYmJ4RlZZSnVHdGpLUGtjUnVOQXVzMHRmNWFoOGU2MHIwMS1UbDA0a3VFSmlROV9CcFNzRlJHVjJmeEtXYzdtUG5LN0JvQ3FDclBoWk8zWFJmZ3ExZmZEQTY0eEozdHAybGUtbjVv?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "龜記",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 2,
      "unique_publishers": [
        "COOL-STYLE 潮流生活網",
        "卡優新聞網"
      ],
      "unique_publisher_count": 2
    },
    {
      "event_id": "EVT-DAMING-DURIAN",
      "brand_label": "大茗本位製茶堂",
      "event_title": "大茗本位製茶堂 — 萬聖節限定「榴槤冰淇淋茶飲／手搖飲」與芒果美式新品",
      "event_categories": [
        "新品"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌、同一波萬聖節限定新品（2026/10/19～10/20 發布之大茗榴槤冰淇淋茶飲與芒果美式）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-083",
          "title_clean": "大茗推「榴槤冰淇淋手搖飲」！２款萬聖飲限定喝，榴槤奶茶、紅玉紅茶來挑戰",
          "publisher_name": "食尚玩家",
          "published_at": "2026-10-19 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1xeEE3OGdxVWhCTFlteUVsbWlXMTRrSnduQlkwTjRNeHBLV1RBNGVna0ZqU3JYaTJjOWlzckpIZGJaOF9kTUY3ZGNKeVZkWmhET2xTXw?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "大茗",
          "candidate_product_name": "待確認候選：榴槤冰淇淋手搖飲（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        },
        {
          "evidence_id": "GNEWS-084",
          "title_clean": "大茗「榴槤冰淇淋茶飲」只賣3天　芒果美式明起上市",
          "publisher_name": "ETtoday旅遊雲",
          "published_at": "2026-10-19 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE8yTENhbGlKZVg0ZUpoc1ctMjBkUHNYWXZNUnRybnlOclFWMlZ0R01tRDJmX0tIcEh6Y2ZDOXk4LWY4bWFVOVdZWTNwc1BDVGU5UUVDTGJzbnR5QdIBT0FVX3lxTE81U011WnJrQ18xZkd0blZXeXlGTlA1SmczdlFEOTJGZFZqdFJjVDYzZFN4M05JdDBaazFseGc2VjM5RlByNzNKV3I4d1hybDA?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "大茗",
          "candidate_product_name": "待確認候選：榴槤冰淇淋茶飲（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        }
      ],
      "source_count": 2,
      "unique_publishers": [
        "ETtoday旅遊雲",
        "食尚玩家"
      ],
      "unique_publisher_count": 2
    },
    {
      "event_id": "EVT-MACU-TARO-RETURN",
      "brand_label": "麻古茶坊 MACU",
      "event_title": "麻古茶坊 — 冬季「濃厚芋泥系列」三款人氣飲品回歸開賣",
      "event_categories": [
        "舊品回歸"
      ],
      "is_merged_event": false,
      "merge_basis": "單一品牌明確舊品回歸事件（麻古茶坊冬季芋泥系列回歸）。",
      "source_records": [
        {
          "evidence_id": "GNEWS-014",
          "title_clean": "麻古茶坊芋泥系列回歸開賣 三款人氣飲品一次喝",
          "publisher_name": "卡優新聞網",
          "published_at": "2026-11-10 15:21:18",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE53RmJleDZMQXhIcGV5Y2FJVXJfNmZob3IyT0dvcmxpaXVUSHJPQ0lfM184TTdnVEROU1RIUUszYU04b2JoNjNfRUFyUXItNmotY1p2RGVlVG4xOFdl?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "麻古茶坊",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "卡優新聞網"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-COCO-BOGO-FLASH",
      "brand_label": "CoCo都可",
      "event_title": "CoCo都可 — 常態品項單日快閃促銷（百香雙響炮／咖啡特調／冬韻擂茶買一送一）",
      "event_categories": [
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "同品牌單日好友日／雙11快閃買一送一促銷報導。",
      "source_records": [
        {
          "evidence_id": "GNEWS-037",
          "title_clean": "連3天喝買一送一！CoCo「咖啡特調、百香雙響炮」0元多一杯，雙11優惠飲料先喝|美食",
          "publisher_name": "WalkerLand 窩客島",
          "published_at": "2026-11-09 06:20:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXkFVX3lxTE5DRVZOZ2p0bTd2RFRXdy1Sd1hPNWpYc0c4QXVwZHhENi1ISEx0THZZOEJJR1VzQUpqYjN1aUNSaDVySUVYcGtfQWV0Sks5Vzl1aHcxVXl5WE94ZElkMVE?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認候選：咖啡特調、百香雙響炮（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "WalkerLand 窩客島"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-ROUNDUP-MULTI-PROMO",
      "brand_label": "跨品牌合集（雙11與買一送一懶人包）",
      "event_title": "【多品牌促銷合集】雙11、立冬與週末手搖飲「買一送一／11元」跨品牌優惠懶人包（涵蓋 CoCo、迷客夏、日出茶太、五桐號、星巴克、鶴茶樓等）",
      "event_categories": [
        "合集",
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "媒體例行彙整之跨品牌買一送一與雙11促銷懶人包（合集），歸類為「合集（促銷）」，避免將媒體轉載與合集篇數誤當成單一商品熱度。",
      "source_records": [
        {
          "evidence_id": "GNEWS-001",
          "title_clean": "2026雙11優惠懶人包！手搖飲買1送1、飯店餐券6折與11元家電開搶",
          "publisher_name": "Marie Claire 美麗佳人",
          "published_at": "2026-11-12 08:48:19",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiYEFVX3lxTFBKWERXQ1p1Vy1LbVZyTU5XMU5MWjY3STJxcm5nMXNvS08ySUNxb1lvdU9oeVB6WV9ZZ3ZoREhsTlhJWG9lUThBSkN0MlN1ZGxaa1JtRmt3QWIxVFNqSjNISg?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-004",
          "title_clean": "雙11優惠CoCo買一送一！迷客夏11元　麻古、珍煮丹、大苑子8家曝",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-11 13:12:25",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE83OVUxdFR4ejhXbDFqNGZwWXJSYTIyLVo4dTlneGljNk9TZG50ejNFLXZIaGpCRURSVlo1ME43bXAxa1R3a3Mtd1ZVczNJRUt2QUHSAVJBVV95cUxPNzlVMXRUeHo4V2wxajRmcFlyUmEyMi1aOHU5Z3hpYzZPU2RudHozRS12SGhqQkVEUlZaNTBON21wMWtUd2tzLXdWVXMzSUVLdkFB?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（迷客夏、CoCo都可、麻古茶坊、珍煮丹、大苑子）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-007",
          "title_clean": "手搖飲雙11優惠　日出茶太買1送1、迷客夏娜杯紅茶11元",
          "publisher_name": "ETtoday旅遊雲",
          "published_at": "2026-11-11 11:15:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFA3VTB5TU1Kd2JIdmU4TE84YXBScGg2T3VtNlVvRE1aZTI0bVlTN3RmSzBmVEp3alJYYTVTVWkzNVl2UFpNRjNLRHktMWwyRGljaHA4Qm1ZSVB5d9IBT0FVX3lxTE5BdEp4ZHFMYWJYbk5pQlFyclZ0QTVpOUIwZkNJUU5FdkgtcEtaYTdEMFBDcFd4TlFaM0pxN1FfQUotdDZrR0NneTlBOE5tY1E?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-008",
          "title_clean": "雙11手搖優惠！CoCo雙響炮買1送1 迷客夏買11送11",
          "publisher_name": "TVBS新聞網",
          "published_at": "2026-11-11 11:12:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9nVlN1LWROcUE1YXlGMGdoYW10QjJJbWFOeXNPd0ZVTkdYV2JBZWFGUFNxRzFGREJJVGhNWGFiOWdqZUlmTjI5c0hacF9zdw?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（迷客夏、CoCo都可）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-010",
          "title_clean": "CoCo買一送一、迷客夏紅茶11元！雙11「手搖飲優惠」11間，鶴茶樓第２杯半價",
          "publisher_name": "食尚玩家",
          "published_at": "2026-11-10 16:16:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5rQ2ZRRnBxcmtld2U0YVFLbGgtZHVjNTFzZnpzRUtXZi1tdzJTZkpnNmxQTjIwamVpd3U5T3g0bHBqcWhiNDFRNFdneGtyMHZjdHV3dw?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（迷客夏、CoCo都可、鶴茶樓）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-013",
          "title_clean": "「雙11優惠」11/11限定，手搖飲買1送1、好市多現折600元、繼光香香雞可樂餅免費送！",
          "publisher_name": "Cosmopolitan",
          "published_at": "2026-11-10 15:22:40",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQeTI3Y1Y5Q0YzbEczZDllTGZRNlcyUFNzMlYzdThFb3hZT01waTdCUGNqVjlYaUJHMVVBbmhXN0Q2SlZrNEtkeHBmdXo5MlA4eWdXem5Vb0ZKU3BWZGdFdi1rc3N5LUdOWWhiUW9MbWIzZUlJWC0wYUdCUTBJWlFpSVFmcUw1ci1kQk84SUJYWVg?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-015",
          "title_clean": "【雙11優惠】咖啡、手搖飲買一送一！四大超商、全聯、星巴克、CoCo、大苑子等14 家飲品優惠懶人包",
          "publisher_name": "上報Up Media",
          "published_at": "2026-11-10 14:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTFBNRDRIOW1tN3JpWjFGQ0I5WDJOZUo2NENMSHZvS0VnU1NFRUMwNC1QWDB4TS1DYVZqR3VSRThVWXpzc0Z3WFhMMkZjb1kwelBwdFQ2X2l6bDZrS3c?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、星巴克、大苑子）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-018",
          "title_clean": "2026「雙11美食優惠」懶人包！咖啡、手搖飲、麥當勞買1送1 肯德基蛋撻11元 摩斯加11元多1件",
          "publisher_name": "udn",
          "published_at": "2026-11-10 11:04:22",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9IYVhzYjZrTFN6QVQ3RFgwVTdjV3Y1MWRjRjVVb0VLakxLN2dhWjF2YWV5blRabG5lOS1ObmI2dnBFOUhXLVJNWXdsQlY3eXNMMXdLZVB5aUxoQUlZ?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-020",
          "title_clean": "雙11飲料優惠！CoCo、日出茶太、五桐號買一送一　翰林珍奶40元",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-11-10 05:03:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFA1Z1hiMlo1d0R0NDFfY1M3eVh3M3dUaHJQcjg2V29jbnJ5UEQyZ0pJTnFIY3dGMi1YUm1aWDIwZVpkdFpocWpQZUJwZUPSAVJBVV95cUxPSF9PREZPRTd5NUxTSGVHVmlQaDNiZE5iNUpnbjZQTVhhWTJKQ0duSjNwVVBmeG93ZlVDOXc0Z0g2eDFLdFJRUlhHNXhMblY4NUdB?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（五桐號、CoCo都可）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-023",
          "title_clean": "小資族這篇快收藏！雙11手搖、速食優惠懶人包：大比薩199元、多款手搖飲買一送一",
          "publisher_name": "COOL-STYLE 潮流生活網",
          "published_at": "2026-11-09 20:58:46",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMi3wJBVV95cUxPTGRsb1ZIeFFuam5rUU5KbHNQZHBTZG42cnpZVG13aFpZZkQwblNjOXJLd1Zub3pSNUJ0MFViSzVxaFVMVV9PY0FXam1BRGtjRkVfampvUzNoRTJ3SURBNjlxLWVSb1QyenlTYUltZWR5cldjTk9nOHRZOHBlNHB3U3pBU245RDRNbHpZcVA2bHc3SHBkLTJwQWkyb0Z3dktNRWJaYkJnaXQ5czhxanpNV1QySFNEV1JSOVRCbFFST3ZoSE1tY21BbmVnTHcxa3puSWJGY202V3lpcllMQ1BILW1OaHFzbjgxVDZrMHF0SkY2WkltOHdMa3JGUGdDZEpHdWZqWjFjMmZVTVNYbmR2TEMySDFxbmlJWHZjZlJZanlVaVY3Qzg4bWRJR1hITnZiYzY3OTFVelJybFdOMW54SHExeEpWVGs1WjhqTWEwNUt1c1ZYRTZfWEwxQVpfZ2PSAeQCQVVfeXFMTVdkOU5IRjVLQVRKUWhZLXpkcnBJQVo2RVg4NEZmOEY4ZUZYNHRxbDZILVQ1emRZTm9qWUtuX0JFdFRvRW53Rk9DbmJaRmpiZ1lHSGtrbEk2aGk4QVRpU2sweDVLLU1walBwQXYwY1htZF9lZndRZTZPNWctaEltV254UTBzRlBMSDhOOGZPRUdYYnJWdFJZVEZzMXAzNWxHNTZlQVFRaTVpSDFlZ2hhdGNUTEVrazBmRTR2RjhtVkQ0ZHVIMmlaaWgtT25XZVNRYWczeF96ZGhTc0dCWVQ5WTFPWEZUVFRIc2FPVUtzNG5pSldtMXNvaG1ZNWUwZ0RIejhieUFhZnNFRnlzbEwwaHowaThYZzJ0SVBuUDhVVVQ3bnBBLTZ0RDJPX2VPNzlVSjhlaWh2UTg4eGVSTVIwbVIzUVBGWGVkVFVzNWFJTnVmSHVIMVltYk82YXJEenJnWFFNaE8?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-024",
          "title_clean": "手搖優惠大戰！迷客夏11元開喝、拾汣茶屋祭99元殺紅眼",
          "publisher_name": "中天新聞網",
          "published_at": "2026-11-09 20:16:49",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE1VOVJTbk43Y011SWRJbmtDS3dFR2RBb29GMnZCWkhMX2U0WUM4aHJITDJucG9nRkI3YWJEc0FQZUZUem1Mb0tyVlFQZGlYUnV6Ym13?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-027",
          "title_clean": "雙11開喝！翰林、日出茶太、迷客夏優惠一次看　UG一撕開看告五人演唱會",
          "publisher_name": "三立新聞網SETN.com",
          "published_at": "2026-11-09 17:47:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiSEFVX3lxTE13VlZIOWxGTkF6SWttZnZKQ3V1ZEZ1OFlwaTI5SElYOHhpSmY0ZlFXZ1NWR2lVaW5fSlY5SjN6X3luV0NlY2xRTdIBTEFVX3lxTE5XcHoxclRVNFhjV2tFT3hXVlNVNWNfeks5bTNqbElyOGd2N3RiU0NwaEE2YzEzTVM1US1LSWZzdHR4SXdMNUljRVM5WEc?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-045",
          "title_clean": "今起飆高溫！手搖飲推買1送1、珍奶40元 皮克敏限定花苗開搶",
          "publisher_name": "壹蘋新聞網",
          "published_at": "2026-11-04 09:46:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMifkFVX3lxTE1JeHVRajM3TDBzWXlzY3JxdVVmSVNPR2ZRc0lodUlWalVUTUZkTXNJWWhFemtYeVlkRmRCWGd6VjZYOTRXcDRFQmZSekVhSVFhaG1Gc0Y3SU5tUmNEd3lsakhHaDA5UVF5Q0Z1cU95bUNpWkZGNjIwM0R0VHZBdw?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-046",
          "title_clean": "清心福全、CoCo買一送一！11月「手搖飲優惠」６間，麻古現折80元",
          "publisher_name": "食尚玩家",
          "published_at": "2026-11-03 16:00:43",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTFB2QWRhNGlLZGVEckhOM3BGTW1QQnI2S252TC05TUwzVW9TTkhGM3EwUGx1dzZtdFpOUldFcW05SDBsV1ZVN0VGWVhRM1NsTi1XOG9KdQ?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、清心福全）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-047",
          "title_clean": "手搖飲買1送1來了！茉香凍奶綠2杯60元 優惠一次看",
          "publisher_name": "中時新聞網",
          "published_at": "2026-11-03 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMibkFVX3lxTE42SzdwQXRybms5eWRyQlAtOHZuUEExTlhFQ1psdEc1NEs0SWdzVWFBZWd0aXVxT1RKZnZZRlI3R0JDQ0lYeUFfOXQtNzBJTWRFUUJNYU5HT2xGNUdyaUVuQWIwMENEa2RiTnk4ejZn?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-051",
          "title_clean": "「胖妃」殺進手搖飲！甄嬛傳聯名大苑子、CoCo迎皮克敏",
          "publisher_name": "中天新聞網",
          "published_at": "2026-11-02 16:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE5DQ0ZQZWFQMFhoYU5qM1hoVGlzNS1UaTd4N2tLVXVibHJVRW5FOUFiN1U5dXpxM0VvbFQzR0ZHVGNBZ0NCSHd0UWNHalJJbEM2d3RN?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、大苑子）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-059",
          "title_clean": "手搖飲萬聖節優惠　TEA TOP免費加料、CoCo買1送1",
          "publisher_name": "ETtoday旅遊雲",
          "published_at": "2026-10-31 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE44NlhpMGh3TEpLdW9ob0MtcmxSMFNvNWozbHB5b2hDMi0yaWRjSjlxUVZ2bzNUYm5SdF9WNENjNXV4d0wxbkZBZ0FXaXBQR21ZeXJxWmtYSGJhQdIBT0FVX3lxTE03RGdQUk92by1PNG5uYlhtNkdPTkdSOER1alp5bFFtNGU1QURTT3huWmxURzdDNTVWWUstbDhWVUtEMm5SZGFnVzBiRVJyLTA?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-064",
          "title_clean": "巧克力控開喝！CoCo可可珍奶２杯85元、茶湯會３款可可拿鐵限時優惠",
          "publisher_name": "食尚玩家",
          "published_at": "2026-10-29 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE9rUUtsaXd3bkVhSVlaZTU3cjB1Zk5na2ZHNUpjNmtpNW1vZVNXbWZWbzNiWGx2Y3c1Znh3OWlIeDhYNUhDOHRCeWFhMElfVmQ5YUMtZQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、茶湯會）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-082",
          "title_clean": "本週手搖３大優惠！CoCo買一送一、鶴茶樓免費喝，大苑子送府城鑰匙圈",
          "publisher_name": "食尚玩家",
          "published_at": "2026-10-19 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE5QUFhsaTdZNTByeGl6eTllWmdQWG1Ca2ktUmRBN2NObzZUVHV1bEZqT25FVVFhVW1kekZHVmxTSVJSaXVoY1llNUlRNUVSN1hHdV9OUA?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、鶴茶樓、大苑子）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-085",
          "title_clean": "【10/12-10/18本週全台優惠】超商咖啡優惠、手搖飲、天丼買1送1一次看",
          "publisher_name": "Cosmopolitan",
          "published_at": "2026-10-17 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxQQUppVTRlVFBTUUFDRHdhYnVlTlNOYzk1WlNpbU10RzJ4dHBPWVBBaVIwUWwwdG93ejhoTWJCRVVGRDVEQld0bmV3Tk9OMkJwVUpfb1Z3d1F2bFFRVnBNNUUzSmFucXJEcWNyRG41NXVXYTJYSlR6YUtBOXhhWGpMZEYtTERVUHdRSHNzSg?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-090",
          "title_clean": "限時買一送一來了！CoCo/星巴克/85℃/麻古10 月優惠一次看",
          "publisher_name": "風傳媒",
          "published_at": "2026-10-14 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTFBtUGJybUNCTnJNb3dsbUNqazR3VVo4YlctaHdzUmRwNDZzSXJ5UjFUUkljT3o3VmRkZEIxYXdjLWFMQXczem9aWE5nQU1uMjQy?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、星巴克）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        }
      ],
      "source_count": 21,
      "unique_publishers": [
        "COOL-STYLE 潮流生活網",
        "Cosmopolitan",
        "ETtoday旅遊雲",
        "Marie Claire 美麗佳人",
        "NOWnews今日新聞",
        "TVBS新聞網",
        "udn",
        "三立新聞網SETN.com",
        "上報Up Media",
        "中天新聞網",
        "中時新聞網",
        "壹蘋新聞網",
        "風傳媒",
        "食尚玩家"
      ],
      "unique_publisher_count": 14
    },
    {
      "event_id": "EVT-ROUNDUP-MULTI-NEW-PROMO",
      "brand_label": "跨品牌合集（新品暨促銷盤點）",
      "event_title": "【多品牌新品＋促銷合集】10～11月跨品牌新品上市與買一送一／聯名同步盤點報導（單篇同時報導 2 家以上品牌動態）",
      "event_categories": [
        "合集",
        "新品",
        "促銷"
      ],
      "is_merged_event": true,
      "merge_basis": "單篇報導同時彙整 2 家（含）以上品牌之新品上市與買一送一／抽獎促銷（例如同時報導 CoCo＋茶湯會可可季、或同時報導 UG＋迷客夏等），歸類為跨品牌合集。",
      "source_records": [
        {
          "evidence_id": "GNEWS-019",
          "title_clean": "買飲料竟能抽演唱會門票！UG告五人限定杯登場，迷客夏11元加購紅茶",
          "publisher_name": "食尚玩家",
          "published_at": "2026-11-10 10:11:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1LOERyZnRHcmNRZFdEbFRzeG5leFFzb1JRTXFVNWVDMEVBOFFBZGRQc1VHbEdiYTNVMFltbG94NGhRdXNmVTU3bXp6NkZxd3hBT1Bzdw?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-026",
          "title_clean": "UG一撕免費看告五人演唱會　迷客夏新品曝",
          "publisher_name": "鏡週刊Mirror Media",
          "published_at": "2026-11-09 17:47:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5Xc1hzTDV0SVZZTXlXanVUdXNLR2hFVGdZOFdNU096b3NhNjdqYkk4WmtKblBtbWk4NG9KaHQxWXF3Q2VRNlZCVUJKS2tBalUtX3dHOWRKMG5iRHQ00gFiQVVfeXFMTnpnYjROYnNvSU80QTJaT0FrTjVZSXZkX1RXeVVZNDZKRGM3Ylc5UkVfeGVQQXNSZ0NqMm43Z2NpYlFRcVJYaVlZRy00d1AwbnFUMm5MVWUxbUZjVHZCcHB4dUE?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "迷客夏",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-060",
          "title_clean": "CoCo、茶湯會推巧克力新品優惠！可可甜心2杯85元、茶韻可可系列享限時折扣｜熱門話題",
          "publisher_name": "網路溫度計 DailyView",
          "published_at": "2026-10-31 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE5WRzdSZXlxN1Btb0JFa0RoS2ZFa0FMSVhuQmMwb2F5Qm1RQXdHQlNYRS1JZ2UzUklGX3pXUExsZHRsQ19hYmlGNU56QmZqMFdMZzZZ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、茶湯會）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-065",
          "title_clean": "巧克力控暴動！ CoCo、茶湯會、必勝客「可可新品系列」手搖與邪惡甜點一次看，這款還有買一送一",
          "publisher_name": "UDN",
          "published_at": "2026-10-29 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE0wYUtrMXhfTXlPTFBWN3NVMXEwb3hYOGVUSUdQc2lYVGVXMFYzaGpYVzdNYU10U2ltbVNLZVBMLTBCOFc1ZkdaaUYtbEhGd2kyMjFBWjU0U1B3aFZN?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、茶湯會）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-067",
          "title_clean": "手搖飲買一送一爽喝CoCo！春水堂滿額免費喝珍奶、金馬聯名周邊登場",
          "publisher_name": "玩咖Playing",
          "published_at": "2026-10-28 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE02dWFmY3dNQ2JNeFNmb2RGYXhEdk93eTFBRVZxUkpVYkc1cE4zUC1Bbkw2bnRlekNfZ3RZWnl5UDdvc1h5WG5lc3RvV0pqTktlelE?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、春水堂）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-079",
          "title_clean": "大茗萬聖節推「榴槤冰淇淋」新品限時79折 CoCo「葡萄柚果粒茶」買1送1",
          "publisher_name": "UDN",
          "published_at": "2026-10-21 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1HNVVkSWJSOXBLVlZRVlpSZVZTTVZKX3VjZmE0LTI1cDBoaFJ4Njh6WkZORzJxZGJkWlNFQjdiS1gwZXNZRnRPX0NHeVg2Ync4bjJ5UWpmMDdoMzJY?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、大茗）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-080",
          "title_clean": "手搖飲買一送一爽喝CoCo！麻古茶坊巨峰葡萄回歸、珍煮丹推蕎麥新品",
          "publisher_name": "玩咖Playing",
          "published_at": "2026-10-20 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5MU2w1WFJEVmJjWE55RXNpQ2pBTGpESDJiN1Zwa3A2VTJqRmdzTnU0MmVHajhaWm1DdzhZRTBLMHhHSGtGY0VLd2hrbEVISm9pVHc?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、珍煮丹）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-081",
          "title_clean": "珍煮丹開賣「蕎麥系列」3新品　CoCo葡萄柚果粒茶明買1送1",
          "publisher_name": "ETtoday旅遊雲",
          "published_at": "2026-10-20 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFB3RHR0aXJnY3VkMEFkdjg3R3U2b1dvUE00MTUxTFNHV2tOeGFCaWk2UGRvekVDTzYtOEVMQUFWR0pCME5RbDNKd2w0cVQ5dmtocVAzaUdkRFE2Z9IBT0FVX3lxTE9jdHZhaHBZVUJLRnZyRTRIZm9INWYyV3BrdDh5LTRzM3F0RDEzXzNZWEdXR3UwbzJDamFXejg1eG4xWEhHYzNOQzJmVXZVSHc?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、珍煮丹）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-086",
          "title_clean": "鶴茶樓、CoCo買一送一！大苑子2新品台南限定 手搖優惠快看",
          "publisher_name": "TVBS新聞網",
          "published_at": "2026-10-17 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTFBzMTdMRERsMWFXeGtPYTBaNklNSWF3cDJUblhwbWJsU1RURV90LWVQb21WWlVPR2xraVF4LUhzaWdwSHVOMDlEUjU5eHdNQQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、鶴茶樓、大苑子）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-087",
          "title_clean": "不只鶴茶樓、COCO！手搖飲週末買一送一優惠來了， 最新十月新品總整理一次看",
          "publisher_name": "風傳媒",
          "published_at": "2026-10-16 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTE5DbTBNVzlCRXA2SmVQcWpESGVCUy12T1BmY1d3aUplNkVXMnZwa1kwQ1RJM05UbXR2aGV5Rmx2RnhrdDFmSndIdjkyRWxkZWk3?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "鶴茶樓",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-088",
          "title_clean": "鶴茶樓、CoCo都可「買1送1、免費喝」！ 大苑子2新品台南才喝得到",
          "publisher_name": "Yahoo新聞",
          "published_at": "2026-10-16 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMi3gJBVV95cUxQdjVadUtZMWZnQ3RkTXNVc1lYa0RZM05hVHMwMmJWVnVQZ1Jia3JYa0lfcUlTRGJqWFR2RjJjalowRWhwMkNWZmhNeDlYTGp1bzIyTHByVEJ5ZUNDXzFfaXB4VW5JVjk2MUJRSjdJVm92cG1HZXI4Rm1ycmlWZzh6RlRaRGpvU1RUd3A0OUtkWDN1OVFQVEFZeFhlR1JXY0FSdTB6andOalc0SXFiNk9EUjRRNHFSdFNndzI0Q2RtUVQyQzNGS3dySUhmaC1wS1FRa0M1ekxlWmV4eDJtX25IdG15bVBtY0FIOTRZVUYyeUxVR1Y0QnZjRk5jOW00VHduNFNMcjFNb2JHNTVMUHVZRGlFME9EZmE3TURwdHpBSERpa2JUMTJfOWk5V0NMYlNqdlpLMDdscWlOVERKcS1aTFNIcklRcThSRXZiV1FQOTFqS3Y4R1hVNnA3d1kxUQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、鶴茶樓、大苑子）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-089",
          "title_clean": "買一送一！10月最新手搖優惠：50嵐、大茗、UG、大苑子、鶴茶樓都有，再睡五分鐘推新品",
          "publisher_name": "BEAUTY美人圈",
          "published_at": "2026-10-16 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9vMUkyckJvTkg3VjgtLXlZZ2hDWXR4ZTIzazNWSmxFR2JfWjFhalJaQktjZl9HSFRnd0hqN2JaUDN6RTJ4VlVyOUppMHXSAVJBVV95cUxQaWxpQ0U4aEFLbDVjTGVOelJXcW5TRFpEWWVMNUQ1Z2oyZEs3SGhmWFNxYVB3c2ZJZWJqT3dTU3JYU1VEQ0dPTHAxc0NQWmlBUDZn?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（大茗、鶴茶樓、大苑子）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-091",
          "title_clean": "手搖飲買1送1！萬聖節新品開賣 1招可現折20元",
          "publisher_name": "壹蘋新聞網",
          "published_at": "2026-10-14 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMifkFVX3lxTE1EUUVEdWdtRmtDWDl4YUc5WDNNSGhfVjl0dkxyNDZ3ZHgyVVdOOEFBbWgzeHhCQlZPMUs1ZHVFbzhweFUtclp4UTVVLXNycnFjNlpqbDJLNklKS3hvZW9EWDByZ01sdTFtMGhRZy12OEFpNC1GOGxQeXNFTU9sQQ?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-092",
          "title_clean": "CoCo買一送一！粉角奶茶30元　麻古「巨峰葡萄」萬聖節紙杯明開賣",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-10-14 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9KSGlVclJhNW82cFZSZ2N4UWlIVDNRVVRwLVdkbVpzYUlVcjc1VENnakd3b0xld1g3QWtuNGZnVkFvRXM3WXcxRHFuQUPSAVJBVV95cUxQVDQ0eXFjZjFiYkZINmdRMHl2ampiNEJJOHEtS1gzc29uaUdxUUttWWhTSG1SLUszVHViZ2Z0bUl1bHk0T2FHTHNZd3FNOFNDZGRB?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、麻古茶坊）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-093",
          "title_clean": "手搖店竟然賣茶葉蛋！ 鶴茶樓限定門市開賣、烏龍茶買一送一，CoCo優惠跟上",
          "publisher_name": "食尚玩家",
          "published_at": "2026-10-13 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiVEFVX3lxTE1sVDNkQUJIM0x6UVdiWlZZMzBRUEplMnFBSkY0djRvOHlRSHdHRks4S1laVlBsTFowMmlseVhDWVNCU1gtSEM1WkYxdzU5VUdoZFFPNA?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（CoCo都可、鶴茶樓）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-094",
          "title_clean": "秋天涼涼喝新品！麻古、鶴茶樓攜新品登場 CoCo都可買1送1",
          "publisher_name": "中天新聞網",
          "published_at": "2026-10-13 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiU0FVX3lxTE1icFZEenNuZExPR2YyVUlxT1lRVUJmUUJDeTNDeXJZYUNad1R3NnI4T3JVNFotUXBUbFFyMlFZbzBGZXRPNGZvMzBLRE5Pc3ZBS1k4?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（CoCo都可、麻古茶坊、鶴茶樓）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        }
      ],
      "source_count": 16,
      "unique_publishers": [
        "BEAUTY美人圈",
        "ETtoday旅遊雲",
        "NOWnews今日新聞",
        "TVBS新聞網",
        "UDN",
        "Yahoo新聞",
        "中天新聞網",
        "壹蘋新聞網",
        "玩咖Playing",
        "網路溫度計 DailyView",
        "鏡週刊Mirror Media",
        "風傳媒",
        "食尚玩家"
      ],
      "unique_publisher_count": 13
    },
    {
      "event_id": "EVT-ROUNDUP-MULTI-NEW",
      "brand_label": "跨品牌合集（媒體新品盤點）",
      "event_title": "【多品牌新品合集】秋冬／10～11月各家手搖飲新品盤點與推薦懶人包（單篇涵蓋多品牌如迷客夏、麻古、珍煮丹、五桐號、可不可、UG等）",
      "event_categories": [
        "合集",
        "新品"
      ],
      "is_merged_event": true,
      "merge_basis": "標題同時涵蓋多個品牌之秋冬新品盤點懶人包（合集），歸入「合集（新品）」並保留全部原始來源，不拆算為單一品牌獨立口碑。",
      "source_records": [
        {
          "evidence_id": "GNEWS-042",
          "title_clean": "手搖飲新品！阿檸推琥珀珍珠鮮乳茶、清心福全攜咖波推限量周邊",
          "publisher_name": "Yahoo新聞",
          "published_at": "2026-11-05 06:30:32",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMimgNBVV95cUxNbzYtNFZYN2QzYk0zVHVXcVExOVhHcHJnWWJmeTVVTVgxSXNvekctWGxCZGc2X3RGR1JaRkczTmxvbDl2MHBZYUlfa21PLWtFeDhzdzRqczlwX1l4UjNBSngyWHViMVlJaHJ4bzRScmVGOWRxR1NXNlZUaVlLRjVhVl8wNnUzRldjOFZzcmktWjZrZko0a0hFX0RJdmhMREtrRFJ4cG82TU9OVXpOUjZaYmFDdnF6SEhRN1FVMmphX0Q1cTI1QVZLZ1VWa1ZGLUlVSVFkWXVtUEd2WjJ2RElUdEdFVDd5VTh3QzlrNFp3c3pfSXJkcWIyNWlNV0U0S0dEWWc3X1RIOE9WNUVNcllLeGVxYnpXdzI5anMzcUpkNW9sOU5ZV1dRNFp6eU1sSF8wUXM2NFk1Ti02VWZHaWYzR2I4cFJGS0gwZjVZN3ZxOWEyRmtrbXFObm1VVFFUelExZzRDT2J5Qi1RbktWaU9wTXloa0o1czAtTy1zeGZ3QkpVU0xNaEQ4bTdvVkxQWk95MWNGZGUxa0ZjZw?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "清心福全",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        },
        {
          "evidence_id": "GNEWS-072",
          "title_clean": "手搖飲秋季新品！迷客夏糖燻奶霜、珍煮丹蕎麥系列登場",
          "publisher_name": "Yahoo新聞",
          "published_at": "2026-10-27 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMi6gJBVV95cUxOamNqSDdpLUVZU256VjJIZV9jbU5uLTlwdVZjd2pJNUhBNXVpb2xpem1CeUt1WnlvbDU3YVMwT2x1enRVbjVmWU5BOTdZNmFXclNsS1BVRjM2STlIMWVSbTBfWVJaano0c2NFU244TEYtMC1YeDIyRVd2MlcyQTZzalRKdklyRDgwa0dWODJ2ZEhzTlhHTkVRODk4WTNvQkFrdFVDNTgwTjNUdmhEZG0xRkVxQjlvd2dSY0J3cjEtWjZ5T3RpamV6TXNQeG85eG9aUXBLVDJZdGlqRDdEZ2NScDl4ZDZmTW9ybHNuMl9qci1NU1NmVjVuU2hfdS1penV2N3NoT251RUY0NWx1dVNCYjY2eVRnaEdhdWF1QkZMa2lPYnY5cHQwM1hmZzJxWmlBWjlCVkYtUWw1OS11VVYxbC1XMURMMDFaMmhTeTViS2xxZ2dRM3ZlclEtcGk0cjRMX0s5WjFIZFFvZw?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "多品牌提及（迷客夏、珍煮丹）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-075",
          "title_clean": "2026秋季手搖新品懶人包！五桐號泰奶雪沙、可不可紅烏龍茶王，11家必喝推薦一次看",
          "publisher_name": "Niusnews妞新聞",
          "published_at": "2026-10-23 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiS0FVX3lxTE5BeGtKb19BWjd0RF9OVmJQNF8zSnhNU2dBdVZGeDUwZ1o2SzFZSU5URVhGUmdFN2JMODZRbWE0enVuaDJZYUJGa1MzSQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "多品牌提及（五桐號、可不可）",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        },
        {
          "evidence_id": "GNEWS-095",
          "title_clean": "9大手搖新品！麻古茶坊「巨峰葡萄系列」、UG「檸檬冰奶」",
          "publisher_name": "造咖",
          "published_at": "2026-10-13 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiV0FVX3lxTE8wcTdOaHF4ZFQ2czJqaldJREpxZ1hnbVpMMGZsSmU2Y053d2hHdTVRLV9QaWk1RElnZS1odC1lXzR1ZHF5dVFOdVprN0Y5aGwwLXVKcDAxVQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "麻古茶坊",
          "candidate_product_name": "待確認（標題提及多品牌或多品項／促銷活動）",
          "parse_status": "多商品或合集報導"
        }
      ],
      "source_count": 4,
      "unique_publishers": [
        "Niusnews妞新聞",
        "Yahoo新聞",
        "造咖"
      ],
      "unique_publisher_count": 3
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-016",
      "brand_label": "非單一手搖品牌／跨通路新聞（待單篇核對）",
      "event_title": "【單篇獨立保留（未強制合併）】全家皮克敏聯名開跑！7款「零食皮克敏」金色花苗、特殊地點與加碼攻略",
      "event_categories": [
        "促銷"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-016",
          "title_clean": "全家皮克敏聯名開跑！7款「零食皮克敏」金色花苗、特殊地點與加碼攻略",
          "publisher_name": "TVBS新聞網",
          "published_at": "2026-11-10 12:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTkFVX3lxTE9acHNBbW92VkFBTVJpMzhkd085ak9nNHgyWEpJQmFIYTE2akYtbDlIQ0ZGZF8yMVRvbENxcEFzdHhJdUpUbW9tckFQNmw3UQ?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "TVBS新聞網"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-022",
      "brand_label": "非單一手搖品牌／跨通路新聞（待單篇核對）",
      "event_title": "【單篇獨立保留（未強制合併）】皮克敏全家聯名11/10登場！7款五週年零食飾品怎麼拿？3個「特殊地點」藏限時驚喜",
      "event_categories": [
        "新品",
        "促銷"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-022",
          "title_clean": "皮克敏全家聯名11/10登場！7款五週年零食飾品怎麼拿？3個「特殊地點」藏限時驚喜",
          "publisher_name": "城市學",
          "published_at": "2026-11-09 23:04:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiT0FVX3lxTE5OQThxdkRDNW02dlhvSHNqZ20xTjMyeEZRdXBFZVVyaUMtdHlfU1pPOVpCQ1FvY0d0SU1rSmpsTjRabFhPMFdLREh0WmtxS1U?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "城市學"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-029",
      "brand_label": "非單一手搖品牌／跨通路新聞（待單篇核對）",
      "event_title": "【單篇獨立保留（未強制合併）】皮克敏聯名全家便利商店！「5週年紀念零食飾品皮克敏」限時登場，送金色花苗＋明信片，領取限制一次看",
      "event_categories": [
        "新品",
        "促銷"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-029",
          "title_clean": "皮克敏聯名全家便利商店！「5週年紀念零食飾品皮克敏」限時登場，送金色花苗＋明信片，領取限制一次看",
          "publisher_name": "Cosmopolitan",
          "published_at": "2026-11-09 16:52:53",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQZTljOFI5Q19aZG1ZYXk0UklhZ1V0d0NrRzNGS0hGU0NFeDhHQlY4dlpZWHZHZFRaU2c5RTRNcm9sYlVrdEZ2ekIzdk83TDRnZFFUbTlXMlZBYXlMc1ZYMXdGM2R5Z3RPLWpzRnh0eFJQdnNDWGJJNVlMOGtpcmdfdXFsbjJPRVZEdjl1Qmx1RkpRb09NYkdzN0JIbEc4T3R3X2x2b0FGX3pzTUdC?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "Cosmopolitan"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-041",
      "brand_label": "龜記茗品",
      "event_title": "【單篇獨立保留（未強制合併）】【Threads上紅什麼】龜記手搖飲竟然變沐浴乳！沙威隆聯名「蘋果紅萱、三十三茶王」，連洗澡都能聞到熟悉茶香",
      "event_categories": [
        "促銷"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-041",
          "title_clean": "【Threads上紅什麼】龜記手搖飲竟然變沐浴乳！沙威隆聯名「蘋果紅萱、三十三茶王」，連洗澡都能聞到熟悉茶香",
          "publisher_name": "Marie Claire 美麗佳人",
          "published_at": "2026-11-05 16:15:20",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE9PY0ltRnhWSWExUC0wNUdGOEtNbmVPcVNzMGVHMHZQQUZZMmJzTlBDOXo2X0hPalEwRjVvcnNaWU9aZkgzWVNMT3dHdkQxdW1CdGJneTFYNUlQV3hTcE1TTFFUb2RjSXQxb2c?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "龜記",
          "candidate_product_name": "待確認候選：蘋果紅萱、三十三茶王（取自標題引號，需核對內文）",
          "parse_status": "單一候選待確認"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "Marie Claire 美麗佳人"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-061",
      "brand_label": "CoCo都可",
      "event_title": "【單篇獨立保留（未強制合併）】2026 CoCo 都可菜單推薦！網評必喝Top10、最新菜單＆價格一次看",
      "event_categories": [
        "其他／待單篇核對"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-061",
          "title_clean": "2026 CoCo 都可菜單推薦！網評必喝Top10、最新菜單＆價格一次看",
          "publisher_name": "BEAUTY美人圈",
          "published_at": "2026-10-30 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTFA3amd0R0FrVjJPNVNkYTNVSUNKV1hrTmEyNmFZdjNDNkVrOF80NktTMmVJQmdjTDhOSUpXdmJDX29mVmR0VXZmcG1IWlLSAVJBVV95cUxQRFFBZmhmNGZxOUVXZW16S2lIWkE1UkFobFpEUEVLQmk5YlluVExsdlJJcWxYdjlqcFlJbEM3WFlENS03VmFpck1CV3dybzQtZDJB?oc=5",
          "query_id": "Q2_TW_BRANDS",
          "brand_detected": "CoCo都可",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "BEAUTY美人圈"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-066",
      "brand_label": "非單一手搖品牌／跨通路新聞（待單篇核對）",
      "event_title": "【單篇獨立保留（未強制合併）】佳釀玩聯名名車手搖飲碰撞新意- 時尚消費- 中國時報",
      "event_categories": [
        "促銷"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-066",
          "title_clean": "佳釀玩聯名名車手搖飲碰撞新意- 時尚消費- 中國時報",
          "publisher_name": "中時新聞網",
          "published_at": "2026-10-29 04:11:12",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMia0FVX3lxTFBLakRZeXFHdHVmbWpSemtjbGpsTDZlTFg0d1dzaWtlbFBLN3JNbTVFdG15RWEyZC0yX3FBWFNDT3dDWkdEbnk5OVBYaW9LcjNYQmxXZnYtQ2ZKUjNBQkNQUGRfRm53OUZzSTJ3?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "中時新聞網"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-068",
      "brand_label": "非單一手搖品牌／跨通路新聞（待單篇核對）",
      "event_title": "【單篇獨立保留（未強制合併）】金馬聯名手搖飲周邊商品吸睛- 時尚消費- 中國時報",
      "event_categories": [
        "促銷"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-068",
          "title_clean": "金馬聯名手搖飲周邊商品吸睛- 時尚消費- 中國時報",
          "publisher_name": "中時新聞網",
          "published_at": "2026-10-28 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMia0FVX3lxTE5HV2VUUDgwUlZVMEJJd040TzYtUGo5cEp2X3NmdXltYzduZkU5Z1VKWWowaVloa3dPWGpiWDh2X2R0M1g0MVpGOEdqdWVpVFpvYlZMSF91QThfTHZwbGpTeXAtMkpSSW1yUDZJ?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "中時新聞網"
      ],
      "unique_publisher_count": 1
    },
    {
      "event_id": "EVT-INDEPENDENT-GNEWS-076",
      "brand_label": "季緣",
      "event_title": "【單篇獨立保留（未強制合併）】季緣買一送一！10/27起連喝4天手搖飲料優惠　葡萄青韻新品開喝",
      "event_categories": [
        "新品",
        "促銷"
      ],
      "is_merged_event": false,
      "merge_basis": "依驗收規範「無法確認同源的內容，不要強制合併」，此篇與其他手搖飲新品事件不同源（或屬單篇獨立題材），保留為獨立單篇事件。",
      "source_records": [
        {
          "evidence_id": "GNEWS-076",
          "title_clean": "季緣買一送一！10/27起連喝4天手搖飲料優惠　葡萄青韻新品開喝",
          "publisher_name": "NOWnews今日新聞",
          "published_at": "2026-10-22 15:00:00",
          "captured_at": "2026-11-12 11:32:12",
          "rss_link": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE9pZ3ZSUDVpQWV1em9oUVVNbVIzVDZWb3FTZkxGUDRqUC14UU50YWVCQjBSV3c0YlphUV9JZ01hbmY5N1paWTRMN2ZuWVjSAVJBVV95cUxQV21YazVYWkptVjBCandRdGtocEJnQjJHakNuWC1RZFZvaW5zWURubnBmeXVnbWFWdjBGdERnQzE4YkU0SGhUeW5uMkt2OG9ubDRB?oc=5",
          "query_id": "Q1_TW_BEVERAGE_NEW",
          "brand_detected": "待確認品牌",
          "candidate_product_name": "待確認（標題未含明確單一品名，需開啟原文核對）",
          "parse_status": "品名未明"
        }
      ],
      "source_count": 1,
      "unique_publishers": [
        "NOWnews今日新聞"
      ],
      "unique_publisher_count": 1
    }
  ]
};

const verifiedPttData = {
  "collection_metadata": {
    "source_type": "PTT 批踢踢實業坊 — 飲料板 (Drink) 網頁端到端實測採集",
    "board_url": "https://www.ptt.cc/bbs/Drink/index.html",
    "prev_page_url": null,
    "executed_at": "2026-11-12T11:54:46+08:00",
    "total_articles_collected": 14,
    "total_pushes_collected": 79,
    "separation_rule": "每篇文章嚴格拆分為 raw_original（原文內容：標題、作者、發布時間、擷取時間、內文、推噓文）與 programmatic_analysis（程式分析結果：文章分類、品牌關鍵字命中），絕不混寫。",
    "search_logs": [
      {
        "keyword": "迷客夏",
        "search_url": "https://www.ptt.cc/bbs/Drink/search?q=%E8%BF%B7%E5%AE%A2%E5%A4%8F",
        "total_entries_on_first_page": 20,
        "top_3_Latest_titles_found": [
          {
            "title": "[贈送] 迷客夏 10元折價券五張（已送出）",
            "date": "8/05",
            "url": "https://www.ptt.cc/bbs/Drink/M.1785908962.A.C9D.html"
          },
          {
            "title": "[討論] 迷客夏九折優惠",
            "date": "4/29",
            "url": "https://www.ptt.cc/bbs/Drink/M.1777394077.A.184.html"
          },
          {
            "title": "[心得] 迷客夏台味海鹽檸檬可樂、可樂拿鐵",
            "date": "6/06",
            "url": "https://www.ptt.cc/bbs/Drink/M.1749188049.A.3C9.html"
          }
        ]
      },
      {
        "keyword": "CoCo",
        "search_url": "https://www.ptt.cc/bbs/Drink/search?q=CoCo",
        "total_entries_on_first_page": 20,
        "top_3_Latest_titles_found": [
          {
            "title": "[心得] coco茉香凍奶綠",
            "date": "7/20",
            "url": "https://www.ptt.cc/bbs/Drink/M.1784535385.A.A41.html"
          },
          {
            "title": "[心得] Coco/麻古/全家Let's Tea",
            "date": "12/09",
            "url": "https://www.ptt.cc/bbs/Drink/M.1765240811.A.E5F.html"
          },
          {
            "title": "[心得] coco28茉輕乳茶",
            "date": "9/15",
            "url": "https://www.ptt.cc/bbs/Drink/M.1757918139.A.091.html"
          }
        ]
      },
      {
        "keyword": "龜記",
        "search_url": "https://www.ptt.cc/bbs/Drink/search?q=%E9%BE%9C%E8%A8%98",
        "total_entries_on_first_page": 20,
        "top_3_Latest_titles_found": [
          {
            "title": "[心得] 龜記 雷夢蘆薈蜜",
            "date": "7/08",
            "url": "https://www.ptt.cc/bbs/Drink/M.1783503899.A.E08.html"
          },
          {
            "title": "Re: [問題] 龜記 紅柚翡翠",
            "date": "4/20",
            "url": "https://www.ptt.cc/bbs/Drink/M.1776673240.A.487.html"
          },
          {
            "title": "[心得] 龜記七龍珠聯名星桃樂翡翠",
            "date": "7/21",
            "url": "https://www.ptt.cc/bbs/Drink/M.1753066551.A.A5A.html"
          }
        ]
      },
      {
        "keyword": "麻古",
        "search_url": "https://www.ptt.cc/bbs/Drink/search?q=%E9%BA%BB%E5%8F%A4",
        "total_entries_on_first_page": 20,
        "top_3_Latest_titles_found": [
          {
            "title": "[心得] Coco/麻古/全家Let's Tea",
            "date": "12/09",
            "url": "https://www.ptt.cc/bbs/Drink/M.1765240811.A.E5F.html"
          },
          {
            "title": "[心得] 初韻/大茗/麻古酪梨品項評比",
            "date": "8/20",
            "url": "https://www.ptt.cc/bbs/Drink/M.1755674756.A.7AB.html"
          },
          {
            "title": "[問題] 芒果飲品推薦 (麻古、COCO、迷克夏、大苑",
            "date": "6/23",
            "url": "https://www.ptt.cc/bbs/Drink/M.1750652882.A.888.html"
          }
        ]
      },
      {
        "keyword": "大茗",
        "search_url": "https://www.ptt.cc/bbs/Drink/search?q=%E5%A4%A7%E8%8C%97",
        "total_entries_on_first_page": 8,
        "top_3_Latest_titles_found": [
          {
            "title": "[討論] 大茗草莓系飲料喝過嗎",
            "date": "1/08",
            "url": "https://www.ptt.cc/bbs/Drink/M.1767852749.A.20C.html"
          },
          {
            "title": "[心得] 初韻/大茗/麻古酪梨品項評比",
            "date": "8/20",
            "url": "https://www.ptt.cc/bbs/Drink/M.1755674756.A.7AB.html"
          },
          {
            "title": "[心得] 大茗酪梨奶蓋紅玉",
            "date": "5/05",
            "url": "https://www.ptt.cc/bbs/Drink/M.1746418300.A.559.html"
          }
        ]
      }
    ]
  },
  "articles": [
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1787131445.A.AF2.html",
      "discovered_via": "PTT Drink 板最新列表頁 (index.html)",
      "raw_original": {
        "title": "[心得] 御私藏Cozy Tea 蜜奶粿鮮奶茶",
        "author": "Carolcc (卡卡)",
        "board": "Drink",
        "published_at": "Wed Aug 19 17:24:03 2026",
        "captured_at": "2026-11-12T11:54:38+08:00",
        "body_text": "每次經過北車都看到很多人\n決定點點看他們的招牌蜜奶粿\n奶類品項蠻多的 原本想說直接點蜜奶粿奶茶\n結果店員有問要不要換鮮奶就換了\n甜度我是點無糖少冰 因為蜜奶粿本身就有加蜂蜜怕太甜\n份量加的很多 吸到後來飲料先沒了\n吃起來軟>Q的感覺 蜂蜜味不重淡淡香氣跟奶香\n覺得鮮奶茶無糖多少還是有點稀稀的 下次會點一分糖試試看",
        "push_counts": {
          "推": 2,
          "噓": 0,
          "→": 0
        },
        "total_push_entries": 2,
        "pushes": [
          {
            "tag": "推",
            "userid": "fishinging",
            "content": "請問北車哪裡有櫃？",
            "ipdatetime": "08/27 14:00"
          },
          {
            "tag": "推",
            "userid": "jessielle",
            "content": "回樓上，店面在靠近捷運M3出口的地下街區域唷",
            "ipdatetime": "09/09 17:41"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-001",
      "list_nrec_badge": "2",
      "list_date_short": "8/19"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1787482161.A.9A9.html",
      "discovered_via": "PTT Drink 板最新列表頁 (index.html)",
      "raw_original": {
        "title": "[心得] 金茶伍 兩顆紅蘋 近期最好喝的蘋果茶",
        "author": "goodapple807 (阿齊)",
        "board": "Drink",
        "published_at": "Sun Aug 23 18:49:19 2026",
        "captured_at": "2026-11-12T11:54:38+08:00",
        "body_text": "各位好，因為喝起來實在太好喝心情大好，就上來分享一下\n\n本來路過的時候沒有打算買，但是後來發現店員直接拿兩顆蘋果\n\n去榨汁，引起我想嘗試的慾望，這次點的是無糖(還是有蘋果汁甜)\n\n一口下去，富士蘋果香甜的味道加上茶王香味真的是我近期喝過最頂的，\n\n喜歡蘋果茶類飲品的買就對了，絕對不唬爛。\n\n我以我ID好蘋果的名義掛保證，絕對好喝。(就是有點貴)",
        "push_counts": {
          "推": 6,
          "噓": 0,
          "→": 4
        },
        "total_push_entries": 10,
        "pushes": [
          {
            "tag": "→",
            "userid": "MBAR",
            "content": "有比樂法好喝嗎",
            "ipdatetime": "08/25 22:18"
          },
          {
            "tag": "推",
            "userid": "rabbit2015",
            "content": "台北有門市嗎",
            "ipdatetime": "08/27 11:08"
          },
          {
            "tag": "→",
            "userid": "goodapple807",
            "content": "只有新北永和有QQ",
            "ipdatetime": "08/27 14:47"
          },
          {
            "tag": "推",
            "userid": "h120968",
            "content": "三重跟板橋都有門市 你資訊確定不更新一下？",
            "ipdatetime": "08/27 15:23"
          },
          {
            "tag": "→",
            "userid": "goodapple807",
            "content": "抱歉，上面的大大才是對的",
            "ipdatetime": "08/27 21:03"
          },
          {
            "tag": "→",
            "userid": "pippen2002",
            "content": "夏天 喝起來!!",
            "ipdatetime": "09/03 13:04"
          },
          {
            "tag": "推",
            "userid": "yao2miao2",
            "content": "同問，想知道有沒有人喝過與樂法比較？",
            "ipdatetime": "09/10 16:15"
          },
          {
            "tag": "推",
            "userid": "LisaPrincess",
            "content": "想知道價錢，謝謝",
            "ipdatetime": "10/02 22:06"
          },
          {
            "tag": "推",
            "userid": "harebell2011",
            "content": "兩家在今天都解鎖了，覺得還是樂法比較好喝",
            "ipdatetime": "11/08 14:57"
          },
          {
            "tag": "推",
            "userid": "kittymay79",
            "content": "愛蘋果系列茶飲 想試試",
            "ipdatetime": "11/12 09:48"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-002",
      "list_nrec_badge": "6",
      "list_date_short": "8/23"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1789902845.A.F1A.html",
      "discovered_via": "PTT Drink 板最新列表頁 (index.html)",
      "raw_original": {
        "title": "[心得] 熟成紅茶 檸檬冷露紅烏龍",
        "author": "wild2012 (噹噹噹噹噹)",
        "board": "Drink",
        "published_at": "Sun Sep 20 19:14:03 2026",
        "captured_at": "2026-11-12T11:54:39+08:00",
        "body_text": "難喝死了\n一杯還65\n氣到我來PO文\n微冰微糖\n紅烏龍沒有味道\n檸檬味更是一點也沒有\n只剩下甜味\n到底在搞什麼東西?\n這麼難喝的東西到底是怎麼弄出來的\n試喝的人\n你的味覺是被肺炎還是流感破壞了嗎?\n我的天!\n難喝死了",
        "push_counts": {
          "推": 1,
          "噓": 0,
          "→": 2
        },
        "total_push_entries": 3,
        "pushes": [
          {
            "tag": "推",
            "userid": "PHXD",
            "content": "那個裡面有檸檬凍（完全沒檸檬味），還配細吸管的操作 不能",
            "ipdatetime": "09/23 15:52"
          },
          {
            "tag": "→",
            "userid": "PHXD",
            "content": "理解。",
            "ipdatetime": "09/23 15:52"
          },
          {
            "tag": "→",
            "userid": "ks32437",
            "content": "這間奶茶比較穩定",
            "ipdatetime": "09/29 15:27"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-003",
      "list_nrec_badge": "1",
      "list_date_short": "9/20"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1790046636.A.FBC.html",
      "discovered_via": "PTT Drink 板最新列表頁 (index.html)",
      "raw_original": {
        "title": "[討論] 星巴克袋子收費制度",
        "author": "look2509 (天空)",
        "board": "Drink",
        "published_at": "Tue Sep 22 11:10:34 2026",
        "captured_at": "2026-11-12T11:54:39+08:00",
        "body_text": "以往經驗\n先說我是習慣隨身帶杯袋的人\n偶爾臨時忘記帶提帶和星巴克店員拿綠色小提網袋是不收費\n今天買兩杯咖啡要送人\n和店員要了兩個小提袋被收4元\n想問問是每間星巴克的制度不同嗎\n還是每個店員作業模式不同",
        "push_counts": {
          "推": 2,
          "噓": 0,
          "→": 2
        },
        "total_push_entries": 4,
        "pushes": [
          {
            "tag": "推",
            "userid": "Hmomo",
            "content": "8/24開始要收費了",
            "ipdatetime": "09/22 12:19"
          },
          {
            "tag": "推",
            "userid": "Foxpurple520",
            "content": "看店家 民權西路門市免費",
            "ipdatetime": "09/22 12:38"
          },
          {
            "tag": "→",
            "userid": "SPOT2525",
            "content": "看你帥不帥來收費？",
            "ipdatetime": "10/20 18:21"
          },
          {
            "tag": "→",
            "userid": "EDDYYYYY",
            "content": "問雪淋吧",
            "ipdatetime": "10/30 23:36"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "討論",
        "article_nature_note": "消費者提問／口味與品項討論（板友於推噓文提供實際喝過的經驗與意見）",
        "detected_brands_in_post": [
          "星巴克"
        ],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-004",
      "list_nrec_badge": "2",
      "list_date_short": "9/22"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1792954224.A.ADF.html",
      "discovered_via": "PTT Drink 板最新列表頁 (index.html)",
      "raw_original": {
        "title": "[心得] 澳門 吃茶三千 國王珍珠奶茶",
        "author": "LoveFood (吟詩旅人)",
        "board": "Drink",
        "published_at": "Mon Oct 26 02:50:21 2026",
        "captured_at": "2026-11-12T11:54:40+08:00",
        "body_text": "圖文：https://www.lovefood.cc/2026/10/chicha-san-chen.html\n\n從澳門南灣大馬路步入歷史悠久的新八佰伴百貨，搭乘手扶梯徐徐登上商場一樓，右轉便\n能看見這座以波光粼粼水波紋銀飾牆面包覆的吃茶三千。這間來自台灣台中、享譽國際的\n精品茶飲品牌，將傳統茶道美學與現代科技萃茶技術融為一體。不同於一般手搖飲料店預\n先煮好大桶茶湯的方式，店內吧檯上一字排開閃耀著香檳金色澤的專屬專利萃茶機，現場\n瀰漫著沉穩優雅的高山茶香與焦糖甜韻，讓每位行經專櫃的旅客都不自覺駐足探看。\n\n來到店內指名度最高的第一名冠軍飲品，毫無懸念是這杯國王珍珠奶茶，單杯售價為48澳\n門幣（約折合新台幣190元）。基底選用帶有焙火香氣的鳳眉紅茶，搭配質地豐厚濃郁的\n皇家厚牛奶，再加入耗時慢火燉煮的大顆國王珍珠。\n\n店內的點餐體驗極具儀式感，櫃檯提供完整的風味圖譜導引，從基底茶品如松針綠茶、水\n仙桂花蜜、玉露青茶到凍頂烏龍，皆能依據個人偏好進行客製化調配。吧檯後方的專利萃\n茶機能針對不同茶種設定精準的高溫與高壓參數，利用瞬間萃取技術將茶葉的精華多酚釋\n出，同時阻絕苦澀感。\n\n許多旅客以為新八佰伴專櫃僅能外帶，其實沿著點餐吧檯往內深入，別有洞天地藏有一處\n極具設計感的內用休憩座位區。映入眼簾的是整面生機盎然的立體苔蘚綠植景觀牆，搭配\n純白霓虹山形燈飾與簡約的木質長桌矮凳，營造出宛如美術館般的寧靜氛圍。\n\n１．店名全稱：吃茶三千 新八佰伴店（CHICHA San Chen New Yaohan）\n２．詳細地址：澳門南灣大馬路新八佰伴百貨商場 1 樓（搭乘手扶梯上樓後右轉）\n３．營業時間：週一至週日 10:30 至 22:00（依新八佰伴百貨公告營業時間為準）\n４．消費預算：單杯飲品約 48 至 53 澳門幣",
        "push_counts": {
          "推": 0,
          "噓": 0,
          "→": 0
        },
        "total_push_entries": 0,
        "pushes": []
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-005",
      "list_nrec_badge": "0",
      "list_date_short": "10/26"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1793721400.A.028.html",
      "discovered_via": "PTT Drink 板最新列表頁 (index.html)",
      "raw_original": {
        "title": "[心得] 新北三重 李記紅茶冰(集美店)",
        "author": "LoveFood (吟詩旅人)",
        "board": "Drink",
        "published_at": "Tue Nov  3 23:56:37 2026",
        "captured_at": "2026-11-12T11:54:40+08:00",
        "body_text": "圖文：https://www.lovefood.cc/2026/10/leeji-traditional-tea.html\n\n李記紅茶冰三重集美店以經典的溫潤橙色招牌迎接著過路食客。這間原先設立於中正南路\n的老牌據點，遷址至集美街126巷內後依然維持著高人氣。店面整潔溫馨，櫃檯擺設著討\n喜的金元寶彌勒佛與傳統招財飾品，瀰漫著濃厚的台灣在地市井人情味。點餐窗口前不時\n有熟門熟路的街坊鄰居前來購買，老闆娘親切誠懇的問候聲此起彼落，為這處社區轉角注\n入了滿滿的在地溫度。\n\n檢視店門口陳列的詳細飲品菜單，全品項分為原茶、奶茶、果茶、無咖啡因與特色佐茶等\n多種系列，價格帶極度平實，L大杯普遍落在新台幣30元左右，升級為XL特大杯亦僅需新\n台幣35元至65元之間。除了招牌李記紅茶冰外，台灣青茶、蘭香綠茶、麥茶與冬瓜茶皆為\n熱門基底，更貼心推出甘蔗青、紅心芭樂檸檬與招牌鮮奶茶等多元特調。\n\n單手接過這杯沉甸甸的特大杯李記紅茶冰，外層紙杯印製著充滿活力的人物插畫，杯身透\n出微涼水氣。撕開吸管封口啜飲，濃厚的古早味茶韻瞬間漫過舌尖。店家嚴選紅茶葉遵循\n古法熬煮，加入焙炒決明子增添麥香與沉穩焙度，並以砂糖調出圓潤甜感。即使選擇正常\n冰正常甜，在細碎小碎冰的激盪下甜度依然溫和不膩口，碎冰伴隨著茶湯一同滑入喉間，\n冰鎮透心、生津解膩。伴隨著茶香在口腔中緩緩回甘，童年廟口雜貨店那一匙沁涼紅茶的\n純粹感動，在此刻表露無遺。\n\n１．店名：李記紅茶冰（三重集美店，原中正南店）\n２．地址：新北市三重區光明里集美街126巷5號\n３．外送預約專線：0939-711269\n４．營業時間：週一至週日 10:00 至 21:30（特別公休日依現場及店家公告為主）\n５．招牌飲品：特大杯XL李記紅茶冰（新台幣35元）",
        "push_counts": {
          "推": 0,
          "噓": 0,
          "→": 0
        },
        "total_push_entries": 0,
        "pushes": []
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-006",
      "list_nrec_badge": "0",
      "list_date_short": "11/03"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1785908962.A.C9D.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=迷客夏",
      "raw_original": {
        "title": "[贈送] 迷客夏 10元折價券五張",
        "author": "dollysheep24 (妃妃)",
        "board": "Drink",
        "published_at": "Wed Aug  5 13:49:20 2026",
        "captured_at": "2026-11-12T11:54:41+08:00",
        "body_text": "https://i.imgur.com/Wsvo2Ew.jpeg\n\n到8/20，共有五張就送給推文第一人吧~\n\n推完站內，謝謝~",
        "push_counts": {
          "推": 1,
          "噓": 0,
          "→": 0
        },
        "total_push_entries": 1,
        "pushes": [
          {
            "tag": "推",
            "userid": "owen13",
            "content": "推一個",
            "ipdatetime": "08/05 14:09"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "贈送",
        "article_nature_note": "板友票券／折價券贈送交流文（非飲品口味評測）",
        "detected_brands_in_post": [
          "迷客夏"
        ],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-007",
      "list_nrec_badge": "1",
      "list_date_short": "8/05"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1777394077.A.184.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=迷客夏",
      "raw_original": {
        "title": "[討論] 迷客夏九折優惠",
        "author": "hc726 (妞兒)",
        "board": "Drink",
        "published_at": "Wed Apr 29 00:34:35 2026",
        "captured_at": "2026-11-12T11:54:41+08:00",
        "body_text": "請問有人需要購買迷客夏九折優惠可以站內信，我馬上給您會員截圖，不限店家使用\n希望到會員截止日之前可以累積到一定點數，謝謝～\n我只需要累積點數，九折給你！\n\n\n--\nSent from nPTT on my iPhone 11",
        "push_counts": {
          "推": 1,
          "噓": 0,
          "→": 1
        },
        "total_push_entries": 2,
        "pushes": [
          {
            "tag": "推",
            "userid": "adaphne",
            "content": "店員會說內用要先找位置 怕你沒位置 那種沒消費的你可以",
            "ipdatetime": "05/15 14:01"
          },
          {
            "tag": "→",
            "userid": "adaphne",
            "content": "當下跟店員說呀",
            "ipdatetime": "05/15 14:01"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "討論",
        "article_nature_note": "消費者提問／口味與品項討論（板友於推噓文提供實際喝過的經驗與意見）",
        "detected_brands_in_post": [
          "迷客夏"
        ],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-008",
      "list_nrec_badge": "1",
      "list_date_short": "4/29"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1784535385.A.A41.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=CoCo",
      "raw_original": {
        "title": "[心得] coco茉香凍奶綠",
        "author": "starpipiuu (小新新)",
        "board": "Drink",
        "published_at": "Mon Jul 20 16:16:23 2026",
        "captured_at": "2026-11-12T11:54:42+08:00",
        "body_text": "之前很喜歡coco的28茉輕乳茶，那陣子每次去都點這個\n我覺得茉莉茶香跟奶味比例很剛好，不會太甜\n茶也不會被奶味蓋過，喝起來很順\n結果他好像不是常駐商品，現在好像已經沒有賣了，哭\n\n剛好昨天跟朋友一起去買，他點了(應該是新的)茉香凍奶綠\n我喝一口發現有點像之前的28茉耶\n而且裡面還有茶凍可以咬，口感更豐富\n下次我也要自己點一杯來喝",
        "push_counts": {
          "推": 2,
          "噓": 0,
          "→": 2
        },
        "total_push_entries": 4,
        "pushes": [
          {
            "tag": "→",
            "userid": "pippen2002",
            "content": "ss93r奶精?? pass",
            "ipdatetime": "07/23 20:02"
          },
          {
            "tag": "推",
            "userid": "shairg",
            "content": "我也不愛奶精",
            "ipdatetime": "08/16 00:33"
          },
          {
            "tag": "推",
            "userid": "punkmilk",
            "content": "我也覺得好喝，有特價都會買",
            "ipdatetime": "08/22 08:09"
          },
          {
            "tag": "→",
            "userid": "lkdsa",
            "content": "之前偶爾會買28 沒想到停售了",
            "ipdatetime": "08/23 04:16"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [
          "CoCo都可"
        ],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-009",
      "list_nrec_badge": "2",
      "list_date_short": "7/20"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1765240811.A.E5F.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=CoCo",
      "raw_original": {
        "title": "[心得] Coco/麻古/全家Let's Tea",
        "author": "a5925457 (桌桌)",
        "board": "Drink",
        "published_at": "Tue Dec  9 08:40:08 2025",
        "captured_at": "2026-11-12T11:54:42+08:00",
        "body_text": "分享近期喝到的幾款新品\n全家只限定喝現煮門市有賣\n想買的可以先用app地圖趣查\nhttps://i.mopix.cc/Cl67ip.jpg\n\n1.CoCo酪梨奶昔杯杯, 週一買49$\n平常蠻難買到酪梨飲品的\nCoco出這個我還不喝爆\n裡面有加布丁去打\n雖然咬不到布丁口感\n喝起來的是有濃郁感有厚度的\n平常夜市賣的酪梨牛奶動輒就要7.80了, 這價格很ok\n\n2.麻古茶坊芋泥奶茶$75\n喝起來就是芋頭牛奶\n能喝得到芋泥&吃到細小芋頭顆粒\n口感還不錯 芋頭味也夠\n冬天就喜歡這種濃厚系的\n有機會想試米麻糬芋泥奶茶\n\n3.全家金焙蕎麥醇奶茶$55買一送一\n剛入口是蕎麥香氣\n慢慢才有個奶味上來\n蕎麥的穀味蠻香的\n配上鮮奶還蠻清爽的\n個人覺得不輸手搖店\n本來原價55就不貴了\n現在還特價兩杯55\n(但好像只到今天，想便宜嚐鮮的人要快",
        "push_counts": {
          "推": 0,
          "噓": 0,
          "→": 0
        },
        "total_push_entries": 0,
        "pushes": []
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [
          "CoCo都可",
          "麻古茶坊"
        ],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-010",
      "list_nrec_badge": "0",
      "list_date_short": "12/09"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1783503899.A.E08.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=龜記",
      "raw_original": {
        "title": "[心得] 龜記 雷夢蘆薈蜜",
        "author": "Ericajj (妏妏)",
        "board": "Drink",
        "published_at": "Wed Jul  8 17:44:57 2026",
        "captured_at": "2026-11-12T11:54:43+08:00",
        "body_text": "夏天喜歡喝有檸檬的飲料 第一次喝龜記的雷夢蘆薈蜜\n因為我喜歡喝酸一點而且這款本身就有加蜂蜜了 所以我是點不另外加糖\n這樣喝起來剛剛好 酸甜中和又解膩\n(但如果真的怕酸的人 建議還是要點一分糖到微糖)\n龜記的蘆薈算大顆 很有口感 只是喝到最後會有點吸不起來\n當消暑飲料還不錯 推薦",
        "push_counts": {
          "推": 0,
          "噓": 0,
          "→": 1
        },
        "total_push_entries": 1,
        "pushes": [
          {
            "tag": "→",
            "userid": "pippen2002",
            "content": "這葛好喝 !! Push",
            "ipdatetime": "07/09 11:50"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [
          "龜記茗品"
        ],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-011",
      "list_nrec_badge": "0",
      "list_date_short": "7/08"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1776673240.A.487.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=龜記",
      "raw_original": {
        "title": "Re: [問題] 龜記 紅柚翡翠",
        "author": "q2520q (理宮莎筱)",
        "board": "Drink",
        "published_at": "Mon Apr 20 16:20:38 2026",
        "captured_at": "2026-11-12T11:54:43+08:00",
        "body_text": "多年後的今天，在脆上終於看到原料是什麼了\nhttp://i.imgur.com/GirwH2f.jpg\n\n然後這是龜記的回應\nhttp://i.imgur.com/AQwUBvQ.jpg\n\n算是解謎了不少人對於叫無糖還是有甜的疑問\n\n然後這是官網現在的介紹\nhttp://i.imgur.com/iPKUDwa.jpg\n這是剛發文被人截圖的介紹\nhttp://i.imgur.com/mWip7Y7.jpg\n\n沒有每日手挖了\n\n\n-----\nSent from JPTT on my Samsung SM-S9280.",
        "push_counts": {
          "推": 8,
          "噓": 0,
          "→": 12
        },
        "total_push_entries": 20,
        "pushes": [
          {
            "tag": "推",
            "userid": "lanvendereed",
            "content": "防腐劑 香料 甜味劑 添加物加好加滿的化工飲料賣75",
            "ipdatetime": "04/20 17:20"
          },
          {
            "tag": "→",
            "userid": "lanvendereed",
            "content": "元，拒買龜記",
            "ipdatetime": "04/20 17:20"
          },
          {
            "tag": "→",
            "userid": "since2022",
            "content": "所以從來沒有手挖跟新鮮水果？",
            "ipdatetime": "04/20 18:01"
          },
          {
            "tag": "推",
            "userid": "MBAR",
            "content": "一開始應該有吧",
            "ipdatetime": "04/20 18:52"
          },
          {
            "tag": "推",
            "userid": "h120968",
            "content": "23年以後應該就沒了 再之前的明顯沒那麼甜",
            "ipdatetime": "04/20 20:12"
          },
          {
            "tag": "→",
            "userid": "h120968",
            "content": "從果肉口感吃起來的感覺就不一樣了 非常有差",
            "ipdatetime": "04/20 20:12"
          },
          {
            "tag": "→",
            "userid": "pippen2002",
            "content": "笑死!!又一個有毒害可能?",
            "ipdatetime": "04/20 21:53"
          },
          {
            "tag": "→",
            "userid": "tylerdurdenn",
            "content": "幸好我家附近的倒了後就很少喝了 不然之前偶爾真的",
            "ipdatetime": "04/20 23:01"
          },
          {
            "tag": "→",
            "userid": "tylerdurdenn",
            "content": "會來一杯 還賣這麼貴",
            "ipdatetime": "04/20 23:01"
          },
          {
            "tag": "推",
            "userid": "MBAR",
            "content": "說實在的純加果肉跟有加糖泡過口感非常明顯不一樣，本來會相",
            "ipdatetime": "04/21 07:59"
          },
          {
            "tag": "→",
            "userid": "MBAR",
            "content": "信龜記完全沒加糖的本來就很奇怪吧？只是它這罐東西實在齁…",
            "ipdatetime": "04/21 07:59"
          },
          {
            "tag": "推",
            "userid": "h120968",
            "content": "你喝過剛開始沒幾家分店時候的版本就知道有差了",
            "ipdatetime": "04/21 08:57"
          },
          {
            "tag": "→",
            "userid": "h120968",
            "content": "本來是只有果肉泡一點蜂蜜而已 現在變成這罐就...",
            "ipdatetime": "04/21 08:57"
          },
          {
            "tag": "→",
            "userid": "h120968",
            "content": "以前停賣還會說葡萄柚進口不到 沒貨賣所以暫停",
            "ipdatetime": "04/21 08:59"
          },
          {
            "tag": "→",
            "userid": "h120968",
            "content": "不過真相是要改成這罐所以停賣改配方 誠信就很差",
            "ipdatetime": "04/21 08:59"
          },
          {
            "tag": "推",
            "userid": "SekiAnn",
            "content": "他聲明的第2點真的很搞笑，普通消費者哪會知道他家水果",
            "ipdatetime": "04/22 08:56"
          },
          {
            "tag": "→",
            "userid": "SekiAnn",
            "content": "茶的無糖是指不再另外加糖，早就應該寫清楚了",
            "ipdatetime": "04/22 08:56"
          },
          {
            "tag": "推",
            "userid": "ikok92819",
            "content": "賣那麼貴真的傻眼",
            "ipdatetime": "04/22 17:08"
          },
          {
            "tag": "→",
            "userid": "miniUU",
            "content": "還額外加糖，當然貴",
            "ipdatetime": "04/25 07:02"
          },
          {
            "tag": "推",
            "userid": "Yoimiya",
            "content": "哭 以後不會再點了",
            "ipdatetime": "05/05 16:17"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "問題",
        "article_nature_note": "消費者提問／口味與品項討論（板友於推噓文提供實際喝過的經驗與意見）",
        "detected_brands_in_post": [
          "龜記茗品"
        ],
        "detected_brands_in_pushes": [
          "龜記茗品"
        ],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-012",
      "list_nrec_badge": "8",
      "list_date_short": "4/20"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1755674756.A.7AB.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=麻古",
      "raw_original": {
        "title": "[心得] 初韻/大茗/麻古酪梨品項評比",
        "author": "asd3404 ()",
        "board": "Drink",
        "published_at": "Wed Aug 20 15:25:54 2025",
        "captured_at": "2026-11-12T11:54:45+08:00",
        "body_text": "身為酪梨控，實在很樂見各家手搖推出不同的酪梨飲料\n所以，這邊直接跟大家分享幾間完全不同Level的酪梨手搖\n酪梨們全都～納命來吧！\n（以下口感味道都是個人口味僅供參考）\n\n1.初韻 酪布是你\n酪梨跟雞蛋布丁的組合\n最傳統的酪梨飲料\n奶昔口感，酪梨味蠻濃厚的\n怕酪梨味道的人可能不能輕易嘗試\n布丁對我來說蠻甜的\n但對螞蟻人來說應該剛好\n\n2.大茗 酪梨奶蓋紅玉\n微糖微冰剛剛好\n存在感沒有太強的酪梨\n想要初體驗酪梨的人可以試\n奶蓋本身有一點點酪梨香，直接對口喝才喝的出來\n如果是搖勻我覺得酪梨味會不見\n紅茶中規中矩，建議一口奶蓋一口紅茶\n不然到最後剩誰都會很無聊\n\n3.麻古 酪梨甘露\n冰沙口感的酪梨牛奶\n有芒果丁跟綠茶凍\n蠻喜歡這個很有咀嚼感的組合，芒果的甜跟綠茶凍的茶香\n雖然甜度冰量是固定的，但喝起來完全不膩\n酪梨味我覺得很剛好不會太淡\n是可以喝到酪梨香的程度\n還有!料很多不用怕喝到最後只剩酪梨本人\n\n以上是以我口味評比的三家酪梨手搖\n如果怕酪梨的人想要漸進嘗試可以麻古>初韻\n大茗我自己不太推 因為基本沒有甚麼酪梨味 喝了有點無感哈哈哈\n希望各位酪梨人也可以分享自己的酪梨口袋名單給我XDD",
        "push_counts": {
          "推": 17,
          "噓": 0,
          "→": 7
        },
        "total_push_entries": 24,
        "pushes": [
          {
            "tag": "推",
            "userid": "CCahNan",
            "content": "大茗的酪梨奶蓋還不錯 我喜歡攪勻但這樣酪梨香會直接不",
            "ipdatetime": "08/20 16:29"
          },
          {
            "tag": "→",
            "userid": "CCahNan",
            "content": "見QQ",
            "ipdatetime": "08/20 16:29"
          },
          {
            "tag": "推",
            "userid": "ss3617586",
            "content": "麻古酪梨甘露前幾天才喝，我覺得加芒果跟茶凍更特別",
            "ipdatetime": "08/20 17:34"
          },
          {
            "tag": "→",
            "userid": "ss3617586",
            "content": "不會像加布丁一樣會膩",
            "ipdatetime": "08/20 17:34"
          },
          {
            "tag": "推",
            "userid": "MiHua",
            "content": "終於有酪梨飲料不是加布丁了嗎",
            "ipdatetime": "08/20 18:19"
          },
          {
            "tag": "推",
            "userid": "ciaoliang",
            "content": "麻古料真的很多 我都點拿鐵然後料加爆 不用加價！(歪",
            "ipdatetime": "08/21 11:59"
          },
          {
            "tag": "推",
            "userid": "catalina0919",
            "content": "初韻的酪梨加布丁真的久久喝就好，熱量爆炸",
            "ipdatetime": "08/21 14:14"
          },
          {
            "tag": "推",
            "userid": "t813900",
            "content": "不知道麻古能不能讓酪梨變成每年季節限定 希望會><",
            "ipdatetime": "08/21 15:12"
          },
          {
            "tag": "推",
            "userid": "qaz91222",
            "content": "+1樓上 感覺可以跟楊枝甘露一樣變主打哈哈哈",
            "ipdatetime": "08/21 15:55"
          },
          {
            "tag": "推",
            "userid": "taco52012",
            "content": "一杯酪梨甘露感覺可以直接當午餐欸哈哈",
            "ipdatetime": "08/21 16:54"
          },
          {
            "tag": "推",
            "userid": "unicorn1222",
            "content": "好多酪梨飲料 一直很想嘗試看看但有點害怕",
            "ipdatetime": "08/21 17:31"
          },
          {
            "tag": "推",
            "userid": "abcdef434",
            "content": "每次麻古出的季節限定都是喝完會飽到天靈蓋",
            "ipdatetime": "08/21 18:56"
          },
          {
            "tag": "推",
            "userid": "SekiAnn",
            "content": "麻古那個酪梨好像被歸在芒果系列裡，如果賣很好就有機會",
            "ipdatetime": "08/21 20:42"
          },
          {
            "tag": "→",
            "userid": "SekiAnn",
            "content": "每年回歸",
            "ipdatetime": "08/21 20:42"
          },
          {
            "tag": "推",
            "userid": "kfcvc",
            "content": "愛大茗的酪梨奶蓋！",
            "ipdatetime": "08/28 08:10"
          },
          {
            "tag": "推",
            "userid": "nng7baby",
            "content": "大茗酪梨奶蓋再+蓋 濃到不要不要",
            "ipdatetime": "09/01 17:45"
          },
          {
            "tag": "推",
            "userid": "jaundice68",
            "content": "麻古的好喝",
            "ipdatetime": "09/02 13:43"
          },
          {
            "tag": "→",
            "userid": "samuelzx",
            "content": "大茗酪梨頂",
            "ipdatetime": "09/17 22:02"
          },
          {
            "tag": "→",
            "userid": "tob860324",
            "content": "原來這麼多飲料店都有出酪梨的品項!",
            "ipdatetime": "09/18 11:49"
          },
          {
            "tag": "推",
            "userid": "oddman",
            "content": "謝謝分享~想來試試麻古的~",
            "ipdatetime": "09/21 13:33"
          },
          {
            "tag": "→",
            "userid": "oddman",
            "content": "不怕單純酪梨味，只怕加太多糖或太甜~",
            "ipdatetime": "09/21 13:34"
          },
          {
            "tag": "推",
            "userid": "daffodil2",
            "content": "大茗昨天才喝～很喜歡+1",
            "ipdatetime": "10/08 11:52"
          },
          {
            "tag": "推",
            "userid": "pkmu8426",
            "content": "大茗的玉露青 終於找到順口有喉韻的口感了",
            "ipdatetime": "11/07 23:27"
          },
          {
            "tag": "→",
            "userid": "pkmu8426",
            "content": "根本就是一沐日沒換茶葉時的水準",
            "ipdatetime": "11/07 23:28"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "心得",
        "article_nature_note": "消費者實際試喝心得（含作者個人購買經驗與口味評價，以及推噓文板友回饋）",
        "detected_brands_in_post": [
          "麻古茶坊",
          "大茗本位製茶堂"
        ],
        "detected_brands_in_pushes": [
          "麻古茶坊",
          "大茗本位製茶堂",
          "一沐日"
        ],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-013",
      "list_nrec_badge": "17",
      "list_date_short": "8/20"
    },
    {
      "url": "https://www.ptt.cc/bbs/Drink/M.1767852749.A.20C.html",
      "discovered_via": "PTT Drink 板關鍵字搜尋：q=大茗",
      "raw_original": {
        "title": "[討論] 大茗草莓系飲料喝過嗎",
        "author": "timilili88 (timi瓜)",
        "board": "Drink",
        "published_at": "Thu Jan  8 14:12:27 2026",
        "captured_at": "2026-11-12T11:54:45+08:00",
        "body_text": "前幾天去大茗飲料店，忍不住點了招牌草莓優格飲和翡翠莓香，雖然價格不斐但兩杯都讓\n我驚豔！\n\n草莓優格飲，新鮮草莓果泥混入滑順優格，一喝下去就是滿滿草莓爆香，酸甜比例掌握得\n恰到好處。優格的奶味濃郁卻不膩，搭配細緻氣泡，草莓丁散布其中，咬勁十足，喝完\n嘴巴裡還殘留果香，我自己給他88分！\n\n翡翠莓香則是綠茶與莓果的夢幻CP，茶湯清澈翠綠，入口茶香味道先出來，隨即莓果酸\n甜湧現，苦甘平衡，喝起來比優格飲更清爽，自己喝完一杯絕對沒問題!",
        "push_counts": {
          "推": 4,
          "噓": 0,
          "→": 4
        },
        "total_push_entries": 8,
        "pushes": [
          {
            "tag": "推",
            "userid": "MBAR",
            "content": "有夠貴……",
            "ipdatetime": "01/08 22:30"
          },
          {
            "tag": "推",
            "userid": "jeanwstour",
            "content": "現在飲料好貴，我都好猶豫@@",
            "ipdatetime": "01/16 12:51"
          },
          {
            "tag": "→",
            "userid": "uniwu",
            "content": "草莓優格很像ab優酪乳",
            "ipdatetime": "01/19 09:29"
          },
          {
            "tag": "→",
            "userid": "pippen2002",
            "content": "趁機減肥省錢啊!!",
            "ipdatetime": "01/19 16:01"
          },
          {
            "tag": "推",
            "userid": "LisaPrincess",
            "content": "有喝過...真心覺得貴，而且也小小杯的",
            "ipdatetime": "01/22 22:30"
          },
          {
            "tag": "推",
            "userid": "otosukisugi",
            "content": "翡翠莓香蠻特別的",
            "ipdatetime": "01/30 20:52"
          },
          {
            "tag": "→",
            "userid": "philipa",
            "content": "還沒",
            "ipdatetime": "02/08 10:19"
          },
          {
            "tag": "→",
            "userid": "jing213",
            "content": "只喝過酪梨奶蓋",
            "ipdatetime": "02/22 14:28"
          }
        ]
      },
      "programmatic_analysis": {
        "post_category_tag": "討論",
        "article_nature_note": "消費者提問／口味與品項討論（板友於推噓文提供實際喝過的經驗與意見）",
        "detected_brands_in_post": [
          "大茗本位製茶堂"
        ],
        "detected_brands_in_pushes": [],
        "analysis_disclaimer": "此欄位為程式依關鍵字與標題分類自動判讀之輔助標籤，僅供檢索對照；實際語意請以左側「原文內容 (raw_original)」與原始 PTT 網址為準。"
      },
      "ptt_evidence_id": "PTT-DRINK-014",
      "list_nrec_badge": "4",
      "list_date_short": "1/08"
    }
  ]
};

const platformCapabilities = [
  {
    "platform": "Google News 原始新聞內文讀取",
    "status": "只能取得部分",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "對 RSS 內 <link> (https://news.google.com/rss/articles/CBMi9wJBVV95cUxOZE...) 發送 HTTP GET",
    "test_result": "HTTP 200，最終網址停留在 https://news.google.com/rss/articles/CBMi9wJBVV95c...（Google News 採用前端 JS/鞭炮加密跳轉頁，純 HTTP GET 僅拿到 Google 轉址殼層 HTML，無法直接取得媒體網站完整新聞內文，但人類在瀏覽器點擊該連結可正常自動跳轉開啟原新聞）。"
  },
  {
    "platform": "PTT 飲料板 (Drink)",
    "status": "已測試可取得（已完成端到端採集）",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "Python urllib 帶 Cookie: over18=1 實測抓取列表頁、5組關鍵字搜尋頁與 14 篇單篇內文＋推噓文",
    "test_result": "HTTP 200 成功。已實際保存 14 篇文章之網址、標題、作者、發布時間、擷取時間、完整內文與 79 則推噓文（見分頁 1）。"
  },
  {
    "platform": "Dcard (公開 API / 網頁)",
    "status": "本次測試失敗",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "HTTP GET https://www.dcard.tw/service/api/v2/forums/food/posts?limit=5",
    "test_result": "遭到 Cloudflare 防爬蟲攔截 (HTTP Error 403: Forbidden)，純標準 HTTP 請求無法直接取得 JSON。"
  },
  {
    "platform": "Threads 搜尋頁",
    "status": "本次測試失敗",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "HTTP GET https://www.threads.net/search?q=%E6%89%8B%E6%90%96%E9%A3%B2",
    "test_result": "HTTP 200（回傳 615056 bytes SPA 前端框架殼層，是否含貼文內文: False；無公開免金鑰搜尋 API，需登入或無頭瀏覽器渲染）。"
  },
  {
    "platform": "Instagram (官方帳號與 Hashtag)",
    "status": "尚未實作",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "無（本階段尚未編寫該平台採集程式）",
    "test_result": "尚未實作爬蟲；Meta Graph API 需商業開發者權杖，直接爬取網頁受登入牆限制。"
  },
  {
    "platform": "Facebook 粉絲專頁",
    "status": "尚未實作",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "無（本階段尚未編寫該平台採集程式）",
    "test_result": "尚未實作爬蟲；需 Graph API 權杖或手動登錄貼文網址。"
  },
  {
    "platform": "小紅書 / 抖音 / TikTok",
    "status": "尚未實作",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "無（本階段尚未編寫該平台採集程式）",
    "test_result": "尚未實作爬蟲；目前無接取任何跨區搜尋或解析腳本。"
  },
  {
    "platform": "UberEats / Foodpanda 外送熱銷榜",
    "status": "尚未實作",
    "tested_at": "2026-11-12 11:32:14",
    "test_method": "無（本階段尚未編寫該平台採集程式）",
    "test_result": "尚未實作爬蟲；需指定門市經緯度座標與動態渲染。"
  }
];

const isolatedDemoSample = [
  {
    "brand": "五桐號",
    "name": "極濃開心果奶蓋焙茶",
    "market": "台灣",
    "price": "NT$75-85",
    "scoreA": 20,
    "scoreB": 28,
    "scoreC": 15,
    "scoreD": 15,
    "scoreE": 10,
    "totalScore": 88,
    "multiplier": 3.45,
    "tier": "🔥 現象級爆紅",
    "platforms": [
      "Threads",
      "Instagram",
      "Dcard",
      "新聞媒體"
    ],
    "ugcCount": 34,
    "observation": "立冬與雙11檔期最強黑馬！義大利開心果鹹甜堅果奶蓋結合鹿兒島深焙茶底，Threads 每日破千則自發開箱，門市頻傳開心果醬提早售罄。"
  },
  {
    "brand": "Starbucks",
    "name": "Cran-Merry Orange Refresher & 太妃核果醇奶",
    "market": "美國",
    "price": "USD $5.95-6.45",
    "scoreA": 20,
    "scoreB": 27,
    "scoreC": 15,
    "scoreD": 15,
    "scoreE": 10,
    "totalScore": 87,
    "multiplier": 3.2,
    "tier": "🔥 現象級爆紅",
    "platforms": [
      "TikTok",
      "Instagram",
      "Reddit",
      "X"
    ],
    "ugcCount": 41,
    "observation": "冬季紅杯檔期（Red Cup Season）正式引爆，蔓越莓甜橙清爽果飲打破冬季只有重奶咖啡的慣例，在 TikTok 創下百萬級開箱觀看。"
  },
  {
    "brand": "一沐日",
    "name": "熱黑糖粉粿烤奶（立冬溫熱限定）",
    "market": "台灣",
    "price": "NT$70",
    "scoreA": 20,
    "scoreB": 25,
    "scoreC": 13,
    "scoreD": 15,
    "scoreE": 10,
    "totalScore": 83,
    "multiplier": 2.92,
    "tier": "🔥 現象級爆紅",
    "platforms": [
      "Threads",
      "Instagram",
      "Facebook",
      "外送平台"
    ],
    "ugcCount": 18,
    "observation": "精準卡位 11 月立冬降溫體感，主打溫熱喝依然 Q 彈不軟爛的黑糖粉粿搭配炭焙烤奶，外送平台夜間熱飲訂單暴增 2.9 倍。"
  },
  {
    "brand": "喜茶 HEYTEA",
    "name": "雙11黑松露可可濃巧牛乳",
    "market": "中國大陸",
    "price": "RMB 19 (雙11買1送1券)",
    "scoreA": 20,
    "scoreB": 22,
    "scoreC": 12,
    "scoreD": 15,
    "scoreE": 9,
    "totalScore": 78,
    "multiplier": 2.38,
    "tier": "📈 強勢話題",
    "platforms": [
      "小紅書",
      "抖音",
      "微博"
    ],
    "ugcCount": 21,
    "observation": "把西餐高級黑松露鹹香融入法芙娜可可，獵奇奢華感成功在雙11期間吸引嚐鮮打卡，帶動高單價烘焙茶飲連帶銷售。"
  },
  {
    "brand": "CoCo都可",
    "name": "雙11百香雙響炮＆大甲芋頭鮮奶買1送1",
    "market": "台灣",
    "price": "NT$70-85 (雙11限定買1送1)",
    "scoreA": 18,
    "scoreB": 21,
    "scoreC": 10,
    "scoreD": 13,
    "scoreE": 10,
    "totalScore": 72,
    "multiplier": 2.15,
    "tier": "📈 強勢話題",
    "platforms": [
      "Line",
      "Facebook",
      "Threads",
      "外送平台"
    ],
    "ugcCount": 11,
    "observation": "雙11狂歡週透過 Line 領券與外送平台同步買一送一，手搗大甲芋頭結合經典百香雙響炮，成為辦公室團購湊單首選。"
  },
  {
    "brand": "珍煮丹",
    "name": "黑糖薑母桂圓暖茶系列",
    "market": "台灣",
    "price": "NT$65-75",
    "scoreA": 18,
    "scoreB": 18,
    "scoreC": 9,
    "scoreD": 12,
    "scoreE": 8,
    "totalScore": 65,
    "multiplier": 1.68,
    "tier": "📈 強勢話題",
    "platforms": [
      "Instagram",
      "Facebook",
      "新聞媒體"
    ],
    "ugcCount": 6,
    "observation": "針對立冬女性養生與暖身需求推出祖傳黑糖薑茶與桂圓組合，受上班族女性穩定回購，屬季節性剛需常銷品。"
  }
];

let currentEventCategoryFilter = "ALL";
let currentFilterBrand = "ALL";
let currentFilterQuery = "ALL";

function switchTab(index) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('text-emerald-800', 'bg-emerald-50', 'border-emerald-300', 'shadow-sm');
    btn.classList.add('text-slate-700', 'border-transparent');
  });

  document.getElementById(`tab-${index}`).classList.add('active');
  const activeBtn = document.getElementById(`tab-btn-${index}`);
  activeBtn.classList.remove('text-slate-700', 'border-transparent');
  activeBtn.classList.add('text-emerald-800', 'bg-emerald-50', 'border-emerald-300', 'shadow-sm');
}

function openConceptModal() {
  document.getElementById('concept-modal').classList.add('active');
}
function closeConceptModal() {
  document.getElementById('concept-modal').classList.remove('active');
}

function toggleRawRecordsSection() {
  const wrapper = document.getElementById('raw-records-wrapper');
  const btn = document.getElementById('toggle-raw-records-btn');
  if (wrapper.classList.contains('hidden')) {
    wrapper.classList.remove('hidden');
    btn.innerText = '🔼 收合 95 筆依連結去重的新聞紀錄平鋪表';
  } else {
    wrapper.classList.add('hidden');
    btn.innerText = '📂 展開檢視全部 95 筆依連結去重的新聞紀錄平鋪表';
  }
}

function toggleEventSources(eventId) {
  const el = document.getElementById(`event-sources-${eventId}`);
  const btn = document.getElementById(`event-toggle-btn-${eventId}`);
  if (!el) return;
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    if (btn) btn.innerText = '🔼 收合原始新聞來源清單';
  } else {
    el.classList.add('hidden');
    if (btn) btn.innerText = '🔽 展開檢視全部原始新聞來源連結';
  }
}

function applyEventFilter() {
  currentEventCategoryFilter = document.getElementById('filter-event-cat-select').value;
  renderNewsEventsList();
}

function applyNewsFilter() {
  currentFilterBrand = document.getElementById('filter-brand-select').value;
  currentFilterQuery = document.getElementById('filter-query-select').value;
  renderVerifiedNewsList();
}

function getCategoryBadgeHtml(cat) {
  if (cat === "新品") {
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400">🆕 新品</span>`;
  } else if (cat === "舊品回歸") {
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-purple-100 text-purple-900 border border-purple-400">🔄 舊品回歸</span>`;
  } else if (cat === "促銷") {
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-amber-100 text-amber-900 border border-amber-400">🏷️ 促銷／聯名</span>`;
  } else if (cat === "合集") {
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-sky-100 text-sky-900 border border-sky-400">📦 多品牌合集</span>`;
  }
  return `<span class="px-3 py-0.5 text-sm font-bold rounded-full bg-slate-200 text-slate-800">${cat}</span>`;
}

function renderCrosscheckCases() {
  const cases = newsEventsData.crosscheck_cases || [];
  const container = document.getElementById('crosscheck-cases-list');
  if (!container) return;

  container.innerHTML = cases.map((c, idx) => {
    const catBadges = (c.event_categories || []).map(getCategoryBadgeHtml).join(' ');
    const mediaSourcesHtml = (c.what_media_reported.verified_sources || []).map(s => `
      <li class="text-sm bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col gap-1">
        <div class="flex items-center justify-between gap-2">
          <span class="font-mono font-bold text-xs px-2 py-0.5 bg-slate-800 text-white rounded">${s.evidence_id}</span>
          <span class="font-bold text-emerald-800 text-xs">${s.publisher_name} (${s.published_at})</span>
        </div>
        <a href="${s.rss_link}" target="_blank" rel="noopener noreferrer"
           class="font-bold text-slate-900 hover:text-emerald-700 underline decoration-emerald-400 underline-offset-2 leading-snug">
          ${s.title_clean} ↗
        </a>
      </li>
    `).join('');

    const pttRefsHtml = (c.what_users_actually_said.referenced_ptt_articles || []).map(p => `
      <li class="text-sm bg-white p-2.5 rounded-lg border border-indigo-200 flex flex-col gap-1">
        <div class="flex items-center justify-between gap-2">
          <span class="font-mono font-bold text-xs px-2 py-0.5 bg-indigo-800 text-white rounded">${p.ptt_evidence_id}</span>
          <span class="font-mono text-xs text-slate-600">作者: ${p.author} | ${p.published_at}</span>
        </div>
        <a href="${p.url}" target="_blank" rel="noopener noreferrer"
           class="font-bold text-indigo-900 hover:text-indigo-600 underline decoration-indigo-400 underline-offset-2">
          ${p.title} ↗
        </a>
        <div class="text-xs text-slate-600">${p.relevance_note}</div>
      </li>
    `).join('');

    const unknownsHtml = (c.what_is_still_unknown || []).map(u => `
      <li class="flex items-start gap-2 text-base text-slate-800 leading-relaxed">
        <span class="text-amber-600 font-black mt-0.5">•</span>
        <span>${u}</span>
      </li>
    `).join('');

    return `
      <div class="bg-slate-50/95 border-2 border-slate-300 rounded-2xl p-6 shadow-sm space-y-5">
        <!-- 案例標題列 -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 bg-slate-900 text-white font-mono font-black text-sm rounded-md">案例 ${idx + 1} (${c.case_id})</span>
              <span class="px-3 py-1 bg-emerald-700 text-white font-extrabold text-sm rounded-md">${c.brand_label}</span>
              ${catBadges}
            </div>
            <h3 class="text-xl font-black text-slate-900 pt-1">${c.event_title}</h3>
          </div>
          <div class="text-right">
            <span class="inline-block px-3.5 py-1.5 bg-indigo-50 border-2 border-indigo-300 text-indigo-950 font-extrabold text-sm rounded-lg">
              🔎 PTT 對照結果：${c.ptt_match_status}
            </span>
          </div>
        </div>

        <!-- 三欄並列：媒體報導了什麼 / 使用者實際說了什麼 / 目前還不知道什麼 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <!-- 第 1 欄：媒體報導了什麼 -->
          <div class="bg-emerald-50/70 border-2 border-emerald-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
                <h4 class="text-lg font-black text-emerald-950">📢 1. 媒體報導了什麼（宣傳與曝光）</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-emerald-200 text-emerald-950 rounded-full">共 ${c.media_source_count} 筆新聞紀錄</span>
              </div>
              <p class="text-base text-slate-800 leading-relaxed whitespace-pre-line">${c.what_media_reported.summary}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-emerald-200">
              <div class="text-xs font-extrabold text-emerald-900 mb-2">🔗 代表性新聞來源核對（點擊開啟原文）：</div>
              <ul class="space-y-2">${mediaSourcesHtml}</ul>
            </div>
          </div>

          <!-- 第 2 欄：使用者實際說了什麼 -->
          <div class="bg-indigo-50/70 border-2 border-indigo-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-indigo-200 pb-2">
                <h4 class="text-lg font-black text-indigo-950">💬 2. 使用者實際說了什麼（PTT 飲料板）</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-indigo-200 text-indigo-950 rounded-full">${c.what_users_actually_said.status_badge}</span>
              </div>
              <p class="text-base text-slate-800 leading-relaxed whitespace-pre-line">${c.what_users_actually_said.summary}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-indigo-200 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-extrabold text-indigo-900">🔗 PTT 看板檢索與對照文章連結：</span>
                <a href="${c.what_users_actually_said.ptt_search_url}" target="_blank" rel="noopener noreferrer"
                   class="text-xs font-bold text-indigo-700 hover:underline">開啟 PTT 搜尋結果頁 ↗</a>
              </div>
              <ul class="space-y-2">${pttRefsHtml}</ul>
            </div>
          </div>

          <!-- 第 3 欄：目前還不知道什麼 -->
          <div class="bg-amber-50/70 border-2 border-amber-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-amber-200 pb-2">
                <h4 class="text-lg font-black text-amber-950">❓ 3. 目前還不知道什麼（證據邊界）</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-amber-200 text-amber-950 rounded-full">未知／未取得</span>
              </div>
              <ul class="space-y-3 pt-1">${unknownsHtml}</ul>
            </div>
            <div class="mt-4 pt-3 border-t border-amber-200 text-xs font-bold text-amber-900">
              ⚠️ 嚴格遵守規範：未取得之價格、他站討論與真實銷量一律保留為「未知」，不推估、亦不當成零分。
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderNewsEventsList() {
  const allEvents = newsEventsData.events || [];
  const filteredEvents = allEvents.filter(ev => {
    if (currentEventCategoryFilter === "ALL") return true;
    if (currentEventCategoryFilter === "FOCUSED") {
      return !ev.event_id.startsWith("EVT-ROUNDUP-") && !ev.event_id.startsWith("EVT-INDEPENDENT-");
    }
    if (currentEventCategoryFilter === "UNMERGED") {
      return ev.event_id.startsWith("EVT-INDEPENDENT-");
    }
    return (ev.event_categories || []).includes(currentEventCategoryFilter);
  });

  const totalRecordsInFiltered = filteredEvents.reduce((acc, e) => acc + (e.source_count || 0), 0);
  const badgeEl = document.getElementById('event-filter-badge');
  if (badgeEl) {
    badgeEl.innerText = `目前顯示：${filteredEvents.length} / ${allEvents.length} 個事件（涵蓋 ${totalRecordsInFiltered} / 95 筆新聞紀錄）`;
  }

  const container = document.getElementById('news-events-list');
  if (!container) return;

  container.innerHTML = filteredEvents.map((ev, index) => {
    const catBadges = (ev.event_categories || []).map(getCategoryBadgeHtml).join(' ');
    const isUnmerged = ev.event_id.startsWith("EVT-INDEPENDENT-");
    const isRoundup = ev.event_id.startsWith("EVT-ROUNDUP-");
    const cardBorder = isUnmerged
      ? "border-slate-300 bg-white/90"
      : (isRoundup ? "border-sky-300 bg-white/95" : "border-emerald-300 bg-white/95");

    // 預設顯示前 3 筆來源，若超過 3 筆可一鍵展開全部保留之來源
    const sourcesHtml = (ev.source_records || []).map(r => `
      <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-emerald-50/40 transition">
        <div class="space-y-0.5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-xs font-extrabold px-2 py-0.5 bg-slate-800 text-white rounded">${r.evidence_id}</span>
            <span class="text-sm font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">${r.publisher_name}</span>
            <span class="text-xs font-mono text-slate-500">發布：${r.published_at} | 擷取：${r.captured_at} | 查詢：${r.query_id}</span>
          </div>
          <a href="${r.rss_link}" target="_blank" rel="noopener noreferrer"
             class="inline-block text-base font-bold text-slate-900 hover:text-emerald-700 underline decoration-emerald-400 underline-offset-2 mt-1">
            ${r.title_clean} ↗
          </a>
        </div>
        <a href="${r.rss_link}" target="_blank" rel="noopener noreferrer"
           class="shrink-0 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm">
          🔗 開啟來源
        </a>
      </div>
    `).join('');

    const showDefaultOpen = index < 4 || ev.source_count <= 2;

    return `
      <div class="${cardBorder} backdrop-blur-sm border-2 rounded-2xl p-6 shadow-sm transition">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div class="space-y-2 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-0.5 font-mono text-xs font-extrabold bg-slate-800 text-white rounded">${ev.event_id}</span>
              <span class="px-3 py-0.5 text-base font-extrabold rounded-md bg-emerald-800 text-white">${ev.brand_label}</span>
              ${catBadges}
              ${isUnmerged ? '<span class="px-2.5 py-0.5 text-xs font-bold bg-slate-200 text-slate-800 rounded">🔒 未強制合併（單篇獨立保留）</span>' : ''}
            </div>
            <h3 class="text-xl font-black text-slate-900 leading-snug">${ev.event_title}</h3>
            <p class="text-sm text-slate-600 font-medium">📌 <strong>歸納依據：</strong>${ev.merge_basis}</p>
          </div>

          <div class="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 bg-slate-100 px-4 py-3 rounded-xl border border-slate-200">
            <div class="text-right">
              <div class="text-xs font-bold text-slate-500">涵蓋依連結去重紀錄數</div>
              <div class="text-2xl font-black text-emerald-800">${ev.source_count} 筆紀錄 <span class="text-sm font-bold text-slate-600">(${ev.unique_publisher_count} 家媒體)</span></div>
            </div>
            <button onclick="toggleEventSources('${ev.event_id}')" id="event-toggle-btn-${ev.event_id}"
              class="px-3 py-1 bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-extrabold transition">
              ${showDefaultOpen ? '🔼 收合原始新聞來源清單' : '🔽 展開檢視全部原始新聞來源連結'}
            </button>
          </div>
        </div>

        <div id="event-sources-${ev.event_id}" class="${showDefaultOpen ? '' : 'hidden'} mt-4 pt-4 border-t border-slate-200 space-y-2">
          <div class="text-xs font-extrabold text-slate-600 mb-2">
            以下完整保留歸屬本事件之全部 ${ev.source_count} 筆新聞紀錄（點擊標題或按鈕可開啟原始新聞）：
          </div>
          ${sourcesHtml}
        </div>
      </div>
    `;
  }).join('');
}

function renderPttSection() {
  const searchLogs = (verifiedPttData.collection_metadata && verifiedPttData.collection_metadata.search_logs) || [];
  const articles = verifiedPttData.articles || [];

  const searchBox = document.getElementById('ptt-search-log-list');
  if (searchBox) {
    searchBox.innerHTML = searchLogs.map(log => {
      const topListHtml = (log.top_3_Latest_titles_found || []).map(item => `
        <li class="text-sm border-t border-slate-200 pt-1.5 mt-1.5">
          <span class="font-mono text-xs px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded mr-1">${item.date}</span>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="font-bold text-indigo-800 hover:underline">
            ${item.title} ↗
          </a>
        </li>
      `).join('');

      return `
        <div class="p-4 rounded-xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="px-3 py-1 bg-indigo-900 text-white font-extrabold text-base rounded-lg">關鍵字：${log.keyword}</span>
              <a href="${log.search_url}" target="_blank" rel="noopener noreferrer"
                 class="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded hover:bg-indigo-200">
                🔗 開啟 PTT 搜尋頁
              </a>
            </div>
            <div class="text-xs text-slate-600 mb-1">搜尋結果首頁筆數：${log.total_entries_on_first_page} 篇（以下為最新 3 篇）：</div>
            <ul class="space-y-1">${topListHtml}</ul>
          </div>
        </div>
      `;
    }).join('');
  }

  const pttList = document.getElementById('verified-ptt-list');
  if (pttList) {
    pttList.innerHTML = articles.map(art => {
      const ro = art.raw_original;
      const pa = art.programmatic_analysis;
      const pushesHtml = (ro.pushes || []).map(p => {
        const tagColor = p.tag === "推" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : (p.tag === "噓" ? "text-rose-700 bg-rose-50 border-rose-200" : "text-slate-600 bg-slate-100 border-slate-200");
        return `
          <div class="text-sm py-1.5 px-2.5 rounded bg-white border border-slate-200 flex flex-wrap justify-between items-start gap-2">
            <div class="flex items-start gap-2">
              <span class="px-1.5 py-0.5 text-xs font-extrabold rounded border ${tagColor}">${p.tag}</span>
              <span class="font-mono font-bold text-indigo-900">${p.userid}:</span>
              <span class="text-slate-800">${p.content}</span>
            </div>
            <span class="font-mono text-xs text-slate-400 shrink-0">${p.ipdatetime}</span>
          </div>
        `;
      }).join('');

      const brandsPost = (pa.detected_brands_in_post || []).length > 0 ? pa.detected_brands_in_post.join('、') : '未偵測到特定連鎖品牌關鍵字（或為獨立茶飲店）';
      const brandsPush = (pa.detected_brands_in_pushes || []).length > 0 ? pa.detected_brands_in_pushes.join('、') : '無';

      return `
        <div class="bg-white/95 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <!-- 左欄：📄 原文內容 (raw_original) -->
            <div class="lg:col-span-8 space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2.5 py-0.5 font-mono text-sm font-black bg-indigo-900 text-white rounded">${art.ptt_evidence_id}</span>
                  <span class="px-3 py-0.5 text-sm font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 rounded">📄 原文內容 (raw_original)</span>
                  <span class="text-xs font-mono text-slate-500">取得途徑：${art.discovered_via}</span>
                </div>
                <a href="${art.url}" target="_blank" rel="noopener noreferrer"
                   class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition">
                  🔗 開啟 PTT 原始文章核對
                </a>
              </div>

              <div>
                <h4 class="text-xl font-black text-slate-900">
                  <a href="${art.url}" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-700 underline decoration-indigo-400 underline-offset-4">
                    ${ro.title} ↗
                  </a>
                </h4>
                <div class="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600 font-mono">
                  <span>👤 作者：<strong>${ro.author}</strong></span>
                  <span>🕒 發布時間：<strong>${ro.published_at}</strong></span>
                  <span>📥 擷取時間：<strong>${ro.captured_at}</strong></span>
                </div>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div class="text-xs font-extrabold text-slate-500 mb-1.5">【原文內文完整保存】：</div>
                <div class="text-base text-slate-800 whitespace-pre-line leading-relaxed font-normal">${ro.body_text}</div>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold text-slate-700">
                    【推噓文完整紀錄】共 ${ro.total_push_entries} 則（推：${ro.push_counts['推']} / 噓：${ro.push_counts['噓']} / →：${ro.push_counts['→']}）
                  </span>
                </div>
                ${ro.total_push_entries > 0 ? `<div class="space-y-1.5 max-h-72 overflow-y-auto pr-1">${pushesHtml}</div>` : `<div class="text-sm text-slate-500 italic">（本篇目前無推噓文）</div>`}
              </div>
            </div>

            <!-- 右欄：🤖 程式分析結果 (programmatic_analysis，與原文嚴格分開) -->
            <div class="lg:col-span-4 bg-indigo-50/60 border-2 border-indigo-200 rounded-xl p-5 flex flex-col justify-between">
              <div class="space-y-4">
                <div class="border-b border-indigo-200 pb-2">
                  <span class="px-3 py-1 bg-indigo-800 text-white text-sm font-extrabold rounded-md">🤖 程式分析結果 (programmatic_analysis)</span>
                  <p class="text-xs text-indigo-900 mt-1.5 font-medium">
                    與左側「原文內容」嚴格分離，僅作檢索分類輔助，不改寫原文。
                  </p>
                </div>

                <div class="space-y-3 text-base">
                  <div>
                    <div class="text-xs font-bold text-slate-500">標題分類標籤：</div>
                    <div class="font-extrabold text-slate-900">[${pa.post_category_tag}]</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-500">文章性質判讀：</div>
                    <div class="font-bold text-indigo-950 text-sm leading-snug">${pa.article_nature_note}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-500">主文偵測品牌關鍵字：</div>
                    <div class="font-extrabold text-emerald-800">${brandsPost}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-500">推噓文提及品牌關鍵字：</div>
                    <div class="font-bold text-slate-800">${brandsPush}</div>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-indigo-200 text-xs text-slate-600 leading-relaxed">
                ℹ️ ${pa.analysis_disclaimer}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function renderVerifiedDashboard() {
  const records = verifiedNewsData.records || [];
  const queries = verifiedNewsData.queries || [];
  const evMeta = newsEventsData.metadata || {};

  const totalRecords = records.length;
  const uniqueMedias = new Set(records.map(r => r.source_media)).size;

  document.getElementById('stat-total-news').innerText = `${totalRecords} 筆紀錄`;
  document.getElementById('stat-capture-time').innerText = `涵蓋 ${uniqueMedias} 家媒體 • 擷取：${verifiedNewsData.captured_at}`;
  document.getElementById('stat-total-events').innerText = `${evMeta.total_events_count || 20} 個事件`;
  document.getElementById('stat-events-breakdown').innerText = `單一品牌事件 ${evMeta.focused_brand_events_count || 9} (${evMeta.focused_brand_records_count || 46}筆) • 合集 ${evMeta.multi_brand_roundup_events_count || 3} (${evMeta.multi_brand_roundup_records_count || 41}筆) • 單篇獨立 ${evMeta.unmerged_independent_records_count || 8}`;

  const pttMeta = verifiedPttData.collection_metadata || {};
  document.getElementById('stat-ptt-count').innerText = `${pttMeta.total_articles_collected || 14} 篇 / ${pttMeta.total_pushes_collected || 79} 則推噓文`;

  const queryBox = document.getElementById('query-log-list');
  queryBox.innerHTML = queries.map(q => `
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-extrabold text-sm rounded">${q.query_id}</span>
          <span class="text-sm font-bold text-emerald-700">● ${q.status} (HTTP ${q.http_status})</span>
          <span class="text-sm text-slate-500">擷取時間：${q.captured_at}</span>
        </div>
        <div class="mt-1.5 font-mono text-base text-slate-800 bg-white px-3 py-1.5 rounded border border-slate-200 break-all">
          查詢字串：${q.query_string}
        </div>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <div class="text-right">
          <div class="text-sm text-slate-500">RSS 回傳 / 依連結去重入庫</div>
          <div class="text-lg font-black text-slate-900">${q.raw_items_returned} 筆 ➔ ${q.unique_items_saved} 筆</div>
        </div>
        <a href="${q.rss_url}" target="_blank" rel="noopener noreferrer"
           class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm transition">
          🔗 開啟原始 RSS XML
        </a>
      </div>
    </div>
  `).join('');

  const brandSet = new Set();
  records.forEach(r => {
    if (r.brand_detected && r.brand_detected !== "待確認品牌" && !r.brand_detected.startsWith("多品牌")) {
      brandSet.add(r.brand_detected);
    }
  });
  const brandSelect = document.getElementById('filter-brand-select');
  if (brandSelect) {
    const existingBrandOptions = Array.from(brandSet).map(b => {
      const cnt = records.filter(r => r.brand_detected.includes(b)).length;
      return `<option value="${b}">${b} (提及 ${cnt} 筆)</option>`;
    }).join('');
    brandSelect.innerHTML = `
      <option value="ALL">全部依連結去重紀錄 (共 ${totalRecords} 筆)</option>
      <option value="MULTI">多品牌合集報導 (共 ${records.filter(r => r.brand_detected.startsWith("多品牌")).length} 筆)</option>
      <option value="UNKNOWN">待確認品牌 (共 ${records.filter(r => r.brand_detected === "待確認品牌").length} 筆)</option>
      ${existingBrandOptions}
    `;
  }

  renderCrosscheckCases();
  renderNewsEventsList();
  renderVerifiedNewsList();
  renderPttSection();
  renderCapabilityTable();
  renderIsolatedDemoList();
}

function renderVerifiedNewsList() {
  const records = verifiedNewsData.records || [];
  const filtered = records.filter(r => {
    const matchQuery = currentFilterQuery === "ALL" || r.query_id === currentFilterQuery;
    let matchBrand = true;
    if (currentFilterBrand === "MULTI") matchBrand = r.brand_detected.startsWith("多品牌");
    else if (currentFilterBrand === "UNKNOWN") matchBrand = r.brand_detected === "待確認品牌";
    else if (currentFilterBrand !== "ALL") matchBrand = r.brand_detected.includes(currentFilterBrand);
    return matchQuery && matchBrand;
  });

  const badge = document.getElementById('filtered-count-badge');
  if (badge) {
    badge.innerText = `顯示：${filtered.length} / ${records.length} 筆依連結去重的新聞紀錄`;
  }

  const list = document.getElementById('verified-news-list');
  if (!list) return;
  list.innerHTML = filtered.map(r => {
    return `
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2 py-0.5 text-xs font-mono font-extrabold rounded bg-slate-800 text-white">${r.evidence_id}</span>
            <span class="px-2.5 py-0.5 text-sm font-extrabold rounded bg-emerald-100 text-emerald-900">${r.source_media}</span>
            <span class="text-xs font-mono text-slate-500">發布：${r.published_at} | 擷取：${r.captured_at}</span>
          </div>
          <a href="${r.rss_link}" target="_blank" rel="noopener noreferrer" class="inline-block text-base font-bold text-slate-900 hover:text-emerald-700 underline mt-1">
            ${r.clean_title} ↗
          </a>
        </div>
        <a href="${r.rss_link}" target="_blank" rel="noopener noreferrer"
           class="shrink-0 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg">
          🔗 開啟新聞
        </a>
      </div>
    `;
  }).join('');
}

function renderCapabilityTable() {
  const tbody = document.getElementById('capability-tbody');
  if (!tbody) return;
  tbody.innerHTML = platformCapabilities.map(c => {
    let badgeClass = "bg-slate-200 text-slate-800";
    if (c.status.startsWith("已測試可取得")) badgeClass = "bg-emerald-100 text-emerald-900 border border-emerald-300";
    else if (c.status === "只能取得部分") badgeClass = "bg-amber-100 text-amber-900 border border-amber-300";
    else if (c.status === "本次測試失敗") badgeClass = "bg-rose-100 text-rose-900 border border-rose-300";

    return `
      <tr class="hover:bg-slate-50">
        <td class="p-4 border-r border-slate-200 font-extrabold text-slate-900">${c.platform}</td>
        <td class="p-4 border-r border-slate-200 whitespace-nowrap">
          <span class="px-3 py-1 rounded-full text-sm font-extrabold ${badgeClass}">${c.status}</span>
        </td>
        <td class="p-4 border-r border-slate-200 font-mono text-sm text-slate-700">${c.test_method}</td>
        <td class="p-4 border-r border-slate-200 text-base text-slate-700">${c.test_result}</td>
        <td class="p-4 font-mono text-sm text-slate-500 whitespace-nowrap">${c.tested_at}</td>
      </tr>
    `;
  }).join('');
}

function renderIsolatedDemoList() {
  const container = document.getElementById('isolated-demo-list');
  if (!container) return;
  container.innerHTML = isolatedDemoSample.map(p => `
    <div class="bg-amber-50/60 border-2 border-amber-300 rounded-xl p-5 opacity-90">
      <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 text-sm font-extrabold rounded bg-amber-500 text-slate-950">⚠️ 模擬示範樣本 (無真實來源連結)</span>
          <span class="text-lg font-extrabold text-slate-800">${p.brand} — ${p.name}</span>
        </div>
        <span class="text-base font-bold text-amber-900">模擬展示分：${p.totalScore} (已停用不列入正式統計)</span>
      </div>
      <p class="text-base text-slate-600">原模擬描述：${p.observation}（註：此段文字、價格 ${p.price}、倍數 ${p.multiplier}x 與 UGC ${p.ugcCount} 則皆為早期介面設計之模擬值，待有實際來源網址後方可轉入正式區）</p>
    </div>
  `).join('');
}

window.addEventListener('DOMContentLoaded', () => {
  renderVerifiedDashboard();
});
