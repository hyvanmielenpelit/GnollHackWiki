> 👉 **The Gnoll Overseer's AI benchmarking system is called GnollBench. This page puts it side by side with well-known public AI benchmarks, such as those of Artificial Analysis, and shows what each is good at, where each falls short, and why they work best together.**

> ℹ️ **Note:** Public benchmarks change quickly. They are described here as of September 2026, so check each benchmark's own pages, linked at the end, for current details. GnollBench is described as of harness version 37 and scoring method version 12.

## 📖 Two Different Questions

From a distance, all AI benchmarks look alike: give AI models a fixed set of tasks, and turn the results into numbers. The important difference is **which question the numbers answer**.

| | Public benchmarks | GnollBench |
| :--- | :--- | :--- |
| **The question** | "How capable is this model *in general*?" | "How good is the *Gnoll Overseer* when this model drives it?" |
| **What is tested** | The model, under neutral conditions | One product, with its own instructions and lookup tools |
| **Subject** | Mathematics, science, coding, office work, and more | GnollHack only |
| **Made for** | Everyone who has to choose a model | The Overseer's developers |

> 💡 **Example:** A public index cannot tell you whether a model gives sound advice about fighting a cockatrice. GnollBench cannot tell you whether a model is any good at law or physics.

**Neither question can be answered with the other's tool.** That is why this page treats GnollBench as a complement to public benchmarks, not as a rival.

> 💡 **Tip:** Think of hiring. Public benchmarks are the applicant's **school grades**: broad, standardized, and comparable across everyone. GnollBench is the **trial day at the actual workplace**: narrow, but it shows how the applicant does *this* job with *these* tools. A sensible employer looks at both.

New to the topic? [[/Guides/Introduction to GnollBench]] explains what GnollBench is in plain language.

## 🌍 The Public Benchmarks in Brief

There are hundreds of AI benchmarks. The ones below are well known, and each represents a different way of testing.

| Benchmark | Who decides what is "good" | In one sentence |
| :--- | :--- | :--- |
| **Artificial Analysis** | Program tests and AI judges | Ten different tests rolled into one index, plus live speed and price tracking |
| **Arena** | Human voters | People pick the better of two anonymous answers |
| **Expert exams** | An answer key with exact answers | Very hard questions written by specialists |
| **LiveBench** | An answer key with exact answers | Questions that are replaced regularly, so models cannot memorize them |
| **HELM** | Many different metrics | The broadest and most transparent academic test collection |
| **HealthBench** | An AI grader with physician-written answer keys | Health conversations graded against detailed checklists |
| **BALROG** | The game itself | AI models *play* games, including NetHack |

### 📈 Artificial Analysis

[Artificial Analysis](https://artificialanalysis.ai/) is an independent company that tests AI models, and the services that host them, and publishes the results. Its headline number is the **Intelligence Index** (version 4.3.2 at the time of writing), which combines **ten separate tests** in four groups:

| Group | Share of the index | What the model has to do |
| :--- | :-: | :--- |
| **Agents** | 30% | Carry out long, multi-step work tasks by itself |
| **General** | 30% | Recall knowledge, reason over long documents |
| **Coding** | 20% | Write programs that pass tests |
| **Scientific reasoning** | 20% | Solve very hard science problems |

- **Size:** the ten tests range from 66 long tasks to **6,000 short questions**.
- **Grading:** program tests for code, an AI "answer checker" for short answers, and panels of several AI judges for open-ended work.
- **Reliability:** Artificial Analysis estimates that the index is accurate to **within ±1%**, based on repeated runs.
- **Speed and price** are tracked separately and continuously: each hosted model is called **eight times a day**, and the site shows the typical result of the last 72 hours.

> 💡 **Interesting catch:** One of the ten tests *subtracts* points for a wrong answer, while "I don't know" costs nothing. A model that bluffs scores worse than one that admits ignorance. GnollBench's critical error rule, described below, comes from the same worry.

### 🗳️ Arena

[Arena](https://arena.ai/) started in 2023 as Chatbot Arena at the University of California, Berkeley, was later called LMArena, and has carried its current name since January 2026. **It has no answer key at all:**

1. A visitor asks anything they like.
2. Two anonymous models answer.
3. The visitor votes for the better answer, and only then learns which models they were.

Millions of such votes are turned into ratings, much like chess ratings.

> ⚠️ **The catch:** Arena measures what people **prefer**, which is valuable and hard to measure any other way. But a preferred answer is not always a **correct** one. A confident, nicely formatted answer can win the vote while being wrong.

### 🎓 Expert Exams

These are very hard questions written by specialists, with answers that can be checked exactly. Well-known ones are **Humanity's Last Exam**, **GPQA Diamond**, and [Epoch AI's](https://epoch.ai/benchmarks) **FrontierMath**.

- **Secret questions.** FrontierMath has 338 problems, and only twelve of them are public. Models cannot have seen the rest during training.
- **Many repeats.** Epoch AI runs most models 16 times on GPQA Diamond, to average out luck.

> 💡 **Interesting catch:** Even experts make mistakes. In June 2026, Epoch AI released a major FrontierMath update that fixed errors in **42% of the problems**. Every benchmark, large or small, needs its answer keys checked. GnollBench has routines for that too.

### 🔬 LiveBench and HELM

- [LiveBench](https://livebench.ai/) fights memorization by **regularly replacing its questions** with new ones drawn from recent material. Answers are checked against exact solutions, with **no AI judge** involved.
- [HELM](https://crfm.stanford.edu/helm/), from Stanford University, takes the broadest view: many situations measured in many ways, not only accuracy. Its hallmark is **transparency**: every question and every model reply is published.

### 🩺 HealthBench

[HealthBench](https://openai.com/index/healthbench/), published by OpenAI, is **GnollBench's closest relative in method**. It consists of 5,000 health conversations, and 262 physicians wrote a separate checklist for each one: **48,562 criteria** in all, each worth a number of points. An AI grader goes through every checklist.

> 💡 **Interesting catch:** Can an AI grader be trusted? HealthBench's authors tested this, and found that their AI grader agreed with physicians about as often as **physicians agree with each other**. GnollBench works the same way on a far smaller scale, but has no such study behind it, and its checklists are usually drafted by an AI and reviewed by the developers, not written by outside experts.

### 🕹️ BALROG

[BALROG](https://arxiv.org/abs/2411.13543) is **the closest relative in subject**. It makes AI models *play* games, the hardest of them NetHack, and scores how far they get.

- In the original 2024 study, the best models averaged **under 2%** of the way through NetHack.
- A [blog report from January 2026](https://kenforthewin.github.io/blog/posts/nethack-agent/) described a best run that reached dungeon level 10, still only **about an eighth** of the way by BALROG's measure.

> ℹ️ **Note:** GnollBench tests something different. It does not ask the model to play the game, but to **advise a human** who plays it.

## 📊 Side-by-Side Comparison

### 🎯 What Is Tested

| | GnollBench | Artificial Analysis index | Arena | Expert exams |
| :--- | :--- | :--- | :--- | :--- |
| **Main purpose** | Improve one product | Compare models for everyone | Rank models by human preference | Track the limits of AI ability |
| **What is tested** | The model inside the real Overseer chat | The model under neutral conditions | The model as a chat partner | The model by itself |
| **Subject** | GnollHack | Agents, coding, knowledge, science | Whatever visitors ask | Science, mathematics, knowledge |
| **Size** | **18 questions** in the default suite; custom suites of any size up to 50 | Thousands of items | Millions of votes | Hundreds to thousands of questions |
| **Who writes the questions** | Usually an AI that can consult the game's source code and this wiki; the developers review them | Artificial Analysis and outside authors | The visitors | Subject specialists |
| **Who writes the answer keys** | Usually an AI, from the same sources; improved between runs in the light of the results | The authors of each test | There are none | Subject specialists |
| **Tools for the model** | 16 of the Overseer's 30 tools: the lookups for the wikis, game data, and source code | Code and web tools in the agent tests | Usually none | Usually none |

> ℹ️ **Note:** The Overseer's other tools are left out of the exam because they do not suit a fixed test. They read the player's own game and files, search GitHub or the server's game records, or hand work to helper AIs.

> ℹ️ **Note:** When a suite is built around a game situation, that situation is always taken from a **real, live game**. It is never invented by an AI.

### 📏 How It Is Measured

| | GnollBench | Artificial Analysis index | Arena | Expert exams |
| :--- | :--- | :--- | :--- | :--- |
| **Who grades** | One AI grader with a written answer key | Program tests, AI checkers, AI judge panels | Humans | An exact answer key |
| **Score** | Index from 1 to 100; hard questions count more | Weighted average of ten tests | Chess-like rating | Percentage correct |
| **Handling of chance** | Uncertainty range on every run; repeated runs | Repeated runs; stated ±1% | Uncertainty range on every rating | Repeated runs by some publishers |
| **Speed** | The model's own thinking time per answer | Live speed of each hosting service | Not measured | Not measured |
| **Cost** | Actual cost of each run | Price lists, and the cost of running the index | Not measured | Usually not measured |
| **Results** | **Internal** | Public | Public | Public |

> ℹ️ **Term — AI judge:** An AI model that grades another AI model's answers. It is fast and cheap, but it has blind spots of its own, which is why benchmarks that use one surround it with checks.

## ✨ What Is Unique About GnollBench

> 📢 **Important:** Few of these ideas are unique one by one, and the last column shows related ideas elsewhere. What is unusual is **their combination, and the purpose they serve**: making one product better.

| Feature | What it means | A related idea elsewhere |
| :--- | :--- | :--- |
| **It tests the real product** | The model gets the very same instructions as the live Overseer chat, and the same lookup tools for the wikis, game data, and source code | Public benchmarks must use neutral conditions to be fair to every model |
| **Finding faults comes first** | The main goal is to trace wrong answers to a fixable cause. Comparing models comes last | Most benchmarks exist to rank models |
| **A rule for dangerous advice** | A confident falsehood that would hurt the player caps the answer at **25 out of 100**. The grader must quote the sentence word for word | Artificial Analysis's penalty for bluffing; HealthBench's criteria with negative points |
| **One grader scores; the rest advise** | A second grader and a fact-checker examine answers, but never change a score, so results stay repeatable | Arena's voters also judge blind, without knowing which model wrote what |
| **Answers are checked against the game** | A fact-checking AI looks claims up in the game's wiki and source code. Knowing more than the answer key is not punished | Rare, because few benchmarks cover a single piece of software |
| **No misleading numbers** | If the AI company's service failed during a run, no indices are shown at all | Reporting uncertainty ranges is common; withholding results is not |
| **Real game situations** | Questions can be tied to a situation captured from a live game: "what should I do *here*?" | BALROG also puts models into real game states, as players |
| **The exam examines itself** | Questions that everyone passes, or whose scores jump around, are flagged for a human, and answer keys are improved between runs | Expert exams retire or repair questions too, as FrontierMath did |

> 💡 **Example:** Suppose a model answers a question about a wand wrongly. For a ranking benchmark, that is one lost point. For GnollBench it is a lead: was the fact missing from this wiki? Did a lookup tool return something confusing? Once the cause is fixed, **every** model in the Overseer answers better. A failed question is often worth more to the developers than a passed one.

## 💪 Where the Public Benchmarks Are Stronger

GnollBench is a small, internal tool, and in several respects the public benchmarks are simply better.

| Strength | Public benchmarks | GnollBench |
| :--- | :--- | :--- |
| **Scale** | Thousands of questions, so chance evens out | 18 questions in the default suite and 50 at most in a custom one, so chance plays a large part |
| **Breadth** | Many fields, long documents, images, long conversations, multi-step work | Single questions about one game |
| **Grading** | Program tests, exact answers, and human votes do not share one AI grader's blind spots | One AI grader sets every score |
| **Openness** | Results can be checked and criticized by anyone | Results are internal, so the method must be taken on trust |
| **Independence** | The testers do not build the products they test | Reviewed and run by the team that builds the Overseer |
| **Live speed data** | Measured around the clock, across hosting services | Only seen during its own runs |

> ⚠️ **The catch with a small exam:** Repeating a short exam many times tells you how *steady* a model is, but it never makes the exam any *bigger*. The uncertainty that comes from having few questions can only be reduced by adding questions. GnollBench allows custom suites larger than the default 18, but even the largest stays far below the size of a public benchmark.

## 🚧 Limitations on Both Sides

### 🐺 GnollBench

| Limitation | Why it matters |
| :--- | :--- |
| **Small suites** | With 18 questions in the default suite, and a few dozen at most in a custom one, a few lucky or unlucky answers move the result |
| **AI-drafted questions and answer keys** | Human review catches mistakes, but an AI's blind spots can still slip into the exam |
| **Answer keys keep changing** | Improving an answer key makes the exam better, but results from before and after the change can no longer be averaged together |
| **A single AI grader** | However carefully it is constrained, the score depends on it. Changing the grader starts a new series of results |
| **AI-rated difficulty** | The ratings that make hard questions count more are themselves made by an AI |
| **Not published** | Nobody outside can verify the results |
| **Single questions only** | Longer conversations, spoiler-free mode, and web search are not measured |
| **One subject** | A good result says nothing about anything other than GnollHack |

### 🌍 Public Benchmarks

| Limitation | Why it matters |
| :--- | :--- |
| **Contamination** | Published questions end up in training data, and scores rise without models getting smarter |
| **Saturation** | Once the best models score near the top, the benchmark stops telling them apart |
| **Neutral conditions are nobody's conditions** | A product's own instructions and tools can change a model's behavior a great deal |
| **Preference is not correctness** | In vote-based rankings, a confident wrong answer can beat a careful right one |
| **An average hides the details** | A high overall index can conceal a weak spot in exactly the area you need |
| **Versions move** | When the contents of an index change, old and new scores cannot be compared directly |

> ℹ️ **Term — contamination:** When a benchmark's questions and answers have leaked into the material an AI model was trained on. The model then "remembers" answers instead of working them out, like a student who saw the exam paper in advance.

> ℹ️ **Term — saturation:** When a benchmark has become too easy for the best models. If everyone scores 98%, the exam no longer shows who is better.

> ℹ️ **Note:** The last limitation applies to GnollBench just as much. It deals with it by recording the exact conditions of every run and refusing to average runs whose conditions differ.

## 🤝 How They Complement Each Other

In practice, the two kinds of benchmark form a chain:

1. **Public benchmarks make the shortlist.** Nobody can test every model on everything. Public figures on ability, speed, and price show which models deserve a closer look.
2. **GnollBench tests the shortlist inside the real product.** It shows how each candidate behaves with the Overseer's instructions and tools, on GnollHack questions.
3. **The findings improve the product.** Wrong answers lead to fixes in this wiki, in the tools, and in the instructions, which helps whichever model a player picks.

**The chain needs both ends:**

| If you only looked at... | You would miss that... |
| :--- | :--- |
| **Public benchmarks** | A top-ranked model can still do poorly in a narrow subject where it has to look things up with unfamiliar tools |
| **GnollBench** | A model that does well has shown that it is a good GnollHack advisor, **and nothing more** |

For the practical outcome of this process, see [[/Guides/Choosing AI Model for Gnoll Overseer]].

## 🎲 Interesting Facts

- 🧙‍♂️ **NetHack is a classic AI challenge.** The NetHack Learning Environment was released for AI research in 2020. In a 2021 competition built on it, hand-written bots beat the machine-learning entries by a wide margin.
- 🤖 **A bot has ascended, but not a chatbot.** A hand-programmed bot called BotHack completed NetHack in 2015. Today's AI language models, playing by themselves, still get nowhere near.
- 👩‍⚕️ **GnollBench's rating scale was first used on nurses.** The Behaviorally Anchored Rating Scale was developed by psychologists in 1963 for judging job performance, long before anyone graded an AI with it.
- 🔢 **One test, 6,000 questions.** A single component of the Artificial Analysis index is over 300 times the size of GnollBench's default suite, and 120 times the largest suite GnollBench allows.
- ⏱️ **Two kinds of speed.** Artificial Analysis measures how fast a hosting service delivers text. GnollBench measures how long the model itself spends on a whole answer, with the waiting time for lookups removed.
- 📚 **GnollBench is an open-book exam.** The model may search the wiki during the test, just as it does in the live chat. Having memorized the material matters less than finding and using it correctly, which also makes contamination less of a worry.
- 🔺 **The same triangle.** Artificial Analysis and GnollBench both settled on the same three-way view of a model: quality, speed, and cost.

## 💡 Summary

| | Public benchmarks | GnollBench |
| :--- | :--- | :--- |
| **Answers the question** | How capable is this model in general? | How well does the Overseer work with this model? |
| **Biggest strengths** | Large, broad, open, independent | Tests the real product, punishes dangerous advice, checks answers against the game, finds things to fix |
| **Biggest weaknesses** | Contamination, saturation, neutral conditions | Small suites, a single AI grader, unpublished results |
| **Role in the chain** | Pick the candidates | Check them where it counts for GnollHack players |

**They complement each other and do not replace each other.**

## 📖 Learn More

- [[/GnollBench]] — All GnollBench guides in one place.

## 🔗 External Links

- [Artificial Analysis: Intelligence Benchmarking Methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)
- [Artificial Analysis: Performance Benchmarking Methodology](https://artificialanalysis.ai/methodology/performance-benchmarking)
- [Arena FAQ](https://arena.ai/faq)
- [Epoch AI Benchmarks](https://epoch.ai/benchmarks)
- [LiveBench](https://livebench.ai/)
- [HELM](https://crfm.stanford.edu/helm/)
- [HealthBench](https://openai.com/index/healthbench/)
- [BALROG: Benchmarking Agentic LLM and VLM Reasoning On Games](https://arxiv.org/abs/2411.13543)
