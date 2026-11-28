---
name: wiki_graphical_ports
description: "Required before editing Graphical NetHack Ports and Variants.md or its scan instructions, Development/AI/Graphical NetHack Ports Scan.md. Covers the page's sections, every icon and where it may appear, the entry first-line format, the At a Glance table, the Which One to Pick? lists (membership, group order, which icons each list shows, the device-only icons, the version lists, the web browser lists), servers and clients that host several games and the rule that only games shown with tiles count, keeping the page's own sign explanations and the scan page in step, and check_ports_page.py, which verifies the page against its own entries."
---

# Graphical NetHack Ports and Variants

`Graphical NetHack Ports and Variants.md` lists every NetHack port and variant that can be
played with graphics without compiling anything. Most of the page is derived data: the At a
Glance table and the "Which One to Pick?" lists restate, as icons, what the entries say. One
fact changed in an entry usually has to change in five or more places, and the icon rules
differ from list to list. This skill is the full set of rules; `check_ports_page.py` checks the
derived parts against the entries.

## When to Use

Read this skill in full before any edit to:

- `Graphical NetHack Ports and Variants.md`, however small, including a single icon.
- `Development/AI/Graphical NetHack Ports Scan.md`, the scan instructions, whose Step 5
  restates the format rules below in shorter form.

A full scan for new and updated projects follows the scan page; this skill governs how the
results are written onto the page.

## Files

| File | What It Holds |
| :-- | :-- |
| `Graphical NetHack Ports and Variants.md` | The page. |
| `Development/AI/Graphical NetHack Ports Scan.md` | The scan procedure: listing criteria, status rules, the save risk and mobile controls tests, where to search, and the report. Its Step 5 summarizes this skill. |
| `Development/AI Instructions.md` | The copiable prompt that starts a scan. |
| `.agents/skills/wiki_graphical_ports/check_ports_page.py` | The checker. |

The format exists in four places: this skill, the scan page's Step 5 (with examples quoted
from the page), the page's own "Order and Signs" and "Additional Signs" text, and the checker.
A change to a rule changes all four in the same session; see [Changing a Rule](#changing-a-rule).

## Page Structure

The sections, in order. Do not add, remove, rename, or reorder sections, lists, or list
headings without the user's request.

1. **Ingress.** One `> 👉 **...**` line.
2. **📖 About This List.** The listing criteria in short, how entries are ordered and placed,
   and the meaning of the Mac and browser platform names. Its first paragraph holds "has been
   updated since [Month Year]", two years before the last scan.
3. **🔣 Icons Used on This Page.** One table per At a Glance column that uses icons: Port or
   Variant, Game, Get It, Status, Audio, Runs On. This is where each icon is defined for
   readers.
4. **📋 At a Glance.** One row per project.
5. **🏪 Online Stores**, **💾 Install on Your Device**, **🌍 Play in a Web Browser.** The
   entries, one `###` heading each. The web section starts with the Safari warning callout,
   which names the browser versions that keep their games on a server.
6. **🎖️ Scoreboards and Tournaments.** Which projects' games the NetHack Scoreboard and
   Junethack count, and a paragraph on the others.
7. **🏆 Most Developed Interfaces.** An editorial judgment. Never add or remove a project
   without the user; suggest it instead.
8. **💡 Which One to Pick?** "Order and Signs", "Additional Signs", the paragraph after them,
   and the lists under By Device, By Game and Language, By Look and Sound, and Online Play.
9. **🔴 Unmaintained and Not Listed.** The closing table of projects that were checked and
   left out.
10. **📖 Learn More.**
11. **📅 Validity.** The `**Last web scan:** Month D, YYYY.` line. Change the date only when
    a full scan ran, never for an ordinary edit.

## What Gets Listed

An entry must run on the NetHack code base, show the game with graphics, be installable or
playable without compiling, have been updated within two years, and not be superseded. The
scan page's Listing Criteria and Status Rules are the full definitions; apply them, do not
restate them differently here or on the page.

### Servers and Clients That Host Several Games

A public server, its web terminal, or a client for it, such as the Hardfought and NAO web
terminals and the NetHack Tiles Client, plays many games but draws only some of them with
tiles. The graphics criterion applies to each game separately:

- **Count only the games it shows with tiles.** A version or variant it shows as text only
  gets no ✅ or 🕰️ icon, is left out of the At a Glance Game cell, and is left out of every
  "Which One to Pick?" list that is about that game.
- **Say so in the entry.** The entry names the games that have tiles and says that the others
  are shown as text only, naming the text-only versions without an icon.
- **Explain a gap in a list.** When a server hosts a game that a list is about but shows it
  as text only, add one sentence under that list saying so, as the older-version list does for
  the Hardfought web terminal.
- **Never infer tile support from hosting.** A server hosting a game says nothing about its
  tiles. Check the evidence each time:
  - Hardfought web terminal: the tileset menu at the top of `https://www.hardfought.org/hterm/`.
    Read the menu's options, not the page text; each option is one game.
  - NAO web terminal: the tile set choices of its web terminal.
  - NetHack Tiles Client: the tile sets its README lists. It paints tiles only for games it
    ships a tile sheet for, and only with `OPTIONS=vt_tiledata` and `OPTIONS=windowtype:tty`
    on the server.
  - Tile data in a terminal comes from NetHack's `vt_tiledata` escape codes, which NetHack
    3.4.3 does not have.
- **Confirm hosting, too.** To confirm that a server hosts a version at all, use the server's
  own pages, or the recent games on `https://nethackscoreboard.org/`, which show the server and
  the version of each game.

## Icons

Each icon has a fixed meaning and a fixed set of places. Never put an icon anywhere not
listed here.

| Icon | Meaning | Where It Goes |
| :-: | :-- | :-- |
| ⭐ | In "Most Developed Interfaces" | Entry first line (first token), At a Glance first cell, every list item. |
| ⚡ | Listed on Steam, Google Play, or the App Store; itch.io does not count | Store entry first line (after ⭐), At a Glance first cell, every list item. |
| ✅ | Plays the current vanilla release | After each current version in an entry description, the Game cell, list items (see below). |
| 🕰️ | Plays an older vanilla version | Same places as ✅. |
| 🏪 💾 🌍 | Store listing, download without a store, browser version | Get It cell. 🌍 also on list items that link to a browser entry. |
| 🟢 🟡 🧪 | In active development, Maintained, Experiment | Entry first line with the status name, Status cell. |
| 🔴 | Unmaintained | Closing table only. |
| 🎵 🔇 | Music and sound effects; anything less | Entry first line (third field), Audio cell. 🎵 also on list items. |
| 📱 | Runs on a Mac only as the iPhone and iPad app | Entry first line marks, Runs On after `Apple silicon Mac`, the Mac list only. |
| ⌨️ | Not a full mobile port: on-screen keypad or keyboard | Entry first line marks, Runs On after the platform, the phone, tablet, and mobile web browser lists only. |
| 🖥️ | Browser version with no touch controls | Browser entry first line marks, Runs On after the platform, every list item that links to that browser entry. |
| ⚠️ | Saved games can be lost | Entry first line marks, Runs On after the platform, every list item that links to that entry. |

- 🕰️, ⌨️, 🖥️, and ⚠️ are always written with the emoji variation selector, U+FE0F, as they
  appear on the page. Copy them from the page; the checker flags a bare one.
- The definitions readers see are in the Icons Used on This Page tables and in "Additional
  Signs". When the meaning of an icon changes, change both.
- The closing table and running text outside the entries' descriptions get no version icons.
- When the DevTeam publishes a new release: every older version moves to 🕰️ (entries, Game
  cells, list items), the Game table in Icons Used on This Page names the new version, the
  title of the current-version list (now "Vanilla NetHack 5.0") and "Additional Signs" name it,
  and the projects that do not play it move to the older-version list.

## Entries

```markdown
### iNethack2

⚡ 🟡 Maintained · Free · 🔇 · 📱 ⌨️

An iOS port of vanilla NetHack 3.6.7 🕰️ with several tile sets and an ASCII mode. ...

- [App Store](https://apps.apple.com/app/inethack2/id962114968): iPhone, iPad, Apple silicon Mac
```

- **Placement.** A project with a store listing goes in Online Stores, with its other
  downloads listed there too; otherwise in Install on Your Device. A browser version gets its
  own entry in Play in a Web Browser, so one project can have two entries. Entries are
  alphabetical within each section, case-insensitively.
- **First line.** `[⭐ ][⚡ ]<status icon> <status name> · <price> · <audio icon>[ · <marks>]`,
  with ` · ` (U+00B7) between fields:
  - The status names are `**In active development**`, `Maintained`, and `**Experiment**`,
    each with its own icon.
  - ⚡ appears only on Online Stores entries.
  - The marks are 📱, ⌨️, 🖥️, and ⚠️, in that order, each once, for this entry's own version
    only: an installable entry does not get the ⚠️ of its browser version. 🖥️ is only for
    browser entries.
- **Description.** One or two sentences on what the project is, which version or variant it
  plays, and what is special about its graphics. Each vanilla version it shows with graphics is
  followed by its icon, such as "vanilla NetHack 5.0 ✅, NetHack 3.6.7 🕰️, and SLASH'EM". A
  browser entry also says how it is played on a phone, or that it needs a keyboard, and where
  its saves are kept and how to export them. A risk other than browser saves gets a
  `> ⚠️ **Warning:**` callout after the description.
- **Link list.** One line per place to get it: `- [Site](URL): Platforms`. Use the page's
  platform names exactly, because readers and the checker rely on them:
  - `macOS` is a native Mac app, with `(Apple silicon)` when it runs only there.
  - `Apple silicon Mac` is the iPhone and iPad app on a Mac.
  - `Desktop and mobile web browsers` means it can be played by touch on a phone.
  - `Desktop web browsers, tablets held sideways` means tablets but not phones.
  - `Desktop web browsers` means it needs a keyboard or mouse; such an entry is marked 🖥️.
- **No source code references, no invented facts.** Every statement comes from the project's
  own pages; see `wiki_editing`.

## At a Glance

```markdown
| Port or Variant | Game | Get It | Status | Audio | Price | Runs On |
| [[NetHack 3D|#nethack-3d]] ⭐ | Vanilla 5.0 ✅, 3.6.7 🕰️, SLASH'EM | 💾 [[🌍|#nethack-3d-web-version]] | 🟢 | 🔇 | Free | Windows, ..., desktop and mobile web browsers ⚠️ |
```

- **One row per project**, alphabetical by name, case-insensitively. A project with two
  entries has one row.
- **Port or Variant.** A link to the installable entry, or to the browser entry when there is
  no other, then ` ⭐` and ` ⚡` when the project has them.
- **Game.**
  - A vanilla port: `Vanilla` and every version it shows with graphics, each with its icon,
    such as `Vanilla 5.0 ✅, 3.6.7 🕰️` or `Vanilla 5.0 ✅ (Japanese)`.
  - A variant: `Variant`.
  - A port of another variant: the variant's name, without an icon, such as `SLASH'EM`.
  - A server or a client: the vanilla versions it shows with tiles, then `variants` when it
    shows any variant with tiles, such as `Vanilla 5.0 ✅, variants` or `Vanilla 5.0 ✅, 3.6 🕰️`.
- **Get It.** 🏪, 💾, 🌍, one for each way to get it. When the project has both an installable
  and a browser entry, the 🌍 links to the browser entry: `[[🌍|#name-web-version]]`.
- **Status** and **Audio.** The icon only, copied from the entry the row links to.
- **Runs On.** The platforms of all the project's entries. Each platform whose version is
  marked gets its mark after it: ⌨️ or 🖥️, then ⚠️ last, such as `Android ⌨️ ⚠️`. 📱 follows
  `Apple silicon Mac` only when the project has no native Mac app.

## Which One to Pick?

### List Membership

| List | Holds |
| :-- | :-- |
| iPhone or iPad, Android phone or tablet, Mac (Apple silicon), Windows PC, Linux PC, Steam Deck | Every installable entry whose link list names that platform. Never a browser entry. |
| Desktop web browser | Every browser entry, the Hardfought and NAO web terminals included. |
| Mobile web browser | Every browser entry whose platforms are `Desktop and mobile web browsers` or `Desktop web browsers, tablets held sideways`; the second kind adds the note `(tablets held sideways, not phones)`. |
| The current-version list (now "Vanilla NetHack 5.0") | Every project that shows the current vanilla version with graphics. |
| An older version of vanilla NetHack | Every project that shows an older vanilla version with graphics, with that version in parentheses, such as `(NetHack 3.6.7)`. |
| A NetHack variant | Every variant, and every port or server that shows a variant with graphics, with the variant in parentheses when the project is not the variant itself. |
| Japanese text | Every project with Japanese text. |
| Both music and sound effects | Every entry with 🎵. |
| Virtual reality or first-person 3D | Every project with such a view, with a note when only part of it qualifies. |
| Playing on a public server | The public servers and the clients for them. |
| Competing on the NetHack Scoreboard or in Junethack | The projects in the Scoreboards and Tournaments list. |

- A project appears at most once per list. In lists other than the two web browser lists, an
  item links to the project's installable entry when it has one; a project that exists only in
  the browser links to its browser entry.
- A note in parentheses is added only when the list needs it: a version in the older-version
  list, a variant name, `(web version)`, or `(tablets held sideways, not phones)`.

### Order

Within every list, items are ordered by group, and alphabetically by name, case-insensitively,
within each group:

1. Projects marked ⭐.
2. Other projects that are In active development or Maintained.
3. Experiments.
4. Items marked 📱, **only in the Mac list**, in the same group order.
5. Items marked ⌨️, **only in the phone, tablet, and mobile web browser lists**, in the same
   group order. An item with both 📱 and ⌨️ goes here.
6. Items marked ⚠️, in every list, in the same group order, including items that also have
   📱 or ⌨️.

In a list that does not show 📱 or ⌨️, an item is placed as if it did not have that mark. ⚡,
✅, 🕰️, 🌍, 🖥️, and 🎵 never change an item's place.

Example, the Android list: GnollHack and NetHack 3D (⭐), Amphitere (Experiment), DartHack (⌨️),
NetHack Android (⌨️ and ⚠️, so with the ⚠️ items).

### Icons on an Item

An item is `N. [[Name|#anchor]]`, then an optional note in parentheses, then its icons in this
order, each preceded by one space: ⭐ ⚡ ✅ 🕰️ 🌍 🖥️ 🎵 📱 ⌨️ ⚠️. Which of them it carries:

- ⭐ and ⚡ when the linked entry has them.
- ✅ and 🕰️:
  - In the current-version list, ✅ only. In the older-version list, 🕰️ only, for the version
    in parentheses. In the variant list, neither.
  - In every other list, the versions the entry's description marks: ✅, 🕰️, or both, such
    as `NetHack 3D ⭐ ✅ 🕰️`. A project that plays only variants, such as GnollHack, gets
    neither.
  - Only versions shown with graphics count, so the Hardfought web terminal gets ✅ alone.
- 🌍 when the item links to a browser entry, and 🖥️ after it when that entry is marked 🖥️, in
  every list.
- 🎵 when the linked entry has 🎵.
- 📱 only in the Mac list. ⌨️ only in the iPhone or iPad, Android phone or tablet, and Mobile
  web browser lists. These two matter only on those devices.
- ⚠️ when the linked entry is marked ⚠️, in every list.

Mark an item only for the version it links to. Examples from the page:

```markdown
2. [[iNethack2|#inethack2]] ⚡ 🕰️ ⌨️                                  (iPhone or iPad)
6. [[iNethack2|#inethack2]] ⚡ 🕰️ 📱                                  (Mac)
2. [[iNethack2|#inethack2]] (NetHack 3.6.7) ⚡ 🕰️                     (older version)
1. [[Hardfought web terminal|#hardfought-web-terminal]] ✅ 🌍 🖥️     (Desktop web browser)
4. [[neohack|#neohack]] ✅ 🌍 ⌨️ ⚠️                                   (Mobile web browser)
13. [[neohack|#neohack]] ✅ 🌍 ⚠️                                     (current version)
```

### The Page's Own Explanation

"Order and Signs", "Additional Signs", and the paragraph after them tell readers these rules:
the group order, what each sign means, which signs appear only in some lists, and that the
version lists show only their own version's sign. Whenever a rule changes, rewrite that text
to match; it must never describe a rule the lists no longer follow.

## Other Places That Name Projects

When a project is added, removed, renamed, or changes how its games are stored or counted,
update every one of these, not only the entry:

- The At a Glance row.
- Every "Which One to Pick?" list it fits, in its place in the order.
- The Scoreboards and Tournaments list and the paragraph under it.
- The Safari warning at the start of Play in a Web Browser, which names the browser versions
  that keep games on a server.
- The closing table, when the project leaves or returns, in the form of its existing rows.
- Any `[[Name|#anchor]]` link to the entry, when its heading changes.

## Changing a Rule

When the user changes how icons, order, or lists work:

1. Apply the rule to every list and table on the page, not only where the user pointed.
2. Rewrite the page's "Order and Signs" and "Additional Signs" text, and the Icons Used on This
   Page tables if a meaning changed.
3. Update this skill.
4. Update the scan page's Step 5, including its examples: each example quotes a real item with
   its current number, so renumber the examples when the lists change.
5. Update `check_ports_page.py` (`expected_icons`, `order_key`, `DEVICE_LISTS`, or the list
   names) so that it checks the new rule.
6. Run the checker, and confirm it still catches a deliberate mistake: copy the page to the
   session scratch directory, break one item, and run the checker on the copy.

## Verification

Run the checker from the repository root after every edit to the page:

```powershell
python -I .agents\skills\wiki_graphical_ports\check_ports_page.py
```

It prints one line per problem, with the line number, and a summary; it exits 1 when there is
any problem. It checks:

- Encoding: no BOM, CRLF only, a final CRLF, and U+FE0F after 🕰️, ⌨️, 🖥️, and ⚠️.
- Each entry's first line: fields, status icon and name, audio icon, marks and their order,
  🖥️ only on browser entries, ⚡ only on store entries, and a link list.
- Alphabetical order of the entries in each section and of the At a Glance rows.
- Each At a Glance row against its entries: ⭐, ⚡, 🏪, 💾, 🌍 and its link, Status, Audio, the
  ✅ and 🕰️ in the Game cell against the entries' descriptions, and the Runs On marks and their
  order.
- Every list item: its number, that it links to an existing entry, its icons against the
  rules above, the older-version note, the tablet note, and the order of the list.
- The membership of the device lists and the two web browser lists, from the entries' link
  lists.
- That every `[[...|#anchor]]` link on the page matches a heading, and that the Last web scan
  line exists.

It cannot check facts about the projects, whether a version really has tiles, membership of
the other lists, Most Developed Interfaces, grammar, or whether the page's explanation matches
the rules. After the checker passes:

1. Reread every section you changed, and the "Order and Signs" and "Additional Signs" text.
2. Check grammar and capitalization per `wiki_editing` section 6.
3. Run the `wiki_editing` section 18 closing step.

## Handoff

Never commit or push. Report the checker's summary line and the section 18 outputs, list what
changed and the evidence for every new fact (a URL), and print the `git` commands for the user.
