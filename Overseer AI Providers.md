> 👉 **Gnoll Overseer is an optional, user-initiated in-game assistant feature in GnollHack that connects in real time to third-party artificial intelligence (AI) services for live AI content generation.**

## Third-Party AI Service Providers

The Gnoll Overseer service connects to external third-party AI service providers to generate responses to user inquiries. The third-party AI providers utilized by Gnoll Overseer include:

| Provider | Corporate Entity | Official Website | Terms of Service / Use | Privacy Policy |
|---|---|---|---|---|
| **OpenAI** | OpenAI, LLC / OpenAI Ireland Ltd | [openai.com](https://openai.com) | [Terms of Use](https://openai.com/policies/terms-of-use/) | [Privacy Policy](https://openai.com/policies/privacy-policy/) |
| **Anthropic** | Anthropic PBC | [anthropic.com](https://www.anthropic.com) | [Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms) | [Privacy Policy](https://www.anthropic.com/legal/privacy) |
| **Google AI** | Google LLC / Google Ireland Ltd | [ai.google.dev](https://ai.google.dev) | [Google Terms](https://policies.google.com/terms) & [Generative AI Terms](https://ai.google.dev/gemini-api/terms) | [Privacy Policy](https://policies.google.com/privacy) |

## Data Transmission and User Consent

- **100% Opt-In and User-Initiated**: The Gnoll Overseer feature is entirely optional. The game does not transmit data to third-party AI services in the background or during normal offline gameplay. Communication with third-party AI services occurs only when the player explicitly opens the Overseer interface and submits a message.
- **Scope of Transmitted Data**: When a user submits a query to the Overseer, the user's message text, prior conversation history within the session, and optional in-game context snapshots (such as character attributes, inventory list, surrounding dungeon tiles, and recent message logs) are transmitted over HTTPS to the selected third-party AI provider to process and generate a response.
- **Third-Party Processing**: All data transmitted to third-party AI providers is processed and governed in accordance with each provider's respective Terms of Service and Privacy Policy.
- **API Key Security**: When users provide their own third-party AI API keys (BYOK), the keys are encrypted at rest on our servers using AES-256-GCM authenticated encryption and are used exclusively to authenticate requests made by that user.

## Content Safety and Moderation

All communications with third-party AI providers are subject to automated content filtering and safety guardrails (blocking hate speech, harassment, sexually explicit content, and dangerous material) to maintain compliance with GnollHack's age ratings and platform store policies. For technical details on safety threshold enforcement, see [[/Development/AI Safety Settings]].

## Relevant Policies

| Policy Document | Scope & Relevance |
|---|---|
| [[Gnoll Overseer Privacy Policy]] | Detailed privacy, data retention, and deletion policy for the Gnoll Overseer assistant. |
| [[AI Usage Policy]] | Policy regarding the use of generative artificial intelligence across GnollHack development, assets, and documentation. |
| [[GnollHack App Privacy Policy]] | Application privacy policy covering all GnollHack game clients. |
| [[GnollHack Steam App Privacy Policy]] | Specific privacy policy for the GnollHack Steam application. |
