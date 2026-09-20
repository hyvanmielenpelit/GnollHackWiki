> 👉 **GnollBench is the exam that every AI model has to pass before it is offered to players in the Gnoll Overseer. This page explains, in plain language, what it is, how it works, and why it exists.**

> ℹ️ **Note:** This is part 1 of the three GnollBench guides. Part 1, **Introduction to GnollBench**, is for newcomers. Part 2, [[/Guides/Advanced Guide to GnollBench]], explains scoring, grading, and repeated runs. Part 3, [[/Guides/Technological Overview of GnollBench]], gives the formulas and statistics.

## 🐺 What Is GnollBench?

Think of a school exam. Every student gets the same questions, a teacher marks the answers against an answer key, and at the end everyone has a grade that can be compared fairly. GnollBench is the same idea, with AI models as the students: the Gnoll Overseer's developers give a model a fixed set of GnollHack questions, mark its answers, and end up with grades that show how good the model is at helping players.

| School exam | GnollBench |
| :--- | :--- |
| **Students** | AI models |
| **Exam paper** | A suite of 18 questions |
| **Answer key** | The rubric |
| **Teacher** | The assessor (a second AI) |
| **Grades** | Intelligence, Speed, Cost |

## 📋 GnollBench at a Glance

| | GnollBench |
| :--- | :--- |
| **What it is** | The Gnoll Overseer's AI benchmarking system: a fixed GnollHack exam for AI models |
| **What it tests** | The real Overseer chat: same instructions, same lookup tools, same limits |
| **Standard suite** | 18 questions: 6 easy (Simple), 6 medium (Intermediate), 6 hard (Advanced); custom suites can have up to 50 |
| **Graded on** | Accuracy 55%, Completeness 25%, Conciseness 10%, Readability 10% |
| **Results** | Intelligence, Speed, Cost |
| **Who runs it** | The Overseer's administrators. Players cannot run it, and results are internal |

## 🎯 Why GnollBench Exists

GnollBench exists for three reasons, in this order of importance:

| Priority | Goal | What it means for players |
| :--- | :--- | :--- |
| **1st** | Making the Overseer's chat better | GnollBench uses the very same instructions and the very same lookup tools as the real chat. When a model gives a wrong answer, the developers can find out why: maybe a wiki page is missing a fact, or a tool returned something confusing. Then they fix it for everyone. |
| **2nd** | Making GnollBench itself better | A test is only useful if it is fair and accurate, so GnollBench is checked and improved too. |
| **3rd** | Finding the best models | The grades show which models are smart enough, fast enough, and cheap enough to be offered to players. |

> ℹ️ **Note:** GnollBench is a tool for the Overseer's developers. Players cannot run it, and the results are used internally. What players get out of it is better answers and well-chosen models.

## 🪜 How a GnollBench Run Works

A GnollBench run has four steps:

1. **The question set is chosen.** The standard suite has 18 questions about GnollHack: six easy, six medium, and six hard.
2. **The model answers every question.** It may search the wiki and look up monsters and items, just like the Overseer does when you chat with it.
3. **A second AI marks each answer.** It compares the answer with the rubric written for that question.
4. **The marks are combined** into a few final grades for the whole run.

> 💡 **Example:** This is an illustrative question, not one from the real suite, walking through the four steps above. Suppose the question was "Is it safe to attack a cockatrice bare-handed?"
>
> 1. The question is part of the suite chosen for the run.
> 2. The model answers, perhaps searching the wiki for "cockatrice".
> 3. The assessor marks the answer against its rubric. A confident "yes" would be wrong and dangerous: touching a [[/Monsters/cockatrice]] petrifies.
> 4. The mark for this question becomes part of the run's final grades.

## 💯 What GnollBench Grades

Each answer is graded on four things:

| What | The question behind it | How much it matters |
| :--- | :--- | :--- |
| **Accuracy** | Is everything the answer says true? | The most, more than the other three together |
| **Completeness** | Does it cover what the player asked? | Second most |
| **Conciseness** | Does it get to the point without padding? | A little |
| **Readability** | Is it clear and easy to follow? | A little |

There is one extra rule for dangerous mistakes:

> ⚠️ **Warning:** If an answer confidently tells the player something false that would hurt them if they acted on it, such as advice that gets their character killed, this is a **critical error**, and the answer can only receive a low grade, however good the rest of it is.

> 💡 **Example:** An answer is well written, complete, and correct in every detail but one: it says that a cockatrice is safe to hit bare-handed. Touching a cockatrice petrifies, so a player who trusted the answer would lose their character. That is a critical error, and the answer scores low.

## 📊 The Three GnollBench Results

Every run ends with three results:

| Result | What it measures | Worth knowing |
| :--- | :--- | :--- |
| **🧠 Intelligence** | How good the answers were | Hard questions count for more than easy ones |
| **🏃 Speed** | How quickly the model answered | Only the model's own thinking time counts, not the time spent waiting for wiki searches |
| **🪙 Cost** | How much the run cost | Measured in usage fees |

No single result decides everything. A brilliant model that takes minutes to answer, or one that is too expensive to offer, is not a good assistant. The models offered in the Overseer are chosen by weighing all three GnollBench results.

## ⚖️ How GnollBench Stays Fair

An exam marked by an AI needs safeguards, and GnollBench has several:

| Safeguard | What it means |
| :--- | :--- |
| **Same exam for everyone** | Every model gets the same questions, the same instructions, the same tools, and the same limits |
| **An independent grader** | The grader normally comes from a different company than the model being tested. If it does not, this has to be approved separately and is written in the report |
| **A second grader** | A run can include another AI that re-marks a share of the answers without seeing the first grade. If the two disagree a lot, a human takes a look |
| **A fact-checker** | When the answer says something the rubric does not cover, a third AI can check it against the game's wiki and source code. A model is never marked down just for knowing more than the rubric |
| **Technical problems do not count** | If the AI company's service breaks down in the middle of a question, that is not the model's fault, and it is not treated as a wrong answer |

## ❓ Common Questions

- **Can I run GnollBench myself?** No. GnollBench is a tool for the Overseer's developers and administrators; players cannot run it.
- **Are GnollBench results published?** No. They are used internally, not published.
- **Does GnollBench test the same Overseer I chat with?** Yes. It uses the same instructions and the same lookup tools as the real chat.

## 📚 GnollBench Vocabulary

| Term | Meaning |
| :--- | :--- |
| **AI model** | The "brain" that writes the Overseer's answers. Several companies make them, and they differ in how smart, how fast, and how expensive they are. See [[/Guides/Choosing AI Model for Gnoll Overseer]] |
| **Assessor** | The AI that marks the answers in a GnollBench run, also called the grader. It plays the teacher's role |
| **Benchmark** | A standard test that is given in exactly the same way every time, so that the results can be compared with each other |
| **Critical error** | A confidently stated falsehood that would hurt a player who acted on it. It caps an answer to a low grade, however good the rest of it is |
| **Hallucination** | When an AI model confidently states something that it has simply made up. Catching hallucinations is one of the main reasons GnollBench exists |
| **Rubric** | The answer key of one question. It lists the facts a good answer must contain and the mistakes that would be dangerous |
| **Suite** | A set of GnollBench questions that belong together. It is the "exam paper" |

## 💡 Summary

- GnollBench is an exam for AI models: same questions, an answer key, and comparable grades.
- Its first purpose is to find and fix problems in the Overseer's chat. Comparing models comes after that.
- Answers are graded mostly on accuracy, and dangerous false advice is punished hard.
- Each run reports Intelligence, Speed, and Cost.
- Several safeguards keep GnollBench fair.

## 🔗 Learn More

- [[/Gnoll Overseer Guides]] — All Gnoll Overseer guides in one place.
- [[/Guides/Advanced Guide to GnollBench]] — The next step in the GnollBench series: how scoring, grading, and repeated runs work.
- [[/Guides/Technological Overview of GnollBench]] — The technical details of GnollBench, for readers who know AI evaluation.
- [[/Guides/Comparison of GnollBench and Popular AI Benchmarks]] — How GnollBench relates to well-known public AI benchmarks.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — Which model to pick for which task.
- [[/Guides/Introduction to Gnoll Overseer]] — What the Gnoll Overseer is and how to access it.
