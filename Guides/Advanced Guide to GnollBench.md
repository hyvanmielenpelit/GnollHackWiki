> 👉 **An in-depth look at how the Gnoll Overseer's AI benchmarking works: how questions and answer keys are built, which AI roles take part in a run, how an answer turns into a score, and why a single run is never the whole story. It assumes you know the basics covered in [[/Guides/Introduction to GnollBench]].**

> ℹ️ **Note:** This article describes the benchmarking system as of September 2026: harness version 37 and scoring method version 12. Figures such as limits and thresholds may change in later versions.

## 📖 Overview

The benchmark, called **GnollBench**, is an automated exam for AI models, run by the Overseer's administrators. Its purposes are, in order of importance:

1. **Improving the Overseer's chat**, by finding wrong answers and tracing them to their cause: a missing wiki fact, a confusing tool result, an unclear instruction.
2. **Improving the benchmark itself**, so that its numbers can be trusted.
3. **Comparing models** on intelligence, speed, and cost, to decide which ones the Overseer should offer.

The first purpose is possible because of one design decision: **the benchmark tests the real chat**. The model under test receives the same instructions that the live Overseer chat uses, in its default concise answering style, and the same read-only lookup tools: wiki search, monster and item statistics, the knowledge base, and source code search. A weakness found in the benchmark is therefore a weakness real players would meet.

Benchmark results are used internally and are not published.

> ℹ️ **Term — harness:** The software around the exam: it asks the questions, enforces the limits, collects the answers, calls the graders, and computes the scores. Each change to it gets a new *harness version*, because results from different versions are not always comparable.

## 🧩 Suites, Questions and Rubrics

A **suite** is a set of questions, at most 50. The standard suite shipped with the Overseer has 18 questions: six Simple, six Intermediate, and six Advanced.

Every question has two difficulty labels:

- The **authored band** (Simple, Intermediate, or Advanced), chosen by whoever wrote the question.
- The **assessed difficulty**, a number from 1 to 100 rated by an AI model that an administrator picks for the job. Ratings of 1–35 count as Simple, 36–70 as Intermediate, and 71–100 as Advanced.

The assessed difficulty decides how much a question weighs in the final result, so a run cannot start until every question in the suite has one. Editing a question or its rubric clears the rating, because an edited question is a different question.

Each question also has a **rubric**. A rubric is divided into labelled parts: the facts a good answer is **required** to contain, the **critical errors** that would make the answer dangerous, the **scope** of the question, a note on the expected **form**, and the **sources** the facts come from. Only the required points and the critical errors can ever cost an answer points. Scope and form are notes for the grader.

### 🗺️ Game Snapshot Suites

A suite can be bound to a **game snapshot**: the text description of a real game situation, with the character, the map, the inventory, and recent messages. Questions in such a suite ask what the player should do *in that situation*, and must be impossible to answer without the snapshot. Their rubrics start with a list of snapshot facts, each of which must be quotable from the snapshot word for word.

Questions for a snapshot suite can be drafted by an AI, six per difficulty band by default. Every AI-written question stays marked as unreviewed until a human has checked it, and a report warns if a run included unreviewed questions.

> ℹ️ **Term — game snapshot:** The same kind of game-state summary that the game sends to the Overseer when you open the chat in the middle of a game. In benchmark rubrics it is also called the *board*.

## 🤖 The AI Roles in a Run

Up to four different AI roles take part in a run. Only one of them decides the score.

| Role | What it does | Affects the score? |
| :--- | :--- | :--- |
| **Candidate** | The model under test. Answers every question, using tools. | It is what is being scored |
| **Assessor** | Grades each answer against its rubric. Also writes the closing summary of the run. | ✅ Yes, the only grader that does |
| **Second opinion** | Grades selected answers again, independently. | ❌ No, advisory |
| **Claim verifier** | Fact-checks individual statements against the wiki and the source code, using tools. | ❌ No, advisory |

The second opinion and the claim verifier are optional, and their findings are **reported but never applied**. This is deliberate. If a later pass could change a score, the result would depend on whichever AI spoke last, and it would no longer be reproducible. Instead, disagreements are counted, shown in the report, and left for a human to judge.

> ℹ️ **Term — candidate:** The model taking the exam.

> ℹ️ **Term — LLM-as-a-judge:** Using one large language model to grade the output of another. It is fast and cheap, but a judge model has its own biases, which is why the benchmark surrounds it with checks.

> ℹ️ **Term — blind second opinion:** The second grader is not shown the first grade. If it were, it would tend to drift towards that grade instead of judging for itself, an effect called *anchoring*.

## 🪜 The Stages of a Run

A run proceeds in three stages:

1. **Answering and grading.** Each question is answered, and the answer is then graded, fact-checked, and given a second opinion if one is due. By default, questions are answered one at a time so that timing stays comparable.
2. **Follow-up grading passes.** A short tail of remaining fact-checks and second opinions.
3. **Synthesis and scoring.** The assessor writes an overall assessment, and the final indices are computed.

The candidate works under fixed limits on every question: at most **45 tool calls** spread over at most **22 rounds** of tool use, at most **28 calls to the model**, and a time limit of **7, 10, or 12 minutes** for a Simple, Intermediate, or Advanced question, as decided by its assessed difficulty. The live chat's default limits are kept at least as generous as these, so the exam never measures something the real chat would not be allowed to do.

## 💯 How an Answer Is Scored

### 📏 The Rating Scale

The assessor rates each of the four dimensions on a scale of seven levels, from 0 to 6. Each level has a written description, so that "level 4" means the same thing every time. The levels convert to points like this:

| Level | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Points** | 1 | 15 | 35 | 55 | 72 | 87 | 100 |

> ℹ️ **Term — BARS:** Behaviorally Anchored Rating Scale. A rating scale where every level is tied to a concrete description of what an answer at that level looks like, instead of a bare number. It comes from personnel evaluation and makes graders more consistent.

### ⚖️ The Weights

| Dimension | Weight | What it grades |
| :--- | :-: | :--- |
| **Accuracy** | 55% | Whether what the answer states is true |
| **Completeness** | 25% | Whether it covers what the question asked |
| **Conciseness** | 10% | Whether it avoids padding and repetition |
| **Readability** | 10% | Whether it is clearly structured and easy to follow |

### 🧮 Combining the Dimensions

The four point values are combined into one **quality score** from 1 to 100 with a weighted geometric mean:

$Quality = A^{0.55} \times C^{0.25} \times Cn^{0.10} \times R^{0.10}$

> ℹ️ **Term — geometric mean:** An average made by multiplying instead of adding. Its special property is that one very low value pulls the whole result down sharply.

> 💡 **Example:** An answer is beautifully written and complete (100 points on three dimensions) but mostly wrong (Accuracy level 1, 15 points). An ordinary weighted average would still give it 53. The geometric mean gives it 35. A well-presented wrong answer cannot hide behind its presentation.

### 🛑 The Critical Error Ceiling

If the assessor finds a **critical error**, the quality score is capped at **25**, whatever the levels were. A critical error is a confidently stated falsehood that a player would act on to their harm. Because this cap is so heavy, it has three safeguards:

- It must be something the answer **actually says**. Leaving something out is never a critical error.
- The assessor must **quote the offending sentence word for word**. The harness checks that the quote really appears in the answer, and ignores a critical error whose quote it cannot find.
- The claim verifier can check the quoted sentence against the game's source code. If the sentence turns out to be true, the critical error is marked as **contested** in the report.

## 📊 The Indices

### 🧠 Intelligence Index

The Intelligence Index is the average quality score over all questions, **weighted by assessed difficulty**: a question rated 80 counts four times as much as one rated 20. The report also shows the plain, unweighted average next to it, so you can see how much the weighting moved the result.

The index comes with a **95% confidence interval**. With only 18 questions, the index would have come out a little differently with a different set of 18, and the interval shows how much. Two runs whose intervals overlap cannot confidently be told apart.

> ℹ️ **Term — confidence interval:** A range around a measured value that expresses its uncertainty. "74 ± 6" means the true value is very probably between 68 and 80.

### 🏃 Speed Index

Each answer gets a speed score from 1 to 100, and the Speed Index is their plain average. Three design choices are worth knowing:

- **Only the model's own time counts.** Time spent executing tools is subtracted first, so a model is not punished for a slow search.
- **Harder questions get more time.** The target time is 2 seconds for the easiest questions and grows with assessed difficulty up to 4 seconds for the hardest. An answer within its target scores 100.
- **The scale is logarithmic.** Every doubling of the time costs 12 points: at the base target, 4 seconds scores 88, 8 seconds 76, 16 seconds 64, and 32 seconds 52.

The Speed Index only makes sense between runs with the same thinking level, since a model that is told to think longer will of course be slower.

> ℹ️ **Term — latency:** The delay between asking and getting the answer.

### 🪙 Cost

Every run records the tokens used by each role and converts them to money using the prices in force at the time of the run. The cost is shown per role, so you can see separately what the candidate cost and what the grading cost.

> ℹ️ **Term — token:** The unit in which AI usage is measured and billed; roughly three quarters of an English word.

## ⚖️ Fairness Safeguards

A large share of the system exists to make sure the grade reflects the answer, not a quirk of the grader:

- **Accuracy is graded against the rubric and the game snapshot only.** If the assessor merely *believes* from its own memory that a statement is false, it may not deduct points. It must record the statement as a suspected falsehood, and the claim verifier looks it up.
- **Knowing more than the rubric is not punished.** A statement the rubric does not mention goes on a list of *unverified claims*, which are checked, not penalized.
- **Every deduction must be explained.** Any Accuracy level below 6 has to name the statement that is wrong. A deduction with no stated reason is flagged and sent to the second grader.
- **An omission is counted once.** Missing information lowers Completeness. It may not lower Accuracy as well.
- **The question sets the scope.** If the rubric lists more than the question asked for, the extra points are noted as out of scope and cost nothing.
- **Provider failures are not model failures.** If the AI company's service fails on a question, the answer is excluded, and the run publishes no indices at all, since an index over only the questions that happened to work would be misleading. By contrast, a model that simply ends its turn without answering scores 0 for that question.
- **Same-company grading needs approval.** If the candidate and the assessor come from the same provider, the run has to be explicitly acknowledged, and the report says so.
- **Volume limits.** At most 5 runs per hour and 20 per day. Benchmark outputs are used only for evaluation, never for training any AI model, and every report carries a statement of that purpose.

## 🔁 Why One Run Is Not Enough

AI models are not deterministic: ask the same question twice and you get two different answers, and the grader varies too. So if an index moves by two points after a change, the honest question is whether two points is more than the benchmark's own **noise**.

The answer comes from a **replicate set**: the same configuration run several times in a row. From its spread, the system computes how reproducible the index is. It needs **at least three runs** before it reports any reproducibility figure, since a spread measured from two points is not a measurement.

Runs may only be averaged together if they were truly run under the same conditions. The system compares each run's recorded conditions (suite, question versions, model settings, instructions, tool guides, graders, limits) and refuses to pool runs that differ in anything that matters. When exactly one condition was changed on purpose, the two sets are **compared** with statistical tests instead of averaged.

> ℹ️ **Term — replicate:** A repeat of an experiment under identical conditions, done to measure how much the result varies by itself.

> ℹ️ **Term — noise:** The random variation in a measurement that has nothing to do with what you are trying to measure.

## 🩺 Keeping the Exam Healthy

After enough runs, the questions themselves are examined. Once a question has been answered in at least four runs, it can be flagged as:

- **Saturated** — nearly every model scores full marks, so it no longer tells models apart.
- **Miscalibrated** — models find it much harder or easier than its assessed difficulty says.
- **Unstable** — scores swing widely between runs, which often means the rubric is ambiguous.
- **Budget-bound** — models keep running into the tool limit, so the limit may be setting the score.

The list of unverified claims is also mined for **rubric gaps**. When models from two or more unrelated model families make the same claim that the rubric does not cover, the rubric is probably incomplete. When only one model ever makes it, it is more likely an invention of that model.

All of these findings are shown to a human. Nothing is changed automatically. In particular, a question's measured difficulty is never written back as its weight, because a model that does badly on a question would then reduce that question's weight and flatter its own result.

## 📄 Reading a Report

Every run can be exported as a report with seven parts:

1. **Run Manifest** — what was tested and under which conditions.
2. **Results Summary** — the indices, the breakdown by difficulty, agreement between graders, and cost.
3. **Questions and Replies** — every question, answer, grade, and tool call.
4. **Scoring Method & Configuration** — the exact scoring settings that were used.
5. **Issues** — everything that went wrong or was flagged.
6. **Synthesis Assessment** — the assessor's written overall assessment.
7. **Final Indices**

> 💡 **Tip:** Read the manifest and the issues before the indices. An index only means something once you know the conditions it was measured under and whether anything went wrong on the way.

## 🚧 What the Benchmark Does Not Measure

The benchmark covers single questions asked in the chat's default configuration. It does not yet measure:

- Conversations with several turns, where earlier messages matter.
- The wiki excerpts that the live chat adds to a question automatically before the model sees it. In the benchmark, the model has to find everything through its tools.
- Spoiler-free mode.
- Web search.
- Sub-agents.

## 📚 Glossary

| Term | Meaning |
| :--- | :--- |
| **Assessor** | The AI that grades the answers; the only role whose verdict sets the score |
| **Assessed difficulty** | An AI-rated difficulty from 1 to 100 that sets a question's weight |
| **BARS** | A rating scale whose levels are tied to written descriptions |
| **Candidate** | The model under test |
| **Claim verifier** | An AI that fact-checks single statements against the wiki and the source code |
| **Confidence interval** | The range of uncertainty around a measured value |
| **Critical error** | A confidently stated, harmful falsehood; caps the quality score at 25 |
| **Game snapshot** | A text description of a game situation that questions can be based on |
| **GnollBench** | The name of the Gnoll Overseer's AI benchmarking system |
| **Harness** | The software that runs the exam |
| **Intelligence Index** | The difficulty-weighted average quality score of a run |
| **Quality score** | The combined 1–100 score of a single answer |
| **Replicate set** | The same configuration run several times to measure noise |
| **Rubric** | The answer key of one question |
| **Second opinion** | An independent, advisory re-grading of selected answers |
| **Speed Index** | The average speed score of a run |
| **Suite** | A set of benchmark questions |
| **Unverified claim** | A statement in an answer that the rubric neither confirms nor contradicts |

## 💡 Summary

- The benchmark tests the real chat: same instructions, same tools, same limits.
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
