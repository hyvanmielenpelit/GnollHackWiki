![GnollBench](/uploads/GnollBench/gnollbench-logo-256-v3.webp)

> 👉 **GnollBench is the Gnoll Overseer's AI benchmarking system. This in-depth guide shows how its questions and answer keys are built, which AI roles take part in a run, how an answer turns into a score, and why a single run is never the whole story.**

> ℹ️ **Note:** This article describes GnollBench as of October 2026: harness version 45 and scoring method version 13. Figures such as limits and thresholds may change in later versions.

> ℹ️ **Note:** This is part 2 of the three GnollBench guides. Part 1, [[/Guides/Introduction to GnollBench]], is for newcomers. Part 2, **Advanced Guide to GnollBench**, explains scoring, grading, and repeated runs. Part 3, [[/Guides/Technological Overview of GnollBench]], gives the formulas and statistics.

## 🐺 GnollBench at a Glance

| | GnollBench |
| :--- | :--- |
| **What it is** | The Gnoll Overseer's AI benchmarking system: a fixed GnollHack exam for AI models |
| **What it tests** | The real Overseer chat: same instructions, same lookup tools, same limits |
| **Standard suite** | 18 questions: 6 Simple, 6 Intermediate, 6 Advanced (custom suites up to 50) |
| **Graded on** | Accuracy 55%, Completeness 25%, Conciseness 10%, Readability 10% |
| **Results** | Intelligence Index, Speed Index, Cost, plus outcome figures |
| **Who runs it** | The Overseer's administrators. Players cannot run it |
| **Roles in a run** | Candidate; assessor and co-assessor (the grading panel); optional Second Reader or Reference Reader; optional claim verifier; optional report writer |
| **Version described** | Harness version 45, scoring method version 13 |

## 🎯 What GnollBench Is For

GnollBench is an automated exam for AI models, run by the Overseer's administrators. Its purposes are, in order of importance:

1. **Improving the Overseer's chat**, by finding wrong answers and tracing them to their cause: a missing wiki fact, a confusing tool result, an unclear instruction.
2. **Improving GnollBench itself**, so that its numbers can be trusted.
3. **Comparing models** on intelligence, speed, and cost, to decide which ones the Overseer should offer.

> 📢 **Important:** GnollBench tests the real chat. The candidate model receives the same instructions that the live Overseer chat uses, in its default concise answering style, and the same read-only lookup tools: wiki search, monster and item statistics, the knowledge base, and source code search. A weakness found is one real players would meet.

Preliminary GnollBench results have been published as an executive summary. Per-run details (answers, grades, rubrics, diagnostics) remain for internal use. Interested parties can request results, which can be anonymized for that purpose.

> ℹ️ **Term — harness:** The software around the exam: it asks the questions, enforces the limits, collects the answers, calls the graders, and computes the scores. Each change to it gets a new *harness version*, because results from different versions are not always comparable.

## 🧩 Suites, Questions and Rubrics

A **suite** is a set of questions, at most 50. GnollBench ships with a standard suite of 18 questions: six Simple, six Intermediate, and six Advanced.

Every question has two difficulty labels: the **authored band** (Simple, Intermediate, or Advanced), chosen by whoever wrote the question, and the **assessed difficulty**, a number from 1 to 100 rated by an AI model that an administrator picks for the job.

| Band | Assessed difficulty |
| :--- | :-: |
| **Simple** | 1–35 |
| **Intermediate** | 36–70 |
| **Advanced** | 71–100 |

The assessed difficulty decides how much a question weighs in the final result, so a run cannot start until every question in the suite has one. Editing a question or its rubric clears the rating, because an edited question is a different question.

Each question also has a **rubric**, divided into labelled parts:

| Part | Purpose | Can cost points? |
| :--- | :--- | :-: |
| **REQUIRED** | The facts a good answer is required to contain | ✅ Yes |
| **CRITICAL ERROR** | The mistakes that would make the answer dangerous | ✅ Yes, and can cap the score |
| **SCOPE** | The boundaries of what the question is asking | ❌ No |
| **FORM** | A note on the expected form of the answer | ❌ No |
| **SOURCE** | Where the rubric's author found its facts | ❌ No |
| **BOARD FACTS** | In game snapshot suites only: facts quoted word for word from the snapshot | ✅ Yes |

Only the required facts, the board facts, and the critical errors can ever cost an answer points. Scope, form, and source are notes for the grader. The SOURCE line records where the facts came from; it is not the list of correct citations, so an answer that cites another correct place is not marked down for it.

### 🗺️ Game Snapshot Suites

A suite can be bound to a **game snapshot**: the text description of a real game situation, with the character, the map, the inventory, and recent messages. Questions in such a suite ask what the player should do *in that situation*, and must be impossible to answer without the snapshot. Their rubrics start with a list of board facts, each of which must be quotable from the snapshot word for word.

Questions for a snapshot suite can be drafted by an AI, six per difficulty band by default. Every AI-written question stays marked as unreviewed until a human has checked it, and a report warns if a run included unreviewed questions.

> ℹ️ **Term — game snapshot:** The same kind of game-state summary that the game sends to the Overseer when you open the chat in the middle of a game. In GnollBench rubrics it is also called the *board*.

## 🤖 The AI Roles in a GnollBench Run

Up to six different AI roles take part in a run. Only the two members of the grading panel set the score.

| Role | What it does | Affects the score? |
| :--- | :--- | :--- |
| **Candidate** | The model under test. Answers every question, using tools. | It is what is being scored |
| **Assessor** | Grades each answer against its rubric, and writes a closing summary of the run. Member A of the grading panel. | ✅ Yes |
| **Co-assessor** | Grades every answer as well, without seeing the assessor's grade, and writes its own summary. Member B of the panel, from a different AI company than the assessor. | ✅ Yes |
| **Second Reader or Reference Reader** | Grades answers again, blind. In a panel run it is called the Reference Reader, comes from a third company, and reads every answer. | ❌ No, advisory |
| **Claim verifier** | Fact-checks individual statements against the wiki and the source code, using tools. | Only to settle a critical error that one panel member flagged and the other did not |
| **Report writer** | Writes AI report documents after the run has been scored. | ❌ No |

### 👥 The Grading Panel

A run is normally graded by a **panel** of two assessors from two different AI companies; this has been the standard configuration since late September 2026. Both members grade every answer with the same instructions, without seeing each other's grade, and the published quality score of each answer is the **mean** of the two. Neither member may be the model under test.

The reason is a known weakness of AI judges: a grader tends to favor answers written by its own company's models. No single company's grader is neutral toward every candidate, so the panel does not look for a neutral judge. It balances two partial ones: if both prefer their own company's models equally, the preferences cancel out in the mean, and if they do not, the mean halves the difference. Each member's own index is still shown in the report, as a diagnostic.

Runs with a single assessor remain possible. In such a run the assessor alone sets the score, and the advisory reader is called the Second Reader.

### 📋 Advisory Roles

The reader, the claim verifier, and the report writer are optional, and their findings are **reported, not applied**. This is deliberate: if a later pass could freely change a score, the result would depend on whichever AI spoke last, and it would no longer be reproducible. Instead, disagreements are counted, shown in the report, and left for a human to judge. The reader is also **blind**: it is not shown the panel's grades, so it judges independently instead of drifting toward them.

There is one bounded exception: when only one panel member flags a critical error, the claim verifier's ruling on the quoted sentence settles it, as described under [[The Critical Error Ceiling|#the-critical-error-ceiling]].

## 🪜 The Stages of a GnollBench Run

A run proceeds in three stages, with an optional fourth:

1. **Answering and grading.** Each question is answered, and the answer is then graded (in a panel run, by both members at once), fact-checked, and read by the Second or Reference Reader if a reading is due. By default, questions are answered one at a time so that timing stays comparable.
2. **Follow-up grading passes.** A short tail of remaining fact-checks and readings.
3. **Synthesis and scoring.** The assessor writes an overall assessment, and the final indices are computed. In a panel run, each member writes its own synthesis.
4. **Writing reports** (optional). After the run has completed, the report writer writes its documents from the computed results.

The candidate works under fixed limits on every question:

| Limit | Value |
| :--- | :--- |
| **Tool calls** | 45 |
| **Rounds of tool use** | 22 |
| **Calls to the model** | 28 |
| **Time limit** | 7 minutes (Simple), 10 minutes (Intermediate), 12 minutes (Advanced) |

The live chat's default limits are kept at least as generous as these, so GnollBench never measures something the real chat would not be allowed to do.

## 💯 How GnollBench Scores an Answer

### 📏 The Rating Scale

The assessor rates each of the four dimensions on a scale of seven levels, from 0 to 6. Each level has a written description of what an answer at that level looks like, so that "level 4" means the same thing every time. Such a scale is called a Behaviorally Anchored Rating Scale (BARS). The levels convert to points like this:

| Level | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Points** | 1 | 15 | 35 | 55 | 72 | 87 | 100 |

### ⚖️ The Weights

| Dimension | Weight | What it grades |
| :--- | :-: | :--- |
| **Accuracy** | 55% | Whether what the answer states is true |
| **Completeness** | 25% | Whether it covers what the question asked |
| **Conciseness** | 10% | Whether it avoids padding and repetition |
| **Readability** | 10% | Whether it is clearly structured and easy to follow |

### 🧮 Combining the Dimensions

The four point values are combined into one **quality score** from 1 to 100 with a **weighted geometric mean**. This is an average made by multiplying instead of adding, so one very low value pulls the whole result down sharply:

$Quality = A^{0.55} \times C^{0.25} \times Cn^{0.10} \times R^{0.10}$

> 💡 **Example:** An answer is beautifully written and complete (100 points on three dimensions) but mostly wrong (Accuracy level 1, 15 points). An ordinary weighted average would still give it 53. The geometric mean gives it 35. A well-presented wrong answer cannot hide behind its presentation.

> 💡 **Example:** An answer rated Accuracy level 5, Completeness level 4, Conciseness level 6, and Readability level 5 converts to points 87, 72, 100, and 87. Quality = 87^0.55 × 72^0.25 × 100^0.10 × 87^0.10 ≈ 84.

### 🛑 The Critical Error Ceiling

If a grader finds a **critical error**, its quality score is capped at **25**, whatever the levels were. A critical error is a confidently stated falsehood that a player would act on to their harm. Because this cap is so heavy, it has several safeguards:

| Safeguard | Why |
| :--- | :--- |
| **Must be something the answer actually says** | Leaving something out is never a critical error |
| **Must be contradicted by the answer key** | The rubric's facts or the game board must show the statement to be false. A statement the grader merely believes false from its own knowledge is recorded as a suspected falsehood for the claim verifier, not as a critical error |
| **The grader must quote the offending sentence word for word** | The harness checks that the quote really appears in the answer, and ignores a critical error whose quote it cannot find |
| **In a panel run, it must be confirmed** | A single member's flag can be wrong, so a split is settled as shown below |
| **A hedge is graded as a claim** | A statement the answer marks as uncertain ("I think…") loses Accuracy if it is wrong, but it is a critical error only if it recommends an action the rubric's CRITICAL ERROR part names |

How a split between the two panel members is settled:

| Situation | Result |
| :--- | :--- |
| **Both members flag it** | Agreed: both members' scores are capped, and the panel score is their mean |
| **One flags it, and the verifier refutes the quoted sentence** | Upheld: the cap is applied to the other member's score too |
| **One flags it, and the verifier supports the sentence** | Overturned: the flagging member's score is used as it was before the cap |
| **One flags it, and the verifier cannot decide** | Unresolved: the two members' scores are averaged as they stand |

In a single-assessor run, the assessor's critical error stands. If the claim verifier finds the quoted sentence true, the critical error is only marked as contested in the report.

> 💡 **Example:** An answer that is otherwise perfect but states that a [[/Monsters/cockatrice]] is safe to hit bare-handed is capped at 25 points if the question's rubric names this as a critical error: touching one petrifies.

### 🙋 Honest Answers: Not Attempted

The Overseer's instructions tell the model to say what it does not know and never to present a guess as fact. Before scoring method 13, an honest "I could not verify this" earned almost no Completeness and scored about 32, less than a substantially wrong answer. Now the grader marks such an answer as **not attempted**: it does not give what the question asks for, and it says why, namely that it could not find or could not verify the information. It may add what it did find and where to look.

A not-attempted answer is raised to a quality score of **at least 50** when all of these hold:

- It makes no false claim.
- Its Accuracy level is 5 or above.
- It has no critical error.

An answer that gives a value, an outcome, or a recommendation, however tentatively, is not "not attempted". An answer that lists two or more alternatives instead of committing to one earns no Completeness for that point, and each alternative is graded as a claim, so fishing with alternatives earns nothing.

> 💡 **Example:** An answer says: "I could not find this trap's damage in the wiki or the game data. Its wiki page describes how it is triggered, so check that page before stepping on it." It is graded Accuracy 6, Completeness 0, Conciseness 6, and Readability 6, which converts to 100, 1, 100, and 100 points. Quality = 100^0.55 × 1^0.25 × 100^0.10 × 100^0.10 ≈ 32. The answer is not attempted and contains nothing false, so its quality score is raised to 50. An answer with a critical error, by comparison, can score 25 at most.

## 📊 The GnollBench Indices

### 🧠 Intelligence Index

The Intelligence Index is the average quality score over all questions, **weighted by assessed difficulty**: a question rated 80 counts four times as much as one rated 20. The report also shows the plain, unweighted average next to it, so you can see how much the weighting moved the result.

> 💡 **Example:** Three questions with assessed difficulty 20, 50, and 80 score quality 100, 80, and 60. The Intelligence Index is (20×100 + 50×80 + 80×60) ÷ 150 = 72, while the plain average is 80: failing the hard question costs more.

The index comes with a **95% confidence interval**. With only 18 questions, the index would have come out a little differently with a different set of 18, and the interval shows how much. A range such as "74 ± 6" means the true value is very probably between 68 and 80, and two runs whose intervals overlap cannot confidently be told apart.

### 🏃 Speed Index

Each answer gets a speed score from 1 to 100, and the Speed Index is their plain average. Three design choices are worth knowing:

- **Only the model's own time counts.** Time spent executing tools is subtracted first, so a model is not punished for a slow search.
- **Harder questions get more time.** The target time is 2 seconds for the easiest questions and grows with assessed difficulty up to 4 seconds for the hardest. An answer within its target scores 100.
- **The scale is logarithmic.** Every doubling of the time costs 12 points.

| Model time (at the base target of 2 s) | Speed score |
| :--- | :-: |
| **2 s** | 100 |
| **4 s** | 88 |
| **8 s** | 76 |
| **16 s** | 64 |
| **32 s** | 52 |

> 💡 **Example:** A question of assessed difficulty 50 has a target of 2 s × 1.5 = 3 s. A model time of 12 s is two doublings of that target, so the score is 100 − 2×12 = 76.

The Speed Index only makes sense between runs with the same thinking level, since a model that is told to think longer will of course be slower.

### 🪙 Cost

Every run records the tokens used by each role and converts them to money using the prices in force at the time of the run. The cost is shown per role, so you can see separately what the candidate cost and what the grading cost. The report writer's documents are costed separately, outside the run's own cost.

### 🎯 Outcome Figures

Since scoring method 13, every run also reports what happened to its answers, apart from the indices. Each graded answer is put into the first class that fits:

| Outcome | Rule |
| :--- | :--- |
| **Incorrect** | A confirmed critical error, or an Accuracy level of 2 or below |
| **Not attempted** | Marked as not attempted (in a panel run, by both members) |
| **Correct** | Accuracy level 5 or above, Completeness level 4 or above, and no critical-error flag |
| **Partial** | Everything else |

In a panel run, the levels are the mean of the two members' levels. An answer the model left empty is counted as no answer. From these classes the report derives:

- **Confirmed critical-error rate:** the share of answers with a confirmed critical error, with a 95% confidence interval.
- **Correct when attempted:** the share of correct answers among those that were not declined.
- **Wrong instead of abstaining:** how often the model gave an incorrect answer where it could have said it did not know, as a share of the incorrect and not-attempted answers together.

These figures are for reporting only: none of them feeds an index. They make guessing and dangerous errors visible on their own, not only through a lower Intelligence Index.

## ⚖️ GnollBench Fairness Safeguards

A large share of GnollBench exists to make sure the grade reflects the answer, not a quirk of the grader. Besides the two-company panel, the critical-error safeguards, and the not-attempted floor described above, these rules apply:

| Safeguard | Rule |
| :--- | :--- |
| **Rubric-only accuracy** | Accuracy is graded against the rubric and the game snapshot only. If the assessor merely believes from its own memory that a statement is false, it may not deduct points; it must record the statement as a suspected falsehood, and the claim verifier looks it up |
| **No penalty for extra knowledge** | A statement the rubric does not mention goes on a list of unverified claims, which are checked, not penalized |
| **Every deduction explained** | Any Accuracy level below 6 has to name the statement that is wrong. A deduction with no stated reason is flagged and sent to the Second Reader |
| **Single-count omissions** | Missing information lowers Completeness. It may not lower Accuracy as well |
| **Question sets the scope** | If the rubric lists more than the question asked for, the extra points are noted as out of scope and cost nothing |
| **Provider failures excluded** | If the AI company's service fails on a question, the answer is excluded, and the run publishes no indices at all, since an index over only the questions that happened to work would be misleading. A model that simply ends its turn without answering scores 0 for that question |
| **Same-company approval (single-grader runs only)** | If a single-assessor run's candidate and assessor come from the same provider, the run has to be explicitly acknowledged, and the report says so |
| **Volume limits** | At most 5 runs per hour and 20 per day. GnollBench outputs are used only for evaluation, never for training any AI model, and every report carries a statement of that purpose |

## 🔁 Why One GnollBench Run Is Not Enough

AI models are not deterministic: ask the same question twice and you get two different answers, and the grader varies too. So if an index moves by two points after a change, the honest question is whether two points is more than GnollBench's own noise.

The answer comes from a **replicate set**: the same configuration run several times in a row. From its spread, the system computes how reproducible the index is. It needs **at least three runs** before it reports any reproducibility figure, since a spread measured from two points is not a measurement.

Runs may only be averaged together if they were truly run under the same conditions. The system compares each run's recorded conditions (suite, question versions, model settings, instructions, tool guides, graders, limits) and refuses to pool runs that differ in anything that matters. When exactly one condition was changed on purpose, the two sets are **compared** with statistical tests instead of averaged.

> 💡 **Tip:** A two-point change means nothing until a replicate set shows that the noise is smaller than two points.

## 🩺 Keeping GnollBench Healthy

After enough runs, the questions themselves are examined. A question can be flagged at any number of runs, but one answered in fewer than four runs is marked as having insufficient data. The flags are:

| Flag | Meaning |
| :--- | :--- |
| **Saturated** | Nearly every model scores full marks, so it no longer tells models apart |
| **Miscalibrated** | Models find it much harder or easier than its assessed difficulty says |
| **Unstable** | Its scores range over 30 points or more across runs. Either the question separates models well or its rubric is ambiguous, and a human decides which |
| **Budget-bound** | Models keep running into the tool limit, so the limit may be setting the score |
| **Assessor-confounded** | Its runs were graded by more than one assessor, so its figures mix graders |
| **Scoring-method-mixed** | Its runs were scored under more than one scoring method version |

The list of unverified claims is also mined for **rubric gaps**. When models from two or more unrelated model families make the same claim that the rubric does not cover, the rubric is probably incomplete. When only one model ever makes it, it is more likely an invention of that model.

All of these findings are shown to a human. Nothing is changed automatically. In particular, a question's measured difficulty is never written back as its weight, because a model that does badly on a question would then reduce that question's weight and flatter its own result.

## 📄 Reading a GnollBench Report

Every GnollBench run can be exported as a report. It opens with an unnumbered **At a Glance** summary, followed by seven parts:

| # | Part | What it contains |
| :-: | :--- | :--- |
| **1** | Run Manifest | What was tested and under which conditions |
| **2** | Results Summary | The indices, the critical-error and outcome lines, the breakdown by difficulty, agreement between graders, and cost |
| **3** | Questions and Replies | Every question, answer, grade, and tool call |
| **4** | Scoring Method & Configuration | The exact scoring settings that were used |
| **5** | Issues | Everything that went wrong or was flagged |
| **6** | Synthesis Assessment | The assessor's written overall assessment. In a panel run, one section per member and a computed section on where they agree and disagree |
| **7** | Final Indices | The run's final index values |

> 💡 **Tip:** Read the manifest and the issues before the indices. An index only means something once you know the conditions it was measured under and whether anything went wrong on the way.

A run can also have two **AI-written documents**: an **Executive Summary** and a **Report for AI Researchers and Developers**. They are written by the optional report writer, a model chosen at launch or later that is never the model under test, after the run has been scored. The writer works from figures the code has already computed, so the numbers in the documents come from the code, not from the AI, and the writer cannot change a score.

## 🚧 What GnollBench Does Not Measure

Several things that matter in the live chat are not measured yet:

| What | Measured? |
| :--- | :-: |
| **Single questions** asked in the chat's default configuration: the concise answering style, with source code references turned off, as for a default user | ✅ Yes |
| **Conversations with several turns**, where earlier messages matter | ❌ Not yet |
| **The wiki excerpts that the live chat adds** to a question automatically before the model sees it. In GnollBench, the model has to find everything through its tools | ❌ Not yet |
| **Spoiler-free mode** | ❌ Not yet |
| **Web search** | ❌ Not yet |
| **Sub-agents** | ❌ Not yet |

## 📚 GnollBench Glossary

| Term | Meaning |
| :--- | :--- |
| **Assessed difficulty** | An AI-rated difficulty from 1 to 100 that sets a question's weight |
| **Assessor** | The grader that is member A of the panel, or the only grader in a single-assessor run; together with the co-assessor, the only role whose verdict sets the score |
| **BARS** | A rating scale whose levels are tied to written descriptions |
| **Blind reading** | A re-grading done without sight of the other verdicts, which avoids anchoring: drifting toward a judgment already seen |
| **Candidate** | The model under test |
| **Claim verifier** | An AI that fact-checks single statements against the wiki and the source code; it also settles a critical error that only one panel member flagged |
| **Co-assessor** | The grader that is member B of the panel, from a different company than the assessor |
| **Confidence interval** | The range of uncertainty around a measured value |
| **Critical error** | A confidently stated, harmful falsehood that the rubric or the game board contradicts; caps the quality score at 25 |
| **Game snapshot** | A text description of a game situation that questions can be based on |
| **Geometric mean** | An average made by multiplying instead of adding, so one very low value pulls the whole result down sharply |
| **GnollBench** | The name of the Gnoll Overseer's AI benchmarking system |
| **Harness** | The software that runs GnollBench |
| **Intelligence Index** | The difficulty-weighted average quality score of a run |
| **Latency** | The delay between asking and getting the answer |
| **LLM-as-a-judge** | Using one large language model to grade the output of another; fast and cheap, but with its own biases |
| **Noise** | The random variation in a measurement that has nothing to do with what is being measured |
| **Not attempted** | An honest answer that says it could not find or verify what was asked; with nothing false in it, it scores at least 50 |
| **Outcome figures** | The counts of correct, partial, incorrect, and not-attempted answers, and the rates derived from them; reported, never part of an index |
| **Panel** | Two assessors from two different companies that both grade every answer; the score is their mean |
| **Quality score** | The combined 1–100 score of a single answer |
| **Reference reader** | The advisory reader of a panel run: a third AI, from a third company, that reads every answer blind and never scores |
| **Replicate** | A repeat of an experiment under identical conditions, done to measure how much the result varies by itself |
| **Replicate set** | The same configuration run several times to measure noise |
| **Report writer** | An optional AI that writes report documents from the computed figures after a run has been scored; it never scores |
| **Rubric** | The answer key of one question |
| **Second reader** | The advisory reader of a single-assessor run: an independent, blind re-grading of selected answers |
| **Speed Index** | The average speed score of a run |
| **Suite** | A set of GnollBench questions |
| **Token** | The unit in which AI usage is measured and billed; roughly three quarters of an English word |
| **Unverified claim** | A statement in an answer that the rubric neither confirms nor contradicts |

## 💡 Summary

- GnollBench tests the real chat: same instructions, same tools, same limits.
- Two assessors from two companies grade every answer, and the score is their mean. The reader, the claim verifier, and the report writer only advise, which keeps results reproducible; the verifier's one exception is settling a critical error that only one panel member flagged.
- Quality combines four dimensions with a geometric mean, so poor accuracy cannot be compensated by good presentation. A critical error, which the answer key must contradict, caps the score at 25, while an honest "not attempted" scores at least 50.
- Outcome figures report correct, partial, incorrect, and declined answers, and the rate of confirmed critical errors, beside the indices.
- The Intelligence Index weights hard questions more, and the Speed Index counts only the model's own time.
- The grader is held to strict rules: every deduction must be explained, and knowing more than the rubric is never punished.
- Real conclusions need replicate runs, and runs are only pooled when their conditions match.

## 📖 Learn More

- [[/GnollBench]] — All GnollBench guides in one place.
- [[/Guides/Introduction to GnollBench]] — The plain-language introduction.
- [[/Guides/Technological Overview of GnollBench]] — Formulas, statistics, and comparability rules in full.
- [[/Guides/Comparison of GnollBench and Popular AI Benchmarks]] — How GnollBench relates to well-known public AI benchmarks.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — Which model to pick for which task.
- [[/Guides/Technological Overview of Gnoll Overseer]] — The architecture of the Overseer service.
