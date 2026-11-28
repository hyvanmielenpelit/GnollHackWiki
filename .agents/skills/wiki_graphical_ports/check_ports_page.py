#!/usr/bin/env python3
"""Check the Graphical NetHack Ports and Variants page against its own entries.

Usage:
    python check_ports_page.py [page]

The page defaults to "Graphical NetHack Ports and Variants.md" in the repository
root, three directories above this file. Each problem is printed on its own line,
and the exit code is 1 when there is any. The script checks the page's format and
internal consistency: the entries' first lines, the At a Glance table, and the
lists in "Which One to Pick?". It cannot check facts about the projects.

The icons are written as escapes so that this file stays ASCII.
"""

import re
import sys
from pathlib import Path

VS16 = "\ufe0f"
MIDDLE_DOT = " \u00b7 "

STAR = "\u2b50"
BOLT = "\u26a1"
CURRENT = "\u2705"
OLDER = "\U0001f570"
WEB = "\U0001f30d"
DESKTOP = "\U0001f5a5"
MUSIC = "\U0001f3b5"
MUTED = "\U0001f507"
MAC = "\U0001f4f1"
KEYPAD = "\u2328"
WARNING = "\u26a0"
GREEN = "\U0001f7e2"
YELLOW = "\U0001f7e1"
EXPERIMENT = "\U0001f9ea"
STORE = "\U0001f3ea"
DOWNLOAD = "\U0001f4be"

NEEDS_VS16 = (OLDER, DESKTOP, KEYPAD, WARNING)
ITEM_ICONS = (STAR, BOLT, CURRENT, OLDER, WEB, DESKTOP, MUSIC, MAC, KEYPAD, WARNING)
MARK_ORDER = (MAC, KEYPAD, DESKTOP, WARNING)
STATUS_NAMES = {
    GREEN: "**In active development**",
    YELLOW: "Maintained",
    EXPERIMENT: "**Experiment**",
}
STATUS_GROUP = {GREEN: 1, YELLOW: 1, EXPERIMENT: 2}

ENTRY_SECTIONS = {
    "Online Stores": "store",
    "Install on Your Device": "install",
    "Play in a Web Browser": "web",
}

# Lists named for a device hold the installable entries whose link list names
# one of these platforms.
DEVICE_LISTS = {
    "iPhone or iPad": r"\b(iPhone|iPad)\b",
    "Android phone or tablet": r"\bAndroid\b",
    "Mac (Apple silicon)": r"\bmacOS\b|Apple silicon Mac",
    "Windows PC": r"\bWindows\b",
    "Linux PC": r"\bLinux\b",
    "Steam Deck": r"Steam Deck",
}
DESKTOP_WEB_LIST = "Desktop web browser"
MOBILE_WEB_LIST = "Mobile web browser"
TABLET_NOTE = "tablets held sideways, not phones"
MAC_LISTS = {"Mac (Apple silicon)"}
TOUCH_LISTS = {"iPhone or iPad", "Android phone or tablet", MOBILE_WEB_LIST}
CURRENT_LIST = re.compile(r"^Vanilla NetHack \d")
OLDER_LIST = "An older version of vanilla NetHack"
VARIANT_LIST = "A NetHack variant"

LINK = re.compile(r"\[\[([^|\]]+)\|#([^\]]+)\]\]")
ITEM = re.compile(r"^(\d+)\. \[\[([^|\]]+)\|#([^\]]+)\]\](.*)$")
CELL_SPLIT = re.compile(r"\|(?![^\[]*\]\])")
LINK_LINE = re.compile(r"^- \[[^\]]+\]\([^)]+\): (.+)$")
VALIDITY = re.compile(r"^\*\*Last web scan:\*\* [A-Z][a-z]+ \d{1,2}, \d{4}\.$")

problems = []


def problem(line_no, message):
    problems.append((line_no, message))


def slug(text):
    """Return the anchor Gollum gives a heading with this text."""
    return re.sub(r"[^0-9a-z]+", "-", text.lower()).strip("-")


def plain(text):
    return text.replace(VS16, "")


def show(icons):
    return " ".join(i + VS16 if i in NEEDS_VS16 else i for i in icons)


def section_name(title):
    return re.sub(r"^[^\w]+", "", title).strip()


class Entry:
    def __init__(self, name, section, line_no):
        self.name = name
        self.anchor = slug(name)
        self.section = section
        self.line_no = line_no
        self.first = None
        self.body = []
        self.star = False
        self.bolt = False
        self.status = None
        self.music = False
        self.marks = set()
        self.versions = set()
        self.platforms = []


def parse_entry(e):
    if e.first is None:
        problem(e.line_no, f"Entry '{e.name}' has no first line.")
        return
    line_no, first = e.first
    fields = first.split(MIDDLE_DOT)
    if len(fields) not in (3, 4):
        problem(line_no, f"Entry '{e.name}': the first line needs 3 or 4 fields separated by ' \u00b7 '.")
        return
    head = re.match(
        rf"^(?:({STAR}) )?(?:({BOLT}) )?({GREEN}|{YELLOW}|{EXPERIMENT}) (.+)$", plain(fields[0])
    )
    if not head:
        problem(line_no, f"Entry '{e.name}': the first field must be [\u2b50 ][\u26a1 ]status icon and status name.")
    else:
        e.star = bool(head.group(1))
        e.bolt = bool(head.group(2))
        e.status = head.group(3)
        if head.group(4) != STATUS_NAMES[e.status]:
            problem(line_no, f"Entry '{e.name}': status icon and name '{head.group(4)}' do not match.")
    audio = fields[2].strip()
    if audio not in (MUSIC, MUTED):
        problem(line_no, f"Entry '{e.name}': the third field must be the audio icon alone.")
    e.music = audio == MUSIC
    if len(fields) == 4:
        marks = plain(fields[3]).split()
        if any(m not in MARK_ORDER for m in marks):
            problem(line_no, f"Entry '{e.name}': the fourth field may hold only marks.")
        known = [m for m in marks if m in MARK_ORDER]
        if known != sorted(set(known), key=MARK_ORDER.index):
            problem(line_no, f"Entry '{e.name}': marks must be in the order \U0001f4f1 \u2328\ufe0f \U0001f5a5\ufe0f \u26a0\ufe0f, once each.")
        e.marks = set(known)
    body = plain("\n".join(e.body))
    e.versions = {v for v in (CURRENT, OLDER) if v in body}
    e.platforms = [m.group(1) for m in map(LINK_LINE.match, e.body) if m]
    if not e.platforms:
        problem(e.line_no, f"Entry '{e.name}' has no link list.")
    if DESKTOP in e.marks and e.section != "web":
        problem(line_no, f"Entry '{e.name}': only a browser entry can be marked \U0001f5a5\ufe0f.")
    if e.bolt and e.section != "store":
        problem(line_no, f"Entry '{e.name}': only an Online Stores entry can start with \u26a1.")


def split_row(line):
    cells = [c.strip() for c in CELL_SPLIT.split(line.strip())]
    return cells[1:-1]


def check_table(rows, entries):
    covered = {}
    names = []
    for line_no, line in rows:
        cells = split_row(line)
        if len(cells) != 7:
            problem(line_no, "At a Glance row must have 7 cells.")
            continue
        first, game, get_it, status, audio, _price, runs_on = cells
        m = LINK.match(first)
        if not m:
            problem(line_no, "At a Glance row must start with a link to an entry.")
            continue
        name, anchor = m.groups()
        names.append((line_no, name))
        e = entries.get(anchor)
        if e is None:
            problem(line_no, f"At a Glance row '{name}' links to a missing entry #{anchor}.")
            continue
        project = [e]
        web_link = re.search(rf"\[\[{WEB}\|#([^\]]+)\]\]", plain(get_it))
        if web_link:
            w = entries.get(web_link.group(1))
            if w is None or w.section != "web":
                problem(line_no, f"At a Glance row '{name}': \U0001f30d links to #{web_link.group(1)}, which is not a browser entry.")
            else:
                project.append(w)
        for p in project:
            if p.anchor in covered:
                problem(line_no, f"Entry '{p.name}' is in two At a Glance rows.")
            covered[p.anchor] = line_no
        rest = plain(first[m.end():])
        if (STAR in rest) != e.star:
            problem(line_no, f"At a Glance row '{name}': \u2b50 does not match the entry.")
        if (BOLT in rest) != any(p.bolt for p in project):
            problem(line_no, f"At a Glance row '{name}': \u26a1 does not match the entries.")
        sections = {p.section for p in project}
        g = plain(get_it)
        if (STORE in g) != ("store" in sections):
            problem(line_no, f"At a Glance row '{name}': \U0001f3ea does not match the entries.")
        if "install" in sections and DOWNLOAD not in g:
            problem(line_no, f"At a Glance row '{name}': an Install on Your Device entry needs \U0001f4be.")
        if (WEB in g) != ("web" in sections):
            problem(line_no, f"At a Glance row '{name}': \U0001f30d does not match the entries.")
        if WEB in g and e.section != "web" and not web_link:
            problem(line_no, f"At a Glance row '{name}': \U0001f30d must link to the browser entry.")
        if e.status and plain(status) != e.status:
            problem(line_no, f"At a Glance row '{name}': the Status cell does not match the entry.")
        if (plain(audio) == MUSIC) != e.music:
            problem(line_no, f"At a Glance row '{name}': the Audio cell does not match the entry.")
        versions = set().union(*(p.versions for p in project))
        gp = plain(game)
        for v in (CURRENT, OLDER):
            if (v in gp) != (v in versions):
                problem(line_no, f"At a Glance row '{name}': {v} in the Game cell does not match the entries' descriptions.")
        marks = set().union(*(p.marks for p in project))
        cell_marks = {k for k in MARK_ORDER if k in plain(runs_on)}
        if cell_marks != marks:
            problem(line_no, f"At a Glance row '{name}': the Runs On marks do not match the entries' marks.")
        if re.search(rf"{WARNING} ({KEYPAD}|{DESKTOP})", plain(runs_on)):
            problem(line_no, f"At a Glance row '{name}': in Runs On, \u26a0\ufe0f comes after \u2328\ufe0f or \U0001f5a5\ufe0f.")
        if MAC in plain(runs_on) and not re.search(rf"Apple silicon Mac {MAC}", plain(runs_on)):
            problem(line_no, f"At a Glance row '{name}': \U0001f4f1 goes only after 'Apple silicon Mac'.")
    for a, e in entries.items():
        if a not in covered:
            problem(e.line_no, f"Entry '{e.name}' has no At a Glance row.")
    sorted_names = sorted(names, key=lambda x: x[1].lower())
    if names != sorted_names:
        problem(names[0][0] if names else 0, "At a Glance rows are not in alphabetical order: "
                + ", ".join(n for _, n in sorted_names))


def expected_icons(e, title):
    icons = []
    if e.star:
        icons.append(STAR)
    if e.bolt:
        icons.append(BOLT)
    if CURRENT_LIST.match(title):
        icons.append(CURRENT)
    elif title == OLDER_LIST:
        icons.append(OLDER)
    elif title != VARIANT_LIST:
        icons += [v for v in (CURRENT, OLDER) if v in e.versions]
    if e.section == "web":
        icons.append(WEB)
        if DESKTOP in e.marks:
            icons.append(DESKTOP)
    if e.music:
        icons.append(MUSIC)
    if MAC in e.marks and title in MAC_LISTS:
        icons.append(MAC)
    if KEYPAD in e.marks and title in TOUCH_LISTS:
        icons.append(KEYPAD)
    if WARNING in e.marks:
        icons.append(WARNING)
    return icons


def order_key(e, name, title):
    status = 0 if e.star else STATUS_GROUP.get(e.status, 2)
    if WARNING in e.marks:
        group = 5
    elif KEYPAD in e.marks and title in TOUCH_LISTS:
        group = 4
    elif MAC in e.marks and title in MAC_LISTS:
        group = 3
    else:
        group = 0
    return (group, status, name.lower())


def check_list(title, items, entries):
    seen = set()
    numbered = []
    for expected_no, (line_no, line) in enumerate(items, 1):
        m = ITEM.match(line)
        number, name, anchor, tail = m.groups()
        if int(number) != expected_no:
            problem(line_no, f"[{title}] item '{name}' is numbered {number}, expected {expected_no}.")
        if anchor in seen:
            problem(line_no, f"[{title}] '{name}' is listed twice.")
        seen.add(anchor)
        e = entries.get(anchor)
        if e is None:
            problem(line_no, f"[{title}] '{name}' links to a missing entry #{anchor}.")
            continue
        tail = tail.strip()
        note = None
        if tail.startswith("("):
            close = tail.find(")")
            note = tail[1:close]
            tail = tail[close + 1:].strip()
        tokens = tail.split()
        for t in tokens:
            base = plain(t)
            if base not in ITEM_ICONS:
                problem(line_no, f"[{title}] '{name}': unexpected text '{t}' after the link.")
            elif base in NEEDS_VS16 and t != base + VS16:
                problem(line_no, f"[{title}] '{name}': {base} must be followed by U+FE0F.")
        actual = [plain(t) for t in tokens]
        expected = expected_icons(e, title)
        if actual != expected:
            problem(line_no, f"[{title}] '{name}' ends with '{show(actual)}', expected '{show(expected)}'.")
        if title == OLDER_LIST and not note:
            problem(line_no, f"[{title}] '{name}' needs the version in parentheses.")
        if title == MOBILE_WEB_LIST:
            tablets = any("tablets held sideways" in p for p in e.platforms)
            if tablets and note != TABLET_NOTE:
                problem(line_no, f"[{title}] '{name}' needs the note ({TABLET_NOTE}).")
        if title in DEVICE_LISTS and e.section == "web":
            problem(line_no, f"[{title}] '{name}' is a browser version; it belongs only in the web browser lists.")
        numbered.append((line_no, name, e))
    keys = [order_key(e, n, title) for _, n, e in numbered]
    if keys != sorted(keys):
        right = [n for _, n, _e in sorted(numbered, key=lambda x: order_key(x[2], x[1], title))]
        problem(numbered[0][0] if numbered else 0, f"[{title}] is out of order; expected: " + ", ".join(right))
    return {e.anchor for _, _, e in numbered}


def check_membership(title, line_no, listed, entries):
    if title in DEVICE_LISTS:
        pattern = re.compile(DEVICE_LISTS[title])
        want = {a for a, e in entries.items()
                if e.section != "web" and any(pattern.search(p) for p in e.platforms)}
    elif title == DESKTOP_WEB_LIST:
        want = {a for a, e in entries.items() if e.section == "web"}
    elif title == MOBILE_WEB_LIST:
        want = {a for a, e in entries.items() if e.section == "web"
                and any("mobile web browsers" in p or "tablets held sideways" in p for p in e.platforms)}
    else:
        return
    for a in sorted(want - listed):
        problem(line_no, f"[{title}] is missing '{entries[a].name}', whose links name that platform.")
    for a in sorted(listed - want):
        problem(line_no, f"[{title}] lists '{entries[a].name}', whose links do not name that platform.")


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if len(sys.argv) > 1:
        path = Path(sys.argv[1])
    else:
        path = Path(__file__).resolve().parents[3] / "Graphical NetHack Ports and Variants.md"
    raw = path.read_bytes()
    if raw.startswith(b"\xef\xbb\xbf"):
        problem(1, "The file starts with a UTF-8 BOM.")
    if raw.count(b"\r\n") != raw.count(b"\n") or raw.count(b"\r") != raw.count(b"\n"):
        problem(0, "The file mixes line endings; it must be CRLF only.")
    if not raw.endswith(b"\r\n"):
        problem(0, "The file must end with CRLF.")
    text = raw.decode("utf-8").lstrip("\ufeff").replace("\r\n", "\n")
    lines = text.split("\n")

    for i, ch in enumerate(text):
        if ch in NEEDS_VS16 and text[i + 1:i + 2] != VS16:
            problem(text.count("\n", 0, i) + 1, f"{ch} must be followed by U+FE0F.")

    anchors = set()
    entries = {}
    section_entries = {}
    rows = []
    lists = []
    section = None
    entry = None
    list_title = None
    validity = False

    for n, line in enumerate(lines, 1):
        heading = re.match(r"^(#{2,6}) (.+)$", line)
        if heading:
            level, title = len(heading.group(1)), heading.group(2).strip()
            anchors.add(slug(title))
            entry = None
            list_title = None
            if level == 2:
                section = section_name(title)
            elif level == 3 and section in ENTRY_SECTIONS:
                entry = Entry(title, ENTRY_SECTIONS[section], n)
                if entry.anchor in entries:
                    problem(n, f"Two entries have the anchor #{entry.anchor}.")
                entries[entry.anchor] = entry
                section_entries.setdefault(section, []).append(entry)
            continue
        if entry is not None:
            if entry.first is None:
                if line.strip():
                    entry.first = (n, line)
            else:
                entry.body.append(line)
        if section == "At a Glance" and line.startswith("| [["):
            rows.append((n, line))
        if section == "Which One to Pick?":
            t = re.match(r"^\*\*(.+)\*\*$", line)
            if t:
                list_title = t.group(1)
                lists.append((n, list_title, []))
            elif ITEM.match(line):
                if list_title is None:
                    problem(n, "List item outside a list.")
                else:
                    lists[-1][2].append((n, line))
        if VALIDITY.match(line):
            validity = True

    for e in entries.values():
        parse_entry(e)
    for sec, es in section_entries.items():
        names = [e.name for e in es]
        if names != sorted(names, key=str.lower):
            problem(es[0].line_no, f"Entries in {sec} are not in alphabetical order: "
                    + ", ".join(sorted(names, key=str.lower)))

    check_table(rows, entries)

    titles = {t for _, t, _ in lists}
    required = set(DEVICE_LISTS) | {DESKTOP_WEB_LIST, MOBILE_WEB_LIST, OLDER_LIST, VARIANT_LIST}
    for t in sorted(required - titles):
        problem(0, f"List '{t}' was not found; update DEVICE_LISTS or the list names in this script.")
    if not any(CURRENT_LIST.match(t) for t in titles):
        problem(0, "The list for the current vanilla version was not found.")
    for line_no, title, items in lists:
        if not items:
            problem(line_no, f"[{title}] has no items.")
            continue
        listed = check_list(title, items, entries)
        check_membership(title, line_no, listed, entries)

    for n, line in enumerate(lines, 1):
        for m in LINK.finditer(line):
            if m.group(2) not in anchors:
                problem(n, f"Link to #{m.group(2)} has no matching heading.")

    if not validity:
        problem(0, "The '**Last web scan:** Month D, YYYY.' line is missing.")

    for line_no, message in sorted(problems):
        print(f"{path.name}:{line_no}: {message}")
    item_count = sum(len(i) for _, _, i in lists)
    print(f"Checked {len(entries)} entries, {len(rows)} table rows, {len(lists)} lists, "
          f"{item_count} list items: {len(problems)} problems.")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
