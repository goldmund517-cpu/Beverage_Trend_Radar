@echo off
cd /d "c:\Dev\Antigravity\Beverage_Trend_Radar"
echo ==========================================================
echo Pushing Beverage_Trend_Radar to GitHub...
echo Target: https://github.com/goldmund517-cpu/Beverage_Trend_Radar.git
echo ==========================================================
git remote set-url origin https://github.com/goldmund517-cpu/Beverage_Trend_Radar.git
git branch -M main
git push -u origin main
echo ==========================================================
echo Done! If it succeeded, open your GitHub repository to check!
echo ==========================================================
pause
