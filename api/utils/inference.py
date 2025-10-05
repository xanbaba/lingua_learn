import base64
import io
from typing import Dict

from PIL import Image
import torch
from transformers import AutoImageProcessor, SiglipForImageClassification


MODEL_NAME = "prithivMLmods/Alphabet-Sign-Language-Detection"


_processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
_model = SiglipForImageClassification.from_pretrained(MODEL_NAME)
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
_model.to(_device)
_model.eval()

_LABELS = {
    "0": "A", "1": "B", "2": "C", "3": "D", "4": "E", "5": "F", "6": "G",
    "7": "H", "8": "I", "9": "J", "10": "K", "11": "L", "12": "M", "13": "N",
    "14": "O", "15": "P", "16": "Q", "17": "R", "18": "S", "19": "T",
    "20": "U", "21": "V", "22": "W", "23": "X", "24": "Y", "25": "Z",
}


def _decode_data_url_to_image(data_url: str) -> Image.Image:
    """Decode a data URL or raw base64 JPEG into a PIL Image (RGB)."""
    if "," in data_url:
        _, b64_data = data_url.split(",", 1)
    else:
        b64_data = data_url
    image_bytes = base64.b64decode(b64_data)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return image


def _classify_image(image: Image.Image) -> Dict[str, float]:
    inputs = _processor(images=image, return_tensors="pt").to(_device)
    with torch.no_grad():
        outputs = _model(**inputs)
        logits = outputs.logits
        probs = torch.nn.functional.softmax(logits, dim=1).squeeze().tolist()
    predictions = {_LABELS[str(i)]: round(probs[i], 3) for i in range(len(probs))}
    return predictions


def predict_from_data_url(data_url: str) -> Dict[str, float]:
    """
    Public API: take a data URL or base64 JPEG string and return label->prob mapping.
    Heavy work; run this in a thread/executor from async contexts.
    """
    image = _decode_data_url_to_image(data_url)
    return _classify_image(image)


