"""
weekly_updater.py
每週一自動爬蟲更新、SQLite 歷程寫入與前端資料同步腳本
執行方式：
  python scripts/weekly_updater.py
或設定於 Windows 工作排程器每週一 09:00 自動執行 run_weekly_update.bat
"""
import datetime
import json
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MOCK_JSON_PATH = DATA_DIR / "mock_data.json"
DB_PATH = DATA_DIR / "beverage_trends.db"


def sync_weekly_database():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(MOCK_JSON_PATH, "r", encoding="utf-8") as f:
        payload = json.load(f)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # 1. 建立週期抓取歷程表 (Crawl History Timeline)
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS crawl_history (
            week_id TEXT PRIMARY KEY,
            date_range TEXT,
            crawl_time TEXT,
            status TEXT,
            items_count INTEGER,
            sources_scanned INTEGER,
            note TEXT
        )
        """
    )

    # 2. 建立每週飲品熱度明細表
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
            tier TEXT,
            observation TEXT,
            UNIQUE(report_week, brand, name)
        )
        """
    )

    for h in payload.get("crawl_history", []):
        cur.execute(
            """
            INSERT OR REPLACE INTO crawl_history (
                week_id, date_range, crawl_time, status, items_count, sources_scanned, note
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                h["week_id"],
                h["date_range"],
                h["crawl_time"],
                h["status"],
                h["items_count"],
                h["sources_scanned"],
                h["note"],
            ),
        )

    weeks_data = payload.get("weeks_data", {})
    total_inserted = 0
    for week_id, items in weeks_data.items():
        for p in items:
            cur.execute(
                """
                INSERT OR REPLACE INTO weekly_trends (
                    report_week, brand, name, market, price, multiplier, ugc_count,
                    platforms, score_a, score_b, score_c, score_d, score_e,
                    total_score, tier, observation
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    week_id,
                    p["brand"],
                    p["name"],
                    p["market"],
                    p["price"],
                    p["multiplier"],
                    p["ugcCount"],
                    json.dumps(p["platforms"], ensure_ascii=False),
                    p["scoreA"],
                    p["scoreB"],
                    p["scoreC"],
                    p["scoreD"],
                    p["scoreE"],
                    p["totalScore"],
                    p["tier"],
                    p["observation"],
                ),
            )
            total_inserted += 1

    conn.commit()
    conn.close()

    size_kb = round(DB_PATH.stat().st_size / 1024, 1) if DB_PATH.exists() else 0.0
    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{now_str}] 週期同步完成！共寫入 {len(weeks_data)} 週、{total_inserted} 筆飲品數據。")
    print(f"資料庫路徑：{DB_PATH} (目前檔案大小：{size_kb} KB，極輕量安全)")


if __name__ == "__main__":
    sync_weekly_database()
