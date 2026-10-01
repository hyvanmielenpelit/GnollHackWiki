![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **A developer-oriented overview of the architecture, frameworks, tool execution engine, privacy framework, and design decisions behind Gnoll Overseer.**

## 🏗️ Architecture Overview

The Gnoll Overseer is a full-stack web application that provides an AI-powered assistant for GnollHack players. It is split into three primary layers:

1. **ASP.NET Core Backend** — REST API controllers, a SignalR hub for real-time streaming, the AI provider abstraction layer, the tool execution engine, background indexing, the privacy framework, and automated data retention maintenance.
2. **Angular Frontend** — A single-page application (SPA) providing the chat interface, avatar animation engine, chat search and Trash, in-app release notes, settings, API key and model management, and the admin dashboard.
3. **Shared Data Library** — An Entity Framework Core data access layer shared with the GnollHack Account server.

The entire system resides in the [MobileGnollHackLogger](https://github.com/hyvanmielenpelit/MobileGnollHackLogger) repository, alongside the GnollHack Account server that handles player accounts, scores, and bones sharing.

## 💻 Technology Stack

| Layer / Subsystem | Technology |
|---|---|
| **Backend Runtime** | .NET 10 |
| **Web Framework** | ASP.NET Core (Web API + SignalR) |
| **Frontend SPA** | Angular 22 with TypeScript |
| **Database** | SQL Server via Entity Framework Core |
| **Authentication** | ASP.NET Identity with cookie-based sessions, TOTP two-factor login, and short-lived handoff tokens |
| **Real-Time Communication** | SignalR (`ChatHub`) |
| **Wiki Indexing** | Lucene.NET, for the GnollHack Wiki and the offline NetHack Wiki |
| **Source Code Indexing** | An in-memory index with a custom C lexer, for the GnollHack and NetHack sources |
| **Knowledge Base** | An in-memory dictionary of curated Markdown articles |
| **Document Handling** | PdfPig and Open XML parsing (PDF, DOCX, XLSX), with BM25 passage retrieval |
| **Malware Scanning** | AMSI on Windows, or ClamAV |
| **Background Maintenance** | ASP.NET Core `BackgroundService` (`DatabaseMaintenanceBackgroundService`), daily at 03:00 UTC |
| **Telemetry & Crash Reporting** | Sentry (integrated across the Angular frontend and the ASP.NET Core backend) |
| **Styling** | SCSS, compiled by the Angular CLI |

## ⚙️ Backend Architecture

### 🧠 AI Provider Abstraction

The AI layer is built around an `IAiProvider` interface. Each provider implements streaming chat completions with structured tool calling and reasoning support:

| Provider | Implementation Class | API Protocol | Supported Model Families | Key Reasoning Features |
|---|---|---|---|---|
| **Google** | `GoogleProvider` | Google Generative AI API | Gemini 3.1–3.8 | Configurable thinking levels, Google Search grounding |
| **Anthropic** | `AnthropicProvider` | Anthropic Messages API | Claude 4.6–5.5 (Opus, Sonnet, Fable) | Adaptive thinking with effort levels (low, medium, high, max), native web search |
| **OpenAI** | `OpenAiResponsesProvider` | OpenAI Responses API | GPT-5.4–6.1 | Configurable reasoning effort levels, native web search |

The system selects a provider based on the active AI configuration, which can be a server-managed system model or a user's own BYOK (Bring Your Own Key) configuration. Web search is each provider's own native tool, not an Overseer tool. Custom endpoints pass through an SSRF guard (`EndpointPolicy`) with a host allowlist, and user-supplied base URLs are off by default.

### 🗂️ Asynchronous Background Indexing

To avoid cold-start latency and blocking web requests during startup, indexing runs in the background:

- **GnollHack Wiki, NetHack Wiki, and Knowledge Base** — Each service builds its index in an `InitializationTask` that is warmed up when the application starts.
- **GnollHack and NetHack C Sources** — `SourceCodeService` and `NetHackSourceCodeService` are hosted services that re-index every 10 minutes. GnollHack's `src`, `include`, and `dat` directories and the cross-platform client under `win/win32/xpl` are indexed; for NetHack, `src`, `include`, and `dat`.

### 📡 Real-Time Streaming and Performance Metrics

A chat turn starts with a REST call, `POST /api/chat/send`, which returns at once while the turn runs in the background. Its progress is pushed to the client as `ReceiveChatEvent` messages on the SignalR hub at `/chathub`, producing a smooth typing effect.

The main event types are:

- **Content** — `chunk` and `thinking_chunk` for the answer and the reasoning summary.
- **Tool calls** — `tool_start`, `tool_result`, `tool_error`, and `tool_client_request`, shown as live tool boxes with arguments, status, and output summaries.
- **Metrics** — `cost`, `usage`, `context`, `ttft`, and `duration`.
- **Session state** — `title_update`, `private_badge`, `confidential_gate`, and `done`.

The estimated cost of each message and the session totals, Time to First Token, and total response duration are persisted to the database and shown in the message metadata.

### 🧰 Tool Execution Engine

Each tool is a self-contained class implementing `IToolHandler` that defines its JSON schema (name, description, parameters) and execution logic. The backend ships with 20 server-side tools:

- **Structured Data Extraction** — `get_monster_stats`, `get_item_stats`, and `get_artifact_stats` parse the game's monster, object, and artifact definitions.
- **Wiki Lookups** — `monster_lookup` and `item_lookup` find GnollHack Wiki articles about monsters, items, and artifacts.
- **Multi-Repository Code Search** — `source_code_search`, `source_code_view`, `get_function_definition`, `search_definitions`, `get_constants`, and `list_indexed_files` inspect both the GnollHack and NetHack source trees with repository tagging.
- **Dual Wiki Search & View** — `wiki_search` and `wiki_view` query the GnollHack Wiki; `nethack_wiki_search` and `nethack_wiki_view` query the offline NetHack Wiki.
- **Curated Knowledge Base** — `get_knowledge_article` reads first-party articles about the GnollHack app.
- **GitHub Integration** — `get_github_repo_info` and `search_github` query repository metadata, pull requests, and issues, with rate limit tracking.
- **Player Dumplogs** — `search_server_dumplogs` searches the end-of-game records of all players on the server.
- **Sub-Agents** — `delegate_to_subagent` hands a task to a specialist sub-agent (see [[Sub-Agents|#sub-agents]]).

Tool behavior is guided by Markdown files in `ToolGuides/`. Each per-tool guide becomes that tool's function description. The policy guides, `_policy.md` and `spoiler_policy.md`, go into the system prompt. The policy sets a 7-step precedence: Context → Knowledge Base → Wiki/Stats → Source Code → GitHub → Web Search → Sub-agent delegation.

### 📱 Client-Side Tool Bridge

When the Overseer is opened from the GnollHack app, a bidirectional messaging bridge connects the Angular SPA to the native game client:

| Platform | Bridge Implementation | Native Technology | SPA → Native |
|---|---|---|---|
| **Windows** | Direct WebView2 handler | Microsoft WebView2 | `window.chrome.webview.postMessage` → `CoreWebView2.WebMessageReceived` |
| **Android** | `OverseerJsBridge` | Android WebView | `window.GnollHackBridge.onWebMessage` via `@JavascriptInterface` |
| **iOS** | `OverseerScriptMessageHandler` | WebKit WKWebView | `window.webkit.messageHandlers.gnollhackBridge.postMessage` |

This bridge enables 11 client-side tools: `refresh_snapshot`, `get_full_message_history`, `get_player_library`, `get_oracle_consultations`, `get_player_xlog`, `get_player_dumplogs`, `get_performance_reports`, `get_save_info`, `get_directory_listing`, `get_app_log`, and `get_panic_log`.

The round trip works like this:

1. The server sends a `tool_client_request` event to the SPA over SignalR.
2. The SPA posts the request to the native client through the bridge.
3. The native client runs the tool and returns the result on every platform with `EvaluateJavaScriptAsync`, which calls a callback in the SPA.
4. The SPA submits the result to the hub with `SubmitToolResult`.

`refresh_snapshot` and `get_full_message_history` need a running game. The other client tools also work in a chat opened from the app's About page.

## 🔐 Authentication, Session Handoff, and Navigation

The Overseer shares the ASP.NET Identity database with the GnollHack Account server.

For in-game integration, authentication uses a secure handoff token mechanism:

1. The game client sends a multipart `POST /api/session/create` request with the player's credentials, a shared anti-forgery secret, the game snapshot as flattened text, a chat title, and the in-game Overseer settings.
2. The server rejects the request unless the secret matches, checks the credentials with lockout, creates a `ChatSession`, stores the snapshot, and returns a short-lived (2-minute) single-use handoff token.
3. The game client navigates its embedded WebView to `GET /api/auth/handoff?token={token}&sessionId={sessionId}`.
4. The handoff endpoint consumes the token, signs the user in with a cookie, and returns a styled splash page. The page continues to the Angular SPA with a meta refresh instead of a redirect, so that the cookie survives in the iOS WebView.

### 🎮 Game Context Snapshots

When the Overseer is opened during gameplay, the GnollHack core generates a plain-text snapshot of the game. It contains the game version and character, the map with a legend of notable positions and creatures, the status lines, hunger, prayer status, Elbereth knowledge, key bindings, the latest messages, pets, the inventory with weights and container contents, enlightenment, skills, spells, discoveries, the game log, genocided monsters, conducts, and the dungeon overview. The snapshot is attached to the session and injected as system context.

## 🤝 Sub-Agents

`delegate_to_subagent` lets the main coordinator model hand a scoped, multi-step task to a specialist: the **Wiki Researcher**, the **Source Investigator**, or the **Game Data Analyst**. Each specialist runs in its own loop with targeted instructions, a subset of the tools, and its own execution budget. Several sub-agents can run at once, and the user can watch and cancel each of them without stopping the chat. Sub-agents are off by default and are turned on per user with **Enable Subagent Use** under Settings → AI Permissions. Sub-agents inherit the chat's confidentiality restrictions.

## 🛡️ Data Privacy Framework

- **Confidentiality modes** — Standard, Confidential, and Incognito chats. Confidential and Incognito chats block tools that reach the internet, skip the AI-generated title, and do not request provider prompt caching. See [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]].
- **Outbound masking (DLP)** — Recognizable secrets are replaced with placeholders before a message leaves the server.
- **Attachment validation** — File types and sizes are checked, and every attachment is scanned for malware.
- **Document parsing and passage retrieval** — PDF, DOCX, and XLSX attachments are parsed to text, and the relevant passages are retrieved for the model.
- **Security headers** — A Content Security Policy, `nosniff`, `no-referrer`, and `X-Frame-Options: DENY`.
- **Untrusted-content wrapper** — Uploaded document text enters the prompt inside an escaped wrapper element, so that a document cannot pose as instructions to the model.
- **Access journal and data export** — Access to chat data is recorded in an access journal, and users can export their data.

## 🧹 Data Retention and Storage Maintenance

`DatabaseMaintenanceBackgroundService` runs the retention pass daily at 03:00 UTC:

| Data Category | Retention Window | Automated Maintenance Action |
|---|---|---|
| **Active Chats** | 90 days without activity | Unpinned chats move to the Trash. A user can have up to 50 active chats, 5 of them pinned. |
| **Confidential Chats** | 30 days without activity (by default) | Unpinned chats expire under their own retention setting and are, by default, purged at once and crypto-shredded instead of going to the Trash. Deleting one by hand does the same. |
| **Incognito Chats** | 60 minutes without activity | Held in server memory only, never written to the database, and discarded when idle. |
| **Trash** | 30 days | Soft-deleted chats are crypto-shredded and then purged. |
| **Tool Call Payloads** | 30 days | Large raw JSON tool payloads are pruned while the chat text is kept. |
| **Benchmark Tool Call Payloads** | 90 days | Pruned like normal tool call payloads. |
| **File Attachments** | Linked to the chat | Orphaned folders on disk are swept. |
| **Access Journal** | 365 days | Old entries are pruned. |
| **AI Error Log** | 90 days after dismissal | Dismissed entries are pruned. |
| **Maintenance History** | 180 days | Old run records are pruned. |
| **User Account Deletion** | Immediate | The GnollHack Account server hard-deletes the account and all of its chats. |

## 🔑 Security: Encryption

User-provided AI API keys (BYOK) are encrypted at rest using AES-256-GCM:

- A server-side 256-bit master key (`AesEncryptionKey`)
- A 12-byte random cryptographic nonce per encryption
- A 16-byte authentication tag
- The user's `AspNetUserId` as Authenticated Associated Data (AAD), preventing cross-user decryption

Confidential chat content uses envelope encryption in `ContentProtectionService`. Each chat gets its own data encryption key, wrapped by a versioned master key. Messages, tool results, attachments, and the title, including the starting title of a new chat, are stored as `enc:v1:` envelopes. Purging a confidential chat crypto-shreds it by destroying its key.

## 📊 Telemetry, Rate Limiting, and Quotas

- **Telemetry & Error Tracking** — Sentry is integrated on both the frontend and the backend with a custom tunnel endpoint, sanitizing PII and filtering transient external AI rate limits to avoid false crash reports. Error reports are suppressed in Confidential and Incognito chats.
- **Quotas** — Daily and monthly caps on request counts and token usage, per user group and per user.
- **Tool Limits** — At most 22 tool iterations per AI turn by default (configurable from 3 to 50), and 150 tool calls per chat session (5 to 500), with the counter resetting four hours after the first call.
- **Rate Limits** — 30 chat turns per minute per user, and at most 4 concurrent model calls, with retries on HTTP 429 responses.

## 📖 Learn More

- [[/Gnoll Overseer]] — All Gnoll Overseer guides in one place.
- [[/Guides/Advanced Guide to Gnoll Overseer]] — The tools, spoiler policy, chat features, and web settings from the player's side.
- [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]] — The confidentiality modes from the player's side.
- [[/Guides/Technological Overview of GnollBench]] — How GnollBench, the Overseer's AI benchmarking system, works.

## 🔗 External Links

- [MobileGnollHackLogger Repository](https://github.com/hyvanmielenpelit/MobileGnollHackLogger) — Full source code.
- [Overseer Developer Documentation](https://github.com/hyvanmielenpelit/MobileGnollHackLogger/tree/main/docs/overseer) — Design documents, including the data privacy framework, chat data retention, and sub-agents.
