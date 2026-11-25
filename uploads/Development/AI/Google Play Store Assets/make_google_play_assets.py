"""Creates GnollHack's Google Play feature graphic.

Writes GH_GOOGLE_PLAY_FEATURE_GRAPHIC.png into <out-dir>, and check images (downscale tests,
the cutoff zones, a simulated video cover, and the graphic on light and dark backgrounds)
into --checks-dir. The table ASSETS below sets the art, crop, grading and lockup. The art
placement, grading and lockup come from make_steam_store_assets.py in the sibling folder
Steam Store Assets, so that the Google Play and Steam images share one style.

Instructions: https://wiki.gnollhack.com/Development/AI/Google%20Play%20Store%20Assets

Usage:
    python make_google_play_assets.py --art-dir <portrait folder> --out-dir <output folder>
        [--checks-dir <folder>] [--examples-dir <folder>] [--gnollhack-repo C:\\hmp\\GnollHack]
        [--force]
"""
import argparse
import importlib.util
import os
import sys
import tempfile

from PIL import Image, ImageDraw

STEAM_SCRIPT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..",
                                             "Steam Store Assets", "make_steam_store_assets.py"))
STEAM_NAMES = ("PORTRAITS", "place_art", "grade", "Lockup")


def load_steam():
    """Loads the Steam store asset script as a module."""
    if not os.path.isfile(STEAM_SCRIPT):
        raise SystemExit("Missing the Steam store asset script: " + STEAM_SCRIPT)
    spec = importlib.util.spec_from_file_location("make_steam_store_assets", STEAM_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    missing = [n for n in STEAM_NAMES if not hasattr(module, n)]
    if missing:
        raise SystemExit(STEAM_SCRIPT + " no longer defines: " + ", ".join(missing))
    return module


steam = load_steam()

# One entry per image, with the keys of the Steam script's ASSETS: art, focus, at, zoom, extend,
# grade and lockup. Its portraits and face boxes are the Steam script's PORTRAITS.
ASSETS = [
    {"name": "featuregraphic", "file": "GH_GOOGLE_PLAY_FEATURE_GRAPHIC.png", "size": (1024, 500),
     "art": "WomanRanger", "at": (0.29, 0.26), "zoom": 1.0,
     "grade": {"brightness": 1.2, "side": ("bottom", 0.5, 225), "edges": (30, 0, 15, 90)},
     "lockup": {"variant": "name", "width": 620, "center": (0.5, 0.765)}},
]

# Cutoff zones as fractions of the image: left, top, right, bottom. Measured from the diagram in
# Google's Play Console Help on November 25, 2026; Google gives no numbers.
CUTOFF = (0.15, 0.15, 0.15, 0.15)

# Play button of the video cover, centered, as fractions of the image height. An estimate.
PLAY_BUTTON = {"radius": 0.12, "margin": 0.03}

# Pixels darker than this luminance count as near-black. The finished image may not have more
# of them than the ungraded art of its crop.
DARK_LEVEL = 24

MAX_BYTES = 15 * 1024 * 1024
DOWNSCALES = [(512, 250), (256, 125)]
BACKGROUNDS = ((255, 255, 255), (18, 18, 18))


def safe_area(size):
    """Returns the box inside the cutoff zones: left, top, right, bottom."""
    w, h = size
    left, top, right, bottom = CUTOFF
    return (left * w, top * h, w - right * w, h - bottom * h)


def play_zone(size, margin=True):
    """Returns the play button zone as (center x, center y, radius)."""
    w, h = size
    r = PLAY_BUTTON["radius"] + (PLAY_BUTTON["margin"] if margin else 0)
    return w / 2, h / 2, r * h


def inside(box, area):
    return box[0] >= area[0] and box[1] >= area[1] and box[2] <= area[2] and box[3] <= area[3]


def overlaps(a, b):
    return not (a[2] <= b[0] or a[0] >= b[2] or a[3] <= b[1] or a[1] >= b[3])


def hits_circle(box, circle):
    cx, cy, r = circle
    nx, ny = min(max(cx, box[0]), box[2]), min(max(cy, box[1]), box[3])
    return (nx - cx) ** 2 + (ny - cy) ** 2 < r * r


def place_lockup(base, lockup, spec):
    """Draws the lockup centered on spec["center"]; returns the box of the visible shield and letters."""
    layer, box = lockup.render(spec["variant"], spec["width"], spec.get("shield"), spec.get("shadow", 1.0))
    w, h = base.size
    x = round(spec["center"][0] * w - (box[0] + box[2]) / 2)
    y = round(spec["center"][1] * h - (box[1] + box[3]) / 2)
    full = Image.new("RGBA", base.size, (0, 0, 0, 0))
    full.paste(layer, (x, y))
    base.alpha_composite(full)
    return (box[0] + x, box[1] + y, box[2] + x, box[3] + y)


def dark_share(img):
    """Returns the fraction of pixels with a luminance below DARK_LEVEL."""
    hist = img.convert("L").histogram()
    return sum(hist[:DARK_LEVEL]) / (img.width * img.height)


def make_asset(spec, args, lockup):
    """Returns (image, face box, lockup box, near-black share of the ungraded art) of one asset."""
    art, face_box = steam.place_art(args.art_dir, spec)
    base = steam.grade(art, spec["grade"])
    vis = place_lockup(base, lockup, spec["lockup"])
    return base.convert("RGB"), face_box, vis, dark_share(art)


def warn(spec, img, face, vis, art_dark):
    """Prints a warning for every Google Play rule the image breaks."""
    name = spec["name"]
    safe = safe_area(img.size)
    zone = play_zone(img.size)
    if not inside(vis, safe):
        print("WARNING: %s: the lockup %s reaches into a cutoff zone (safe area %s)"
              % (name, vis, tuple(round(v) for v in safe)))
    if not inside(face, safe):
        print("WARNING: %s: the face %s is not inside the safe area" % (name, face))
    if hits_circle(vis, zone):
        print("WARNING: %s: the lockup %s intersects the play button zone" % (name, vis))
    if hits_circle(face, zone):
        print("WARNING: %s: the face %s intersects the play button zone" % (name, face))
    if overlaps(vis, face):
        print("WARNING: %s: the lockup %s covers the face %s" % (name, vis, face))
    dark = dark_share(img)
    print("  %s: near-black (luminance below %d): %.1f%% of the image, %.1f%% of the ungraded art"
          % (name, DARK_LEVEL, dark * 100, art_dark * 100))
    if dark > art_dark:
        print("WARNING: %s: the image has more near-black pixels than its ungraded art" % name)


def draw_play_button(img):
    """Returns the image with a generic video play button at the estimated size."""
    w, h = img.size
    k = 4
    cx, cy, r = (v * k for v in play_zone(img.size, margin=False))
    layer = Image.new("RGBA", (w * k, h * k), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(0, 0, 0, 110),
                 outline=(255, 255, 255, 255), width=round(0.06 * r))
    t = 0.5 * r
    draw.polygon([(cx + t, cy), (cx - t / 2, cy - 0.866 * t), (cx - t / 2, cy + 0.866 * t)],
                 fill=(255, 255, 255, 255))
    out = img.convert("RGBA")
    out.alpha_composite(layer.resize((w, h), Image.LANCZOS))
    return out.convert("RGB")


def draw_zones(img, face, vis):
    """Returns the image with the cutoff zones (red), face (yellow), lockup (green) and play button zone."""
    w, h = img.size
    out = img.convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, 0, w - 1, h - 1), fill=(255, 0, 0, 90))
    draw.rectangle(tuple(round(v) for v in safe_area(img.size)), fill=(0, 0, 0, 0))
    out.alpha_composite(overlay)
    draw = ImageDraw.Draw(out)
    draw.rectangle(face, outline=(255, 255, 0), width=3)
    draw.rectangle(vis, outline=(0, 255, 0), width=3)
    for circle, width in ((play_zone(img.size), 3), (play_zone(img.size, margin=False), 1)):
        cx, cy, r = circle
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(255, 255, 255), width=width)
    return out.convert("RGB")


def write_checks(img, face, vis, checks_dir, examples_dir):
    """Writes the check images, and the wiki example images if examples_dir is given."""
    os.makedirs(checks_dir, exist_ok=True)

    def save(image, name):
        path = os.path.join(checks_dir, name)
        image.save(path)
        print("  check:", path)

    for size in DOWNSCALES:
        save(img.resize(size, Image.LANCZOS), "downscale_%dx%d.png" % size)
    zones = draw_zones(img, face, vis)
    save(zones, "cutoff_zones.png")
    save(draw_play_button(img), "video_cover_simulated.png")

    small = img.resize(DOWNSCALES[0], Image.LANCZOS)
    pad = 40
    panel = (small.width + 2 * pad, small.height + 2 * pad)
    sheet = Image.new("RGB", (panel[0] * len(BACKGROUNDS), panel[1]))
    for i, color in enumerate(BACKGROUNDS):
        sheet.paste(color, (i * panel[0], 0, (i + 1) * panel[0], panel[1]))
        sheet.paste(small, (i * panel[0] + pad, pad))
    save(sheet, "on_backgrounds.png")

    if examples_dir:
        os.makedirs(examples_dir, exist_ok=True)
        for image, name in ((img, "example_feature_graphic.jpg"), (zones, "example_cutoff_zones.jpg")):
            path = os.path.join(examples_dir, name)
            image.save(path, quality=85, optimize=True)
            print("  example:", path, os.path.getsize(path) // 1024, "KB")


def main():
    parser = argparse.ArgumentParser(description="Creates GnollHack's Google Play feature graphic.")
    parser.add_argument("--art-dir", required=True, help="folder with the portrait PNG files")
    parser.add_argument("--out-dir", required=True, help="output folder; the graphic is written directly into it")
    parser.add_argument("--checks-dir", default=os.path.join(tempfile.gettempdir(), "gnollhack_google_play_asset_checks"),
                        help="folder for the check images (default: in the system temp folder)")
    parser.add_argument("--examples-dir", help="folder for the two example JPG files of the wiki page")
    parser.add_argument("--gnollhack-repo", default=r"C:\hmp\GnollHack", help="GnollHack repository, for the shield")
    parser.add_argument("--force", action="store_true", help="overwrite an existing output image")
    args = parser.parse_args()

    for spec in ASSETS:
        portrait = os.path.join(args.art_dir, spec["art"] + ".png")
        if spec["art"] not in steam.PORTRAITS:
            raise SystemExit("No face box for %s in the Steam script's PORTRAITS" % spec["art"])
        if not os.path.isfile(portrait):
            raise SystemExit("Missing portrait: " + portrait)
    existing = [os.path.join(args.out_dir, a["file"]) for a in ASSETS if os.path.exists(os.path.join(args.out_dir, a["file"]))]
    if existing and not args.force:
        raise SystemExit("These outputs exist; use --force to overwrite them:\n  " + "\n  ".join(existing))

    lockup = steam.Lockup(args.gnollhack_repo)
    os.makedirs(args.out_dir, exist_ok=True)
    for spec in ASSETS:
        img, face, vis, art_dark = make_asset(spec, args, lockup)
        assert img.mode == "RGB" and img.size == spec["size"], spec["name"]
        path = os.path.join(args.out_dir, spec["file"])
        img.save(path)
        size = os.path.getsize(path)
        assert size <= MAX_BYTES, "%s: %d bytes is over the 15 MB limit" % (spec["name"], size)
        print("%-16s %s %dx%d %s %d KB  face %s  lockup %s" % (spec["name"], spec["file"], img.width, img.height,
                                                               img.mode, size // 1024, face, vis))
        warn(spec, img, face, vis, art_dark)
        write_checks(img, face, vis, args.checks_dir, args.examples_dir)


if __name__ == "__main__":
    sys.exit(main())
