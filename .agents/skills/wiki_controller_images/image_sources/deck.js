/* An original, simplified drawing of the Steam Deck, and the callouts that label it.
   The drawing works in local units: the body is 1000 units wide (298 mm), so 1 unit is about 0.3 mm.
   Proportions follow Valve's published tech-specs drawing, used as a reference only. */

"use strict";

const DECK = {};

DECK.W = 1000;
DECK.H = 392;
DECK.DEPTH = 164;

/* Control positions in local units, front view */
DECK.C = {
  dpad: { x: 70, y: 90, arm: 28, half: 9.5 },
  view: { x: 120, y: 35, w: 26, h: 12 },
  lstick: { x: 168, y: 96, well: 42, cap: 31 },
  ltrackpad: { x: 96, y: 153, s: 102 },
  steam: { x: 172, y: 284, w: 46, h: 17 },
  menu: { x: 880, y: 35, w: 26, h: 12 },
  rstick: { x: 832, y: 96, well: 42, cap: 31 },
  abxy: { x: 930, y: 90, d: 22, r: 10.5 },
  rtrackpad: { x: 802, y: 153, s: 102 },
  qam: { x: 828, y: 284, w: 46, h: 17 }
};

DECK.COLORS = {
  bodyTop: "#3d3d41",
  bodyBottom: "#29292c",
  outline: "rgba(255,255,255,0.13)",
  grip: "#222225",
  gripBottom: "#1b1b1d",
  seam: "rgba(0,0,0,0.55)",
  seamLight: "rgba(255,255,255,0.06)",
  bezel: "#0c0c0e",
  control: "#2c2c30",
  controlEdge: "rgba(255,255,255,0.10)",
  well: "#151517",
  legend: "#8e897f",
  label: "#ede7db",
  muted: "#c8beaa",
  gold: "#f3ce72",
  leader: "rgba(243,206,114,0.75)"
};

DECK.bodyPath = function () {
  return "M80 0L920 0C965 0 995 25 998 70C1003 140 1000 230 985 290C965 365 905 392 830 392" +
    "L170 392C95 392 35 365 15 290C0 230 -3 140 2 70C5 25 35 0 80 0Z";
};

/* The lower-outer grip panels, clipped to the body */
DECK.gripPath = function (right) {
  const d = "M-10 150L42 150C60 150 70 160 76 178L142 375C146 386 152 392 162 392L0 420L-10 420Z";
  return right ? `<g transform="translate(1000 0) scale(-1 1)"><path d="${d}"/></g>` : `<path d="${d}"/>`;
};

DECK.defs = function (id) {
  return `<linearGradient id="${id}-body" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${DECK.COLORS.bodyTop}"/><stop offset="1" stop-color="${DECK.COLORS.bodyBottom}"/></linearGradient>` +
    `<linearGradient id="${id}-grip" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${DECK.COLORS.grip}"/><stop offset="1" stop-color="${DECK.COLORS.gripBottom}"/></linearGradient>` +
    `<linearGradient id="${id}-screen" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#1c2028"/><stop offset="0.55" stop-color="#14171c"/><stop offset="1" stop-color="#0f1114"/></linearGradient>` +
    `<linearGradient id="${id}-sheen" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#fff" stop-opacity="0.07"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.015"/>` +
    `<stop offset="0.46" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<radialGradient id="${id}-cap" cx="0.42" cy="0.38" r="0.7">` +
    `<stop offset="0" stop-color="#47474c"/><stop offset="1" stop-color="#2a2a2d"/></radialGradient>` +
    `<radialGradient id="${id}-dish" cx="0.5" cy="0.6" r="0.6">` +
    `<stop offset="0" stop-color="#36363a"/><stop offset="1" stop-color="#242427"/></radialGradient>` +
    `<linearGradient id="${id}-pad" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="#2a2a2e"/><stop offset="1" stop-color="#303034"/></linearGradient>` +
    `<filter id="${id}-inset" x="-20%" y="-20%" width="140%" height="140%">` +
    `<feComponentTransfer in="SourceAlpha"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>` +
    `<feGaussianBlur stdDeviation="3"/><feOffset dx="0" dy="2.5" result="shadow"/>` +
    `<feFlood flood-color="#000" flood-opacity="0.7"/><feComposite in2="shadow" operator="in"/>` +
    `<feComposite in2="SourceAlpha" operator="in" result="inner"/>` +
    `<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="inner"/></feMerge></filter>` +
    `<filter id="${id}-drop" x="-10%" y="-10%" width="120%" height="130%">` +
    `<feGaussianBlur in="SourceAlpha" stdDeviation="6"/><feOffset dy="5"/>` +
    `<feComponentTransfer><feFuncA type="linear" slope="0.55"/></feComponentTransfer>` +
    `<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>` +
    `<clipPath id="${id}-clip"><path d="${DECK.bodyPath()}"/></clipPath>`;
};

/* Opacity for a control: dimmed controls fade */
DECK.op = function (opts, name) {
  return opts.dim && opts.dim.indexOf(name) >= 0 ? ` opacity="0.32"` : "";
};

/* Shoulder buttons seen from the front, peeking over the top edge; drawn before the body */
DECK.shoulders = function (opts, k) {
  const C = DECK.COLORS;
  const sw = 2 / k;
  const one = (side) => {
    const m = side === "r" ? `transform="translate(1000 0) scale(-1 1)"` : "";
    const trig = side + "2", bump = side + "1";
    const hiT = opts.gold && opts.gold.indexOf(trig) >= 0, hiB = opts.gold && opts.gold.indexOf(bump) >= 0;
    return `<g ${m}>` +
      `<g${DECK.op(opts, trig)}><rect x="84" y="-30" width="128" height="44" rx="13" fill="${hiT ? "#5a4614" : "#232326"}"` +
      ` stroke="${hiT ? C.gold : C.outline}" stroke-width="${sw}"/></g>` +
      `<g${DECK.op(opts, bump)}><rect x="38" y="-14" width="214" height="28" rx="11" fill="${hiB ? "#6b5418" : "#323236"}"` +
      ` stroke="${hiB ? C.gold : C.outline}" stroke-width="${sw}"/></g></g>`;
  };
  return one("l") + one("r");
};

/* The front view: { id, x, y, width (device px), shoulders, dim: [names], gold: [names] }.
   Returns { svg, k, at(u, v) → [x, y] }. */
DECK.front = function (opts) {
  const k = opts.width / DECK.W;
  const C = DECK.COLORS, P = DECK.C;
  const id = opts.id;
  const sw = w => GH.n(w / k);
  const at = (u, v) => [opts.x + u * k, opts.y + v * k];
  let s = `<defs>${DECK.defs(id)}</defs><g transform="translate(${GH.n(opts.x)} ${GH.n(opts.y)}) scale(${GH.n(k)})">`;
  if (opts.shoulders)
    s += DECK.shoulders(opts, k);

  /* Body, grips, bezel and screen */
  s += `<path d="${DECK.bodyPath()}" fill="url(#${id}-body)" stroke="${C.outline}" stroke-width="${sw(2)}" filter="url(#${id}-drop)"/>`;
  s += `<g clip-path="url(#${id}-clip)" fill="url(#${id}-grip)">${DECK.gripPath(false)}${DECK.gripPath(true)}</g>`;
  const seam = "M-10 150L42 150C60 150 70 160 76 178L142 375C146 386 152 392 162 392";
  s += `<g clip-path="url(#${id}-clip)" fill="none">` +
    `<path d="${seam}" stroke="${C.seam}" stroke-width="${sw(2.5)}"/><path d="${seam}" transform="translate(0 1.6)" stroke="${C.seamLight}" stroke-width="${sw(1.5)}"/>` +
    `<g transform="translate(1000 0) scale(-1 1)"><path d="${seam}" stroke="${C.seam}" stroke-width="${sw(2.5)}"/>` +
    `<path d="${seam}" transform="translate(0 1.6)" stroke="${C.seamLight}" stroke-width="${sw(1.5)}"/></g></g>`;
  s += `<path d="${DECK.bodyPath()}" fill="none" stroke="${C.outline}" stroke-width="${sw(2)}"/>`;
  s += `<path d="M60 3.5L940 3.5" stroke="rgba(255,255,255,0.10)" stroke-width="${sw(2)}" stroke-linecap="round"/>`;
  s += `<rect x="225" y="40" width="550" height="334" rx="12" fill="${C.bezel}" stroke="rgba(255,255,255,0.05)" stroke-width="${sw(1.5)}"/>`;
  s += `<rect x="247" y="56" width="506" height="302" rx="3" fill="url(#${id}-screen)" filter="url(#${id}-inset)"/>`;
  s += `<rect x="247" y="56" width="506" height="302" rx="3" fill="url(#${id}-sheen)"/>`;
  s += `<circle cx="292" cy="20" r="2.2" fill="#18181a"/><circle cx="708" cy="20" r="2.2" fill="#18181a"/>`;

  /* D-pad */
  {
    const d = P.dpad, a = d.arm, h = d.half;
    const plus = `M${d.x - h} ${d.y - a}h${2 * h}v${a - h}h${a - h}v${2 * h}h${-(a - h)}v${a - h}h${-2 * h}v${-(a - h)}h${-(a - h)}v${-2 * h}h${a - h}Z`;
    s += `<g${DECK.op(opts, "dpad")}><path d="${plus}" fill="${C.control}" stroke="${C.controlEdge}" stroke-width="${sw(1.5)}" stroke-linejoin="round"/>` +
      `<circle cx="${d.x}" cy="${d.y}" r="4.5" fill="#232326"/>` +
      `<path d="M${d.x} ${d.y - a + 5}l-3.5 5h7Z M${d.x} ${d.y + a - 5}l-3.5 -5h7Z M${d.x - a + 5} ${d.y}l5 -3.5v7Z M${d.x + a - 5} ${d.y}l-5 -3.5v7Z" fill="${C.legend}" opacity="0.5"/></g>`;
  }

  /* Small buttons: View, Menu, Steam, Quick Access */
  const pill = (p, name, inner) => `<g${DECK.op(opts, name)}><rect x="${p.x - p.w / 2}" y="${p.y - p.h / 2}" width="${p.w}" height="${p.h}" rx="${p.h / 2}"` +
    ` fill="${C.control}" stroke="${C.controlEdge}" stroke-width="${sw(1.5)}"/>${inner || ""}</g>`;
  s += pill(P.view, "view", `<rect x="${P.view.x - 4}" y="${P.view.y - 3.5}" width="5" height="5" fill="none" stroke="${C.legend}" stroke-width="1"/>` +
    `<rect x="${P.view.x - 1}" y="${P.view.y - 1}" width="5" height="5" fill="${C.control}" stroke="${C.legend}" stroke-width="1"/>`);
  s += pill(P.menu, "menu", `<path d="M${P.menu.x - 4} ${P.menu.y - 2.5}h8M${P.menu.x - 4} ${P.menu.y}h8M${P.menu.x - 4} ${P.menu.y + 2.5}h8" stroke="${C.legend}" stroke-width="1"/>`);
  s += pill(P.steam, "steam");
  s += pill(P.qam, "qam", `<circle cx="${P.qam.x - 7}" cy="${P.qam.y}" r="1.6" fill="${C.legend}"/><circle cx="${P.qam.x}" cy="${P.qam.y}" r="1.6" fill="${C.legend}"/>` +
    `<circle cx="${P.qam.x + 7}" cy="${P.qam.y}" r="1.6" fill="${C.legend}"/>`);

  /* Speaker grilles under Steam and Quick Access */
  for (const cx of [P.steam.x, P.qam.x]) {
    let g = "";
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 4; col++)
        g += `<rect x="${cx - 22 + col * 11.5}" y="${306 + row * 8}" width="9" height="3.5" rx="1.75" fill="#1a1a1c"/>`;
    s += g;
  }

  /* Sticks */
  const stick = (p, name) => `<g${DECK.op(opts, name)}>` +
    `<circle cx="${p.x}" cy="${p.y}" r="${p.well}" fill="${C.well}" filter="url(#${id}-inset)"/>` +
    `<circle cx="${p.x}" cy="${p.y}" r="${p.well}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="${sw(1.5)}"/>` +
    `<circle cx="${p.x}" cy="${p.y + 2}" r="${p.cap}" fill="#000" opacity="0.45"/>` +
    `<circle cx="${p.x}" cy="${p.y}" r="${p.cap}" fill="url(#${id}-cap)" stroke="rgba(255,255,255,0.12)" stroke-width="${sw(1.5)}"/>` +
    `<circle cx="${p.x}" cy="${p.y}" r="${p.cap - 7}" fill="url(#${id}-dish)" stroke="rgba(0,0,0,0.45)" stroke-width="${sw(2)}"/>` +
    `<circle cx="${p.x}" cy="${p.y}" r="${p.cap - 5.5}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="${sw(1)}"/></g>`;
  s += stick(P.lstick, "lstick") + stick(P.rstick, "rstick");

  /* Trackpads */
  const pad = (p, name) => `<g${DECK.op(opts, name)}><rect x="${p.x}" y="${p.y}" width="${p.s}" height="${p.s}" rx="12" fill="url(#${id}-pad)" filter="url(#${id}-inset)"/>` +
    `<rect x="${p.x}" y="${p.y}" width="${p.s}" height="${p.s}" rx="12" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="${sw(1.5)}"/></g>`;
  s += pad(P.ltrackpad, "ltrackpad") + pad(P.rtrackpad, "rtrackpad");

  /* A, B, X and Y */
  {
    const p = P.abxy;
    const btn = (name, cx, cy, letter) => `<g${DECK.op(opts, name)}><circle cx="${cx}" cy="${cy + 1.5}" r="${p.r}" fill="#000" opacity="0.4"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${p.r}" fill="${C.control}" stroke="${C.controlEdge}" stroke-width="${sw(1.5)}"/>` +
      GH.text(letter, cx, cy + 3.9, GH.FONTS.latoBold, 11, C.legend, "middle") + `</g>`;
    s += btn("y", p.x, p.y - p.d, "Y") + btn("x", p.x - p.d, p.y, "X") + btn("b", p.x + p.d, p.y, "B") + btn("a", p.x, p.y + p.d, "A");
  }
  s += `</g>`;
  return { svg: s, k, at };
};

/* The top edge, seen from above with the back at the top: { id, x, y, width } */
DECK.top = function (opts) {
  const k = opts.width / DECK.W;
  const C = DECK.COLORS;
  const sw = w => GH.n(w / k);
  const at = (u, v) => [opts.x + u * k, opts.y + v * k];
  const D = DECK.DEPTH;
  let s = `<g transform="translate(${GH.n(opts.x)} ${GH.n(opts.y)}) scale(${GH.n(k)})">`;
  /* Stick tops poking out of the front face */
  for (const cx of [168, 832])
    s += `<rect x="${cx - 26}" y="${D - 6}" width="52" height="20" rx="6" fill="#2a2a2d" stroke="${C.outline}" stroke-width="${sw(1.5)}"/>`;
  s += `<path d="M40 0H960C990 0 1000 20 1000 50V${D - 40}C1000 ${D - 10} 985 ${D} 955 ${D}H45C15 ${D} 0 ${D - 10} 0 ${D - 40}V50C0 20 10 0 40 0Z"` +
    ` fill="url(#${opts.id}-body)" stroke="${C.outline}" stroke-width="${sw(2)}"/>`;
  /* Vents along the top edge */
  for (let i = 0; i < 9; i++)
    s += `<rect x="${388 + i * 26}" y="${D / 2 - 22}" width="12" height="44" rx="6" fill="#202023"/>`;
  const side = (right) => {
    const m = right ? `transform="translate(1000 0) scale(-1 1)"` : "";
    return `<g ${m}>` +
      `<path d="M18 22C40 8 120 6 168 14C190 18 196 30 196 44V66C196 74 190 78 182 78H30C20 78 14 72 14 62V40C14 32 14 26 18 22Z" fill="#232326" stroke="${C.outline}" stroke-width="${sw(1.5)}"/>` +
      `<path d="M14 96H214C224 96 230 102 230 112V138C230 148 224 154 214 154H40C24 154 14 146 12 132L10 112C10 102 6 96 14 96Z" fill="#323236" stroke="${C.outline}" stroke-width="${sw(1.5)}"/></g>`;
  };
  s += side(false) + side(true) + `</g>`;
  return { svg: s, k, at };
};

/* The back, seen from behind: the right-hand grip (R4, R5) is on the left of the drawing */
DECK.PADDLES = {
  r4: { x: 100, y: 168, w: 66, h: 64 },
  r5: { x: 100, y: 248, w: 66, h: 64 },
  l4: { x: 834, y: 168, w: 66, h: 64 },
  l5: { x: 834, y: 248, w: 66, h: 64 }
};

DECK.back = function (opts) {
  const k = opts.width / DECK.W;
  const C = DECK.COLORS;
  const sw = w => GH.n(w / k);
  const at = (u, v) => [opts.x + u * k, opts.y + v * k];
  const id = opts.id;
  let s = `<g transform="translate(${GH.n(opts.x)} ${GH.n(opts.y)}) scale(${GH.n(k)})">`;
  s += `<path d="${DECK.bodyPath()}" fill="url(#${id}-body)" stroke="${C.outline}" stroke-width="${sw(2)}" filter="url(#${id}-drop)"/>`;
  /* Grip lobes */
  const lobe = "M0 120C30 112 150 110 172 128C196 148 196 300 186 360C182 384 168 392 150 392L0 400Z";
  s += `<g clip-path="url(#${id}-clip)" fill="url(#${id}-grip)" stroke="${C.seam}" stroke-width="${sw(2.5)}"><path d="${lobe}"/>` +
    `<path d="${lobe}" transform="translate(1000 0) scale(-1 1)"/></g>`;
  /* Triggers at the top corners */
  const trig = "M22 30C40 10 90 4 150 6C178 8 190 22 186 40C182 58 168 66 150 66H60C36 66 18 58 16 46C15 40 17 35 22 30Z";
  s += `<path d="${trig}" fill="#232326" stroke="${C.outline}" stroke-width="${sw(1.5)}"/>` +
    `<path d="${trig}" transform="translate(1000 0) scale(-1 1)" fill="#232326" stroke="${C.outline}" stroke-width="${sw(1.5)}"/>`;
  /* Vents */
  for (let i = 0; i < 6; i++)
    s += `<rect x="${222 + i * 34}" y="216" width="24" height="84" rx="12" fill="#202023" stroke="rgba(255,255,255,0.05)" stroke-width="${sw(1)}"/>`;
  for (const name of ["r4", "r5", "l4", "l5"]) {
    const p = DECK.PADDLES[name];
    const hi = opts.gold && opts.gold.indexOf(name) >= 0;
    s += `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="9" fill="${hi ? "#5a4614" : "#38383c"}" stroke="${hi ? C.gold : "rgba(255,255,255,0.16)"}"` +
      ` stroke-width="${sw(1.5)}"/>`;
  }
  s += `<path d="${DECK.bodyPath()}" fill="none" stroke="${C.outline}" stroke-width="${sw(2)}"/></g>`;
  return { svg: s, k, at };
};

/* Callouts */

/* A leader from a label (x0, y0) to a target (tx, ty): horizontal first, then one 45° bend when
   the heights differ; ends in a dot */
DECK.leader = function (x0, y0, tx, ty, color) {
  const dy = ty - y0;
  const dir = tx > x0 ? 1 : -1;
  const bx = tx - dir * Math.abs(dy);
  const pts = Math.abs(dy) < 0.5 ? [[x0, y0], [tx, ty]] : [[x0, y0], [bx, y0], [tx, ty]];
  const d = pts.map((p, i) => (i ? "L" : "M") + GH.n(p[0]) + " " + GH.n(p[1])).join("");
  color = color || DECK.COLORS.leader;
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<circle cx="${GH.n(tx)}" cy="${GH.n(ty)}" r="6" fill="${color === DECK.COLORS.leader ? DECK.COLORS.gold : color}" stroke="#12100d" stroke-width="2.5"/>`;
};

/* A vertical leader (from y0 to the target) with an optional 45° bend at bendY toward tx */
DECK.leaderV = function (x0, y0, tx, ty, color) {
  const dx = tx - x0;
  const dir = ty > y0 ? 1 : -1;
  const by = ty - dir * Math.abs(dx);
  const pts = Math.abs(dx) < 0.5 ? [[x0, y0], [tx, ty]] : [[x0, y0], [x0, by], [tx, ty]];
  const d = pts.map((p, i) => (i ? "L" : "M") + GH.n(p[0]) + " " + GH.n(p[1])).join("");
  color = color || DECK.COLORS.leader;
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<circle cx="${GH.n(tx)}" cy="${GH.n(ty)}" r="6" fill="${DECK.COLORS.gold}" stroke="#12100d" stroke-width="2.5"/>`;
};

/* A label's text centered vertically on y */
DECK.label = function (text, x, y, anchor, color, size, font) {
  font = font || GH.FONTS.wiki;
  size = size || 31;
  return GH.text(text, x, y + font.cap * size / 2, font, size, color || DECK.COLORS.label, anchor);
};

/* A callout line: a badge and a text. side "left": text right-aligned to edge, badge after it;
   side "right": badge first from edge, then the text. Returns { svg, width }. */
DECK.calloutLine = function (buttons, text, edge, y, side, color, badgeHeight, size) {
  badgeHeight = badgeHeight || 38;
  size = size || 30;
  const gap = 10, textGap = 14;
  let widths = buttons.map(b => GH.measureBadge(b, badgeHeight));
  let bw = widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, widths.length - 1);
  let s = "";
  let x = side === "left" ? edge - bw : edge;
  buttons.forEach((b, i) => {
    s += GH.badge(b, x + widths[i] / 2, y, badgeHeight, false);
    x += widths[i] + gap;
  });
  const tw = GH.measure(text, GH.FONTS.wiki, size);
  if (side === "left")
    s += DECK.label(text, edge - bw - textGap, y, "end", color, size);
  else
    s += DECK.label(text, edge + bw + textGap, y, "start", color, size);
  return { svg: s, width: bw + textGap + tw };
};
