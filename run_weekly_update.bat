@echo off
chcp 65001 >nul
echo ==========================================================
echo [Beverage Trend Radar] 每週飲品新品自動爬蟲與熱度更新排程
echo ==========================================================
cd /d "%~dp0"
python scripts\weekly_updater.py
echo.
echo 更新完成！即將為您開啟最新戰情室面板...
start msedge.exe "%~dp0dashboard\index.html"
