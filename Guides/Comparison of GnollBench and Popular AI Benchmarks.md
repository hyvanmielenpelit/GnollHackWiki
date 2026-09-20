> 👉 **The Gnoll Overseer's AI benchmarking system is called GnollBench. This page puts it side by side with well-known public AI benchmarks, such as those of Artificial Analysis, and shows what each is good at, where each falls short, and why they work best together.**

> ℹ️ **Note:** Public benchmarks change quickly. They are described here as of September 2026 and at the level of method, so check each benchmark's own pages, linked at the end, for current details. GnollBench is described as of harness version 37 and scoring method version 12.

## 📖 Two Different Questions

A public AI benchmark and GnollBench look alike from a distance: both give AI models a fixed set of tasks and turn the results into numbers. They ask different questions, though.

- **Public benchmarks ask: "How capable is this model in general?"** They test a model across mathematics, science, coding, office work, and more, under neutral conditions that are the same for every model. Their audience is everyone who has to choose a model for anything.
- **GnollBench asks: "How good is the Gnoll Overseer when this model drives it?"** It tests one product, with that product's own instructions and lookup tools, on one subject: GnollHack. Its audience is the Overseer's developers.

Neither question can be answered with the other's tool. A public index cannot tell whether a model gives sound advice about a cockatrice, and GnollBench cannot tell whether a model is any good at law or physics. That is why this page treats GnollBench as a complement to public benchmarks and not as a rival.

For what GnollBench is and how it works, see [[/Guides/Introduction to AI Benchmarking in Gnoll Overseer]].

## 🌍 The Public Benchmarks in Brief

### 📈 Artificial Analysis

[Artificial Analysis](https://artificialanalysis.ai/) is an independent company that tests AI models and the services that host them, and publishes the results. Its headline figure is the **Intelligence Index** (version 4.3.2 at the time of writing), which combines ten separate evaluations in four groups: agentic work (30%), coding (20%), general knowledge and reasoning (30%), and scientific reasoning (20%). The components range from 66 long tasks to 6,000 short questions. One of them measures knowledge together with a *non-hallucination rate*, rewarding a model for admitting that it does not know.

Grading depends on the component: program tests for code, an AI "equality checker" for short answers, and panels of several AI judges that compare results in pairs for open-ended work. All models get the same instructions without worked examples. Artificial Analysis states a 95% confidence interval of less than ±1% for the index, based on repeated runs.

Speed is measured separately and continuously. Each hosted model is called eight times a day at several prompt lengths, and the site reports output tokens per second, time to first token, and total response time as a median over the last 72 hours. Prices are shown next to them, along with what it cost to run the whole index.

### 🗳️ Arena

[Arena](https://arena.ai/), formerly LMArena and originally Chatbot Arena, has no answer key at all. A visitor asks anything, gets answers from two anonymous models, and votes for the better one. Millions of such votes are turned into ratings with a Bradley–Terry model, and a model needs thousands of votes before it is listed. Arena measures what people *prefer*, which is valuable and hard to get any other way, but a preferred answer is not always a correct one.

### 🎓 Expert Exams

Benchmarks such as Humanity's Last Exam, GPQA Diamond, and [Epoch AI's](https://epoch.ai/benchmarks) FrontierMath consist of very hard questions written by specialists, with answers that can be checked objectively. Many keep part or all of their questions secret so that models cannot have seen them in training. Epoch AI also runs each model many times, for example 16 times on GPQA Diamond, to average out chance.

### 🔬 LiveBench and HELM

[LiveBench](https://livebench.ai/) publishes new questions every month, drawn from recent material, and scores them against objective answers with no AI judge involved. [HELM](https://crfm.stanford.edu/helm/), from Stanford University, takes the broadest view: many scenarios measured on many metrics, not only accuracy, with every prompt and every model reply published for inspection.

### 🩺 HealthBench

[HealthBench](https://openai.com/index/healthbench/) is GnollBench's closest relative in method. Physicians wrote a separate answer key for each of its health conversations, 48,562 criteria in all, each with a weight. An AI grader checks every criterion, and the benchmark's authors measured how often that grader agrees with physicians. They found it agreed about as often as physicians agree with each other.

### 🕹️ BALROG

[BALROG](https://arxiv.org/abs/2411.13543) is the closest relative in subject: it makes AI models *play* games, NetHack among them, and scores how far they get. In the original 2024 study, the best models averaged under 2% progression in NetHack. A [2026 report](https://kenforthewin.github.io/blog/posts/nethack-agent/) described a best run reaching dungeon level 10, still only about an eighth of the way by BALROG's measure. GnollBench tests something different: not playing the game, but *advising* a human who plays it.

## 📊 Side-by-Side Comparison

| | GnollBench | Artificial Analysis Intelligence Index | Arena | Expert exams |
| :--- | :--- | :--- | :--- | :--- |
| **Main purpose** | Improve one product; compare models last | Compare models for everyone | Rank models by human preference | Track the frontier of capability |
| **What is tested** | The model inside the real Overseer chat | The model under neutral, standardized conditions | The model as a chat partner | The model alone, or with basic tools |
| **Subject** | GnollHack only | Agents, coding, knowledge, science | Whatever visitors ask | Science, mathematics, broad knowledge |
| **Size** | 18 questions in the standard suite, 50 at most | Thousands of items in ten evaluations | Millions of votes | Hundreds to thousands of questions |
| **Question writers** | The Overseer's developers, with AI drafting for snapshot suites | Artificial Analysis and outside benchmark authors | The visitors | Subject specialists |
| **Grading** | One AI grader against a written answer key, with advisory checks | Program tests, AI answer checkers, and AI judge panels | Human votes | Objective answer checks |
| **Tools** | The Overseer's 16 read-only lookup tools | Code execution and web tools in the agentic parts | Usually none | Usually none or few |
| **Score** | Intelligence Index 1–100, weighted by difficulty | Weighted average of ten evaluations | Rating on an Elo-like scale | Percentage correct |
| **Uncertainty** | Confidence interval per run; replicate runs; comparability rules | Repeats; stated interval under ±1% | Bootstrap confidence intervals | Repeats, where the publisher runs them |
| **Speed** | The model's own time per answer, tool time removed | Tokens per second and time to first token, measured all day | Not measured | Not measured |
| **Cost** | Actual cost of the run, per AI role | Price lists and the cost of running the index | Not measured | Usually not measured |
| **Results** | Internal, not published | Public | Public | Public |
| **Who runs it** | The Overseer's administrators | Artificial Analysis | Anyone can vote | The publisher, or anyone with the questions |

## ✨ What Is Unique About GnollBench

Few of the ideas below are unique one by one, and related ideas in public benchmarks are pointed out. What is unusual is their combination, and the purpose they serve.

- **It tests the real product.** The model under test gets the very same instructions and lookup tools as the live Overseer chat. A public benchmark must use neutral conditions to be fair to all models, which also means it cannot say how a model behaves inside any particular product.
- **Comparing models is its last purpose, not its first.** The first purpose is to find wrong answers and trace them to a cause that can be fixed: a fact missing from this wiki, a confusing tool result, an unclear instruction. A failed question is more useful to the developers than a passed one.
- **Dangerous advice has its own rule.** A confidently stated falsehood that would hurt a player who acted on it caps the answer's score at 25 out of 100. The grader has to quote the offending sentence word for word, and the quote is checked against the answer. Artificial Analysis's non-hallucination rate and HealthBench's negative criteria come from the same concern.
- **One grader scores, and everything else only advises.** A second grader and a fact-checker can examine an answer, but their findings are reported and never change a score. This keeps results reproducible. Arena's blind voting and GnollBench's blind second opinion guard against the same human and machine weakness: being swayed by a verdict already given.
- **Answers are checked against the game itself.** When an answer says something the answer key does not cover, a fact-checking AI can look it up in the game's wiki and source code. A model is not marked down for knowing more than the answer key. Most benchmarks have no such ground truth to consult, because their subject is not a single piece of software.
- **It refuses to show misleading numbers.** A run with service failures publishes no indices. Runs made under different conditions cannot be averaged, and no reproducibility figure is given for fewer than three runs.
- **Questions can be tied to a real game situation.** A suite can be built on a game snapshot, with the character, map, and inventory, so that questions ask what to do *here and now*.
- **The exam examines itself.** Questions that every model passes, questions whose scores swing between runs, and answer keys with gaps are flagged for a human. A question's measured difficulty is never fed back into its weight, which would let results flatter themselves.

## 💪 Where the Public Benchmarks Are Stronger

- **Scale.** Eighteen questions against thousands. GnollBench's own confidence intervals are wide for this reason, and no number of repeated runs can narrow the part that comes from having few questions.
- **Breadth.** Public benchmarks cover many fields, long documents, images, conversations of many turns, and long agentic tasks. GnollBench covers single questions about one game.
- **Grading that does not rest on one AI judge.** Program tests, exact answers, and human votes do not share an AI grader's blind spots. GnollBench's scores are only comparable under one grader, and changing the grader starts a new series of results.
- **Openness.** Public results can be checked, criticized, and repeated by outsiders, and HELM goes as far as publishing every reply. GnollBench's results are internal, so readers have to take its method on trust.
- **Independence.** Artificial Analysis, Arena, and the academic benchmarks do not build the products they test. GnollBench is written and run by the same team that builds the Overseer.
- **Live speed measurement.** Artificial Analysis measures hosted models around the clock and across providers. GnollBench only sees speed during its own runs.

## 🚧 Limitations on Both Sides

### 🐺 GnollBench

- The suite is small, and the uncertainty that comes with 18 questions dominates its results.
- The score is set by a single AI grader, however carefully constrained.
- The difficulty ratings that weight the index are themselves made by an AI.
- Results are not published and cannot be verified from outside.
- Only single questions in the chat's default configuration are measured.
- A good result says nothing about any subject other than GnollHack.

### 🌍 Public Benchmarks

- **Contamination.** Published questions end up in training data, and scores rise without models getting better. Secret question sets and monthly refreshes are the answer to this, at some cost to openness.
- **Saturation.** Once the best models score near the top, a benchmark stops telling them apart, and a new version or a new benchmark is needed.
- **Neutral conditions are nobody's conditions.** A product's own instructions, tools, and limits can change a model's behavior a great deal.
- **Preference is not correctness.** Voters may favor a confident, well-formatted answer over a correct one.
- **An average hides the details.** A high overall index can conceal a weak spot in exactly the area someone needs.
- **Versions move.** When the contents of an index change, scores from before and after are not directly comparable. GnollBench has the same problem and handles it by recording the conditions of every run.

## 🤝 How They Complement Each Other

In practice, the two kinds of benchmark form a chain:

1. **Public benchmarks make the shortlist.** Nobody can test every model on everything. Public figures on capability, speed, and price show which models are worth a closer look.
2. **GnollBench tests the shortlist inside the real product.** It shows how each candidate actually behaves with the Overseer's instructions and tools on GnollHack questions.
3. **The findings improve the product.** Wrong answers lead to fixes in this wiki, in the tools, and in the instructions, which help whichever model a player picks.

The chain needs both ends. A model that ranks high on public indices can still do poorly in a narrow subject where it has to look things up with unfamiliar tools. A model that does well in GnollBench has shown that it is a good GnollHack advisor, and nothing more.

For the practical outcome of this process, see [[/Guides/Choosing AI Model for Gnoll Overseer]].

## 🎲 Interesting Facts

- NetHack has been a testing ground for AI since at least 2020, when the NetHack Learning Environment was released for research. The game is hard enough that AI language models playing it still get nowhere near ascending.
- GnollBench's rating scale, the Behaviorally Anchored Rating Scale, does not come from computer science. It was developed for evaluating employees.
- A single component of the Artificial Analysis Intelligence Index has 6,000 questions, over 300 times GnollBench's standard suite.
- The two systems measure different kinds of speed. Artificial Analysis measures how fast a provider's service delivers tokens. GnollBench measures how long the model itself spends on a whole answer, with the time spent waiting for lookups removed.
- GnollBench is an open-book exam: the model may search the wiki during the test, just as it does in the live chat. Having seen the material in training therefore matters less than finding and using it correctly.
- Both Artificial Analysis and GnollBench settled on the same three-way view of a model: quality, speed, and cost.

## 💡 Summary

- Public benchmarks measure what a model can do in general. GnollBench measures how well the Gnoll Overseer works with a given model.
- Public benchmarks are far larger, broader, more open, and independent of the products they test.
- GnollBench is small and internal, but it tests the real product, punishes dangerous advice, checks answers against the game itself, and exists first of all to find things to fix.
- Both kinds have limits: contamination, saturation, and neutral test conditions on one side, and a small suite, a single AI grader, and unpublished results on the other.
- They complement each other and do not replace each other. Public benchmarks pick the candidates, and GnollBench checks them where it counts for GnollHack players.

## 🔗 Learn More

- [[/Gnoll Overseer Guides]] — All Gnoll Overseer guides in one place.
- [[/Guides/Introduction to AI Benchmarking in Gnoll Overseer]] — What GnollBench is, in plain language.
- [[/Guides/Advanced Guide to AI Benchmarking in Gnoll Overseer]] — How scoring, grading, and repeated runs work.
- [[/Guides/Technological Overview of AI Benchmarking in Gnoll Overseer]] — The technical details, for readers who know AI evaluation.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — Which model to pick for which task.
- [Artificial Analysis: Intelligence Benchmarking Methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)
- [Artificial Analysis: Performance Benchmarking Methodology](https://artificialanalysis.ai/methodology/performance-benchmarking)
- [Arena FAQ](https://arena.ai/faq)
- [Epoch AI Benchmarks](https://epoch.ai/benchmarks)
- [LiveBench](https://livebench.ai/)
- [HELM](https://crfm.stanford.edu/helm/)
- [HealthBench](https://openai.com/index/healthbench/)
- [BALROG: Benchmarking Agentic LLM and VLM Reasoning On Games](https://arxiv.org/abs/2411.13543)
