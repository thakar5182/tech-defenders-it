@echo off
setlocal
title Tech Defenders IT Website

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed.
  echo Install Node.js LTS from https://nodejs.org and run this file again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing website dependencies...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting Tech Defenders IT at http://localhost:3000
call npm run dev

endlocal
