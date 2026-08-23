> ℹ️ **Note:** These settings are configured in the MobileGnollHackLogger / Overseer server backend's `appsettings.json`, not in the client app.

This document outlines the safety thresholds and configurations for Large Language Models (LLMs) used within GnollHack applications, particularly the Overseer chat service. GnollHack is rated for children ages 7 and up, meaning strict safety measures are implemented at the API level to ensure a child-friendly environment.

These settings are designed to meet standard App Store, Google Play, and Steam Review requirements concerning AI-generated content.

## ⚙️ Configuration Location

The safety settings are defined in the server's `appsettings.json` file under the `"SafetySettings"` key. This allows server administrators to fine-tune the thresholds if necessary, though the defaults are carefully chosen for the game's audience.

## ♊ Google Gemini

Google's Gemini API allows for granular control over content safety thresholds. The following configurations are implemented:

| Harm Category | API Enum Constant | Configured Threshold | Rationale & Roguelike Context |
|---|---|---|---|
| **Hate Speech** | `HARM_CATEGORY_HATE_SPEECH` | `BLOCK_LOW_AND_ABOVE` | Enforces a strict block to prevent any form of hate speech in a child-friendly environment (rated 7+). |
| **Sexually Explicit** | `HARM_CATEGORY_SEXUALLY_EXPLICIT` | `BLOCK_LOW_AND_ABOVE` | Enforces a strict block to ensure no explicit content is generated. |
| **Harassment** | `HARM_CATEGORY_HARASSMENT` | `BLOCK_MEDIUM_AND_ABOVE` | A moderate threshold prevents false positives when users or the AI discuss in-game combat, taunting monsters, or hostile encounters. |
| **Dangerous Content** | `HARM_CATEGORY_DANGEROUS_CONTENT` | `BLOCK_MEDIUM_AND_ABOVE` | A moderate threshold ensures discussions about weapons, spells, traps, and slaying monsters are not misclassified as real-world dangerous material. |

## 🤖 OpenAI and Anthropic

Both OpenAI and Anthropic apply mandatory, strict automated safety filtering and moderation on all API calls by default:

| Provider | Safety Filtering Mechanism | Configuration Approach | Compliance Standard |
|---|---|---|---|
| **OpenAI** | Automated system trust and safety filtering | Built-in baseline moderation guardrails | Fully compliant with child-friendly age ratings (7+) and store safety policies |
| **Anthropic** | Constitutional AI and automated input/output filtering | Built-in baseline safety training & automated filters | Fully compliant with child-friendly age ratings (7+) and store safety policies |

Unlike Gemini, their API endpoints do not currently support granular threshold configuration through the API request body. Their baseline trust and safety models handle content moderation automatically, which aligns with GnollHack's safety requirements.
