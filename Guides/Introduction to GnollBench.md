![GnollBench](/uploads/GnollBench/gnollbench-logo-256-v3.webp)

> 👉 **GnollBench is the exam that every AI model has to pass before it is offered to players in the Gnoll Overseer.**

> ℹ️ **Note:** This is part 1 of the three GnollBench guides. Part 1, **Introduction to GnollBench**, is for newcomers. Part 2, [[/Guides/Advanced Guide to GnollBench]], explains scoring, grading, and repeated runs. Part 3, [[/Guides/Technological Overview of GnollBench]], gives the formulas and statistics.

## 📋 GnollBench at a Glance

| | GnollBench |
| :--- | :--- |
| **What it is** | The Gnoll Overseer's AI benchmarking system |
| **What it tests** | The real Overseer chat: same instructions, same lookup tools, same limits |
| **Standard suite** | 18 questions: 6 easy (Simple), 6 medium (Intermediate), 6 hard (Advanced) |
| **Graded on** | Accuracy 55%, Completeness 25%, Conciseness 10%, Readability 10% |
| **Graded by** | Two AI graders from two different AI providers; the grade is their average |
| **Results** | Intelligence, speed, and cost |
| **Who runs it** | The Overseer's administrators. Players cannot run it. |

## 🎯 Why GnollBench Exists

GnollBench has three purposes, and the most important one is making the Overseer's chat better. GnollBench uses the same instructions and the same lookup tools as the real chat, so when a model gives a wrong answer, the developers can find out why: maybe a wiki page is missing a fact, or a tool returned something confusing. Then they fix it for everyone.

The second purpose is making GnollBench itself better, because a test is only useful if it is fair and accurate. The third is finding the best models: the grades show which models are smart enough, fast enough, and cheap enough to be offered to players.

## 🪜 How a GnollBench Run Works

A GnollBench run has four steps:

1. **The question set is chosen.** The standard suite has 18 questions about GnollHack: six easy, six medium, and six hard.
2. **The model answers every question.** It may search the wiki and look up monsters and items, just like the Overseer does when you chat with it.
3. **Two AIs from different companies mark each answer.** Each compares the answer with the rubric written for that question, without seeing the other's mark, and the grade is their average.
4. **The marks are combined** into a few final grades for the whole run.

## 💯 What GnollBench Grades

Each answer is graded on four things:

| What | The question behind it | How much it matters |
| :--- | :--- | :--- |
| **Accuracy** | Is everything the answer says true? | The most, more than the other three together |
| **Completeness** | Does it cover what the player asked? | Second most |
| **Conciseness** | Does it get to the point without padding? | A little |
| **Readability** | Is it clear and easy to follow? | A little |

One more rule covers dangerous mistakes:

> ⚠️ **Warning:** If an answer confidently tells the player something false that would hurt them if they acted on it, such as advice that gets their character killed, this is a **critical error**, and the answer can only receive a low grade, however good the rest of it is. The falsehood must be one that the answer key, or the game situation the question is about, shows to be false; a grader's own hunch is not enough.

Suppose an answer is well written, complete, and correct in every detail but one: it says that a cockatrice is safe to hit bare-handed. The answer key warns about exactly this, because touching a [[/Monsters/cockatrice]] petrifies, and a player who trusted the answer would lose their character. That is a critical error, and the answer scores low.

Normally both graders have to see a critical error. If only one of them does, a fact-checking AI looks the sentence up in the game's wiki and source code and settles it; if the fact-checker cannot decide, the two grades are simply averaged. A hedged "I think…" is graded as an ordinary claim: if it is wrong it loses points, but it is not a critical error unless it recommends one of the dangerous actions the answer key warns about.

### 🙋 Honesty Pays

The Overseer is told to say so when it cannot find or verify something, instead of guessing. GnollBench rewards that. An honest, specific "I could not find this" with nothing false in it is called **not attempted**, and it scores **at least 50** out of 100. That is about as much as an answer that guesses and gets much of it wrong, and at least twice as much as an answer with a critical error.

> 💡 **Example:** Suppose a model cannot find out whether a rare trap is dangerous. One answer says: "I could not verify this in the wiki or the game data. Check the trap's wiki page before stepping on it." It states nothing false, so it scores at least 50. Another answer confidently says the trap is harmless, while the answer key says it can kill. That is a critical error, and that answer scores 25 at most.

## 📊 The Three GnollBench Results

Every run ends with three results, plus a set of outcome figures:

| Result | What it measures | Worth knowing |
| :--- | :--- | :--- |
| **Intelligence** | How good the answers were | Hard questions count for more than easy ones |
| **Speed** | How quickly the model answered | Only the model's own thinking time counts, not the time spent waiting for wiki searches |
| **Cost** | How much the run cost | Measured in usage fees |
| **Outcomes** | How often the answer was right, partly right, wrong, or honestly declined, and how often dangerous errors occurred | Shown beside the three results; they do not change them |

The models offered in the Overseer are chosen by weighing all three results, so a model with excellent answers can still be passed over if it takes minutes to answer or costs too much to offer.

## ⚖️ How GnollBench Stays Fair

Because the answers are marked by AIs, GnollBench has these safeguards:

| Safeguard | What it means |
| :--- | :--- |
| **Same exam for everyone** | Every model gets the same questions, the same instructions, the same tools, and the same limits |
| **Two graders from two companies** | Every answer is graded by two AIs from two different companies, and its grade is their average. A grader may favor its own company's models a little, so the two graders' biases tend to cancel out. The model being tested never grades itself |
| **A reference reader** | A third AI, from a third company, re-reads every answer without seeing the other grades. It never changes a grade, but if it disagrees a lot, the answer is marked for a human to look at |
| **A fact-checker** | When the answer says something the rubric does not cover, or a grader calls a sentence false, another AI can check it against the game's wiki and source code. It also settles a critical error that only one of the two graders saw. A model is never marked down just for knowing more than the rubric |
| **Technical problems do not count** | If the AI company's service breaks down in the middle of a question, that is not the model's fault, and it is not treated as a wrong answer |

## ❓ Common Questions

- **Can I run GnollBench myself?** No. GnollBench is a tool for the Overseer's developers and administrators; players cannot run it.
- **Are GnollBench results published?** Preliminary results have, as an executive summary. The details of each run stay internal, but anyone interested can ask to see results, which may be anonymized.
- **Does GnollBench test the same Overseer I chat with?** Yes. It uses the same instructions and the same lookup tools as the real chat.

## 📚 GnollBench Vocabulary

| Term | Meaning |
| :--- | :--- |
| **AI model** | The "brain" that writes the Overseer's answers. Several companies make them, and they differ in how smart, how fast, and how expensive they are. See [[/Guides/Choosing AI Model for Gnoll Overseer]]. |
| **Assessor** | One of the two AIs that mark the answers in a GnollBench run, also called graders. Together they play the teacher's role. |
| **Benchmark** | A standard test that is given in exactly the same way every time, so that the results can be compared with each other. |
| **Critical error** | A confidently stated falsehood, shown false by the answer key, that would hurt a player who acted on it. It caps an answer to a low grade, however good the rest of it is. |
| **Hallucination** | When an AI model confidently states something that it has simply made up. Catching hallucinations is one of the main reasons GnollBench exists. |
| **Not attempted** | An honest answer that says it could not find or verify what was asked, with nothing false in it. It scores at least 50. |
| **Panel** | The two assessors from two different companies that grade every answer together. |
| **Reference reader** | A third AI, from a third company, that re-reads every answer for comparison but never changes a grade. |
| **Rubric** | The answer key of one question. It lists the facts a good answer must contain and the mistakes that would be dangerous. |
| **Suite** | A set of GnollBench questions that belong together. It is the "exam paper." |

## 📖 Learn More

- [[/GnollBench]] — All GnollBench guides in one place.
- [[/Guides/Comparison of GnollBench and Popular AI Benchmarks]] — How GnollBench relates to well-known public AI benchmarks.
