> 👉 **This is the index of all AI-readable development skills for GnollHack.**

## 📖 AI Skills Directory

Below are the links to the AI-readable skill guides. These are designed to be read by AI agents to guide them through compiling, developing, and troubleshooting GnollHack:

- [[/AI/Build System Overview]]
- [[/AI/Build Windows Client]]
- [[/AI/Build Android Client]]
- [[/AI/Build iOS Client]]
- [[/AI/Build Linux Client]]
- [[/AI/Asset and Tileset Compilation]]
- [[/AI/Compile Custom SkiaSharp]]

## ⚙️ Antigravity 2.0 Integration

For standalone use with Antigravity 2.0, these skills should be installed in the Workspace Customizations Root (`.agents/`) of the GnollHack repository. 

Each skill must be placed in a subdirectory under `.agents/skills/` named after the skill, with the filename `SKILL.md`.

| Skill Name | Wiki Page | Target Repository Path |
|---|---|---|
| `build_system_overview` | [[/AI/Build System Overview]] | `.agents/skills/build_system_overview/SKILL.md` |
| `build_windows_client` | [[/AI/Build Windows Client]] | `.agents/skills/build_windows_client/SKILL.md` |
| `build_android_client` | [[/AI/Build Android Client]] | `.agents/skills/build_android_client/SKILL.md` |
| `build_ios_client` | [[/AI/Build iOS Client]] | `.agents/skills/build_ios_client/SKILL.md` |
| `build_linux_client` | [[/AI/Build Linux Client]] | `.agents/skills/build_linux_client/SKILL.md` |
| `asset_and_tileset_compilation` | [[/AI/Asset and Tileset Compilation]] | `.agents/skills/asset_and_tileset_compilation/SKILL.md` |
| `compile_custom_skiasharp` | [[/AI/Compile Custom SkiaSharp]] | `.agents/skills/compile_custom_skiasharp/SKILL.md` |

## 🤖 Automated Copy Prompt for Gemini 3.5 Flash

To automate the copying and synchronization of the AI skills from the `GnollHackWiki` repository to the `GnollHack` repository, you can run the following prompt in your Antigravity 2.0 standalone app:

> Please read `AI Skills.md` in the GnollHackWiki repository to find the mapping table of AI skills. For each skill listed in the table, copy the contents of its source wiki page under `GnollHackWiki/AI/` and write them to the corresponding target repository path in the GnollHack repository with the filename `SKILL.md`. Ensure that the target subdirectories (e.g., `.agents/skills/<skill_name>/`) are created if they do not exist. Only perform the writes/copies if there are changes or if the files do not exist yet. Please summarize your actions once completed.
