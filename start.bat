@echo off
title Strella Space Tourism - Startup
color 0b

echo ================================================================
echo   🚀 STRELLA SPACE TOURISM - MODERN 3D EXPERIENCE 🚀
echo ================================================================
echo.
echo Starting the modernized space tourism website...
echo Features: React + TypeScript + Three.js + CSS 3D + Express.js
echo.

echo [1/3] Installing client dependencies...
cd client
call npm install --silent
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)

echo [2/3] Installing server dependencies...
cd ..\server  
call npm install --silent
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)

echo [3/3] Starting both servers...
echo.

REM Start backend server in new window
start "🌌 Strella Backend Server" /min cmd /k "echo Backend server starting on http://localhost:5000 && node index.js"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend development server
cd ..\client
start "🚀 Strella Frontend (Vite)" cmd /k "echo Frontend starting on http://localhost:5173 && npm run dev"

echo.
echo ================================================================
echo   ✅ STRELLA SPACE TOURISM IS STARTING!
echo ================================================================
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:5000
echo.
echo 📱 Test all 4 modes:
echo    🌍 2D View - Classic planet slider
echo    🪐 Simple 3D - CSS animations  
echo    ✨ CSS 3D - Advanced 3D solar system
echo    🚀 Three.js - Full WebGL experience
echo.
echo Press any key to open browser...
pause >nul

REM Open default browser to the application
start http://localhost:5173

echo.
echo 🎉 Enjoy exploring the cosmos with Strella!
echo    (Close this window to keep servers running)
echo.
pause
