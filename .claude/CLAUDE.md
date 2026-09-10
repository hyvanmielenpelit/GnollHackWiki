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
`.gitattributes` is `* text=auto` and `core.autocrlf` is `false`: the index stores LF, the
working tree is CRLF, and Git will not correct a wrong guess. Write CRLF and UTF-8 without a
BOM, and match what an existing file already uses. Never run `sed -i` from Git Bash on wiki
pages; see the `wiki_bulk_edits` skill.

## Implementation Plans

Non-trivial or multi-file changes need a written plan approved before any page is edited; the
lifecycle is in the global `agent-implementation-planning` skill. Plans go to
`<plans-root>/hyvanmielenpelit/GnollHackWiki/YYYY-MM-DD/task_name/`, not into this
repository. An agent never commits or pushes here; it prints the commands.
