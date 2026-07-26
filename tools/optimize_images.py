from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "images"
MAX_EDGE = 1920
QUALITY = 82

for source in sorted(IMAGE_DIR.glob("*.jpg")):
    if source.name == "wechat-qrcode.jpg":
        continue
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGB")
        image.save(target, "WEBP", quality=QUALITY, method=6)
    print(f"{source.name}: {source.stat().st_size / 1024:.0f} KB -> {target.stat().st_size / 1024:.0f} KB")