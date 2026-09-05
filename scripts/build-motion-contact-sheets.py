"""Compose captured browser frames; requires Pillow. No synthetic frames.

Usage: python3 scripts/build-motion-contact-sheets.py docs/design/motion
"""
import json
import math
import sys
from pathlib import Path
from PIL import Image, ImageDraw

base = Path(sys.argv[1])
for sequence in json.loads((base / "manifest.json").read_text()):
    frames = sequence["files"]
    hero = sequence["name"].startswith("iphone")
    size = (280, 320) if hero else (360, 250)
    sheet = Image.new("RGB", (4 * size[0], math.ceil(len(frames) / 4) * (size[1] + 28)), "#e9e9e9")
    draw = ImageDraw.Draw(sheet)
    for index, frame in enumerate(frames):
        picture = Image.open(base / frame["file"]).convert("RGB")
        if hero:
            picture = picture.crop((680, 120, 1380, 880))
        picture.thumbnail(size)
        x, y = index % 4 * size[0], index // 4 * (size[1] + 28)
        sheet.paste(picture, (x + (size[0] - picture.width) // 2, y))
        draw.text((x + 8, y + size[1] + 4), f"{index:02} | {frame['ms']} ms", fill="#101010")
    sheet.save(base / (sequence["name"] + "-contact.png"))
