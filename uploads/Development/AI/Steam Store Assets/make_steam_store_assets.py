"""Creates GnollHack's Steam store and library images.

Writes the nine images into <out-dir>\\STORE and <out-dir>\\LIBRARY, and check images
(downscale tests, the hero safe area, the logo over the hero, a simulated store page
background, and a contact sheet) into --checks-dir. The tables PORTRAITS and ASSETS below
set the art, crop, grading and lockup of every image.

Instructions: https://wiki.gnollhack.com/Development/AI/Steam%20Store%20Assets
Also loaded as a module by ..\\Google Play Store Assets\\make_google_play_assets.py.

Usage:
    python make_steam_store_assets.py --art-dir <portrait folder> --out-dir <output folder>
        [--checks-dir <folder>] [--examples-dir <folder>] [--gnollhack-repo C:\\hmp\\GnollHack]
        [--only <asset names>] [--force]
"""
import argparse
import glob
import math
import os
import sys
import tempfile

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont

GAME_NAME = "GnollHack"
SHIELD = r"win\win32\xpl\GnollHackM\Assets\AppIcon\gnollhack-icon-v2-512-1240_x_1240.png"

GOLD = ((255, 226, 140), (196, 132, 48))      # vertical gradient of the game name, top to bottom
GLOW = (255, 170, 60)
SHADE = (14, 9, 6)                            # warm near-black of the grading overlays
STEAM_PAGE = (27, 40, 56)                     # Steam store page background color
MARGIN = 0.05                                 # minimum lockup distance from every edge, x image width

# Library Hero safe area that Steam never crops: left, top, right, bottom
HERO_SAFE = (1490, 430, 2350, 810)

# Face of each portrait, forehead to mouth, as fractions of the source: left, top, right, bottom
PORTRAITS = {
    "DwarfWarrior": {"face": (0.47, 0.30, 0.60, 0.665)},
    "WomanRanger": {"face": (0.265, 0.165, 0.335, 0.30)},
}

# One entry per image.
#   art: portrait file name without .png; focus: source point (fractions, default the face center)
#   that lands at canvas point "at"; zoom: scale relative to the smallest scale that covers the canvas.
#   Art that does not cover the canvas is extended with mirrored, blurred art.
#   grade: see grade(). lockup: variant "horizontal", "stacked" or "name" (no shield), visible width in px,
#   and the center of the visible lockup as canvas fractions; over_face allows it over the face.
ASSETS = [
    {"name": "storeheader", "file": r"STORE\GH_STEAM_ASSET_STOREHEADER.png", "size": (920, 430),
     "art": "DwarfWarrior", "at": (0.76, 0.47), "zoom": 1.0,
     "grade": {"side": ("left", 0.66, 235), "edges": (60, 110, 0, 40)},
     "lockup": {"variant": "stacked", "width": 465, "center": (0.306, 0.5), "shield": 2.2}},
    {"name": "smallcapsule", "file": r"STORE\GH_STEAM_ASSET_STORE_SMALLCAPSULE.png", "size": (462, 174),
     "art": "DwarfWarrior", "at": (0.62, 0.45), "zoom": 1.0,
     "grade": {"brightness": 0.36, "blur": 1.5, "edges": (40, 60, 40, 40)},
     "lockup": {"variant": "name", "width": 410, "center": (0.5, 0.5), "over_face": True}},
    {"name": "maincapsule", "file": r"STORE\GH_STEAM_ASSET_STORE_MAINCAPSULE.png", "size": (1232, 706),
     "art": "WomanRanger", "at": (0.25, 0.26), "zoom": 1.05,
     "grade": {"side": ("right", 0.62, 215), "edges": (50, 120, 30, 0)},
     "lockup": {"variant": "stacked", "width": 580, "center": (0.71, 0.5), "shield": 2.3}},
    {"name": "verticalcapsule", "file": r"STORE\GH_STEAM_ASSET_STORE_VERTICALCAPSULE.png", "size": (748, 896),
     "art": "WomanRanger", "focus": (0.43, 0.235), "at": (0.5, 0.17), "zoom": 1.0,
     "grade": {"side": ("bottom", 0.6, 245), "edges": (50, 0, 40, 40)},
     "lockup": {"variant": "stacked", "width": 540, "center": (0.5, 0.8), "shield": 2.1}},
    {"name": "pagebackground", "file": r"STORE\GH_STEAM_ASSET_STORE_PAGEBACKGROUND.png", "size": (1438, 810),
     "art": "WomanRanger", "at": (0.2, 0.3), "zoom": 1.15,
     "grade": {"contrast": 0.8, "saturation": 0.9, "brightness": 0.7, "blur": 2, "highlight": 150,
               "shade": STEAM_PAGE, "edges": (120, 150, 110, 110)}},
    {"name": "librarycapsule", "file": r"LIBRARY\GH_STEAM_ASSET_LIBRARYCAPSULE.png", "size": (600, 900),
     "art": "WomanRanger", "focus": (0.43, 0.235), "at": (0.535, 0.17), "zoom": 0.94,
     "grade": {"side": ("bottom", 0.6, 245), "edges": (50, 0, 40, 40)},
     "lockup": {"variant": "stacked", "width": 450, "center": (0.5, 0.8), "shield": 2.1}},
    {"name": "libraryheader", "file": r"LIBRARY\GH_STEAM_ASSET_LIBRARYHEADER.png", "size": (920, 430),
     "art": "WomanRanger", "at": (0.25, 0.26), "zoom": 1.05,
     "grade": {"side": ("right", 0.62, 215), "edges": (50, 120, 30, 0)},
     "lockup": {"variant": "stacked", "width": 430, "center": (0.70, 0.5), "shield": 2.3}},
    {"name": "libraryhero", "file": r"LIBRARY\GH_STEAM_ASSET_LIBRARYHERO.png", "size": (3840, 1240),
     "art": "DwarfWarrior", "at": (0.585, 0.5), "zoom": 0.40, "extend": "smear",
     "grade": {"side": ("left", 0.5, 140), "edges": (190, 200, 60, 60), "corner": (150, 0.45, 0.55)}},
    {"name": "librarylogo", "file": r"LIBRARY\GH_STEAM_ASSET_LIBRARYLOGO.png", "size": (1280, None),
     "lockup": {"variant": "horizontal", "width": 1280, "shadow": 1.6}},
]

# Valve's generated sizes, written as downscale tests
DOWNSCALES = {
    "storeheader": [(460, 215)],
    "smallcapsule": [(184, 69), (120, 45)],
    "librarycapsule": [(300, 450)],
    "libraryhero": [(1920, 620)],
}

# Library Logo positions that Steamworks offers over the hero, and the one set in Steamworks
LOGO_POSITIONS = ("bottom_left", "top_center", "center", "bottom_center")
LOGO_POSITION = "bottom_left"

# The Library Logo as the Steam client showed it at bottom left in a 2000-pixel-wide library view
# (November 23, 2026), as fractions of the hero: visible width, left edge, and vertical center.
# The client shows the logo larger than the uploaded file. The other positions are estimates.
LOGO_VIEW = {"width": 0.47, "left": 0.046, "center_y": 0.555}


def find_cinzel(style):
    """Returns the path of the installed static Cinzel font of the given style ("Bold" or "Black")."""
    dirs = [os.path.join(os.environ.get("LOCALAPPDATA", ""), r"Microsoft\Windows\Fonts"), r"C:\Windows\Fonts"]
    for d in dirs:
        for path in sorted(glob.glob(os.path.join(d, "Cinzel*.ttf"))):
            if ImageFont.truetype(path, 10).getname() == ("Cinzel", style):
                return path
    raise SystemExit("Cinzel " + style + " is not installed")


def ramp(size, horizontal, func):
    """Builds an L mask from func(t), where t runs from 0 to 1 across one axis and func returns 0..1."""
    n = size[0] if horizontal else size[1]
    line = Image.new("L", (n, 1) if horizontal else (1, n))
    line.putdata([round(max(0.0, min(1.0, func(i / n))) * 255) for i in range(n)])
    return line.resize(size)


def extend(src, box, mode="mirror"):
    """Returns the source padded so that box fits, and box in its coordinates.

    mode "mirror" pads with mirrored art. "smear" stretches the colors of the outermost columns and
    rows outward instead, for art whose subject would show up again in a mirrored copy. The padding
    is blurred.
    """
    sw, sh = src.size
    x0, y0, x1, y1 = box
    left, top = max(0, math.ceil(-x0)), max(0, math.ceil(-y0))
    right, bottom = max(0, math.ceil(x1 - sw)), max(0, math.ceil(y1 - sh))
    if not (left or top or right or bottom):
        return src, box
    if max(left, right) > sw or max(top, bottom) > sh:
        raise SystemExit("The art would need more than one mirrored copy; raise the zoom")
    w, h = sw + left + right, sh + top + bottom
    img = Image.new("RGB", (w, h))
    img.paste(src, (left, top))
    edge = max(8, round(0.01 * sw))

    def strip(region, size):
        part = img.crop(region)
        if mode == "smear":
            return part.resize((1, part.height), Image.BOX).resize(size, Image.BILINEAR)
        return part.transpose(Image.FLIP_LEFT_RIGHT)

    if left:
        img.paste(strip((left, top, left + (edge if mode == "smear" else left), top + sh), (left, sh)), (0, top))
    if right:
        img.paste(strip((left + sw - (edge if mode == "smear" else right), top, left + sw, top + sh), (right, sh)), (left + sw, top))
    def rows(region, height):
        part = img.crop(region)
        if mode == "smear":
            line = part.resize((w, 1), Image.BOX).filter(ImageFilter.GaussianBlur(0.02 * w))
            return line.resize((w, height), Image.BILINEAR)
        return part.transpose(Image.FLIP_TOP_BOTTOM)

    if top:
        img.paste(rows((0, top, w, top + (edge if mode == "smear" else top)), top), (0, 0))
    if bottom:
        img.paste(rows((0, top + sh - (edge if mode == "smear" else bottom), w, top + sh), bottom), (0, top + sh))
    feather = 0.04 * sw
    blurred = img.reduce(8).filter(ImageFilter.GaussianBlur(0.025 * sw / 8)).resize((w, h), Image.BICUBIC)
    across = ramp((w, h), True, lambda t: max(left - t * w, t * w - left - sw) / feather)
    down = ramp((w, h), False, lambda t: max(top - t * h, t * h - top - sh) / feather)
    img = Image.composite(blurred, img, ImageChops.lighter(across, down))
    return img, (x0 + left, y0 + top, x1 + left, y1 + top)


def art_geometry(art_dir, spec):
    """Returns the scale, the source point at the canvas origin, and the face box on the canvas."""
    with Image.open(os.path.join(art_dir, spec["art"] + ".png")) as src:
        sw, sh = src.size
    w, h = spec["size"]
    face = PORTRAITS[spec["art"]]["face"]
    fx, fy = spec.get("focus", ((face[0] + face[2]) / 2, (face[1] + face[3]) / 2))
    ax, ay = spec["at"]
    scale = spec["zoom"] * max(w / sw, h / sh)
    if scale > 1:
        raise SystemExit(spec["name"] + ": the art would be upscaled; lower the zoom")
    x0 = fx * sw - ax * w / scale
    y0 = fy * sh - ay * h / scale
    face_box = (round((face[0] * sw - x0) * scale), round((face[1] * sh - y0) * scale),
                round((face[2] * sw - x0) * scale), round((face[3] * sh - y0) * scale))
    return scale, x0, y0, face_box


def place_art(art_dir, spec):
    """Scales the portrait in one Lanczos step onto the canvas; returns the image and the face box on it."""
    scale, x0, y0, face_box = art_geometry(art_dir, spec)
    w, h = spec["size"]
    src = Image.open(os.path.join(art_dir, spec["art"] + ".png")).convert("RGB")
    img, box = extend(src, (x0, y0, x0 + w / scale, y0 + h / scale), spec.get("extend", "mirror"))
    return img.resize((w, h), Image.LANCZOS, box=box), face_box


def grade(img, g):
    """Grades the art and darkens parts of it with an overlay of g["shade"] (default SHADE).

    g keys: contrast, saturation, brightness, blur, highlight (values above it are compressed),
    side = (direction, extent, peak alpha) fading out from that side, edges = peak alphas of
    (top, bottom, left, right), corner = (peak alpha, width, top) of the lower left corner.
    """
    img = ImageEnhance.Contrast(img).enhance(g.get("contrast", 1.08))
    img = ImageEnhance.Color(img).enhance(g.get("saturation", 1.05))
    if "brightness" in g:
        img = ImageEnhance.Brightness(img).enhance(g["brightness"])
    if g.get("blur"):
        img = img.filter(ImageFilter.GaussianBlur(g["blur"]))
    if "highlight" in g:
        knee = g["highlight"]
        img = img.point(lambda v: v if v <= knee else round(knee + (v - knee) * 0.35))
    size = img.size
    masks = [Image.new("L", size, 0)]
    if "side" in g:
        direction, extent, peak = g["side"]
        flip = direction in ("right", "bottom")
        masks.append(ramp(size, direction in ("left", "right"),
                          lambda t: peak / 255 * max(0.0, 1 - ((1 - t) if flip else t) / extent) ** 1.6))
    top, bottom, left, right = g.get("edges", (0, 0, 0, 0))
    masks.append(ramp(size, False, lambda t: (top * max(0.0, 1 - t / 0.2) ** 1.5
                                              + bottom * max(0.0, 1 - (1 - t) / 0.35) ** 1.5) / 255))
    masks.append(ramp(size, True, lambda t: (left * max(0.0, 1 - t / 0.15) ** 1.5
                                             + right * max(0.0, 1 - (1 - t) / 0.15) ** 1.5) / 255))
    if "corner" in g:
        peak, width, start = g["corner"]
        masks.append(ImageChops.multiply(
            ramp(size, False, lambda t: peak / 255 * min(1.0, max(0.0, (t - start) / (1 - start))) ** 1.3),
            ramp(size, True, lambda t: max(0.0, 1 - t / width) ** 0.8)))
    alpha = masks[0]
    for m in masks[1:]:
        alpha = ImageChops.lighter(alpha, m)
    shade = Image.new("RGBA", size, g.get("shade", SHADE) + (0,))
    shade.putalpha(alpha)
    out = img.convert("RGBA")
    out.alpha_composite(shade)
    return out


class Lockup:
    """The GnollHack shield and the gold game name, or the name alone, rendered on a transparent layer."""

    def __init__(self, gnollhack_repo):
        self.font_path = find_cinzel("Black")
        shield = Image.open(os.path.join(gnollhack_repo, SHIELD)).convert("RGBA")
        self.shield = shield.crop(shield.getchannel("A").getbbox())
        bb = ImageFont.truetype(self.font_path, 1000).getbbox(GAME_NAME)
        self.name_width = (bb[2] - bb[0]) / 1000     # ink width per px of font size

    def render(self, variant, width, shield=None, shadow=1.0):
        """Returns (layer, box): the RGBA layer and the box of the visible shield and letters on it.

        width is the visible width in px; shield is the shield height per px of font size.
        """
        if variant == "name":
            size = int(width / self.name_width)
            fnt = ImageFont.truetype(self.font_path, size)
            bb = fnt.getbbox(GAME_NAME)
            tw, th = bb[2] - bb[0], bb[3] - bb[1]
            pad = round(size * 0.6 * shadow)
            layer = Image.new("RGBA", (tw + 2 * pad, th + 2 * pad), (0, 0, 0, 0))
            self._name(layer, fnt, pad - bb[0], pad - bb[1], size, shadow)
            return layer, (pad, pad, pad + tw, pad + th)
        aspect = self.shield.width / self.shield.height
        if variant == "horizontal":
            shield = shield or 1.5
            gap = 0.3
            size = int(width / (aspect * shield + gap + self.name_width))
        else:
            shield = shield or 2.6
            gap = 0.22
            size = int(width / max(aspect * shield, self.name_width))
        fnt = ImageFont.truetype(self.font_path, size)
        bb = fnt.getbbox(GAME_NAME)
        tw, th = bb[2] - bb[0], bb[3] - bb[1]
        sh = round(shield * size)
        if sh > self.shield.height:
            print("WARNING: the shield is upscaled to %d px" % sh)
        logo = self.shield.resize((round(sh * aspect), sh), Image.LANCZOS)
        sw = logo.width
        g = round(gap * size)
        if variant == "horizontal":
            w, h = sw + g + tw, max(sh, th)
            spos, tpos = (0, (h - sh) // 2), (sw + g, (h - th) // 2)
        else:
            w, h = max(sw, tw), sh + g + th
            spos, tpos = ((w - sw) // 2, 0), ((w - tw) // 2, sh + g)
        pad = round(max(sh * 0.35, size * 0.6) * shadow)
        layer = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
        sx, sy = spos[0] + pad, spos[1] + pad
        self._shield(layer, logo, sx, sy, shadow)
        tx, ty = tpos[0] + pad, tpos[1] + pad
        self._name(layer, fnt, tx - bb[0], ty - bb[1], size, shadow)
        return layer, (pad, pad, pad + w, pad + h)

    @staticmethod
    def _shield(layer, logo, x, y, shadow):
        h = logo.height
        blur = max(1, round(h / 12 * shadow))
        sh = Image.new("RGBA", layer.size, (0, 0, 0, 0))
        sh.paste((0, 0, 0, 255), (x, y + max(1, h // 20), x + logo.width, y + max(1, h // 20) + h), logo.getchannel("A"))
        layer.alpha_composite(sh.filter(ImageFilter.GaussianBlur(blur)))
        layer.alpha_composite(logo, (x, y))

    @staticmethod
    def _name(layer, fnt, x, y, size, shadow):
        mask = Image.new("L", layer.size, 0)
        ImageDraw.Draw(mask).text((x, y), GAME_NAME, font=fnt, fill=255)
        box = mask.getbbox()
        blur = max(1, round(size * 0.1 * shadow))
        dark = Image.new("L", layer.size, 0)
        dark.paste(mask.filter(ImageFilter.GaussianBlur(blur)).point(lambda v: min(255, v * 2)), (0, max(1, blur // 3)))
        shadow_layer = Image.new("RGBA", layer.size, (0, 0, 0, 0))
        shadow_layer.putalpha(dark)
        layer.alpha_composite(shadow_layer)
        glow = Image.new("RGBA", layer.size, GLOW + (0,))
        glow.putalpha(mask.filter(ImageFilter.GaussianBlur(max(1, size * 0.16))).point(lambda v: v * 110 // 255))
        layer.alpha_composite(glow)
        top, bottom = GOLD
        gh = box[3] - box[1]
        fill = Image.new("RGB", layer.size, bottom)
        fill.paste(top, (0, 0, layer.width, box[1]))
        grad = Image.linear_gradient("L").resize((layer.width, gh))
        fill.paste(Image.composite(Image.new("RGB", (layer.width, gh), bottom),
                                   Image.new("RGB", (layer.width, gh), top), grad), (0, box[1]))
        text = fill.convert("RGBA")
        text.putalpha(mask)
        layer.alpha_composite(text)


def place_lockup(base, lockup, spec, face_box, name):
    """Draws the lockup centered on spec["center"]; warns about edge margins and the face."""
    layer, box = lockup.render(spec["variant"], spec["width"], spec.get("shield"), spec.get("shadow", 1.0))
    w, h = base.size
    x = round(spec["center"][0] * w - (box[0] + box[2]) / 2)
    y = round(spec["center"][1] * h - (box[1] + box[3]) / 2)
    full = Image.new("RGBA", base.size, (0, 0, 0, 0))
    full.paste(layer, (x, y))
    base.alpha_composite(full)
    vis = (box[0] + x, box[1] + y, box[2] + x, box[3] + y)
    m = MARGIN * w
    if vis[0] < m or vis[1] < m or w - vis[2] < m or h - vis[3] < m:
        print("WARNING: %s: the lockup %s is closer than %d px to an edge" % (name, vis, m))
    if face_box and not spec.get("over_face") and not (vis[2] <= face_box[0] or vis[0] >= face_box[2] or vis[3] <= face_box[1] or vis[1] >= face_box[3]):
        print("WARNING: %s: the lockup %s covers the face %s" % (name, vis, face_box))
    return vis


def make_logo(lockup, spec):
    """Renders the Library Logo: the horizontal lockup, shadow included, exactly spec width wide."""
    target = spec["size"][0]
    lo, hi = target // 2, target
    best = None
    while lo <= hi:
        mid = (lo + hi) // 2
        layer, _ = lockup.render(spec["lockup"]["variant"], mid, spec["lockup"].get("shield"), spec["lockup"].get("shadow", 1.0))
        layer = layer.crop(layer.getchannel("A").getbbox())
        if layer.width <= target:
            best, lo = layer, mid + 1
        else:
            hi = mid - 1
    out = Image.new("RGBA", (target, best.height), (0, 0, 0, 0))
    out.paste(best, ((target - best.width) // 2, 0))
    return out


def make_asset(spec, args, lockup):
    """Returns (image, face box, lockup box) of one asset."""
    if spec["name"] == "librarylogo":
        return make_logo(lockup, spec), None, None
    art, face_box = place_art(args.art_dir, spec)
    base = grade(art, spec["grade"])
    vis = place_lockup(base, lockup, spec["lockup"], face_box, spec["name"]) if "lockup" in spec else None
    return base.convert("RGB"), face_box, vis


def check(spec, img):
    """Asserts the size and mode of an output image."""
    w, h = spec["size"]
    if spec["name"] == "librarylogo":
        assert img.mode == "RGBA" and img.width == w, spec["name"]
        alpha = img.getchannel("A")
        assert alpha.getextrema() == (0, 255), spec["name"] + ": no real transparency"
    else:
        assert img.mode == "RGB" and img.size == (w, h), spec["name"]


def label_font(size):
    return ImageFont.load_default(size)


def checker(size, cell=16):
    """Returns a gray checkerboard that shows transparency."""
    img = Image.new("RGB", size, (70, 70, 70))
    draw = ImageDraw.Draw(img)
    for y in range(0, size[1], cell):
        for x in range((y // cell) % 2 * cell, size[0], 2 * cell):
            draw.rectangle((x, y, x + cell - 1, y + cell - 1), fill=(100, 100, 100))
    return img


def write_checks(images, faces, checks_dir, examples_dir):
    """Writes the check images, and the wiki example images if examples_dir is given."""
    os.makedirs(checks_dir, exist_ok=True)

    def save(img, name):
        path = os.path.join(checks_dir, name)
        img.save(path)
        print("  check:", path)

    for name, sizes in DOWNSCALES.items():
        if name in images:
            for size in sizes:
                save(images[name].resize(size, Image.LANCZOS), "downscale_%s_%dx%d.png" % (name, size[0], size[1]))
    if "smallcapsule" in images:
        tiny = images["smallcapsule"].resize((120, 45), Image.LANCZOS)
        save(tiny.resize((480, 180), Image.NEAREST), "downscale_smallcapsule_120x45_zoomed.png")

    hero_guides = None
    if "libraryhero" in images:
        hero_guides = images["libraryhero"].copy()
        draw = ImageDraw.Draw(hero_guides)
        draw.rectangle(HERO_SAFE, outline=(0, 255, 0), width=6)
        if faces.get("libraryhero"):
            face = faces["libraryhero"]
            draw.rectangle(face, outline=(255, 255, 0), width=4)
            inside = (face[0] >= HERO_SAFE[0] and face[1] >= HERO_SAFE[1]
                      and face[2] <= HERO_SAFE[2] and face[3] <= HERO_SAFE[3])
            print("  hero face box %s is %s the safe area" % (face, "inside" if inside else "NOT inside"))
            if not inside:
                print("WARNING: libraryhero: the face is not inside the safe area")
        save(hero_guides, "hero_safe_area.png")

    over = {}
    if "libraryhero" in images and "librarylogo" in images:
        hero, logo = images["libraryhero"], images["librarylogo"]
        ink = logo.getchannel("A").point(lambda v: 255 if v >= 128 else 0).getbbox()
        k = LOGO_VIEW["width"] * hero.width / (ink[2] - ink[0])
        logo = logo.resize((round(logo.width * k), round(logo.height * k)), Image.LANCZOS)
        ink = tuple(round(v * k) for v in ink)
        iw, ih = ink[2] - ink[0], ink[3] - ink[1]
        left = round(LOGO_VIEW["left"] * hero.width)
        middle = round(LOGO_VIEW["center_y"] * hero.height)
        spots = {
            "bottom_left": (left, middle - ih // 2),
            "top_center": ((hero.width - iw) // 2, round(hero.height * 0.12)),
            "center": ((hero.width - iw) // 2, (hero.height - ih) // 2),
            "bottom_center": ((hero.width - iw) // 2, middle - ih // 2),
        }
        face = faces.get("libraryhero")
        for pos in LOGO_POSITIONS:
            x, y = spots[pos][0] - ink[0], spots[pos][1] - ink[1]
            img = hero.convert("RGBA")
            full = Image.new("RGBA", img.size, (0, 0, 0, 0))
            full.paste(logo, (x, y))
            img.alpha_composite(full)
            over[pos] = img.convert("RGB")
            save(over[pos].resize((1920, 620), Image.LANCZOS), "logo_over_hero_%s.png" % pos)
            if pos == LOGO_POSITION and face:
                vis = (spots[pos][0], spots[pos][1], spots[pos][0] + iw, spots[pos][1] + ih)
                clear = vis[2] <= face[0] or vis[0] >= face[2] or vis[3] <= face[1] or vis[1] >= face[3]
                print("  logo %s at %s is %s the hero face %s" % (vis, pos, "clear of" if clear else "OVER", face))
                if not clear:
                    print("WARNING: libraryhero: the logo covers the face at " + pos)

    if "pagebackground" in images:
        bg = images["pagebackground"]
        gray = bg.convert("L")
        tinted = Image.blend(bg, Image.merge("RGB", (gray.point(lambda v: v * 60 // 255),
                                                       gray.point(lambda v: v * 120 // 255),
                                                       gray.point(lambda v: v * 190 // 255))), 0.55)
        fade = ImageChops.lighter(
            ramp(bg.size, True, lambda t: max(0.0, 1 - min(t, 1 - t) / 0.18) ** 1.2),
            ramp(bg.size, False, lambda t: max(0.0, (t - 0.55) / 0.45) ** 1.2))
        sim = Image.composite(Image.new("RGB", bg.size, STEAM_PAGE), tinted, fade)
        draw = ImageDraw.Draw(sim)
        left = (bg.width - 940) // 2
        draw.rectangle((left, 0, left + 940, bg.height - 1), outline=(102, 192, 244), width=2)
        save(sim, "page_background_simulated.png")

    sheet = contact_sheet(images)
    if sheet:
        save(sheet, "contact_sheet.png")

    if examples_dir:
        os.makedirs(examples_dir, exist_ok=True)
        examples = [(sheet, "example_set.jpg", 1000), (hero_guides, "example_hero_safe_area.jpg", 960),
                    (over.get("bottom_left"), "example_logo_over_hero.jpg", 960)]
        for img, name, width in examples:
            if img is not None:
                img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS) if img.width > width else img
                path = os.path.join(examples_dir, name)
                img.convert("RGB").save(path, quality=85, optimize=True)
                print("  example:", path, os.path.getsize(path) // 1024, "KB")


SHEET_ROWS = [
    ["storeheader", "maincapsule", "smallcapsule"],
    ["verticalcapsule", "librarycapsule", "pagebackground"],
    ["libraryheader", "librarylogo"],
    ["libraryhero"],
]
SHEET_LABELS = {
    "storeheader": "Header Capsule", "smallcapsule": "Small Capsule", "maincapsule": "Main Capsule",
    "verticalcapsule": "Vertical Capsule", "pagebackground": "Page Background",
    "librarycapsule": "Library Capsule", "libraryheader": "Library Header",
    "libraryhero": "Library Hero", "librarylogo": "Library Logo",
}


def contact_sheet(images, width=1200, gap=14, label=22):
    """Returns all images in one sheet, each labeled with its name and size."""
    rows = [[n for n in row if n in images] for row in SHEET_ROWS]
    rows = [r for r in rows if r]
    if not rows:
        return None
    fnt = label_font(15)
    placed, y = [], gap
    for row in rows:
        ratio = sum(images[n].width / images[n].height for n in row)
        h = min(round((width - gap * (len(row) + 1)) / ratio), 420)
        x = gap
        for n in row:
            img = images[n]
            w = round(img.width * h / img.height)
            thumb = img.resize((w, h), Image.LANCZOS)
            if thumb.mode == "RGBA":
                bg = checker((w, h))
                bg.paste(thumb, (0, 0), thumb)
                thumb = bg
            placed.append((thumb, x, y, "%s  %dx%d" % (SHEET_LABELS[n], img.width, img.height)))
            x += w + gap
        y += h + label + gap
    sheet = Image.new("RGB", (width, y), (23, 26, 33))
    draw = ImageDraw.Draw(sheet)
    for thumb, x, ty, text in placed:
        sheet.paste(thumb, (x, ty))
        draw.text((x, ty + thumb.height + 4), text, font=fnt, fill=(200, 200, 200))
    return sheet


def main():
    names = [a["name"] for a in ASSETS]
    parser = argparse.ArgumentParser(description="Creates GnollHack's Steam store and library images.")
    parser.add_argument("--art-dir", required=True, help="folder with the portrait PNG files")
    parser.add_argument("--out-dir", required=True, help="output folder; STORE and LIBRARY are created in it")
    parser.add_argument("--checks-dir", default=os.path.join(tempfile.gettempdir(), "gnollhack_steam_store_asset_checks"),
                        help="folder for the check images (default: in the system temp folder)")
    parser.add_argument("--examples-dir", help="folder for the three example JPG files of the wiki page")
    parser.add_argument("--gnollhack-repo", default=r"C:\hmp\GnollHack", help="GnollHack repository, for the shield")
    parser.add_argument("--only", nargs="+", choices=names, help="build only these assets")
    parser.add_argument("--force", action="store_true", help="overwrite existing output images")
    args = parser.parse_args()

    for portrait in PORTRAITS:
        if not os.path.isfile(os.path.join(args.art_dir, portrait + ".png")):
            raise SystemExit("Missing portrait: " + os.path.join(args.art_dir, portrait + ".png"))
    todo = [a for a in ASSETS if not args.only or a["name"] in args.only]
    existing = [os.path.join(args.out_dir, a["file"]) for a in todo if os.path.exists(os.path.join(args.out_dir, a["file"]))]
    if existing and not args.force:
        raise SystemExit("These outputs exist; use --force to overwrite them:\n  " + "\n  ".join(existing))

    lockup = Lockup(args.gnollhack_repo)
    images = {}
    faces = {a["name"]: art_geometry(args.art_dir, a)[3] for a in ASSETS if "art" in a}
    for spec in todo:
        img, _, vis = make_asset(spec, args, lockup)
        check(spec, img)
        path = os.path.join(args.out_dir, spec["file"])
        os.makedirs(os.path.dirname(path), exist_ok=True)
        img.save(path)
        images[spec["name"]] = img
        print("%-16s %-48s %dx%d %s%s" % (spec["name"], spec["file"], img.width, img.height, img.mode,
                                         "  lockup %s" % (vis,) if vis else ""))
    for spec in ASSETS:
        path = os.path.join(args.out_dir, spec["file"])
        if spec["name"] not in images and os.path.exists(path):
            images[spec["name"]] = Image.open(path).copy()
    write_checks(images, faces, args.checks_dir, args.examples_dir)


if __name__ == "__main__":
    sys.exit(main())
