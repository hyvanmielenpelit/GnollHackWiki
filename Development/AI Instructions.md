> 👉 **This page contains a list of instructions for AI agents that assist with the development and release of GnollHack.**

Each instruction page tells an AI agent, step by step, how to carry out one recurring task. To start a task, copy its prompt from [[Copiable Prompts|#copiable-prompts]], fill in the bracketed parts, and paste it to your AI agent. The agent needs access to the GnollHackWiki repository, and for some tasks also to the GnollHack repository.

## 📋 Available Instructions

| Task | Instructions | What the Agent Produces |
|------|--------------|-------------------------|
| **Steam patch notes** | [[/Development/AI/Steam Patch Notes]] | A title and a BBCode list of changes for a Steam patch notes post, based on a GitHub release |
| **Steam events and announcements** | [[/Development/AI/Steam Events and Announcements]] | The event type, title, subtitle, summary, and BBCode body for a Steam event, and its 800×450 cover image and 1920×622 header image |

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

## 🛠️ Adding New Instructions

- Put each instruction page under `Development/AI/`.
- Write the instruction sections for the AI agent without emojis.
- Put the page's copiable prompt on this page, not on the instruction page, and add the page to [[Available Instructions|#available-instructions]].
- Start the instruction page with a line that points to its prompt on this page.

## 📖 See Also

- [[/Development Information]]
- [[/Creating Wiki Pages with AI Agents]]
