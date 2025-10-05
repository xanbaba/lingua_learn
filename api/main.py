from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import json
from .utils import predict_from_data_url


app = FastAPI(title="Lingua Learn API")


@app.get("/healthz")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Welcome to Lingua Learn API"}



@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await websocket.accept()
    try:
        loop = asyncio.get_running_loop()
        while True:
            message = await websocket.receive_text()
            try:
                payload = json.loads(message)
                if payload.get("type") != "frame" or "data" not in payload:
                    await websocket.send_text(json.dumps({"type": "error"}))
                    continue
                data_url: str = payload["data"]
                predictions = await loop.run_in_executor(None, predict_from_data_url, data_url)
                await websocket.send_text(json.dumps({"type": "prediction", "data": predictions}))
            except Exception:
                await websocket.send_text(json.dumps({"type": "error"}))
    except WebSocketDisconnect:
        # client disconnected
        pass
