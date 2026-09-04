# Release Notes: v0.9.0 - Obsidian Aider Official Release / 正式发布

## 🌐 English
- **Default Language**: English is now the default interface and system prompt language.
- **Global System Prompt**: Standardized to English, brand name updated to "Aider".
- **Runtime Profile**: Defaulted to Free Tier / Eco mode (`eco`) with rate-control discipline and token efficiency.
- **Retained Providers**: Core lineup streamlined to 4 primary providers: OpenAI, DeepSeek, OpenRouter, and SiliconFlow.
- **Default Chat Model**: Set to 1 model by default: SiliconFlow's `deepseek-ai/DeepSeek-V4-Flash`.
- **Version Bump**: Bumped to version `0.9.0`.

## 🇨🇳 中文说明
- **默认语言**：项目语言默认为英文（支持随时在设置中切回中文）。
- **全局系统提示词**：改为英文版，并将提示词中的 Aide 规范为 Aider。
- **服务层级**：默认为免费层模式（🌱 Eco Mode，严格控流、精简 Token、防 429）。
- **模型服务商**：精简保留 4 家核心模型服务商（OpenAI、DeepSeek、OpenRouter、SiliconFlow）。
- **对话模型**：默认配置 1 个对话模型（SiliconFlow 的 `deepseek-ai/DeepSeek-V4-Flash`）。
- **版本发布**：版本号升级为 `0.9.0`。

---

# Release Notes: v0.8.3 - Obsidian Aider Official Release / 正式发布

## 🌐 English

🎉 Welcome to **Obsidian Aider**!

Obsidian Aider is a lightweight, distraction-free AI companion designed for deep thinking, note-taking, and writing within Obsidian. Unlike bloated developer-heavy plugins, Aider focuses on pure conversational interaction and symbiotic knowledge creation. Users can enjoy built-in web search, tool integration, and multi-provider AI chat out of the box with zero runtime setup required.

---

### 🚀 Key Features & Highlights

1. **Lightweight & Content-Focused Conversation**:
   - Zero engineering noise: stripped away intrusive Diff/Apply diff merges and cluttered controls, returning to pure natural reading and writing;
   - Ultra-lightweight distribution: final bundled size is only **~2.1 MB** (over 75% reduction compared to traditional alternatives), with zero redundant dependencies and instant startup.

2. **Modern Native Chat Experience**:
   - High-fidelity SMS-style bubble interface styled with native Obsidian CSS variables, seamlessly adapting to light, dark, and community themes (e.g., Minimal);
   - Foldable callout-style rendering for reasoning/thinking models (e.g., DeepSeek-R1, Qwen-Thinking) with smooth streaming expansion;
   - In-place editing of historical questions with instant regeneration.

3. **Vault Knowledge Copilot**:
   - Type `@` to instantly search, link, and reference specific documents or folders in your vault;
   - Chat alongside notes: automatically detects current active notes for intelligent summarization, key takeaways, and multi-document synthesis.

4. **Free-Tier Friendly & Anti-429 Optimization**:
   - Built-in **🌱 Eco Mode (Lightweight Free-Tier)** and **🚀 Pro Mode (High-Precision)**;
   - Deeply optimized for free models on Groq (8,000 TPM limit) and SiliconFlow, reducing per-query tokens by up to 75%;
   - Intelligent 429 rate limit backoff and silent retries with friendly countdown alerts;
   - Proprietary **Loop Guard** prevents infinite tool-calling loops and guarantees structured conclusions.

5. **MCP Friendly & Extensible Tools Ecosystem**:
   - Built-in support for the standard **Model Context Protocol (MCP)**, allowing connection to external MCP servers (via stdio / SSE) to expand AI capabilities without limits;
   - Out-of-the-box native tools without Node.js runtime required:
     - **Domestic Bing Search (CN)**: Direct connection, no proxy, no API key needed;
     - **Web Fetch & Parser**: Converts any webpage URL into clean, readable Markdown;
     - **Real-Time Weather**, **arXiv Paper Search**, and **Accurate Local System Time**.

---

### 📥 Installation Guide

1. Download **`obsidian-aider.zip`** (or **`aider.zip`**) from the release assets below;
2. Extract the archive to find three files: `main.js`, `manifest.json`, and `styles.css`;
3. Move these three files into your Obsidian vault under `.obsidian/plugins/aider/`;
4. Go to Obsidian **Settings -> Community plugins**, reload, and enable **Aider**!

---

### 🙏 Acknowledgments

This project is inspired by and built upon the excellent open-source project [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer). Sincere thanks to the original author glowingjade!

---

## 🇨🇳 中文说明 (Chinese)

🎉 欢迎使用 **Obsidian Aider**！

Obsidian Aider 是一款轻量级、去干扰、以深度思考与创作为中心的 Obsidian AI 伴侣。不同于臃肿复杂的开发型插件，Aider 回归纯粹的聊天交互与笔记共生体验，普通用户无需安装 Node.js 即可开箱畅享免翻墙联网搜索与多模型问答。

---

### 🚀 核心特性与亮点 (Highlights)

1. **轻量对话聚焦内容**：
   - 去工程化噪音：彻底剔除侵入式的 Diff/Apply 代码合并等繁杂功能与冗余标签，回归纯粹的 Markdown 思考阅读与创作伴侣；
   - 极致轻量架构：最终打包产物体积仅 **2.10 MB**（较传统同类插件减重 75% 以上），零多余依赖，极速秒开加载。

2. **现代聊天体验**：
   - 短信式原生对仗对话体验：用户提问气泡与 AI 回复卡片高保真绑定 Obsidian 官方设计变量，自适应浅色、深色及第三方主题（如 Minimal）；
   - 深度思考优雅折叠：支持推理模型（如 DeepSeek-R1、Qwen-Thinking）的思考过程类 Callout 式折叠与流式展开，思绪清晰可溯；
   - 就地修改历史提问并重新生成。

3. **知识库功能**：
   - 文件与文件夹精准引用：输入 `@` 即可智能检索并关联当前笔记库内的特定文档或目录；
   - 当前文档边读边聊：自动感知当前编辑焦点，针对长笔记进行智能总结、提炼要点与多方对比。

4. **免费层友好**：
   - 内置“🌱 免费层轻量模式 (Eco)”与“🚀 付费层高精度模式 (Pro)”自由切换；
   - 深度适配 Groq（8,000 TPM 限额）与 SiliconFlow 免费模型，单次提问 Token 骤降 75%；
   - 智能捕获 429 速率限制并自动静默重试，告别突兀大红屏；
   - 独创循环熔断机制（Loop Guard），彻底根治模型在工具调用中无休止死磕的死循环。

5. **MCP 友好（工具扩展生态）**：
   - 深度集成开放的标准 **Model Context Protocol (MCP)** 架构，支持连接外部 MCP 服务器（stdio / SSE），无限扩充 AI 工具能力；
   - 免 Node.js 原生工具开箱即用：
     - **国内必应联网搜索 (Bing CN)**：直连国内服务器，免翻墙、免 API Key；
     - **网页正文深度提取 (Web Fetch)**：自动解析任意网页为干净的 Markdown 正文；
     - **实时天气预报**、**arXiv 前沿学术论文检索**、**精准当前时间**随叫随到。

---

### 📥 安装使用指南

1. 下载下方附件中的 **`obsidian-aider.zip`**（或 **`aider.zip`**）；
2. 解压得到三个文件：`main.js`、`manifest.json`、`styles.css`；
3. 将这三个文件放置于您的 Obsidian 库目录中的 `.obsidian/plugins/aider/` 文件夹下；
4. 进入 Obsidian **【设置】->【第三方插件】**，点击刷新并开启 **Aider** 即可！

---

### 🙏 致谢

本项目在产品设计理念与底层架构上深受开源项目 [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer) 的启发，在此对原作者 glowingjade 表达诚挚的感谢！
