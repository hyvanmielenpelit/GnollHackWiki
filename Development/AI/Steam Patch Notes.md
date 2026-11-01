The copiable prompt for these instructions is on the [[/Development/AI Instructions]] page.

## Generating Patch Notes

Follow these instructions to generate patch notes for Steam:

1. Check GitHub using the GitHub CLI (`gh`) for the user-provided version. The GitHub version is usually in the format "GnollHack 4.3.0 Build 8". It can be a released version or an unreleased version tagged as a draft in GitHub.
2. GnollHack uses a dual versioning scheme. Steam releases are versioned as `X.Y` and GitHub releases as `GnollHack 4.X.0 Build Y`. For example, version `3.8` in Steam maps to `4.3.0 Build 8` in GitHub. Map the version appropriately based on this scheme.
3. Read the list of changes in the release or tag in GitHub. It usually starts with something like "Build 8 makes the following changes:".
4. GnollHack is available on Steam for Windows and Linux, and the Linux version also runs on Steam Deck. Keep the changes that apply to the Windows version, the Linux version, or both, including Linux and Steam Deck specific changes. Remove all changes that apply to neither (for example, iOS or Android specific changes).
5. Spell-check the patch notes and fix the grammar, if needed.
6. Output the patch notes as two separate text blocks for the user to copy and paste to Steam: (1) The title text block, and (2) the body text block.

## Text Block 1: Title Text

Format the title text for the Steam patch notes as follows:
`Patch Notes, Version X.Y`

## Text Block 2: Body Text

Format the filtered list of changes using Steam's BBCode formatting as follows. Ensure that each line in the changes list ends in a period (add one if it is missing):

```text
[h2]Changes[/h2]
[list]
[*] Change 1.
[*] Change 2.
[/list]
```
