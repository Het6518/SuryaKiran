@echo off
REM Starts the ML service, backend and frontend in separate windows.
REM First-time setup: see "Getting Started" in README.md.
cd /d "%~dp0"

if not exist ".env" (
    echo [!] .env not found in the repo root. Copy .env.example to .env and fill in DATABASE_URL / JWT_SECRET.
    pause
    exit /b 1
)

set "ML_PY=python"
if exist "services\ml\.venv\Scripts\python.exe" set "ML_PY=.venv\Scripts\python.exe"

echo Starting ML Service (port 5001)...
start "SuryaKiran ML" cmd /k "cd services\ml && %ML_PY% app.py"

echo Starting Backend (port 5000)...
start "SuryaKiran Backend" cmd /k "cd backend && npm run dev"

echo Starting Frontend (port 5173)...
start "SuryaKiran Frontend" cmd /k "cd frontend && npm run dev"

echo All services are starting in separate windows.
