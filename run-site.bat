@echo off
title Portfolio Site Launcher
cd /d "%~dp0"

echo =====================================
echo   Portfolio Site - Dev Launcher
echo =====================================
echo.

if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

echo Starting Next.js development server...
call npm run dev

echo.
echo Server stopped.
pause
