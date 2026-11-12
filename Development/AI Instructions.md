> 👉 **AI agents that assist with the development and release of GnollHack follow written instructions for four recurring tasks: Steam patch notes, Steam events, the scan of graphical NetHack ports, and the analysis of website traffic.**

Each instruction page tells an AI agent, step by step, how to carry out one recurring task. To start a task, copy its prompt from [[Copiable Prompts|#copiable-prompts]], fill in the bracketed parts, and paste it to your AI agent. The agent needs access to the GnollHackWiki repository, and for some tasks also to the GnollHack repository.

## 📋 Available Instructions

| Instructions | What the Agent Produces |
|--------------|-------------------------|
| [[/Development/AI/Steam Patch Notes]] | A title and a BBCode list of changes for a Steam patch notes post, based on a GitHub release |
| [[/Development/AI/Steam Events and Announcements]] | The event type, title, subtitle, summary, and BBCode body for a Steam event, and its 800×450 cover image and 1920×622 header image |
| [[/Development/AI/Graphical NetHack Ports Scan]] | An updated [[/Graphical NetHack Ports and Variants]] page, with new projects added, statuses rechecked, and the last web scan date set, and a report of the changes and their sources |
| [[/Development/AI/Website Traffic Analysis]] | A report on the visitors of wiki.gnollhack.com, gnollhack.com, and account.gnollhack.com for a date range: data quality, automated traffic, audience, acquisition, behavior, the account registration funnel, and recommendations for marketing, content, and tracking |

## ⌨️ Copiable Prompts

### 🩹 Steam Patch Notes

Remember to change the GnollHack version in the following command prompt:

```text
Please generate Steam patch notes for GnollHack 3.8. Use the process detailed in "Development/AI/Steam Patch Notes.md" in the GnollHackWiki repository.
```

### 📢 Steam Events and Announcements

Replace `[TOPIC]` with what the event announces. Paste the source text, such as a Reddit post, in place of the second placeholder, or delete that sentence if there is none:

```text
Please create a Steam event for GnollHack about [TOPIC]. Use the process detailed in "Development/AI/Steam Events and Announcements.md" in the GnollHackWiki repository. Source text: [PASTE THE TEXT OR A LINK, OR DELETE THIS SENTENCE].
```

The agent asks you for the picture to use for the event images. You upload the finished images yourself in the Steam event editor.

### 🔍 Graphical NetHack Ports Scan

Run this in Claude Code in the Claude desktop app, with the GnollHackWiki repository as the working directory. The prompt needs no changes:

```text
Please run a web scan for new and updated graphical NetHack ports and variants, and update "Graphical NetHack Ports and Variants.md". Use the process detailed in "Development/AI/Graphical NetHack Ports Scan.md" in the GnollHackWiki repository.
```

The agent leaves the updated page uncommitted and reports every change with its source, so you can review it before committing.

### 📊 Website Traffic Analysis

Run this in Claude Code in the Claude desktop app, with the Google Analytics MCP server connected and the GnollHackWiki repository as the working directory. Replace the bracketed part with a date range, or delete it to analyze the last 30 complete days:

```text
Please analyze the website traffic of wiki.gnollhack.com, gnollhack.com, and account.gnollhack.com for [DATE RANGE, OR DELETE TO USE THE LAST 30 DAYS]. Use the process detailed in "Development/AI/Website Traffic Analysis.md" in the GnollHackWiki repository.
```

Remove a site from the prompt to analyze fewer sites. In Claude Code, the same task also runs with `/wiki-traffic-analysis`, optionally followed by a date range such as `last 90 days` or `2026-10-01 to 2026-10-31`. The agent reports in the chat and changes nothing.

## 🛠️ Adding New Instructions

- Put each instruction page under `Development/AI/`.
- Write the instruction sections for the AI agent without emojis.
- Put the page's copiable prompt on this page, not on the instruction page, and add the page to [[Available Instructions|#available-instructions]].
- Start the instruction page with a line that points to its prompt on this page.
