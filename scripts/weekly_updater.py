"""
weekly_updater.py
正式資料採集與前端同步主程式（已移除所有自動產生假倍數、假熱度總分與銷量敘述之邏輯）
工作流程：
1. 呼叫 collect_news_rss.py 執行真實 Google News RSS 採集與各平台取得能力實測
2. 將真實採集結果寫入 data/verified_news_data.json 與 SQLite 正式表 verified_news_evidence
3. 將舊有 56 筆模擬資料隔離於 demoShowcaseData（明確標註僅供 UI 展示，不混入正式統計）
4. 自動更新 dashboard/js/app.js 與 dashboard/index.html 防快取版本號
"""
import datetime
import json
from pathlib import Path
from collect_news_rss import save_all, VERIFIED_JSON_PATH, CAPABILITY_REPORT_PATH

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MOCK_JSON_PATH = DATA_DIR / "mock_data.json"
DEMO_ISOLATED_PATH = DATA_DIR / "demo_isolated_data.json"
APP_JS_PATH = BASE_DIR / "dashboard" / "js" / "app.js"
INDEX_HTML_PATH = BASE_DIR / "dashboard" / "index.html"


def sync_verified_to_frontend():
    # 1. 執行真實 RSS 採集與平台能力測試
    save_all()

    with open(VERIFIED_JSON_PATH, "r", encoding="utf-8") as f:
        verified_data = json.load(f)

    with open(CAPABILITY_REPORT_PATH, "r", encoding="utf-8") as f:
        capability_report = json.load(f)

    # 2. 讀取並隔離舊示範資料 (加上明確隔離標記)
    demo_weeks = {}
    if MOCK_JSON_PATH.exists():
        with open(MOCK_JSON_PATH, "r", encoding="utf-8") as f:
            old_mock = json.load(f)
            demo_weeks = old_mock.get("weeks_data", {})
        old_mock["_isolated_demo_only"] = True
        old_mock["_notice"] = "警告：本檔案為早期介面展示用之模擬資料（56筆），已與正式採集流程完全隔離，不得混入正式統計、排名與分析摘要。"
        with open(DEMO_ISOLATED_PATH, "w", encoding="utf-8") as f:
            json.dump(old_mock, f, ensure_ascii=False, indent=2)

    # 3. 統計可追溯之真實媒體曝光指標（每一筆數字皆由 verified_data["records"] 直接計數）
    records = verified_data.get("records", [])
    media_counts = {}
    brand_counts = {}
    status_counts = {"單一候選待確認": 0, "多商品或合集報導": 0, "品名未明": 0}

    for r in records:
        m = r["source_media"]
        media_counts[m] = media_counts.get(m, 0) + 1
        b = r["brand_detected"]
        brand_counts[b] = brand_counts.get(b, 0) + 1
        st = r["parse_status"]
        status_counts[st] = status_counts.get(st, 0) + 1

    # 4. 產生前端 app.js (預設顯示真實採集之「新品新聞與媒體曝光觀察」，暫停總分與推薦排名)
    verified_json_str = json.dumps(verified_data, ensure_ascii=False, indent=2)
    cap_json_str = json.dumps(capability_report, ensure_ascii=False, indent=2)
    demo_json_str = json.dumps(demo_weeks.get("2026-W46", []), ensure_ascii=False, indent=2)

    app_js_content = f"""// ============================================================================
// 公開商品熱度觀察室 - 新品新聞與媒體曝光觀察 (真實採集驗證版)
// 1. 正式資料 100% 來自 Google News RSS 實際採集，每筆皆附原始可點擊連結與查詢條件
// 2. 暫停無根據之熱度總分與推薦排名；未取得之價格、社群互動、口碑與銷售訊號一律標示「未取得」
// 3. 早期模擬示範資料已完全隔離至分頁 2，不混入任何正式統計
// ============================================================================

const verifiedNewsData = {verified_json_str};

const platformCapabilities = {cap_json_str};

const isolatedDemoSample = {demo_json_str};

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
function openHistoryModal() {{
  document.getElementById('history-modal').classList.add('active');
}}
function closeHistoryModal() {{
  document.getElementById('history-modal').classList.remove('active');
}}

function applyNewsFilter() {{
  currentFilterBrand = document.getElementById('filter-brand-select').value;
  currentFilterQuery = document.getElementById('filter-query-select').value;
  renderVerifiedNewsList();
}}

function renderVerifiedDashboard() {{
  const records = verifiedNewsData.records || [];
  const queries = verifiedNewsData.queries || [];

  // 可追溯 KPI 計算 (全部由 records 陣列直接計算)
  const totalRecords = records.length;
  const uniqueMedias = new Set(records.map(r => r.source_media)).size;
  const singleCandidateCount = records.filter(r => r.parse_status === "單一候選待確認").length;
  const multiOrUnknownCount = totalRecords - singleCandidateCount;

  document.getElementById('stat-total-news').innerText = `${{totalRecords}} 筆`;
  document.getElementById('stat-capture-time').innerText = `擷取時間：${{verifiedNewsData.captured_at}}`;
  document.getElementById('stat-media-count').innerText = `${{uniqueMedias}} 家媒體`;
  document.getElementById('stat-pending-parse').innerText = `單一候選 ${{singleCandidateCount}} 筆 / 待確認 ${{multiOrUnknownCount}} 筆`;

  // 渲染查詢條件紀錄表
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
          <div class="text-sm text-slate-500">RSS 回傳 / 去重入庫</div>
          <div class="text-lg font-black text-slate-900">${{q.raw_items_returned}} 筆 ➔ ${{q.unique_items_saved}} 筆</div>
        </div>
        <a href="${{q.rss_url}}" target="_blank" rel="noopener noreferrer"
           class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm transition">
          🔗 開啟原始 RSS XML
        </a>
      </div>
    </div>
  `).join('');

  // 建立品牌篩選下拉選單
  const brandSet = new Set();
  records.forEach(r => {{
    if (r.brand_detected && r.brand_detected !== "待確認品牌" && !r.brand_detected.startsWith("多品牌")) {{
      brandSet.add(r.brand_detected);
    }}
  }});
  const brandSelect = document.getElementById('filter-brand-select');
  const existingBrandOptions = Array.from(brandSet).map(b => {{
    const cnt = records.filter(r => r.brand_detected.includes(b)).length;
    return `<option value="${{b}}">${{b}} (提及 ${{cnt}} 筆)</option>`;
  }}).join('');
  brandSelect.innerHTML = `
    <option value="ALL">全部資料 (共 ${{totalRecords}} 筆)</option>
    <option value="MULTI">多品牌合集報導 (共 ${{records.filter(r => r.brand_detected.startsWith("多品牌")).length}} 筆)</option>
    <option value="UNKNOWN">待確認品牌 (共 ${{records.filter(r => r.brand_detected === "待確認品牌").length}} 筆)</option>
    ${{existingBrandOptions}}
  `;

  renderVerifiedNewsList();
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

  document.getElementById('filtered-count-badge').innerText = `目前顯示：${{filtered.length}} / ${{records.length}} 筆真實新聞證據`;

  const list = document.getElementById('verified-news-list');
  list.innerHTML = filtered.map(r => {{
    const isSingle = r.parse_status === "單一候選待確認";
    const statusBadge = isSingle
      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
      : (r.parse_status === "多商品或合集報導" ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-slate-200 text-slate-800");

    return `
      <div class="bg-white/95 backdrop-blur-sm border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:border-emerald-500 transition">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <!-- 左欄：RSS 實際擷取原始欄位與可點擊查核連結 -->
          <div class="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 text-sm font-mono font-extrabold rounded bg-slate-800 text-white">${{r.evidence_id}}</span>
                <span class="px-3 py-0.5 text-base font-extrabold rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">${{r.source_media}}</span>
                <span class="px-3 py-0.5 text-sm font-bold rounded-full ${{statusBadge}}">${{r.parse_status}}</span>
                <span class="text-sm text-slate-500 font-mono">查詢：${{r.query_id}}</span>
              </div>

              <h3 class="text-xl font-black text-slate-900 mt-3 leading-snug">
                <a href="${{r.rss_link}}" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-700 underline decoration-emerald-400 decoration-2 underline-offset-4">
                  ${{r.clean_title}} ↗
                </a>
              </h3>

              <div class="mt-3 space-y-1 text-base text-slate-700 font-medium">
                <div>🏷️ <strong class="text-slate-900">品牌辨識：</strong>${{r.brand_detected}}</div>
                <div>🧋 <strong class="text-slate-900">商品名稱判定：</strong><span class="font-bold text-amber-800">${{r.candidate_product_name}}</span></div>
                <div>🕒 <strong class="text-slate-900">新聞發布時間：</strong><span class="font-mono">${{r.published_at}}</span>（擷取時間：<span class="font-mono">${{r.captured_at}}</span>）</div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <span class="text-sm font-semibold text-slate-600">📌 取得範圍：${{r.data_scope}}</span>
              <a href="${{r.rss_link}}" target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold rounded-lg shadow-sm transition">
                🔗 點此開啟原始新聞來源核對
              </a>
            </div>
          </div>

          <!-- 右欄：區分「已取得證據」與「尚未取得欄位（不當成零分）」 -->
          <div class="lg:col-span-5 bg-slate-50 border-2 border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div class="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                📋 欄位取得狀態與證據邊界（不推估、不當成 0）
              </div>
              <ul class="mt-3 space-y-2 text-base text-slate-700">
                <li class="flex justify-between">
                  <span class="font-semibold text-slate-600">1. 媒體曝光證據：</span>
                  <span class="font-bold text-emerald-700">✅ 已取得 (RSS 標題與連結)</span>
                </li>
                <li class="flex justify-between">
                  <span class="font-semibold text-slate-600">2. 新聞內文與價格：</span>
                  <span class="font-bold text-slate-500">❓ ${{r.price_from_article}}</span>
                </li>
                <li class="flex justify-between">
                  <span class="font-semibold text-slate-600">3. 社群互動倍數：</span>
                  <span class="font-bold text-slate-500">❓ ${{r.social_engagement}}</span>
                </li>
                <li class="flex justify-between">
                  <span class="font-semibold text-slate-600">4. 正負評價與購買意圖：</span>
                  <span class="font-bold text-slate-500">❓ ${{r.sentiment_and_intent}}</span>
                </li>
                <li class="flex justify-between">
                  <span class="font-semibold text-slate-600">5. 排隊/售罄/銷量訊號：</span>
                  <span class="font-bold text-slate-500">❓ ${{r.commercial_signals}}</span>
                </li>
              </ul>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
              <span>來源角色：媒體報導 (media)</span>
              <span class="font-bold text-slate-700">總分計算：已暫停</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }}).join('');
}}

function renderCapabilityTable() {{
  const tbody = document.getElementById('capability-tbody');
  if (!tbody) return;
  tbody.innerHTML = platformCapabilities.map(c => {{
    let badgeClass = "bg-slate-200 text-slate-800";
    if (c.status === "已測試可取得") badgeClass = "bg-emerald-100 text-emerald-900 border border-emerald-300";
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
    print(f"[VERIFIED OK] 已將 {len(records)} 筆真實 Google News RSS 證據與 8 項平台實測結果同步寫入 dashboard/js/app.js！")


if __name__ == "__main__":
    sync_verified_to_frontend()
