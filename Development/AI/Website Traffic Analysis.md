The copiable prompt for these instructions is on the [[/Development/AI Instructions]] page.

These instructions analyze the Google Analytics 4 (GA4) data of wiki.gnollhack.com, gnollhack.com, and account.gnollhack.com for a date range. They separate human visitors from automated traffic, analyze the automated traffic where it matters, describe who the visitors are and how they behave, and end with ranked recommendations. The result is a report in the chat. Nothing is written to any repository, and nothing is published or changed in Google Analytics.

They are written for Claude Code in the Claude desktop app with the Google Analytics MCP server connected. Another agent needs a read-only GA4 Data API tool. Access is read-only: never change GA settings, annotations, filters, or data streams. Suggest such changes in the report instead.

## Inputs and Defaults

- **Date range:** Take it from the prompt: explicit dates, "last N days", a month, or a named period. The default is the last 30 complete days, ending yesterday.
  - Never include today, because GA4 data for today is incomplete.
  - Data for yesterday can still change for up to 48 hours. Say so in the report when yesterday is in the range.
- **Comparison periods:** The preceding period of equal length, and the same dates a year earlier when the property has data for them. These are the only baselines: reports are not stored, and earlier reports are never read.
- **Sites:** wiki.gnollhack.com, gnollhack.com, and account.gnollhack.com, unless the prompt names fewer. Other properties in the account, such as test sites, campaign properties, and other organizations' sites, are out of scope unless the prompt names them.

## Privacy Rules

These rules apply to every step and to the report.

- Report aggregates only. Never print a value that can identify a person or an account: email addresses, user names, user or account IDs, confirmation or reset codes, or tokens.
- On account.gnollhack.com, never query `pagePathPlusQueryString`, `pageLocation`, `pageReferrer`, or any other dimension that carries a full URL. Its account pages can carry identifiers and codes in the query string. Use `pagePath` only. The one exception is the URL check below, which filters on `pageLocation` but never requests it.
- On the wiki, read query strings only for `/gollum/search`, to get search terms. Report a search term only when at least two users searched for it, so that one person's query is never repeated.
- To check whether GA collects identifiers in URLs on account.gnollhack.com (Step 2), run one query per parameter, such as `userId`, `code`, `token`, `email`, and `returnUrl`. Filter on `pageLocation` with a pattern such as `[?&]email=`, and request only `pagePath` as the dimension and page views as the metric, so that no URL value is ever returned. Report the pages and the counts for each parameter. Never print a value. A count above zero is a privacy finding for Step 7.

## Before You Start

1. Confirm that the GA MCP tools are available, at least `get_account_summaries` and `run_report`. If they are not, stop and tell the user. Do not scrape the GA web interface in a browser instead.
2. Find the properties by their display names: `wiki.gnollhack.com`, `gnollhack.com`, and `account.gnollhack.com`. Ignore every other property unless the prompt names it. Do not write property IDs into the report.
3. For each property, read:
   - the time zone and currency (`get_property_details`);
   - the key events (`list_key_events`);
   - the custom dimensions and metrics (`get_custom_dimensions_and_metrics`);
   - the annotations (`list_property_annotations`).

   Use what exists. Never assume that an event or a dimension exists.
4. Keep raw query results in the session scratch directory, never in a repository.

## Known Tracking Facts

These facts were verified on November 12, 2026:

| Fact | Effect on the Analysis |
|------|------------------------|
| **Consent on gnollhack.com:** The site loads Google Analytics only after the visitor clicks Accept in its cookie banner | Counts cover consenting visitors only. Treat them as a lower bound, and analyze ratios and trends, not totals. Never compare its visitor counts with those of the other two sites as if they were complete |
| **Consent on the wiki and the account site:** wiki.gnollhack.com and account.gnollhack.com load Google Analytics on page load, with no consent banner | Counts are close to complete for visitors whose browsers run JavaScript |
| **Time zones:** All three properties report in Europe/Helsinki time from November 12, 2026. The wiki property reported in America/Los_Angeles time until that date | Days on the wiki before November 12, 2026 are offset by 10 hours from the other sites' days, and GA does not reprocess them. For a range that crosses the change, compare the wiki with the other sites per week or per period, not per day. Treat the wiki's daily totals for November 11 and 12, 2026 as unreliable, because the switch can shorten or lengthen a day, and check the hourly data before drawing any conclusion about them |
| **Wiki page paths:** On November 10, 2026 the wiki's page paths changed from `/Page Name.md` to `/Page_Name`. The old paths redirect | Normalize paths before comparing pages across that date: strip `.md`, treat spaces and underscores as the same, and treat `/Home` as `/` |
| **Letter case on the account site:** account.gnollhack.com records some paths in more than one letter case, such as `/Identity/Account/Login` and `/identity/account/login` | Normalize account paths to lower case before adding them up |
| **Paid search:** Google Ads brought traffic to gnollhack.com until October 20, 2026, and none after | A comparison across that date must show the channel mix, or the drop will look like lost organic interest |

Recheck the consent rows and the time zones on every run, and report a difference instead of trusting the table:

- **Consent:** Open each site's home page in the built-in browser without accepting cookies, and check whether a `googletagmanager.com` script has loaded. Never click Accept or Decline, and never sign in.
- **Time zones:** Read them with `get_property_details` (Before You Start, step 3). The `time_zone` in a report's response metadata shows the current setting, even for days that GA processed in an earlier zone, so never read a past zone from it.

The other rows are dated history and stay true. New verified facts are added to this table in a later edit of this page, never during a run.

## Step 1: Pull the Data

Run the same queries on every run, so that runs are comparable. Run each query for the range and for both comparison periods, per property. A query with the `date` dimension and several date ranges returns a row for every date in every range, most of them zeros, so run the daily and hourly series once per date range. Put several date ranges into one query only when it has no `date` dimension, for totals per range.

- **Daily series:** `date` with `activeUsers`, `newUsers`, `sessions`, `engagedSessions`, `screenPageViews`, `userEngagementDuration`, `eventCount`, and `keyEvents`.
- **Hourly series:** `date` and `hour`, for every day whose sessions exceed twice the median of the period, and on the wiki for November 11 and 12, 2026 when the range includes them.
- **Acquisition:** `sessionDefaultChannelGroup` and `sessionSourceMedium`. For referrals and AI assistants, also `sessionSource` with `landingPage`.
- **Audience:** `country`, `city`, `language`, `newVsReturning`, `deviceCategory`, `operatingSystem`, `browser`, and `screenResolution`.
- **Content:** `pagePath` and `landingPage`, with views, users, engagement time, and engaged sessions. On the wiki, also `pagePathPlusQueryString` filtered to `/gollum/search`, for the search terms, following the Privacy Rules.
- **Events:** `eventName` with event count and users, so that outbound clicks, file downloads, scrolls, and form starts and submits are visible. For outbound clicks on gnollhack.com and the wiki, add `linkUrl` or `linkDomain` where the property records it. This counts the clicks to Steam, Google Play, the App Store, GitHub releases, and the other two sites. Do not query `linkUrl` on account.gnollhack.com.
- **Account site pages:** `pagePath` with `eventName`, for `page_view`, `form_start`, and `form_submit`, on the registration, email confirmation, login, and password reset pages. A registration can start outside the site, such as in the game, and the confirmation link in the email is often opened in another browser or on another device, so ConfirmEmail can have more users than Register. Use `run_funnel_report` only for Register → RegisterConfirmation, the steps that happen in one browser, and only when at least 30 users reach Register. Otherwise, report counts per page.
- **Cross-site traffic:** The sessions on each property whose source is one of the other two sites.
- **Quota:** Set a `limit`, and prefer one wider query over many narrow ones. Use `return_property_quota` on the first query to learn the budget. Retry a 504 timeout once with a shorter range or fewer metrics, and prefer daily or monthly granularity to weekly over long ranges.

## Step 2: Check Data Quality

Before interpreting anything, list these in the report:

- the tracking coverage of each site (Known Tracking Facts), and any difference found by the recheck;
- whether the range crosses the wiki's time zone change;
- the shares of `(not set)` and `(other)` in the main dimensions;
- thresholding or sampling flags in the response metadata;
- page path variants: the wiki's old and new path formats, and letter-case variants on the account site;
- gaps: days with zero events;
- the annotations in the range;
- the result of the account site URL check (Privacy Rules).

If a check makes a section of the report unreliable, say so in that section instead of leaving the section out.

## Step 3: Separate Automated Traffic

### What GA4 Sees

GA4 drops known bots on the IAB list. What remains is headless browsers that run JavaScript, and referral or ghost spam. Server-side crawlers, such as Googlebot and AI training crawlers that do not run JavaScript, never appear in GA4. State this limit in every report.

### Clusters

Build candidate clusters per property from a signature: `country`, `city`, `operatingSystem`, `browser`, `screenResolution`, and `sessionSource`, over the daily and hourly series.

### Signals

Score each cluster on these signals. No single signal is proof.

1. **Engagement:** An engaged-session rate under 5% and an average engagement time under 2 seconds.
2. **One visit:** One session per user, and almost all users are new.
3. **Burst shape:** Most of its sessions fall within a few hours, or it appears and disappears abruptly.
4. **Data-center location:** Cities that host large cloud regions, such as Ashburn, Boardman, Council Bluffs, The Dalles, Singapore, and Frankfurt, or a `(not set)` city with a cloud-like signature. Never drop a whole country. Check engagement first, because many real visitors live in Singapore and Frankfurt.
5. **Landing pages no person navigates to:**
   - page revision URLs, which have a 40-character hash in the path;
   - `/gollum/history`, `/gollum/compare`, `/.agents/`, `/.claude/`, and `/.gollum/`;
   - raw `.md` paths after the wiki's path change;
   - each session landing on a different deep page.
6. **Referral spam:** A referral source that sends only zero-engagement, single-page sessions and does not link to any of the sites, such as aocr.org in November 2026.
7. **Account form abuse:** On account.gnollhack.com, sessions that land directly on the register, login, or password reset page and fire `form_submit` with no `form_start` or with zero engagement time, or that submit the same form many times from one signature.

### Rule

A cluster that matches signal 1 and at least two other signals is automated. On account.gnollhack.com, signal 7 together with a burst shape is enough.

### Exclusion

Put each automated cluster into an exclusion filter (a `dimension_filter` with `not_expression`) and run the Step 1 queries again with it. Every report gives both the raw figure and the human-only figure, the exact exclusion rule, and the share of sessions it removed.

Never exclude by engagement alone, which would remove real readers of one page, and never exclude a whole channel.

## Step 4: Decide Whether the Automated Traffic Matters

Analyze an automated cluster, instead of only excluding it, when any of these holds:

1. It is more than 10% of the sessions of the period, or it makes a day look like a record. Such a cluster distorts the key figures and misleads anyone who reads the raw GA dashboard.
2. It fires key events or outbound clicks, such as download clicks, which inflates the conversion counts.
3. It systematically visits the site's pages, such as many distinct deep pages or page revisions. This points to scraping, or to an AI or search crawler that runs JavaScript. Report the paths, and whether those paths should be public.
4. It targets paths that are not content, such as `/.agents/` or the `/gollum/` edit and upload pages, or the register, login, or password reset pages of account.gnollhack.com. On the account site, this can mean spam registrations or credential stuffing, so always report it, whatever its size.
5. It recurs: the same signature appears on several days, or on more than one site.
6. It is referral spam, which shows up in the referral reports unless it is filtered.

For each such cluster, report what it did, when, from where, and what it means. Recommend one action: a saved comparison or exploration segment that applies the exclusion rule, a robots.txt or server-side rule, rate limiting or a CAPTCHA on the account forms, or nothing. Do not recommend a GA data filter or the unwanted referrals list for these sessions: GA4 data filters only exclude internal and developer traffic, and the unwanted referrals list only credits the sessions as direct traffic instead of removing them.

## Step 5: Analyze Human Visitors

Use the filtered data from Step 3. Analyze each site, and then the three sites together.

### Volume and Trend

- Users, sessions, engaged sessions, and pageviews per day and per week, compared with both comparison periods.
- Patterns by day of the week.
- Outlier days: more than three median absolute deviations from the median of the period. Explain each with its sources and landing pages.

### Acquisition

- The channel mix, and how it changed.
- The engaged-session rate per channel, compared with both comparison periods. A channel whose volume grows while its rate falls, often Direct, probably still holds automated traffic that the exclusion rule missed. Say so, and name the signatures that remain.
- The top sources, and the landing pages that each source sends visitors to.
- Referrals worth thanking or repeating, such as Hacker News, Reddit, GitHub, and Steam.
- AI assistants, such as chatgpt.com, perplexity.ai, Gemini, and Copilot, as a separate line.
- Search engines other than Google.

### Audience

- Countries and languages, and whether some content would be worth translating.
- New and returning visitors, and whether the wiki is a reference that people come back to.
- Devices and operating systems, compared with the platforms GnollHack is released on: Windows, macOS, Linux, Steam Deck, Android, and iOS.

### Content and Behavior

On the wiki and gnollhack.com:

- The top landing pages, and the top pages by total engagement time, not only by views.
- Pages with many entrances and low engagement, which point to unmet intent.
- The wiki's search terms, grouped by topic. A term with no matching page is a content gap; check on disk whether a page exists before calling it one.
- The paths visitors take from the landing page to a second page, where the data allows.

### Account Site

- **Registrations:** Completed registrations, measured as ConfirmEmail page views. Register → RegisterConfirmation as a funnel or as counts (Step 1), with form starts compared with form submits. When ConfirmEmail has more users than Register, say that registrations also start outside the site, and that the account database can confirm where.
- **Login and password reset:** Their volume. Many resets compared with logins point to friction.
- **Community pages:** The use of the top scores, recent games, bones transactions, and statistics pages, and whether their visitors arrive from the game, the wiki, or gnollhack.com.
- **Returning visitors:** How many registered players come back.

### Conversion

- **gnollhack.com:** Click-throughs to the stores and downloads, per landing page and per source.
- **The wiki:** Visits to `/Download`, and outbound clicks to the stores.
- **The account site:** Completed registrations, measured as ConfirmEmail page views, per source.

Show a conversion rate only where its denominator is at least 30 sessions.

### Cross-Site Flow

How many visitors move between each pair of the three sites, in each direction.

## Step 6: Interpret with Care

- **Small numbers:** Below 30 sessions, give counts, not percentages, and do not call a change a trend. Treat a change of less than 20% up or down on fewer than 100 sessions a day as noise, unless it lasts several weeks.
- **Measured or inferred:** Say which each finding is. A traffic change after a release or a post is a hypothesis until the source data supports it.
- **Evidence:** Every finding cites its numbers and the dimension that shows them.
- **No invented causes:** If the data cannot explain a change, say so, and name the source that could, such as server logs, Google Search Console, Steam traffic statistics, or the account database.

## Step 7: Recommendations

Each recommendation names its evidence, the action, who would do it, and the expected effect. Rank the list by impact and effort, in these groups:

1. **Marketing and community:** Which channels and posts work, where to post, and which referrals are worth repeating.
2. **Content and search:** Pages to write or improve, based on the search terms and the pages with unmet intent, and the pages that bring new players.
3. **Conversion:** Shorter paths from a page to a store or a download, and from the game to a completed account registration.
4. **Tracking and data quality:** Saved segments or comparisons for human-only figures, events to add, and consent coverage.
5. **Privacy and compliance:** Stated as questions for the site owner, not as legal advice, such as consent handling that differs between the sites, or identifiers in collected URLs.
6. **Security and exposure:** Only when Step 4 found something.

## Step 8: Report to the User

Report in the chat, in this order:

1. **Summary:** The five to eight findings that matter most, each in one sentence with its number.
2. **Scope:** The sites, the date range, the comparison periods, the time zones, and the data freshness.
3. **Data quality and tracking coverage** (Step 2).
4. **Automated traffic:** What was excluded and how much, and the clusters that mattered and what they did.
5. **Human visitors:** Trend, acquisition, audience, content and behavior, account registrations, conversion, and cross-site flow. One subsection per site, and then a combined view.
6. **Recommendations**, as in Step 7.
7. **Open questions:** What the data could not answer, and which source would.
8. **Appendix:** The exclusion rule and the list of queries run.

After the report, offer once, in one line, to publish it as a private Artifact page with charts. Publish it only if the user says yes, and follow the Privacy Rules on that page too. Never save the report to a file in a repository, and never post, send, or change anything.
