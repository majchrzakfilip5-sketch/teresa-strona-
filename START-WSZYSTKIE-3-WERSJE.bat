@echo off
title Teresa - wszystkie 3 wersje
cd /d "%~dp0"

echo ============================================
echo   TERESA - uruchamiam wszystkie 3 wersje
echo ============================================
echo.

echo [1/3] Wersja Chris (zwykly HTML)...
start "" "stronateresaChris\index.html"

echo [2/3] Wersja 1 (zwykly HTML)...
start "" "theresa-app-landing\teresawersja1\index.html"

echo [3/3] Wersja React/Vite (odpalam serwer)...
start "Teresa React" cmd /c "cd /d "%~dp0theresa-app-landing" && START.bat"

echo.
echo Gotowe. Wersje 1 i 2 otworzyly sie w przegladarce.
echo Wersja React startuje w osobnym oknie (pierwszy raz chwile potrwa - instaluje zaleznosci).
echo.
pause
