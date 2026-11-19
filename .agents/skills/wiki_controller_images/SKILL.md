---
name: wiki_controller_images
description: "Required before editing Steam Deck Controls.md or any image under uploads/Steam Deck Controls/: those images are rendered from HTML templates in this skill with headless Chrome and Pillow, never edited by hand. Covers rebuilding them, the -vN file naming that keeps caches fresh, and updating a template when the game's controls, defaults, hint strip, or radial menus change."
---

# Controller Images

The templates in `image_sources\` draw every image under `uploads/Steam Deck Controls/`: the
Steam Deck drawings, the map-control diagrams, the hint strip, the radial menus, and the button
badges. Each template is an HTML page with an inline SVG that headless Chrome renders at device
scale factor 2; Pillow crops the result and saves it as WebP. Never edit or replace one of those
images by hand.

## When to Use

Use this skill when one of these changes in the game or on `Steam Deck Controls.md`:

- The "Controls on the Map" table.
- The trigger defaults, the secondary trigger defaults, or the Quick radial defaults.
- The hint strip on the map.
- A radial menu.
- A button badge.

Update the matching template (see the Files table), rebuild only what changed, and look at each
PNG under `<output directory>\png\` before copying the WebP files.

## Rebuilding

Needs Google Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`, Python 3 with
Pillow, a clone of `hyvanmielenpelit/GnollHack` at `C:\hmp\GnollHack` (game fonts and icons),
and the wiki at `C:\hmp\GnollHackWiki` (wiki fonts). Run it from this skill's directory, with an
output directory outside every repository, such as the session scratch directory:

```powershell
python image_sources\build_images.py <output directory>
```

The WebP files land in `<output directory>\webp\`; copy them to
`C:\hmp\GnollHackWiki\uploads\Steam Deck Controls\`. Extra arguments limit the run to the
outputs whose file name contains one of them, for example
`python image_sources\build_images.py <output directory> radial-`. The build is deterministic:
a rebuild from unchanged sources gives byte-identical files on the same machine.

## File Names and Caching

Every file under `/uploads/` is cached under its name: for a day in browsers, and for a week at
the CDN. An upload replaced under the same name keeps showing the old image until the CDN is
purged by hand, so an image whose content changes gets a new name instead:

- It takes the next `-v<N>` suffix: `hint-strip.webp` becomes `hint-strip-v2.webp`, and
  `hint-strip-v2.webp` becomes `hint-strip-v3.webp`.
- Change the name in three places: the `FIGURES` entry or the glyph output name in
  `build_images.py`, every reference on the wiki pages, and the file under `uploads/`.
- Delete the old file once no page references it. Check the references with a search across
  every `.md` file in the wiki.
- The suffix only goes up. An image whose content did not change keeps its name.

## Files

| File | Draws | Follows in `C:\hmp\GnollHack` |
|------|-------|-------------------------------|
| `build_images.py` | Runs every template and writes the WebP files: glyphs and diagrams lossless, radial renders at quality 90 | |
| `common.css` | Font faces (wiki Lato and Cinzel, game Immortal, Lato and Underwood) and the wiki theme tokens | |
| `gh.js` | Badges, hint rows and radial menus, ported to SVG | `win\win32\xpl\GnollHackX\GnollHackX\Gamepad\GHGamepadHintRenderer.cs`, `Gamepad\GHGamepadGlyphs.cs`, `Radial\GHRadialMenuRenderer.cs`, `Radial\GHRadialGeometry.cs`, `Radial\GHRadialTuning.cs` |
| `deck.js` | The Steam Deck drawing (front, top edge, back) and the leader-line callouts | An original drawing; proportions checked against Valve's tech-specs page |
| `glyph.html` | One button badge, `?name=` from `GH.BUTTONS`; 41 glyphs | `GHGamepadHintRenderer.cs`, `GHGamepadGlyphs.cs` |
| `steam-deck-front.html` | `steam-deck-front.webp` | |
| `steam-deck-top-back.html` | `steam-deck-top-back.webp`, with the back grips' defaults | `GHApp.cs`, `DefaultGamepadGripCommand` |
| `map-controls.html` | `map-controls.webp`, `map-controls-l1-v2.webp`, `map-controls-r1-v2.webp` (`?layer=alone`, `l1`, `r1`) | The "Controls on the Map" table of `Steam Deck Controls.md`; `GHApp.cs`, `DefaultGamepadTriggerCommand` and `DefaultGamepadTriggerSecondaryCommand` |
| `hint-strip.html` | `hint-strip-v2.webp` | `Pages\Game\GamePage.Gamepad.cs`, `BuildGamepadHints` |
| `radial-actions.html` | `radial-actions.webp` | `GamePage.Gamepad.cs`, `BuildGamepadActionsRadial`; `GHApp.cs`, `InitializeMoreCommandButtons` (page count) |
| `radial-toggles.html` | `radial-toggles.webp` | `GamePage.Gamepad.cs`, `BuildGamepadTogglesRadial`; `Pages\Game\GamePage.Radial.cs`, `DrawRadialOrbIcon` |
| `radial-quick.html` | `radial-quick.webp` | `GamePage.Gamepad.cs`, `BuildGamepadQuickRadial`; `GHApp.cs`, `_defaultGamepadLTSlots`, `_defaultGamepadRTSlots`, `SelectableShortcutButtons` |
| `radial-direction.html` | `radial-direction.webp` | `GamePage.Gamepad.cs`, `BuildGamepadDirectionRadial` |

## Conventions

- Templates draw in device pixels: the SVG `viewBox` is twice the page's CSS size.
- Radial renders use the Steam Deck's proportions, an outer radius of 320 device-independent
  pixels (`GH.radialGeometry`), scaled to the image.
- Icons and orb art load from `Assets\UI\` of the game by `file:///` URL, so Chrome runs with
  `--allow-file-access-from-files` and a profile of its own under the output directory.
- The templates, like every file in this repository, are UTF-8 without a BOM, with CRLF line
  endings.

## Verification

- A rebuild of the images that were not changed must be byte-identical to the files in
  `uploads/`. A difference means the toolchain or the game's assets changed; find out which
  before copying anything.
- Known exception: `radial-actions.webp`, a lossy render, rebuilt on November 19, 2026 with a
  44-byte difference from the uploaded file (151 pixels, at most 29 of 255 per channel), with no
  change to its template or to the game icons it uses. The uploaded file was kept.
- No `.md` file references an image name that no longer exists under `uploads/`.
