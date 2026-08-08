![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **A developer-oriented overview of the architecture, frameworks, and design decisions behind the Gnoll Overseer.**

## 🏗️ Architecture Overview

The Gnoll Overseer is a full-stack web application that provides an AI-powered assistant for GnollHack players. It is architecturally split into three layers:

1. **ASP.NET Core Backend** — REST API controllers, SignalR hub for real-time streaming, AI provider integrations, and tool execution engine.
2. **Angular Frontend** — A single-page application (SPA) providing the chat interface, settings, API key management, and admin dashboard.
3. **Shared Data Library** — An Entity Framework Core data access layer shared with the GnollHack Account server.

The entire system resides in the [MobileGnollHackLogger](https://github.com/hyvanmielenpelit/MobileGnollHackLogger) repository, alongside the GnollHack Account server that handles player accounts, scores, and bones sharing.

## 💻 Technology Stack

| Layer | Technology |
|---|---|
| **Backend Runtime** | .NET 10.0 |
| **Web Framework** | ASP.NET Core (Web API + SignalR) |
| **Frontend SPA** | Angular 22 with TypeScript |
| **Database** | SQL Server via Entity Framework Core |
| **Authentication** | ASP.NET Identity with cookie-based sessions |
| **Real-Time Communication** | SignalR |
| **Source Code Indexing** | Lucene.NET |
| **Styling** | SCSS (compiled to CSS) |

## ⚙️ Backend Architecture

### AI Provider Abstraction

The AI layer is built around an `IAiProvider` interface. Each provider implements streaming chat completions with tool calling support:

- **GoogleProvider** — Uses the Google Generative AI API (Gemini models). Supports configurable safety thresholds and thinking levels.
- **AnthropicProvider** — Uses the Anthropic Messages API (Claude models). Supports extended thinking with configurable budget tokens.
- **OpenAiResponsesProvider** — Uses the OpenAI Responses API (GPT models). Supports reasoning effort levels.

The system selects a provider based on the active AI configuration, which can be a server-managed system model or a user's own BYOK model.

### Real-Time Streaming via SignalR

The Overseer uses a SignalR `ChatHub` for real-time, token-by-token response streaming. As the AI generates its response, each token is pushed to the Angular client immediately, producing the familiar typing effect seen in commercial AI chat interfaces. The hub also streams tool call notifications, allowing the frontend to show which tools the AI is invoking in real time.

### Tool Execution Engine

The Overseer's tool system is a key architectural feature. Each tool is a self-contained class that defines its schema (name, description, parameters) and execution logic. The backend currently ships with 18 server-side tools covering:

- **Data extraction** — Parsing C source files (`monst.c`, `objects.c`, `artilist.h`) to extract structured monster, item, and artifact data.
- **Code search** — Full-text search via Lucene.NET and regex-based source scanning.
- **Wiki and knowledge base** — Keyword search across GnollHack Wiki Markdown files and a curated knowledge base.
- **External APIs** — NetHack Wiki (MediaWiki API), GitHub (repository info, issue search, code browsing).
- **Player data** — Server-side dump log search.

Tool behavior is guided by Markdown files in the `ToolGuides/` directory, which are injected into the AI's system prompt. These guides enforce a tool preference hierarchy: context first, then knowledge base, then wiki/stats, then source code, then GitHub, and finally web search.

### Client-Side Tool Bridge

When the Overseer is opened from within a running game, a bidirectional messaging bridge connects the Angular SPA to the native game client:

- **Windows** — WebView2 `CoreWebView2.WebMessageReceived`
- **Android** — `@JavascriptInterface` via `OverseerJsBridge`
- **iOS** — `WKScriptMessageHandler` via `OverseerScriptMessageHandler`

This bridge enables 10 additional client-side tools that query the player's device directly (message history, save file inspection, local game logs, panic logs, etc.). The AI sends a JSON tool request via SignalR, the client executes it locally, and returns the result through the JavaScript bridge.

## 🔐 Authentication and Session Handoff

The Overseer shares the ASP.NET Identity database with the GnollHack Account server, so players use the same credentials for both.

For in-game integration, the authentication flow uses a handoff token mechanism:

1. The game client sends a `POST /api/session/create` request with the player's credentials, a game state snapshot (HTML), and session configuration.
2. The server authenticates the user, creates a `ChatSession`, stores the snapshot, and returns a short-lived (2-minute) handoff token.
3. The game client navigates its embedded WebView to `GET /api/auth/handoff?token={token}&sessionId={sessionId}`.
4. The handoff endpoint validates the single-use token, signs the user in via a cookie, and redirects to the Angular SPA.

### Game Context Snapshots

When opened during gameplay, the game client calls the native C core function `GenerateAiSnapshot()` to produce an HTML document containing the player's current stats, dungeon map, inventory, surrounding monsters, and recent message log. This snapshot is uploaded as part of the session creation request and injected as a system message, giving the AI full awareness of the player's current situation.

## 🔑 Security: API Key Encryption

User-provided API keys (BYOK) are encrypted at rest using AES-256-GCM:

- A server-side 256-bit master key (`AesEncryptionKey`)
- A 12-byte random nonce per encryption
- A 16-byte authentication tag
- The user's `AspNetUserId` as Authenticated Associated Data (AAD), preventing cross-user decryption

## 📊 Rate Limiting and Quotas

The system implements multi-tier rate limiting:

- **System AI model quotas** — Administrators can set daily, monthly, and lifetime caps on both request counts and token usage, per user or per user group.
- **Per-session tool limits** — Configurable maximum tool calls per session and per AI turn.
- **External API rate limits** — NetHack Wiki searches are capped at 10 requests per minute with 60-minute result caching.

## 💡 Learn More

For full development instructions, see the [README](https://github.com/hyvanmielenpelit/MobileGnollHackLogger) in the MobileGnollHackLogger repository.
