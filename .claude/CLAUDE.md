@../.agents/AGENTS.md

## Claude Code

This repository keeps its AI configuration in the tool-neutral `.agents/` directory so that
agents other than Claude can be pointed at the same files. `.claude/` is only a thin adapter.

- **Project rules**: `.agents/AGENTS.md`, imported above. Edit the rules there, not here.
- **Skills**: full bodies live in `.agents/skills/<name>/SKILL.md`, each with a generated
  pointer stub in `.claude/skills/`. Canonical folders use underscores (`wiki_editing`); the
  invocable name is the hyphenated form (`wiki-editing`). Regenerate stubs with
  `SharedAgentSkills\tools\sync_stubs.ps1 -Repo <this repository>`; never hand-edit them.
- **The `wiki_` prefix**: skill names share one flat namespace across projects and user-level
  skills; the loser of a collision is silently never loaded.
- **Global skills** (`agent-implementation-planning`, `agent-subagent-guidelines`,
  `agent-powershell-guidelines`, `claude-plan-mode`, `claude-code-conventions`) are installed
  at the user level from `hyvanmielenpelit/SharedAgentSkills` via its `setup.ps1`.

## Shell and Line Endings (Windows)

Default to PowerShell; the rules are in the global `agent-powershell-guidelines` skill.
`.gitattributes` pins `* text=auto eol=crlf`: the index stores LF, every checkout is CRLF,
and `core.autocrlf` is `false`. Write **CRLF and UTF-8 without a BOM**, and end every file
with a newline. Git will not correct a wrong guess: a file written with LF stays LF on disk
and still shows no diff, because staging normalizes it away. The `Edit` tool preserves a
page's endings; the `Write` tool creates **LF** files. Before ending any session that
created or edited a page, run the closing step in `wiki_editing` section 18. Never run
`sed -i` from Git Bash on wiki pages; see `wiki_bulk_edits` §7.

## Implementation Plans

Non-trivial or multi-file changes need a written plan approved before any page is edited; the
lifecycle is in the global `agent-implementation-planning` skill. Plans go to
`<plans-root>/hyvanmielenpelit/GnollHackWiki/YYYY-MM-DD/task_name/`, not into this
repository. An agent never commits or pushes here; it prints the commands.
