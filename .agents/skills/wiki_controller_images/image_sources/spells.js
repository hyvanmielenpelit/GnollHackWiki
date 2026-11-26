/* The gamepad Spells radial, ported to SVG.
   Follows GHRadialMenuRenderer.cs (set tabs, slot badges, hub runs, description band, fixed hub item),
   GHRadialGeometry.cs (label widths) and GamePage.SpellRadial.cs (what each item shows).
   Builds on gh.js. Works in device pixels. Spell and command tiles load from the GnollHackTileSet repository's
   UI\spell-tile and UI\command-tile, the icons and symbols from the game's Assets\UI\. */

"use strict";

const SP = {};

SP.TILES = "file:///C:/hmp/GnollHackTileSet/UI/";
SP.spellTile = name => SP.TILES + "spell-tile/" + name + "/" + name + "_active.png";
SP.commandTile = name => SP.TILES + "command-tile/" + name + "/" + name + "_active.png";
SP.ui = file => GH.ASSETS + file;

/* Special symbols: file and pixel size */
SP.SYMBOLS = {
  "&success;": ["symbol-success.png", 32, 32],
  "&mana;": ["symbol-mana.png", 32, 32],
  "&cool;": ["symbol-cooldown.png", 32, 32],
  "&casts;": ["symbol-casts.png", 32, 33],
  "&sparc;": ["symbol-spell-arcane.png", 48, 48],
  "&spenc;": ["symbol-spell-enchantment.png", 48, 48],
  "&spmov;": ["symbol-spell-movement.png", 48, 48],
  "&sphea;": ["symbol-spell-healing.png", 48, 48],
  "&spdiv;": ["symbol-spell-divination.png", 48, 48]
};

SP.C = {
  gold: [0xD4, 0xA0, 0x17, 255],
  goldHighlightFill: [58, 46, 10, 0xE6],
  sliceFill: [38, 38, 38, 0xD9],
  sliceBorder: [255, 255, 255, 0x40],
  disabledBorder: [128, 128, 128, 255],
  hubFill: [0, 0, 0, 0xBF],
  lighterGray: [204, 204, 204, 255],
  textGray: [128, 128, 128, 255],
  disabledLabel: [255, 255, 255, 0x80],
  starOutline: [70, 48, 0, 255],
  countFill: [24, 24, 24, 0xE6],
  onGreen: [0x90, 0xEE, 0x90, 255],
  pillDark: [20, 20, 20, 255],
  white: [255, 255, 255, 255],
  magenta: [255, 0, 255, 255]
};

SP.lerp = function (a, b, t) {
  if (t <= 0) return a;
  if (t >= 1) return b;
  return a.map((v, i) => Math.floor(v + (b[i] - v) * t + 0.5));
};

SP.tint = function (a, b, t) {
  if (t <= 0) return a;
  t = Math.min(1, t);
  return [0, 1, 2].map(i => Math.floor(a[i] + (b[i] - a[i]) * t + 0.5)).concat([a[3]]);
};

SP.rgba = function (c, opacity) {
  const a = c[3] / 255 * (opacity === undefined ? 1 : opacity);
  return `rgba(${c[0]},${c[1]},${c[2]},${GH.n(a)})`;
};

/* Geometry with the rows that the tabs and the description band reserve (UpdateReserve) */
SP.geometry = function (W, H, dip, footerLines, footerTitles) {
  const F = GH.FONTS;
  const spacing = F.underwood.asc + F.underwood.desc + F.underwood.gap;
  const kTop = 1.25 * 1.5 * 0.07;
  const kBottom = (footerLines + (footerTitles ? 1 : 0) + (footerTitles ? 0.35 : 0) + 0.5) * spacing * 0.9 * 0.052;
  const fixedR = Math.min(0.4 * W, 430 * dip);
  const heightR = 0.4 * H / (1 + 0.4 * (kTop + kBottom));
  const ro = Math.max(0, Math.min(fixedR, heightR));
  const top = Math.round(kTop * ro), bottom = kBottom * ro;
  const g = GH.radialGeometry(W / 2, top + (H - top - bottom) / 2, ro, dip);
  g.W = W;
  g.H = H;
  g.margin = 16 * dip;
  g.hintCenterY = g.hintY + bottom;
  g.hubDescFont = 0.052 * ro;
  return g;
};

/* Text fitting (FitLines, TryWrapExact, LargestFittingSize) */

SP.tryWrapExact = function (text, font, size, maxWidth, maxLines) {
  const words = text.split(" ").filter(w => w.length > 0);
  const lines = [];
  let w = 0;
  while (w < words.length) {
    if (lines.length >= maxLines)
      return null;
    let line = words[w++];
    if (GH.measure(line, font, size) > maxWidth)
      return null;
    while (w < words.length) {
      const candidate = line + " " + words[w];
      if (GH.measure(candidate, font, size) > maxWidth)
        break;
      line = candidate;
      w++;
    }
    lines.push(line);
  }
  return lines;
};

SP.largestFittingSize = function (text, font, base, min, maxWidth, maxLines) {
  if (SP.tryWrapExact(text, font, base, maxWidth, maxLines))
    return base;
  if (!SP.tryWrapExact(text, font, min, maxWidth, maxLines))
    return 0;
  let lo = min, hi = base;
  for (let i = 0; i < 10; i++) {
    const mid = (lo + hi) / 2;
    if (SP.tryWrapExact(text, font, mid, maxWidth, maxLines))
      lo = mid;
    else
      hi = mid;
  }
  return lo;
};

/* Returns { size, lines } */
SP.fitLines = function (text, font, base, min, widths, maxLines, wrapFirst) {
  if (min > base)
    min = base;
  if (wrapFirst) {
    for (let n = 1; n <= maxLines; n++) {
      const lines = SP.tryWrapExact(text, font, base, widths[n - 1], n);
      if (lines)
        return { size: base, lines };
    }
    let best = 0, bestLines = 0;
    for (let n = 1; n <= maxLines; n++) {
      const s = SP.largestFittingSize(text, font, base, min, widths[n - 1], n);
      if (s > best) {
        best = s;
        bestLines = n;
      }
    }
    if (bestLines > 0)
      return { size: best, lines: SP.tryWrapExact(text, font, best, widths[bestLines - 1], bestLines) };
  } else {
    for (let n = 1; n <= maxLines; n++) {
      const s = SP.largestFittingSize(text, font, base, min, widths[n - 1], n);
      if (s > 0)
        return { size: s, lines: SP.tryWrapExact(text, font, s, widths[n - 1], n) };
    }
  }
  return { size: min, lines: GH.wrap(text, font, min, widths[maxLines - 1], maxLines) };
};

/* GetLabelMaxWidthAt: the widest block of blockHeight centered at (ox, oy) inside the slot's slice */
SP.labelMaxWidthAt = function (g, n, slot, ox, oy, blockHeight) {
  const arcWidth = 0.92 * GH.arcLength(g.midR, n);
  if (n < 3)
    return arcWidth;
  const half = 180 / n, c = slot * 360 / n;
  const a0 = (c - half) * Math.PI / 180, a1 = (c + half) * Math.PI / 180;
  const n0x = Math.cos(a0), n0y = Math.sin(a0), n1x = -Math.cos(a1), n1y = -Math.sin(a1);
  const edge = g.sliceGap / 2;
  const fits = (hw, hh) => {
    const x0 = ox - hw, x1 = ox + hw, y0 = oy - hh, y1 = oy + hh;
    if (n0x * (n0x >= 0 ? x0 : x1) + n0y * (n0y >= 0 ? y0 : y1) < edge)
      return false;
    if (n1x * (n1x >= 0 ? x0 : x1) + n1y * (n1y >= 0 ? y0 : y1) < edge)
      return false;
    const fx = Math.max(Math.abs(x0), Math.abs(x1)), fy = Math.max(Math.abs(y0), Math.abs(y1));
    if (fx * fx + fy * fy > g.ro * g.ro)
      return false;
    const nx = Math.min(Math.max(0, x0), x1), ny = Math.min(Math.max(0, y0), y1);
    return nx * nx + ny * ny >= g.innerR * g.innerR;
  };
  let hh = Math.max(0, blockHeight / 2);
  if (!fits(0, hh)) {
    if (hh > 0 && fits(0, 0))
      hh = 0;
    else
      return arcWidth;
  }
  let lo = 0, hi = 2 * g.ro;
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    if (fits(mid / 2, hh))
      lo = mid;
    else
      hi = mid;
  }
  return 0.92 * lo;
};

SP.iconSize = function (g, n) {
  return Math.max(0, Math.min(0.42 * (g.ro - g.innerR), 0.55 * GH.arcLength(g.midR, n)));
};

/* FitItemLabel: up to maxLines lines, each within the slice under the icon */
SP.fitLabel = function (g, item, n, slot, maxLines) {
  const F = GH.FONTS;
  const label = item.placeholder && !item.label ? "Empty" : item.label;
  const base = g.labelFont, min = Math.min(g.labelMin, g.labelFont);
  const lineH = base * 1.25;
  const rad = slot * 360 / n * Math.PI / 180;
  const x = Math.sin(rad) * g.midR, y = -Math.cos(rad) * g.midR + SP.iconSize(g, n) / 2;
  const widths = [];
  for (let k = 1; k <= maxLines; k++)
    widths.push(SP.labelMaxWidthAt(g, n, slot, x, y, k * lineH));
  return SP.fitLines(label, F.lato, base, min, widths, maxLines, true);
};

/* Hub runs: [{ symbol, text, color }] measured at size, shrunk to maxWidth down to minScale */
SP.measureRuns = function (runs, font, size) {
  const symbolH = 0.95 * size;
  let total = 0;
  const parts = runs.map((r, i) => {
    const sym = r.symbol ? SP.SYMBOLS[r.symbol] : null;
    const sw = sym ? symbolH * sym[1] / sym[2] : 0;
    const tw = r.text ? GH.measure(r.text, font, size) : 0;
    if (sw > 0) {
      if (i > 0)
        total += size * 0.5;
      total += sw + (tw > 0 ? size * 0.2 : 0);
    }
    total += tw;
    return { sw, tw };
  });
  return { parts, total };
};

SP.hubLine = function (runs, font, size, maxWidth, minScale) {
  let m = SP.measureRuns(runs, font, size);
  if (m.total > maxWidth && m.total > 0) {
    size = Math.max(size * minScale, size * maxWidth / m.total);
    m = SP.measureRuns(runs, font, size);
  }
  return { runs, font, size, parts: m.parts, total: m.total };
};

SP.drawHubLine = function (line, cx, baseline, defaultColor) {
  const font = line.font, size = line.size;
  const symbolH = 0.95 * size;
  const symbolMid = baseline - font.cap * size / 2;
  let x = cx - line.total / 2;
  let s = "";
  line.runs.forEach((r, i) => {
    const p = line.parts[i];
    if (p.sw > 0) {
      if (i > 0)
        x += size * 0.5;
      s += `<image href="${SP.ui(SP.SYMBOLS[r.symbol][0])}" x="${GH.n(x)}" y="${GH.n(symbolMid - symbolH / 2)}" width="${GH.n(p.sw)}"` +
        ` height="${GH.n(symbolH)}" preserveAspectRatio="none"/>`;
      x += p.sw + (p.tw > 0 ? size * 0.2 : 0);
    }
    if (p.tw > 0) {
      s += GH.text(r.text, GH.snap(x), GH.snap(baseline), font, size, SP.rgba(r.color || defaultColor));
      x += p.tw;
    }
  });
  return s;
};

SP.defs = function (id, g) {
  return GH.radialDefs(id, g) +
    `<filter id="${id}-gray" color-interpolation-filters="sRGB"><feColorMatrix type="matrix"` +
    ` values="0.21 0.72 0.07 0 0  0.21 0.72 0.07 0 0  0.21 0.72 0.07 0 0  0 0 0 1 0"/></filter>`;
};

/* An item's icon in dest: a glyph tile (64x48) fitted and centered, or an icon image */
SP.icon = function (id, item, dest, enabled, highlighted) {
  const filter = !enabled ? ` filter="url(#${id}-gray)"` : highlighted ? ` filter="url(#${id}-lit)"` : "";
  if (item.tile) {
    const w = dest.w, h = dest.w * 48 / 64;
    return `<image href="${item.tile}" x="${GH.n(dest.x)}" y="${GH.n(dest.y + (dest.h - h) / 2)}" width="${GH.n(w)}" height="${GH.n(h)}"` +
      ` preserveAspectRatio="none"${filter}/>`;
  }
  if (item.icon)
    return `<image href="${SP.ui(item.icon)}" x="${GH.n(dest.x)}" y="${GH.n(dest.y)}" width="${GH.n(dest.w)}" height="${GH.n(dest.h)}"` +
      ` preserveAspectRatio="none"${filter}/>`;
  return null;
};

SP.starPath = function (h) {
  const outer = h * 0.55, inner = outer * 0.45;
  const pts = [];
  for (let i = 0; i < 10; i++)
    pts.push(GH.polar(0, 0, i * 36, i % 2 === 0 ? outer : inner));
  return pts.map((p, i) => (i ? "L" : "M") + GH.n(p[0]) + " " + GH.n(p[1])).join("") + "Z";
};

SP.pill = function (g, cx, cy, h, text, fill, textColor, outline) {
  const F = GH.FONTS;
  const size = h * 0.62;
  const w = Math.max(h, GH.measure(text, F.latoBold, size) + h * 0.7);
  let s = `<rect x="${GH.n(cx - w / 2)}" y="${GH.n(cy - h / 2)}" width="${GH.n(w)}" height="${GH.n(h)}" rx="${GH.n(h / 2)}" fill="${SP.rgba(fill)}"/>`;
  if (outline)
    s += `<rect x="${GH.n(cx - w / 2)}" y="${GH.n(cy - h / 2)}" width="${GH.n(w)}" height="${GH.n(h)}" rx="${GH.n(h / 2)}" fill="none"` +
      ` stroke="${SP.rgba([204, 204, 204, textColor[3]])}" stroke-width="${GH.n(g.dip)}"/>`;
  s += GH.text(text, GH.snap(cx), GH.snap(cy + (F.latoBold.asc - F.latoBold.desc) * size / 2), F.latoBold, size, SP.rgba(textColor), "middle");
  return s;
};

/* A Star, New or Count badge at the slice's outer edge, clockwise of its center line */
SP.slotBadge = function (g, item, slot, n, dirX, dirY, offset, enabled) {
  const h = 1.15 * g.labelFont;
  const r = g.ro - 0.085 * g.ro;
  const a = (slot * 360 / n + 0.55 * 180 / n) * Math.PI / 180;
  const bx = g.cx + dirX * offset + Math.sin(a) * r;
  const by = g.cy + dirY * offset - Math.cos(a) * r;
  const alpha = enabled ? 255 : 0x80;
  if (item.badge === "star")
    return `<path transform="translate(${GH.n(bx)} ${GH.n(by)})" d="${SP.starPath(h)}" fill="${SP.rgba([0xD4, 0xA0, 0x17, alpha])}"` +
      ` stroke="${SP.rgba([70, 48, 0, alpha])}" stroke-width="${GH.n(g.dip)}"/>`;
  if (item.badge === "new")
    return SP.pill(g, bx, by, h, "NEW", [0x90, 0xEE, 0x90, alpha], [20, 20, 20, alpha], false);
  if (item.badge === "count")
    return SP.pill(g, bx, by, h, item.badgeText, [24, 24, 24, Math.floor(0xE6 * alpha / 255)], [255, 255, 255, alpha], true);
  return "";
};

/* def: { id, title, tabs: [[label, icon], [label, icon]], activeTab, switchEnabled, dots: { count, current },
   chips: { prev, next }, slots: [item|null], highlight, fixedHub: item, hints: [[button, label, dimmed]] }
   item: { label, tile | icon, color (rgba array), enabled, grayed, placeholder, tint (rgba array), badge, badgeText,
   hubTitle, topLine: runs, hubLines: [runs], footerTitle: runs, footerText } */
SP.radial = function (def, g) {
  const F = GH.FONTS, C = SP.C;
  const id = def.id;
  const n = def.slots.length;
  let s = `<defs>${SP.defs(id, g)}</defs>`;
  s += `<circle cx="${GH.n(g.cx)}" cy="${GH.n(g.cy)}" r="${GH.n(1.35 * g.ro)}" fill="url(#${id}-vignette)"/>`;

  /* Header: page title, set tabs, dots */
  if (def.title) {
    const size = GH.fitSize(def.title, F.immortal, g.pageTitleFont, g.pageTitleFont * 0.6, g.W - 2 * g.margin);
    s += GH.text(def.title, GH.snap(g.cx), GH.snap(g.pageTitleBaseline), F.immortal, size, "#FFFFFF", "middle");
  }
  if (def.tabs) {
    const h = 1.5 * g.pageTitleFont;
    const fs = h * 0.5, iconSize = h * 0.62, badgeH = h * 0.7, pad = h * 0.45, spacing = h * 0.35;
    const titleTop = g.pageTitleBaseline - F.immortal.asc * g.pageTitleFont;
    const cy = titleTop - 0.25 * h - h / 2;
    const badgeW = GH.measureBadge("x", badgeH);
    const widths = def.tabs.map(t => 2 * pad + iconSize + h * 0.2 + GH.measure(t[0], F.lato, fs));
    let x = g.cx - (widths[0] + widths[1] + badgeW + 2 * spacing) / 2;
    for (let i = 0; i < 2; i++) {
      const alpha = def.switchEnabled && i === def.activeTab ? 1 : 0.45;
      const border = def.switchEnabled && i === def.activeTab ? C.gold : C.lighterGray;
      s += `<rect x="${GH.n(x)}" y="${GH.n(cy - h / 2)}" width="${GH.n(widths[i])}" height="${GH.n(h)}" rx="${GH.n(h / 2)}"` +
        ` fill="${SP.rgba(C.hubFill, alpha)}" stroke="${SP.rgba(border, alpha)}" stroke-width="${GH.n(1.5 * g.dip)}"/>`;
      let tx = x + pad;
      s += `<image href="${SP.ui(def.tabs[i][1])}" x="${GH.n(tx)}" y="${GH.n(cy - iconSize / 2)}" width="${GH.n(iconSize)}" height="${GH.n(iconSize)}"` +
        ` preserveAspectRatio="none" opacity="${GH.n(alpha)}"/>`;
      tx += iconSize + h * 0.2;
      s += GH.text(def.tabs[i][0], GH.snap(tx), GH.snap(cy + (F.lato.asc - F.lato.desc) * fs / 2), F.lato, fs, SP.rgba(C.white, alpha));
      x += widths[i];
      if (i === 0) {
        if (def.switchEnabled)
          s += GH.badge("x", x + spacing + badgeW / 2, cy, badgeH, false);
        x += 2 * spacing + badgeW;
      }
    }
  }
  if (def.dots && def.dots.count > 1) {
    for (let i = 0; i < def.dots.count; i++) {
      const x = g.cx + (i - (def.dots.count - 1) / 2) * g.dotSpacing;
      const current = i === def.dots.current;
      s += `<circle cx="${GH.n(x)}" cy="${GH.n(g.dotsY)}" r="${GH.n(current ? g.dotR * 2 : g.dotR)}" fill="${current ? "#90EE90" : "#FFFFFF"}"/>`;
    }
  }

  /* L1/R1 chips */
  if (def.chips) {
    const fs = g.hintFont;
    const badgeH = fs * GH.BADGE_HEIGHT_OF_FONT;
    const chipX = g.cx - g.chipOffsetX;
    const chipMax = 2 * Math.min(chipX - g.margin, g.cx - g.ro - g.highlightOffset - g.margin / 2 - chipX);
    const chip = (x, button, title) => {
      const by = g.cy - fs * 0.6;
      let c = GH.badge(button, x, by, badgeH, false);
      const baseline = by + badgeH / 2 + fs * 0.4 + F.lato.asc * fs;
      c += GH.text(GH.ellipsize(title, F.lato, fs, chipMax), GH.snap(x), GH.snap(baseline), F.lato, fs, SP.rgba(C.lighterGray), "middle");
      return c;
    };
    if (def.chips.prev)
      s += chip(g.cx - g.chipOffsetX, "l1", def.chips.prev);
    if (def.chips.next)
      s += chip(g.cx + g.chipOffsetX, "r1", def.chips.next);
  }

  /* Hint bar */
  {
    const fs = g.hintFont;
    const badgeH = fs * GH.BADGE_HEIGHT_OF_FONT;
    const small = fs * 0.4, large = fs * 1.4;
    const entries = def.hints.map(h => ({ hint: { buttons: [h[0]] }, label: h[1], dim: h[2] }));
    let total = 0;
    entries.forEach((e, i) => {
      e.bw = GH.measureHintBadges(e.hint, badgeH);
      e.lw = GH.measure(e.label, F.lato, fs);
      total += e.bw + small + e.lw + (i > 0 ? large : 0);
    });
    let x = g.cx - total / 2;
    const baseline = g.hintCenterY + (F.lato.asc - F.lato.desc) * fs * 0.5;
    entries.forEach(e => {
      let part = GH.hintBadges(e.hint, x, g.hintCenterY, badgeH);
      x += e.bw + small;
      part += GH.text(e.label, GH.snap(x), GH.snap(baseline), F.lato, fs, "#FFFFFF");
      x += e.lw + large;
      s += e.dim ? `<g opacity="0.45">${part}</g>` : part;
    });
  }

  /* Description band: the highlighted item's footer, else the fixed hub item's */
  {
    let item = def.highlight >= 0 ? def.slots[def.highlight] : null;
    if (!item || (item.footerText === undefined && item.footerTitle === undefined))
      item = def.fixedHub;
    if (item && (item.footerText || item.footerTitle)) {
      const bandTop = g.cy + g.ro + g.highlightOffset;
      const bandBottom = g.hintCenterY - g.hintFont * GH.BADGE_HEIGHT_OF_FONT / 2;
      const width = Math.max(1, Math.min(g.W - 2 * g.margin, 2.4 * g.ro));
      let size = 0.9 * g.hubDescFont;
      const title = item.footerTitle ? SP.hubLine(item.footerTitle, F.underwood, size, width, 0.7) : null;
      let lines = [];
      if (item.footerText) {
        lines = SP.tryWrapExact(item.footerText, F.underwood, size, width, 3);
        if (!lines) {
          size *= 0.85;
          lines = GH.wrap(item.footerText, F.underwood, size, width, 3);
        }
      }
      const titleH = title ? GH.lineHeight(F.underwood, title.size) : 0;
      const lineH = GH.lineHeight(F.underwood, size);
      const titleGap = title && lines.length ? titleH * 0.35 : 0;
      let y = (bandTop + bandBottom) / 2 - (titleH + titleGap + lineH * lines.length) / 2;
      if (title) {
        s += SP.drawHubLine(title, g.cx, y + F.underwood.asc * title.size, C.white);
        y += titleH + titleGap;
      }
      lines.forEach(line => {
        s += GH.text(line, GH.snap(g.cx), GH.snap(y + F.underwood.asc * size), F.underwood, size, SP.rgba(C.lighterGray), "middle");
        y += lineH;
      });
    }
  }

  /* Ring */
  const dash = Math.max(2, 0.02 * g.ro);
  const paths = [];
  for (let k = 0; k < n; k++)
    paths.push(GH.cornerPath(GH.slicePolygon(g, k, n), Math.max(0.5, g.cornerR)));
  for (let k = 0; k < n; k++) {
    if (def.slots[k])
      continue;
    s += `<path transform="translate(${GH.n(g.cx)} ${GH.n(g.cy)})" d="${paths[k]}" fill="none" stroke="rgba(255,255,255,0.125)"` +
      ` stroke-width="${GH.n(g.dip)}" stroke-dasharray="${GH.n(dash)} ${GH.n(dash)}"/>`;
  }
  const order = [];
  for (let k = 0; k < n; k++)
    if (def.slots[k] && k !== def.highlight)
      order.push(k);
  if (def.highlight >= 0 && def.slots[def.highlight])
    order.push(def.highlight);
  order.forEach(k => {
    const item = def.slots[k];
    const enabled = item.enabled !== false;
    const e = k === def.highlight ? 1 : 0;
    const rad = (k * 360 / n) * Math.PI / 180;
    const dirX = Math.sin(rad), dirY = -Math.cos(rad);
    const offset = g.highlightOffset * e;
    const tx = g.cx + dirX * offset, ty = g.cy + dirY * offset;
    const tr = `translate(${GH.n(tx)} ${GH.n(ty)})`;
    if (e > 0 && enabled)
      s += `<path transform="${tr}" d="${paths[k]}" fill="${SP.rgba([0xD4, 0xA0, 0x17, 0x60])}" filter="url(#${id}-glow)"/>`;
    let fill = SP.lerp(C.sliceFill, C.goldHighlightFill, enabled ? e : e * 0.5);
    let border = SP.lerp(C.sliceBorder, enabled ? C.gold : C.disabledBorder, e);
    if (item.tint) {
      const keep = 1 - 0.5 * e;
      fill = SP.tint(fill, item.tint, 0.2 * keep);
      border = SP.tint(border, item.tint, 0.45 * keep);
    }
    const dashed = item.placeholder ? ` stroke-dasharray="${GH.n(dash)} ${GH.n(dash)}"` : "";
    s += `<path transform="${tr}" d="${paths[k]}" fill="${SP.rgba(fill)}" stroke="${SP.rgba(border)}" stroke-width="${GH.n(g.dip * (1 + e))}"${dashed}/>`;

    /* Icon over the label lines */
    const fit = SP.fitLabel(g, item, n, k, def.labelMaxLines || 1);
    const lineH = fit.size * 1.25;
    const labelHeight = lineH * Math.max(1, fit.lines.length);
    const px = g.cx + dirX * (g.midR + offset), py = g.cy + dirY * (g.midR + offset);
    const size = SP.iconSize(g, n) * (1 + 0.12 * e);
    let top = py - (size + labelHeight) / 2;
    const dest = { x: px - size / 2, y: top, w: size, h: size };
    if (item.placeholder) {
      const half = size * 0.25;
      const color = SP.lerp(C.disabledLabel, C.lighterGray, e);
      s += `<path d="M${GH.n(px - half)} ${GH.n(top + size / 2)}H${GH.n(px + half)}M${GH.n(px)} ${GH.n(top + size / 2 - half)}V${GH.n(top + size / 2 + half)}"` +
        ` stroke="${SP.rgba(color)}" stroke-width="${GH.n(Math.max(1.5 * g.dip, size * 0.06))}" stroke-linecap="round"/>`;
      top += size;
    } else {
      const icon = SP.icon(id, item, dest, enabled && !item.grayed, e > 0.5);
      if (icon) {
        s += icon;
        top += size;
      } else {
        top = py - labelHeight / 2;
      }
    }
    const color = item.placeholder ? C.disabledLabel : (item.color || (enabled ? C.white : C.disabledLabel));
    fit.lines.forEach((line, i) => {
      s += GH.text(line, GH.snap(px), GH.snap(top + F.lato.asc * fit.size + i * lineH), F.lato, fit.size, SP.rgba(color), "middle");
    });
    if (item.badge)
      s += SP.slotBadge(g, item, k, n, dirX, dirY, offset, enabled);
  });

  /* Hub */
  s += `<circle cx="${GH.n(g.cx)}" cy="${GH.n(g.cy)}" r="${GH.n(g.hubR)}" fill="${SP.rgba(C.hubFill)}" stroke="${SP.rgba(C.gold)}" stroke-width="${GH.n(1.5 * g.dip)}"/>`;
  const item = def.highlight >= 0 ? def.slots[def.highlight] : null;
  if (item) {
    const ws = 0.11 * g.hubR;
    const deg = def.highlight * 360 / n;
    s += `<path transform="rotate(${GH.n(deg)} ${GH.n(g.cx)} ${GH.n(g.cy)}) translate(${GH.n(g.cx)} ${GH.n(g.cy - g.hubR)})"` +
      ` d="M${GH.n(-ws)} ${GH.n(ws * 0.25)}L${GH.n(ws)} ${GH.n(ws * 0.25)}L0 ${GH.n(-ws * 0.9)}Z" fill="${SP.rgba(C.gold)}"/>`;
  }
  const titleMin = 0.6 * g.hubTitleFont;
  if (def.fixedHub) {
    const fh = def.fixedHub;
    const width = 0.68 * 2 * g.hubR;
    const fit = SP.fitLines(fh.hubTitle || fh.label, F.immortal, g.hubTitleFont, titleMin, [width, width], 2, false);
    const iconSize = 0.7 * g.hubR;
    const lineH = GH.lineHeight(F.immortal, fit.size);
    const titleH = lineH * fit.lines.length;
    const gap = -iconSize * 0.06;
    const top = g.cy - (iconSize + gap + titleH) / 2;
    s += SP.icon(id, fh, { x: g.cx - iconSize / 2, y: top, w: iconSize, h: iconSize }, true, false);
    const y = top + iconSize + gap;
    fit.lines.forEach((line, i) => {
      s += GH.text(line, GH.snap(g.cx), GH.snap(y + F.immortal.asc * fit.size + i * lineH), F.immortal, fit.size, SP.rgba(fh.color || C.white), "middle");
    });
  } else if (item) {
    const hubWidth = 0.86 * 2 * g.hubR;
    const descWidth = 0.8 * 2 * g.hubR;
    const fit = SP.fitLines(item.hubTitle || item.label, F.immortal, g.hubTitleFont, titleMin, [hubWidth, hubWidth], def.hubTitleMaxLines || 1, false);
    const titleLineH = GH.lineHeight(F.immortal, fit.size);
    const titleH = titleLineH * fit.lines.length;
    const minScale = def.hubLineMinScale || 1;
    const lines = (item.hubLines || []).map(r => SP.hubLine(r, F.underwood, g.hubDescFont, descWidth, minScale));
    const linesGap = lines.length && def.hubLinesGapOfFont ? def.hubLinesGapOfFont * g.hubDescFont : 0;
    let linesH = linesGap;
    lines.forEach(l => { linesH += GH.lineHeight(F.underwood, l.size); });
    let topLine = null, topH = 0;
    if (item.topLine) {
      topLine = SP.hubLine(item.topLine, F.lato, g.hubDescFont, Infinity, minScale);
      topH = GH.lineHeight(F.lato, topLine.size) * 1.2;
      const rise = (topH + titleH + linesH) / 2;
      const chord = 2 * Math.sqrt(Math.max(0, g.hubR * g.hubR - rise * rise));
      const topWidth = Math.max(1, Math.min(hubWidth, 0.86 * chord));
      topLine = SP.hubLine(item.topLine, F.lato, g.hubDescFont, topWidth, minScale);
      topH = GH.lineHeight(F.lato, topLine.size) * 1.2;
    }
    let y = g.cy - (topH + titleH + linesH) / 2;
    if (topLine) {
      s += SP.drawHubLine(topLine, g.cx, y + F.lato.asc * topLine.size, C.lighterGray);
      y += topH;
    }
    fit.lines.forEach((line, i) => {
      s += GH.text(line, GH.snap(g.cx), GH.snap(y + F.immortal.asc * fit.size + i * titleLineH), F.immortal, fit.size, SP.rgba(item.color || C.white), "middle");
    });
    y += titleH + linesGap;
    lines.forEach(l => {
      s += SP.drawHubLine(l, g.cx, y + F.underwood.asc * l.size, C.lighterGray);
      y += GH.lineHeight(F.underwood, l.size);
    });
  }
  return s;
};

/* A spell's slice item as ShowGamepadSpellRadial builds it */
SP.spell = function (sp, opts) {
  opts = opts || {};
  const item = {
    label: sp.name,
    tile: SP.spellTile(sp.tile),
    enabled: !sp.state,
    color: sp.state === "cooling" ? SP.C.magenta : null,
    badge: opts.badge,
    footerTitle: [{ symbol: sp.symbol, text: sp.level }],
    footerText: sp.desc
  };
  if (sp.state === "cooling") {
    item.tint = SP.C.magenta;
    item.grayed = true;
    item.topLine = [{ text: "Cooling down", color: SP.C.magenta }];
  }
  item.hubLines = [[
    { symbol: "&success;", text: sp.success },
    { symbol: "&mana;", text: sp.mana },
    { symbol: "&cool;", text: sp.cool, color: sp.state === "cooling" ? SP.C.magenta : null },
    { symbol: "&casts;", text: sp.casts }
  ]];
  return item;
};

/* The Spells radial's definition defaults (CreateGamepadSpellRadialDefinition) */
SP.TABS = [["Favorites", "status-quick-spell.png"], ["Known Spells", "spells.png"]];

/* An example Wizard's spells. Names, schools, levels, mana costs and descriptions follow the game's spell
   definitions; success chances and castings left are example values for one character. */
SP.SPELLS = {
  forcebolt: { name: "Force bolt", tile: "force-bolt", symbol: "&sparc;", level: "Level 1 Arcane Spell",
    desc: "Shoots a bolt of force", success: "100%", mana: "6.0", cool: "0", casts: "12" },
  magicmissile: { name: "Magic missile", tile: "magic-missile", symbol: "&sparc;", level: "Major Arcane Cantrip",
    desc: "Shoots a ray of magic missiles", success: "100%", mana: "4.0", cool: "0", casts: "9" },
  firebolt: { name: "Fire bolt", tile: "fire-bolt", symbol: "&sparc;", level: "Level 2 Arcane Spell",
    desc: "Shoots a bolt of fire", success: "96%", mana: "8.0", cool: "0", casts: "63" },
  fireball: { name: "Fireball", tile: "fireball", symbol: "&sparc;", level: "Level 3 Arcane Spell",
    desc: "Shoots an exploding fireball", success: "84%", mana: "10.0", cool: "0", casts: "42" },
  sleep: { name: "Sleep", tile: "sleep", symbol: "&spenc;", level: "Level 4 Enchantment Spell",
    desc: "Shoots a sleep ray", success: "57%", mana: "30.0", cool: "0", casts: "10" },
  minorhealing: { name: "Minor healing", tile: "minor-healing", symbol: "&sphea;", level: "Minor Healing Cantrip",
    desc: "Heals a target for 2d6 hit points", success: "92%", mana: "3.0", cool: "1/2", casts: "21", state: "cooling" },
  identify: { name: "Identify", tile: "identify", symbol: "&spdiv;", level: "Level 3 Divination Spell",
    desc: "Identifies an item", success: "71%", mana: "24.0", cool: "0", casts: "4" }
};

/* The figure frame: a Steam Deck screen, 1280 x 800 device-independent pixels at dip 1.25 */
SP.FRAME = { css: [800, 500], W: 1600, H: 1000, dip: 1.25 };
