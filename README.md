# Lingua Learn

Learn and practice the American Sign Language (ASL) alphabet with live camera feedback. The app shows you a letter, you sign it in front of your webcam, and the system predicts the letter in real time to help you practice and self-correct.

## What it is
- Practice mode to explore each letter with gentle guidance.
- Quiz mode to test yourself quickly.
- Live feedback: your webcam frames are analyzed and the most likely letter is returned.

## How it works (high level)
1) Your browser captures frames from the webcam.
2) Frames are sent over a WebSocket to the backend.
3) The backend detects the hand region and classifies the letter using a vision model.
4) The frontend can display the predicted letter and probabilities for feedback.

- AI model: `prithivMLmods/Alphabet-Sign-Language-Detection` (Hugging Face), running on the backend via PyTorch + Transformers, with MediaPipe assisting hand cropping.

## Quickstart
Prerequisites
- Python 3.10+
- Node.js 18+ and npm 9+
- `uv` package manager for Python (recommended): `pip install uv`

### 1) Backend (API)
PowerShell (Windows)
```powershell
cd api
uv venv .venv
. .\.venv\Scripts\Activate.ps1
uv pip install -e .
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

POSIX (macOS/Linux)
```bash
cd api
uv venv .venv
source .venv/bin/activate
uv pip install -e .
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

- API: http://127.0.0.1:8000
- Docs: http://127.0.0.1:8000/docs
- WebSocket: ws://127.0.0.1:8000/ws

### 2) Frontend (Web)
PowerShell (Windows)
```powershell
cd frontend
$env:REACT_APP_API_WS_URL = "ws://127.0.0.1:8000/ws"
npm ci
npm start
```

POSIX (macOS/Linux)
```bash
cd frontend
export REACT_APP_API_WS_URL=ws://127.0.0.1:8000/ws
npm ci
npm start
```

- App: http://localhost:3000

## Configuration
- Frontend → Backend WebSocket URL: `REACT_APP_API_WS_URL` (e.g., `ws://127.0.0.1:8000/ws`).
- Backend auto-selects CUDA if available; otherwise uses CPU. No other env vars are required by default.

## Project structure
```
lingua_learn/
  api/        # FastAPI backend, AI inference and hand detection
  frontend/   # React app (CRA), Tailwind CSS, camera + WebSocket client
```

## Deployment (brief)
- Build frontend: `npm run build` (outputs `frontend/build/`).
- Run backend (ASGI): `uvicorn api.main:app --host 0.0.0.0 --port 8000`.
- If the site is served over HTTPS, configure the frontend to use `wss://` for `REACT_APP_API_WS_URL`.

## Troubleshooting
- WebSocket not connecting: verify `REACT_APP_API_WS_URL` and that the backend is running at `/ws`.
- Camera blocked: allow camera permission and use localhost/HTTPS.
- Mixed content errors: use `wss://` when the site is served over HTTPS.

## Learn more
- Backend details: see `api/README.md` (architecture, endpoints, models, configuration).
- Frontend details: see `frontend/README.md` (tooling, scripts, environment, UI structure).


