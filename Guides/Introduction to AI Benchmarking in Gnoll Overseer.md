> 👉 **Before an AI model is offered to players in the Gnoll Overseer, it has to pass an exam. That exam is called AI benchmarking. This page explains, in plain language, what it is, how it works, and why it makes the Overseer's answers better.**

## ❓ What Is AI Benchmarking?

Think of a school exam. Every student gets the same questions, a teacher marks the answers against an answer key, and at the end everyone has a grade that can be compared fairly.

AI benchmarking is the same idea, with AI models as the students. The Gnoll Overseer's developers give a model a fixed set of GnollHack questions, mark its answers, and end up with grades that show how good the model is at helping players.

> ℹ️ **Term — AI model:** The "brain" that writes the Overseer's answers. Several companies make them, and they differ in how smart, how fast, and how expensive they are. See [[/Guides/Choosing AI Model for Gnoll Overseer]].

> ℹ️ **Term — benchmark:** A standard test that is given in exactly the same way every time, so that the results can be compared with each other.

## 🎯 Why the Overseer Is Benchmarked

Benchmarking has three goals, in this order of importance:

1. **Making the Overseer's chat better.** The exam uses the very same instructions and the very same lookup tools as the real chat. When a model gives a wrong answer in the exam, the developers can find out why. Maybe a wiki page is missing a fact, or a tool returned something confusing. Then they fix it for everyone.
2. **Making the exam itself better.** A test is only useful if it is fair and accurate, so the test is checked and improved too.
3. **Finding the best models.** The grades show which models are smart enough, fast enough, and cheap enough to be offered to players.

> ℹ️ **Note:** Benchmarking is a tool for the Overseer's developers. Players cannot run benchmarks, and the results are used internally. What players get out of it is better answers and well-chosen models.

## 📋 How a Benchmark Works

A benchmark run has four steps:

1. **The question set is chosen.** The standard set has 18 questions about GnollHack: six easy, six medium, and six hard.
2. **The model answers every question.** It may search the wiki and look up monsters and items, just like the Overseer does when you chat with it.
3. **A second AI marks each answer.** It compares the answer with an answer key written for that question.
4. **The marks are combined** into a few final grades for the whole run.

> ℹ️ **Term — suite:** A set of benchmark questions that belong together. It is the "exam paper".

> ℹ️ **Term — rubric:** The answer key of one question. It lists the facts a good answer must contain and the mistakes that would be dangerous.

> ℹ️ **Term — assessor:** The AI that marks the answers, also called the grader. It plays the teacher's role.

## 💯 What Is Graded

Each answer is graded on four things:

| What | The question behind it | How much it matters |
| :--- | :--- | :--- |
| **Accuracy** | Is everything the answer says true? | The most, more than the other three together |
| **Completeness** | Does it cover what the player asked? | Second most |
| **Conciseness** | Does it get to the point without padding? | A little |
| **Readability** | Is it clear and easy to follow? | A little |

There is one extra rule for dangerous mistakes. If an answer confidently tells the player something false that would hurt them if they acted on it, such as advice that gets their character killed, this is a **critical error**, and the answer can only receive a low grade, however good the rest of it is.

> ℹ️ **Term — hallucination:** When an AI model confidently states something that it has simply made up. Catching hallucinations is one of the main reasons for benchmarking.

## 📊 The Three Results

Every run ends with three results:

- 🧠 **Intelligence** — how good the answers were. Hard questions count for more than easy ones.
- 🏃 **Speed** — how quickly the model answered. Only the model's own thinking time counts, not the time spent waiting for wiki searches.
- 🪙 **Cost** — how much the run cost in usage fees.

No single result decides everything. A brilliant model that takes minutes to answer, or one that is too expensive to offer, is not a good assistant. The models offered in the Overseer are chosen by weighing all three.

## ⚖️ Keeping It Fair

An exam marked by an AI needs safeguards, and the benchmark has several:

- **Same exam for everyone.** Every model gets the same questions, the same instructions, the same tools, and the same limits.
- **An independent grader.** The grader normally comes from a different company than the model being tested. If it does not, this has to be approved separately and is written in the report.
- **A second grader.** A run can include another AI that re-marks a share of the answers without seeing the first grade. If the two disagree a lot, a human takes a look.
- **A fact-checker.** When the answer says something the answer key does not cover, a third AI can check it against the game's wiki and source code. A model is never marked down just for knowing more than the answer key.
- **Technical problems do not count.** If the AI company's service breaks down in the middle of a question, that is not the model's fault, and it is not treated as a wrong answer.

## 💡 Summary

- AI benchmarking is an exam for AI models: same questions, an answer key, and comparable grades.
- Its first purpose is to find and fix problems in the Overseer's chat. Comparing models comes after that.
- Answers are graded mostly on accuracy, and dangerous false advice is punished hard.
- Each run reports intelligence, speed, and cost.
- Several safeguards keep the grading fair.

## 🔗 Learn More

- [[/Gnoll Overseer Guides]] — All Gnoll Overseer guides in one place.
- [[/Guides/Advanced Guide to AI Benchmarking in Gnoll Overseer]] — The next step: how scoring, grading, and repeated runs work.
- [[/Guides/Technological Overview of AI Benchmarking in Gnoll Overseer]] — The technical details, for readers who know AI evaluation.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — Which model to pick for which task.
- [[/Guides/Introduction to Gnoll Overseer]] — What the Gnoll Overseer is and how to access it.
