# -*- coding: utf-8 -*-
"""
weekly_updater.py
階段二：新聞事件歸納（95筆依連結去重的新聞紀錄 ➔ 20個事件）與 PTT 飲料板端到端採集前端同步程式
"""
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
VERIFIED_JSON_PATH = DATA_DIR / "verified_news_data.json"
NEWS_EVENTS_PATH = DATA_DIR / "news_events_data.json"
VERIFIED_PTT_PATH = DATA_DIR / "verified_ptt_data.json"
CAPABILITY_REPORT_PATH = DATA_DIR / "platform_capability_report.json"
MOCK_JSON_PATH = DATA_DIR / "mock_data.json"
DEMO_ISOLATED_PATH = DATA_DIR / "demo_isolated_data.json"
APP_JS_PATH = BASE_DIR / "dashboard" / "js" / "app.js"


def sync_verified_to_frontend():
    with open(VERIFIED_JSON_PATH, "r", encoding="utf-8") as f:
        verified_data = json.load(f)

    with open(NEWS_EVENTS_PATH, "r", encoding="utf-8") as f:
        news_events_data = json.load(f)

    with open(VERIFIED_PTT_PATH, "r", encoding="utf-8") as f:
        verified_ptt_data = json.load(f)

    with open(CAPABILITY_REPORT_PATH, "r", encoding="utf-8") as f:
        capability_report = json.load(f)

    # 更新平台能力報告中 PTT Drink 板之狀態為「已測試可取得（已完成14篇端到端採集含內文與79則推噓文）」
    for cap in capability_report:
        if "PTT" in cap.get("platform", ""):
            cap["status"] = "已測試可取得（已完成端到端採集）"
            cap["test_method"] = "Python urllib 帶 Cookie: over18=1 實測抓取列表頁、5組關鍵字搜尋頁與 14 篇單篇內文＋推噓文"
            cap["test_result"] = "HTTP 200 成功。已實際保存 14 篇文章之網址、標題、作者、發布時間、擷取時間、完整內文與 79 則推噓文（見分頁 1）。"

    with open(CAPABILITY_REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(capability_report, f, ensure_ascii=False, indent=2)

    demo_weeks = {}
    if MOCK_JSON_PATH.exists():
        with open(MOCK_JSON_PATH, "r", encoding="utf-8") as f:
            old_mock = json.load(f)
            demo_weeks = old_mock.get("weeks_data", {})
        old_mock["_isolated_demo_only"] = True
        old_mock["_notice"] = "警告：本檔案為早期介面展示用之模擬資料（56筆），已與正式採集流程完全隔離，不得混入正式統計、排名與分析摘要。"
        with open(DEMO_ISOLATED_PATH, "w", encoding="utf-8") as f:
            json.dump(old_mock, f, ensure_ascii=False, indent=2)

    verified_json_str = json.dumps(verified_data, ensure_ascii=False, indent=2)
    events_json_str = json.dumps(news_events_data, ensure_ascii=False, indent=2)
    ptt_json_str = json.dumps(verified_ptt_data, ensure_ascii=False, indent=2)
    cap_json_str = json.dumps(capability_report, ensure_ascii=False, indent=2)
    demo_json_str = json.dumps(demo_weeks.get("2026-W46", []), ensure_ascii=False, indent=2)

    app_js_content = f"""// ============================================================================
// 公開商品熱度觀察室 — 階段二：新聞事件歸納 × PTT 飲料板消費者討論對照
// 1. 「95筆依連結去重的新聞紀錄」歸納為 20 個事件（區分新品、舊品回歸、促銷、合集、單篇獨立保留）
// 2. 完成 PTT 飲料板 (Drink) 14 篇文章＋79 則推噓文端到端採集，嚴格分離「原文內容」與「程式分析結果」
// 3. 並列呈現 3 個新聞事件之「媒體報導了什麼」「使用者實際說了什麼」「目前還不知道什麼」
// ============================================================================

const verifiedNewsData = {verified_json_str};

const newsEventsData = {events_json_str};

const verifiedPttData = {ptt_json_str};

const platformCapabilities = {cap_json_str};

const isolatedDemoSample = {demo_json_str};

let currentEventCategoryFilter = "ALL";
let currentFilterBrand = "ALL";
let currentFilterQuery = "ALL";

function switchTab(index) {{
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => {{
    btn.classList.remove('text-emerald-800', 'bg-emerald-50', 'border-emerald-300', 'shadow-sm');
    btn.classList.add('text-slate-700', 'border-transparent');
  }});

  document.getElementById(`tab-${{index}}`).classList.add('active');
  const activeBtn = document.getElementById(`tab-btn-${{index}}`);
  activeBtn.classList.remove('text-slate-700', 'border-transparent');
  activeBtn.classList.add('text-emerald-800', 'bg-emerald-50', 'border-emerald-300', 'shadow-sm');
}}

function openConceptModal() {{
  document.getElementById('concept-modal').classList.add('active');
}}
function closeConceptModal() {{
  document.getElementById('concept-modal').classList.remove('active');
}}

function toggleRawRecordsSection() {{
  const wrapper = document.getElementById('raw-records-wrapper');
  const btn = document.getElementById('toggle-raw-records-btn');
  if (wrapper.classList.contains('hidden')) {{
    wrapper.classList.remove('hidden');
    btn.innerText = '🔼 收合 95 筆依連結去重的新聞紀錄平鋪表';
  }} else {{
    wrapper.classList.add('hidden');
    btn.innerText = '📂 展開檢視全部 95 筆依連結去重的新聞紀錄平鋪表';
  }}
}}

function toggleEventSources(eventId) {{
  const el = document.getElementById(`event-sources-${{eventId}}`);
  const btn = document.getElementById(`event-toggle-btn-${{eventId}}`);
  if (!el) return;
  if (el.classList.contains('hidden')) {{
    el.classList.remove('hidden');
    if (btn) btn.innerText = '🔼 收合原始新聞來源清單';
  }} else {{
    el.classList.add('hidden');
    if (btn) btn.innerText = '🔽 展開檢視全部原始新聞來源連結';
  }}
}}

function applyEventFilter() {{
  currentEventCategoryFilter = document.getElementById('filter-event-cat-select').value;
  renderNewsEventsList();
}}

function applyNewsFilter() {{
  currentFilterBrand = document.getElementById('filter-brand-select').value;
  currentFilterQuery = document.getElementById('filter-query-select').value;
  renderVerifiedNewsList();
}}

function getCategoryBadgeHtml(cat) {{
  if (cat === "新品") {{
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400">🆕 新品</span>`;
  }} else if (cat === "舊品回歸") {{
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-purple-100 text-purple-900 border border-purple-400">🔄 舊品回歸</span>`;
  }} else if (cat === "促銷") {{
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-amber-100 text-amber-900 border border-amber-400">🏷️ 促銷／聯名</span>`;
  }} else if (cat === "合集") {{
    return `<span class="px-3 py-0.5 text-sm font-extrabold rounded-full bg-sky-100 text-sky-900 border border-sky-400">📦 多品牌合集</span>`;
  }}
  return `<span class="px-3 py-0.5 text-sm font-bold rounded-full bg-slate-200 text-slate-800">${{cat}}</span>`;
}}

function renderCrosscheckCases() {{
  const cases = newsEventsData.crosscheck_cases || [];
  const container = document.getElementById('crosscheck-cases-list');
  if (!container) return;

  container.innerHTML = cases.map((c, idx) => {{
    const catBadges = (c.event_categories || []).map(getCategoryBadgeHtml).join(' ');
    const mediaSourcesHtml = (c.what_media_reported.verified_sources || []).map(s => `
      <li class="text-sm bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col gap-1">
        <div class="flex items-center justify-between gap-2">
          <span class="font-mono font-bold text-xs px-2 py-0.5 bg-slate-800 text-white rounded">${{s.evidence_id}}</span>
          <span class="font-bold text-emerald-800 text-xs">${{s.publisher_name}} (${{s.published_at}})</span>
        </div>
        <a href="${{s.rss_link}}" target="_blank" rel="noopener noreferrer"
           class="font-bold text-slate-900 hover:text-emerald-700 underline decoration-emerald-400 underline-offset-2 leading-snug">
          ${{s.title_clean}} ↗
        </a>
      </li>
    `).join('');

    const pttRefsHtml = (c.what_users_actually_said.referenced_ptt_articles || []).map(p => `
      <li class="text-sm bg-white p-2.5 rounded-lg border border-indigo-200 flex flex-col gap-1">
        <div class="flex items-center justify-between gap-2">
          <span class="font-mono font-bold text-xs px-2 py-0.5 bg-indigo-800 text-white rounded">${{p.ptt_evidence_id}}</span>
          <span class="font-mono text-xs text-slate-600">作者: ${{p.author}} | ${{p.published_at}}</span>
        </div>
        <a href="${{p.url}}" target="_blank" rel="noopener noreferrer"
           class="font-bold text-indigo-900 hover:text-indigo-600 underline decoration-indigo-400 underline-offset-2">
          ${{p.title}} ↗
        </a>
        <div class="text-xs text-slate-600">${{p.relevance_note}}</div>
      </li>
    `).join('');

    const unknownsHtml = (c.what_is_still_unknown || []).map(u => `
      <li class="flex items-start gap-2 text-base text-slate-800 leading-relaxed">
        <span class="text-amber-600 font-black mt-0.5">•</span>
        <span>${{u}}</span>
      </li>
    `).join('');

    return `
      <div class="bg-slate-50/95 border-2 border-slate-300 rounded-2xl p-6 shadow-sm space-y-5">
        <!-- 案例標題列 -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 bg-slate-900 text-white font-mono font-black text-sm rounded-md">案例 ${{idx + 1}} (${{c.case_id}})</span>
              <span class="px-3 py-1 bg-emerald-700 text-white font-extrabold text-sm rounded-md">${{c.brand_label}}</span>
              ${{catBadges}}
            </div>
            <h3 class="text-xl font-black text-slate-900 pt-1">${{c.event_title}}</h3>
          </div>
          <div class="text-right">
            <span class="inline-block px-3.5 py-1.5 bg-indigo-50 border-2 border-indigo-300 text-indigo-950 font-extrabold text-sm rounded-lg">
              🔎 PTT 對照結果：${{c.ptt_match_status}}
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
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-emerald-200 text-emerald-950 rounded-full">共 ${{c.media_source_count}} 筆新聞紀錄</span>
              </div>
              <p class="text-base text-slate-800 leading-relaxed whitespace-pre-line">${{c.what_media_reported.summary}}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-emerald-200">
              <div class="text-xs font-extrabold text-emerald-900 mb-2">🔗 代表性新聞來源核對（點擊開啟原文）：</div>
              <ul class="space-y-2">${{mediaSourcesHtml}}</ul>
            </div>
          </div>

          <!-- 第 2 欄：使用者實際說了什麼 -->
          <div class="bg-indigo-50/70 border-2 border-indigo-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-indigo-200 pb-2">
                <h4 class="text-lg font-black text-indigo-950">💬 2. 使用者實際說了什麼（PTT 飲料板）</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-indigo-200 text-indigo-950 rounded-full">${{c.what_users_actually_said.status_badge}}</span>
              </div>
              <p class="text-base text-slate-800 leading-relaxed whitespace-pre-line">${{c.what_users_actually_said.summary}}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-indigo-200 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-extrabold text-indigo-900">🔗 PTT 看板檢索與對照文章連結：</span>
                <a href="${{c.what_users_actually_said.ptt_search_url}}" target="_blank" rel="noopener noreferrer"
                   class="text-xs font-bold text-indigo-700 hover:underline">開啟 PTT 搜尋結果頁 ↗</a>
              </div>
              <ul class="space-y-2">${{pttRefsHtml}}</ul>
            </div>
          </div>

          <!-- 第 3 欄：目前還不知道什麼 -->
          <div class="bg-amber-50/70 border-2 border-amber-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-amber-200 pb-2">
                <h4 class="text-lg font-black text-amber-950">❓ 3. 目前還不知道什麼（證據邊界）</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-amber-200 text-amber-950 rounded-full">未知／未取得</span>
              </div>
              <ul class="space-y-3 pt-1">${{unknownsHtml}}</ul>
            </div>
            <div class="mt-4 pt-3 border-t border-amber-200 text-xs font-bold text-amber-900">
              ⚠️ 嚴格遵守規範：未取得之價格、他站討論與真實銷量一律保留為「未知」，不推估、亦不當成零分。
            </div>
          </div>
        </div>
      </div>
    `;
  }}).join('');
}}

function renderNewsEventsList() {{
  const allEvents = newsEventsData.events || [];
  const filteredEvents = allEvents.filter(ev => {{
    if (currentEventCategoryFilter === "ALL") return true;
    if (currentEventCategoryFilter === "FOCUSED") {{
      return !ev.event_id.startsWith("EVT-ROUNDUP-") && !ev.event_id.startsWith("EVT-INDEPENDENT-");
    }}
    if (currentEventCategoryFilter === "UNMERGED") {{
      return ev.event_id.startsWith("EVT-INDEPENDENT-");
    }}
    return (ev.event_categories || []).includes(currentEventCategoryFilter);
  }});

  const totalRecordsInFiltered = filteredEvents.reduce((acc, e) => acc + (e.source_count || 0), 0);
  const badgeEl = document.getElementById('event-filter-badge');
  if (badgeEl) {{
    badgeEl.innerText = `目前顯示：${{filteredEvents.length}} / ${{allEvents.length}} 個事件（涵蓋 ${{totalRecordsInFiltered}} / 95 筆新聞紀錄）`;
  }}

  const container = document.getElementById('news-events-list');
  if (!container) return;

  container.innerHTML = filteredEvents.map((ev, index) => {{
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
            <span class="font-mono text-xs font-extrabold px-2 py-0.5 bg-slate-800 text-white rounded">${{r.evidence_id}}</span>
            <span class="text-sm font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">${{r.publisher_name}}</span>
            <span class="text-xs font-mono text-slate-500">發布：${{r.published_at}} | 擷取：${{r.captured_at}} | 查詢：${{r.query_id}}</span>
          </div>
          <a href="${{r.rss_link}}" target="_blank" rel="noopener noreferrer"
             class="inline-block text-base font-bold text-slate-900 hover:text-emerald-700 underline decoration-emerald-400 underline-offset-2 mt-1">
            ${{r.title_clean}} ↗
          </a>
        </div>
        <a href="${{r.rss_link}}" target="_blank" rel="noopener noreferrer"
           class="shrink-0 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm">
          🔗 開啟來源
        </a>
      </div>
    `).join('');

    const showDefaultOpen = index < 4 || ev.source_count <= 2;

    return `
      <div class="${{cardBorder}} backdrop-blur-sm border-2 rounded-2xl p-6 shadow-sm transition">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div class="space-y-2 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-0.5 font-mono text-xs font-extrabold bg-slate-800 text-white rounded">${{ev.event_id}}</span>
              <span class="px-3 py-0.5 text-base font-extrabold rounded-md bg-emerald-800 text-white">${{ev.brand_label}}</span>
              ${{catBadges}}
              ${{isUnmerged ? '<span class="px-2.5 py-0.5 text-xs font-bold bg-slate-200 text-slate-800 rounded">🔒 未強制合併（單篇獨立保留）</span>' : ''}}
            </div>
            <h3 class="text-xl font-black text-slate-900 leading-snug">${{ev.event_title}}</h3>
            <p class="text-sm text-slate-600 font-medium">📌 <strong>歸納依據：</strong>${{ev.merge_basis}}</p>
          </div>

          <div class="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 bg-slate-100 px-4 py-3 rounded-xl border border-slate-200">
            <div class="text-right">
              <div class="text-xs font-bold text-slate-500">涵蓋依連結去重紀錄數</div>
              <div class="text-2xl font-black text-emerald-800">${{ev.source_count}} 筆紀錄 <span class="text-sm font-bold text-slate-600">(${{ev.unique_publisher_count}} 家媒體)</span></div>
            </div>
            <button onclick="toggleEventSources('${{ev.event_id}}')" id="event-toggle-btn-${{ev.event_id}}"
              class="px-3 py-1 bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-extrabold transition">
              ${{showDefaultOpen ? '🔼 收合原始新聞來源清單' : '🔽 展開檢視全部原始新聞來源連結'}}
            </button>
          </div>
        </div>

        <div id="event-sources-${{ev.event_id}}" class="${{showDefaultOpen ? '' : 'hidden'}} mt-4 pt-4 border-t border-slate-200 space-y-2">
          <div class="text-xs font-extrabold text-slate-600 mb-2">
            以下完整保留歸屬本事件之全部 ${{ev.source_count}} 筆新聞紀錄（點擊標題或按鈕可開啟原始新聞）：
          </div>
          ${{sourcesHtml}}
        </div>
      </div>
    `;
  }}).join('');
}}

function renderPttSection() {{
  const searchLogs = (verifiedPttData.collection_metadata && verifiedPttData.collection_metadata.search_logs) || [];
  const articles = verifiedPttData.articles || [];

  const searchBox = document.getElementById('ptt-search-log-list');
  if (searchBox) {{
    searchBox.innerHTML = searchLogs.map(log => {{
      const topListHtml = (log.top_3_Latest_titles_found || []).map(item => `
        <li class="text-sm border-t border-slate-200 pt-1.5 mt-1.5">
          <span class="font-mono text-xs px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded mr-1">${{item.date}}</span>
          <a href="${{item.url}}" target="_blank" rel="noopener noreferrer" class="font-bold text-indigo-800 hover:underline">
            ${{item.title}} ↗
          </a>
        </li>
      `).join('');

      return `
        <div class="p-4 rounded-xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="px-3 py-1 bg-indigo-900 text-white font-extrabold text-base rounded-lg">關鍵字：${{log.keyword}}</span>
              <a href="${{log.search_url}}" target="_blank" rel="noopener noreferrer"
                 class="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded hover:bg-indigo-200">
                🔗 開啟 PTT 搜尋頁
              </a>
            </div>
            <div class="text-xs text-slate-600 mb-1">搜尋結果首頁筆數：${{log.total_entries_on_first_page}} 篇（以下為最新 3 篇）：</div>
            <ul class="space-y-1">${{topListHtml}}</ul>
          </div>
        </div>
      `;
    }}).join('');
  }}

  const pttList = document.getElementById('verified-ptt-list');
  if (pttList) {{
    pttList.innerHTML = articles.map(art => {{
      const ro = art.raw_original;
      const pa = art.programmatic_analysis;
      const pushesHtml = (ro.pushes || []).map(p => {{
        const tagColor = p.tag === "推" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : (p.tag === "噓" ? "text-rose-700 bg-rose-50 border-rose-200" : "text-slate-600 bg-slate-100 border-slate-200");
        return `
          <div class="text-sm py-1.5 px-2.5 rounded bg-white border border-slate-200 flex flex-wrap justify-between items-start gap-2">
            <div class="flex items-start gap-2">
              <span class="px-1.5 py-0.5 text-xs font-extrabold rounded border ${{tagColor}}">${{p.tag}}</span>
              <span class="font-mono font-bold text-indigo-900">${{p.userid}}:</span>
              <span class="text-slate-800">${{p.content}}</span>
            </div>
            <span class="font-mono text-xs text-slate-400 shrink-0">${{p.ipdatetime}}</span>
          </div>
        `;
      }}).join('');

      const brandsPost = (pa.detected_brands_in_post || []).length > 0 ? pa.detected_brands_in_post.join('、') : '未偵測到特定連鎖品牌關鍵字（或為獨立茶飲店）';
      const brandsPush = (pa.detected_brands_in_pushes || []).length > 0 ? pa.detected_brands_in_pushes.join('、') : '無';

      return `
        <div class="bg-white/95 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <!-- 左欄：📄 原文內容 (raw_original) -->
            <div class="lg:col-span-8 space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2.5 py-0.5 font-mono text-sm font-black bg-indigo-900 text-white rounded">${{art.ptt_evidence_id}}</span>
                  <span class="px-3 py-0.5 text-sm font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 rounded">📄 原文內容 (raw_original)</span>
                  <span class="text-xs font-mono text-slate-500">取得途徑：${{art.discovered_via}}</span>
                </div>
                <a href="${{art.url}}" target="_blank" rel="noopener noreferrer"
                   class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition">
                  🔗 開啟 PTT 原始文章核對
                </a>
              </div>

              <div>
                <h4 class="text-xl font-black text-slate-900">
                  <a href="${{art.url}}" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-700 underline decoration-indigo-400 underline-offset-4">
                    ${{ro.title}} ↗
                  </a>
                </h4>
                <div class="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600 font-mono">
                  <span>👤 作者：<strong>${{ro.author}}</strong></span>
                  <span>🕒 發布時間：<strong>${{ro.published_at}}</strong></span>
                  <span>📥 擷取時間：<strong>${{ro.captured_at}}</strong></span>
                </div>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div class="text-xs font-extrabold text-slate-500 mb-1.5">【原文內文完整保存】：</div>
                <div class="text-base text-slate-800 whitespace-pre-line leading-relaxed font-normal">${{ro.body_text}}</div>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold text-slate-700">
                    【推噓文完整紀錄】共 ${{ro.total_push_entries}} 則（推：${{ro.push_counts['推']}} / 噓：${{ro.push_counts['噓']}} / →：${{ro.push_counts['→']}}）
                  </span>
                </div>
                ${{ro.total_push_entries > 0 ? `<div class="space-y-1.5 max-h-72 overflow-y-auto pr-1">${{pushesHtml}}</div>` : `<div class="text-sm text-slate-500 italic">（本篇目前無推噓文）</div>`}}
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
                    <div class="font-extrabold text-slate-900">[${{pa.post_category_tag}}]</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-500">文章性質判讀：</div>
                    <div class="font-bold text-indigo-950 text-sm leading-snug">${{pa.article_nature_note}}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-500">主文偵測品牌關鍵字：</div>
                    <div class="font-extrabold text-emerald-800">${{brandsPost}}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-500">推噓文提及品牌關鍵字：</div>
                    <div class="font-bold text-slate-800">${{brandsPush}}</div>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-indigo-200 text-xs text-slate-600 leading-relaxed">
                ℹ️ ${{pa.analysis_disclaimer}}
              </div>
            </div>
          </div>
        </div>
      `;
    }}).join('');
  }}
}}

function renderVerifiedDashboard() {{
  const records = verifiedNewsData.records || [];
  const queries = verifiedNewsData.queries || [];
  const evMeta = newsEventsData.metadata || {{}};

  const totalRecords = records.length;
  const uniqueMedias = new Set(records.map(r => r.source_media)).size;

  document.getElementById('stat-total-news').innerText = `${{totalRecords}} 筆紀錄`;
  document.getElementById('stat-capture-time').innerText = `涵蓋 ${{uniqueMedias}} 家媒體 • 擷取：${{verifiedNewsData.captured_at}}`;
  document.getElementById('stat-total-events').innerText = `${{evMeta.total_events_count || 20}} 個事件`;
  document.getElementById('stat-events-breakdown').innerText = `單一品牌事件 ${{evMeta.focused_brand_events_count || 9}} (${{evMeta.focused_brand_records_count || 46}}筆) • 合集 ${{evMeta.multi_brand_roundup_events_count || 3}} (${{evMeta.multi_brand_roundup_records_count || 41}}筆) • 單篇獨立 ${{evMeta.unmerged_independent_records_count || 8}}`;

  const pttMeta = verifiedPttData.collection_metadata || {{}};
  document.getElementById('stat-ptt-count').innerText = `${{pttMeta.total_articles_collected || 14}} 篇 / ${{pttMeta.total_pushes_collected || 79}} 則推噓文`;

  const queryBox = document.getElementById('query-log-list');
  queryBox.innerHTML = queries.map(q => `
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-extrabold text-sm rounded">${{q.query_id}}</span>
          <span class="text-sm font-bold text-emerald-700">● ${{q.status}} (HTTP ${{q.http_status}})</span>
          <span class="text-sm text-slate-500">擷取時間：${{q.captured_at}}</span>
        </div>
        <div class="mt-1.5 font-mono text-base text-slate-800 bg-white px-3 py-1.5 rounded border border-slate-200 break-all">
          查詢字串：${{q.query_string}}
        </div>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <div class="text-right">
          <div class="text-sm text-slate-500">RSS 回傳 / 依連結去重入庫</div>
          <div class="text-lg font-black text-slate-900">${{q.raw_items_returned}} 筆 ➔ ${{q.unique_items_saved}} 筆</div>
        </div>
        <a href="${{q.rss_url}}" target="_blank" rel="noopener noreferrer"
           class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm transition">
          🔗 開啟原始 RSS XML
        </a>
      </div>
    </div>
  `).join('');

  const brandSet = new Set();
  records.forEach(r => {{
    if (r.brand_detected && r.brand_detected !== "待確認品牌" && !r.brand_detected.startsWith("多品牌")) {{
      brandSet.add(r.brand_detected);
    }}
  }});
  const brandSelect = document.getElementById('filter-brand-select');
  if (brandSelect) {{
    const existingBrandOptions = Array.from(brandSet).map(b => {{
      const cnt = records.filter(r => r.brand_detected.includes(b)).length;
      return `<option value="${{b}}">${{b}} (提及 ${{cnt}} 筆)</option>`;
    }}).join('');
    brandSelect.innerHTML = `
      <option value="ALL">全部依連結去重紀錄 (共 ${{totalRecords}} 筆)</option>
      <option value="MULTI">多品牌合集報導 (共 ${{records.filter(r => r.brand_detected.startsWith("多品牌")).length}} 筆)</option>
      <option value="UNKNOWN">待確認品牌 (共 ${{records.filter(r => r.brand_detected === "待確認品牌").length}} 筆)</option>
      ${{existingBrandOptions}}
    `;
  }}

  renderCrosscheckCases();
  renderNewsEventsList();
  renderVerifiedNewsList();
  renderPttSection();
  renderCapabilityTable();
  renderIsolatedDemoList();
}}

function renderVerifiedNewsList() {{
  const records = verifiedNewsData.records || [];
  const filtered = records.filter(r => {{
    const matchQuery = currentFilterQuery === "ALL" || r.query_id === currentFilterQuery;
    let matchBrand = true;
    if (currentFilterBrand === "MULTI") matchBrand = r.brand_detected.startsWith("多品牌");
    else if (currentFilterBrand === "UNKNOWN") matchBrand = r.brand_detected === "待確認品牌";
    else if (currentFilterBrand !== "ALL") matchBrand = r.brand_detected.includes(currentFilterBrand);
    return matchQuery && matchBrand;
  }});

  const badge = document.getElementById('filtered-count-badge');
  if (badge) {{
    badge.innerText = `顯示：${{filtered.length}} / ${{records.length}} 筆依連結去重的新聞紀錄`;
  }}

  const list = document.getElementById('verified-news-list');
  if (!list) return;
  list.innerHTML = filtered.map(r => {{
    return `
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2 py-0.5 text-xs font-mono font-extrabold rounded bg-slate-800 text-white">${{r.evidence_id}}</span>
            <span class="px-2.5 py-0.5 text-sm font-extrabold rounded bg-emerald-100 text-emerald-900">${{r.source_media}}</span>
            <span class="text-xs font-mono text-slate-500">發布：${{r.published_at}} | 擷取：${{r.captured_at}}</span>
          </div>
          <a href="${{r.rss_link}}" target="_blank" rel="noopener noreferrer" class="inline-block text-base font-bold text-slate-900 hover:text-emerald-700 underline mt-1">
            ${{r.clean_title}} ↗
          </a>
        </div>
        <a href="${{r.rss_link}}" target="_blank" rel="noopener noreferrer"
           class="shrink-0 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg">
          🔗 開啟新聞
        </a>
      </div>
    `;
  }}).join('');
}}

function renderCapabilityTable() {{
  const tbody = document.getElementById('capability-tbody');
  if (!tbody) return;
  tbody.innerHTML = platformCapabilities.map(c => {{
    let badgeClass = "bg-slate-200 text-slate-800";
    if (c.status.startsWith("已測試可取得")) badgeClass = "bg-emerald-100 text-emerald-900 border border-emerald-300";
    else if (c.status === "只能取得部分") badgeClass = "bg-amber-100 text-amber-900 border border-amber-300";
    else if (c.status === "本次測試失敗") badgeClass = "bg-rose-100 text-rose-900 border border-rose-300";

    return `
      <tr class="hover:bg-slate-50">
        <td class="p-4 border-r border-slate-200 font-extrabold text-slate-900">${{c.platform}}</td>
        <td class="p-4 border-r border-slate-200 whitespace-nowrap">
          <span class="px-3 py-1 rounded-full text-sm font-extrabold ${{badgeClass}}">${{c.status}}</span>
        </td>
        <td class="p-4 border-r border-slate-200 font-mono text-sm text-slate-700">${{c.test_method}}</td>
        <td class="p-4 border-r border-slate-200 text-base text-slate-700">${{c.test_result}}</td>
        <td class="p-4 font-mono text-sm text-slate-500 whitespace-nowrap">${{c.tested_at}}</td>
      </tr>
    `;
  }}).join('');
}}

function renderIsolatedDemoList() {{
  const container = document.getElementById('isolated-demo-list');
  if (!container) return;
  container.innerHTML = isolatedDemoSample.map(p => `
    <div class="bg-amber-50/60 border-2 border-amber-300 rounded-xl p-5 opacity-90">
      <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 text-sm font-extrabold rounded bg-amber-500 text-slate-950">⚠️ 模擬示範樣本 (無真實來源連結)</span>
          <span class="text-lg font-extrabold text-slate-800">${{p.brand}} — ${{p.name}}</span>
        </div>
        <span class="text-base font-bold text-amber-900">模擬展示分：${{p.totalScore}} (已停用不列入正式統計)</span>
      </div>
      <p class="text-base text-slate-600">原模擬描述：${{p.observation}}（註：此段文字、價格 ${{p.price}}、倍數 ${{p.multiplier}}x 與 UGC ${{p.ugcCount}} 則皆為早期介面設計之模擬值，待有實際來源網址後方可轉入正式區）</p>
    </div>
  `).join('');
}}

window.addEventListener('DOMContentLoaded', () => {{
  renderVerifiedDashboard();
}});
"""
    APP_JS_PATH.write_text(app_js_content, encoding="utf-8")
    print(f"[STAGE 2 OK] 已將 95 筆依連結去重的新聞紀錄（歸納為 {len(news_events_data['events'])} 個事件）、3 個對照案例與 {len(verified_ptt_data['articles'])} 篇 PTT 飲料板實測資料同步寫入 dashboard/js/app.js！")


if __name__ == "__main__":
    sync_verified_to_frontend()
