#!/usr/bin/env python3
"""Generate app icons for The Prompt"""
from PIL import Image, ImageDraw, ImageFont
import os

BG_COLOR = (26, 26, 46)       # #1a1a2e
PRIMARY = (233, 69, 96)       # #e94560
ACCENT = (15, 52, 96)         # #0f3460
WHITE = (255, 255, 255)

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = os.path.join(BASE, "android", "app", "src", "main", "res")

MIPMAP_SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

ADAPTIVE_SIZES = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}


def draw_icon(size, padding_ratio=0.1):
    """Draw the app icon at given size"""
    img = Image.new("RGBA", (size, size), BG_COLOR + (255,))
    draw = ImageDraw.Draw(img)

    pad = int(size * padding_ratio)
    inner = size - pad * 2

    # Draw a rounded rectangle background accent
    box_h = int(inner * 0.45)
    box_y = (size - box_h) // 2
    box_margin = int(size * 0.15)
    draw.rounded_rectangle(
        [box_margin, box_y, size - box_margin, box_y + box_h],
        radius=int(size * 0.08),
        fill=ACCENT,
    )

    # Draw "P" letter as the main icon element (bold, centered)
    # Use a large font size relative to icon
    font_size = int(size * 0.55)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except (OSError, IOError):
        try:
            font = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", font_size)
        except (OSError, IOError):
            font = ImageFont.load_default()

    text = "P"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (size - tw) // 2
    ty = (size - th) // 2 - int(size * 0.05)

    # Draw text shadow
    draw.text((tx + 2, ty + 2), text, fill=(0, 0, 0, 80), font=font)
    # Draw main text
    draw.text((tx, ty), text, fill=PRIMARY, font=font)

    # Draw small ">" prompt cursor (only for sizes large enough)
    if size >= 96:
        cursor_size = max(10, int(size * 0.12))
        try:
            cursor_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", cursor_size)
        except (OSError, IOError):
            cursor_font = font
        cursor_x = tx + tw + int(size * 0.02)
        cursor_y = ty + th - cursor_size - int(size * 0.05)
        draw.text((cursor_x, cursor_y), ">_", fill=WHITE, font=cursor_font)

    return img


def draw_adaptive_foreground(size):
    """Draw adaptive icon foreground (with safe zone padding)"""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Adaptive icons have 66% safe zone in center
    safe_zone = int(size * 66 / 108)
    offset = (size - safe_zone) // 2

    # Draw "P" centered in safe zone
    font_size = int(safe_zone * 0.65)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except (OSError, IOError):
        font = ImageFont.load_default()

    text = "P"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (size - tw) // 2
    ty = (size - th) // 2 - int(safe_zone * 0.03)

    draw.text((tx, ty), text, fill=PRIMARY, font=font)

    # Cursor
    cursor_size = int(safe_zone * 0.14)
    try:
        cursor_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", cursor_size)
    except (OSError, IOError):
        cursor_font = font
    cursor_x = tx + tw + int(safe_zone * 0.02)
    cursor_y = ty + th - cursor_size - int(safe_zone * 0.06)
    draw.text((cursor_x, cursor_y), ">_", fill=WHITE, font=cursor_font)

    return img


def draw_adaptive_background(size):
    """Solid background for adaptive icon"""
    img = Image.new("RGBA", (size, size), BG_COLOR + (255,))
    draw = ImageDraw.Draw(img)

    # Subtle accent rectangle
    margin = int(size * 0.25)
    box_h = int(size * 0.28)
    box_y = (size - box_h) // 2
    draw.rounded_rectangle(
        [margin, box_y, size - margin, box_y + box_h],
        radius=int(size * 0.06),
        fill=ACCENT,
    )
    return img


def main():
    os.makedirs(os.path.join(BASE, "assets"), exist_ok=True)

    # 1. Generate Play Store icon (512x512)
    store_icon = draw_icon(512, padding_ratio=0.08)
    store_path = os.path.join(BASE, "assets", "icon-512.png")
    store_icon.save(store_path, "PNG")
    print(f"Created {store_path}")

    # 2. Generate legacy mipmap icons
    for folder, size in MIPMAP_SIZES.items():
        folder_path = os.path.join(RES, folder)
        os.makedirs(folder_path, exist_ok=True)

        icon = draw_icon(size)
        # ic_launcher.png (square)
        icon.save(os.path.join(folder_path, "ic_launcher.png"), "PNG")
        # ic_launcher_round.png (circular mask)
        mask = Image.new("L", (size, size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse([0, 0, size, size], fill=255)
        round_icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        round_icon.paste(icon, mask=mask)
        round_icon.save(os.path.join(folder_path, "ic_launcher_round.png"), "PNG")

        print(f"Created {folder}/{size}x{size}")

    # 3. Generate adaptive icon layers
    for folder, size in ADAPTIVE_SIZES.items():
        folder_path = os.path.join(RES, folder)
        os.makedirs(folder_path, exist_ok=True)

        fg = draw_adaptive_foreground(size)
        fg.save(os.path.join(folder_path, "ic_launcher_foreground.png"), "PNG")

        bg = draw_adaptive_background(size)
        bg.save(os.path.join(folder_path, "ic_launcher_background.png"), "PNG")

        print(f"Created {folder} adaptive layers {size}x{size}")

    # 4. Create adaptive icon XML
    xml_dir = os.path.join(RES, "mipmap-anydpi-v26")
    os.makedirs(xml_dir, exist_ok=True)

    adaptive_xml = """<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
"""
    with open(os.path.join(xml_dir, "ic_launcher.xml"), "w") as f:
        f.write(adaptive_xml)
    with open(os.path.join(xml_dir, "ic_launcher_round.xml"), "w") as f:
        f.write(adaptive_xml)

    print(f"Created adaptive icon XMLs")

    # 5. Feature graphic (1024x500)
    fg_img = Image.new("RGB", (1024, 500), BG_COLOR)
    draw = ImageDraw.Draw(fg_img)

    # Background accent bar
    draw.rounded_rectangle([80, 150, 944, 350], radius=20, fill=ACCENT)

    # Title text
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 72)
        sub_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
    except (OSError, IOError):
        title_font = ImageFont.load_default()
        sub_font = title_font

    # "THE" small
    bbox = draw.textbbox((0, 0), "THE", font=sub_font)
    tw = bbox[2] - bbox[0]
    draw.text(((1024 - tw) // 2, 175), "THE", fill=(160, 160, 176), font=sub_font)

    # "PROMPT" large
    bbox = draw.textbbox((0, 0), "PROMPT", font=title_font)
    tw = bbox[2] - bbox[0]
    draw.text(((1024 - tw) // 2, 210), "PROMPT", fill=PRIMARY, font=title_font)

    # Tagline
    bbox = draw.textbbox((0, 0), "Think Fast. Answer Faster.", font=sub_font)
    tw = bbox[2] - bbox[0]
    draw.text(((1024 - tw) // 2, 310), "Think Fast. Answer Faster.", fill=(160, 160, 176), font=sub_font)

    fg_path = os.path.join(BASE, "assets", "feature-graphic.png")
    fg_img.save(fg_path, "PNG")
    print(f"Created {fg_path}")

    print("\nDone! All icons and assets generated.")


if __name__ == "__main__":
    main()
