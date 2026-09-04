# Obsidian Aide

<p align="center">
  <b>A quiet, native, and distraction-free AI companion crafted for Obsidian note creators, researchers, and thinkers.</b>
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> | <a href="README_zh.md"><b>简体中文</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.8.3-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/platform-Obsidian-purple.svg" alt="platform">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/Node.js-Not%20Required-brightgreen.svg" alt="zero-config">
</p>

---

## 💡 Why Obsidian Aide? (Value & Significance)

Most AI plugins for Obsidian today fall into two extremes: they are either **overly engineered** (bloated with programming IDE features, diff merges, Node.js dependencies, and confusing menus) or **too shallow** (a glorified web wrapper that has no real connection to your notes).

**Obsidian Aide takes a fundamentally different path:**
* **Zero Technical Barriers**: You **do not need Node.js**, programming environments, or complex configuration. Install it in 30 seconds, pick a model (including generous free models), and start chatting immediately;
* **Native Coexistence**: It doesn't disrupt your writing. Styled with native Obsidian design variables, the conversational bubbles blend in seamlessly with light, dark, and community themes;
* **A True Thinking Companion**: It lives alongside your vault. With a simple `@` mention, it reads your notes, summarizes lengthy research, uncovers hidden connections, and helps you write with clarity;
* **Accessible & Wallet-Friendly**: You don't need expensive subscription fees. Built-in optimizations make free AI models feel smooth, smart, and resilient against rate limits.

---

## 🎯 Who Is This For? (Target Audience)

* 📚 **Researchers & Scholars**: Reading dense papers, synthesizing literature, searching arXiv, and asking questions across interconnected research notes;
* ✍️ **Writers & Content Creators**: Overcoming blank-page anxiety, brainstorming outlines, refining prose, and expanding arguments without leaving your note editor;
* 🎒 **Students & Lifelong Learners**: Turning lecture notes and study materials into interactive study partners and summarizing complex concepts with web-grounded citations;
* 💡 **Personal Knowledge Management (PKM) Enthusiasts**: Anyone who wants AI assistance that feels like an organic, peaceful part of their Obsidian workspace rather than a foreign tool bolted on.

---

## ✨ Core Features

### 1. Lightweight & Content-Focused Conversation
* **Zero Clutter**: Completely eliminates intrusive code-merge diffs, complex side-panels, and redundant controls. Your workspace stays clean and dedicated to your thoughts;
* **Featherlight Performance**: Bundled at only **~2.1 MB** (over 75% lighter than traditional alternatives). Instant startup with zero lag on your vault.

### 2. Modern Native Chat Experience
* **SMS-Style Dialogue**: High-fidelity conversational bubbles automatically match your current Obsidian theme (tested with Default, Minimal, and more);
* **Foldable Thinking Process**: For advanced reasoning models (like DeepSeek-R1), the internal thinking process folds neatly into callout blocks with smooth streaming, keeping answers clean and readable;
* **In-Place Question Editing**: Hover over any past prompt to tweak your question and regenerate responses instantly.

### 3. Vault Knowledge Copilot
* **Effortless Note Mentions**: Type `@` to quickly find and reference specific notes, chapters, or entire folders into your conversation;
* **Context-Aware Reading**: Automatically perceives your currently active note—ask it to summarize key takeaways, generate FAQs, or compare viewpoints across multiple notes.

### 4. Free-Tier Friendly & Wallet-Safe
* **🌱 Eco Mode (Default)**: Token-slimming optimization cuts prompt overhead by up to 75%, making free quotas on platforms like Groq (8,000 TPM limit) and SiliconFlow last dramatically longer;
* **Smart 429 Shield & Silent Retry**: Automatically absorbs temporary rate limits with silent retries, replacing scary red error banners with polite, clear status cues;
* **Loop Guard**: A built-in circuit breaker prevents models from getting trapped in endless tool execution loops.

### 5. MCP Friendly & Built-in Smart Tools
* **Model Context Protocol (MCP)**: Native support for the open standard MCP ecosystem. Connect to external MCP servers to expand AI skills as your workflow evolves;
* **Built-in Native Tools (No Node.js Required)**:
  * **Domestic Bing Search**: Fast web searches connected directly without VPN or extra API keys;
  * **Webpage Reader**: Paste any URL to convert article content into clean Markdown;
  * **Academic Search & Weather**: Search arXiv papers and query live weather forecasts on demand.

---

## 📥 30-Second Quick Installation

> No development tools or command-line experience required!

### Method 1: Direct Download (Recommended)
1. Download **[`obsidian-aide.zip`](https://github.com/vimbackground/obsidian-aide/releases/latest)** from the latest release;
2. Extract the archive. You will see three files: `main.js`, `manifest.json`, and `styles.css`;
3. In your Obsidian vault, navigate to the hidden folder `.obsidian/plugins/` (create it if missing);
4. Create a folder named **`obsidian-aide`** and place the 3 files inside:
   ```text
   <Your-Vault>/.obsidian/plugins/obsidian-aide/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```
5. In Obsidian, go to **Settings -> Community plugins**, click the reload icon in the top right, and turn on **Aide**!

### Method 2: Copy from Repository
If you cloned this repository, simply copy the `output/obsidian-aide/` folder into your vault's `.obsidian/plugins/` directory.

---

## ⚙️ Recommended AI Models

Open Obsidian **Settings -> Aide** to set up your provider:

| Provider | Why Recommend | Recommended Model |
| :--- | :--- | :--- |
| **SiliconFlow (硅基流动)** | Generous free signup credit, fast domestic access | `deepseek-ai/DeepSeek-V4-Flash` |
| **Groq** | Blazing-fast inference speed, great with **Eco Mode** | `qwen/qwen3.8-27b` |
| **DeepSeek / OpenAI Official** | State-of-the-art reasoning and chat capabilities | `deepseek-chat`, `gpt-4o` |

---

## 🛠️ For Developers & Technical Operations

If you wish to build from source code, customize components, or understand our automated GitHub Actions CI/CD release pipeline, please refer to the dedicated:

👉 **[Developer & Technical Guide (docs/DEVELOPMENT.md)](docs/DEVELOPMENT.md)**

---

## 🙏 Acknowledgments

Obsidian Aide is deeply inspired by the design ideas and architecture of [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer). Sincere thanks to original author [glowingjade](https://github.com/glowingjade) for their pioneering contributions!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
