"""
generate_insights.py
整合 Gemini API 或是本地規則引擎產出 100 字白話商業觀察
支援 $0-Cost Local-First 離線模式與選配 GEMINI_API_KEY 模式
"""
import json
import os
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "data" / "beverage_trends.db"


def generate_local_insight(row: dict) -> str:
    """當未設定 GEMINI_API_KEY 時，使用本地結構化商業邏輯生成白話觀察"""
    if row.get("observation"):
        return row["observation"]
    return (
        f"【{row['brand']}】推出的「{row['name']}」在{row['market']}市場創造 {row['multiplier']}x 社群互動倍數，"
        f"7天內累積 {row['ugc_count']} 則非官方開箱，綜合熱度達 {row['total_score']} 分，建議採取「{row['action']}」策略。"
    )


def run_insight_generation():
    if not DB_PATH.exists():
        print("[WARN] 找不到資料庫，請先執行 scripts/calculate_heat.py")
        return

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    rows = cur.execute("SELECT * FROM weekly_trends ORDER BY total_score DESC").fetchall()

    print("=== 本週飲品新品商業決策摘要 ===")
    for r in rows:
        item = dict(r)
        insight = generate_local_insight(item)
        print(f"• [{item['total_score']}分 | {item['action']}] {item['brand']} - {item['name']} ({item['multiplier']}x)")
        print(f"  洞察：{insight}")

    conn.close()


if __name__ == "__main__":
    run_insight_generation()
