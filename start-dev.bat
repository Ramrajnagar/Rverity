@echo off
echo Starting NeuroSync AI...

echo Starting Backend (API)...
start "NeuroSync API" cmd /k "cd apps\api && npm run dev"

echo Starting Frontend (Web)...
start "NeuroSync Web" cmd /k "cd apps\web && npm run dev"

echo Done! Services are starting in new windows.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
pause
