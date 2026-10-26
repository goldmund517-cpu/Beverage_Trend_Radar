"""
calculate_heat.py
五維度熱度分數與決策矩陣計算核心（本地 SQLite 儲存與加權算分腳本）
"""
import json
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MOCK_JSON_PATH = DATA_DIR / "mock_data.json"
DB_PATH = DATA_DIR / "beverage_trends.db"


def compute_five_dimensions(item: dict) -> dict:
    """
    若無預先指定五維度分數，依據原始指標自動計算五維度評分：
    A_新品真實性 (20) + B_社群表現 (30) + C_擴散速度 (15) + D_跨平台擴散 (15) + E_第三方商業驗證 (10)
    """
    if all(k in item for k in ("scoreA", "scoreB", "scoreC", "scoreD", "scoreE")):
        score_a = item["scoreA"]
        score_b = item["scoreB"]
        score_c = item["scoreC"]
        score_d = item["scoreD"]
        score_e = item["scoreE"]
    else:
        # A_新品真實性 (20)
        score_a = (
            (10 if item.get("official_verified") else 0)
            + (5 if item.get("spec_complete") else 0)
            + (5 if item.get("launch_info_complete") else 0)
        )
        # B_社群表現 (30)
        mult = item.get("multiplier", 1.0)
        if mult >= 3.0:
            mult_pts = 20
        elif mult >= 2.0:
            mult_pts = 15
        elif mult >= 1.5:
            mult_pts = 10
        elif mult >= 1.0:
            mult_pts = 5
        else:
            mult_pts = 0
        base_b = (5 if item.get("public_metrics") else 0) + (5 if item.get("dual_sources") else 0)
        score_b = min(30, base_b + mult_pts)

        # C_擴散速度 (15)
        ugc = item.get("ugc_7d_count", 0)
        if ugc >= 10:
            score_c = 15
        elif ugc >= 6:
            score_c = 10
        elif ugc >= 3:
            score_c = 5
        else:
            score_c = 0

        # D_跨平台擴散 (15)
        plat_count = len(item.get("platforms", []))
        if plat_count >= 4:
            score_d = 15
        elif plat_count == 3:
            score_d = 12
        elif plat_count == 2:
            score_d = 8
        else:
            score_d = 0

        # E_第三方商業驗證 (10)
        score_e = (5 if item.get("media_featured") else 0) + (5 if item.get("commercial_signal") else 0)

    total = score_a + score_b + score_c + score_d + score_e

    if total >= 80:
        action = "立即測試"
    elif total >= 60:
        action = "持續觀察"
    elif total >= 40:
        action = "保持觀望"
    else:
        action = "不跟進"

    return {
        "scoreA": score_a,
        "scoreB": score_b,
        "scoreC": score_c,
        "scoreD": score_d,
        "scoreE": score_e,
        "totalScore": total,
        "action": item.get("action", action),
    }


def init_db_and_sync():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(MOCK_JSON_PATH, "r", encoding="utf-8") as f:
        payload = json.load(f)

    report_week = payload.get("report_week", "2026-W38")
    products = payload.get("products", [])

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS weekly_trends (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            report_week TEXT,
            brand TEXT,
            name TEXT,
            market TEXT,
            price TEXT,
            multiplier REAL,
            ugc_count INTEGER,
            platforms TEXT,
            score_a INTEGER,
            score_b INTEGER,
            score_c INTEGER,
            score_d INTEGER,
            score_e INTEGER,
            total_score INTEGER,
            action TEXT,
            observation TEXT,
            image_url TEXT,
            UNIQUE(report_week, brand, name)
        )
        """
    )

    for p in products:
        scores = compute_five_dimensions(p)
        cur.execute(
            """
            INSERT OR REPLACE INTO weekly_trends (
                report_week, brand, name, market, price, multiplier, ugc_count,
                platforms, score_a, score_b, score_c, score_d, score_e,
                total_score, action, observation, image_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                report_week,
                p["brand"],
                p["name"],
                p["market"],
                p["price"],
                p["multiplier"],
                p.get("ugc_7d_count", p.get("ugcCount", 0)),
                json.dumps(p["platforms"], ensure_ascii=False),
                scores["scoreA"],
                scores["scoreB"],
                scores["scoreC"],
                scores["scoreD"],
                scores["scoreE"],
                scores["totalScore"],
                scores["action"],
                p.get("observation", ""),
                p.get("imageUrl", ""),
            ),
        )

    conn.commit()
    conn.close()
    print(f"[OK] 已完成 {report_week} 共 {len(products)} 款飲品熱度計算並同步至 SQLite: {DB_PATH}")


if __name__ == "__main__":
    init_db_and_sync()
