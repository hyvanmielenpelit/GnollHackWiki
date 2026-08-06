> 👉 **This Privacy Policy pertains to the Gnoll Overseer AI Assistant, an optional AI-powered feature in the GnollHack app.**

## Introduction

The GnollHack app includes an optional AI-powered assistant called **Gnoll Overseer**, which processes user data to provide intelligent gameplay assistance and features. This document outlines what data is collected, how it is used, and your rights regarding this data.

Gnoll Overseer is an optional feature. If you do not use it, no data described in this document is collected.

## Data Collected and Its Purpose

When you interact with Gnoll Overseer, the following data is collected and securely stored on a server located in the **United States**.

### 1. Account and Authentication Data

Your GnollHack Account credentials (username and password) are used to authenticate you with the Gnoll Overseer service. Your password is not stored by the Overseer service; it is used only to verify your identity during login.

### 2. Chat Sessions

| Data Point | Purpose |
| :--- | :--- |
| GnollHack Account User ID | Associate chat sessions with your account. |
| Chat session title | Display a human-readable label for each conversation. |
| Session creation and last message timestamps | Order and display your conversation history. |
| Client settings and preferences (JSON) | Persist your Overseer UI preferences across sessions. |
| Whether the session is a GnollHack game session | Differentiate sessions initiated from within the game from those initiated via the web interface. |

### 3. Chat Messages and Attachments

| Data Point | Purpose |
| :--- | :--- |
| Message sender role (e.g., user, assistant, system) | Maintain conversation context for the AI. |
| Message text content | Provide the AI with your questions and context. |
| Message timestamps | Order messages chronologically. |
| Hidden message flag | Track messages hidden from the conversation view. |
| AI provider and model used for each response | Display which AI model generated a response. |
| Thinking level used | Record the reasoning mode used by the AI. |
| Tokens used per message | Monitor AI usage for rate-limiting purposes. |
| Time to first token (milliseconds) | Monitor AI response performance. |
| Attached file names, content types, and storage paths | Manage file attachments uploaded during a chat session (e.g., in-game screenshots). |

### 4. Game Context Data

When a chat session is initiated from within the GnollHack app, the following game data may be sent to provide the AI with context about your current game state:

- Game snapshot (HTML representation of the current game screen)
- In-game message history (recent game messages)
- Game directory manifest (file listing of game data)

### 5. Tool Calls

When the AI assistant uses tools (e.g., looking up game information, searching the wiki), the following is recorded:

| Data Point | Purpose |
| :--- | :--- |
| Tool call identifier, name, and display name | Identify which tool was invoked. |
| Arguments passed to the tool | Record what information was requested. |
| Execution status, result, and any errors | Track tool execution for display and debugging. |
| Sort order | Display tool calls in the correct sequence. |

### 6. User AI Settings and Model Preferences

| Data Point | Purpose |
| :--- | :--- |
| Spoiler-free mode, show source code references, show thoughts and tools preferences | Customize the AI's behavior to your preferences. |
| Maximum result length, calls per session, and tool iteration limits | Enforce your usage preferences. |
| Feature toggles (web search, tool use, client tools, game actions) | Control which AI capabilities are enabled. |
| Title generation model preferences and request timeout | Configure AI model selection and performance. |
| Custom AI model configurations (provider, model ID, display name, thinking level, token limits, ordering) | Allow you to define and prioritize your preferred AI models. |

### 7. User-Provided AI API Keys

If you choose to provide your own AI API keys, they are stored **encrypted at rest** using AES-GCM authenticated encryption. The encryption nonce and authentication tag are stored alongside the encrypted key. Your plaintext API key is never stored in the database.

### 8. System Usage and Error Logs

| Data Point | Purpose |
| :--- | :--- |
| AI provider and model used per request | Track which AI configuration was used. |
| Input and output token counts | Monitor usage for rate-limiting and budgeting. |
| Role context (Chat or Title Generation) | Distinguish between different types of AI requests. |
| Timestamp | Record when each request occurred. |
| Error messages and HTTP status codes | Diagnose and resolve AI service failures. |

### 9. Message Reports

If you choose to report an AI-generated message, the following data is sent via email to the GnollHack development team for review:

- Your username and email address
- The reported message content and its metadata
- The conversation history up to and including the reported message

## Third-Party AI Providers

Gnoll Overseer utilizes third-party AI services to process user messages and generate responses. The AI providers that may be used include, but are not limited to:

- **Google** (e.g., Gemini)
- **OpenAI** (e.g., ChatGPT)
- **Anthropic** (e.g., Claude)

When you send a message to Gnoll Overseer, your message content, conversation history, and any attached game context data are transmitted to the selected AI provider for processing. Data processing by these third-party providers is governed by their respective Privacy Policies and Terms of Service.

By using the Gnoll Overseer feature, you consent to your data being shared with and processed by these third-party services.

## Data Security

We take the security of your data seriously:

- **Encryption**: User-provided AI API keys are encrypted at rest using AES-GCM authenticated encryption.
- **Access Control**: Chat sessions and their data are accessible only to the authenticated account that created them.
- **Secure Transmission**: All data is transmitted over HTTPS.

## Data Retention and Deletion

- **Data Retention**: Your chat sessions, messages, attachments, and associated usage logs are retained on our servers to maintain your conversation history and to monitor system usage and errors. Data is retained until you choose to delete it.
- **Chat Session Deletion**: You can delete your chat sessions at any time directly within the Gnoll Overseer interface. Deleting a chat session permanently removes its associated messages, tool calls, attachments (including files stored on disk), and related data from our servers.
- **Account Deletion**: You can delete your entire GnollHack account and all associated data (including all Overseer data) from the **Personal Data** page in your account settings on the GnollHack website. You can also contact us at the email address listed below.
- **Game Log Data**: When your account is deleted, your game log entries are anonymized rather than deleted in order to preserve the integrity of the public leaderboard. All personally identifiable information (username, character name) is removed from these entries.

## Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date. We encourage you to review this policy periodically.

## Contact Information

If you have any questions or concerns about this Privacy Policy or your data, please contact us at:

**Email:** gnollhack@hyvanmielenpelit.fi
