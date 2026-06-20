![google-antigravity](/uploads/Creating%20Wiki%20Pages%20with%20AI%20Agent/google-antigravity-256.webp)

You can leverage the **[Antigravity App](https://antigravity.google/product/antigravity-2)** powered by Gemini models to automatically research, draft, and format wiki pages. By providing the AI agent access to all related repositories, it can cross-reference code, graphics, and audio to create accurate and comprehensive documentation.

## Local Repository Setup

Ensure you have the following repositories cloned locally on your computer:
- [`GnollHackWiki`](https://github.com/hyvanmielenpelit/GnollHackWiki) (The wiki content file repository, for creating and editing pages)
- [`GnollHack`](https://github.com/hyvanmielenpelit/GnollHack) (For researching game mechanics, stats, and source code)
- [`GnollHackTileSet`](https://github.com/hyvanmielenpelit/GnollHackTileSet) (For finding sprite assets)
- [`GnollHackSoundSet`](https://github.com/hyvanmielenpelit/GnollHackSoundSet) (For referencing sound effects and voiceovers)

## Antigravity Workspace Configuration

1. Open the **[Antigravity App](https://antigravity.google/product/antigravity-2)**.
2. Ensure that your workspace is configured so the agent can access all four repository folders (`GnollHackWiki`, `GnollHack`, `GnollHackTileSet`, and `GnollHackSoundSet`). This allows the agent to read and search across the entire project ecosystem.
3. The agent will automatically discover the `.agents/skills/wiki_editing` skill, ensuring it follows the repository's strict formatting, linking, and image guidelines.

## Model Selection and Reasoning Levels

The Antigravity App allows you to select between different models and reasoning levels. You should choose the appropriate combination based on the complexity of the wiki page you are creating:

### Gemini 3.5 Flash

This is the default and recommended model for most tasks because of its speed and efficiency. It supports three distinct reasoning levels:

- **Low Reasoning**: 
  - *Recommendation*: Best for straightforward tasks such as formatting existing text, fixing typos, or creating simple pages where the information is already well-known or centralized in a single file.
  - *Technical Details*: Generates output with minimal internal chain-of-thought. It is the fastest option but may struggle with complex cross-referencing or multi-step logic.
- **Medium Reasoning**:
  - *Recommendation*: Ideal for standard tasks, moderate research, or synthesizing information from a couple of files.
  - *Technical Details*: Allocates a moderate compute budget for internal planning and verification. It balances speed and accuracy but might occasionally hallucinate on highly complex, undocumented code mechanics.
- **High Reasoning**: 
  - *Recommendation*: Recommended for complex tasks where the AI needs to piece together information from multiple sources. For example, documenting a new monster by reading its C source code in `GnollHack`, locating its corresponding image in `GnollHackTileSet`, check for sound events in `GnollHackSoundSet`, and synthesizing it all into a correctly formatted `GnollHackWiki` markdown page.
  - *Technical Details*: Utilizes a large compute budget for extensive chain-of-thought, self-correction, and exploring multiple paths before generating the final output. It is slower and consumes more tokens, so it should be reserved for demanding tasks.

#### Image Conversion with FFmpeg

The wiki requires all images to be in WebP format. Gemini 3.5 Flash can automatically convert image assets to WebP using terminal commands if **FFmpeg** is installed on your computer. 

If you do not have it installed, you can [download FFmpeg here](https://ffmpeg.org/download.html) and ensure it is added to your system's PATH.

### Gemini 3.1 Pro

Use **Gemini 3.1 Pro** in special cases where maximum reasoning capability is required over speed. 
- **Low Reasoning**: Can be used when Gemini 3.5 Flash struggles with nuanced formatting rules or when parsing extremely dense code files that require deeper comprehension without full multi-step reasoning.
- **High Reasoning**: Recommended for the most demanding, architectural-level tasks. Use this when the agent needs to completely refactor complex wiki structures, cross-reference and synthesize massive amounts of contradictory or undocumented C code logic, or when Gemini 3.5 Flash (High) repeatedly fails to synthesize the correct mechanics for very complicated game systems.

## Typical Workflow

1. **Prompt the Agent**: Ask the Antigravity App to create a specific page. For instance: *"Create a wiki page for the new monster 'Displacer Beast'. Research its stats in the GnollHack repo, find its image in the GnollHackTileSet repo, and place the correctly formatted page in the wiki repository."*
2. **Review the Plan**: If the task is complex, the agent will present an implementation plan. Review and approve it.
3. **Verify the Output**: Once the agent finishes, check the generated markdown file to ensure the layout, images, and wikilinks follow the editing conventions.
4. **Publish**: Commit and push your changes to GitHub.
