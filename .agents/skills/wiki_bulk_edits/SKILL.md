---
name: wiki_bulk_edits
description: How to make the same mechanical edit across many GnollHackWiki pages safely. Covers the fact that no page generator or template exists, the repeating header-line fields on spell, monster and item pages, verifying a target article on disk before linking it, the CRLF and UTF-8-without-BOM requirements, a PowerShell regex recipe that preserves both, the Git Bash sed -i hazard, and the verification and handoff steps. Read before editing more than a handful of pages in one pass.
---

# Bulk Edits Across Many Wiki Pages

This skill covers a cross-page mechanical edit: the same line, field or link added to or
changed on many pages in one pass. Single-page authoring conventions are in the
`wiki_editing` skill, which this skill does not restate.

## 1. There Is No Generator

Every page under `Spells/`, `Monsters/`, `Items/`, `Artifacts/` and the repository root is
hand-maintained Markdown. The only scripts in the repository are editor settings under `.vs/`
and `.vscode/`. There is no template, no data file and no code path that emits a page.

A cross-page change is therefore made in place, once per file. Never spend a step searching
for a generator or a template, and state "edited in place" in the report so the next reader
does not look either.

## 2. Repeating Header Lines

Category pages open with a bullet-list header of `- **Field:** value` lines. The fields vary
by category, and not every page carries every field.

- **Spell pages** (266 files on 2026-09-10) carry some subset of Attributes, Mana cost,
  Casting time, Cooldown, Targeting, Range, Duration, Saving throw, Save adjustment, Train
  chance, Base write cost, Write cost and Components. `Saving throw` is present on 27 of the
  266, and is **absent** rather than set to "None" on the rest.
- **Monster pages** open with a `## Level N ...` heading followed by a `Hit dice: M` line.

**Before writing a pattern, read three pages of the category and count the matches.** A
pattern derived from one page silently misses the variants, and a count that was not measured
cannot be verified afterwards.

## 3. Verify the Target Before Linking It

Two articles with similar names may both exist. `Saving Throws.md` and
`Resistances and Saving Throws.md` are both in the root; the second is an overview that links
to the first, and the first carries the formula.

Before naming a link target:

- Open both candidates and grep each for the fact being linked.
- Read the history of each to see which was split from which:

  ```powershell
  git log --format="%h %ad %s" --date=short -- "<file>"
  ```

Link the article that carries the fact. Report the near-duplicate in the handoff; do not
delete or merge anything.

## 4. Link Form

A root article linked from a page in a subdirectory takes a leading slash:
`[[/Saving Throws]]`. Every other link rule is in `wiki_editing` section 2 — follow it, and do
not restate it in a prompt or a report.

Spell pages contain no wikilinks today, so the first link added to one sets the precedent for
the category. Follow `wiki_editing` rather than inventing a form.

## 5. Encoding and Line Endings

- **UTF-8 without a BOM.**
- **CRLF in the working tree.**
- The index stores **LF**, because `.gitattributes` is `* text=auto`, and `core.autocrlf` is
  `false`, so Git will not correct a wrong guess: a file written with LF stays LF in the
  working tree and looks unchanged in `git diff`.
- A file whose last line has no terminator stays that way.

Match each file as it was found, and never mix the two styles inside one file.

## 6. The Recipe

Read and write the whole file as text through .NET, with an explicit BOM-less encoding, and
capture the line ending in the regex so it is written back unchanged. Put the script in the
session scratch directory, never in the repository.

The worked example is the run-34 edit, which added a link to the saving-throw article on every
spell page that carries a `Saving throw` field:

```powershell
$utf8 = New-Object System.Text.UTF8Encoding($false)
$pattern = '(?m)^(- \*\*Saving throw:\*\* (?!None)(?:(?!\[\[)[^\r\n])+?)(\r?)$'
$changed = 0
foreach ($f in Get-ChildItem -LiteralPath 'C:\hmp\GnollHackWiki\Spells' -Filter *.md) {
    $text = [System.IO.File]::ReadAllText($f.FullName, $utf8)
    $new  = [regex]::Replace($text, $pattern, {
        param($m)
        $m.Groups[1].Value + ' ' + [string][char]0x2014 + ' see [[/Saving Throws]]' + $m.Groups[2].Value
    })
    if ($new -ne $text) {
        [System.IO.File]::WriteAllText($f.FullName, $new, $utf8)
        $changed++
    }
}
"Files changed: $changed"
```

Points that make it safe, each of which a naive variant gets wrong:

- `(\r?)$` as the final group captures the carriage return when there is one and nothing when
  there is not, so `$2` restores the file's own line ending.
- `(?!None)` and `(?!\[\[)` make the pass idempotent: a value of "None" is skipped, and a line
  that already carries a wikilink is left alone, so re-running the script changes nothing.
- Non-ASCII characters are written as `[char]0xNNNN` — an em dash here — so the script file
  itself stays ASCII and cannot be corrupted by an encoding guess on the way to disk.
- The count of changed files is printed, so it can be compared with the count measured in
  step 2.

## 7. Never `sed -i` Under Git Bash

MSYS `sed` rewrites **every** file it processes with LF endings, including files the pattern
never matched. On this repository that silently converts the whole directory, and `git diff`
shows it as a whole-file rewrite.

If it happens on a clean tree, recover immediately:

```powershell
git checkout -- <directory>
```

Then re-apply with the PowerShell recipe above.

`grep` and `git diff` are safe to read with. `sed -n` output has its carriage returns
stripped, so a byte check uses `head -n N | tail -c 12 | xxd` or PowerShell, never `sed -n`.

## 8. Verification Block

Run all of these and paste the results into the report:

- `git diff --stat` — the number of files changed equals the count measured in step 2, and
  insertions equal deletions.
- No line outside the target field changed:

  ```bash
  git diff -U0 | grep '^[-+]' | grep -v '^[-+][-+]' | grep -vc '<field>'
  ```

  Expected: `0`.
- For each edited file, the CR-terminated line count equals the newline count, both before and
  after the edit.
- No file begins with the bytes `EF BB BF`.
- One edited line dumped as bytes ends `0D 0A`.

## 9. Handoff

**Never commit or push.** Leave the changes in the working tree and print, for the user to
run:

- `git add <paths>`
- `git commit -m "<message>"`, where the message follows the style already in the repository —
  one sentence naming the pages and the change. Read `git log --oneline -10` for the current
  style.
- `git push origin main`

State the exact line form that was written and the number of files changed, so the user can
check both without opening a page.

Evidence belongs here and nowhere else. Code locations, line numbers and benchmark finding
identifiers go in this report; a wiki page states the mechanic in the game's own vocabulary and
never cites the source — see `wiki_editing` sections 4 and 17.
