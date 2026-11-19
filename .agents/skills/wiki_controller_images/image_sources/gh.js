/* Shared drawing code for the Steam Deck Controls images.
   - Badges and hint rows follow GHGamepadHintRenderer.cs; badge labels follow GHGamepadGlyphs.cs.
   - Radial menus follow GHRadialMenuRenderer.cs, GHRadialGeometry.cs and GHRadialTuning.cs.
   Every function works in device pixels and returns SVG markup; a template sets its SVG viewBox in
   device pixels and its CSS size to half of that, and Chrome renders at device scale factor 2. */

"use strict";

const GH = {};

GH.ASSETS = "file:///C:/hmp/GnollHack/win/win32/xpl/GnollHackX/GnollHackX/Assets/UI/";

/* Font metrics from the font files (hhea ascent, descent and line gap, OS/2 cap height), as
   fractions of the font size; Skia's FontSpacing is ascent + descent + line gap */
GH.FONTS = {
  lato: { family: "GHLato", asc: 0.987, desc: 0.213, gap: 0, cap: 0.7165 },
  latoBold: { family: "GHLatoBold", asc: 0.987, desc: 0.213, gap: 0, cap: 0.723 },
  immortal: { family: "GHImmortal", asc: 0.864, desc: 0.28, gap: 0, cap: 0.684 },
  underwood: { family: "GHUnderwood", asc: 0.728, desc: 0.2104, gap: 0.15, cap: 0.7 },
  wiki: { family: "WikiLato", weight: 400, asc: 0.987, desc: 0.213, gap: 0, cap: 0.7165 },
  wikiBold: { family: "WikiLato", weight: 800, asc: 0.987, desc: 0.213, gap: 0, cap: 0.723 },
  cinzel: { family: "WikiCinzel", weight: 600, asc: 1.014, desc: 0.352, gap: 0, cap: 0.7 }
};

GH.ready = function () {
  const loads = [
    "16px GHLato", "16px GHLatoBold", "16px GHImmortal", "16px GHUnderwood",
    "400 16px WikiLato", "800 16px WikiLato", "600 16px WikiCinzel"
  ].map(f => document.fonts.load(f));
  return Promise.all(loads).then(() => document.fonts.ready);
};

/* Text */

const _measureCtx = document.createElement("canvas").getContext("2d");

GH.fontCss = function (font, size) {
  return (font.weight ? font.weight + " " : "") + size + "px " + font.family;
};

GH.measure = function (text, font, size) {
  if (!text)
    return 0;
  _measureCtx.font = GH.fontCss(font, size);
  return _measureCtx.measureText(text).width;
};

GH.lineHeight = function (font, size) {
  return (font.asc + font.desc + font.gap) * size;
};

GH.esc = function (s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};

GH.n = function (v) {
  return (Math.round(v * 100) / 100).toString();
};

/* anchor: "start", "middle" or "end"; y is the baseline */
GH.text = function (text, x, y, font, size, fill, anchor, extra) {
  if (!text)
    return "";
  const weight = font.weight ? ` font-weight="${font.weight}"` : "";
  return `<text x="${GH.n(x)}" y="${GH.n(y)}" font-family="${font.family}"${weight} font-size="${GH.n(size)}" fill="${fill}"` +
    ` text-anchor="${anchor || "start"}"${extra || ""}>${GH.esc(text)}</text>`;
};

/* The size at which the text fits maxWidth, not below minSize (FitSize) */
GH.fitSize = function (text, font, size, minSize, maxWidth) {
  if (!text)
    return size;
  const w = GH.measure(text, font, size);
  if (!(w > maxWidth))
    return size;
  return Math.max(minSize, size * maxWidth / w);
};

GH.ellipsize = function (text, font, size, maxWidth) {
  if (!text || GH.measure(text, font, size) <= maxWidth)
    return text;
  for (let len = text.length - 1; len > 0; len--) {
    const candidate = text.substring(0, len).trimEnd() + "\u2026";
    if (GH.measure(candidate, font, size) <= maxWidth)
      return candidate;
  }
  return "\u2026";
};

/* Greedy word wrap (WrapText) */
GH.wrap = function (text, font, size, maxWidth, maxLines) {
  const lines = [];
  if (!text)
    return lines;
  const words = text.split(" ").filter(w => w.length > 0);
  let w = 0;
  while (w < words.length && lines.length < maxLines) {
    let line = words[w++];
    while (w < words.length) {
      const candidate = line + " " + words[w];
      if (GH.measure(candidate, font, size) > maxWidth)
        break;
      line = candidate;
      w++;
    }
    if (lines.length === maxLines - 1 && w < words.length)
      line = GH.ellipsize(line + " " + words.slice(w).join(" "), font, size, maxWidth);
    else if (GH.measure(line, font, size) > maxWidth)
      line = GH.ellipsize(line, font, size, maxWidth);
    lines.push(line);
  }
  return lines;
};

/* C# Math.Round rounds half to even */
GH.roundInt = function (v) {
  const f = Math.floor(v);
  const d = v - f;
  if (Math.abs(d - 0.5) < 1e-9)
    return f % 2 === 0 ? f : f + 1;
  return Math.round(v);
};

GH.snap = function (v) {
  return GH.roundInt(v);
};

/* Badges (GHGamepadHintRenderer) */

GH.BADGE_FILL = "rgba(255,255,255,0.902)";      /* white at 0xE6 */
GH.BADGE_INK = "rgb(24,24,24)";
GH.HIGHLIGHT_FILL = "#D4A017";
GH.LABEL_COLOR = "#FFFFFF";
GH.BACKING_COLOR = "rgba(0,0,0,0.6)";           /* black at 0x99 */

GH.BADGE_HEIGHT_OF_FONT = 1.44;
GH.PAIR_GAP_OF_FONT = 0.25;
GH.LABEL_GAP_OF_FONT = 0.4;
GH.ENTRY_GAP_OF_FONT = 1.4;
GH.LINE_HEIGHT_OF_FONT = 1.9;
GH.BACKING_PAD_OF_FONT = 0.6;

const KAPPA = 0.5523;

GH.quantizeHeight = function (h) {
  if (!(h > 4))
    return 4;
  return GH.roundInt(h);
};

GH.centeredSpan = function (total, fraction, min) {
  let span = Math.max(min, GH.roundInt(total * fraction));
  if (((total - span) & 1) !== 0)
    span++;
  return Math.min(span, total);
};

/* Buttons: their badge kind and text per controller style (GHGamepadGlyphs) */
GH.BUTTONS = {
  a: { kind: "face", text: "A" }, b: { kind: "face", text: "B" },
  x: { kind: "face", text: "X" }, y: { kind: "face", text: "Y" },
  l1: { kind: "bumper", text: "L1" }, r1: { kind: "bumper", text: "R1" },
  l2: { kind: "trigger", text: "L2" }, r2: { kind: "trigger", text: "R2" },
  l3: { kind: "stickclick", text: "L3" }, r3: { kind: "stickclick", text: "R3" },
  l4: { kind: "grip", text: "L4" }, l5: { kind: "grip", text: "L5" },
  r4: { kind: "grip", text: "R4", right: true }, r5: { kind: "grip", text: "R5", right: true },
  view: { kind: "view" }, menu: { kind: "menu" },
  dpad: { kind: "dpad", dir: -1 }, "dpad-up": { kind: "dpad", dir: 0 }, "dpad-right": { kind: "dpad", dir: 1 },
  "dpad-down": { kind: "dpad", dir: 2 }, "dpad-left": { kind: "dpad", dir: 3 },
  lstick: { kind: "stick", text: "L", dir: -1 }, rstick: { kind: "stick", text: "R", dir: -1 },
  /* Xbox */
  lb: { kind: "bumper", text: "LB" }, rb: { kind: "bumper", text: "RB" },
  lt: { kind: "trigger", text: "LT" }, rt: { kind: "trigger", text: "RT" },
  ls: { kind: "stickclick", text: "LS" }, rs: { kind: "stickclick", text: "RS" },
  p1: { kind: "grip", text: "P1", right: true }, p2: { kind: "grip", text: "P2", right: true },
  p3: { kind: "grip", text: "P3" }, p4: { kind: "grip", text: "P4" },
  /* PlayStation face buttons, by position */
  "ps-cross": { kind: "ps", symbol: "cross" }, "ps-circle": { kind: "ps", symbol: "circle" },
  "ps-square": { kind: "ps", symbol: "square" }, "ps-triangle": { kind: "ps", symbol: "triangle" },
  /* Nintendo */
  "n-l": { kind: "bumper", text: "L" }, "n-r": { kind: "bumper", text: "R" },
  zl: { kind: "trigger", text: "ZL" }, zr: { kind: "trigger", text: "ZR" }
};

GH.badgeWidth = function (kind, h) {
  switch (kind) {
    case "bumper": return Math.max(4, GH.roundInt(1.5 * h));
    case "trigger":
    case "grip": return GH.roundInt(1.35 * h);
    case "stickclick": return GH.roundInt(1.3 * h);
    default: return h;
  }
};

GH.measureBadge = function (name, height) {
  return GH.badgeWidth(GH.BUTTONS[name].kind, GH.quantizeHeight(height));
};

/* A closed polygon with rounded corners: vertices [x, y, rIn, rOut] (AddRoundedPolygon) */
GH.roundedPolygon = function (v, ox, oy) {
  ox = ox || 0;
  oy = oy || 0;
  const n = v.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p = v[(i + n - 1) % n], c = v[i], q = v[(i + 1) % n];
    const vx = c[0], vy = c[1];
    const inX = vx - p[0], inY = vy - p[1], outX = q[0] - vx, outY = q[1] - vy;
    const inLen = Math.hypot(inX, inY), outLen = Math.hypot(outX, outY);
    const rIn = inLen > 0 ? Math.min(c[2], inLen * 0.5) : 0;
    const rOut = outLen > 0 ? Math.min(c[3], outLen * 0.5) : 0;
    const ax = rIn > 0 ? vx - inX / inLen * rIn : vx, ay = rIn > 0 ? vy - inY / inLen * rIn : vy;
    const bx = rOut > 0 ? vx + outX / outLen * rOut : vx, by = rOut > 0 ? vy + outY / outLen * rOut : vy;
    d += (i === 0 ? "M" : "L") + GH.n(ax + ox) + " " + GH.n(ay + oy);
    if (rIn > 0 || rOut > 0)
      d += "C" + [ax + (vx - ax) * KAPPA, ay + (vy - ay) * KAPPA, bx + (vx - bx) * KAPPA, by + (vy - by) * KAPPA, bx, by]
        .map((t, k) => GH.n(t + (k % 2 === 0 ? ox : oy))).join(" ");
  }
  return d + "Z";
};

GH.bumperPath = function (h, ox, oy) {
  const w = Math.max(4, GH.roundInt(1.5 * h));
  const ends = 0.12 * h;
  const top = 0.3 * h;
  const bottom = Math.max(0.5, 0.1 * h);
  const arcLeft = Math.min(top, w * 0.25);
  const arcRight = w - arcLeft;
  const slope = 2 * ends / (w * 0.5 - arcLeft);
  const cornerY = ends + arcLeft * slope;
  const sideTop = Math.min(h - bottom - 0.5, Math.max(cornerY + 0.5, ends + top));
  const P = (x, y) => GH.n(x + ox) + " " + GH.n(y + oy);
  const corner = (ax, ay, vx, vy, bx, by) =>
    "C" + P(ax + (vx - ax) * KAPPA, ay + (vy - ay) * KAPPA) + " " + P(bx + (vx - bx) * KAPPA, by + (vy - by) * KAPPA) + " " + P(bx, by);
  let d = "M" + P(0, sideTop);
  d += corner(0, sideTop, 0, cornerY, arcLeft, ends);
  d += "C" + P(arcLeft + (w * 0.5 - arcLeft) * (2 / 3), ends + (-ends - ends) * (2 / 3)) + " " +
    P(arcRight + (w * 0.5 - arcRight) * (2 / 3), ends + (-ends - ends) * (2 / 3)) + " " + P(arcRight, ends);
  d += corner(arcRight, ends, w, cornerY, w, sideTop);
  d += "L" + P(w, h - bottom);
  d += corner(w, h - bottom, w, h, w - bottom, h);
  d += "L" + P(bottom, h);
  d += corner(bottom, h, 0, h, 0, h - bottom);
  return d + "Z";
};

GH.shapePath = function (slot, h, ox, oy) {
  let v;
  switch (slot) {
    case "trigger": {
      const w = GH.roundInt(1.35 * h);
      const bottom = 0.12 * h;
      v = [[0, h, bottom, bottom], [0, 0, 0.5 * h, 0.42 * w], [w, 0, 0.42 * w, 0.5 * h], [w, h, bottom, bottom]];
      break;
    }
    case "stickclick": {
      const w = GH.roundInt(1.3 * h);
      const tabWidth = GH.centeredSpan(w, 0.3, 2);
      const tabLeft = Math.trunc((w - tabWidth) / 2);
      const tabRight = tabLeft + tabWidth;
      const bodyTop = Math.max(2, GH.roundInt(0.15 * h));
      const sideBottom = GH.roundInt(0.62 * h);
      const tipHalf = Math.max(1, GH.roundInt(0.07 * w));
      const small = Math.max(0.5, 0.05 * h);
      const shoulder = 0.22 * h;
      v = [[tabLeft, 0, small, small], [tabRight, 0, small, small], [tabRight, bodyTop, 0, 0], [w, bodyTop, shoulder, shoulder],
        [w, sideBottom, small, small], [w * 0.5 + tipHalf, h, small, small], [w * 0.5 - tipHalf, h, small, small],
        [0, sideBottom, small, small], [0, bodyTop, shoulder, shoulder], [tabLeft, bodyTop, 0, 0]];
      break;
    }
    case "gripLeft":
    case "gripRight": {
      const w = GH.roundInt(1.35 * h);
      const s = Math.max(1, GH.roundInt(0.28 * h));
      const r = 0.2 * h;
      v = slot === "gripLeft" ? [[s, 0, r, r], [w, 0, r, r]] : [[0, 0, r, r], [w - s, 0, r, r]];
      v.push([w, h, r, r], [0, h, r, r]);
      break;
    }
    case "dpad": {
      const a = GH.centeredSpan(h, 0.38, 2);
      const p = Math.trunc((h - a) / 2);
      const q = p + a;
      const r = Math.max(0.5, 0.08 * h);
      v = [[p, 0, r, r], [q, 0, r, r], [q, p, 0, 0], [h, p, r, r], [h, q, r, r], [q, q, 0, 0], [q, h, r, r], [p, h, r, r],
        [p, q, 0, 0], [0, q, r, r], [0, p, r, r], [p, p, 0, 0]];
      break;
    }
    case "shiftArrow": {
      const w = Math.max(3, GH.roundInt(0.95 * h));
      const headHeight = Math.max(2, GH.roundInt(0.46 * h));
      const stemWidth = GH.centeredSpan(w, 0.56, 2);
      const stemLeft = Math.trunc((w - stemWidth) / 2);
      const stemRight = stemLeft + stemWidth;
      const apex = 0.1 * h, barb = 0.05 * h, foot = 0.06 * h;
      v = [[w * 0.5, 0, apex, apex], [w, headHeight, barb, barb], [stemRight, headHeight, 0, 0], [stemRight, h, foot, foot],
        [stemLeft, h, foot, foot], [stemLeft, headHeight, 0, 0], [0, headHeight, barb, barb]];
      break;
    }
    case "psTriangle":
      v = [[0, -0.25 * h, 0, 0], [0.24 * h, 0.16 * h, 0, 0], [-0.24 * h, 0.16 * h, 0, 0]];
      break;
    case "stickArrow":
      v = [[0, -0.47 * h, 0, 0], [0.15 * h, -0.26 * h, 0, 0], [-0.15 * h, -0.26 * h, 0, 0]];
      break;
  }
  return GH.roundedPolygon(v, ox, oy);
};

/* Bold text centered on (cx, cy) by its cap height, shrunk to fit maxWidth (DrawBadgeText) */
GH.badgeText = function (text, cx, cy, baseSize, maxWidth, ink) {
  if (!text)
    return "";
  const width = GH.measure(text, GH.FONTS.latoBold, baseSize);
  const size = width > maxWidth && width > 0 ? Math.max(baseSize * 0.5, baseSize * maxWidth / width) : baseSize;
  return GH.text(text, GH.snap(cx), GH.snap(cy + GH.FONTS.latoBold.cap * size * 0.5), GH.FONTS.latoBold, size, ink, "middle");
};

/* A badge centered on (cx, cy); returns SVG (DrawBadgeCore) */
GH.badge = function (name, cx, cy, height, highlighted) {
  const b = GH.BUTTONS[name];
  const h = GH.quantizeHeight(height);
  const w = GH.badgeWidth(b.kind, h);
  const left = GH.snap(cx - w * 0.5);
  const top = GH.snap(cy - h * 0.5);
  const mx = left + w * 0.5, my = top + h * 0.5;
  const ink = GH.BADGE_INK;
  const fill = highlighted ? GH.HIGHLIGHT_FILL : GH.BADGE_FILL;
  let s = "";
  const rr = (x, y, rw, rh, r, f) => `<rect x="${GH.n(x)}" y="${GH.n(y)}" width="${GH.n(rw)}" height="${GH.n(rh)}" rx="${GH.n(r)}" fill="${f}"/>`;
  const rect = (x, y, rw, rh) => `<rect x="${GH.n(x)}" y="${GH.n(y)}" width="${GH.n(rw)}" height="${GH.n(rh)}" fill="${ink}"/>`;
  switch (b.kind) {
    case "ps": {
      s += `<circle cx="${GH.n(mx)}" cy="${GH.n(my)}" r="${GH.n(h * 0.5)}" fill="${fill}"/>`;
      const sw = Math.max(1.25, 0.085 * h);
      const st = `fill="none" stroke="${ink}" stroke-width="${GH.n(sw)}" stroke-linecap="round" stroke-linejoin="round"`;
      if (b.symbol === "cross") {
        const e = 0.19 * h;
        s += `<path d="M${GH.n(mx - e)} ${GH.n(my - e)}L${GH.n(mx + e)} ${GH.n(my + e)}M${GH.n(mx - e)} ${GH.n(my + e)}L${GH.n(mx + e)} ${GH.n(my - e)}" ${st}/>`;
      } else if (b.symbol === "circle") {
        s += `<circle cx="${GH.n(mx)}" cy="${GH.n(my)}" r="${GH.n(0.21 * h)}" ${st}/>`;
      } else if (b.symbol === "square") {
        const e = 0.18 * h;
        s += `<rect x="${GH.n(mx - e)}" y="${GH.n(my - e)}" width="${GH.n(2 * e)}" height="${GH.n(2 * e)}" ${st}/>`;
      } else {
        s += `<path d="${GH.shapePath("psTriangle", h, mx, my)}" ${st}/>`;
      }
      break;
    }
    case "bumper":
      s += `<path d="${GH.bumperPath(h, left, top)}" fill="${fill}"/>`;
      s += GH.badgeText(b.text, mx, top + (0.12 * h + h) * 0.5, h * 0.5, w * 0.75, ink);
      break;
    case "trigger":
      s += `<path d="${GH.shapePath("trigger", h, left, top)}" fill="${fill}"/>`;
      s += GH.badgeText(b.text, mx, top + h * 0.58, h * 0.5, w * 0.8, ink);
      break;
    case "stickclick":
      s += `<path d="${GH.shapePath("stickclick", h, left, top)}" fill="${fill}"/>`;
      s += GH.badgeText(b.text, mx, top + h * 0.5, h * 0.44, w * 0.7, ink);
      break;
    case "grip": {
      const shift = Math.max(1, GH.roundInt(0.28 * h)) * 0.25;
      s += `<path d="${GH.shapePath(b.right ? "gripRight" : "gripLeft", h, left, top)}" fill="${fill}"/>`;
      s += GH.badgeText(b.text, b.right ? mx - shift : mx + shift, my, h * 0.48, w * 0.7, ink);
      break;
    }
    case "menu": {
      s += rr(left, top, h, h, 0.24 * h, fill);
      const lineWidth = GH.centeredSpan(h, 0.52, 3);
      const thickness = Math.max(1, GH.roundInt(0.1 * h));
      const step = Math.max(thickness + 1, GH.roundInt(0.2 * h));
      const y0 = Math.trunc((h - 2 * step - thickness) / 2);
      const x = left + Math.trunc((h - lineWidth) / 2);
      for (let k = 0; k < 3; k++)
        s += rect(x, top + y0 + k * step, lineWidth, thickness);
      break;
    }
    case "view": {
      s += rr(left, top, h, h, 0.24 * h, fill);
      const sq = Math.max(3, GH.roundInt(0.42 * h));
      const t = Math.max(1, GH.roundInt(0.085 * h));
      let o = Math.max(t + 1, GH.roundInt(0.16 * h));
      if (o > sq - t - 1)
        o = Math.max(1, sq - t - 1);
      const a = left + Math.trunc((h - sq - o) / 2);
      const bb = top + Math.trunc((h - sq - o) / 2);
      const fx = a + o, fy = bb + o;
      s += rect(a, bb, sq, t);
      if (sq - 2 * t > 0)
        s += rect(a, bb + t, t, sq - 2 * t);
      const rightVisible = Math.min(o, sq - t) - t;
      if (rightVisible > 0)
        s += rect(a + sq - t, bb + t, t, rightVisible);
      s += rect(a, bb + sq - t, Math.min(o, sq), t);
      s += rect(fx, fy, sq, t) + rect(fx, fy + sq - t, sq, t);
      if (sq - 2 * t > 0)
        s += rect(fx, fy + t, t, sq - 2 * t) + rect(fx + sq - t, fy + t, t, sq - 2 * t);
      break;
    }
    case "dpad": {
      s += `<path d="${GH.shapePath("dpad", h, left, top)}" fill="${fill}"/>`;
      if (b.dir >= 0) {
        const a = GH.centeredSpan(h, 0.38, 2);
        const p = Math.trunc((h - a) / 2);
        const q = p + a;
        const i = Math.max(1, GH.roundInt(0.09 * h));
        const across = a - 2 * i, along = p - i;
        if (b.dir === 0) s += rect(left + p + i, top + i, across, along);
        else if (b.dir === 1) s += rect(left + q, top + p + i, along, across);
        else if (b.dir === 2) s += rect(left + p + i, top + q, across, along);
        else s += rect(left + i, top + p + i, along, across);
      }
      break;
    }
    case "stick":
      s += `<circle cx="${GH.n(mx)}" cy="${GH.n(my)}" r="${GH.n(h * 0.5)}" fill="${fill}"/>`;
      s += `<circle cx="${GH.n(mx)}" cy="${GH.n(my)}" r="${GH.n(0.35 * h)}" fill="none" stroke="${ink}" stroke-width="${GH.n(Math.max(1, 0.075 * h))}"/>`;
      s += GH.badgeText(b.text, mx, my, h * 0.4, h * 0.46, ink);
      break;
    default:
      s += `<circle cx="${GH.n(mx)}" cy="${GH.n(my)}" r="${GH.n(h * 0.5)}" fill="${fill}"/>`;
      s += GH.badgeText(b.text, mx, my, h * 0.62, h * 0.8, ink);
      break;
  }
  return s;
};

/* The hold mark: an outlined Shift-style up arrow after the badges of a hint with Hold */
GH.holdStroke = function (badgeHeight) {
  return Math.max(1.25, 0.08 * badgeHeight);
};

GH.holdPad = function (badgeHeight) {
  return Math.ceil(GH.holdStroke(badgeHeight)) * 0.5;
};

GH.measureHoldMark = function (badgeHeight) {
  const h = GH.quantizeHeight(badgeHeight * 0.8);
  return Math.max(3, GH.roundInt(0.95 * h)) + GH.holdPad(badgeHeight) * 2;
};

GH.holdMark = function (left, centerY, badgeHeight, highlighted) {
  const h = GH.quantizeHeight(badgeHeight * 0.8);
  const color = highlighted ? GH.HIGHLIGHT_FILL : GH.LABEL_COLOR;
  return `<path d="${GH.shapePath("shiftArrow", h, GH.snap(left) + GH.holdPad(badgeHeight), GH.snap(centerY - h * 0.5))}"` +
    ` fill="none" stroke="${color}" stroke-width="${GH.n(GH.holdStroke(badgeHeight))}" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/* A hint: { buttons: [name] or [name, name], label, hold, highlight, lineBreakBefore } */
GH.measureHintBadges = function (hint, height) {
  const pairGap = height * GH.PAIR_GAP_OF_FONT / GH.BADGE_HEIGHT_OF_FONT;
  let w = GH.measureBadge(hint.buttons[0], height);
  if (hint.buttons.length > 1)
    w += pairGap + GH.measureBadge(hint.buttons[1], height);
  if (hint.hold)
    w += pairGap + GH.measureHoldMark(height);
  return w;
};

GH.hintBadges = function (hint, left, centerY, height) {
  const pairGap = height * GH.PAIR_GAP_OF_FONT / GH.BADGE_HEIGHT_OF_FONT;
  const b1 = GH.measureBadge(hint.buttons[0], height);
  let s = GH.badge(hint.buttons[0], left + b1 * 0.5, centerY, height, hint.highlight);
  let w = b1;
  if (hint.buttons.length > 1) {
    const b2 = GH.measureBadge(hint.buttons[1], height);
    s += GH.badge(hint.buttons[1], left + b1 + pairGap + b2 * 0.5, centerY, height, hint.highlight);
    w += pairGap + b2;
  }
  if (hint.hold)
    s += GH.holdMark(left + w + pairGap, centerY, height, hint.highlight);
  return s;
};

/* A hint row as the map's hint strip draws it (LayoutRow and DrawRow), at fontSize, with no width
   limit: one line, or two when an entry other than the first has lineBreakBefore. Returns
   { svg, width, height } for a row whose backing box has its top-left corner at (x, y). */
GH.hintRow = function (hints, fontSize, x, y) {
  const size = fontSize;
  const badgeHeight = size * GH.BADGE_HEIGHT_OF_FONT;
  const labelGap = size * GH.LABEL_GAP_OF_FONT;
  const gap = size * GH.ENTRY_GAP_OF_FONT;
  const lineHeight = size * GH.LINE_HEIGHT_OF_FONT;
  const entries = hints.map(h => {
    const badges = GH.measureHintBadges(h, badgeHeight);
    const label = h.label ? GH.measure(h.label, GH.FONTS.lato, size) : 0;
    return { badges, width: badges + (label > 0 ? labelGap + label : 0) };
  });
  let breakAt = hints.length;
  for (let i = 1; i < hints.length; i++) {
    if (hints[i].lineBreakBefore) {
      breakAt = i;
      break;
    }
  }
  const lineWidth = (from, to) => {
    let w = 0;
    for (let i = from; i < to; i++)
      w += entries[i].width + (i > from ? gap : 0);
    return w;
  };
  const lines = breakAt < hints.length ? [[0, breakAt], [breakAt, hints.length]] : [[0, hints.length]];
  const widths = lines.map(l => lineWidth(l[0], l[1]));
  const rowWidth = Math.max.apply(null, widths);
  const rowHeight = lines.length * lineHeight;
  const padX = size * GH.BACKING_PAD_OF_FONT;
  const padY = Math.max(0, size * (GH.BACKING_PAD_OF_FONT - (GH.LINE_HEIGHT_OF_FONT - GH.BADGE_HEIGHT_OF_FONT) * 0.5));
  const boxW = rowWidth + 2 * padX, boxH = rowHeight + 2 * padY;
  const centerX = x + boxW / 2;
  const radius = Math.min(boxH * 0.5, size * 0.8);
  let s = `<rect x="${GH.n(GH.snap(x))}" y="${GH.n(GH.snap(y))}" width="${GH.n(GH.snap(x + boxW) - GH.snap(x))}" height="${GH.n(GH.snap(y + boxH) - GH.snap(y))}"` +
    ` rx="${GH.n(radius)}" fill="${GH.BACKING_COLOR}"/>`;
  const baselineOffset = (GH.FONTS.lato.asc - GH.FONTS.lato.desc) * size * 0.5;
  let labels = "";
  lines.forEach((l, li) => {
    const cy = y + padY + li * lineHeight + lineHeight * 0.5;
    let ex = GH.snap(centerX - widths[li] * 0.5);
    for (let i = l[0]; i < l[1]; i++) {
      s += GH.hintBadges(hints[i], ex, cy, badgeHeight);
      if (hints[i].label)
        labels += GH.text(hints[i].label, GH.snap(ex + entries[i].badges + labelGap), GH.snap(cy + baselineOffset), GH.FONTS.lato, size, GH.LABEL_COLOR);
      ex += entries[i].width + gap;
    }
  });
  return { svg: s + labels, width: boxW, height: boxH };
};

/* Radial menus (GHRadialMenuRenderer) */

GH.RADIAL = {
  gold: { accent: "#D4A017", highlightFill: [58, 46, 10, 0xE6], title: "#FFFFFF" },
  violet: { accent: "#A87BFF", highlightFill: [44, 30, 74, 0xE6], title: "#D8C8FF" },
  sliceFill: [38, 38, 38, 0xD9],
  seeThroughSliceFill: [38, 38, 38, 0x14],
  sliceBorder: "rgba(255,255,255,0.251)",
  emptyOutline: "rgba(255,255,255,0.125)",
  hubFill: "rgba(0,0,0,0.749)",
  seeThroughHubFill: "rgba(0,0,0,0.333)",
  lighterGray: "rgb(204,204,204)",
  textGray: "rgb(128,128,128)",
  onGreen: "#90EE90",
  pillDarkText: "rgb(20,20,20)"
};

GH.rgba = function (c, alpha) {
  const a = alpha === undefined ? c[3] : alpha;
  return `rgba(${c[0]},${c[1]},${c[2]},${GH.n(a / 255)})`;
};

GH.polar = function (cx, cy, deg, r) {
  const a = deg * Math.PI / 180;
  return [cx + Math.sin(a) * r, cy - Math.cos(a) * r];
};

/* Skia's corner path effect on a closed polygon: each vertex is cut back by up to radius along both
   edges (at most half of each edge) and joined by a quadratic curve through it */
GH.cornerPath = function (pts, radius) {
  const n = pts.length;
  const step = (a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const s = len <= radius * 2 ? 0.5 : radius / len;
    return [dx * s, dy * s];
  };
  let d = "";
  for (let i = 0; i < n; i++) {
    const p = pts[(i + n - 1) % n], c = pts[i], q = pts[(i + 1) % n];
    const si = step(p, c), so = step(c, q);
    const a = [c[0] - si[0], c[1] - si[1]], b = [c[0] + so[0], c[1] + so[1]];
    d += (i === 0 ? "M" : "L") + GH.n(a[0]) + " " + GH.n(a[1]) + "Q" + GH.n(c[0]) + " " + GH.n(c[1]) + " " + GH.n(b[0]) + " " + GH.n(b[1]);
  }
  return d + "Z";
};

/* dip defaults to the Steam Deck's: at 1280 x 800 the outer radius is 320 device-independent pixels */
GH.radialGeometry = function (cx, cy, ro, dip) {
  dip = dip || ro / 320;
  const g = { cx, cy, ro, dip };
  g.hubR = 0.36 * ro;
  g.innerR = g.hubR + 0.05 * ro;
  g.midR = (g.innerR + ro) / 2;
  g.sliceGap = 0.012 * ro;
  g.cornerR = 0.02 * ro;
  g.labelMin = 14 * dip;
  g.labelFont = Math.max(0.047 * ro, g.labelMin);
  g.hubTitleFont = 0.085 * ro;
  g.hubDescFont = 0.052 * ro;
  g.pageTitleFont = 0.07 * ro;
  g.hintFont = 0.05 * ro;
  g.pillFont = 0.036 * ro;
  g.pageTitleBaseline = cy - ro - 0.12 * ro;
  g.dotsY = cy - ro - 0.045 * ro;
  g.dotR = 0.0125 * ro;
  g.dotSpacing = 0.06 * ro;
  g.hintY = cy + ro + 0.14 * ro;
  g.chipOffsetX = ro + 0.45 * ro;
  g.highlightOffset = 0.025 * ro;
  g.glowBlur = 0.02 * ro;
  g.badgeHeight = g.hintFont * GH.BADGE_HEIGHT_OF_FONT;
  return g;
};

GH.arcLength = function (r, n) {
  return 2 * Math.PI * r / n;
};

GH.slicePolygon = function (g, k, n) {
  const segmentLength = Math.max(1, 3 * g.cornerR);
  const half = 180 / n;
  const inset = r => Math.asin(Math.min(1, (g.sliceGap / 2) / r)) * 180 / Math.PI;
  const c = k * 360 / n;
  const o0 = c - half + inset(g.ro), o1 = c + half - inset(g.ro);
  const i0 = c - half + inset(g.innerR), i1 = c + half - inset(g.innerR);
  const segs = (sweep, r) => Math.max(2, Math.ceil(Math.abs(sweep) * Math.PI / 180 * r / segmentLength));
  const os = segs(o1 - o0, g.ro), is = segs(i1 - i0, g.innerR);
  const pts = [];
  for (let j = 0; j <= os; j++)
    pts.push(GH.polar(0, 0, o0 + (o1 - o0) * j / os, g.ro));
  for (let j = 0; j <= is; j++)
    pts.push(GH.polar(0, 0, i1 - (i1 - i0) * j / is, g.innerR));
  return pts;
};

/* Brightens a highlighted icon as UIUtils.HighlightColorFilter does (lighting, +20 per channel) */
GH.radialDefs = function (id, g) {
  return `<filter id="${id}-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${GH.n(g.glowBlur)}"/></filter>` +
    `<filter id="${id}-lit" color-interpolation-filters="sRGB"><feComponentTransfer>` +
    `<feFuncR type="linear" slope="1" intercept="0.0784"/><feFuncG type="linear" slope="1" intercept="0.0784"/>` +
    `<feFuncB type="linear" slope="1" intercept="0.0784"/></feComponentTransfer></filter>` +
    /* GHApp.InitializeUIBitmaps tints the orb fill with a matrix whose offset of 255 saturates the
       red or blue channel, and draws it at alpha 204 */
    `<filter id="${id}-red" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="-1 0 0 0 255  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0"/></filter>` +
    `<filter id="${id}-blue" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 -1 0 255  0 0 0 0.8 0"/></filter>` +
    `<radialGradient id="${id}-vignette" gradientUnits="userSpaceOnUse" cx="${GH.n(g.cx)}" cy="${GH.n(g.cy)}" r="${GH.n(1.35 * g.ro)}">` +
    `<stop offset="0" stop-color="#000" stop-opacity="0.251"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
};

/* The orb as the map draws it: border, fill (full) and glass, with no numbers */
GH.orb = function (id, dest, color, highlighted) {
  const ow = dest.w / 230 * 210;
  const ox = dest.x + (dest.w - ow) / 2, oy = dest.y + (dest.h - ow) / 2;
  const lit = highlighted ? ` filter="url(#${id}-lit)"` : "";
  return `<g${lit}><image href="${GH.ASSETS}orb_border.png" x="${GH.n(dest.x)}" y="${GH.n(dest.y)}" width="${GH.n(dest.w)}" height="${GH.n(dest.h)}" preserveAspectRatio="none"/>` +
    `<image href="${GH.ASSETS}orb_fill.png" x="${GH.n(ox)}" y="${GH.n(oy)}" width="${GH.n(ow)}" height="${GH.n(ow)}" preserveAspectRatio="none" filter="url(#${id}-${color})"/>` +
    `<image href="${GH.ASSETS}orb_glass.png" x="${GH.n(ox)}" y="${GH.n(oy)}" width="${GH.n(ow)}" height="${GH.n(ow)}" preserveAspectRatio="none"/></g>`;
};

/* def: { id, accent: "gold" | "violet", seeThrough, title, slots: [item or null] (8), highlight: slot or -1,
   dots: { count, current } or null, chips: { prev, next } or null, idleName, idleLine, promptVerb,
   hints: [[button, label]] }
   item: { label, icon (file name in Assets/UI), orb: "red" | "blue", toggle: true | false (on), description } */
GH.radial = function (def, g) {
  const id = def.id;
  const pal = GH.RADIAL[def.accent || "gold"];
  const n = def.slots.length;
  const sliceBase = def.seeThrough ? GH.RADIAL.seeThroughSliceFill : GH.RADIAL.sliceFill;
  const hiFill = def.seeThrough ? GH.rgba(pal.highlightFill, 0x29) : GH.rgba(pal.highlightFill);
  const F = GH.FONTS;
  let s = `<defs>${GH.radialDefs(id, g)}</defs>`;

  if (!def.seeThrough)
    s += `<circle cx="${GH.n(g.cx)}" cy="${GH.n(g.cy)}" r="${GH.n(1.35 * g.ro)}" fill="url(#${id}-vignette)"/>`;

  /* Header: page title and the dots of the current page's set */
  if (def.title) {
    const size = GH.fitSize(def.title, F.immortal, g.pageTitleFont, g.pageTitleFont * 0.6, g.cx * 2 - 32 * g.dip);
    s += GH.text(def.title, GH.snap(g.cx), GH.snap(g.pageTitleBaseline), F.immortal, size, pal.title, "middle");
  }
  if (def.dots && def.dots.count > 1) {
    for (let i = 0; i < def.dots.count; i++) {
      const x = g.cx + (i - (def.dots.count - 1) / 2) * g.dotSpacing;
      const current = i === def.dots.current;
      s += `<circle cx="${GH.n(x)}" cy="${GH.n(g.dotsY)}" r="${GH.n(current ? g.dotR * 2 : g.dotR)}" fill="${current ? "#90EE90" : "#FFFFFF"}"/>`;
    }
  }

  /* L1/R1 chips: the button's badge with the neighboring page's title below it */
  if (def.chips) {
    const fs = g.hintFont;
    const chip = (x, button, title) => {
      const by = g.cy - fs * 0.6;
      let c = GH.badge(button, x, by, g.badgeHeight, false);
      const baseline = by + g.badgeHeight / 2 + fs * 0.4 + F.lato.asc * fs;
      c += GH.text(title, GH.snap(x), GH.snap(baseline), F.lato, fs, GH.RADIAL.lighterGray, "middle");
      return c;
    };
    if (def.chips.prev)
      s += chip(g.cx - g.chipOffsetX, "l1", def.chips.prev);
    if (def.chips.next)
      s += chip(g.cx + g.chipOffsetX, "r1", def.chips.next);
  }

  /* Hint bar: badge, a small gap, the label, a large gap */
  {
    const fs = g.hintFont;
    const small = fs * 0.4, large = fs * 1.4;
    const entries = def.hints.map(h => ({ hint: { buttons: [h[0]] }, label: h[1] }));
    entries.forEach(e => {
      e.bw = GH.measureHintBadges(e.hint, g.badgeHeight);
      e.lw = GH.measure(e.label, F.lato, fs);
    });
    let total = 0;
    entries.forEach((e, i) => { total += e.bw + small + e.lw + (i > 0 ? large : 0); });
    let x = g.cx - total / 2;
    const baseline = g.hintY + (F.lato.asc - F.lato.desc) * fs * 0.5;
    entries.forEach(e => {
      s += GH.hintBadges(e.hint, x, g.hintY, g.badgeHeight);
      x += e.bw + small;
      s += GH.text(e.label, GH.snap(x), GH.snap(baseline), F.lato, fs, "#FFFFFF");
      x += e.lw + large;
    });
  }

  /* Ring: empty slots dashed, then the slices, the highlighted one last */
  const dash = Math.max(2, 0.02 * g.ro);
  const paths = [];
  for (let k = 0; k < n; k++)
    paths.push(GH.cornerPath(GH.slicePolygon(g, k, n), Math.max(0.5, g.cornerR)));
  for (let k = 0; k < n; k++) {
    if (def.slots[k])
      continue;
    s += `<path transform="translate(${GH.n(g.cx)} ${GH.n(g.cy)})" d="${paths[k]}" fill="none" stroke="${GH.RADIAL.emptyOutline}"` +
      ` stroke-width="${GH.n(g.dip)}" stroke-dasharray="${GH.n(dash)} ${GH.n(dash)}"/>`;
  }
  const order = [];
  for (let k = 0; k < n; k++)
    if (def.slots[k] && k !== def.highlight)
      order.push(k);
  if (def.highlight >= 0 && def.slots[def.highlight])
    order.push(def.highlight);

  const iconSize = Math.max(0, Math.min(0.42 * (g.ro - g.innerR), 0.55 * GH.arcLength(g.midR, n)));
  const labelMax = 0.92 * GH.arcLength(g.midR, n);
  order.forEach(k => {
    const item = def.slots[k];
    const e = k === def.highlight ? 1 : 0;
    const rad = (k * 360 / n) * Math.PI / 180;
    const dirX = Math.sin(rad), dirY = -Math.cos(rad);
    const offset = g.highlightOffset * e;
    const tx = g.cx + dirX * offset, ty = g.cy + dirY * offset;
    if (e > 0 && !def.seeThrough)
      s += `<path transform="translate(${GH.n(tx)} ${GH.n(ty)})" d="${paths[k]}" fill="${pal.accent}" fill-opacity="${GH.n(0x60 / 255)}" filter="url(#${id}-glow)"/>`;
    const fill = e > 0 ? hiFill : GH.rgba(sliceBase);
    const stroke = e > 0 ? pal.accent : GH.RADIAL.sliceBorder;
    const sw = g.dip * (e > 0 ? 2 : 1);
    s += `<path transform="translate(${GH.n(tx)} ${GH.n(ty)})" d="${paths[k]}" fill="${fill}" stroke="${stroke}" stroke-width="${GH.n(sw)}"/>`;

    /* Contents: icon over label, toggles moved inward and given a pill */
    const isToggle = item.toggle !== undefined;
    const radius = g.midR + offset - (isToggle ? 0.03 * g.ro : 0);
    const px = g.cx + dirX * radius, py = g.cy + dirY * radius;
    const size = iconSize * (1 + 0.12 * e);
    const labelSize = GH.fitSize(item.label, F.lato, g.labelFont, Math.min(g.labelMin, g.labelFont), labelMax);
    const label = GH.ellipsize(item.label, F.lato, labelSize, labelMax);
    const labelHeight = labelSize * 1.25;
    let top = py - (size + labelHeight) / 2;
    const dest = { x: px - size / 2, y: top, w: size, h: size };
    if (item.orb) {
      s += GH.orb(id, dest, item.orb, e > 0.5);
      top += size;
    } else if (item.icon) {
      const lit = e > 0.5 ? ` filter="url(#${id}-lit)"` : "";
      s += `<image href="${GH.ASSETS}${item.icon}" x="${GH.n(dest.x)}" y="${GH.n(dest.y)}" width="${GH.n(size)}" height="${GH.n(size)}" preserveAspectRatio="none"${lit}/>`;
      top += size;
    } else {
      top = py - labelHeight / 2;
    }
    s += GH.text(label, GH.snap(px), GH.snap(top + F.lato.asc * labelSize), F.lato, labelSize, "#FFFFFF", "middle");

    if (isToggle) {
      const r = g.ro + offset - 0.085 * g.ro;
      const qx = g.cx + dirX * r, qy = g.cy + dirY * r;
      const fs = g.pillFont;
      const h = fs * 1.5;
      const text = item.toggle ? "ON" : "OFF";
      const w = GH.measure(text, F.latoBold, fs) + fs * 1.2;
      if (item.toggle)
        s += `<rect x="${GH.n(qx - w / 2)}" y="${GH.n(qy - h / 2)}" width="${GH.n(w)}" height="${GH.n(h)}" rx="${GH.n(h / 2)}" fill="${GH.RADIAL.onGreen}"/>`;
      else
        s += `<rect x="${GH.n(qx - w / 2)}" y="${GH.n(qy - h / 2)}" width="${GH.n(w)}" height="${GH.n(h)}" rx="${GH.n(h / 2)}" fill="none"` +
          ` stroke="${GH.RADIAL.textGray}" stroke-width="${GH.n(g.dip)}"/>`;
      s += GH.text(text, GH.snap(qx), GH.snap(qy + (F.latoBold.asc - F.latoBold.desc) * fs / 2), F.latoBold, fs,
        item.toggle ? GH.RADIAL.pillDarkText : GH.RADIAL.textGray, "middle");
    }
  });

  /* Hub */
  s += `<circle cx="${GH.n(g.cx)}" cy="${GH.n(g.cy)}" r="${GH.n(g.hubR)}" fill="${def.seeThrough ? GH.RADIAL.seeThroughHubFill : GH.RADIAL.hubFill}"` +
    ` stroke="${pal.accent}" stroke-width="${GH.n(1.5 * g.dip)}"/>`;
  const item = def.highlight >= 0 ? def.slots[def.highlight] : null;
  if (item) {
    const ws = 0.11 * g.hubR;
    const deg = def.highlight * 360 / n;
    s += `<path transform="rotate(${GH.n(deg)} ${GH.n(g.cx)} ${GH.n(g.cy)}) translate(${GH.n(g.cx)} ${GH.n(g.cy - g.hubR)})"` +
      ` d="M${GH.n(-ws)} ${GH.n(ws * 0.25)}L${GH.n(ws)} ${GH.n(ws * 0.25)}L0 ${GH.n(-ws * 0.9)}Z" fill="${pal.accent}"/>`;
  }
  const hubWidth = 0.86 * 2 * g.hubR;
  const titleMin = 0.6 * g.hubTitleFont;
  const descWidth = 0.8 * 2 * g.hubR;
  if (def.promptVerb) {
    const verbSize = GH.fitSize(def.promptVerb, F.immortal, g.hubTitleFont, titleMin, hubWidth);
    const verbH = GH.lineHeight(F.immortal, verbSize);
    const y = g.cy - verbH / 2;
    const verbBaseline = y + F.immortal.asc * verbSize;
    const capHeight = F.immortal.cap * verbSize;
    const topCenterY = (g.cy - g.hubR + verbBaseline - capHeight) / 2;
    const rise = g.cy - topCenterY;
    const chord = 2 * Math.sqrt(Math.max(0, g.hubR * g.hubR - rise * rise));
    const topWidth = Math.max(1, Math.min(hubWidth, 0.86 * chord));
    const topBase = g.hubDescFont;
    let topSize = Math.min(GH.fitSize("Tilt to aim", F.lato, topBase, topBase * 0.7, topWidth),
      GH.fitSize("Point to choose", F.lato, topBase, topBase * 0.7, topWidth));
    def.slots.forEach(it => { if (it) topSize = Math.min(topSize, GH.fitSize(it.label, F.lato, topBase, topBase * 0.7, topWidth)); });
    const top = item ? item.label : "Tilt to aim";
    s += GH.text(top, GH.snap(g.cx), GH.snap(topCenterY + (F.lato.asc - F.lato.desc) * topSize / 2), F.lato, topSize, pal.title, "middle");
    s += GH.text(def.promptVerb, GH.snap(g.cx), GH.snap(verbBaseline), F.immortal, verbSize, "#FFFFFF", "middle");
  } else if (item) {
    const titleSize = GH.fitSize(item.label, F.immortal, g.hubTitleFont, titleMin, hubWidth);
    const title = GH.ellipsize(item.label, F.immortal, titleSize, hubWidth);
    const desc = item.description && item.description.trim() !== item.label.trim() ? GH.wrap(item.description, F.underwood, g.hubDescFont, descWidth, 3) : [];
    const showStatus = item.toggle !== undefined;
    const titleH = GH.lineHeight(F.immortal, titleSize);
    const descH = GH.lineHeight(F.underwood, g.hubDescFont);
    const statusH = GH.lineHeight(F.lato, g.hubDescFont);
    let y = g.cy - (titleH + descH * desc.length + (showStatus ? statusH : 0)) / 2;
    s += GH.text(title, GH.snap(g.cx), GH.snap(y + F.immortal.asc * titleSize), F.immortal, titleSize, "#FFFFFF", "middle");
    y += titleH;
    desc.forEach(line => {
      s += GH.text(line, GH.snap(g.cx), GH.snap(y + F.underwood.asc * g.hubDescFont), F.underwood, g.hubDescFont, GH.RADIAL.lighterGray, "middle");
      y += descH;
    });
    if (showStatus) {
      const fs = g.hubDescFont;
      const cw = GH.measure("Currently: ", F.lato, fs);
      const value = item.toggle ? "On" : "Off";
      const vw = GH.measure(value, F.latoBold, fs);
      const x = GH.snap(g.cx - (cw + vw) / 2);
      const baseline = GH.snap(y + F.lato.asc * fs);
      s += GH.text("Currently: ", x, baseline, F.lato, fs, GH.RADIAL.lighterGray, "start", ' xml:space="preserve"');
      s += GH.text(value, x + cw, baseline, F.latoBold, fs, item.toggle ? GH.RADIAL.onGreen : GH.RADIAL.textGray);
    }
  } else {
    const titleSize = GH.fitSize(def.idleName, F.immortal, g.hubTitleFont, titleMin, hubWidth);
    const line = def.idleLine || "Tilt the stick to choose";
    const lineSize = GH.fitSize(line, F.lato, g.hubDescFont, g.hubDescFont * 0.7, hubWidth);
    const titleH = GH.lineHeight(F.immortal, titleSize);
    const lineH = GH.lineHeight(F.lato, lineSize);
    let y = g.cy - (titleH + lineH) / 2;
    s += GH.text(def.idleName, GH.snap(g.cx), GH.snap(y + F.immortal.asc * titleSize), F.immortal, titleSize, "#FFFFFF", "middle");
    y += titleH;
    s += GH.text(line, GH.snap(g.cx), GH.snap(y + F.lato.asc * lineSize), F.lato, lineSize, GH.RADIAL.lighterGray, "middle");
  }
  return s;
};

/* Figures */

GH.panel = function (x, y, w, h) {
  return `<rect x="${GH.n(x + 1)}" y="${GH.n(y + 1)}" width="${GH.n(w - 2)}" height="${GH.n(h - 2)}" rx="24" fill="#12100d"` +
    ` stroke="rgba(212,168,83,0.24)" stroke-width="2"/>`;
};

/* Renders the SVG body into the page's svg element once the fonts have loaded; cssWidth and
   cssHeight are the page size, the viewBox is twice that in device pixels */
GH.mount = function (cssWidth, cssHeight, build) {
  GH.ready().then(() => {
    const svg = document.getElementById("figure");
    svg.setAttribute("width", cssWidth);
    svg.setAttribute("height", cssHeight);
    svg.setAttribute("viewBox", `0 0 ${cssWidth * 2} ${cssHeight * 2}`);
    svg.innerHTML = build();
    document.title = "ready";
  });
};
