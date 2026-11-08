![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **The Gnoll Overseer supports AI models from Anthropic, Google, and OpenAI, either as free system models or with your own API key.**

## 🧠 Available Models

As of November 1, 2026, three free system models are available. The Overseer's models are benchmarked with [[/GnollBench]].

| Model | Thinking Level | Provider | Intelligence | Speed | Cost | Best For |
| :---- | :------------- | :------- | :----------- | :---- | :--- | :------- |
| **GPT-6 Luna** | **High** | OpenAI | 🟡 Medium | 🟡 Medium | 🟢 Very low | Most questions |
| **GPT-5.6 Luna** | **Max** | OpenAI | 🟡 Medium | 🔴 Slow | 🟢 Low | Most questions |
| **Gemini 4 Argon** | **Medium** | Google | 🟢 High | 🔴 Slow | 🔴 High | Hard questions |
| **Claude Sonnet 5.5** | **Xhigh** | Anthropic | 🟢 High | 🟡 Medium | 🔴 Very high | Hard questions |

## 🎯 Choosing the Right Model

Start with **GPT-6 Luna (High)** or **GPT-5.6 Luna (Max)**. They answer most common questions accurately. For a difficult question that they fail to answer correctly, try **Gemini 4 Argon (Medium)** or **Claude Sonnet 5.5 (Xhigh)**.

## 🔀 Switching Models

You can change the model at any time with the **model picker** in the message box. It lists two groups:

- **System Models:** The free models provided by the Overseer.
- **Your Models:** The models you have added with your own API key.

The thinking level of each model is shown as a badge next to its name. The next message is answered by the model you picked.

## 🔑 Bringing Your Own Key

If the system models are not enough for you, add your own API key and use a model of your choice from Anthropic, Google, or OpenAI. You then pay your provider for what you use, and the provider's own limits apply instead of the Overseer's usage limits.

1. Open the **API Keys** page in the Overseer and add your key.
2. Open **Models** and select **Add Model**.
3. Pick a model for that key. A ⭐ marks the recommended models.
4. Select your new model under **Your Models** in the model picker.

Your API key is stored encrypted on the Overseer server. If you use Confidential chats, you can also declare on the **API Keys** page what your provider has agreed to about your data, as described in [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]].

## 📖 Learn More

- [[/Gnoll Overseer]]
- [[/Guides/Introduction to Gnoll Overseer]]
- [[/Guides/Advanced Guide to Gnoll Overseer]]
