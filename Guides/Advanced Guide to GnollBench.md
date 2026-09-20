> 👉 **GnollBench is the Gnoll Overseer's AI benchmarking system. This in-depth guide shows how its questions and answer keys are built, which AI roles take part in a run, how an answer turns into a score, and why a single run is never the whole story.**

> ℹ️ **Note:** This article describes GnollBench as of September 2026: harness version 37 and scoring method version 12. Figures such as limits and thresholds may change in later versions.

> ℹ️ **Note:** This is part 2 of the three GnollBench guides. Part 1, [[/Guides/Introduction to GnollBench]], is for newcomers. Part 2, **Advanced Guide to GnollBench**, explains scoring, grading, and repeated runs. Part 3, [[/Guides/Technological Overview of GnollBench]], gives the formulas and statistics.

## 🐺 GnollBench at a Glance

| | GnollBench |
| :--- | :--- |
| **What it is** | The Gnoll Overseer's AI benchmarking system: a fixed GnollHack exam for AI models |
| **What it tests** | The real Overseer chat: same instructions, same lookup tools, same limits |
| **Standard suite** | 18 questions: 6 Simple, 6 Intermediate, 6 Advanced (custom suites up to 50) |
| **Graded on** | Accuracy 55%, Completeness 25%, Conciseness 10%, Readability 10% |
| **Results** | Intelligence Index, Speed Index, Cost |
| **Who runs it** | The Overseer's administrators. Players cannot run it, and results are internal and not published |
| **Roles in a run** | Candidate, assessor, optional second opinion, optional claim verifier |
| **Version described** | Harness version 37, scoring method version 12 |

## 🎯 What GnollBench Is For

GnollBench is an automated exam for AI models, run by the Overseer's administrators. Its purposes are, in order of importance:

1. **Improving the Overseer's chat**, by finding wrong answers and tracing them to their cause: a missing wiki fact, a confusing tool result, an unclear instruction.
2. **Improving GnollBench itself**, so that its numbers can be trusted.
3. **Comparing models** on intelligence, speed, and cost, to decide which ones the Overseer should offer.

> 📢 **Important:** GnollBench tests the real chat. The candidate model receives the same instructions that the live Overseer chat uses, in its default concise answering style, and the same read-only lookup tools: wiki search, monster and item statistics, the knowledge base, and source code search. A weakness found is one real players would meet.

GnollBench results are used internally and are not published.

> ℹ️ **Term — harness:** The software around the exam: it asks the questions, enforces the limits, collects the answers, calls the graders, and computes the scores. Each change to it gets a new *harness version*, because results from different versions are not always comparable.

## 🧩 Suites, Questions and Rubrics

A **suite** is a set of questions, at most 50. GnollBench ships with a standard suite of 18 questions: six Simple, six Intermediate, and six Advanced.

Every question has two difficulty labels: the **authored band** (Simple, Intermediate, or Advanced), chosen by whoever wrote the question, and the **assessed difficulty**, a number from 1 to 100 rated by an AI model that an administrator picks for the job.

| Band | Assessed difficulty | Time limit |
| :--- | :-: | :-: |
| **Simple** | 1–35 | 7 minutes |
| **Intermediate** | 36–70 | 10 minutes |
| **Advanced** | 71–100 | 12 minutes |

The assessed difficulty decides how much a question weighs in the final result, so a run cannot start until every question in the suite has one. Editing a question or its rubric clears the rating, because an edited question is a different question.

Each question also has a **rubric**, divided into labelled parts:

| Part | Purpose | Can cost points? |
| :--- | :--- | :-: |
| **Required facts** | The facts a good answer is required to contain | ✅ Yes |
| **Critical errors** | The errors that would make the answer dangerous | ✅ Yes |
| **Scope** | The boundaries of what the question is asking | ❌ No |
| **Form** | A note on the expected form of the answer | ❌ No |
| **Sources** | Where the facts come from | ❌ No |

Only the required facts and the critical errors can ever cost an answer points. Scope and form are notes for the grader.

### 🗺️ Game Snapshot Suites

A suite can be bound to a **game snapshot**: the text description of a real game situation, with the character, the map, the inventory, and recent messages. Questions in such a suite ask what the player should do *in that situation*, and must be impossible to answer without the snapshot. Their rubrics start with a list of snapshot facts, each of which must be quotable from the snapshot word for word.

Questions for a snapshot suite can be drafted by an AI, six per difficulty band by default. Every AI-written question stays marked as unreviewed until a human has checked it, and a report warns if a run included unreviewed questions.

> ℹ️ **Term — game snapshot:** The same kind of game-state summary that the game sends to the Overseer when you open the chat in the middle of a game. In GnollBench rubrics it is also called the *board*.

## 🤖 The AI Roles in a GnollBench Run

Up to four different AI roles take part in a run. Only one of them decides the score.

| Role | What it does | Affects the score? |
| :--- | :--- | :--- |
| **Candidate** | The model under test. Answers every question, using tools. | It is what is being scored |
| **Assessor** | Grades each answer against its rubric. Also writes the closing summary of the run. | ✅ Yes, the only grader that does |
| **Second opinion** | Grades selected answers again, independently. | ❌ No, advisory |
| **Claim verifier** | Fact-checks individual statements against the wiki and the source code, using tools. | ❌ No, advisory |

The second opinion and the claim verifier are optional, and their findings are **reported but never applied**. This is deliberate: if a later pass could change a score, the result would depend on whichever AI spoke last, and it would no longer be reproducible. Instead, disagreements are counted, shown in the report, and left for a human to judge. The second opinion is also **blind**: the second grader is not shown the first grade, so it judges independently instead of drifting toward it.

> ℹ️ **Term — candidate:** The model taking GnollBench.

## 🪜 The Stages of a GnollBench Run

A run proceeds in three stages:

1. **Answering and grading.** Each question is answered, and the answer is then graded, fact-checked, and given a second opinion if one is due. By default, questions are answered one at a time so that timing stays comparable.
2. **Follow-up grading passes.** A short tail of remaining fact-checks and second opinions.
3. **Synthesis and scoring.** The assessor writes an overall assessment, and the final indices are computed.

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

If the assessor finds a **critical error**, the quality score is capped at **25**, whatever the levels were. A critical error is a confidently stated falsehood that a player would act on to their harm. Because this cap is so heavy, it has three safeguards:

| Safeguard | Why |
| :--- | :--- |
| **Must be something the answer actually says** | Leaving something out is never a critical error |
| **The assessor must quote the offending sentence word for word** | The harness checks that the quote really appears in the answer, and ignores a critical error whose quote it cannot find |
| **The claim verifier can check the quoted sentence against the game's source code** | If the sentence turns out to be true, the critical error is marked as contested in the report |

> 💡 **Example:** An answer that is otherwise perfect but states that a [[/Monsters/cockatrice]] is safe to hit bare-handed is capped at 25 points: touching one petrifies.

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

Every run records the tokens used by each role and converts them to money using the prices in force at the time of the run. The cost is shown per role, so you can see separately what the candidate cost and what the grading cost.

## ⚖️ GnollBench Fairness Safeguards

A large share of GnollBench exists to make sure the grade reflects the answer, not a quirk of the grader.

| Safeguard | Rule |
| :--- | :--- |
| **Rubric-only accuracy** | Accuracy is graded against the rubric and the game snapshot only. If the assessor merely believes from its own memory that a statement is false, it may not deduct points; it must record the statement as a suspected falsehood, and the claim verifier looks it up |
| **No penalty for extra knowledge** | A statement the rubric does not mention goes on a list of unverified claims, which are checked, not penalized |
| **Every deduction explained** | Any Accuracy level below 6 has to name the statement that is wrong. A deduction with no stated reason is flagged and sent to the second grader |
| **Single-count omissions** | Missing information lowers Completeness. It may not lower Accuracy as well |
| **Question sets the scope** | If the rubric lists more than the question asked for, the extra points are noted as out of scope and cost nothing |
| **Provider failures excluded** | If the AI company's service fails on a question, the answer is excluded, and the run publishes no indices at all, since an index over only the questions that happened to work would be misleading. A model that simply ends its turn without answering scores 0 for that question |
| **Same-company approval** | If the candidate and the assessor come from the same provider, the run has to be explicitly acknowledged, and the report says so |
| **Volume limits** | At most 5 runs per hour and 20 per day. GnollBench outputs are used only for evaluation, never for training any AI model, and every report carries a statement of that purpose |

## 🔁 Why One GnollBench Run Is Not Enough

AI models are not deterministic: ask the same question twice and you get two different answers, and the grader varies too. So if an index moves by two points after a change, the honest question is whether two points is more than GnollBench's own noise.

The answer comes from a **replicate set**: the same configuration run several times in a row. From its spread, the system computes how reproducible the index is. It needs **at least three runs** before it reports any reproducibility figure, since a spread measured from two points is not a measurement.

Runs may only be averaged together if they were truly run under the same conditions. The system compares each run's recorded conditions (suite, question versions, model settings, instructions, tool guides, graders, limits) and refuses to pool runs that differ in anything that matters. When exactly one condition was changed on purpose, the two sets are **compared** with statistical tests instead of averaged.

> 💡 **Tip:** A two-point change means nothing until a replicate set shows that the noise is smaller than two points.

## 🩺 Keeping GnollBench Healthy

After enough runs, the questions themselves are examined. Once a question has been answered in at least four runs, it can be flagged as:

| Flag | Meaning |
| :--- | :--- |
| **Saturated** | Nearly every model scores full marks, so it no longer tells models apart |
| **Miscalibrated** | Models find it much harder or easier than its assessed difficulty says |
| **Unstable** | Scores swing widely between runs, which often means the rubric is ambiguous |
| **Budget-bound** | Models keep running into the tool limit, so the limit may be setting the score |

The list of unverified claims is also mined for **rubric gaps**. When models from two or more unrelated model families make the same claim that the rubric does not cover, the rubric is probably incomplete. When only one model ever makes it, it is more likely an invention of that model.

All of these findings are shown to a human. Nothing is changed automatically. In particular, a question's measured difficulty is never written back as its weight, because a model that does badly on a question would then reduce that question's weight and flatter its own result.

## 📄 Reading a GnollBench Report

Every GnollBench run can be exported as a report with seven parts:

| # | Part | What it contains |
| :-: | :--- | :--- |
| **1** | Run Manifest | What was tested and under which conditions |
| **2** | Results Summary | The indices, the breakdown by difficulty, agreement between graders, and cost |
| **3** | Questions and Replies | Every question, answer, grade, and tool call |
| **4** | Scoring Method & Configuration | The exact scoring settings that were used |
| **5** | Issues | Everything that went wrong or was flagged |
| **6** | Synthesis Assessment | The assessor's written overall assessment |
| **7** | Final Indices | The run's final index values |

> 💡 **Tip:** Read the manifest and the issues before the indices. An index only means something once you know the conditions it was measured under and whether anything went wrong on the way.

## 🚧 What GnollBench Does Not Measure

GnollBench covers single questions asked in the chat's default configuration. Several things that matter in the live chat are not measured yet:

| What | Measured? |
| :--- | :-: |
| **Single questions** asked in the chat's default configuration | ✅ Yes |
| **Conversations with several turns**, where earlier messages matter | ❌ Not yet |
| **The wiki excerpts that the live chat adds** to a question automatically before the model sees it. In GnollBench, the model has to find everything through its tools | ❌ Not yet |
| **Spoiler-free mode** | ❌ Not yet |
| **Web search** | ❌ Not yet |
| **Sub-agents** | ❌ Not yet |

## 📚 GnollBench Glossary

| Term | Meaning |
| :--- | :--- |
| **Assessed difficulty** | An AI-rated difficulty from 1 to 100 that sets a question's weight |
| **Assessor** | The AI that grades the answers; the only role whose verdict sets the score |
| **BARS** | A rating scale whose levels are tied to written descriptions |
| **Blind second opinion** | A re-grading done without sight of the first verdict, which avoids anchoring: drifting toward a judgment already seen |
| **Candidate** | The model under test |
| **Claim verifier** | An AI that fact-checks single statements against the wiki and the source code |
| **Confidence interval** | The range of uncertainty around a measured value |
| **Critical error** | A confidently stated, harmful falsehood; caps the quality score at 25 |
| **Game snapshot** | A text description of a game situation that questions can be based on |
| **Geometric mean** | An average made by multiplying instead of adding, so one very low value pulls the whole result down sharply |
| **GnollBench** | The name of the Gnoll Overseer's AI benchmarking system |
| **Harness** | The software that runs GnollBench |
| **Intelligence Index** | The difficulty-weighted average quality score of a run |
| **Latency** | The delay between asking and getting the answer |
| **LLM-as-a-judge** | Using one large language model to grade the output of another; fast and cheap, but with its own biases |
| **Noise** | The random variation in a measurement that has nothing to do with what is being measured |
| **Quality score** | The combined 1–100 score of a single answer |
| **Replicate** | A repeat of an experiment under identical conditions, done to measure how much the result varies by itself |
| **Replicate set** | The same configuration run several times to measure noise |
| **Rubric** | The answer key of one question |
| **Second opinion** | An independent, advisory re-grading of selected answers |
| **Speed Index** | The average speed score of a run |
| **Suite** | A set of GnollBench questions |
| **Token** | The unit in which AI usage is measured and billed; roughly three quarters of an English word |
| **Unverified claim** | A statement in an answer that the rubric neither confirms nor contradicts |

## 💡 Summary

- GnollBench tests the real chat: same instructions, same tools, same limits.
- One assessor sets the score. The second opinion and the claim verifier only advise, which keeps results reproducible.
- Quality combines four dimensions with a geometric mean, so poor accuracy cannot be compensated by good presentation, and a critical error caps the score at 25.
- The Intelligence Index weights hard questions more, and the Speed Index counts only the model's own time.
- The grader is held to strict rules: every deduction must be explained, and knowing more than the rubric is never punished.
- Real conclusions need replicate runs, and runs are only pooled when their conditions match.

## 🔗 Learn More

- [[/Gnoll Overseer Guides]] — All Gnoll Overseer guides in one place.
- [[/Guides/Introduction to GnollBench]] — The plain-language introduction.
- [[/Guides/Technological Overview of GnollBench]] — Formulas, statistics, and comparability rules in full.
- [[/Guides/Comparison of GnollBench and Popular AI Benchmarks]] — How GnollBench relates to well-known public AI benchmarks.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — Which model to pick for which task.
- [[/Guides/Technological Overview of Gnoll Overseer]] — The architecture of the Overseer service.
