// ============================================================================
// 飲品新品市場熱度戰情室 - 動態週期時間軸與大字體左右對分視覺邏輯
// (由 scripts/weekly_updater.py 每週自動更新同步)
// ============================================================================

const radarStore = {
  lastUpdated: "2026-10-26 09:00:12",
  dbSizeKb: 28.4,
  crawlHistory: [
    {
      weekId: "2026-W38",
      label: "2026-W38 (09/14~09/20 最新週)",
      dateRange: "2026/09/14 - 2026/09/20",
      crawlTime: "2026-09-21 09:00:05",
      sourcesScanned: 42,
      itemsCount: 6,
      note: "秋季抹茶與炙燒金萱爆發週"
    },
    {
      weekId: "2026-W37",
      label: "2026-W37 (09/07~09/13)",
      dateRange: "2026/09/07 - 2026/09/13",
      crawlTime: "2026-09-14 09:00:08",
      sourcesScanned: 38,
      itemsCount: 5,
      note: "初秋紅柚果茶與羽衣甘藍輕果茶週"
    },
    {
      weekId: "2026-W36",
      label: "2026-W36 (08/31~09/06)",
      dateRange: "2026/08/31 - 2026/09/06",
      crawlTime: "2026-09-07 09:00:03",
      sourcesScanned: 35,
      itemsCount: 4,
      note: "夏末粉粿桂花檸檬與維C美式週"
    }
  ],
  weeksData: {
    "2026-W38": [
      {
        brand: "霸王茶姬",
        name: "鮮作抹茶系列（小王子聯名）",
        market: "中國大陸",
        price: "RMB 20-24",
        scoreA: 20, scoreB: 28, scoreC: 15, scoreD: 15, scoreE: 10,
        totalScore: 88,
        multiplier: 3.42,
        tier: "🔥 現象級爆紅",
        platforms: ["小紅書", "抖音", "微博", "微信"],
        ugcCount: 38,
        observation: "頂流國風茶飲與治癒系文學 IP 深度契合，清爽抹綠視覺搭配情感文案引爆自發打卡，單日門市出杯量創下季度新高。"
      },
      {
        brand: "Starbucks",
        name: "Iced Pumpkin Cream Matcha",
        market: "美國",
        price: "USD $6.25",
        scoreA: 20, scoreB: 26, scoreC: 15, scoreD: 15, scoreE: 10,
        totalScore: 86,
        multiplier: 2.85,
        tier: "🔥 現象級爆紅",
        platforms: ["TikTok", "Instagram", "Reddit", "X"],
        ugcCount: 29,
        observation: "抹茶微苦巧妙中和南瓜奶泡甜膩感，成功將秋季標誌性南瓜風味從傳統濃縮咖啡拓展至年輕世代鍾愛的抹茶客群。"
      },
      {
        brand: "迷客夏",
        name: "蘭韻夢金萱系列（炙燒金萱慕斯）",
        market: "台灣",
        price: "NT$55-75 (買5送1)",
        scoreA: 20, scoreB: 25, scoreC: 12, scoreD: 15, scoreE: 10,
        totalScore: 82,
        multiplier: 2.98,
        tier: "🔥 現象級爆紅",
        platforms: ["Instagram", "Threads", "Facebook", "新聞媒體"],
        ugcCount: 12,
        observation: "法式甜點工藝融入台式手搖，現場噴槍炙燒焦糖奶蓋創造極高社群短影音吸睛度，拉高客單價至 75 元仍維持高買氣。"
      },
      {
        brand: "SOMA",
        name: "if 100% 椰子水聯名特調系列",
        market: "台灣",
        price: "NT$85-110",
        scoreA: 20, scoreB: 20, scoreC: 10, scoreD: 12, scoreE: 10,
        totalScore: 72,
        multiplier: 2.07,
        tier: "📈 強勢話題",
        platforms: ["Instagram", "Threads", "新聞媒體"],
        ugcCount: 7,
        observation: "純天然香水椰子水自帶清甜，取代傳統果糖負擔，成為精品茶飲往健康低卡機能轉型的代表性標竿。"
      },
      {
        brand: "CoCo都可",
        name: "生椰楊枝甘露",
        market: "台灣",
        price: "NT$90 (好友日買1送1)",
        scoreA: 18, scoreB: 20, scoreC: 10, scoreD: 12, scoreE: 10,
        totalScore: 70,
        multiplier: 1.74,
        tier: "📈 強勢話題",
        platforms: ["Line", "Facebook", "外送平台"],
        ugcCount: 8,
        observation: "透過常態化週三好友日買一送一長線維持芒果熱度，生椰乳配方降低傳統椰漿厚重感，在外送平台維持高回購率。"
      },
      {
        brand: "得正",
        name: "蜜蘋苦瓜烏龍",
        market: "台灣",
        price: "NT$65",
        scoreA: 18, scoreB: 18, scoreC: 10, scoreD: 10, scoreE: 10,
        totalScore: 66,
        multiplier: 1.75,
        tier: "📈 強勢話題",
        platforms: ["Threads", "Instagram", "Dcard"],
        ugcCount: 6,
        observation: "特殊蔬菜入茶展現調飲研發實力，蜜蘋甜香掩蓋苦瓜青澀味引發嚐鮮討論，但大眾日常回購接受度仍呈現兩極化。"
      }
    ],
    "2026-W37": [
      {
        brand: "龜記茗品",
        name: "紅柚翡翠醇奶",
        market: "台灣",
        price: "NT$75",
        scoreA: 20, scoreB: 26, scoreC: 14, scoreD: 15, scoreE: 9,
        totalScore: 84,
        multiplier: 3.10,
        tier: "🔥 現象級爆紅",
        platforms: ["Threads", "Instagram", "Dcard", "新聞媒體"],
        ugcCount: 19,
        observation: "將招牌紅柚翡翠延伸出清爽醇奶版本，果粒感搭配絲滑奶香在 Threads 引發老客群自發推薦潮。"
      },
      {
        brand: "喜茶 HEYTEA",
        name: "羽衣甘藍奇亞籽輕果茶",
        market: "中國大陸",
        price: "RMB 19",
        scoreA: 20, scoreB: 25, scoreC: 15, scoreD: 15, scoreE: 8,
        totalScore: 83,
        multiplier: 2.95,
        tier: "🔥 現象級爆紅",
        platforms: ["小紅書", "抖音", "微博"],
        ugcCount: 31,
        observation: "主打『液體沙拉』超模同款概念，精準切中白領下午茶怕胖痛點，小紅書健身與減脂圈層擴散極快。"
      },
      {
        brand: "五桐號",
        name: "蜜桃凍烏龍茶蓋",
        market: "台灣",
        price: "NT$65-75",
        scoreA: 20, scoreB: 21, scoreC: 10, scoreD: 12, scoreE: 10,
        totalScore: 73,
        multiplier: 2.15,
        tier: "📈 強勢話題",
        platforms: ["Instagram", "Threads", "Dcard"],
        ugcCount: 9,
        observation: "水蜜桃果凍咀嚼感佳，搭配鹹甜奶蓋層次分明，視覺漸層感強，受學生與年輕上班族青睞。"
      },
      {
        brand: "大茗本位製茶堂",
        name: "烤糖蕎麥凍奶青",
        market: "台灣",
        price: "NT$70",
        scoreA: 18, scoreB: 20, scoreC: 10, scoreD: 12, scoreE: 8,
        totalScore: 68,
        multiplier: 1.88,
        tier: "📈 強勢話題",
        platforms: ["Threads", "Instagram"],
        ugcCount: 7,
        observation: "無咖啡因蕎麥凍搭配招牌烤糖香氣，滿足咀嚼控與晚間飲用需求，穩定貢獻門市熟客營收。"
      },
      {
        brand: "麻古茶坊",
        name: "巨峰葡萄芝芝升級版",
        market: "台灣",
        price: "NT$95",
        scoreA: 20, scoreB: 18, scoreC: 8, scoreD: 12, scoreE: 8,
        totalScore: 66,
        multiplier: 1.62,
        tier: "📈 強勢話題",
        platforms: ["Facebook", "Instagram", "新聞媒體"],
        ugcCount: 5,
        observation: "經典秋日果茶回歸，果肉飽滿度獲肯定，但因單價接近百元門檻，社群討論集中於促銷活動期間。"
      }
    ],
    "2026-W36": [
      {
        brand: "一沐日",
        name: "粉粿桂花檸檬綠",
        market: "台灣",
        price: "NT$65",
        scoreA: 20, scoreB: 27, scoreC: 15, scoreD: 15, scoreE: 10,
        totalScore: 87,
        multiplier: 3.35,
        tier: "🔥 現象級爆紅",
        platforms: ["Threads", "Instagram", "Dcard", "新聞媒體"],
        ugcCount: 24,
        observation: "台灣傳統草仔粿與桂花粉粿熱潮延續，桂花清香結合酸爽檸檬完美解膩，門市排隊與外送點單率居高不下。"
      },
      {
        brand: "瑞幸咖啡 Luckin",
        name: "檸C美式（黃檸檬特調）",
        market: "中國大陸",
        price: "RMB 9.9 (券後)",
        scoreA: 20, scoreB: 22, scoreC: 12, scoreD: 15, scoreE: 10,
        totalScore: 79,
        multiplier: 2.40,
        tier: "📈 強勢話題",
        platforms: ["小紅書", "抖音", "微信"],
        ugcCount: 16,
        observation: "9.9 元高性價比搭配夏日維 C 概念，成為上班族早午間提神高頻率剛需飲品。"
      },
      {
        brand: "清心福全",
        name: "紅牛能量多多綠",
        market: "台灣",
        price: "NT$80",
        scoreA: 18, scoreB: 18, scoreC: 8, scoreD: 10, scoreE: 8,
        totalScore: 62,
        multiplier: 1.55,
        tier: "📈 強勢話題",
        platforms: ["Facebook", "Threads", "Dcard"],
        ugcCount: 5,
        observation: "機能能量飲結合經典多多綠，鎖定熬夜族與司機客群，定位鮮明但屬特定功能性消費。"
      },
      {
        brand: "可不可熟成紅茶",
        name: "金檸熟成冰茶",
        market: "台灣",
        price: "NT$60",
        scoreA: 18, scoreB: 15, scoreC: 5, scoreD: 10, scoreE: 7,
        totalScore: 55,
        multiplier: 1.32,
        tier: "🌱 初步熱度",
        platforms: ["Instagram", "Facebook"],
        ugcCount: 3,
        observation: "常態型夏季果茶微調，包裝視覺具質感，整體社群討論屬平穩日常維運。"
      }
    ]
  }
};

let currentWeekId = "2026-W38";
let chartMatrix, chartWordcloud, chartBrand, chartRadar;

// 切換監測週次 (時間軸連動)
function selectWeek(weekId) {
  currentWeekId = weekId;
  renderWeekTimeline();
  renderDashboard();
  updateCharts();
}

// 渲染頂部週期時間軸下拉選單與歷程表
function renderWeekTimeline() {
  const selectEl = document.getElementById("week-timeline-select");
  if (selectEl) {
    selectEl.innerHTML = radarStore.crawlHistory.map(h => {
      const selected = h.weekId === currentWeekId ? "selected" : "";
      return `<option value="${h.weekId}" ${selected}>${h.label} — ${h.note}</option>`;
    }).join("");
  }

  document.getElementById("db-size-badge").innerText = `${radarStore.dbSizeKb} KB`;

  // 渲染分頁 2 的歷程表
  const tbody = document.getElementById("crawl-history-tbody");
  if (tbody) {
    tbody.innerHTML = radarStore.crawlHistory.map(h => `
      <tr class="${h.weekId === currentWeekId ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'}">
        <td class="p-3.5 border-r border-slate-200 font-extrabold text-emerald-900">${h.weekId}</td>
        <td class="p-3.5 border-r border-slate-200">${h.dateRange}</td>
        <td class="p-3.5 border-r border-slate-200 font-mono">${h.crawlTime}</td>
        <td class="p-3.5 border-r border-slate-200">${h.sourcesScanned} 個社群/新聞源</td>
        <td class="p-3.5 border-r border-slate-200 font-bold text-emerald-700">${h.itemsCount} 款新品</td>
        <td class="p-3.5 border-r border-slate-200">${h.note}</td>
        <td class="p-3.5">
          <button onclick="selectWeek('${h.weekId}'); switchTab(0);" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold rounded-md transition">
            查看該週戰情
          </button>
        </td>
      </tr>
    `).join("");
  }

  // 渲染彈窗內的歷程紀錄
  const modalList = document.getElementById("modal-history-list");
  if (modalList) {
    modalList.innerHTML = radarStore.crawlHistory.map(h => `
      <div class="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-wrap justify-between items-center gap-2">
        <div>
          <span class="font-extrabold text-emerald-800">${h.weekId}</span>
          <span class="text-slate-600 ml-2">（區間：${h.dateRange}）</span>
          <div class="text-slate-700 mt-0.5">執行時間：${h.crawlTime} • 掃描 ${h.sourcesScanned} 個來源 • 入庫 <b>${h.itemsCount} 款</b>（${h.note}）</div>
        </div>
        <button onclick="selectWeek('${h.weekId}'); closeHistoryModal();" class="px-3.5 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700">
          切換至此週
        </button>
      </div>
    `).join("");
  }
}

// Tab 切換
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

  setTimeout(() => {
    if (index === 0 && chartMatrix) chartMatrix.resize();
    if (index === 1 && chartWordcloud) chartWordcloud.resize();
    if (index === 2) {
      if (chartBrand) chartBrand.resize();
      if (chartRadar) chartRadar.resize();
    }
  }, 100);
}

// 彈窗控制
function openConceptModal() {
  document.getElementById('concept-modal').classList.add('active');
}
function closeConceptModal() {
  document.getElementById('concept-modal').classList.remove('active');
}
function openHistoryModal() {
  document.getElementById('history-modal').classList.add('active');
}
function closeHistoryModal() {
  document.getElementById('history-modal').classList.remove('active');
}

// 渲染本週 KPI 與「左右 50/50 對分 + 右下綜合熱度分數」新品長條卡片
function renderDashboard() {
  const weeklyProducts = radarStore.weeksData[currentWeekId] || [];
  const weekMeta = radarStore.crawlHistory.find(h => h.weekId === currentWeekId);

  const total = weeklyProducts.length;
  const viral = weeklyProducts.filter(p => p.totalScore >= 80).length;
  const trend = weeklyProducts.filter(p => p.totalScore >= 60 && p.totalScore < 80).length;
  const avg = total ? (weeklyProducts.reduce((sum, p) => sum + p.totalScore, 0) / total).toFixed(1) : "0.0";

  document.getElementById('stat-total-products').innerText = `${total} 款`;
  document.getElementById('stat-viral-products').innerText = `${viral} 款`;
  document.getElementById('stat-trend-products').innerText = `${trend} 款`;
  document.getElementById('stat-avg-score').innerText = `${avg} 分`;
  if (weekMeta) {
    document.getElementById('stat-week-label').innerText = `統計區間：${weekMeta.dateRange}`;
  }

  const list = document.getElementById('product-card-list');
  list.innerHTML = weeklyProducts.map(p => {
    const isViral = p.totalScore >= 80;
    const marketBadge = p.market === '台灣'
      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
      : 'bg-sky-100 text-sky-900 border border-sky-300';

    const rightBoxStyle = isViral
      ? 'bg-emerald-50/90 border-emerald-200'
      : 'bg-amber-50/80 border-amber-200';

    const scoreColor = isViral ? 'text-emerald-700' : 'text-amber-600';

    return `
      <div class="bg-white/95 backdrop-blur-sm border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:border-emerald-400 transition">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <!-- 左側 50% (6欄)：台灣/迷客夏、飲品大標題、定價優惠、主力平台與五維度細項 -->
          <div class="lg:col-span-6 flex flex-col justify-between pr-0 lg:pr-4">
            <div>
              <div class="flex flex-wrap items-center gap-2.5">
                <span class="px-3 py-1 text-base font-extrabold rounded-md ${marketBadge}">${p.market}</span>
                <span class="text-xl font-extrabold text-slate-800">${p.brand}</span>
                <span class="px-3 py-0.5 text-base font-bold rounded-full ${isViral ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${p.tier}</span>
              </div>

              <h3 class="text-2xl font-black text-slate-900 mt-3 leading-snug">${p.name}</h3>

              <div class="mt-3 space-y-1.5 text-lg text-slate-700 font-medium">
                <div>💰 <strong class="text-slate-900">定價與優惠：</strong>${p.price}</div>
                <div>📱 <strong class="text-slate-900">主力擴散平台：</strong>${p.platforms.join('、')}</div>
                <div>📈 <strong class="text-slate-900">社群爆發數據：</strong>平時互動的 <strong class="text-emerald-700 font-black">${p.multiplier} 倍</strong>（7天內累積 <b>${p.ugcCount} 則</b>開箱）</div>
              </div>
            </div>

            <!-- 左下：五維度得分明細條 -->
            <div class="mt-4 pt-3 border-t border-slate-200 flex flex-wrap gap-2 text-base font-semibold text-slate-700">
              <span class="bg-slate-100 px-2.5 py-1 rounded">真實性 ${p.scoreA}/20</span>
              <span class="bg-slate-100 px-2.5 py-1 rounded">社群表現 ${p.scoreB}/30</span>
              <span class="bg-slate-100 px-2.5 py-1 rounded">擴散速度 ${p.scoreC}/15</span>
              <span class="bg-slate-100 px-2.5 py-1 rounded">跨平台 ${p.scoreD}/15</span>
              <span class="bg-slate-100 px-2.5 py-1 rounded">商業驗證 ${p.scoreE}/10</span>
            </div>
          </div>

          <!-- 右側 50% (6欄)：淡色底塊放 AI 商業觀察，右下角呈現醒目綜合熱度分數 -->
          <div class="lg:col-span-6 ${rightBoxStyle} border-2 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div class="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>🎯 AI 商業觀察與市場解析</span>
              </div>
              <p class="text-lg text-slate-800 mt-2.5 leading-relaxed font-medium">
                ${p.observation}
              </p>
            </div>

            <!-- 右下角：綜合熱度總分 -->
            <div class="mt-4 pt-3 border-t border-slate-300/70 flex justify-between items-end">
              <span class="text-base font-bold text-slate-600">五維度加權評定結果</span>
              <div class="flex items-baseline gap-2">
                <span class="text-lg font-extrabold text-slate-700">綜合熱度分</span>
                <span class="text-4xl font-black ${scoreColor}">${p.totalScore}</span>
                <span class="text-base font-bold text-slate-600">/ 100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }).join('');
}

// 初始化與更新圖表 (字體全面放大至 14~16px)
function initCharts() {
  chartMatrix = echarts.init(document.getElementById('chart-matrix'));
  chartWordcloud = echarts.init(document.getElementById('chart-wordcloud'));
  chartBrand = echarts.init(document.getElementById('chart-brand-multipliers'));
  chartRadar = echarts.init(document.getElementById('chart-category-radar'));
  updateCharts();
}

function updateCharts() {
  const weeklyProducts = radarStore.weeksData[currentWeekId] || [];

  // 1. 熱度分佈圖 (散佈圖直接顯示飲品名，大字體)
  chartMatrix.setOption({
    tooltip: {
      textStyle: { fontSize: 16 },
      formatter: p => `<b>${p.data[3]} - ${p.data[2]}</b><br/>社群互動倍數：<b>${p.data[0]} 倍</b><br/>擴散驗證得分：<b>${p.data[1]} 分</b><br/>綜合熱度總分：<b>${p.data[4]} 分</b>`
    },
    grid: { left: '8%', right: '10%', top: '12%', bottom: '15%' },
    xAxis: {
      name: '社群互動倍數 (倍)',
      nameLocation: 'middle',
      nameGap: 32,
      nameTextStyle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
      axisLabel: { fontSize: 14, fontWeight: 'bold' },
      min: 1,
      max: 3.8,
      splitLine: { lineStyle: { type: 'dashed', color: '#cbd5e1' } }
    },
    yAxis: {
      name: '跨平台與商業驗證分 (滿分40)',
      nameTextStyle: { fontSize: 15, fontWeight: 'bold', color: '#1e293b', align: 'left' },
      axisLabel: { fontSize: 14, fontWeight: 'bold' },
      min: 20,
      max: 43,
      splitLine: { lineStyle: { type: 'dashed', color: '#cbd5e1' } }
    },
    series: [{
      type: 'scatter',
      symbolSize: 32,
      label: {
        show: true,
        position: 'top',
        formatter: p => `${p.data[3]} (${p.data[4]}分)`,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0f172a'
      },
      data: weeklyProducts.map(p => [p.multiplier, (p.scoreC + p.scoreD + p.scoreE), p.name, p.brand, p.totalScore]),
      itemStyle: {
        color: p => p.data[4] >= 80 ? '#059669' : '#d97706',
        shadowBlur: 8,
        shadowColor: 'rgba(0,0,0,0.15)'
      }
    }]
  });

  // 2. 加權文字雲
  const wordData = weeklyProducts.map(p => ({
    name: `${p.brand}：${p.name.replace(/（.*）/, '')}`,
    value: p.totalScore,
    fullItem: p
  }));

  chartWordcloud.setOption({
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      sizeRange: [22, 54],
      rotationRange: [0, 0],
      gridSize: 16,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: () => {
          const colors = ['#047857', '#0f766e', '#0369a1', '#b45309', '#334155'];
          return colors[Math.floor(Math.random() * colors.length)];
        }
      },
      data: wordData
    }]
  });

  chartWordcloud.off('click');
  chartWordcloud.on('click', params => {
    const p = params.data.fullItem;
    const panel = document.getElementById('wordcloud-detail-panel');
    panel.innerHTML = `
      <div>
        <div class="flex justify-between items-center">
          <span class="text-base font-extrabold px-3 py-1 rounded-md bg-emerald-100 text-emerald-900">${p.market} • ${p.brand}</span>
          <span class="text-base font-extrabold px-3 py-1 rounded-full ${p.totalScore >= 80 ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-900'}">${p.tier}</span>
        </div>
        <h4 class="text-2xl font-black text-slate-900 mt-3">${p.name}</h4>
        <p class="text-lg text-slate-700 font-semibold mt-2">💰 定價：${p.price}</p>
        <p class="text-lg text-slate-700 font-semibold mt-1">📈 互動倍數：<b class="text-emerald-700">${p.multiplier} 倍</b> • 7天開箱：<b>${p.ugcCount} 則</b></p>
        
        <div class="mt-4 p-4 bg-emerald-50/80 rounded-xl border-2 border-emerald-200">
          <span class="text-lg font-extrabold text-slate-900">🎯 AI 商業觀察：</span>
          <p class="text-lg text-slate-800 mt-1.5 leading-relaxed font-medium">${p.observation}</p>
        </div>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-200 flex justify-between items-baseline">
        <span class="text-base text-slate-600 font-semibold">平台：${p.platforms.join('、')}</span>
        <div class="text-3xl font-black ${p.totalScore >= 80 ? 'text-emerald-700' : 'text-amber-600'}">${p.totalScore} 分</div>
      </div>
    `;
  });

  // 3. 品牌爆發倍數
  chartBrand.setOption({
    tooltip: { trigger: 'axis', textStyle: { fontSize: 16 } },
    grid: { left: '10%', right: '8%', top: '12%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: weeklyProducts.map(p => p.brand),
      axisLabel: { fontSize: 15, fontWeight: 'bold', color: '#1e293b' }
    },
    yAxis: {
      type: 'value',
      name: '互動倍數 (x)',
      nameTextStyle: { fontSize: 15, fontWeight: 'bold' },
      axisLabel: { fontSize: 14, fontWeight: 'bold' }
    },
    series: [{
      type: 'bar',
      barWidth: '45%',
      label: { show: true, position: 'top', formatter: '{c}x', fontSize: 15, fontWeight: 'bold' },
      data: weeklyProducts.map(p => p.multiplier),
      itemStyle: { color: '#059669', borderRadius: [6, 6, 0, 0] }
    }]
  });

  // 4. 雷達圖
  const top2 = weeklyProducts.slice(0, 2);
  chartRadar.setOption({
    tooltip: { textStyle: { fontSize: 15 } },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 15, fontWeight: 'bold' },
      data: top2.map(p => `${p.brand} (${p.totalScore}分)`)
    },
    radar: {
      radius: '62%',
      axisName: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },
      indicator: [
        { name: '真實性 (20)', max: 20 },
        { name: '社群倍數 (30)', max: 30 },
        { name: '擴散速度 (15)', max: 15 },
        { name: '跨平台 (15)', max: 15 },
        { name: '商業驗證 (10)', max: 10 }
      ]
    },
    series: [{
      type: 'radar',
      areaStyle: { opacity: 0.2 },
      lineStyle: { width: 3 },
      data: top2.map(p => ({
        value: [p.scoreA, p.scoreB, p.scoreC, p.scoreD, p.scoreE],
        name: `${p.brand} (${p.totalScore}分)`
      }))
    }]
  });
}

// 頁面初始化
window.addEventListener('DOMContentLoaded', () => {
  renderWeekTimeline();
  renderDashboard();
  initCharts();
  window.addEventListener('resize', () => {
    if (chartMatrix) chartMatrix.resize();
    if (chartWordcloud) chartWordcloud.resize();
    if (chartBrand) chartBrand.resize();
    if (chartRadar) chartRadar.resize();
  });
});
