# Lingua Learn API

A FastAPI-based backend providing health checks, a root endpoint, and a WebSocket for image-frame classification. It performs on-device vision inference to classify American Sign Language alphabet letters from frames sent by the frontend.

## Tech stack
- FastAPI (ASGI framework)
- Uvicorn (ASGI server)
- Python >= 3.10
- Package management: `uv` (with `pyproject.toml` + `uv.lock`)
- AI/ML: PyTorch, Hugging Face Transformers, MediaPipe, Pillow, NumPy

## Project layout
```
api/
  __init__.py
  main.py                # FastAPI app, HTTP routes, WebSocket endpoint
  pyproject.toml         # Project metadata and dependencies
  uv.lock                # Resolved dependency lockfile for `uv`
  utils/
    __init__.py          # Utils public API (re-exports)
    hand_detection.py    # Hand detection with MediaPipe, cropping utilities
    inference.py         # Model loading and image classification utilities
  lingua_learn_api.egg-info/  # Build/distribution metadata
```

## Overview and entrypoint
- Application entrypoint: `api/main.py`
  - Creates `FastAPI` app with title "Lingua Learn API".
  - HTTP GET endpoints:
    - `/healthz` → returns `{ "status": "ok" }`
    - `/` → returns a welcome message
  - WebSocket endpoint:
    - `/ws` → accepts text messages containing JSON payloads for frames, runs classification, and returns predictions.

## Running locally
Prerequisites:
- Python 3.10+
- `uv` package manager (`pip install uv`), or use an existing virtual environment.

PowerShell (Windows):
```powershell
# (Option A) Using uv for an isolated environment
uv venv .venv
. .\.venv\Scripts\Activate.ps1
uv pip install -e .

# Run the development server (reload enabled if desired)
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

POSIX (macOS/Linux):
```bash
uv venv .venv
source .venv/bin/activate
uv pip install -e .
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

Notes:
- By default, Uvicorn listens at `http://127.0.0.1:8000`.
- OpenAPI docs: `http://127.0.0.1:8000/docs` and Redoc at `/redoc`.

## Configuration
The current code does not use environment variables for model selection or runtime toggles. Key runtime behaviors are in code:
- Device selection: CUDA if available, else CPU (see `utils/inference.py`).
- Hand detection thresholds: hardcoded in `utils/hand_detection.py` (`min_detection_confidence`, `min_tracking_confidence`).

If you need configurable behavior, consider adding environment variables (e.g., `MODEL_NAME`, `CUDA_VISIBLE_DEVICES`, confidence thresholds) and read them in `utils/inference.py` or `utils/hand_detection.py`.

## Endpoints
- GET `/healthz` → health check
- GET `/` → welcome message
- WebSocket `/ws` → accepts frames and returns predictions

WebSocket message protocol (`/ws`):
- Client → Server: JSON string with shape:
  ```json
  { "type": "frame", "data": "<data-url-or-base64-jpeg>" }
  ```
- Server → Client on success:
  ```json
  { "type": "prediction", "data": { "A": 0.123, "B": 0.456, "C": 0.789, "...": "..." } }
  ```
- Server → Client on error:
  ```json
  { "type": "error" }
  ```

## AI models and tools
- Frameworks: PyTorch (`torch`), Transformers (`transformers`), MediaPipe (`mediapipe`).
- Vision model: `SiglipForImageClassification` with `AutoImageProcessor` from Hugging Face Transformers.
  - Model ID: `prithivMLmods/Alphabet-Sign-Language-Detection` (see `utils/inference.py` → `MODEL_NAME`).
  - Inference device: `cuda` if available, otherwise `cpu`.
  - Post-processing: softmax over class logits; labels mapped A–Z.
- Preprocessing:
  - Decoding: Base64/data-URL decoding to `PIL.Image`.
  - Optional hand crop via MediaPipe before classification; falls back to full image if no hand is found.
- Inference mode: Local only (no external API calls); model weights loaded via Transformers.
- Performance considerations:
  - Model and processor are loaded once at module import time.
  - For async contexts, classification is run in a thread/executor (`loop.run_in_executor`) to keep the event loop responsive.
- Safety/guardrails: Not configured in code.
- Observability/tracing: Not configured in code.
- Caching/rate limiting: Not configured in code.

## Data flow
1. Frontend captures a frame and sends a data URL/base64 JPEG over `/ws`.
2. Server decodes to `PIL.Image` (`utils/inference.py::_decode_data_url_to_image`).
3. Optional hand crop using MediaPipe (`utils/hand_detection.py::crop_hand_pil`).
4. Image is processed by `AutoImageProcessor`; logits from `SiglipForImageClassification` are converted to probabilities.
5. A dict of label→probability is returned and sent back over the WebSocket.

## Testing and quality
Dev dependencies (configured in `pyproject.toml`): `pytest`, `ruff`, `httpx`.

Suggested commands:
```powershell
# Lint
ruff check api

# Run tests (if tests are added under e.g., tests/)
pytest -q
```

## Deployment
- Production ASGI command example:
  ```powershell
  uvicorn api.main:app --host 0.0.0.0 --port 8000 --workers 2
  ```
- Ensure the model can be downloaded at first run (Transformers will cache under the Hugging Face cache directory). Pre-warm the cache in CI/CD if needed.
- For GPU servers, install appropriate CUDA toolkit and ensure PyTorch detects the GPU.

## Packaging
- Project metadata and dependencies are defined in `pyproject.toml`.
- `lingua_learn_api.egg-info/` is generated during builds; version is `0.1.0`.

## Troubleshooting
- If `/ws` returns `{ "type": "error" }`, verify the client is sending the correct JSON structure and a valid base64/data URL.
- If CUDA is expected but not used, check `torch.cuda.is_available()` and CUDA drivers/toolkit installation.
- If MediaPipe hand detection fails often, consider adjusting padding or confidence thresholds in `hand_detection.py`.
