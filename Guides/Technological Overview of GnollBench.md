![GnollBench](/uploads/GnollBench/gnollbench-logo-256-v3.webp)

> 👉 **GnollBench is the Gnoll Overseer's AI benchmarking system: a domain-specific, agentic, rubric-graded evaluation. This page describes it for readers who are familiar with model evaluation: the harness, the scoring model, the two-company grading panel, the grader protocol, the advisory evidence layer, run comparability, and the statistics used for repeated runs and for comparing conditions and models.**

> ℹ️ **Note:** This article describes GnollBench as of October 2026: harness version 45 and scoring method version 13. Figures such as limits and thresholds may change in later versions.

> ℹ️ **Note:** This is part 3 of the three GnollBench guides. Part 1, [[/Guides/Introduction to GnollBench]], is for newcomers. Part 2, [[/Guides/Advanced Guide to GnollBench]], explains scoring, grading, and repeated runs. Part 3, **Technological Overview of GnollBench**, gives the formulas and statistics.

## 🐺 GnollBench at a Glance

| | GnollBench |
| :--- | :--- |
| **What it is** | The Gnoll Overseer's AI benchmarking system: a domain-specific, agentic, rubric-graded evaluation of GnollHack question answering |
| **What it tests** | The production chat: same system prompt, same tools, same limits |
| **Standard suite** | 18 questions: 6 Simple, 6 Intermediate, 6 Advanced (custom suites up to 50) |
| **Graded on** | Accuracy 55%, Completeness 25%, Conciseness 10%, Readability 10% |
| **Results** | Intelligence Index, Speed Index, Cost, plus outcome figures |
| **Who runs it** | The Overseer's administrators. Preliminary results have been published as an executive summary; per-run details (answers, grades, rubrics, diagnostics) remain for internal use, and interested parties can request results, which can be anonymized for that purpose. This article describes the method only |
| **Roles in a run** | Candidate; assessor and co-assessor (the two-company grading panel); optional Second Reader or Reference Reader; optional claim verifier; optional report writer |
| **Candidate tools** | 16 read-only tools |
| **Per-question limits** | 45 tool calls, 22 tool rounds, 28 model calls, timeout 420 / 600 / 720 s by difficulty band |
| **Comparability** | 27 keys of 4 kinds, resolved to 4 outcomes (Tier A, B, C, or not comparable) |
| **Minimum runs** | Reproducibility figures need at least 3 runs; item analysis needs at least 4 |
| **Version described** | Harness version 45, scoring method version 13 |

## 🏗️ GnollBench Design Goals

In a GnollBench run, a candidate model answers GnollHack questions with tool access, and a panel of two judge models from two providers grades each answer against a per-question rubric. The purposes are ranked: first to debug and improve the production chat, second to improve GnollBench itself, and third to compare models on quality, speed, and cost.

Three principles shape most of the design:

- **The production configuration is the instrument.** The candidate runs under the production chat's own system prompt and tool set, not under a test prompt. Every score is therefore an empirical statement about what real users get, and every change to the prompt or the tool guides is a change to the measuring instrument.
- **Scoring roles score; everything else advises.** The two panel members, or the single assessor of a single-assessor run, set the score. Everything else (reader verdicts, claim verification, consistency checks, re-grades, report documents) produces advisory evidence that is counted and reported but cannot move a score, because a metric that a later pass can freely revise is not reproducible. The single, bounded exception is the claim verifier settling a critical error that only one panel member flagged. It is bounded on purpose: it never sets a level, never overrides two agreeing members, and an undecided ruling keeps the average.
- **Refuse rather than mislead.** When a number would not mean what it appears to mean, GnollBench withholds it: no indices for a run with provider failures, no pooled statistics for runs that are not comparable, no reproducibility figures below three runs.

> ℹ️ **Term — instrument:** Everything that stands between the model and the number: the prompt, the tools, the corpus the tools read, the rubrics, the graders, and the scoring rules. Two results are comparable only if they were taken with the same instrument.

## ⚙️ GnollBench Harness Architecture

### 🤖 Candidate Execution

Each question is an independent single-turn agentic task. The candidate receives the production system prompt, built in the chat's default configuration: gameplay-help mode, concise response style, tool use enabled, source code references disallowed, and web search, sub-agents, and spoiler-free mode off. The options used are recorded on the run and printed in the report, because the response style in particular bounds what Completeness and Conciseness can mean.

Source code references are disallowed by default because that is the production default: a user's own setting for them is off unless the user turns it on. The two values give the candidate opposite instructions (cite files and lines, or never cite them), so they produce different system prompts. Since harness version 44 the default matches production; runs up to harness version 43 graded the *allowed* branch.

Sixteen read-only tools are available: search and page view for the GnollHack wiki and the NetHack wiki, the wiki's monster and item lookups, the curated knowledge base, monster, item, and artifact statistics, and the source code tools (search, file view, function and constant definitions, definition search, file listing). One deliberate difference from live chat is that no wiki context is pre-injected into the question; retrieval is entirely the candidate's own work.

Two roles run under their own per-question budgets:

| Limit | Candidate | Claim verifier |
| :--- | :--- | :--- |
| **Tool calls** | 45 | 15, plus 1 per checked item, at most 30 |
| **Tool rounds** | 22 | At least 8, and at least half the tool-call budget |
| **Model calls** | 28 | At least 12, and at least the tool rounds plus 4 |
| **Wall-clock timeout** | 420, 600, or 720 seconds for the Simple, Intermediate, and Advanced band of the question's assessed difficulty | 300 seconds per answer |

The candidate is warned as its tool budget runs low. The live chat's defaults are kept at least as permissive, so GnollBench never credits behavior production would cut off.

Before the first question, and again on each question's own request, a delivery probe builds the request through the real provider adapter and checks that the system prompt, and the game snapshot if there is one, are actually in it. A run refuses to start if the probe fails.

### 🧑‍⚖️ Grading Pipeline

Grading is pipelined behind answering: as soon as an answer exists it is assessed, its claims are verified, and a reader's verdict is taken if one is due, while the next question is already being answered. In a panel run both members grade the answer concurrently, and the reference reader waits for both. A short serial tail handles work that depends on the whole run, and the run ends with synthesis (one per panel member in a panel run) and index computation. Questions are answered sequentially by default, which is the timing mode under which speed figures are comparable. After the run has completed, an optional report writer can write the run's documents.

Before grading, the answer is scrubbed of transport artifacts such as leaked tool-call payloads, control tokens, and reasoning narration, so that the graders grade authored text only. Turn duration is never shown to the graders.

## 📐 The GnollBench Scoring Model

Each of four dimensions is rated on a behaviorally anchored scale of levels 0–6, mapped non-linearly to points:

| Level | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Points** | 1 | 15 | 35 | 55 | 72 | 87 | 100 |

The per-answer quality score is a weighted geometric mean of the four point values, with Accuracy $A$, Completeness $C$, Conciseness $Cn$, and Readability $R$:

$Q = A^{0.55} \cdot C^{0.25} \cdot Cn^{0.10} \cdot R^{0.10}$

The result is clamped to 1–100 and rounded. Geometric aggregation makes the dimensions non-compensatory: with Accuracy at level 1 and everything else at level 6, $Q$ is 35, where an arithmetic mean would give 53.

> 💡 **Example:** An answer rated Accuracy 5, Completeness 4, Conciseness 6, and Readability 5 carries the point values 87, 72, 100, and 87. Its quality score is $Q = 87^{0.55} \cdot 72^{0.25} \cdot 100^{0.10} \cdot 87^{0.10} \approx 84$.

A **critical error** caps $Q$ at 25. It is defined as a confidently asserted, material falsehood that a player would act on to their detriment. It must be a claim the answer makes (an omission never qualifies), and the assessor must return the offending sentence verbatim. The harness checks that the quote occurs in the answer and discards a critical error it cannot verify this way.

The critical error is **grounded in the answer key**: only a claim that the rubric's ground truth or the game board contradicts qualifies. A claim the grader believes false from its own knowledge alone is returned as a suspected-false unverified claim, which the claim verifier checks; it never caps. A statement the answer marks as **tentative** ("I believe…", "in NetHack this is X, but GnollHack may differ") is graded for Accuracy as the claim it makes, and is not a critical error, since it is not confidently asserted, unless it recommends an action that the rubric's CRITICAL ERROR section names.

**Not attempted.** The grader also returns a not-attempted flag. It is true when the answer does not give what the question asks for and states why: it could not find, or could not verify, the information. It may add what it did find, where to look, or behavior it labels as NetHack's. It is false for an answer that gives a value, an outcome, or a recommendation, however tentatively, for a refusal on any other ground, and for an answer that does not address the question. The flag changes none of the four levels. When it is true, there is no critical error, and the Accuracy level is 5 or above, $Q$ is raised to the profile's **not-attempted score**, 50 by default:

$Q \leftarrow \max(Q, S_{NA})$

The floor is applied before rounding and before the cap. Because it requires that there be no critical error, the floor and the cap never apply together. Without it, an honest abstention with Completeness at level 0 scores about 32, below a substantially wrong answer at about 48, so the scoring would reward a guess. With it, an abstention (50) is worth twice a capped dangerous error (at most 25). With a correct answer scoring about 92, the implied confidence threshold for answering rather than abstaining against a dangerous error is

$t = \frac{S_{\text{abstain}} - S_{\text{wrong}}}{S_{\text{right}} - S_{\text{wrong}}} = \frac{50 - 25}{92 - 25} \approx 0.37$

while against a substantially wrong but harmless answer, abstaining and being wrong roughly tie.

Weights, level points, the ceiling, the not-attempted score, the speed constants, and the reader settings live in a **scoring profile**. The profile is snapshotted into each run, so a report can always state what it was scored with, and old runs can be re-scored under the rules that produced them.

## 👥 The Two-Company Assessor Panel

A run can be graded by a **panel** of two assessors: the assessor (member A) and the co-assessor (member B). Since late September 2026 this is the standard configuration. Its roster rules:

| Rule | How it is held |
| :--- | :--- |
| **The two members come from two different providers** | A launch that breaks it is refused |
| **Neither member is the model under test** | A launch that breaks it is refused. When a set's candidates include a member's model, an older model of the same family grades every run of the set |
| **The panel is fixed across every run that is compared** | The panel is part of the assessor comparability key |

Both members grade every answer concurrently, with the identical prompt, blind to each other. The published quality of an answer is the mean of the two members' scores:

$Q_{\text{panel}} = \frac{Q_A + Q_B}{2}$

It takes the place of $Q$ in the Intelligence Index, its standard error, and the unweighted mean. An answer without both members' scores is excluded, and the run ends *Completed with errors* until the missing assessment is retried; it is never silently indexed on one member.

### ⚖️ Critical-Error Resolution

Since scoring method 13, a critical error in a panel run is **confirmed** before it caps the panel score. When the members split, the claim verifier's ruling on the flagging member's quote decides which member scores the mean uses:

| Resolution | When | Member scores averaged |
| :--- | :--- | :--- |
| **Agreed** | Both members flag it | Both as graded (both capped) |
| **Upheld by verifier** | One member flags it; the verifier refutes the quote | The flagging member as graded; the other capped at 25 |
| **Overturned by verifier** | One member flags it; the verifier supports the quote | The flagging member's pre-cap score; the other as graded |
| **Unresolved** | One member flags it; the verifier's ruling is indeterminate, or there is none | Both as graded: the plain average |

A **confirmed** critical error is one resolved as Agreed or Upheld, or the assessor's flag in a single-assessor run, whose score the verifier never changes. An unresolved split stays averaged because, with no further information, the average is the expected value. This is the first and only path by which a verifier ruling moves a score, so it is kept narrow: it settles splits only, never overrides two agreeing members, and never changes a level.

### 📏 Panel Statistics

The panel's agreement is reported over the answers both members scored, as advisory figures:

- **Mean absolute and mean signed difference**, |B − A| and B − A.
- **ICC(A,1)**, the two-way random-effects, absolute-agreement, single-rater intraclass correlation, reported from 5 pairs upward. Unlike the mean difference, it reads agreement against the spread of the answers themselves, and it counts a constant offset between the members as disagreement.
- **Disagreements**: answers more than 15 points apart, or split on the critical error.
- **Member-alone indices**: each member's own difficulty-weighted index over the answers the panel scored. They are diagnostics, never an alternative result.

The evidence-informed re-grade is single-assessor only: it re-grades as member A alone, which would give one family's judge a correction channel that the other lacks. A panel run reads its member-alone indices instead.

### 🧠 Why a Panel

AI judges show **same-family preference**: they tend to grade their own provider's models more favorably. GnollBench grades candidates from several providers, and no single provider is a neutral judge for all of them, so the panel does not look for a neutral judge; it balances two partial ones. If member A inflates its own family's candidates by $\gamma_A$ and member B its own by $\gamma_B$, the gap the panel mean reads between those two families is off by

$\frac{\gamma_A - \gamma_B}{2}$

which is zero when the two preferences are equal and half the difference when they are not. Juries of judges from different model families are known to outperform a single judge. The cross-model view adds **judge-family diagnostics** for panel runs, described under [[Several Models|#several-models]].

## 📜 The GnollBench Grader Protocol

Most of the scoring method's revisions have been rules that constrain the judge, each prompted by an observed grading failure. The current protocol:

| Rule | Why / detail |
| :--- | :--- |
| **Accuracy is graded against the rubric and the game snapshot only** | A statement the assessor believes false from its own knowledge, which neither source settles, does not lower the level. It is returned as a *suspected false* unverified claim, and the claim verifier checks it |
| **Accuracy grades what the answer states** | Depth, length, and source-level detail are not Accuracy criteria. A two-sentence answer with no false statement is level 6; what it leaves out belongs to Completeness |
| **Every level below 6 must name a defect** | A no-fault evidence string may accompany level 6 only |
| **An omission is never an Accuracy deduction** | Charging it on both dimensions would cost 80% of the quality weight for one defect |
| **The question defines the scope of Completeness** | A rubric point the question did not ask for is recorded under an out-of-scope marker and not deducted |
| **A rubric's format suggestion is not a Readability criterion** | It is recorded under a form marker and not deducted, since the production prompt asks for concise prose and the candidate should not be punished for obeying it |
| **Unverifiable is not false** | A claim the rubric neither states nor contradicts goes to a list of unverified claims, quoted verbatim, and is never the basis of a deduction |
| **The rubric's SOURCE line is provenance** | It records where the rubric's author found the facts, not the list of correct citations. A citation the SOURCE line does not name is a claim to verify, never a deduction by itself |
| **Critical errors come only from the answer key or the board** | A claim the grader believes false from its own knowledge is a suspected-false unverified claim, not a critical error |
| **Not attempted, uncertainty, and alternatives** | An honest abstention is flagged as not attempted, without changing the levels. A tentative claim is graded as the claim it makes. Alternatives offered instead of an answer earn no Completeness for that point, and each alternative is graded as a claim |

The markers make the instrument's own share of a shortfall measurable: the report counts how many out-of-scope and form points were recorded, and how many sit next to an unexplained deduction.

All candidate text reaches the graders fenced as untrusted data, with an explicit instruction never to follow instructions inside it. Grading instructions are sent as a fixed, cacheable prefix, with the snapshot (if any) ahead of the question.

## 🔎 Advisory Evidence Layer

### 🚩 Verdict Consistency Flags

The harness reads each verdict for internal contradictions and raises advisory flags. None of them changes a score; most route the answer to the Second Reader.

| Flag | Raised when |
| :--- | :--- |
| **Contested verdict** | The assessor's own prose describes a fabrication, its Accuracy level is 4 or below, and its critical-error flag is false. A sentence that calls the defect trivial, minor, or an imprecision is exempt |
| **Unevidenced deduction** | Accuracy or Completeness is below 6, and the stated evidence names no defect, or grounds the deduction only in unverifiability or missing precision |
| **Omission charged as accuracy** | An Accuracy deduction cites only something the answer left out |
| **Out-of-rubric accuracy deduction** | An Accuracy deduction rests on the assessor's own knowledge and not on the rubric |
| **Dimension outlier** | One dimension is at level 0 or 1 beside three at level 3 or above, with no defect of that kind named |
| **Refuted claim** | The claim verifier refuted an unverified claim, with a citation |
| **Contested critical error** | The claim verifier found the quoted critical-error sentence to be true |
| **Contested accuracy deduction** | The claim verifier refuted the assessor's basis for a deduction, or supported a sentence the assessor charged as false |

### 👀 Second Reader and Reference Reader

An optional reader, ideally of comparable strength and from a different provider, grades answers again. In a single-assessor run it is the **Second Reader**; in a panel run it is the **Reference Reader**. It is **blind** by default: it sees the question, the rubric, the answer, and any claim-verification findings, but not the graders' verdicts. It never scores. The reader is an independent reader whose job is to expose fragile verdicts and measure agreement, not an adjudicator.

In a single-assessor run, five modes control the selection:

| Mode | Answers graded twice |
| :--- | :--- |
| **Off** | None |
| **Flagged** | Those that fire a per-answer trigger |
| **Flagged and outliers** | Flagged, plus answers more than 25 points below the run's median |
| **Flagged plus sample** (default) | Flagged, topped up with the lowest-scoring remaining answers to a minimum of 4 |
| **All** | Every answer |

The triggers are evaluated in a fixed order of evidential strength:

1. Critical error
2. Refuted claim
3. Contested verdict
4. Out-of-rubric deduction
5. Unevidenced deduction
6. Omission charged as accuracy
7. Dimension outlier
8. Unresolved unverified claims
9. A quality score below 50

Agreement is reported as the mean absolute and the mean signed difference between the two quality scores, with a **disagreement** defined as a gap above 15 points or a split on the critical error. Only the *All* mode yields an unbiased agreement rate. Under the trigger-based modes, the sample is conditioned on the first assessor's own uncertainty, and a first assessor that is confidently wrong fires no trigger at all. The reader is blind because a second judgment shown the first one drifts towards it, and agreement figures from blind and non-blind runs are not comparable.

In a panel run, the two members already grade every answer, so the reader has a different job: it is a third-family anchor for the panel's balance. It is forced to *All* and blind whatever the mode, waits for both members, and is compared with the panel score. A critical-error split counts only where both members agree and the reader differs. A reader more than 15 points from the panel score, or opposite to a critical-error verdict both members agree on, marks the answer as disputed for a human.

### 🔬 Claim Verifier

An optional role with read-only tools checks individual statements against the wiki and the source code, under its own budget, scaled to the number of items it checks: 15 tool calls plus 1 per item, at most 30, with tool rounds and model calls scaled to match, and 300 seconds per answer, as listed in the harness limits table. It receives unverified and suspected-false claims, the quoted critical-error sentence, the sentences a grader charged as false when the answer is at Accuracy level 5 or below, and the assessor's own factual statements when a verdict is contested. In a panel run it runs once per answer, over the union of both members' charges, and records which member raised each item.

Each claim gets a verdict of **Supported**, **Refuted**, or **Indeterminate**, and the rules are strict:

- A Supported or Refuted verdict needs a citation: a source file with the deciding lines, a wiki page, or a quoted snapshot line. Without one, it is read as Indeterminate.
- A cited function must have a live call site, since the codebase retains superseded code that decides nothing.
- For a number (a timer, a price, a probability, a formula), the code that applies it decides, not a wiki page alone.
- Absence is only concluded after every place an effect could be applied has been ruled out.
- The verifier judges facts, not advice, and checks whether a claim and the code state the same quantity in different notation before refuting it.
- When a claim joins several statements, the verdict is about the charged part only: the words the grader quoted, or the part its evidence names. A true clause elsewhere in the sentence does not make a false charged part Supported.
- A GnollHack wiki statement of the property in question is overridden only when the verdict names it and cites the code that overrides it; otherwise the verdict is Indeterminate.
- Indeterminate is a normal outcome and is preferred to a guess.

In a single-assessor run, when the verifier's findings contest a verdict, the assessor re-grades the answer once with the findings in hand. This **evidence-informed re-grade** is stored separately, may only withdraw deductions that the findings bear on, and feeds an advisory sensitivity figure. No scoring path reads it. A panel run has no such re-grade. The verifier's only effect on a score is its ruling on a critical-error quote in a panel run, which settles a split between the members, as described under [[Critical-Error Resolution|#critical-error-resolution]].

## 📊 GnollBench Indices and Uncertainty

### 🧠 Intelligence Index

With $q_i$ the quality score and $w_i$ the assessed difficulty (1–100) of item $i$:

$I = \frac{\sum w_i q_i}{\sum w_i}$

Its standard error, reported from three items upward, is

$SE = \frac{\sqrt{\frac{n}{n-1} \sum w_i^2 (q_i - I)^2}}{\sum w_i}$

and the 95% interval is $I \pm 1.96 \cdot SE$. This is **item-sampling error**: how far the index would move had the suite drawn different questions of the same kind. It says nothing about run-to-run variance, which a single run cannot estimate. The unweighted mean quality is reported beside the index, because the direction in which weighting moves the headline depends on which questions a model got wrong.

Assessed difficulty is an a priori rating by an administrator-chosen model, required on every question before a run. It is a fundamental part of the instrument: re-rating a suite breaks comparability with its earlier runs.

### 🏃 Speed Index

Speed is scored on **model time**, the turn duration minus tool execution time, against a target that scales with difficulty $d$:

$T(d) = 2000\text{ ms} \cdot (1 + \frac{d}{100})$

$S = \text{clamp}(100 - 12 \cdot \log_2 \frac{t_{\text{model}}}{T(d)},\ 1,\ 100)$

> 💡 **Example:** At difficulty $d = 50$ the target is 2000 ms × 1.5 = 3 seconds. A model time of 12 seconds is two doublings of the target, so $S = 100 - 12 \cdot 2 = 76$.

The Speed Index is the unweighted mean of $S$. Difficulty enters through the target and not through the weight; doing both would count it twice. The constants are pinned by two invariants that are enforced by tests. First, the floor of the scale, reached at about 304 times the target, must be unreachable within the per-question timeout at every difficulty, so that every answer that did not time out gets a distinguishing score. This is the reason the timeout is banded. Second, a score of 100 must stay reserved for genuinely fast turns.

The Speed Index is comparable only within one thinking level and one timing mode. It also saturates for fast models, so the cross-model view lets the speed axis be chosen: mean model time per question (the default), total model time for the suite, median time to first token (TTFT P50), or the Speed Index, which carries a saturation warning when at least half the answers score 100.

### 🪙 Cost

Token usage is recorded per role (candidate, assessor, co-assessor, Second or Reference Reader, claim verifier, synthesis, co-assessor synthesis) and priced from a snapshot of the price list taken at run time, including long-context pricing and the service tier the provider actually served. An unknown price is reported as unknown, never as zero. The report writer's documents are costed outside the run.

### 🎯 Outcome Figures

From scoring method 13, the answers that count toward the index are also classified, in first-match order:

| Class | Rule |
| :--- | :--- |
| **Incorrect** | A confirmed critical error, or mean Accuracy level ≤ 2 |
| **Not attempted** | The assessor's not-attempted flag; in a panel run, both members' |
| **Correct** | Mean Accuracy level ≥ 5, mean Completeness level ≥ 4, and no critical-error flag from either member |
| **Partial** | Everything else |

The mean level is the mean of the two members' levels in a panel run, and the assessor's own otherwise. A model-produced empty answer is counted as **no answer**. The run reports the count of each class, the confirmed, unresolved, and overturned critical errors with their questions, and three rates:

- **Confirmed critical-error rate**: confirmed critical errors $k$ over the $n$ classified answers, with a 95% **Wilson interval**. With $\hat{p} = k/n$ and $z = 1.96$:

$\frac{\hat{p} + \frac{z^2}{2n}}{1 + \frac{z^2}{n}} \pm \frac{z}{1 + \frac{z^2}{n}} \sqrt{\frac{\hat{p}(1 - \hat{p})}{n} + \frac{z^2}{4n^2}}$

- **Correct when attempted**: correct ÷ (correct + partial + incorrect).
- **Wrong instead of abstaining**: incorrect ÷ (incorrect + not attempted): of the answers that were either wrong or declined, the share in which the model gave a wrong answer instead of abstaining.

> 💡 **Example:** One confirmed critical error in 18 classified answers is a rate of 5.6%, with a Wilson interval of about 1.0% to 25.8%. The interval is wide because the sample is small, and unlike the simpler Wald interval it stays sensible at small $n$ and near 0.

These figures are reporting only: nothing in them feeds an index. They follow the practice of reporting harm separately from quality, and of reporting correct, incorrect, and not attempted answers separately, so that guessing is visible on its own.

## 🛡️ Run Integrity

Every answer falls into exactly one integrity bucket:

| Bucket | Meaning |
| :--- | :--- |
| **Clean** | The answer has no integrity problem |
| **Recovered** | Artifacts were scrubbed, and the answer beneath was graded normally |
| **Harness limit** | A configured cap was reached; the answer is valid |
| **Transport defect** | The answer is empty or truncated, or the provider returned an error |
| **Unanswered** | No answer was produced |

Three rules follow from the buckets:

- **Provider failures are separated from model failures.** Rate limits, overloads, and outages are recognized from the type of the failure and the provider's own error codes. Such an answer is never sent to the assessor, and a run with any terminal provider failure publishes **no indices**, because an index over the questions that happened to finish describes only part of the instrument. Failed questions can be re-run later to repair the run.
- **An unanswered question scores 0.** If the provider reports a normal stop and there is no answer, the candidate failed the question. Excluding it would let a model raise its index by not answering.
- **Aborted runs keep their totals and get no score.** A canceled or interrupted run records its cost and elapsed time, and re-scoring it is refused.

A GnollBench run ends as *Completed*, *Completed with limits* (valid, but a cap was reached), *Completed with errors*, *Failed*, or *Canceled*.

## 🔗 Comparability of GnollBench Runs

Whether runs may be averaged or compared is decided mechanically. Each run is projected onto 27 named keys of four kinds:

| Kind | Examples | A difference means |
| :--- | :--- | :--- |
| **Fundamental** (4) | Suite, revision of every question, assessed difficulties, snapshot hash | Different exam. Not comparable |
| **Candidate** (10) | Provider, model, endpoint, thinking level, reasoning settings, service tier, output limit, parallel execution mode, prompt options | Different subject. Not comparable |
| **Instrument** (10) | Hash of the system prompt, hash of the tool guides, knowledge base revision, harness and scoring method versions, scoring profile, the three grader configurations, per-question limits | The measuring apparatus moved |
| **Speed and cost** (3) | Question parallelism, speed calibration, price snapshot | Speed or cost aggregates mix conditions; quality does not |

These resolve to a tier:

| Tier | Rule | Consequence |
| :--- | :--- | :--- |
| **A — Replicate** | Every key matches | Everything may be pooled |
| **B — Quality-comparable** | Only speed-and-cost keys differ | Quality pools; the affected speed or cost aggregates are flagged as degraded |
| **C — Cross-condition** | Exactly one instrument key differs | Never pooled; the two sides are *compared* |
| **Not comparable** | Anything else, including two or more instrument differences | Group creation is refused |

A verdict always names the keys that differed and their values. Related settings form one composite key, so that one deliberate grader swap counts as one difference, and the scoring profile is keyed on its scoring semantics, so that renaming a profile does not end a series. Two or more instrument differences are refused and not treated as Tier C, since Tier C's whole claim is that exactly one thing was varied.

A grading panel is folded into the assessor key, so two panel runs under the same panel and reader differ in no grader key. Moving from a single assessor to a panel is one instrument difference, provided the earlier run already used the same reader on every answer, blind; otherwise the reader key differs too. The report writer is not a key: it grades nothing and writes after the run has been scored. Scoring method 13 moved the scoring method version, the harness version, and the scoring profile together, so a method-13 run is not comparable with any earlier run.

Each run also records the revisions of the GnollHack wiki and source code that its tools read, as provenance for findings about that content.

> ℹ️ **Term — fingerprint:** A short hash of a larger text. If two runs carry the same fingerprint of the system prompt, the prompt was byte-for-byte identical.

## 🔁 Multi-Run Statistics

A single run's interval covers item sampling only. Whether a two-point change is real depends on run-to-run noise, which only replication measures.

A **series** is an execution concept: the same validated configuration launched *N* times, strictly sequentially. A **group** is an analysis concept: a named set of runs to compute statistics over. A completed series creates its group automatically when at least two of its members succeeded, and GnollBench asserts that the group resolves to Tier A.

**Point estimate.** The multi-run index is the mean of the $R$ per-run indices, recomputed with a fixed per-item weight so that it equals the difficulty-weighted mean of the per-item cross-run means. If some run lacks a scored answer to some item, the identity breaks, and the report says which route it shows.

**Two uncertainty components** are reported separately and then combined:

| Component | How it is computed | Shrinks with more runs? |
| :--- | :--- | :--- |
| **Reproducibility** | The standard deviation of the per-run indices divided by $\sqrt{R}$, with a Student's *t* critical value | Yes |
| **Item sampling** | The single-run formula applied to the per-item cross-run means | No, since every run answers the same items. Only more questions reduce it |

$h = \sqrt{(t_{R-1} \cdot SE_{\text{repro}})^2 + (1.96 \cdot SE_{\text{item}})^2}$

> 💡 **Example:** With $R = 3$ runs, a reproducibility standard error of 1.0 and an item-sampling standard error of 3.0, the combined half-width is $h = \sqrt{(4.30 \cdot 1.0)^2 + (1.96 \cdot 3.0)^2} \approx 7.3$. The item-sampling part dominates, and it would not shrink with more runs.

Below **three runs**, no reproducibility figure is reported at all, and the interval is labeled as covering one source. Interval bounds are clamped to 0–100 and marked as truncated; half-widths are never clamped.

Per item, the group reports mean, median, sample standard deviation, interquartile range, coefficient of variation, a *t*-based interval, and the critical-error rate, which counts only confirmed critical errors from scoring method 13 on. An item with a sample standard deviation of 15 points or more is flagged **unstable**, and a critical-error rate strictly between 0 and 1 usually points to a rubric that does not decide a borderline case. Each dimension is also pooled separately (unweighted), which is how a persistent Completeness gap becomes visible. Speed adds pooled model-time percentiles (P50, P90, maximum), and cost adds per-role dispersion, since cost is the least reproducible quantity a replicate set measures.

One limit is stated on every report: **run-to-run variance mixes candidate and grader randomness.** Each run produces a new answer that is graded once, so an unstable item may mean the model answers differently each time or the grader scores alike answers differently. Separating them requires re-grading identical answers.

The multi-run report contains no AI-written prose. Every figure is reproducible from the stored answers.

## ⚖️ Comparing Conditions and Models

### 🔀 Two Groups

The verification case is a baseline replicate set against a treatment set that differs in exactly one instrument key, for example an edited tool guide. Items are paired by question on their cross-run mean quality, as treatment minus baseline, and only when both groups were graded under the same revision of the question; the rest are counted and excluded. The statistics read each run's own recorded exam, so later edits to the suite do not change them.

| Statistic | Role |
| :--- | :--- |
| **Mean paired difference with 95% interval** | The effect, on the familiar scale |
| **Wilcoxon signed-rank test** | The primary test; exact *p*-value up to 25 pairs, a corrected normal approximation above |
| **Paired *t*-test** | Secondary, for readers who expect it |
| **Cohen's *d*z** | The paired effect size |

Per-item differences use Welch's *t*-test under Benjamini–Hochberg control at *q* = 0.05, and are always labeled **exploratory**. The acceptance criterion should be fixed before the treatment set is run, and judged on the paired difference and its interval, not on the two point estimates.

### 🏆 Several Models

The cross-model view places runs or groups of one suite side by side on quality, speed, and cost. Models are never pooled; each source is one point with its own interval. A source measured on a different instrument than the reference, most importantly by a different assessor or panel, is shown **without any measures**, since a change of grader can move scores more than the difference between candidates. Two quantities the view refuses to chart:

| Not charted | Reason |
| :--- | :--- |
| **Cost per index point** | A ratio of two noisy estimates |
| **All-pairs significance matrix** | Uncorrected multiple testing |

When every compared run is a panel run under the same panel and reference reader, the view adds **judge-family diagnostics**: indices and rankings under each member alone, the panel, and the reference reader; pairs of models whose order depends on which member graded; a family gap table with an asymmetry estimate against the reference reader; and an audit of how often the claim verifier overturns each member's charges, split by candidate family. None of them changes a score.

## 🩺 Suite Health and Item Analysis

Item analysis is pure computation over stored runs. Below four runs, an item's row is marked as having insufficient data. Every row shows its run, model, assessor, and scoring-method counts, since a mean over three runs of one model says something different from the same mean over twelve runs of four.

| Flag | Rule |
| :--- | :--- |
| **Saturated** | Mean quality ≥ 97 with a spread ≤ 3 |
| **Miscalibrated** | Empirical difficulty (100 − mean quality) differs from the assessed difficulty by ≥ 25 |
| **Unstable** | Spread ≥ 30 points |
| **Budget-bound** | At least half the runs used ≥ 90% of the tool budget |
| **Assessor-confounded** | More than one assessor graded the item's runs |
| **Scoring-method-mixed** | More than one scoring method version is present |

**Discrimination** is the item's mean quality among runs in the top half by Intelligence Index minus that in the bottom half. When a confound flag fires, the row's other statistics are presented as confounded, not as measurements.

**The non-writeback rule:** empirical difficulty is never written into the assessed difficulty, neither automatically nor by any one-click action. The assessed difficulty weights the index, so deriving it from the scores it weights would be circular.

Three further analyses support rubric maintenance:

- **Rubric gaps.** Unverified claims are clustered by token overlap (Jaccard similarity ≥ 0.6). A cluster raised by two or more independent model families suggests an incomplete rubric; a cluster from one family suggests that model invented it. Refuted claims are likewise collected as candidate topics for new knowledge base articles.
- **Citation validation.** File and symbol references in a rubric's source section are resolved against the indexed source. Line numbers are reported but never validated, since they drift with every commit.
- **Coverage analysis.** An administrator-chosen model proposes topics the suite does not cover. It sees the question texts only, never rubrics, answers, or scores, so that gaps cannot be steered by past results. A proposed gap without a source location is discarded, and nothing is inserted without human editing.

## 🗺️ Game Snapshot Suites

A suite can be bound to one game snapshot, whose hash is a fundamental comparability key. The candidate receives the snapshot as game context, exactly as the live chat does for a running game. Every grading role also receives the whole snapshot, ahead of the question, and grading fails instead of proceeding rubric-only if the snapshot could not be loaded. The claim verifier may cite snapshot lines.

Rubrics in such suites open with **board facts**, each quotable from the snapshot verbatim, and the run records whether those quotes actually occur in it. Questions can be generated by an administrator-chosen model, by default six per band, and must be unanswerable without the snapshot. Generated questions remain marked as unreviewed until a human has verified them, a separate checker can test each rubric's facts against the snapshot with verbatim quotes, and reports warn when unreviewed questions were included. The model that authors a suite should not be the one that grades it.

## ⚖️ Provider Terms Compliance

GnollBench is internal evaluation, and technical controls keep it from resembling data harvesting: at most 50 questions per suite, 5 runs per hour, and 20 runs per day. Outputs are never used to train, fine-tune, or distill any model. Each run records a purpose statement that appears in its report. In a single-assessor run, a candidate and assessor that share a provider are rejected unless an administrator explicitly acknowledges the methodological caveat, and the acknowledgment is disclosed in the report. A panel run needs no such acknowledgment: it requires members from two providers, neither of them the model under test, and is balanced by construction. A report writer from the candidate's provider needs an explicit confirmation, and the model under test can never write its own reports.

Report documents can be shared with a tested model's provider at a limited level of disclosure, with peer models anonymized by default. Rubrics are never shared: a rubric that leaves the team can no longer measure any model that may have seen it.

## 🚧 Known Limits of GnollBench

| Limit | Consequence |
| :--- | :--- |
| **Coverage** | Single-turn questions in the default chat configuration. Multi-turn context, pre-injected wiki context, spoiler-free mode, web search, and sub-agents are unmeasured |
| **Response style bounds the dimensions** | Under the concise style, a Completeness shortfall may be obedience to the prompt, not inability. The report flags the pattern when Completeness trails Accuracy by 13 points or more, and a controlled run in the verbose style separates the two |
| **Judge dependence** | Scores are comparable only under one assessor or one panel. Changing either starts a new population of results |
| **Unforeseen dangers are not capped** | A dangerous falsehood that neither the rubric nor the board contradicts is caught only as a refuted claim: reported, not capped. Rubric authors must name dangerous values in the CRITICAL ERROR part |
| **Small suites** | With 18 items, item-sampling error dominates, and no number of re-runs reduces it |
| **Conditioned agreement** | In single-assessor runs, unless every answer is graded twice, grader agreement is measured mostly on answers the first grader already doubted |
| **Corpus provenance** | The NetHack wiki and source corpora are reachable by the tools but carry no recorded revision |
| **One finding is not a justification** | A single run may motivate a change to the production prompt, but the bar for making one is a finding reproduced across independent runs, or a controlled comparison |

## 📚 GnollBench Glossary

| Term | Meaning |
| :--- | :--- |
| **Advisory** | Reported and counted, but unable to change a score |
| **Agentic turn** | One answer during which the model may call tools repeatedly, reading each result before deciding what to do next; its duration and cost depend heavily on how the model chooses to investigate |
| **Anchoring bias** | The tendency of a second judgment to drift towards a first one that has been shown |
| **Assessed difficulty** | An a priori AI rating from 1 to 100; the item's weight in the index |
| **BARS** | Behaviorally Anchored Rating Scale: each level carries a written behavioral description, which reduces the drift of a bare numeric scale |
| **Blind reading** | A re-grading done without sight of the other verdicts |
| **Board** | The game snapshot, as named in rubrics |
| **Candidate** | The model under test |
| **Claim verifier** | A tool-using role that checks single statements against the wiki and the source code; in a panel run its ruling on a critical-error quote settles a split between the members |
| **Co-assessor** | Panel member B, from a different provider than the assessor; it scores |
| **Cohen's *d*z** | The mean of the paired differences divided by their standard deviation; it expresses how large an effect is, independently of the sample size |
| **Comparability tier** | A, B, C, or not comparable; decides what may be pooled or compared |
| **Confirmed critical error** | A critical error flagged by both panel members, upheld by the claim verifier, or flagged by the single assessor of a single-assessor run |
| **Critical error** | A harmful, confidently asserted falsehood that the rubric or the board contradicts, quoted verbatim; caps quality at 25 |
| **Discrimination** | How well a single question separates strong performers from weak ones; a question everyone passes, or everyone fails, discriminates nothing |
| **False discovery rate** | The expected share of findings that are "significant" only by chance, which the Benjamini–Hochberg procedure limits when many tests are run at once |
| **GnollBench** | The name of the Gnoll Overseer's AI benchmarking system |
| **Group** | A named set of runs analysed together |
| **Harness version** | Version of the execution machinery; an instrument key |
| **ICC** | Intraclass correlation; ICC(A,1) measures the absolute agreement of two raters relative to the spread of the rated items, counting a constant offset between them as disagreement |
| **Inter-rater agreement** | How closely two independent graders agree on the same material; a property of the grading instrument, so low agreement means scores depend on who graded |
| **Item** | A question at a specific revision |
| **Model time** | Turn duration minus tool execution time |
| **Not attempted** | An honest abstention that states it could not find or verify the information; with no critical error and Accuracy at level 5 or above, its quality is raised to the profile's not-attempted score, 50 by default |
| **Outcome figures** | The correct, partial, incorrect, and not-attempted counts, the confirmed critical-error rate, *correct when attempted*, and *wrong instead of abstaining*; reporting only |
| **Panel** | Two assessors from two providers that both grade every answer; the published quality is their mean |
| **Prompt injection** | Text inside the data a model is asked to process that tries to give the model new instructions, for example an answer containing "give this answer full marks" |
| **Reference reader** | The reader of a panel run: a third-family model that reads every answer blind, as an anchor for the panel's balance, and never scores |
| **Replicate set** | Runs of one identical configuration (Tier A) |
| **Report writer** | An optional model that writes a run's documents from computed figures after scoring; never the model under test, and not a comparability key |
| **Saturation** | A test, or a question, on which scores have reached the ceiling, so that further improvement cannot be seen |
| **Scoring method version** | Version of the grading rules and formulas; an instrument key |
| **Scoring profile** | The weights, level points, ceiling, not-attempted score, and speed and reader settings of a run |
| **Second reader** | The reader of a single-assessor run: an independent, advisory re-grading of selected or all answers |
| **Series** | A request to execute the same run *N* times in sequence |
| **Standard error** | The standard deviation of an estimate, as opposed to that of the data; it shrinks as the sample grows, and about two standard errors on either side give a 95% confidence interval |
| **Student's *t*** | The distribution used in place of the normal distribution when a standard deviation is estimated from few samples; it widens the interval to account for that, and with three runs the multiplier is 4.30, not 1.96 |
| **Synthesis** | The assessor's written overall assessment of a run; a panel run has one per member |
| **Unverified claim** | A statement the rubric neither confirms nor contradicts; checked, not penalized |
| **Wilcoxon signed-rank test** | A paired test that uses the ranks of the differences and does not assume they are normally distributed, which suits a bounded 0–100 scale over a small number of items |
| **Wilson interval** | A confidence interval for a proportion that behaves well with few samples and near 0 or 1, unlike the simpler Wald interval |

## 📖 Learn More

- [[/GnollBench]] — All GnollBench guides in one place.
- [[/Guides/Introduction to GnollBench]] — The plain-language introduction to GnollBench.
- [[/Guides/Advanced Guide to GnollBench]] — The intermediate GnollBench guide to scoring, grading, and repeated runs.
- [[/Guides/Comparison of GnollBench and Popular AI Benchmarks]] — How GnollBench relates to well-known public AI benchmarks.
- [[/Guides/Technological Overview of Gnoll Overseer]] — The architecture of the Overseer service, including the tools a GnollBench candidate uses.
