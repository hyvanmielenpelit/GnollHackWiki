"""Renders the Steam Deck Controls images from the HTML templates in this directory.

Usage: python build_images.py <output directory> [name ...]

Each template is rendered by headless Chrome at device scale factor 2 into
<output>/png/, then cropped and saved as WebP into <output>/webp/ with Pillow.
Optional names limit the run to the jobs whose output file name contains one of them.
"""

import concurrent.futures
import pathlib
import subprocess
import sys
import threading

from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SOURCES = pathlib.Path(__file__).resolve().parent
WORKERS = 4

# Badge widths at the glyph height of 44 device pixels (GH.badgeWidth)
GLYPH_HEIGHT = 44
GLYPH_WIDTHS = {"bumper": 66, "trigger": 59, "grip": 59, "stickclick": 57}
GLYPHS = {
    # Steam Deck
    "a": "face", "b": "face", "x": "face", "y": "face",
    "l1": "bumper", "r1": "bumper", "l2": "trigger", "r2": "trigger",
    "l3": "stickclick", "r3": "stickclick",
    "l4": "grip", "l5": "grip", "r4": "grip", "r5": "grip",
    "view": "square", "menu": "square",
    "dpad": "square", "dpad-up": "square", "dpad-down": "square", "dpad-left": "square", "dpad-right": "square",
    "lstick": "square", "rstick": "square",
    # Xbox
    "lb": "bumper", "rb": "bumper", "lt": "trigger", "rt": "trigger",
    "ls": "stickclick", "rs": "stickclick",
    "p1": "grip", "p2": "grip", "p3": "grip", "p4": "grip",
    # PlayStation
    "ps-cross": "square", "ps-circle": "square", "ps-square": "square", "ps-triangle": "square",
    # Nintendo
    "n-l": "bumper", "n-r": "bumper", "zl": "trigger", "zr": "trigger",
}

# (template, query, CSS width, CSS height, output file, lossless)
FIGURES = [
    ("steam-deck-front.html", "", 860, 280, "steam-deck-front.webp", True),
    ("steam-deck-top-back.html", "", 860, 210, "steam-deck-top-back.webp", True),
    ("map-controls.html", "layer=alone", 860, 300, "map-controls.webp", True),
    ("map-controls.html", "layer=l1", 860, 300, "map-controls-l1-v2.webp", True),
    ("map-controls.html", "layer=r1", 860, 300, "map-controls-r1-v2.webp", True),
    ("hint-strip.html", "", 860, 198, "hint-strip-v2.webp", True),
    ("radial-actions.html", "", 860, 450, "radial-actions.webp", False),
    ("radial-toggles.html", "", 600, 600, "radial-toggles.webp", False),
    ("radial-quick.html", "", 860, 450, "radial-quick.webp", False),
    ("radial-direction.html", "", 600, 600, "radial-direction.webp", False),
]


def jobs():
    for name, kind in GLYPHS.items():
        width = GLYPH_WIDTHS.get(kind, GLYPH_HEIGHT)
        yield {"template": "glyph.html", "query": "name=" + name, "css": (48, 22),
               "out": "glyph-" + name + ".webp", "crop": (0, 0, width, GLYPH_HEIGHT), "lossless": True}
    for template, query, width, height, out, lossless in FIGURES:
        yield {"template": template, "query": query, "css": (width, height), "out": out,
               "crop": None, "lossless": lossless}


def render(job, out_dir):
    # One Chrome profile per worker thread, since two Chrome processes cannot share one
    worker = threading.current_thread().name.rsplit("_", 1)[-1]
    png = out_dir / "png" / (pathlib.Path(job["out"]).stem + ".png")
    url = (SOURCES / job["template"]).as_uri() + ("?" + job["query"] if job["query"] else "")
    width, height = job["css"]
    args = [
        CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
        "--user-data-dir=" + str(out_dir / ("chrome-profile-" + str(worker))),
        "--default-background-color=00000000", "--force-device-scale-factor=2",
        "--window-size=%d,%d" % (width, height), "--virtual-time-budget=5000",
        "--screenshot=" + str(png), url,
    ]
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    image = Image.open(png).convert("RGBA")
    if job["crop"]:
        image = image.crop(job["crop"])
    webp = out_dir / "webp" / job["out"]
    if job["lossless"]:
        image.save(webp, "WEBP", lossless=True, quality=100, method=6)
    else:
        image.save(webp, "WEBP", quality=90, method=6)
    return webp


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    out_dir = pathlib.Path(sys.argv[1]).resolve()
    filters = sys.argv[2:]
    (out_dir / "png").mkdir(parents=True, exist_ok=True)
    (out_dir / "webp").mkdir(parents=True, exist_ok=True)
    selected = [j for j in jobs() if not filters or any(f in j["out"] for f in filters)]
    with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = [pool.submit(render, job, out_dir) for job in selected]
        for future in futures:
            webp = future.result()
            print("%-32s %7d bytes" % (webp.name, webp.stat().st_size))


if __name__ == "__main__":
    main()
