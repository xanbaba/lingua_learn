from __future__ import annotations

from typing import Optional, Tuple

import numpy as np
from PIL import Image
import mediapipe as mp


_mp_hands = mp.solutions.hands
_hands = _mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
)


def detect_hand_bbox(image_rgb: np.ndarray, padding: int = 20) -> Optional[Tuple[int, int, int, int]]:
    """
    Detect a single hand bounding box from an RGB uint8 image array.
    Returns (xmin, ymin, xmax, ymax) or None if not found.
    """
    results = _hands.process(image_rgb)
    if not results.multi_hand_landmarks:
        return None

    h, w, _ = image_rgb.shape
    hand_landmarks = results.multi_hand_landmarks[0]
    x_coords = [int(lm.x * w) for lm in hand_landmarks.landmark]
    y_coords = [int(lm.y * h) for lm in hand_landmarks.landmark]

    xmin, xmax = max(0, min(x_coords)), min(w, max(x_coords))
    ymin, ymax = max(0, min(y_coords)), min(h, max(y_coords))

    xmin = max(0, xmin - padding)
    ymin = max(0, ymin - padding)
    xmax = min(w, xmax + padding)
    ymax = min(h, ymax + padding)

    if xmin >= xmax or ymin >= ymax:
        return None
    return xmin, ymin, xmax, ymax


def crop_hand_pil(image: Image.Image, padding: int = 40) -> Optional[Image.Image]:
    """
    Return a cropped PIL image around the detected hand, or None if no hand found.
    """
    image_rgb = np.array(image)
    bbox = detect_hand_bbox(image_rgb, padding=padding)
    if bbox is None:
        return None
    xmin, ymin, xmax, ymax = bbox
    return image.crop((xmin, ymin, xmax, ymax))


