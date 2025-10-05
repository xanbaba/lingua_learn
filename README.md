## Lingua Learn API (FastAPI + uv)

### Prerequisites
- Python 3.10+
- `uv` package manager. Install via:

```bash
pip install uv
```

### Setup

```bash
uv sync
```

### Run

Run with auto-reload during development:

```bash
uv run uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

Open `http://localhost:8000` and docs at `http://localhost:8000/docs`.

WebSocket endpoint: `ws://localhost:8000/ws`

Message format from client:

```json
{"type": "frame", "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."}
```

Server responses:
- `{ "type": "prediction", "data": { "A": 0.123, ... } }`
- `{ "type": "error" }`

### Test

```bash
uv run pytest -q
```

### Lint

```bash
uv run ruff check .
```


