@echo off
title Teresa - podglad strony
cd /d "%~dp0"
set "PATH=%PATH%;C:\Program Files\nodejs"
where npm >nul 2>nul
if errorlevel 1 (
  echo Nie znaleziono npm. Zainstaluj Node.js z https://nodejs.org i sprobuj ponownie.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Pierwsze uruchomienie: instaluje zaleznosci, to potrwa chwile...
  call npm install --no-fund --no-audit
)
echo.
echo Uruchamiam strone Teresy. Przegladarka otworzy sie automatycznie.
echo Aby zatrzymac, zamknij to okno.
echo.
call npm run dev -- --open
