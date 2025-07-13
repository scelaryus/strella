# Strella Space Tourism - Quick Start Script
# PowerShell script to start both servers

Write-Host "🚀 Starting Strella Space Tourism Application..." -ForegroundColor Cyan
Write-Host ""

# Start backend server in new PowerShell window
Write-Host "📡 Starting backend server on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Y-Tech\Desktop\Revamp\strella-modern\server'; npm install; node index.js"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend server in new PowerShell window  
Write-Host "🌐 Starting frontend server on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Y-Tech\Desktop\Revamp\strella-modern\client'; npm install; npm run dev"

# Wait for frontend to start
Start-Sleep -Seconds 5

# Open browser
Write-Host "🔗 Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "✅ Application starting!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "🎮 Test all 4 visualization modes:" -ForegroundColor Cyan
Write-Host "  🌍 2D View - Classic planet slider" -ForegroundColor White
Write-Host "  🪐 Simple 3D - CSS animations" -ForegroundColor White  
Write-Host "  ✨ CSS 3D - Advanced 3D solar system" -ForegroundColor White
Write-Host "  🚀 Three.js - Full WebGL experience" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
