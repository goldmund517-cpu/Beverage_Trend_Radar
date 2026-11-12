# -*- coding: utf-8 -*-
"""
weekly_updater.py
階段三：恢復以商品為主的趨勢工具流程，並將 Google News RSS (95筆紀錄 / 20個事件) 與 PTT 飲料板 (14篇原文 / 79則推噓文)
作為商品的可核對證據來源同步至前端 dashboard/js/app.js。
"""
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / "scripts"))

from build_product_catalog import build_product_catalog

DATA_DIR = BASE_DIR / "data"
VERIFIED_JSON_PATH = DATA_DIR / "verified_news_data.json"
NEWS_EVENTS_PATH = DATA_DIR / "news_events_data.json"
VERIFIED_PTT_PATH = DATA_DIR / "verified_ptt_data.json"
CAPABILITY_REPORT_PATH = DATA_DIR / "platform_capability_report.json"
MOCK_JSON_PATH = DATA_DIR / "mock_data.json"
DEMO_ISOLATED_PATH = DATA_DIR / "demo_isolated_data.json"
APP_JS_PATH = BASE_DIR / "dashboard" / "js" / "app.js"


def sync_verified_to_frontend():
    products_payload = build_product_catalog()

    with open(VERIFIED_JSON_PATH, "r", encoding="utf-8") as f:
        verified_data = json.load(f)
    for r in verified_data.get("records", []):
        if not r.get("publisher_name"):
            r["publisher_name"] = r.get("source_media") or "未知媒體"
        if not r.get("title_clean"):
            r["title_clean"] = r.get("clean_title") or r.get("rss_title") or ""
    with open(NEWS_EVENTS_PATH, "r", encoding="utf-8") as f:
        news_events_data = json.load(f)
    with open(VERIFIED_PTT_PATH, "r", encoding="utf-8") as f:
        verified_ptt_data = json.load(f)
    with open(CAPABILITY_REPORT_PATH, "r", encoding="utf-8") as f:
        capability_report = json.load(f)

    demo_weeks = {}
    if MOCK_JSON_PATH.exists():
        with open(MOCK_JSON_PATH, "r", encoding="utf-8") as f:
            old_mock = json.load(f)
            demo_weeks = old_mock.get("weeks_data", {})
        old_mock["_isolated_demo_only"] = True
        old_mock["_notice"] = "警告：本檔案為早期介面展示用之模擬資料（56筆），已與正式採集流程完全隔離，不得混入正式統計、排名與分析摘要。"
        with open(DEMO_ISOLATED_PATH, "w", encoding="utf-8") as f:
            json.dump(old_mock, f, ensure_ascii=False, indent=2)

    products_json_str = json.dumps(products_payload, ensure_ascii=False, indent=2)
    verified_json_str = json.dumps(verified_data, ensure_ascii=False, indent=2)
    events_json_str = json.dumps(news_events_data, ensure_ascii=False, indent=2)
    ptt_json_str = json.dumps(verified_ptt_data, ensure_ascii=False, indent=2)
    cap_json_str = json.dumps(capability_report, ensure_ascii=False, indent=2)
    demo_json_str = json.dumps(demo_weeks.get("2026-W46", []), ensure_ascii=False, indent=2)

    js_template = r"""// ============================================================================
// 飲品新品市場熱度戰情室 — 商品趨勢總覽 × 新聞與 PTT 證據溯源版
// 分頁 0：商品趨勢總覽（週次觀察、品牌/品類/性質篩選、可解釋排序、50/50商品卡、證據彈窗、ECharts散佈圖）
// 分頁 1：詞雲與品牌比較（ECharts 證據加權詞雲、品牌曝光vs討論長條圖、商品性質結構圖）
// 分頁 2：新聞情報與 PTT 原文庫（3大並列對照案例、20個新聞事件、14篇 PTT 原文 vs 程式分析）
// 分頁 3：資料狀態與系統設定（平台能力實測表、RSS 查詢紀錄、已隔離之早期模擬資料）
// ============================================================================

const verifiedProductsPayload = __PRODUCTS_JSON__;
const verifiedNewsData = __VERIFIED_JSON__;
const newsEventsData = __EVENTS_JSON__;
const verifiedPttData = __PTT_JSON__;
const platformCapabilities = __CAP_JSON__;
const isolatedDemoSample = __DEMO_JSON__;

let currentPeriodId = "ALL";
let currentEntityTypeFilter = "ALL";
let currentProductTypeFilter = "ALL";
let currentProductBrandFilter = "ALL";
let currentProductFlavorFilter = "ALL";
let currentProductSort = "PRIORITY_DESC";

let currentEventCategoryFilter = "ALL";
let currentFilterBrand = "ALL";
let currentFilterQuery = "ALL";

let matrixChartInstance = null;
let wordCloudChartInstance = null;
let brandBarChartInstance = null;
let categoryPieChartInstance = null;

function switchTab(index) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('text-emerald-800', 'bg-emerald-50', 'border-emerald-300', 'shadow-sm');
    btn.classList.add('text-slate-700', 'border-transparent');
  });

  const target = document.getElementById(`tab-${index}`);
  if (target) target.classList.add('active');
  const activeBtn = document.getElementById(`tab-btn-${index}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-700', 'border-transparent');
    activeBtn.classList.add('text-emerald-800', 'bg-emerald-50', 'border-emerald-300', 'shadow-sm');
  }

  if (index === 0) {
    setTimeout(() => { try { renderMatrixChart(); } catch (e) { console.error(e); } }, 60);
  } else if (index === 1) {
    setTimeout(() => {
      try { renderWordCloudChart(true); } catch (e) { console.error(e); }
      try { renderBrandComparisonCharts(true); } catch (e) { console.error(e); }
    }, 60);
  } else if (index === 2) {
    setTimeout(() => {
      try { renderNewsEventsList(); } catch (e) { console.error(e); }
      try { renderCrosscheckCases(); } catch (e) { console.error(e); }
      try { renderPttSection(); } catch (e) { console.error(e); }
      try { updateTab2ScopeBanner(); } catch (e) { console.error(e); }
    }, 30);
  }
}

function openConceptModal() { document.getElementById('concept-modal').classList.add('active'); }
function closeConceptModal() { document.getElementById('concept-modal').classList.remove('active'); }
function openHistoryModal() { document.getElementById('history-modal').classList.add('active'); }
function closeHistoryModal() { document.getElementById('history-modal').classList.remove('active'); }
function closeProductDetailModal() { document.getElementById('product-detail-modal').classList.remove('active'); }

function getCategoryBadgeHtml(cat) {
  if (cat === "新品") {
    return `<span class="px-2.5 py-0.5 text-xs sm:text-sm font-extrabold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400">🆕 新品</span>`;
  } else if (cat === "舊品回歸") {
    return `<span class="px-2.5 py-0.5 text-xs sm:text-sm font-extrabold rounded-full bg-purple-100 text-purple-900 border border-purple-400">🔄 舊品回歸</span>`;
  } else if (cat === "促銷") {
    return `<span class="px-2.5 py-0.5 text-xs sm:text-sm font-extrabold rounded-full bg-amber-100 text-amber-900 border border-amber-400">🏷️ 促銷／聯名</span>`;
  } else if (cat === "合集") {
    return `<span class="px-2.5 py-0.5 text-xs sm:text-sm font-extrabold rounded-full bg-sky-100 text-sky-900 border border-sky-400">📦 多品牌合集</span>`;
  }
  return `<span class="px-2.5 py-0.5 text-xs sm:text-sm font-bold rounded-full bg-slate-200 text-slate-800">${cat}</span>`;
}

// ============================================================================
// 分頁 0：商品趨勢總覽（篩選、排序、商品卡片、證據彈窗、散佈圖）
// ============================================================================
function initPeriodAndProductFilters() {
  const periodSelect = document.getElementById('week-timeline-select');
  const periods = verifiedProductsPayload.observation_periods || [];
  if (periodSelect) {
    periodSelect.innerHTML = periods.map(p => `<option value="${p.period_id}">${p.label}</option>`).join('');
  }

  const products = verifiedProductsPayload.products || [];
  const brands = Array.from(new Set(products.map(p => p.brand))).sort();
  const flavors = Array.from(new Set(products.map(p => p.flavor_category))).sort();

  const brandSelect = document.getElementById('product-brand-select');
  if (brandSelect) {
    brandSelect.innerHTML = `<option value="ALL">全部品牌 (${brands.length} 家)</option>` +
      brands.map(b => `<option value="${b}">${b}</option>`).join('');
  }

  const flavorSelect = document.getElementById('product-flavor-select');
  if (flavorSelect) {
    flavorSelect.innerHTML = `<option value="ALL">全部品類與風味 (${flavors.length} 類)</option>` +
      flavors.map(f => `<option value="${f}">${f}</option>`).join('');
  }
}

function getPeriodLabel(periodId) {
  const periods = verifiedProductsPayload.observation_periods || [];
  const found = periods.find(p => p.period_id === periodId);
  return found ? found.label : periodId;
}

function matchDateToPeriod(dateStr, periodId) {
  if (!periodId || periodId === "ALL") return true;
  if (!dateStr) return false;
  // Normalize YYYY-MM-DD from "2026-11-11 13:30:33" or "Mon Nov 9 16:40:28 2026"
  let isoDate = "";
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    isoDate = dateStr.slice(0, 10);
  } else {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      isoDate = `${y}-${m}-${day}`;
    }
  }
  if (!isoDate) return false;
  if (periodId === "2026-W46") return isoDate >= "2026-11-09" && isoDate <= "2026-11-15";
  if (periodId === "2026-W45") return isoDate >= "2026-11-02" && isoDate <= "2026-11-08";
  if (periodId === "2026-W44") return isoDate >= "2026-10-26" && isoDate <= "2026-11-01";
  if (periodId === "2026-W43") return isoDate >= "2026-10-13" && isoDate <= "2026-10-25";
  return true;
}

function getPeriodFilteredProducts() {
  const allProducts = verifiedProductsPayload.products || [];
  if (currentPeriodId === "ALL") {
    return allProducts.map(p => Object.assign({}, p, {
      period_metrics: p.metrics
    }));
  }
  return allProducts
    .filter(p => (p.observation_weeks || []).includes(currentPeriodId))
    .map(p => {
      const pFocused = (p.resolved_focused_news || []).filter(r => matchDateToPeriod(r.published_at, currentPeriodId));
      const pRoundup = (p.resolved_roundup_news || []).filter(r => matchDateToPeriod(r.published_at, currentPeriodId));
      const pCurPtt = (p.resolved_current_ptt || []).filter(a => matchDateToPeriod((a.raw_original || {}).published_at, currentPeriodId));
      const pRecPtt = currentPeriodId === "2026-W46" ? (p.resolved_recent_push_ptt || []) : [];
      const pTotalNews = pFocused.length + pRoundup.length;
      const pTotalPtt = pCurPtt.length + pRecPtt.length;
      const pPushes = [...pCurPtt, ...pRecPtt].reduce((acc, a) => acc + ((a.raw_original || {}).total_push_entries || 0), 0);
      return Object.assign({}, p, {
        period_focused_news: pFocused,
        period_roundup_news: pRoundup,
        period_metrics: {
          focused_news_count: pFocused.length,
          roundup_news_count: pRoundup.length,
          total_news_count: pTotalNews,
          current_period_ptt_count: pCurPtt.length,
          recent_push_old_post_count: pRecPtt.length,
          total_ptt_count: pTotalPtt,
          total_ptt_pushes: pPushes
        }
      });
    });
}

function selectObservationPeriod(periodId) {
  currentPeriodId = periodId;
  applyProductFilters();
  try { renderWordCloudChart(true); } catch (err) { console.error(err); }
  try { renderBrandComparisonCharts(true); } catch (err) { console.error(err); }
  try { renderNewsEventsList(); } catch (err) { console.error(err); }
  try { renderCrosscheckCases(); } catch (err) { console.error(err); }
  try { renderPttSection(); } catch (err) { console.error(err); }
  try { updateTab2ScopeBanner(); } catch (err) { console.error(err); }
  try { renderVerifiedNewsList(); } catch (err) { console.error(err); }
}

function setEntityTypeFilter(entityVal) {
  currentEntityTypeFilter = entityVal;
  document.querySelectorAll('.entity-filter-btn').forEach(btn => {
    btn.classList.remove('bg-emerald-800', 'text-white', 'shadow-sm');
    btn.classList.add('bg-slate-100', 'text-slate-700');
  });
  const activeBtn = document.getElementById(`entity-btn-${entityVal}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'text-slate-700');
    activeBtn.classList.add('bg-emerald-800', 'text-white', 'shadow-sm');
  }
  applyProductFilters();
}

function setProductTypeFilter(typeVal) {
  currentProductTypeFilter = typeVal;
  document.querySelectorAll('.type-filter-btn').forEach(btn => {
    btn.classList.remove('bg-emerald-700', 'text-white', 'shadow-sm');
    btn.classList.add('bg-slate-100', 'text-slate-700');
  });
  const activeBtn = document.getElementById(`type-btn-${typeVal}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'text-slate-700');
    activeBtn.classList.add('bg-emerald-700', 'text-white', 'shadow-sm');
  }
  applyProductFilters();
}

function getFilteredAndSortedProducts() {
  const allProducts = verifiedProductsPayload.products || [];
  let filtered = allProducts.filter(p => {
    if (currentPeriodId !== "ALL" && !(p.observation_weeks || []).includes(currentPeriodId)) {
      return false;
    }
    if (currentEntityTypeFilter !== "ALL" && p.entity_type !== currentEntityTypeFilter) {
      return false;
    }
    if (currentProductTypeFilter === "PENDING") {
      if (!p.is_pending_confirm) return false;
    } else if (currentProductTypeFilter === "合集") {
      if (!(p.metrics && p.metrics.roundup_news_count > 0) && !(p.item_types || []).includes("合集")) return false;
    } else if (currentProductTypeFilter !== "ALL") {
      if (!(p.item_types || []).includes(currentProductTypeFilter)) return false;
    }
    if (currentProductBrandFilter !== "ALL" && p.brand !== currentProductBrandFilter) {
      return false;
    }
    if (currentProductFlavorFilter !== "ALL" && p.flavor_category !== currentProductFlavorFilter) {
      return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    const ma = a.metrics || {};
    const mb = b.metrics || {};
    if (currentProductSort === "PRIORITY_DESC") {
      const diffPri = (mb.priority_score || 0) - (ma.priority_score || 0);
      if (Math.abs(diffPri) > 0.001) return diffPri;
      const diffDisc = (mb.discussion_score || 0) - (ma.discussion_score || 0);
      if (Math.abs(diffDisc) > 0.001) return diffDisc;
      return (mb.media_score || 0) - (ma.media_score || 0);
    } else if (currentProductSort === "MEDIA_DESC") {
      const diff = (mb.media_score || 0) - (ma.media_score || 0);
      if (Math.abs(diff) > 0.001) return diff;
      return (mb.priority_score || 0) - (ma.priority_score || 0);
    } else if (currentProductSort === "DISCUSSION_DESC") {
      const diff = (mb.discussion_score || 0) - (ma.discussion_score || 0);
      if (Math.abs(diff) > 0.001) return diff;
      return (mb.priority_score || 0) - (ma.priority_score || 0);
    } else if (currentProductSort === "VIDEO_DESC") {
      const diff = (mb.video_score || 0) - (ma.video_score || 0);
      if (Math.abs(diff) > 0.001) return diff;
      return (mb.priority_score || 0) - (ma.priority_score || 0);
    } else if (currentProductSort === "DATE_DESC") {
      return (b.latest_published_at || "").localeCompare(a.latest_published_at || "");
    } else if (currentProductSort === "NEWS_DESC") {
      if (mb.total_news_count !== ma.total_news_count) {
        return mb.total_news_count - ma.total_news_count;
      }
      return mb.focused_news_count - ma.focused_news_count;
    }
    return 0;
  });

  return filtered;
}

function applyProductFilters() {
  const brandSel = document.getElementById('product-brand-select');
  const flavorSel = document.getElementById('product-flavor-select');
  const sortSel = document.getElementById('product-sort-select');
  if (brandSel && brandSel.value) currentProductBrandFilter = brandSel.value;
  if (flavorSel && flavorSel.value) currentProductFlavorFilter = flavorSel.value;
  if (sortSel && sortSel.value) currentProductSort = sortSel.value;

  const filtered = getFilteredAndSortedProducts();
  renderHomepageKpis(filtered);
  renderProductCardList(filtered);
  try { renderMatrixChart(filtered); } catch (err) { console.error(err); }
}

function renderHomepageKpis(filteredProducts) {
  const totalCount = filteredProducts.length;
  const singleCount = filteredProducts.filter(p => p.entity_type === "單品").length;
  const seriesCount = filteredProducts.filter(p => p.entity_type === "系列").length;
  const eventCount = filteredProducts.filter(p => p.entity_type === "活動").length;

  document.getElementById('kpi-product-count').innerText = `${totalCount} 項`;
  document.getElementById('kpi-product-breakdown').innerText =
    `單品 ${singleCount} • 系列 ${seriesCount} • 活動 ${eventCount}（分開統計）`;

  const uniqueNewsIds = new Set();
  let focusedSum = 0;
  let roundupSum = 0;
  filteredProducts.forEach(p => {
    (p.focused_news_ids || []).forEach(id => uniqueNewsIds.add(id));
    (p.roundup_news_ids || []).forEach(id => uniqueNewsIds.add(id));
    focusedSum += p.metrics.focused_news_count;
    roundupSum += p.metrics.roundup_news_count;
  });
  document.getElementById('kpi-news-count').innerText = `${uniqueNewsIds.size} 筆不重複新聞`;
  document.getElementById('kpi-news-breakdown').innerText =
    `單品專文關聯 ${focusedSum} 次 • 合集提及關聯 ${roundupSum} 次`;

  const uniquePttIds = new Set();
  let curPtt = 0, recentPushPtt = 0, histPtt = 0;
  filteredProducts.forEach(p => {
    (p.current_period_ptt_ids || []).forEach(id => uniquePttIds.add(id));
    (p.recent_push_old_post_ids || []).forEach(id => uniquePttIds.add(id));
    (p.historical_ref_ptt_ids || []).forEach(id => uniquePttIds.add(id));
    curPtt += p.metrics.current_period_ptt_count;
    recentPushPtt += p.metrics.recent_push_old_post_count;
    histPtt += p.metrics.historical_ref_ptt_count;
  });
  document.getElementById('kpi-ptt-count').innerText = `${uniquePttIds.size} 篇關聯 PTT 文`;
  document.getElementById('kpi-ptt-breakdown').innerText =
    `當期新文 ${curPtt} • 舊文當期新推 ${recentPushPtt} • 歷史參考 ${histPtt}`;

  const sortLabels = {
    "PRIORITY_DESC": "🌟 優先關注分（試行版 v0.1）",
    "MEDIA_DESC": "📰 媒體曝光分（上限40）",
    "DISCUSSION_DESC": "💬 消費者討論分（上限40）",
    "VIDEO_DESC": "🎬 影音曝光分（上限20）",
    "DATE_DESC": "🕒 最新發布時間",
    "NEWS_DESC": "📰 新聞總筆數排序"
  };
  const sortLabelEl = document.getElementById('kpi-sort-label');
  if (sortLabelEl) sortLabelEl.innerText = sortLabels[currentProductSort] || "🌟 優先關注分（試行版 v0.1）";

  const scoreDescEl = document.getElementById('kpi-score-status-desc');
  if (scoreDescEl) scoreDescEl.innerText = "媒體40% ｜ 討論40% ｜ 影音20%（明訂規則不填模擬分）";

  const badge = document.getElementById('product-filter-count-badge');
  if (badge) {
    badge.innerText = `目前顯示：${totalCount} / ${(verifiedProductsPayload.products || []).length} 項對象`;
  }
}

function renderProductCardList(filteredProducts) {
  const container = document.getElementById('product-card-list');
  if (!container) return;

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="bg-white/95 p-8 rounded-2xl border-2 border-slate-200 text-center text-lg font-bold text-slate-600">
        目前篩選條件下無符合之對象，請調整上方觀察期間、對象分層或性質篩選。
      </div>`;
    return;
  }

  container.innerHTML = filteredProducts.map((p, idx) => {
    let entityBadgeClass = "bg-blue-100 text-blue-900 border-blue-400";
    let entityIcon = "📦 單品";
    if (p.entity_type === "系列") {
      entityBadgeClass = "bg-indigo-100 text-indigo-900 border-indigo-400";
      entityIcon = "🗂️ 系列";
    } else if (p.entity_type === "活動") {
      entityBadgeClass = "bg-amber-100 text-amber-900 border-amber-400";
      entityIcon = "🎪 活動";
    }
    const entityBadge = `<span class="px-2.5 py-0.5 text-xs sm:text-sm font-black rounded-full border ${entityBadgeClass}">${entityIcon}</span>`;

    const typeBadges = (p.item_types || []).map(getCategoryBadgeHtml).join(' ');
    const confirmBadge = p.is_pending_confirm
      ? `<span class="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-amber-50 text-amber-900 border border-amber-400">${p.info_status}</span>`
      : `<span class="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-emerald-50 text-emerald-900 border border-emerald-400">${p.info_status}</span>`;

    const stageBadge = `<span class="px-2 py-0.5 text-xs font-extrabold rounded bg-slate-100 text-slate-700 border border-slate-300">${p.launch_stage || "🚀 首發觀察期"}</span>`;

    const pttBadgeText = p.metrics.current_period_ptt_count > 0
      ? `當期新發文 ${p.metrics.current_period_ptt_count} 篇`
      : (p.metrics.recent_push_old_post_count > 0
          ? `當期新發文 0 篇｜舊文當期新增推文 ${p.metrics.recent_push_old_post_count} 篇（共 ${p.metrics.total_ptt_pushes} 則推文）`
          : (p.metrics.historical_ref_ptt_count > 0
              ? `當期新發文 0 篇｜歷史同品項/同牌參考 ${p.metrics.historical_ref_ptt_count} 篇（共 ${p.metrics.total_ptt_pushes} 則推文）`
              : `本次 PTT 採集範圍內未找到`));

    const coverageHtml = (p.coverage_badges || []).map(b => {
      let bClass = "bg-white text-slate-700 border-slate-300";
      if (b.includes("✅")) bClass = "bg-emerald-50 text-emerald-900 border-emerald-300 font-black";
      else if (b.includes("⚠️")) bClass = "bg-amber-50 text-amber-900 border-amber-300 font-bold";
      else if (b.includes("🚫")) bClass = "bg-slate-100 text-slate-500 border-slate-300";
      return `<span class="px-2 py-0.5 rounded border ${bClass}">${b}</span>`;
    }).join(' ');

    return `
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-slate-200 hover:border-emerald-400 shadow-sm transition p-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <!-- 左欄 (6 cols)：對象規格、評分條、涵蓋範圍與客觀數據 -->
          <div class="lg:col-span-6 flex flex-col justify-between space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-6">
            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 bg-slate-900 text-white font-mono font-extrabold text-xs rounded">#${idx + 1}</span>
                <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-300 font-extrabold text-xs rounded">${p.region}</span>
                <span class="text-lg font-black text-emerald-800">${p.brand}</span>
                ${entityBadge}
                ${typeBadges}
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-xl font-black text-slate-900 leading-snug">${p.product_name}</h3>
                ${stageBadge}
              </div>

              <div>${confirmBadge}</div>

              <!-- 優先關注分與涵蓋標籤儀表板 -->
              <div class="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 p-3 rounded-xl border border-emerald-300 space-y-2">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-baseline gap-2">
                    <span class="text-xs font-black text-slate-700">優先關注分 (試行)：</span>
                    <span class="text-3xl font-black text-emerald-800">${(p.metrics.priority_score || 0).toFixed(1)}</span>
                    <span class="text-xs text-slate-500 font-bold">/ 100</span>
                    <span class="text-slate-300">|</span>
                    <span class="text-xs font-extrabold text-emerald-900 px-2 py-0.5 rounded bg-white border border-emerald-300">📰 媒體 ${(p.metrics.media_score || 0).toFixed(1)}/40</span>
                    <span class="text-xs font-extrabold text-indigo-900 px-2 py-0.5 rounded bg-white border border-indigo-300">💬 討論 ${(p.metrics.discussion_score || 0).toFixed(1)}/40</span>
                    <span class="text-xs font-extrabold text-rose-900 px-2 py-0.5 rounded bg-white border border-rose-300">🎬 影音 ${(p.metrics.video_score || 0).toFixed(1)}/20</span>
                  </div>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-emerald-200/60">
                  <div class="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                    ${coverageHtml}
                  </div>
                  <span class="text-xs text-slate-500 font-medium">💡 依現有證據之研究優先序；缺漏不視為確認零討論</span>
                </div>
              </div>

              <div class="space-y-1.5 pt-1 text-base text-slate-700">
                <div>💰 <strong class="text-slate-900">定價與優惠：</strong>${p.price_promo}</div>
                <div>🍵 <strong class="text-slate-900">風味與品類：</strong>${p.flavor_category} ｜ <strong class="text-slate-900">歸屬期間：</strong><span class="font-mono font-bold text-emerald-800">${(p.observation_weeks || []).join(', ')}</span></div>
                <div>📰 <strong class="text-slate-900">新聞曝光證據：</strong>共 <strong class="text-emerald-700 text-lg">${p.metrics.total_news_count}</strong> 筆（專文 <strong>${p.metrics.focused_news_count}</strong> 筆 ＋ 合集提及 <strong>${p.metrics.roundup_news_count}</strong> 筆，涵蓋 ${p.metrics.unique_publisher_count} 家媒體）➔ 媒體分 <strong class="text-emerald-800">${(p.metrics.media_score || 0).toFixed(1)}/40</strong></div>
                <div>💬 <strong class="text-slate-900">PTT 飲料板討論：</strong><span class="font-bold text-indigo-800">${pttBadgeText}</span> ➔ 討論分 <strong class="text-indigo-800">${(p.metrics.discussion_score || 0).toFixed(1)}/40</strong></div>
                <div>🎬 <strong class="text-slate-900">影音／社群索引：</strong>YouTube 當期 <strong>${p.metrics.current_youtube_count || 0}</strong> 部（全期 ${p.metrics.youtube_video_count || 0} 部）｜ IG/FB 索引 <strong>${p.metrics.social_index_count || 0}</strong> 筆 ➔ 影音分 <strong class="text-rose-800">${(p.metrics.video_score || 0).toFixed(1)}/20</strong></div>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-600">
              <span>📅 最新證據發布日：<strong class="font-mono text-slate-900">${p.latest_published_at}</strong></span>
              <span>🕒 採集時間：<strong class="font-mono text-slate-900">${p.captured_at}</strong></span>
              <span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-300 font-bold">${p.metrics.composite_score_status}</span>
            </div>
          </div>

          <!-- 右欄 (6 cols)：媒體報導重點 vs 消費者實際反應 + 查看證據按鈕 -->
          <div class="lg:col-span-6 flex flex-col justify-between bg-emerald-50/50 rounded-xl border border-emerald-200 p-4 space-y-4">
            <div class="space-y-3">
              <div class="bg-white/90 p-3.5 rounded-lg border border-emerald-200">
                <div class="text-sm font-black text-emerald-900 mb-1">📢 媒體報導了什麼（宣傳與曝光摘要）</div>
                <p class="text-sm sm:text-base text-slate-800 leading-relaxed">${p.media_summary}</p>
              </div>

              <div class="bg-white/90 p-3.5 rounded-lg border border-indigo-200">
                <div class="text-sm font-black text-indigo-900 mb-1">💬 消費者實際說了什麼（PTT 飲料板核對）</div>
                <p class="text-sm sm:text-base text-slate-800 leading-relaxed">${p.consumer_summary}</p>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span class="text-xs font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded border border-amber-300">
                ❓ 待查證／未知項目：${(p.unknowns || []).length} 項
              </span>
              <button onclick="openProductDetailModal('${p.product_id}')"
                class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base rounded-lg shadow-sm transition flex items-center gap-1.5">
                <span>🔍 查看關聯證據明細 ＆ 評分試算（優先關注分 ${(p.metrics.priority_score || 0).toFixed(1)} 分）</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openProductDetailModal(productId) {
  const products = verifiedProductsPayload.products || [];
  const p = products.find(item => item.product_id === productId);
  if (!p) return;

  const badgesEl = document.getElementById('modal-product-badges');
  const titleEl = document.getElementById('modal-product-title');
  const bodyEl = document.getElementById('modal-product-body');

  let entityBadgeClass = "bg-blue-100 text-blue-900 border-blue-400";
  let entityIcon = "📦 單品";
  if (p.entity_type === "系列") {
    entityBadgeClass = "bg-indigo-100 text-indigo-900 border-indigo-400";
    entityIcon = "🗂️ 系列";
  } else if (p.entity_type === "活動") {
    entityBadgeClass = "bg-amber-100 text-amber-900 border-amber-400";
    entityIcon = "🎪 活動";
  }

  badgesEl.innerHTML = `
    <span class="px-2.5 py-0.5 bg-emerald-700 text-white font-extrabold text-xs rounded">${p.brand}</span>
    <span class="px-2.5 py-0.5 text-xs font-black rounded-full border ${entityBadgeClass}">${entityIcon}</span>
    ${(p.item_types || []).map(getCategoryBadgeHtml).join(' ')}
    <span class="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded">${p.info_status}</span>
    <span class="px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded">${p.launch_stage || "🚀 首發觀察期"}</span>
  `;
  titleEl.innerText = `${p.brand} — ${p.product_name}`;

  const renderNewsItems = (list, tagLabel, badgeClass) => {
    if (!list || list.length === 0) {
      return `<div class="text-sm text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-200">無此類別新聞紀錄</div>`;
    }
    return `<div class="space-y-2.5">` + list.map(r => `
      <div class="p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="font-mono font-bold px-2 py-0.5 bg-slate-800 text-white rounded">${r.evidence_id}</span>
            <span class="font-extrabold px-2 py-0.5 rounded ${badgeClass}">${tagLabel}</span>
            <span class="font-bold text-emerald-800">📰 ${r.publisher_name}</span>
            <span class="font-mono text-slate-500">發布：${r.published_at} ｜ 擷取：${r.captured_at}</span>
          </div>
          <a href="${r.rss_link}" target="_blank" rel="noopener noreferrer" class="text-base font-extrabold text-slate-900 hover:text-emerald-700 underline decoration-emerald-400 underline-offset-2 block">
            ${r.title_clean} ↗
          </a>
        </div>
      </div>
    `).join('') + `</div>`;
  };

  const renderPttItems = (list, natureBadge, badgeColor) => {
    if (!list || list.length === 0) return '';
    return list.map(a => {
      const raw = a.raw_original || {};
      const pushes = raw.pushes || [];
      const pushHtml = pushes.map(pu => `
        <div class="text-xs sm:text-sm py-1 border-b border-slate-100 flex items-start gap-2 font-mono">
          <span class="px-1.5 py-0.5 rounded font-bold bg-slate-200 text-slate-800 shrink-0">${pu.tag}</span>
          <span class="font-bold text-indigo-900 shrink-0">${pu.userid}:</span>
          <span class="text-slate-800 flex-1 break-all">${pu.content}</span>
          <span class="text-slate-400 text-xs shrink-0">${pu.ipdatetime}</span>
        </div>
      `).join('');

      return `
        <div class="p-4 bg-white rounded-xl border-2 border-indigo-200 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono font-bold text-xs px-2 py-0.5 bg-indigo-900 text-white rounded">${a.ptt_evidence_id}</span>
              <span class="text-xs font-extrabold px-2.5 py-0.5 rounded ${badgeColor}">${natureBadge}</span>
              <span class="text-xs font-mono text-slate-600">作者：${raw.author} ｜ 發布：${raw.published_at}</span>
            </div>
            <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="text-xs sm:text-sm font-extrabold text-indigo-700 hover:underline">
              🔗 開啟 PTT 原始文章核對 ↗
            </a>
          </div>
          <h5 class="text-lg font-black text-slate-900">${raw.title}</h5>
          <div class="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed">${raw.body_text}</div>
          ${pushes.length > 0 ? `
            <div class="space-y-1 pt-2">
              <div class="text-xs font-extrabold text-slate-700">💬 原始推噓文紀錄（共 ${pushes.length} 則）：</div>
              <div class="max-h-52 overflow-y-auto bg-slate-50/80 p-2.5 rounded border border-slate-200">${pushHtml}</div>
            </div>
          ` : `<div class="text-xs text-slate-500">（本文目前無推噓文）</div>`}
        </div>
      `;
    }).join('');
  };

  const allPttHtml =
    renderPttItems(p.resolved_current_ptt, "🟢 當期新發布討論", "bg-emerald-100 text-emerald-900 border border-emerald-400") +
    renderPttItems(p.resolved_recent_push_ptt, "🔵 舊文於當期新增推文（不混算為當期新文）", "bg-sky-100 text-sky-900 border border-sky-400") +
    renderPttItems(p.resolved_historical_ptt, "🟣 歷史同品項／同品牌參考舊文", "bg-purple-100 text-purple-900 border border-purple-400");

  const breakdownListHtml = (p.score_breakdown || []).map(line => {
    let lineClass = "text-slate-800";
    let icon = "🔹";
    if (line.startsWith("[媒體]")) {
      icon = "📰";
      lineClass = "text-emerald-950 font-bold";
    } else if (line.startsWith("[討論]")) {
      icon = "💬";
      lineClass = "text-indigo-950 font-bold";
    } else if (line.startsWith("[影音]")) {
      icon = "🎬";
      lineClass = "text-rose-950 font-bold";
    } else if (line.startsWith("👉")) {
      icon = "🌟";
      lineClass = "text-amber-950 font-black text-base bg-amber-100/90 p-2.5 rounded-lg border border-amber-300";
    }
    return `<div class="py-1 flex items-start gap-2 text-sm sm:text-base ${lineClass}">
      <span class="shrink-0 mt-0.5">${icon}</span>
      <span class="leading-relaxed">${line}</span>
    </div>`;
  }).join('');

  const sens = p.sensitivity_scores || {};
  const sensRowsHtml = Object.keys(sens).map(key => {
    const s = sens[key];
    return `
      <tr class="hover:bg-slate-50">
        <td class="p-2.5 border-r border-b font-extrabold text-slate-900">${s.label}</td>
        <td class="p-2.5 border-r border-b font-mono text-emerald-800 font-bold">${(s.media_score || 0).toFixed(1)}</td>
        <td class="p-2.5 border-r border-b font-mono text-indigo-800 font-bold">${(s.discussion_score || 0).toFixed(1)}</td>
        <td class="p-2.5 border-r border-b font-mono text-rose-800 font-bold">${(s.video_score || 0).toFixed(1)}</td>
        <td class="p-2.5 border-r border-b font-mono font-black text-slate-900 text-sm">${(s.priority_score || 0).toFixed(1)}</td>
        <td class="p-2.5 border-b font-bold text-emerald-700">${s.rank_note || "排名穩定"}</td>
      </tr>
    `;
  }).join('');

  bodyEl.innerHTML = `
    <!-- 優先關注分 (試行版 v0.1) 計算明細與敏感度對照 -->
    <div class="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 border-2 border-emerald-400 rounded-2xl p-5 shadow-sm space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200 pb-3">
        <div>
          <span class="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">Model v0.1-trial</span>
          <h4 class="text-lg font-black text-slate-900 mt-1">🌟 優先關注分（試行版）計算明細與規則核對</h4>
        </div>
        <div class="text-right">
          <div class="text-2xl font-black text-emerald-900">${(p.metrics.priority_score || 0).toFixed(1)} <span class="text-sm text-slate-600 font-bold">/ 100</span></div>
          <div class="text-xs font-extrabold text-slate-600">媒體 ${(p.metrics.media_score || 0).toFixed(1)}/40 ＋ 討論 ${(p.metrics.discussion_score || 0).toFixed(1)}/40 ＋ 影音 ${(p.metrics.video_score || 0).toFixed(1)}/20</div>
        </div>
      </div>

      <div class="space-y-1 bg-white/80 p-3.5 rounded-xl border border-emerald-200">
        <div class="text-xs font-black text-slate-600 mb-1">📋 逐筆證據計分歷程（完全由 Python build_product_catalog.py 產出）：</div>
        <div class="divide-y divide-slate-100">
          ${breakdownListHtml}
        </div>
      </div>

      <!-- 敏感度分析對照表 -->
      <div class="bg-white/90 p-3.5 rounded-xl border border-slate-200 space-y-2">
        <div class="flex justify-between items-center">
          <div class="text-xs font-black text-slate-800">⚖️ 權重敏感度驗證（測試不同權重方案下之名次穩定性）：</div>
          <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">本次測試組合下排名穩定</span>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-left border border-slate-200 rounded">
            <thead class="bg-slate-100 font-extrabold text-slate-700">
              <tr>
                <th class="p-2 border-r border-b">測試方案與權重結構</th>
                <th class="p-2 border-r border-b">媒體曝光得分 (/40)</th>
                <th class="p-2 border-r border-b">消費者討論得分 (/40)</th>
                <th class="p-2 border-r border-b">影音曝光得分 (/20)</th>
                <th class="p-2 border-r border-b">優先關注總分</th>
                <th class="p-2 border-b">測試排序名次表現</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${sensRowsHtml}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-slate-500 pt-1">
          📌 <strong>計分與客觀原則：</strong>所有分數皆由同一套程式產出，不手填分數；分開商品、系列與聯名活動（活動攻略不直接轉為飲品口味評價；合集觀看均分折算；非當期舊文列歷史參考不計當期分）。未取得社群資料不視為零討論。
        </p>
      </div>
    </div>

    <!-- 三欄對照摘要 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-emerald-50/80 border-2 border-emerald-200 rounded-xl p-4 space-y-2">
        <h4 class="font-black text-emerald-950 text-base">📢 1. 媒體報導了什麼</h4>
        <p class="text-sm sm:text-base text-slate-800 leading-relaxed">${p.media_summary}</p>
      </div>
      <div class="bg-indigo-50/80 border-2 border-indigo-200 rounded-xl p-4 space-y-2">
        <h4 class="font-black text-indigo-950 text-base">💬 2. 使用者實際說了什麼</h4>
        <p class="text-sm sm:text-base text-slate-800 leading-relaxed">${p.consumer_summary}</p>
      </div>
      <div class="bg-amber-50/80 border-2 border-amber-200 rounded-xl p-4 space-y-2">
        <h4 class="font-black text-amber-950 text-base">❓ 3. 目前還不知道什麼</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm sm:text-base text-slate-800">
          ${(p.unknowns || []).map(u => `<li>${u}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- 關聯新聞紀錄明細（區分單品專文 vs 跨品牌合集提及） -->
    <div class="space-y-4 pt-2">
      <h4 class="text-lg font-black text-slate-900 border-b-2 border-emerald-200 pb-2">
        📰 關聯新聞證據明細（共 ${p.metrics.total_news_count} 筆：單品專文 ${p.metrics.focused_news_count} 筆 ＋ 跨品牌合集提及 ${p.metrics.roundup_news_count} 筆）
      </h4>
      <div class="space-y-3">
        <div class="text-sm font-extrabold text-emerald-900">🎯 單品／單一活動專文報導 (${p.metrics.focused_news_count} 筆)：</div>
        ${renderNewsItems(p.resolved_focused_news, "🎯 單品專文", "bg-emerald-100 text-emerald-900")}
        <div class="text-sm font-extrabold text-sky-900 pt-2">📦 跨品牌合集／懶人包提及 (${p.metrics.roundup_news_count} 筆，多商品共用證據)：</div>
        ${renderNewsItems(p.resolved_roundup_news, "📦 合集提及", "bg-sky-100 text-sky-900")}
      </div>
    </div>

    <!-- 關聯 PTT 飲料板討論明細 -->
    <div class="space-y-4 pt-2">
      <h4 class="text-lg font-black text-slate-900 border-b-2 border-indigo-200 pb-2">
        💬 關聯 PTT 飲料板 (bbs/Drink) 原文與推噓文核對（共 ${p.metrics.total_ptt_count} 篇）
      </h4>
      ${allPttHtml || `<div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 font-bold">本次 PTT 飲料板採集範圍內未找到此商品之討論文章。</div>`}
    </div>

    <!-- 線路二：YouTube 開箱與報導影片明細 -->
    <div class="space-y-3 pt-2">
      <h4 class="text-lg font-black text-slate-900 border-b-2 border-rose-200 pb-2">
        🎬 線路二：YouTube 公開搜尋開箱／新聞影片（共 ${(p.resolved_youtube_videos || []).length} 部，含真實觀看數）
      </h4>
      ${(p.resolved_youtube_videos || []).length > 0 ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-3">` + (p.resolved_youtube_videos || []).map(v => `
        <div class="p-3.5 bg-rose-50/40 rounded-xl border border-rose-200 flex flex-col justify-between gap-2">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center justify-between gap-1 text-xs">
              <span class="px-2 py-0.5 bg-rose-700 text-white font-mono font-bold rounded">${v.yt_evidence_id}</span>
              <span class="font-extrabold text-rose-900">👁️ ${v.view_count_text} ｜ ⏱️ ${v.duration_text}</span>
            </div>
            <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="text-base font-extrabold text-slate-900 hover:text-rose-700 underline decoration-rose-400 block">
              ${v.title} ↗
            </a>
          </div>
          <div class="text-xs font-bold text-slate-600 flex justify-between">
            <span>📺 頻道：${v.channel_name}</span>
            <span>📅 發布：${v.published_time_text}</span>
          </div>
        </div>
      `).join('') + `</div>` : `<div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">本次 YouTube 關鍵字採集無直接對應影片。</div>`}
    </div>

    <!-- 線路三：IG / FB 公開搜尋引擎索引貼文明細 -->
    <div class="space-y-3 pt-2">
      <h4 class="text-lg font-black text-slate-900 border-b-2 border-sky-200 pb-2">
        📸 線路三：Instagram ／ Facebook 搜尋引擎公開索引貼文（共 ${(p.resolved_social_posts || []).length} 筆）
      </h4>
      ${(p.resolved_social_posts || []).length > 0 ? `<div class="space-y-2.5">` + (p.resolved_social_posts || []).map(s => `
        <div class="p-3.5 bg-sky-50/40 rounded-xl border border-sky-200 space-y-1.5">
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 bg-sky-800 text-white font-mono font-bold rounded">${s.social_evidence_id}</span>
              <span class="font-extrabold text-sky-900">${s.platform}</span>
              <span class="font-mono text-slate-500">查詢：${s.query_used}</span>
            </div>
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="font-extrabold text-sky-700 hover:underline">🔗 開啟原始貼文 ↗</a>
          </div>
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-base font-extrabold text-slate-900 hover:text-sky-800 underline block">
            ${s.title}
          </a>
          <p class="text-sm text-slate-700 leading-relaxed">${s.snippet}</p>
        </div>
      `).join('') + `</div>` : `<div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">本次搜尋引擎公開索引採集無直接對應貼文。</div>`}
    </div>
  `;

  document.getElementById('product-detail-modal').classList.add('active');
}

function renderMatrixChart(filteredProducts) {
  const chartDom = document.getElementById('chart-matrix');
  if (!chartDom || typeof echarts === 'undefined') return;
  if (!matrixChartInstance) {
    matrixChartInstance = echarts.init(chartDom);
    matrixChartInstance.on('click', function(params) {
      if (params.data && params.data.productId) {
        openProductDetailModal(params.data.productId);
      }
    });
  }

  const list = filteredProducts || getFilteredAndSortedProducts();
  const seriesData = list.map(p => {
    let pointColor = '#2563eb';
    let borderColor = '#1d4ed8';
    if (p.entity_type === '系列') {
      pointColor = '#7c3aed';
      borderColor = '#6d28d9';
    } else if (p.entity_type === '活動') {
      pointColor = '#d97706';
      borderColor = '#b45309';
    }
    return {
      name: p.short_word,
      productId: p.product_id,
      brand: p.brand,
      entityType: p.entity_type,
      value: [
        p.metrics.media_score,
        p.metrics.discussion_score,
        Math.max(16, (p.metrics.priority_score || 0) * 0.95)
      ],
      priorityScore: p.metrics.priority_score,
      mediaScore: p.metrics.media_score,
      discussionScore: p.metrics.discussion_score,
      videoScore: p.metrics.video_score,
      focusedNews: p.metrics.focused_news_count,
      roundupNews: p.metrics.roundup_news_count,
      pttCount: p.metrics.total_ptt_count,
      pttPushes: p.metrics.total_ptt_pushes,
      itemStyle: {
        color: pointColor,
        opacity: 0.85,
        borderColor: borderColor,
        borderWidth: 1.5
      }
    };
  });

  matrixChartInstance.setOption({
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        const d = params.data;
        return `<div style="font-weight:bold;font-size:14px;margin-bottom:4px;">[${d.entityType}] ${d.name}</div>
                🌟 <b>優先關注分：${d.priorityScore.toFixed(1)} 分</b><br/>
                📰 媒體曝光得分：<b>${d.mediaScore.toFixed(1)} / 40</b>（專文 ${d.focusedNews} + 合集 ${d.roundupNews}）<br/>
                💬 消費者討論得分：<b>${d.discussionScore.toFixed(1)} / 40</b>（PTT ${d.pttCount} 篇 / ${d.pttPushes} 推文）<br/>
                🎬 影音曝光得分：<b>${d.videoScore.toFixed(1)} / 20</b><br/>
                <span style="color:#059669;font-size:12px;font-weight:bold;">點擊圓點開啟證據與計分明細視窗</span>`;
      }
    },
    grid: { left: '8%', right: '8%', top: '12%', bottom: '15%' },
    xAxis: {
      name: '媒體曝光得分 (/40)',
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value',
      min: 0,
      max: 42,
      minInterval: 5
    },
    yAxis: {
      name: '消費者討論得分 (/40)',
      nameLocation: 'middle',
      nameGap: 40,
      type: 'value',
      min: 0,
      max: 42,
      minInterval: 5
    },
    series: [{
      type: 'scatter',
      data: seriesData,
      symbolSize: function(val) { return Math.min(50, Math.max(16, val[2])); },
      label: {
        show: true,
        formatter: function(param) { return param.data.name; },
        position: 'top',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b'
      }
    }]
  });
}

// ============================================================================
// 分頁 1：詞雲與品牌比較（隨上方「觀察期間」動態連動）
// ============================================================================
function renderWordCloudChart(forceReinit) {
  const products = getPeriodFilteredProducts();
  const allProductsCount = (verifiedProductsPayload.products || []).length;
  const periodNewsTotal = (verifiedNewsData.records || []).filter(r => matchDateToPeriod(r.published_at, currentPeriodId)).length;

  const bannerEl = document.getElementById('tab1-scope-banner');
  if (bannerEl) {
    bannerEl.innerHTML = `
      <div class="flex flex-wrap items-center gap-2 text-base font-extrabold">
        <span class="px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded font-black">📅 目前統計區間：${currentPeriodId === "ALL" ? "全部已採集期間 (10/13~11/12)" : currentPeriodId}</span>
        <span>➔ 當期涵蓋商品：<strong>${products.length} / ${allProductsCount} 款</strong></span>
        <span>｜</span>
        <span>當期發布新聞：<strong>${periodNewsTotal} / 95 筆</strong></span>
      </div>
      <span class="text-xs font-bold text-emerald-200">切換頂部「觀察期間」下拉選單即可即時重繪下方詞雲與品牌圖表</span>
    `;
  }

  const titleEl = document.getElementById('tab1-wordcloud-title');
  if (titleEl) {
    titleEl.innerText = `☁️ 候選商品證據聲量詞雲（[${currentPeriodId}] 共 ${products.length} 款商品關鍵字）`;
  }

  if (products.length > 0) {
    renderWordCloudDetailPanel(products[0].product_id);
  }
  const chartDom = document.getElementById('chart-wordcloud');
  if (!chartDom || typeof echarts === 'undefined') return;

  // Only init ECharts when tab-1 is visible so canvas is never 0x0
  const tab1El = document.getElementById('tab-1');
  if (tab1El && !tab1El.classList.contains('active')) {
    return;
  }

  if (wordCloudChartInstance && forceReinit) {
    wordCloudChartInstance.dispose();
    wordCloudChartInstance = null;
  }
  if (!wordCloudChartInstance) {
    wordCloudChartInstance = echarts.init(chartDom);
    wordCloudChartInstance.on('click', function(params) {
      if (params.data && params.data.productId) {
        renderWordCloudDetailPanel(params.data.productId);
      }
    });
  } else {
    wordCloudChartInstance.resize();
  }

  const palette = ['#047857', '#0f766e', '#1d4ed8', '#4338ca', '#7e22ce', '#b45309', '#be123c'];
  const wcData = [];
  products.forEach((p, idx) => {
    const pm = p.period_metrics || p.metrics;
    wcData.push({
      name: p.short_word,
      value: Math.max(14, pm.total_news_count * 4 + pm.total_ptt_count * 10 + pm.total_ptt_pushes * 2),
      productId: p.product_id,
      textStyle: { color: palette[idx % palette.length] }
    });
    // Add flavor/brand sub-tag for richer period-specific cloud
    wcData.push({
      name: `${p.brand.split(' ')[0]}・${p.flavor_category.split('／')[0]}`,
      value: Math.max(8, pm.total_news_count * 2 + pm.total_ptt_count * 5),
      productId: p.product_id,
      textStyle: { color: palette[(idx + 3) % palette.length] }
    });
  });

  wordCloudChartInstance.setOption({
    tooltip: {
      show: true,
      formatter: function(item) {
        return `<b>${item.name}</b><br/>點擊於右側查看 [${currentPeriodId}] 商品證據摘要`;
      }
    },
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      sizeRange: [15, 40],
      rotationRange: [0, 0],
      gridSize: 10,
      drawOutOfBound: false,
      textStyle: { fontFamily: 'sans-serif', fontWeight: 'bold' },
      data: wcData
    }]
  }, true);
}

function renderWordCloudDetailPanel(productId) {
  const panel = document.getElementById('wordcloud-detail-panel');
  if (!panel) return;
  const products = getPeriodFilteredProducts();
  const p = products.find(item => item.product_id === productId) || products[0];
  if (!p) {
    panel.innerHTML = `<div class="p-4 text-slate-600 font-bold">此觀察期間無符合之商品資料。</div>`;
    return;
  }
  const pm = p.period_metrics || p.metrics;

  panel.innerHTML = `
    <div class="space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="px-2.5 py-0.5 bg-slate-900 text-amber-300 font-mono font-bold text-xs rounded">📅 統計期間：${currentPeriodId}</span>
        <span class="px-2.5 py-0.5 bg-emerald-700 text-white font-extrabold text-xs rounded">${p.brand}</span>
        ${(p.item_types || []).map(getCategoryBadgeHtml).join(' ')}
      </div>
      <h3 class="text-xl font-black text-slate-900">${p.product_name}</h3>
      <div class="text-sm font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded border border-amber-300">${p.info_status}</div>
      <div class="text-sm sm:text-base text-slate-700 space-y-1 pt-1">
        <div>💰 <strong>定價／促銷：</strong>${p.price_promo}</div>
        <div>📰 <strong>當期新聞曝光 (${currentPeriodId})：</strong>共 <strong class="text-emerald-800">${pm.total_news_count}</strong> 筆（專文 ${pm.focused_news_count} ＋ 合集 ${pm.roundup_news_count}）｜全期累計 ${p.metrics.total_news_count} 筆</div>
        <div>💬 <strong>當期 PTT 討論 (${currentPeriodId})：</strong>共 <strong class="text-indigo-800">${pm.total_ptt_count}</strong> 篇（全期累計 ${p.metrics.total_ptt_count} 篇 / ${p.metrics.total_ptt_pushes} 推文）</div>
      </div>
      <div class="bg-white p-3 rounded-lg border border-emerald-200 text-sm text-slate-800">
        <strong class="text-emerald-900">📢 媒體重點：</strong>${p.media_summary}
      </div>
      <div class="bg-white p-3 rounded-lg border border-indigo-200 text-sm text-slate-800">
        <strong class="text-indigo-900">💬 消費者反應：</strong>${p.consumer_summary}
      </div>
    </div>
    <div class="pt-4 mt-4 border-t border-emerald-200">
      <button onclick="openProductDetailModal('${p.product_id}')" class="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-lg shadow transition">
        🔍 開啟完整證據視窗（核對新聞與 PTT 原文）
      </button>
    </div>
  `;
}

function renderBrandComparisonCharts(forceReinit) {
  const products = getPeriodFilteredProducts();
  const brandChartTitle = document.getElementById('tab1-brand-chart-title');
  if (brandChartTitle) {
    brandChartTitle.innerText = `🏢 [${currentPeriodId}] 各品牌「單品專文 vs 合集提及 vs PTT 討論」比較`;
  }
  const pieChartTitle = document.getElementById('tab1-pie-chart-title');
  if (pieChartTitle) {
    pieChartTitle.innerText = `🗂️ [${currentPeriodId}] 所選期間商品之「項目性質」結構（共 ${products.length} 款）`;
  }

  const tab1El = document.getElementById('tab-1');
  if (tab1El && !tab1El.classList.contains('active')) {
    return;
  }

  const brandStats = {};
  products.forEach(p => {
    const b = p.brand;
    const pm = p.period_metrics || p.metrics;
    if (!brandStats[b]) {
      brandStats[b] = { focused: 0, roundup: 0, ptt: 0 };
    }
    brandStats[b].focused += pm.focused_news_count;
    brandStats[b].roundup += pm.roundup_news_count;
    brandStats[b].ptt += pm.total_ptt_count;
  });

  const brands = Object.keys(brandStats);
  const barDom = document.getElementById('chart-brand-multipliers');
  if (barDom && typeof echarts !== 'undefined') {
    if (brandBarChartInstance && forceReinit) {
      brandBarChartInstance.dispose();
      brandBarChartInstance = null;
    }
    if (!brandBarChartInstance) brandBarChartInstance = echarts.init(barDom);
    else brandBarChartInstance.resize();
    brandBarChartInstance.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['單品專文新聞', '跨品牌合集提及', 'PTT 討論篇數'], bottom: 0 },
      grid: { left: '4%', right: '4%', top: '8%', bottom: '18%', containLabel: true },
      xAxis: { type: 'category', data: brands, axisLabel: { interval: 0, rotate: 20, fontSize: 11, fontWeight: 'bold' } },
      yAxis: { type: 'value', minInterval: 1 },
      series: [
        { name: '單品專文新聞', type: 'bar', stack: 'news', data: brands.map(b => brandStats[b].focused), itemStyle: { color: '#059669' } },
        { name: '跨品牌合集提及', type: 'bar', stack: 'news', data: brands.map(b => brandStats[b].roundup), itemStyle: { color: '#38bdf8' } },
        { name: 'PTT 討論篇數', type: 'bar', data: brands.map(b => brandStats[b].ptt), itemStyle: { color: '#4f46e5' } }
      ]
    }, true);
  }

  const pieDom = document.getElementById('chart-category-radar');
  if (pieDom && typeof echarts !== 'undefined') {
    if (categoryPieChartInstance && forceReinit) {
      categoryPieChartInstance.dispose();
      categoryPieChartInstance = null;
    }
    if (!categoryPieChartInstance) categoryPieChartInstance = echarts.init(pieDom);
    else categoryPieChartInstance.resize();
    const newCnt = products.filter(p => (p.item_types || []).includes("新品")).length;
    const retCnt = products.filter(p => (p.item_types || []).includes("舊品回歸")).length;
    const proCnt = products.filter(p => (p.item_types || []).includes("促銷")).length;
    const othCnt = products.filter(p => (p.item_types || []).includes("其他／常態招牌")).length;

    categoryPieChartInstance.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [{
        name: '商品項目性質',
        type: 'pie',
        radius: ['38%', '68%'],
        label: { formatter: '{b}: {c} 款' },
        data: [
          { value: newCnt, name: '🆕 包含新品', itemStyle: { color: '#10b981' } },
          { value: retCnt, name: '🔄 包含舊品回歸', itemStyle: { color: '#a855f7' } },
          { value: proCnt, name: '🏷️ 包含促銷／聯名', itemStyle: { color: '#f59e0b' } },
          { value: othCnt, name: '🍵 常態招牌實測', itemStyle: { color: '#64748b' } }
        ]
      }]
    }, true);
  }
}

// ============================================================================
// 分頁 2 ＆ 分頁 3：保留階段二完整新聞事件、3大對照案例、14篇PTT、能力表與爬蟲歷程
// ============================================================================
function renderCrawlHistoryTable() {
  const tbody = document.getElementById('crawl-history-tbody');
  if (!tbody) return;
  const batches = verifiedProductsPayload.crawl_batches || [];
  tbody.innerHTML = batches.map(b => `
    <tr class="hover:bg-slate-50">
      <td class="p-3.5 border-r border-slate-200 font-mono font-bold text-slate-900">${b.batch_id}</td>
      <td class="p-3.5 border-r border-slate-200 font-mono text-sm text-slate-700">${b.executed_at}</td>
      <td class="p-3.5 border-r border-slate-200 font-bold text-emerald-900">${b.source_pipeline}<div class="text-xs text-slate-500 font-normal mt-0.5">${b.query_scope}</div></td>
      <td class="p-3.5 border-r border-slate-200 text-sm text-slate-800">${b.records_collected}</td>
      <td class="p-3.5 font-extrabold text-emerald-700">${b.status}</td>
    </tr>
  `).join('');
}

function toggleRawRecordsSection() {
  const wrapper = document.getElementById('raw-records-wrapper');
  const btn = document.getElementById('toggle-raw-records-btn');
  if (!wrapper) return;
  if (wrapper.classList.contains('hidden')) {
    wrapper.classList.remove('hidden');
    btn.innerText = '🔼 收合 95 筆依連結去重的新聞紀錄平鋪表';
  } else {
    wrapper.classList.add('hidden');
    btn.innerText = '📂 展開檢視全部 95 筆依連結去重的新聞紀錄平鋪表';
  }
}

function toggleIsolatedDemoSection() {
  const el = document.getElementById('isolated-demo-list');
  const btn = document.getElementById('toggle-demo-btn');
  if (!el) return;
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    btn.innerText = '🔼 收合已隔離之早期模擬卡片';
  } else {
    el.classList.add('hidden');
    btn.innerText = '📂 展開檢視已隔離之早期模擬卡片';
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
  const sel = document.getElementById('filter-event-cat-select');
  if (sel) currentEventCategoryFilter = sel.value;
  document.querySelectorAll('.evt-filter-btn').forEach(btn => {
    btn.classList.remove('bg-emerald-700', 'text-white', 'shadow-sm');
    btn.classList.add('bg-slate-100', 'text-slate-700');
  });
  const activeBtn = document.getElementById(`evt-btn-${currentEventCategoryFilter}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'text-slate-700');
    activeBtn.classList.add('bg-emerald-700', 'text-white', 'shadow-sm');
  }
  renderNewsEventsList();
}

function setEventCategoryFilter(catVal) {
  currentEventCategoryFilter = catVal;
  const sel = document.getElementById('filter-event-cat-select');
  if (sel) sel.value = catVal;
  applyEventFilter();
}

function applyNewsFilter() {
  currentFilterBrand = document.getElementById('filter-brand-select').value;
  currentFilterQuery = document.getElementById('filter-query-select').value;
  renderVerifiedNewsList();
}

function getPeriodEventsBase() {
  const allEvents = newsEventsData.events || [];
  return allEvents.map(ev => {
    const periodSources = currentPeriodId === "ALL"
      ? (ev.source_records || [])
      : (ev.source_records || []).filter(s => matchDateToPeriod(s.published_at, currentPeriodId));
    return Object.assign({}, ev, {
      period_sources: periodSources,
      period_source_count: periodSources.length
    });
  }).filter(ev => ev.period_source_count > 0);
}

function getPeriodPttArticles() {
  const allArticles = verifiedPttData.articles || [];
  if (currentPeriodId === "ALL") return allArticles;
  const periodProducts = getPeriodFilteredProducts();
  const recentPushIds = new Set();
  if (currentPeriodId === "2026-W46") {
    periodProducts.forEach(p => (p.recent_push_old_post_ids || []).forEach(id => recentPushIds.add(id)));
  }
  return allArticles.filter(art => {
    const pubAt = (art.raw_original && art.raw_original.published_at) || "";
    return matchDateToPeriod(pubAt, currentPeriodId) || recentPushIds.has(art.ptt_evidence_id);
  });
}

function updateTab2ScopeBanner() {
  const banner = document.getElementById('tab2-scope-banner');
  if (!banner) return;
  const periodEvents = getPeriodEventsBase();
  const periodNewsCount = periodEvents.reduce((acc, e) => acc + (e.period_source_count || 0), 0);
  const periodProducts = getPeriodFilteredProducts();
  const periodPtt = getPeriodPttArticles();

  banner.innerHTML = `
    <div class="flex flex-wrap items-center gap-2 text-base font-extrabold">
      <span class="px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded font-black">📅 當前查證區間：${currentPeriodId === "ALL" ? "全部期間 (10/13~11/12)" : currentPeriodId}</span>
      <span>➔ 當期新聞事件：<strong>${periodEvents.length} / 20 個（${periodNewsCount} / 95 筆新聞）</strong></span>
      <span>｜</span>
      <span>當期對照商品：<strong>${periodProducts.length} / 16 款</strong></span>
      <span>｜</span>
      <span>當期 PTT 發文／新推文：<strong>${periodPtt.length} / 14 篇</strong></span>
    </div>
    <span class="text-xs font-bold text-emerald-200">切換上方「觀察期間」即可縮小或擴大本頁查證範圍</span>
  `;
}

function renderCrosscheckCases() {
  const container = document.getElementById('crosscheck-cases-list');
  if (!container) return;
  const headingEl = document.getElementById('tab2-cases-heading');
  const badgeEl = document.getElementById('tab2-cases-badge');

  if (currentPeriodId === "ALL") {
    const cases = newsEventsData.crosscheck_cases || [];
    if (headingEl) headingEl.innerText = `🔍 三大代表案例：新聞宣傳訊息 × PTT 消費者實際經驗並列對照（全部期間）`;
    if (badgeEl) badgeEl.innerText = `共 ${cases.length} 組代表案例｜切換上方「觀察期間」可檢視各週次專屬商品對照`;

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

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            <div class="bg-emerald-50/70 border-2 border-emerald-200 rounded-xl p-5 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <h4 class="text-lg font-black text-emerald-950">📢 1. 媒體報導了什麼</h4>
                  <span class="text-xs font-extrabold px-2.5 py-0.5 bg-emerald-200 text-emerald-950 rounded-full">共 ${c.media_source_count} 筆新聞</span>
                </div>
                <p class="text-base text-slate-800 leading-relaxed whitespace-pre-line">${c.what_media_reported.summary}</p>
              </div>
              <div class="mt-4 pt-3 border-t border-emerald-200">
                <div class="text-xs font-extrabold text-emerald-900 mb-2">🔗 代表性新聞來源核對：</div>
                <ul class="space-y-2">${mediaSourcesHtml}</ul>
              </div>
            </div>

            <div class="bg-indigo-50/70 border-2 border-indigo-200 rounded-xl p-5 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between border-b border-indigo-200 pb-2">
                  <h4 class="text-lg font-black text-indigo-950">💬 2. 使用者實際說了什麼</h4>
                  <span class="text-xs font-extrabold px-2.5 py-0.5 bg-indigo-200 text-indigo-950 rounded-full">${c.what_users_actually_said.status_badge}</span>
                </div>
                <p class="text-base text-slate-800 leading-relaxed whitespace-pre-line">${c.what_users_actually_said.summary}</p>
              </div>
              <div class="mt-4 pt-3 border-t border-indigo-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold text-indigo-900">🔗 PTT 看板檢索與對照文章：</span>
                  <a href="${c.what_users_actually_said.ptt_search_url}" target="_blank" rel="noopener noreferrer"
                     class="text-xs font-bold text-indigo-700 hover:underline">開啟 PTT 搜尋頁 ↗</a>
                </div>
                <ul class="space-y-2">${pttRefsHtml}</ul>
              </div>
            </div>

            <div class="bg-amber-50/70 border-2 border-amber-200 rounded-xl p-5 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between border-b border-amber-200 pb-2">
                  <h4 class="text-lg font-black text-amber-950">❓ 3. 目前還不知道什麼</h4>
                  <span class="text-xs font-extrabold px-2.5 py-0.5 bg-amber-200 text-amber-950 rounded-full">保留不確定性</span>
                </div>
                <ul class="space-y-3 pt-1">${unknownsHtml}</ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    return;
  }

  // Period-specific product cross-check cases
  const periodProducts = getPeriodFilteredProducts();
  if (headingEl) headingEl.innerText = `🔍 [${currentPeriodId}] 當期商品案例查證：媒體報導 × PTT 消費者實際經驗並列對照`;
  if (badgeEl) badgeEl.innerText = `[${currentPeriodId}] 共篩選出 ${periodProducts.length} 款當期商品對照案例`;

  container.innerHTML = periodProducts.map((p, idx) => {
    const pm = p.period_metrics || p.metrics;
    const catBadges = (p.item_types || []).map(getCategoryBadgeHtml).join(' ');
    const periodNewsList = [...(p.period_focused_news || []), ...(p.period_roundup_news || [])].slice(0, 4);
    const mediaSourcesHtml = periodNewsList.length > 0 ? periodNewsList.map(s => `
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
    `).join('') : `<li class="text-xs text-slate-500 p-2 bg-white rounded border border-slate-200">本商品於此期間主要由 PTT 實測文觸發觀察（無當週新聞）</li>`;

    const allPtt = [...(p.resolved_current_ptt || []), ...(p.resolved_recent_push_ptt || []), ...(p.resolved_historical_ptt || [])];
    const pttRefsHtml = allPtt.length > 0 ? allPtt.map(a => {
      const raw = a.raw_original || {};
      return `
        <li class="text-sm bg-white p-2.5 rounded-lg border border-indigo-200 flex flex-col gap-1">
          <div class="flex items-center justify-between gap-2">
            <span class="font-mono font-bold text-xs px-2 py-0.5 bg-indigo-800 text-white rounded">${a.ptt_evidence_id}</span>
            <span class="font-mono text-xs text-slate-600">作者: ${raw.author} | ${raw.published_at}</span>
          </div>
          <a href="${a.url}" target="_blank" rel="noopener noreferrer"
             class="font-bold text-indigo-900 hover:text-indigo-600 underline decoration-indigo-400 underline-offset-2">
            ${raw.title} ↗
          </a>
        </li>
      `;
    }).join('') : `<li class="text-xs text-slate-500 p-2 bg-white rounded border border-indigo-100">本次 PTT 採集範圍內未找到此商品之討論文章</li>`;

    const unknownsHtml = (p.unknowns || []).map(u => `
      <li class="flex items-start gap-2 text-base text-slate-800 leading-relaxed">
        <span class="text-amber-600 font-black mt-0.5">•</span>
        <span>${u}</span>
      </li>
    `).join('');

    return `
      <div class="bg-slate-50/95 border-2 border-slate-300 rounded-2xl p-6 shadow-sm space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 bg-slate-900 text-amber-300 font-mono font-black text-sm rounded-md">[${currentPeriodId}] 案例 #${idx + 1}</span>
              <span class="px-3 py-1 bg-emerald-700 text-white font-extrabold text-sm rounded-md">${p.brand}</span>
              ${catBadges}
            </div>
            <h3 class="text-xl font-black text-slate-900 pt-1">${p.product_name}</h3>
          </div>
          <button onclick="openProductDetailModal('${p.product_id}')" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-lg shadow-sm">
            🔍 開啟完整證據明細
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <div class="bg-emerald-50/70 border-2 border-emerald-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
                <h4 class="text-lg font-black text-emerald-950">📢 1. 媒體報導了什麼</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-emerald-200 text-emerald-950 rounded-full">當期 ${pm.total_news_count} 筆 / 全期 ${p.metrics.total_news_count} 筆</span>
              </div>
              <p class="text-base text-slate-800 leading-relaxed">${p.media_summary}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-emerald-200">
              <div class="text-xs font-extrabold text-emerald-900 mb-2">🔗 當期 (${currentPeriodId}) 新聞來源核對：</div>
              <ul class="space-y-2">${mediaSourcesHtml}</ul>
            </div>
          </div>

          <div class="bg-indigo-50/70 border-2 border-indigo-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-indigo-200 pb-2">
                <h4 class="text-lg font-black text-indigo-950">💬 2. 使用者實際說了什麼</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-indigo-200 text-indigo-950 rounded-full">關聯 PTT ${p.metrics.total_ptt_count} 篇</span>
              </div>
              <p class="text-base text-slate-800 leading-relaxed">${p.consumer_summary}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-indigo-200 space-y-2">
              <div class="text-xs font-extrabold text-indigo-900">🔗 關聯 PTT 文章核對：</div>
              <ul class="space-y-2">${pttRefsHtml}</ul>
            </div>
          </div>

          <div class="bg-amber-50/70 border-2 border-amber-200 rounded-xl p-5 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-amber-200 pb-2">
                <h4 class="text-lg font-black text-amber-950">❓ 3. 目前還不知道什麼</h4>
                <span class="text-xs font-extrabold px-2.5 py-0.5 bg-amber-200 text-amber-950 rounded-full">待查證項目</span>
              </div>
              <ul class="space-y-3 pt-1">${unknownsHtml}</ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderNewsEventsList() {
  const allEvents = newsEventsData.events || [];
  const periodEvents = getPeriodEventsBase();

  // Compute dynamic category counts within currentPeriodId
  const focusedCnt = periodEvents.filter(e => !e.event_id.startsWith("EVT-ROUNDUP-") && !e.event_id.startsWith("EVT-INDEPENDENT-")).length;
  const unmergedCnt = periodEvents.filter(e => e.event_id.startsWith("EVT-INDEPENDENT-")).length;
  const newCnt = periodEvents.filter(e => (e.event_categories || []).includes("新品")).length;
  const retCnt = periodEvents.filter(e => (e.event_categories || []).includes("舊品回歸")).length;
  const proCnt = periodEvents.filter(e => (e.event_categories || []).includes("促銷")).length;
  const rndCnt = periodEvents.filter(e => (e.event_categories || []).includes("合集")).length;
  const totalPeriodRecords = periodEvents.reduce((acc, e) => acc + (e.period_source_count || 0), 0);

  const headingEl = document.getElementById('tab2-events-heading');
  if (headingEl) {
    headingEl.innerText = currentPeriodId === "ALL"
      ? `🗂️ 20 個新聞事件整理清單（保留全部 95 筆依連結去重的新聞紀錄）`
      : `🗂️ [${currentPeriodId}] 當期新聞事件清單（縮小為 ${periodEvents.length} 個事件 ／ ${totalPeriodRecords} 筆當期新聞紀錄）`;
  }

  // Update button labels with period-specific counts
  const btnLabels = {
    'ALL': `全部事件 (${periodEvents.length})`,
    '新品': `🆕 新品 (${newCnt})`,
    '舊品回歸': `🔄 舊品回歸 (${retCnt})`,
    '促銷': `🏷️ 促銷／聯名 (${proCnt})`,
    '合集': `📦 多品牌合集 (${rndCnt})`,
    'FOCUSED': `🎯 單一品牌事件 (${focusedCnt})`,
    'UNMERGED': `🔒 單篇獨立保留 (${unmergedCnt})`
  };
  Object.keys(btnLabels).forEach(k => {
    const b = document.getElementById(`evt-btn-${k}`);
    if (b) b.innerText = btnLabels[k];
  });

  let filtered = periodEvents;
  if (currentEventCategoryFilter === "FOCUSED") {
    filtered = periodEvents.filter(e => !e.event_id.startsWith("EVT-ROUNDUP-") && !e.event_id.startsWith("EVT-INDEPENDENT-"));
  } else if (currentEventCategoryFilter === "UNMERGED") {
    filtered = periodEvents.filter(e => e.event_id.startsWith("EVT-INDEPENDENT-"));
  } else if (currentEventCategoryFilter !== "ALL") {
    filtered = periodEvents.filter(e => (e.event_categories || []).includes(currentEventCategoryFilter));
  }

  const totalRecordsInFiltered = filtered.reduce((acc, e) => acc + (e.period_source_count || 0), 0);
  const badge = document.getElementById('event-filter-badge');
  if (badge) {
    const periodTag = currentPeriodId === "ALL" ? "全部期間" : currentPeriodId;
    badge.innerText = `[${periodTag}] 顯示：${filtered.length} / ${periodEvents.length} 個當期事件（涵蓋 ${totalRecordsInFiltered} 筆當期新聞）`;
  }

  const container = document.getElementById('news-events-list');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-6 bg-white rounded-xl border-2 border-slate-200 text-center font-bold text-slate-600">此觀察期間（${currentPeriodId}）與分類條件下無符合之新聞事件。</div>`;
    return;
  }

  container.innerHTML = filtered.map((ev, idx) => {
    const catBadges = (ev.event_categories || []).map(getCategoryBadgeHtml).join(' ');
    const activeSources = ev.period_sources || ev.source_records || [];
    const previewSources = activeSources.slice(0, 3);
    const hiddenSources = activeSources.slice(3);

    const renderSourceRow = (s) => `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-emerald-300">
        <div class="space-y-0.5">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="font-mono font-bold px-2 py-0.5 bg-slate-800 text-white rounded">${s.evidence_id}</span>
            <span class="font-bold text-emerald-800">📰 ${s.publisher_name}</span>
            <span class="font-mono text-slate-500">發布: ${s.published_at}</span>
          </div>
          <a href="${s.rss_link}" target="_blank" rel="noopener noreferrer"
             class="text-base font-extrabold text-slate-900 hover:text-emerald-700 underline decoration-emerald-400 underline-offset-2 inline-block">
            ${s.title_clean} ↗
          </a>
        </div>
      </div>
    `;

    return `
      <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border-2 border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3">
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-0.5 bg-slate-900 text-white font-mono font-bold text-xs rounded">Event #${idx + 1} (${ev.event_id})</span>
              <span class="px-3 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-300 font-extrabold text-sm rounded-md">${ev.brand_label}</span>
              ${catBadges}
            </div>
            <h3 class="text-xl font-black text-slate-900">${ev.event_title}</h3>
            <p class="text-sm text-slate-600">📌 <strong>歸納依據：</strong>${ev.merge_basis}</p>
          </div>
          <div class="text-right shrink-0">
            <div class="px-3.5 py-1.5 bg-emerald-100 text-emerald-950 font-black text-base rounded-lg border border-emerald-300">
              ${currentPeriodId === "ALL" ? `保留 ${ev.source_count} 筆新聞紀錄（${ev.unique_publisher_count} 家媒體）` : `本期間 ${ev.period_source_count} 筆新聞（全期共 ${ev.source_count} 筆）`}
            </div>
          </div>
        </div>

        <div class="space-y-2">
          ${previewSources.map(renderSourceRow).join('')}
        </div>

        ${hiddenSources.length > 0 ? `
          <div id="event-sources-${ev.event_id}" class="hidden space-y-2 pt-1">
            ${hiddenSources.map(renderSourceRow).join('')}
          </div>
          <button id="event-toggle-btn-${ev.event_id}" onclick="toggleEventSources('${ev.event_id}')"
            class="text-sm font-extrabold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg border border-emerald-300 transition">
            🔽 展開檢視其餘 ${hiddenSources.length} 筆同事件原始新聞連結
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

function renderPttSection() {
  const meta = verifiedPttData.collection_metadata || {};
  const searchLogs = meta.search_logs || [];
  const allArticles = verifiedPttData.articles || [];
  const articles = getPeriodPttArticles();
  const totalPushesInFiltered = articles.reduce((acc, a) => acc + ((a.raw_original || {}).total_push_entries || 0), 0);

  const pttHeading = document.getElementById('tab2-ptt-heading');
  if (pttHeading) {
    pttHeading.innerText = currentPeriodId === "ALL"
      ? `💬 PTT 飲料板 (bbs/Drink) 端到端採集全文庫（14 篇文章 ＋ 79 則推噓文）`
      : `💬 [${currentPeriodId}] PTT 飲料板當期發文與新推文查證庫（縮小為 ${articles.length} / ${allArticles.length} 篇文章，共 ${totalPushesInFiltered} 則推文）`;
  }
  const pttBadge = document.getElementById('tab2-ptt-badge');
  if (pttBadge) {
    pttBadge.innerText = `[${currentPeriodId}] 顯示：${articles.length} / ${allArticles.length} 篇 PTT 原文`;
  }

  const searchContainer = document.getElementById('ptt-search-log-list');
  if (searchContainer) {
    searchContainer.innerHTML = searchLogs.map(log => {
      const topTitles = (log.top_3_Latest_titles_found || []).map(t => `
        <li class="text-xs text-slate-700 truncate">
          <span class="font-mono font-bold text-indigo-800">[${t.date}]</span>
          <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="hover:underline font-medium">${t.title}</a>
        </li>
      `).join('');
      return `
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-1 bg-indigo-900 text-white font-extrabold text-sm rounded">關鍵字：${log.keyword}</span>
            <a href="${log.search_url}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-indigo-700 hover:underline">開啟 PTT 搜尋頁 ↗</a>
          </div>
          <div class="text-xs font-bold text-slate-600">首頁結果數：${log.total_entries_on_first_page} 篇（依時間最新排序前 3 篇）：</div>
          <ul class="space-y-1">${topTitles}</ul>
        </div>
      `;
    }).join('');
  }

  const listContainer = document.getElementById('verified-ptt-list');
  if (!listContainer) return;

  listContainer.innerHTML = articles.map(art => {
    const raw = art.raw_original || {};
    const prog = art.programmatic_analysis || {};
    const pushes = raw.pushes || [];

    const pushesHtml = pushes.slice(0, 8).map(p => {
      const tagColor = p.tag === '推' ? 'bg-emerald-100 text-emerald-900' : (p.tag === '噓' ? 'bg-rose-100 text-rose-900' : 'bg-slate-200 text-slate-800');
      return `
        <div class="text-xs sm:text-sm py-1 border-b border-slate-100 flex items-start gap-2 font-mono">
          <span class="px-1.5 py-0.5 rounded font-bold ${tagColor} shrink-0">${p.tag}</span>
          <span class="font-bold text-indigo-900 shrink-0">${p.userid}:</span>
          <span class="text-slate-800 flex-1 break-all">${p.content}</span>
          <span class="text-slate-400 text-xs shrink-0">${p.ipdatetime}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
        <div class="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <span class="px-2.5 py-0.5 bg-indigo-500 text-white font-mono font-bold text-xs rounded">${art.ptt_evidence_id}</span>
            <span class="text-sm font-bold text-slate-300">採集來源：${art.discovered_via}</span>
          </div>
          <a href="${art.url}" target="_blank" rel="noopener noreferrer"
             class="text-sm font-extrabold text-amber-300 hover:text-amber-200 underline">
            🔗 開啟 PTT 原始文章網址核對 (${art.url}) ↗
          </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          <div class="lg:col-span-8 p-6 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-200 pb-2">
              <span class="px-3 py-1 bg-slate-100 text-slate-900 font-black text-sm rounded border border-slate-300">📄 原文內容 (raw_original)</span>
              <span class="text-xs font-mono text-slate-500">擷取時間：${raw.captured_at}</span>
            </div>
            <div>
              <h4 class="text-xl font-black text-slate-900">${raw.title}</h4>
              <div class="text-sm font-mono text-slate-600 mt-1">
                作者：<strong>${raw.author}</strong> ｜ 看板：${raw.board} ｜ 發布時間：<strong>${raw.published_at}</strong>
              </div>
            </div>
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-base text-slate-800 leading-relaxed whitespace-pre-line font-sans">${raw.body_text}</div>
            <div class="space-y-2 pt-2">
              <div class="text-sm font-extrabold text-slate-800">
                💬 原始推噓文紀錄（共 ${raw.total_push_entries} 則：推 ${raw.push_counts['推']} / 噓 ${raw.push_counts['噓']} / → ${raw.push_counts['→']}）：
              </div>
              <div class="bg-slate-50/70 p-3 rounded-lg border border-slate-200 space-y-0.5">
                ${pushesHtml || '<div class="text-xs text-slate-500">（本文目前無推噓文）</div>'}
                ${pushes.length > 8 ? `<div class="text-xs text-indigo-700 font-bold pt-2">…其餘 ${pushes.length - 8} 則推文已完整保存於 data/verified_ptt_data.json</div>` : ''}
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 p-6 bg-indigo-50/40 space-y-4">
            <div class="border-b border-indigo-200 pb-2">
              <span class="px-3 py-1 bg-indigo-100 text-indigo-950 font-black text-sm rounded border border-indigo-300">🤖 程式分析結果 (programmatic_analysis)</span>
            </div>
            <div class="space-y-3 text-sm text-slate-800">
              <div class="bg-white p-3.5 rounded-lg border border-indigo-200">
                <div class="text-xs font-bold text-slate-500">標題分類標籤</div>
                <div class="text-base font-black text-indigo-950 mt-0.5">[${prog.post_category_tag}]</div>
              </div>
              <div class="bg-white p-3.5 rounded-lg border border-indigo-200">
                <div class="text-xs font-bold text-slate-500">文章性質判讀</div>
                <div class="text-sm font-bold text-slate-900 mt-0.5 leading-snug">${prog.article_nature_note}</div>
              </div>
              <div class="bg-white p-3.5 rounded-lg border border-indigo-200">
                <div class="text-xs font-bold text-slate-500">內文命中手搖品牌關鍵字</div>
                <div class="text-sm font-extrabold text-emerald-800 mt-1">
                  ${(prog.detected_brands_in_post || []).length > 0 ? prog.detected_brands_in_post.join('、') : '無特定連鎖品牌（或為在地單店／綜合討論）'}
                </div>
              </div>
              <div class="bg-amber-50 p-3.5 rounded-lg border border-amber-300 text-xs text-amber-950 leading-relaxed">
                ⚠️ <strong>分離原則聲明：</strong>${prog.analysis_disclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function initRawNewsSection() {
  const meta = verifiedNewsData.collection_metadata || {};
  const records = verifiedNewsData.records || [];

  const queryListEl = document.getElementById('query-log-list');
  if (queryListEl && meta.queries_executed) {
    queryListEl.innerHTML = meta.queries_executed.map(q => `
      <div class="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <span class="inline-block px-2.5 py-0.5 bg-emerald-700 text-white text-xs font-bold rounded mr-2">${q.query_id}</span>
          <span class="font-mono text-sm font-bold text-slate-800">${q.query_string}</span>
        </div>
        <div class="flex items-center gap-3 text-sm shrink-0">
          <span class="font-bold text-emerald-800">實抓 ${q.raw_items_returned} 筆</span>
          <a href="${q.rss_url}" target="_blank" rel="noopener noreferrer"
             class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs transition">
            🔗 開啟 RSS XML ↗
          </a>
        </div>
      </div>
    `).join('');
  }

  const brandSelect = document.getElementById('filter-brand-select');
  if (brandSelect) {
    const counts = {};
    records.forEach(r => {
      const b = r.brand_detected || "待確認品牌";
      counts[b] = (counts[b] || 0) + 1;
    });
    const sortedBrands = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    brandSelect.innerHTML = `<option value="ALL">全部品牌 (${records.length} 筆紀錄)</option>` +
      sortedBrands.map(b => `<option value="${b}">${b} (${counts[b]} 筆)</option>`).join('');
  }

  renderVerifiedNewsList();
}

function renderVerifiedNewsList() {
  const records = verifiedNewsData.records || [];
  const filtered = records.filter(r => {
    const matchPeriod = currentPeriodId === "ALL" || matchDateToPeriod(r.published_at, currentPeriodId);
    const matchBrand = currentFilterBrand === "ALL" || r.brand_detected === currentFilterBrand;
    const matchQuery = currentFilterQuery === "ALL" || r.query_id === currentFilterQuery;
    return matchPeriod && matchBrand && matchQuery;
  });

  const badge = document.getElementById('filtered-count-badge');
  if (badge) {
    badge.innerText = `[${currentPeriodId}] 顯示：${filtered.length} / ${records.length} 筆`;
  }

  const listEl = document.getElementById('verified-news-list');
  if (!listEl) return;

  listEl.innerHTML = filtered.map(r => `
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between gap-3">
      <div class="space-y-1">
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="px-2 py-0.5 bg-slate-800 text-white font-mono font-bold rounded">${r.evidence_id}</span>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold rounded">${r.brand_detected}</span>
          <span class="font-bold text-slate-700">📰 ${r.publisher_name}</span>
          <span class="font-mono text-slate-500">發布：${r.published_at}</span>
        </div>
        <a href="${r.rss_link}" target="_blank" rel="noopener noreferrer"
           class="text-base font-extrabold text-slate-900 hover:text-emerald-700 underline decoration-emerald-500 underline-offset-2 block">
          ${r.title_clean} ↗
        </a>
      </div>
    </div>
  `).join('');
}

function renderCapabilityReport() {
  const tbody = document.getElementById('capability-tbody');
  if (!tbody) return;

  tbody.innerHTML = platformCapabilities.map(c => {
    let badgeClass = "bg-slate-100 text-slate-800 border-slate-300";
    if (c.status.includes("已測試可取得")) {
      badgeClass = "bg-emerald-100 text-emerald-900 border-emerald-400";
    } else if (c.status.includes("只能取得部分")) {
      badgeClass = "bg-amber-100 text-amber-900 border-amber-400";
    } else if (c.status.includes("本次測試失敗")) {
      badgeClass = "bg-rose-100 text-rose-900 border-rose-400";
    }

    return `
      <tr class="hover:bg-slate-50">
        <td class="p-4 border-r border-slate-200 font-extrabold text-slate-900">${c.platform}</td>
        <td class="p-4 border-r border-slate-200">
          <span class="inline-block px-3 py-1 text-sm font-extrabold rounded-full border ${badgeClass}">
            ${c.status}
          </span>
        </td>
        <td class="p-4 border-r border-slate-200 text-sm text-slate-700 font-mono">${c.test_method}</td>
        <td class="p-4 border-r border-slate-200 text-sm text-slate-800 leading-relaxed">${c.test_result}</td>
        <td class="p-4 text-sm font-mono text-slate-600 whitespace-nowrap">${c.tested_at}</td>
      </tr>
    `;
  }).join('');
}

function renderIsolatedDemo() {
  const el = document.getElementById('isolated-demo-list');
  if (!el) return;
  el.innerHTML = isolatedDemoSample.map(d => `
    <div class="bg-white/80 p-5 rounded-xl border-2 border-dashed border-amber-400 opacity-85">
      <div class="flex justify-between items-center mb-2">
        <span class="px-3 py-1 bg-amber-200 text-amber-950 font-black text-xs rounded">⚠️ 示範資料（非真實採集，無來源網址）</span>
        <span class="text-sm font-bold text-slate-500">原模擬週期：2026-W46</span>
      </div>
      <h4 class="text-lg font-extrabold text-slate-800">${d.brand} — ${d.name}</h4>
      <p class="text-sm text-slate-600 mt-1">原模擬敘述：${d.ai_insight}</p>
    </div>
  `).join('');
}

window.addEventListener('resize', () => {
  if (matrixChartInstance) matrixChartInstance.resize();
  if (wordCloudChartInstance) wordCloudChartInstance.resize();
  if (brandBarChartInstance) brandBarChartInstance.resize();
  if (categoryPieChartInstance) categoryPieChartInstance.resize();
});

function initDashboardApp() {
  if (window.__btrInitialized) return;
  window.__btrInitialized = true;
  const steps = [
    initPeriodAndProductFilters,
    applyProductFilters,
    renderWordCloudChart,
    renderBrandComparisonCharts,
    renderCrawlHistoryTable,
    updateTab2ScopeBanner,
    renderCrosscheckCases,
    renderNewsEventsList,
    renderPttSection,
    initRawNewsSection,
    renderCapabilityReport,
    renderIsolatedDemo
  ];
  steps.forEach(fn => {
    try { fn(); } catch (err) { console.error('[BeverageTrendRadar init step error]', err); }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboardApp);
} else {
  initDashboardApp();
}
"""

    app_js_content = (
        js_template
        .replace("__PRODUCTS_JSON__", products_json_str)
        .replace("__VERIFIED_JSON__", verified_json_str)
        .replace("__EVENTS_JSON__", events_json_str)
        .replace("__PTT_JSON__", ptt_json_str)
        .replace("__CAP_JSON__", cap_json_str)
        .replace("__DEMO_JSON__", demo_json_str)
    )

    with open(APP_JS_PATH, "w", encoding="utf-8") as f:
        f.write(app_js_content)

    print(f"[OK] 已同步商品趨勢總覽與跨來源證據至 {APP_JS_PATH}")


if __name__ == "__main__":
    sync_verified_to_frontend()
