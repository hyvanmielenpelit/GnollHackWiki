![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **A developer-oriented overview of the architecture, frameworks, tool execution engine, and design decisions behind Gnoll Overseer.**

## 🏗️ Architecture Overview

The Gnoll Overseer is a full-stack web application that provides an AI-powered assistant for GnollHack players. It is architecturally split into three primary layers:

1. **ASP.NET Core Backend** — REST API controllers, SignalR hub for real-time streaming, AI provider abstraction layer, tool execution engine, background indexing, and automated data retention maintenance.
2. **Angular Frontend** — A single-page application (SPA) providing the chat interface, avatar animation engine, chat search and Trash bin, in-app changelog, settings, API key management, and admin dashboard.
3. **Shared Data Library** — An Entity Framework Core data access layer shared with the GnollHack Account server.

The entire system resides in the [MobileGnollHackLogger](https://github.com/hyvanmielenpelit/MobileGnollHackLogger) repository, alongside the GnollHack Account server that handles player accounts, scores, and bones sharing.

## 💻 Technology Stack

| Layer / Subsystem | Technology |
|---|---|
| **Backend Runtime** | .NET 10.0 |
| **Web Framework** | ASP.NET Core (Web API + SignalR) |
| **Frontend SPA** | Angular 22 with TypeScript |
| **Database** | SQL Server via Entity Framework Core |
| **Authentication** | ASP.NET Identity with cookie-based sessions & short-lived handoff tokens |
| **Real-Time Communication** | SignalR (`ChatHub`) |
| **Source Code & Wiki Indexing** | Lucene.NET (dual-repository indexing for GnollHack and NetHack C sources, plus local NetHack Wiki) |
| **Background Maintenance** | ASP.NET Core `BackgroundService` (`MaintenanceBackgroundService`) |
| **Telemetry & Crash Reporting** | Sentry (integrated across Angular frontend and ASP.NET Core backend) |
| **Styling** | SCSS (compiled to compressed CSS) |

## ⚙️ Backend Architecture

### AI Provider Abstraction

The AI layer is built around an `IAiProvider` interface. Each provider implements streaming chat completions with structured tool calling and reasoning support:

| Provider | Implementation Class | API Protocol | Supported Model Families | Key Reasoning & Safety Features |
|---|---|---|---|---|
| **Google** | `GoogleProvider` | Google Generative AI API | Gemini 3.7 Flash, Gemini 3.1 Pro | Configurable thinking levels, granular harm thresholds, high context window |
| **Anthropic** | `AnthropicProvider` | Anthropic Messages API | Claude 5 family (Claude Sonnet 5, Claude Opus 5) | Extended thinking with explicit token budgets, deep multi-step reasoning |
| **OpenAI** | `OpenAiResponsesProvider` | OpenAI Responses API | GPT-5.6 family (GPT-5.6 Sol, GPT-5.6 Terra, GPT-5.6 Luna) | Configurable reasoning effort levels, structured tool calling |

The system selects a provider based on the active AI configuration, which can be a server-managed system model or a user's own BYOK (Bring Your Own Key) configuration.

### Asynchronous Background Indexing

To eliminate cold-start latency and avoid blocking web requests during application startup, all document indexing runs asynchronously in background tasks (`InitializationTask`). The indexing pipeline builds high-speed Lucene.NET indexes for:

- **GnollHack C Source Code** (`src/`, `include/`)
- **NetHack C Source Code** (`src/`, `include/`)
- **GnollHack Wiki Markdown**
- **NetHack Wiki Offline Markdown**
- **Curated Knowledge Base Articles**

### Real-Time Streaming and Performance Metrics

The Overseer uses a SignalR `ChatHub` for real-time, token-by-token response streaming. As the AI generates its response, tokens are pushed to the Angular client immediately, producing a smooth typing effect.

The hub also streams:
- **Live tool call notifications** — Displays tool execution boxes with arguments, status spinners, and output summaries in real time.
- **Performance timings** — Calculates and broadcasts Time to First Token (`TTFT`) and total response generation duration in milliseconds, which are persisted to the database and displayed in the message metadata.

### Tool Execution Engine

The Overseer's tool system is a core architectural feature. Each tool is a self-contained class implementing `IToolHandler` that defines its JSON schema (name, description, parameters) and execution logic. The backend currently ships with 18 server-side tools:

- **Structured Data Extraction** — `get_monster_stats`, `get_item_stats`, `get_artifact_stats`, `monster_lookup`, `item_lookup` directly parse C definitions (`monst.c`, `objects.c`, `artilist.h`).
- **Multi-Repository Code Search** — `source_code_search`, `source_code_view`, `get_function_definition`, `search_definitions`, `get_constants`, `list_indexed_files` allow inspecting both GnollHack and NetHack C source trees with repository tagging.
- **Dual Wiki Search & View** — `wiki_search` & `wiki_view` query the GnollHack Wiki; `nethack_wiki_search` & `nethack_wiki_view` query the offline NetHack Wiki.
- **Curated Knowledge Base** — `get_knowledge_article` queries first-party developer and game documentation.
- **GitHub Integration** — `get_github_repo_info` and `search_github` query repository metadata, pull requests, and issues with rate limit tracking.
- **Player Dumplogs** — `search_server_dumplogs` scans player end-of-game records on the server.

Tool behavior is guided by Markdown guides in `ToolGuides/`, which are dynamically injected into the AI system prompt to enforce a strict precedence hierarchy (Context → Knowledge Base → Wiki/Stats → Source Code → GitHub → Web Search).

### Client-Side Tool Bridge

When opened from within a running game, a bidirectional messaging bridge connects the Angular SPA to the native game client:

| Platform | Bridge Implementation | Native Technology | Communication Mechanism |
|---|---|---|---|
| **Windows** | Direct WebView2 handler | Microsoft WebView2 | `CoreWebView2.WebMessageReceived` / `PostWebMessageAsString` |
| **Android** | `OverseerJsBridge` | Android WebView | `@JavascriptInterface` bridge callback |
| **iOS** | `OverseerScriptMessageHandler` | WebKit WKWebView | `WKScriptMessageHandler` via `window.webkit.messageHandlers` |

This bridge enables 10 client-side tools (`refresh_snapshot`, `get_full_message_history`, `get_player_library`, `get_oracle_consultations`, `get_player_xlog`, `get_player_dumplogs`, `get_save_info`, `get_directory_listing`, `get_app_log`, `get_panic_log`) that query the local device. The AI requests a client tool via SignalR, the client executes it natively, and returns the JSON payload back across the JavaScript bridge.

## 🔐 Authentication, Session Handoff, and Navigation

The Overseer shares the ASP.NET Identity database with the GnollHack Account server.

For in-game integration, authentication uses a secure handoff token mechanism:

1. The game client sends a `POST /api/session/create` request with player credentials, session preferences, and a live game state snapshot (HTML).
2. The server authenticates the user, creates a `ChatSession`, stores the snapshot, and returns a short-lived (2-minute) single-use handoff token.
3. The game client navigates its embedded WebView to `GET /api/auth/handoff?token={token}&sessionId={sessionId}`.
4. The handoff endpoint displays a styled loading splash screen while validating the token, signs the user in via a secure cookie, and smoothly initializes the Angular SPA.

### Game Context Snapshots

When opened during gameplay, the native C core function `GenerateAiSnapshot()` compiles an HTML document containing character stats, dungeon map, inventory, surrounding monsters, and recent messages. This snapshot is attached to the session and injected as system context.

## 🧹 Data Retention, Storage Maintenance, and Admin Dashboard

To maintain database performance and enforce storage quotas, Overseer implements an automated data retention lifecycle managed by `MaintenanceBackgroundService`:

| Data Category | Retention Window | Automated Maintenance Action | Admin Controls |
|---|---|---|---|
| **Active Chats** | Indefinite (User-controlled) | Retained in primary sidebar until deleted or cleared by the user | Real-time session monitoring & user quota enforcement |
| **Trash Bin (Soft-Deleted)** | 30 Days | `IsDeleted = true` sessions are permanently purged after the retention window | Manual purge trigger & Trash bin status |
| **Tool Call Payloads** | 30 Days | Large raw JSON tool execution payloads are pruned while keeping chat text intact | Database size telemetry & table optimization |
| **File Attachments** | Linked to Session | Orphaned and unlinked disk attachments (e.g. screenshots) are purged from disk | Disk storage breakdown in Admin Dashboard |
| **User Account Deletion** | Immediate / 30 Days | Soft-deletes user accounts; full chat data purge while preserving anonymized logs | User management & GDPR compliance tools |

## 🔑 Security: API Key Encryption

User-provided AI API keys (BYOK) are encrypted at rest using AES-256-GCM:

- A server-side 256-bit master key (`AesEncryptionKey`)
- A 12-byte random cryptographic nonce per encryption
- A 16-byte authentication tag
- The user's `AspNetUserId` as Authenticated Associated Data (AAD), preventing cross-user decryption

## 📊 Telemetry, Rate Limiting, and Quotas

- **Telemetry & Error Tracking** — Sentry is integrated on both frontend and backend with a custom tunnel endpoint, sanitizing PII and filtering transient external AI rate limits to avoid false crash reports.
- **Multi-Tier Quotas** — Daily, monthly, and lifetime caps on request counts and token usage per user group.
- **Per-Session Tool Limits** — Configurable maximum tool calls per session and per AI turn (default 10 iterations).

## 💡 Learn More

- [[/Guides/Introduction to Gnoll Overseer]] — Player introduction and getting started.
- [[/Guides/Advanced Guide to Gnoll Overseer]] — Detailed tool guides, model configuration, and full settings reference.
- [[/Overseer AI Providers]] — AI provider capabilities and model options.
- [MobileGnollHackLogger Repository](https://github.com/hyvanmielenpelit/MobileGnollHackLogger) — Full source code and developer documentation.
