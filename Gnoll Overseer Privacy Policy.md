**Last updated:** 24 November 2026

This policy describes the personal data the Gnoll Overseer collects, why, to whom it goes, and for how long, and the rights you have over it. The Gnoll Overseer is an optional AI-powered gameplay advisor that you can use in the GnollHack app and on the web. If you do not use it, none of the data described here is collected. The Overseer's own **Privacy Notice** page gives further technical detail. Your GnollHack account is covered by the [[GnollHack Account Privacy Policy]], and our other privacy policies are listed on the [[Privacy Policy]] page.

## 1. Who We Are

The controller of your personal data is Hyvän mielen pelit ry (Sound Mind Games), a non-profit association registered in Finland.

- **Business ID:** 2722684-3
- **Address:** Kitarakuja 4D 53, 00420 Helsinki, Finland
- **Email:** gnollhack@hyvanmielenpelit.fi

## 2. Data We Collect

The Overseer stores its data on a server in the United States.

### 2.1. Account and Sign-In

You sign in to the Overseer with your GnollHack account user name and password. The Overseer does not store your password; it is used only to verify your identity when you sign in.

### 2.2. Chats

You can have three kinds of chat:

- **Normal chat**: Your messages and the replies are stored in the Overseer's database as plain text.
- **Confidential chat**: The content is encrypted with a key that belongs to that chat alone. The encrypted part is the text of each message, the arguments, results and errors of tool calls, the chat title, and the names and contents of attached files. Everything else about the chat stays readable, such as which AI provider and model answered, the times, the token counts, the cost, and the chat's settings.
- **Incognito chat**: The chat is held only in the server's memory. No chat, message, tool call or attachment is written to the database, and no file is written to disk. The one exception is game text refused under section 2.4, which is kept in every kind of chat.

For each chat, the Overseer keeps its title, when it was created and when its last message was sent, whether it is pinned or in the trash, whether it was started from the GnollHack app, and the settings of the chat view.

For each message, the Overseer keeps whether it is yours or the assistant's, its text, when it was sent, whether it is hidden, which AI provider and model answered and with which thinking level, the tokens used, and how long the answer took.

### 2.3. Attachments

A document or image you attach is stored in a file on the server under a generated name. The name you gave the file is kept only to show it in the chat. The file is unencrypted in a normal chat, encrypted in a confidential chat, and kept only in memory in an incognito chat. Text extracted from a document is also added to the message, so a document's text is stored twice.

The AI provider receives a file on the turn you attach it. A document under 12,000 tokens, by default, is sent whole; a larger one is sent as the excerpts most relevant to your question. The assistant has the document for that turn only.

### 2.4. Game Context

When you start a chat from the GnollHack app, the app can send the Overseer:

- A game snapshot, which shows the current game screen
- Your recent in-game messages
- A listing of your game files

A game snapshot, message history, file listing or game tool result that contains text addressed to the AI assistant is not delivered to the assistant. It is recorded as a security event (section 2.10).

### 2.5. Tool Calls

When the assistant uses a tool, for example to look up game information or search the wiki, the Overseer records the tool's name, the arguments, the result, its status, and any error. Two tools look things up on GitHub (section 4). In a confidential chat, every tool that sends data outside the Overseer is blocked, and so is the AI provider's own web search.

### 2.6. AI Settings

The Overseer stores your settings: spoiler-free mode, showing source code references, showing the assistant's thoughts and tools, result length, call and tool limits, which features are on (web search, tool use, client tools, game actions), the models used for chat titles, the request timeout, and the AI models you have configured (provider, model, display name, thinking level, token limits and order). It also stores whether assistant feedback reports are on (section 2.12).

### 2.7. Your Own API Keys

If you add your own AI API keys, they are stored encrypted. The readable key is never stored in the database, and the key is used only for your own requests.

### 2.8. Cost and Usage Records

For each message, the Overseer stores the token counts, an estimated cost and the pricing source it came from, and a running total for the chat. It also keeps a usage record of each AI call (the model, the token counts and the estimated cost) and a record of each attempt to reach the AI provider, including for calls made with your own API key. When an AI request fails, the error message and status code are recorded. Administrators can see these records with your user name.

An incognito turn writes no message, but its token usage is recorded against the AI configuration that paid for it, without naming a chat or a message. An incognito turn on your own API key writes no usage or attempt record.

### 2.9. Activity Counts

The Overseer counts, per day, how many chats you created and how many messages you sent and received, never their content. Incognito chats are counted only in a daily total that names nobody.

### 2.10. Security Events

The Overseer records a security event for each sign-in failure and lockout, rate limit and quota refusal, AI provider refusal and policy rejection, rejected attachment, snapshot refusal (section 2.4), report, and administrator block or hold. An event holds identifiers and codes, never message content. Your IP address is recorded only with sign-in and rate limit events.

The one exception is game text refused under section 2.4: It is kept encrypted so that an administrator can review it, in every kind of chat.

### 2.11. Limit Records

When a usage limit or an AI provider failure ends or cuts an answer, the Overseer records which limit it was, the numbers behind it, the model, and your user name, never the message content. An administrator can open the prompt of that turn to find out what went wrong, except in a confidential or incognito chat. In an incognito chat, the record names no chat and no message, and an incognito turn on your own API key writes no record.

### 2.12. Assistant Feedback Reports

The assistant can write short notes for our developers when it cannot find information, a tool misbehaves, or it corrects a mistake. Credentials, card and account numbers, email addresses and phone numbers are removed from a note before it is stored as a report. The same text is also kept, as written, with the chat's tool calls. Each report is linked to the chat and to you. The problem it describes is also stored on its own, with a count of how often it was reported, and without any link to a chat or a user.

You can turn feedback reports off under **Settings → AI Permissions**.

### 2.13. Message Reports

If you report a message, the following is sent by email to our administrators for review:

- Your user name and email address
- The reported message and its details
- The chat up to and including the reported message

You cannot report a message in a confidential chat.

### 2.14. Provider Safety Identifier

On requests that we pay for, the Overseer sends OpenAI and Anthropic a safety identifier, so that a provider can act on one user instead of on everyone. The identifier is a pseudonym derived from your user ID, not your name, email address or the ID itself. It is not sent on requests made with your own API key, and Google receives none.

### 2.15. Terms of Service Acceptance

The Overseer records each version of the [[Gnoll Overseer Terms of Service]] you accept: the version, the time, and where you accepted it (on the web, in the GnollHack app with the app's version, or on the account website). No IP address or browser details are recorded.

### 2.16. Access Journal

The Overseer keeps a journal of each time a chat or an attachment is read, exported or permanently deleted, and each time an administrator reads refused game text (section 2.10) or the prompt of a limit record (section 2.11). An entry names who did it, whose data it was, and when, and can include an IP address. It never contains the content of a chat.

### 2.17. What Not to Put Into the Overseer

The Overseer is built to hold game data and your own personal data, such as your own notes and logs. Do not put other people's personal data into it: The Overseer protects it in the same way, but that person has no account with us, so we cannot answer an access or erasure request from them. Do not put health, financial or other special categories of personal data into it: The Overseer does not claim to protect them, and we have no agreement with any AI provider that covers them. The Overseer does not scan your messages or files for personal data.

## 3. Purposes and Legal Bases

We use your data only for the purposes below. The legal basis of each is one of those in Article 6(1) of the General Data Protection Regulation (GDPR):

- **Contract**: The processing is needed to provide the advisor you have chosen to use.
- **Legitimate interests**: The processing is needed for our legitimate interests, such as keeping the service working, secure and affordable, and those interests are not overridden by your rights. You can object to it (section 7).

| Purpose | Data | Legal basis |
|---|---|---|
| **Answering your questions, including sending prompts to the AI provider** | Chats, attachments, game context, tool calls, settings, and your own API keys (sections 2.1 to 2.7) | Contract: the advisor you ask to use |
| **Cost and token accounting, and usage limits** | Section 2.8 | Contract |
| **Security, abuse prevention, and fixing faults** | Security events, limit records, attempt records, access journal, and error reports to Sentry (sections 2.8, 2.10, 2.11 and 2.16) | Legitimate interests: security, abuse prevention and fixing faults |
| **Letting an AI provider act on one user instead of on everyone** | Provider safety identifier (section 2.14) | Legitimate interests |
| **Knowing how much the service is used** | Activity counts (section 2.9) | Legitimate interests |
| **Fixing gaps in the assistant** | Assistant feedback reports (section 2.12) | Legitimate interests: fixing gaps; you can turn the reports off |
| **Reviewing a message you report** | Message reports (section 2.13) | Legitimate interests: reviewing a message you report |
| **Showing what you agreed to** | Terms of Service acceptance records (section 2.15) | Legitimate interests: showing what you agreed to |

## 4. Recipients

| Recipient | What it receives | When | Location |
|---|---|---|---|
| **The Overseer server**, run by us | All data in section 2 | Always | United States |
| **OpenAI** (OpenAI, LLC / OpenAI Ireland Ltd), **Anthropic** (Anthropic PBC), and **Google** (Google LLC / Google Ireland Ltd) | The prompt of a turn: your message, the text of attached documents, the earlier messages of the chat, and the results of the tools that ran. OpenAI and Anthropic also receive the provider safety identifier (section 2.14). | Only the provider whose key pays for the turn | Set by the provider; the companies are in the United States and Ireland |
| **Sentry** (Functional Software, Inc.) | Error reports: the fault, its technical context, and a trail of what the Overseer was doing. Credentials and your user record are removed, and request bodies are never sent. | Only when something fails, and never from a confidential or incognito chat | European Union data region, Germany |
| **Azure Communication Services** (Microsoft Corporation) | Account email, and a message you report with the chat and your name and email address | When the account system sends you email, or when you report a message | Microsoft Azure, run by Microsoft Corporation (United States) |
| **GitHub** (GitHub, Inc.) | A search query or a repository reference | Only when the assistant uses one of its two GitHub tools, and never in a confidential chat | United States |
| **An AI coding assistant** used by our administrators | The text of assistant feedback reports (section 2.12), without your name or any link to your chat | When an administrator exports reports to fix the problems they describe | Set by the assistant's provider |

Before a prompt leaves the server, secrets with a recognizable shape are replaced with placeholders, and they are put back in the reply. The AI provider's own web search is not a separate recipient: The query goes to the provider that already answers the turn.

The AI providers keep and use the data on their own terms, which we do not control. Their terms and privacy policies are listed on [[Overseer AI Providers]].

## 5. International Transfers

The Overseer server is in the United States, so your Overseer data is transferred outside the European Economic Area. The AI providers, GitHub, and Microsoft decide in which regions they process the data they receive, and we make no guarantee about the region.

Error reports stay in the European Union: Sentry stores them in its European Union data region, in Germany.

## 6. Retention

The periods below are the Overseer's current defaults.

| Data | Kept for |
|---|---|
| **Normal chat** | Moved to the trash 90 days after its last message, unless you pin it. When you have more than 50 chats that are not pinned, the oldest one is moved to the trash. Deleting a chat also moves it to the trash. A chat in the trash is permanently deleted after 30 days, or when you empty the trash. |
| **Confidential chat** | 30 days after its last message. Deleting it deletes it permanently at once, without the trash. |
| **Incognito chat** | Until you close it, or until it has been inactive for 60 minutes |
| **Attachments** | As long as the chat they belong to |
| **Tool call arguments and results** | 30 days, after which they are removed from the chat. The text of the messages stays. |
| **Cost and usage records** | As long as the chat. Usage and attempt records are deleted with your account. |
| **Attempt records** | 400 days |
| **Security events** | 180 days. The refused game text is deleted after 30 days. |
| **Limit records** | 180 days. Deleting the chat removes the prompt and the record's link to the chat. |
| **Access journal** | 365 days, also after your account is deleted |
| **Activity counts** | Until your account is deleted |
| **Terms of Service acceptance records** | Until your account is deleted |
| **Assistant feedback reports** | Until the chat is permanently deleted or your account is deleted. The stored problem, which has no link to you, stays until an administrator deletes it. |
| **Error reports** | 90 days, after which Sentry deletes them |

When you delete your GnollHack account, all your Overseer data is deleted, including your chats, attachments, API keys, settings, records and reports, except the access journal (section 2.16). The security events behind an account hold or a pending deletion review are kept until the review is decided.

## 7. Your Rights

Under the GDPR, you have the right to:

- Get a copy of your personal data and information about how we use it (access)
- Have incorrect or incomplete data corrected (rectification)
- Have your data deleted (erasure)
- Have the use of your data restricted
- Receive the data you have given us in a machine-readable format and have it moved to another service (data portability)
- Object to processing based on our legitimate interests
- Withdraw your consent at any time, where processing is based on consent, without affecting the processing done before you withdrew it

To use these rights, email us at gnollhack@hyvanmielenpelit.fi. We answer within one month.

You can also act yourself:

- In the Overseer, you can delete chats, empty the trash, export your chats, and turn assistant feedback reports off.
- On the **Personal Data** page of your account settings on [account.gnollhack.com](https://account.gnollhack.com), **Download** gives you a file with your account details, your Overseer chats, and your Terms of Service acceptance records. The text of a confidential chat is not included in the file. **Delete** deletes your account and all your Overseer data. A deletion request may be held for review by an administrator when there is evidence of misuse that may be illegal. You are told when your request is under review, and you receive an email when the deletion is completed or declined.

You also have the right to lodge a complaint with a supervisory authority. In Finland, it is the [Office of the Data Protection Ombudsman](https://tietosuoja.fi/en).

## 8. Security

- All data is sent over HTTPS.
- Your own API keys are encrypted at rest with AES-256-GCM.
- A confidential chat is encrypted with a key of its own, and an incognito chat is not stored in the database or in files.
- Secrets with a recognizable shape are replaced with placeholders before a prompt is sent to the AI provider. A secret without such a shape, such as a password, is not detected.
- Only your account can open your chats. An administrator can open the prompt of a limit record (section 2.11) and refused game text (section 2.10), and each such read is recorded in the access journal.

A normal chat is stored as plain text. The AI provider receives the chat in every kind of chat, including confidential and incognito chats.

## 9. Children

You must be at least 13 years old, or the minimum age required by law in your country, to use the Overseer. If you are under 18, or under the age of legal majority where you live, you may use it only with the consent and supervision of a parent or legal guardian, as set out in the [[Gnoll Overseer Terms of Service]].

If you are a parent or guardian and want a child's data deleted, email us at gnollhack@hyvanmielenpelit.fi.

## 10. Automated Decision-Making

We do not make decisions about you based solely on automated processing that have legal or similarly significant effects.

Usage limits and the game snapshot check (section 2.4) can refuse a chat turn automatically. Repeated snapshot refusals can suspend your access to the AI chat automatically. Account holds and deletion reviews are decided by an administrator. Misuse can lead to limits on your AI use or to a block of your access to the AI chat. A block stops new AI work only: You can still sign in, read and export your chats, change your settings, and delete your account, and the administrator's reason is shown to you.

## 11. Changes to This Policy

We update the date at the top of this page whenever the policy changes.

## 12. Contact

For questions about this policy or your data, email us at gnollhack@hyvanmielenpelit.fi, or write to the address in section 1.
