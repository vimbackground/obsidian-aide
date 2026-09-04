# Obsidian Aider

<p align="center">
  <b>A quiet, native, and distraction-free AI companion crafted for Obsidian note creators, researchers, and thinkers.</b>
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> | <a href="README_zh.md"><b>简体中文</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.9.0-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/platform-Obsidian-purple.svg" alt="platform">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/Node.js-Not%20Required-brightgreen.svg" alt="zero-config">
</p>

---

## 💡 What is Obsidian Aider & Who is it for?

**Obsidian Aider** is a lightweight, distraction-free AI companion seamlessly integrated into Obsidian. It focuses on note reading, research synthesis, brainstorming, and writing assistance—empowering you to converse naturally with your vault and modern LLMs without ever leaving your editor.

### Key Problems Solved
- **No Developer Clutter**: Strips away intrusive code-merge diffs, confusing technical controls, and heavy dependencies, returning your workspace to pure writing and thought.
- **True Vault Integration**: Goes far beyond a standalone chat window by seamlessly referencing your vault notes, perceiving active documents, and connecting ideas across your knowledge base.
- **Free-Tier Friendly**: Eliminates aggressive rate-limiting headaches by optimizing token context and automatically managing retries for free model tiers.

### Target Audience
- 📚 **Researchers & Scholars**: Synthesize dense literature, search arXiv papers, and cross-reference multiple study notes.
- ✍️ **Writers & Content Creators**: Overcome writer's block, draft outlines, refine phrasing, and expand arguments effortlessly.
- 🎒 **Students & Lifelong Learners**: Turn your notes into an interactive private tutor, query definitions on the web, and build structured study summaries.
- 💡 **PKM Enthusiasts**: Anyone seeking a quiet, respectful AI assistant that feels like an organic extension of Obsidian.

---

## ⚖️ Key Differentiators & Core Features

### Key Differentiators from Other AI Plugins
1. **Zero Technical Barriers (No Node.js)**: No runtime setup required. Bundled at only **~2.1 MB** (over 75% lighter than typical alternatives), with instant startup and zero lag on your vault.
2. **Content-First Simplicity**: Eliminates programmer-oriented Diff/Apply buttons, keeping the interface dedicated entirely to reading and writing.
3. **Wallet & Free-Tier Friendly**: Ships with **🌱 Eco Mode** enabled by default, reducing token overhead by up to 75% alongside intelligent 429 rate-limit backoff.
4. **Native Aesthetic Harmony**: SMS-style dialogue bubbles automatically adapt to Obsidian light, dark, and community themes (e.g. Minimal), featuring foldable callout blocks for reasoning models.

### Core Features at a Glance
- **Vault Knowledge Co-pilot (`@` Mentions)**: Type `@` to quickly find and reference notes or folders; automatically detects your active note to summarize key points or answer questions.
- **Native Zero-Config Tools & MCP**:
  - Built-in **Web Search** (fast, direct, no extra API key required);
  - Built-in **Webpage Reader** (paste any URL to extract clean Markdown);
  - Built-in **arXiv Academic Search & Weather**, plus full support for standard **MCP** (Model Context Protocol) extensions.
- **Multi-Provider Ecosystem**: Built-in support for **OpenAI, DeepSeek, OpenRouter, and SiliconFlow**, defaulted to SiliconFlow's `deepseek-ai/DeepSeek-V4-Flash` and English interface (with easy Chinese toggle).

---

## 🚀 Quick Start & Usage

### 1. Installation
1. Download **[`aider.zip`](https://github.com/vimbackground/obsidian-aider/releases/latest)** from the latest release;
2. Extract the three files: `main.js`, `manifest.json`, and `styles.css`;
3. Place them into your vault at `<Vault>/.obsidian/plugins/aider/`;
4. In Obsidian, go to **Settings -> Community plugins**, reload, and enable **Aider**.
*(Alternatively, copy the `output/obsidian-aider/` folder directly into your `.obsidian/plugins/` directory).*

### 2. How to Use
- **Open Chat**: Click the Aider icon on the left ribbon (or press `Ctrl/Cmd + P` and search `Open chat`);
- **Reference Notes**: Type `@` in the chat input to pick notes or folders to include in your conversation context;
- **Configure Models**: Open **Settings -> Aider**, enter your API key for your preferred provider, and select your model at the top of the chat panel.

---

## 🛠️ For Developers & Technical Operations

If you wish to build from source code, customize components, or understand our automated GitHub Actions CI/CD release pipeline, please refer to the dedicated:

👉 **[Developer & Technical Guide (docs/DEVELOPMENT.md)](docs/DEVELOPMENT.md)**

---

## 🙏 Acknowledgments

Obsidian Aider is deeply inspired by the design ideas and architecture of [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer). Sincere thanks to original author [glowingjade](https://github.com/glowingjade) for their pioneering contributions!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
