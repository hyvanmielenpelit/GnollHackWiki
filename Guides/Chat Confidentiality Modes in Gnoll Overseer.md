![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **Every Gnoll Overseer chat runs in one of three privacy modes: Standard, Confidential, or Incognito. The mode decides what the Overseer keeps about your chat and which tools it may use. It does not change the fact that your messages are sent to an AI provider to be answered.**

## 📖 Overview

Most questions about GnollHack are not sensitive, and **Standard** mode is fine for them. The other two modes exist for the times when you paste in something more personal, such as your own notes, logs, or documents.

| Mode | In One Sentence | Best For |
|---|---|---|
| 🔓 **Standard** | Saved like any other chat. | Everyday gameplay questions. |
| 🔒 **Confidential** | Saved, but encrypted where it is stored, with internet tools switched off. | Chats with personal content that you still want to come back to later. |
| 🕶️ **Incognito** | Never saved at all; kept in memory only and gone when it ends. | One-off chats that you do not want to keep. |

## 📊 The Modes Side by Side

| What Happens | 🔓 Standard | 🔒 Confidential | 🕶️ Incognito |
|---|---|---|---|
| **Appears in your chat list** | ✅ Yes | ✅ Yes, marked with a small lock | ❌ No |
| **How the chat is stored** | Saved in readable form | Saved in encrypted form | Not saved; held in server memory only |
| **Internet tools and web search** | ✅ Available | ❌ Off | ❌ Off |
| **Game data, both wikis, and dumplog search** | ✅ Available | ✅ Available | ✅ Available |
| **AI-made chat title** | ✅ Yes | ❌ No, the chat gets a plain title | ❌ No title at all |
| **AI provider's prompt caching** | On | Off | Off |
| **Found by chat search** | ✅ Yes | ❌ No | ❌ No |
| **Report a message** | ✅ Yes | ❌ No | ❌ No |
| **Error reports sent to the developers** | Sent | Suppressed | Suppressed |
| **Deleting the chat** | Goes to the Trash for 30 days | Destroyed at once, no Trash | Destroyed at once, no Trash |
| **Deleted automatically after** | 90 days without activity | 30 days without activity | 60 minutes without activity |
| **Messages are sent to the AI provider** | ✅ Yes | ✅ Yes | ✅ Yes |

> ℹ️ **Note:** The numbers above are the defaults. The Confidential values can be adjusted in the settings, and the exact Incognito time limit is shown on the Incognito badge.

## 🕹️ Choosing a Mode

You choose the mode **per chat, before you send the first message**:

1. Start a new chat.
2. In the row above the message box, select the privacy button. It shows the current mode, for example **Standard**.
3. In the **Privacy for this chat** dialog, pick **Standard**, **Confidential**, or **Incognito**, and select **Done**.
4. Send your first message. The mode is now set for this chat.

What you can change afterwards is limited on purpose:

| Change | Possible? | How |
|---|---|---|
| Standard → Confidential | ✅ Yes | Select **Make confidential** in the row above the message box. |
| Confidential → Standard | ❌ Never | A confidential chat cannot go back to normal. |
| Any saved chat → Incognito | ❌ Never | Incognito can only be chosen for a new chat. |
| Incognito → a saved chat | ❌ Never | Nothing in an incognito chat is ever written down. |

> 💡 **Tip:** If you prefer one mode most of the time, set it under **Settings → Confidentiality Mode → Default for New Chats**. It only preselects the mode for new chats. You can still change it before the first message, and it never touches chats that already exist.

Chats that the game opens for you with a snapshot of your current game start as Standard. Use **Make confidential** if you want to protect one.

## 🔓 Standard Mode

Standard is the normal mode. The chat is saved to your account, shows up in your chat list, can be searched, and can use every tool that you have allowed, including web search.

- A deleted chat goes to the Trash, where it can be restored for 30 days.
- An unpinned chat with no activity for 90 days is moved to the Trash automatically.
- The chat content is stored in readable form on the Overseer server.

## 🔒 Confidential Mode

A confidential chat is still saved and still appears in your chat list, marked with a small lock. While it is open, a **Private** badge is shown above the message box. The Overseer applies five protections to it:

| Protection | What It Means |
|---|---|
| **Encrypted where it is stored** | Messages, the chat title, tool results, and attachments are encrypted on the Overseer server. |
| **Internet tools blocked** | No tool can send anything to a third-party service, and the AI provider's own web search is off. |
| **No AI-made title** | Normally your first message is sent to a separate AI model, often at another provider, to create a title. This is skipped, and the chat gets a plain title that you can rename yourself. |
| **Provider prompt cache off** | The AI provider is not asked to keep parts of your conversation between turns. Later turns may cost more and start a little more slowly. |
| **Excluded from search** | The chat never appears in chat search results, because its encrypted title and messages cannot be searched. |

In addition, messages in a confidential chat cannot be reported, and error reports from the chat are not sent to the developers.

The Overseer loses none of its game knowledge in this mode. Monster, item, and artifact data, the GnollHack and NetHack wikis, the knowledge base, and dumplog search all run on the Overseer server itself, so they keep working.

### 🗑️ Deletion Is Final

- Deleting a confidential chat destroys it immediately. There is no Trash and no way to restore it.
- A confidential chat is deleted automatically after 30 days without activity, instead of the normal 90.
- You can have up to 50 active chats. When you go over the limit, the oldest unpinned chat is removed. For a confidential chat, that removal is permanent too.

> 💡 **Tip:** Pin a confidential chat that you want to keep. Pinned chats are safe from both automatic deletion and the chat limit. You can pin up to 5 chats.

### ⬆️ Upgrading a Standard Chat

**Make confidential** protects a chat **from the next message on**. Messages that were already in the chat stay stored as they were, and anything already sent to an AI provider cannot be recalled. The upgrade cannot be undone.

### 🚦 The Private Badge

Select the **Private** badge to see exactly which protections are active and what is known about the AI provider. Its color sums up the situation:

| Color | Meaning |
|---|---|
| 🟢 **Green** | Fully protected. All protections are on, and an administrator has verified that the AI provider keeps nothing after answering. |
| 🟡 **Yellow** | Protected, with a caveat. All protections are on, but the provider may keep your messages for a while, or its terms are only what you declared for your own API key, which the Overseer cannot verify. |
| 🟠 **Orange** | Protected by the Overseer only. All protections are on, but nothing is known about what the AI provider keeps. |
| 🔴 **Red** | Not fully protected. At least one protection has been switched off in the settings. |

Orange is not an error. It is an honest report that the Overseer's own protections are working while the provider's data handling is unknown. The badge also briefly shows orange at the start of each turn, until the Overseer knows which model is answering.

## 🕶️ Incognito Mode

An incognito chat has all the protections of a confidential chat, and on top of that, **nothing is saved**. No messages, tool results, attachments, or title are written to the Overseer's database or files. The chat never appears in your chat list, and an **Incognito** badge is shown above the message box.

An incognito chat ends in one of two ways:

- **By itself**, after 60 minutes without activity. The Overseer warns you about two minutes before that happens.
- **When you delete it**, with the trash button in the row above the message box.

When it ends, everything in it is gone. There is no Trash and no recovery, not even if the chat ended only because you stepped away for too long. Copy anything that you want to keep before you leave.

> ⚠️ **Warning:** "Not saved" means that nothing is written to the Overseer's database or files. It is not a legal or forensic guarantee: the server's memory can still be written to disk by its operating system or captured in a crash dump.

## 📢 What No Mode Can Do

**In every mode, your messages are sent to an AI provider to be answered.** The modes control what the *Overseer* keeps and sends. They cannot control what the *AI provider* does with a message after receiving it. That depends on the provider's terms for the API key behind the chat, which is exactly what the color of the Private badge reports.

A few other limits are worth knowing:

- **Some details of a confidential chat stay readable on the server.** Encryption covers the content of the chat. It does not cover details such as when you chatted, how long the messages were, which model answered, which tools ran, and whether an attachment was an image or a document.
- **The lock is visible.** Someone looking at your screen can see which of your chats are confidential, but not what is in them.
- **Confidential mode is meant for your own personal data.** Documents about other people get the same technical protection, but the mode makes no promises about them. Health, financial, and other regulated records are not supported.
- **Usage is still counted.** Even an incognito chat counts toward usage limits, although nothing about its content is recorded.

> 💡 **Tip:** Separately from these modes, the Overseer can replace recognizable secrets, such as API keys, passwords, and card numbers, with placeholders before a message leaves the server. This works in every chat, in every mode, and is configured under **Settings → Outbound Masking**. It is a safety net, not a guarantee.

## ⚙️ Settings for Confidential Chats

The settings under **Settings → Confidentiality Mode** apply to every chat that you mark confidential from then on. Chats that are already confidential keep the rules that they were created with.

| Setting | What It Does |
|---|---|
| **Default for New Chats** | The mode that a new chat starts in. |
| **Storage** | How confidential chats are kept. Choosing **Stored readable** turns encryption off and turns the badge red. |
| **Block tools that reach the internet** | Keeps internet tools and web search off. Switching it off turns the badge red. |
| **Delete After** | Days without activity before a confidential chat is deleted: 1 to 365, 30 by default. |
| **Purge immediately on delete** | Deleting skips the Trash. If you switch it off, confidential chats go to the 30-day Trash like normal chats. |
| **Skip the AI-generated chat title** | Keeps your first message from being sent to a separate titling model. |
| **Turn off provider prompt caching** | Keeps the provider from holding on to parts of the conversation between turns. |
| **Model Trust Requirement** | How sure the Overseer must be about a model's data handling before it answers in a confidential chat. |

An administrator can lock any of these to its safe value. A locked setting is shown as fixed and cannot be weakened.

### 🤝 Deciding Which Models You Trust

Because the AI provider always sees your messages, you can decide which models may be used in your confidential chats at all:

- **Models provided by the Overseer** are decided under **Settings → System Model Confidentiality**. The page shows what is known about how each provider handles your data.
- **Models used with your own API key** are decided on the **API Keys** page, where you can also declare what your provider has agreed to.

For each model, you can answer **Yes**, **No**, or leave it undecided. **No** always wins: the Overseer refuses to use that model in a confidential chat and tells you why. What happens to undecided models depends on the **Model Trust Requirement**:

| Option | Behavior |
|---|---|
| **I decide** | Undecided models can be used. The badge reports what is actually known about them. |
| **Ask when unclear** | The first time a model with unknown data handling would answer in a confidential chat, the Overseer asks you once and remembers your answer. |
| **Verified posture only** | Only models that an administrator has verified as keeping nothing after answering can be used. |

## 💡 Summary

- Use **Standard** for everyday gameplay questions.
- Use **Confidential** when a chat contains personal content that you want to keep. It is encrypted, cut off from the internet, and deleting it is final.
- Use **Incognito** when you do not want the chat kept at all. It disappears after an hour of inactivity or when you delete it.
- Choose the mode before the first message. Afterwards, the only possible change is Standard → Confidential.
- In every mode, the AI provider still receives your messages. Check the **Private** badge to see how much is known about the provider.

## 🔗 Learn More

- [[/Guides/Introduction to Gnoll Overseer]] — What the Gnoll Overseer is and how to access it.
- [[/Guides/Advanced Guide to Gnoll Overseer]] — Tools, spoiler policy, and customization.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — How to choose the right AI model.
- [[/Gnoll Overseer Privacy Policy]] — The privacy policy of the Overseer.
- [[/Overseer AI Providers]] — The AI providers that the Overseer connects to.
