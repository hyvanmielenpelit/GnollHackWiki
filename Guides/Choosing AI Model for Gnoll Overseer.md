![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **The Gnoll Overseer supports AI models from Anthropic, Google, and OpenAI. As of Overseer 1.1.1, three free system models are available. This page explains which one to choose, how to switch, and how to use a model of your own.**

## 🧠 Available Models

The three system models differ in their thinking level, provider, intelligence, speed, and cost:

| Model | Thinking Level | Provider | Intelligence | Speed | Cost | Best For |
| :---- | :------------- | :------- | :----------- | :---- | :--- | :------- |
| **GPT-5.6 Luna** | **High** | OpenAI | 🟡 Medium | 🟡 Medium | 🟢 Very low | Everyday questions |
| **GPT-5.6 Luna** | **Max** | OpenAI | 🟢 High | 🔴 Slow | 🟢 Low | Hard questions |
| **Gemini 3.7 Flash** | **Medium** | Google | 🟡 Medium | 🟢 Fast | 🟡 Medium | When you are in a hurry |

> ℹ️ **Note:** The system models are chosen by the Overseer's operator. The list can change, and the models offered to your account may differ from this table.

## 🎯 Choosing the Right Model

### 📖 Everyday Questions

For normal questions, **GPT-5.6 Luna (High)** is recommended. It is a very cheap but capable model, and it is also fairly fast. It answers most common questions accurately.

### 🏆 Hard Questions

For difficult questions, use **GPT-5.6 Luna (Max)**. It is much slower than the other two models, but also more intelligent, and it is still cheap to use. If you have a hard question and time to wait for the answer, this is the model to choose.

### 🏃 Urgent Questions

If you are in a hurry and the question is not too hard, use **Gemini 3.7 Flash (Medium)**. It is much faster than the GPT-5.6 Luna models and about as capable as GPT-5.6 Luna (High). However, it costs about 3–4 times more per token, so use it when speed matters most.

## 🔀 Switching Models

You can change the model at any time with the **model picker** in the message box. It lists two groups:

- **System Models** — the free models provided by the Overseer.
- **Your Models** — the models you have added with your own API key.

The thinking level of each model is shown as a badge next to its name. The next message is answered by the model you picked.

## 🔑 Bringing Your Own Key

If the system models are not enough for you, you can bring your own API key and use a model of your choice from Anthropic, Google, or OpenAI. You then pay your provider for what you use, and the provider's own limits apply instead of the Overseer's usage limits.

1. Open the **API Keys** page in the Overseer and add your key.
2. Open **Models** and select **Add Model**.
3. Pick a model for that key. A ⭐ marks the recommended models.
4. Select your new model under **Your Models** in the model picker.

> 💡 **Tip:** Your API key is stored encrypted on the Overseer server. If you use Confidential chats, you can also declare on the **API Keys** page what your provider has agreed to about your data. See [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]].

## 📖 Learn More

- [[/Gnoll Overseer]] — All Gnoll Overseer guides in one place.
- [[/Guides/Introduction to Gnoll Overseer]] — What the Gnoll Overseer is and how to access it.
- [[/Guides/Advanced Guide to Gnoll Overseer]] — The tools, spoiler policy, chat features, and web settings in depth.
- [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]] — Standard, Confidential, and Incognito chats.
- [[/GnollBench]] — How the Overseer's models are benchmarked.
