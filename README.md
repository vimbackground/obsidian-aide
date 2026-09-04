# Obsidian Aide

<p align="center">
  <b>Lightweight, distraction-free AI companion for deep thinking and note-taking in Obsidian</b><br/>
  <b>轻量级、去干扰、以深度思考与创作为中心的 Obsidian AI 伴侣</b>
</p>

<p align="center">
  <a href="#-english">English</a> | <a href="#-简体中文">简体中文</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.8.3-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/platform-Obsidian-purple.svg" alt="platform">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/Node.js-Not%20Required%20for%20Native%20Tools-brightgreen.svg" alt="zero-config">
</p>

---

# 🌐 English

## 🌟 Philosophy

Unlike bloated and overly complex developer-oriented AI tools, **Obsidian Aide** is crafted specifically for note creators, researchers, scholars, and deep thinkers:
* **Restraint & Simplicity**: The interface returns to pure natural language conversation. SMS-style bubbles seamlessly adapt to any Obsidian theme, eliminating engineering clutter and intrusive buttons;
* **Zero Runtime Barrier**: Ordinary users **do not need Node.js or programming environments**. Core native tools (web search, webpage extraction, weather, academic papers) work instantly out of the box;
* **Vault Symbiosis**: Deeply integrated into your Obsidian vault. Use `@` to cite files or entire folders anytime for focused brainstorming, reading synthesis, and creation;
* **Free-Tier Friendly**: Fine-tuned for free models on Groq, SiliconFlow, and beyond with token slimming and intelligent rate-limit avoidance, eliminating 429 errors and infinite loops.

---

## ✨ Key Features

### 1. Lightweight & Content-Focused Conversation
* **Zero Engineering Noise**: Intrusive code diff/apply buttons and redundant controls are completely removed, bringing full focus back to pure thinking, reading, and natural Markdown writing;
* **Ultra-Lightweight Footprint**: The bundled distribution (`output/obsidian-aide/main.js`) is kept at only **~2.1 MB** (over 75% smaller than traditional alternatives), with zero bloated dependencies and lightning-fast loading.

### 2. Modern Native Chat Experience
* **Native SMS-Style Dialogue**: User prompts on the right, AI responses on the left, styled with native Obsidian CSS variables to seamlessly adapt to light, dark, and community themes (e.g., Minimal);
* **Foldable Deep Thinking**: Streaming callout-style fold/unfold for reasoning and thinking models (such as DeepSeek-R1 and Qwen-Thinking);
* **In-Place Question Editing**: Hover over any previous question to edit and regenerate answers on the spot.

### 3. Vault Knowledge Copilot
* **Precise File & Folder Mentions**: Type `@` to instantly search, link, and reference specific documents or folders in your vault;
* **Context-Aware Reading**: Automatically senses the currently active note to generate summaries, extract insights, and compare perspectives.

### 4. Free-Tier Friendly & Anti-429 Optimization
* **Dual-Track Mode**:
  * **🌱 Eco Mode (Default & Recommended)**: Reduces token usage by up to 75% per query, perfectly respecting Groq's 8,000 TPM free limit;
  * **🚀 Pro Mode**: Unlocks ultra-long history context and multi-turn in-depth research;
* **Smart 429 Avoidance & Silent Retry**: Automatically retries brief rate limits ($\le 5$s) in the background with friendly countdown guidance for longer limits;
* **Loop Guard**: Proprietary circuit breaker prevents models from getting stuck in endless tool-calling loops.

### 5. MCP Friendly & Extensible Tools Ecosystem
* **Standard Model Context Protocol (MCP)**: Seamlessly connect external MCP servers (via stdio / SSE) to expand AI capabilities without limits;
* **Out-of-the-Box Native Tools (Zero Node.js Required)**:
  * **Domestic Bing Search (CN)**: Direct connection to Bing CN servers, no proxy or API key required;
  * **Web Content Extractor**: Automatically parses any webpage URL into clean, readable Markdown;
  * **Global Weather Forecast**: Instantly look up temperatures, conditions, and life indices;
  * **arXiv Literature Search**: Query the latest open-access academic papers and abstracts;
  * **Accurate System Time**: Millisecond-accurate local system time and timezone detection.

---

## 📥 Quick Installation

> Non-developer users are **strongly recommended to use the pre-built release package**, which requires no build tools and takes 30 seconds to set up!

### Method 1: Download Release Package (Recommended)
1. Download the latest **`obsidian-aide.zip`** from the [Releases Page](https://github.com/vimbackground/obsidian-aide/releases);
2. Extract the archive and verify that it contains:
   - `main.js`
   - `manifest.json`
   - `styles.css`
3. Navigate to your Obsidian vault folder and open the hidden directory `.obsidian/plugins/` (create it if it doesn't exist);
4. Create a folder named **`obsidian-aide`** and place the 3 extracted files inside:
   ```text
   <Your-Vault>/.obsidian/plugins/obsidian-aide/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```
5. Open Obsidian, go to **Settings -> Community plugins**, click reload in the top right, find **Aide**, and toggle it on!

### Method 2: Copy from Repository `output/` Directory
If you have cloned or downloaded this repository, simply copy the entire `output/obsidian-aide/` folder directly into your `.obsidian/plugins/` directory.

---

## ⚙️ Quick Configuration & Recommended Models

Go to Obsidian **Settings -> Aide** to configure your preferred AI provider:

* **SiliconFlow (Recommended with Free Credits)**:
  - Free quota upon registration. Recommended model: `deepseek-ai/DeepSeek-V4-Flash`
* **Groq (Ultra-Fast Inference)**:
  - Extremely fast on the free tier. Pair with Aide's **Eco Mode** for the best experience. Recommended model: `qwen/qwen3.8-27b`
* **OpenAI / DeepSeek Official**:
  - Enter your official API keys to use the latest model families.

---

## 🙏 Acknowledgments

This project is deeply inspired by and built upon the product philosophy and architecture of [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer).

We express our sincere respect and gratitude to the original author [glowingjade](https://github.com/glowingjade) for their open-source contributions!

---

## 🛠️ For Developers: Build & Automated Release

<details>
<summary><b>Click to expand developer build & release instructions</b></summary>

### 1. Clone & Setup
```bash
git clone https://github.com/vimbackground/obsidian-aide.git
cd obsidian-aide
npm install
```

### 2. Build Commands
```bash
# Hot-reload development
npm run dev

# Production build (outputs to output/obsidian-aide/)
npm run build

# Package output files to output/obsidian-aide.zip
npm run pack:zip

# One-step build and package
npm run build:all

# Code verification
npm run type:check
npm run lint:check
npm test
```

### 3. One-Step Automated Release (Push-to-Release)
This project features a cloud-aware CI/CD pipeline (`.github/workflows/release.yml`). To release a new version:

1. **Bump version**:
   ```bash
   npm run bump:patch   # Patch upgrade (0.8.3 -> 0.8.4)
   # or npm run bump:minor (0.8.3 -> 0.9.0)
   # or npm run bump:major (0.8.3 -> 1.0.0)
   ```
   *(Optional: record detailed release notes at the top of `RELEASE_NOTES.md`)*

2. **Commit and push to `main`**:
   ```bash
   git add .
   git commit -m "chore: release v0.8.4"
   git push origin main
   ```

**The cloud takes care of everything**:
- GitHub Actions detects the version bump on `main`;
- Automatically creates the corresponding `v0.8.4` tag;
- Compiles the plugin and bundles the latest **`obsidian-aide.zip`**;
- Extracts the release notes and publishes the GitHub Release with all assets attached!

</details>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

# 🇨🇳 简体中文

## 🌟 核心理念 (Philosophy)

不同于臃肿复杂的开发型 AI 工具，**Obsidian Aide** 专为笔记创作者、学者与深度思考者量身打造：
* **克制与纯净**：对话界面回归纯粹的自然语言交互，短信式气泡自适应任意主题，告别工程化噪音与繁杂按钮；
* **零配置门槛**：普通笔记用户**无需安装 Node.js，无需配置编程环境**，核心工具（联网搜索、网页提取、天气、学术文献）开箱即用；
* **知识库共生**：深度融入 Obsidian 笔记库，随时 `@` 引用文件与长文，专注辅助思考、梳理与创作；
* **免费层极度友好**：专门针对 Groq、SiliconFlow 等平台的免费模型进行 Token 极致瘦身与防限流调优，彻底告别 429 报错与死循环。

---

## ✨ 核心特性 (Key Features)

### 1. 轻量对话聚焦内容 (Lightweight & Content-Focused)
* **去工程化噪音**：彻底去除侵入式 Diff/Apply 代码合并等繁杂功能与冗余标签，回归纯粹的思考、阅读与自然写作伴侣；
* **极致轻量架构**：编译产物体积严格控制在 **~2.1 MB**（较传统同类插件减重 75% 以上），零多余依赖，极速秒开加载。

### 2. 现代聊天体验 (Modern Native Chat UI)
* **短信式对仗气泡**：用户提问右侧聚焦呈现，AI 回复左侧优雅展开，完美对齐 Obsidian 官方设计变量，自适应浅色、深色及第三方主题（如 Minimal）；
* **深度思考优雅折叠**：支持推理模型（如 DeepSeek-R1、Qwen-Thinking）的思考过程类 Callout 式折叠与流式展开，思绪清晰可溯；
* **就地修改并重生成**：鼠标悬停在用户历史提问上，点击编辑图标即可修改上一轮提问并重新生成回复。

### 3. 知识库功能 (Vault Knowledge Copilot)
* **文件与文件夹精准引用**：输入 `@` 即可智能检索并关联当前笔记库内的特定文档或目录；
* **当前文档边读边聊**：自动感知当前编辑焦点，针对长笔记进行智能总结、提炼要点与多方对比。

### 4. 免费层友好 (Free-Tier Friendly & Anti-429)
* **双轨模式自由切换**：
  * **🌱 免费层轻量模式 (Eco - 默认推荐)**：单次提问 Token 骤降 75%，单次搜索快速收敛，彻底免疫 Groq 每分钟 8,000 TPM 限额；
  * **🚀 付费层高精度模式 (Pro)**：释放超长上下文历史与多轮深度调研；
* **智能防 429 避让与静默重试**：遇到平台短时速率限制（$\le 5$s）后台自动延迟重试，长时限流提供友好倒计时中文指引，彻底告别突兀大红屏；
* **循环熔断器 (Loop Guard)**：根治部分模型无休止连续调用工具的死循环，收官轮次自动注入“结案作答指令”，确保稳定输出高质量长文。

### 5. MCP 友好（工具扩展生态）
* **深度集成 Model Context Protocol (MCP)**：支持连接外部标准 MCP 服务器（通过 stdio / SSE），按需扩展外部 AI 插件与知识库能力；
* **免 Node.js 原生工具开箱即用**：
  * **国内必应联网搜索 (Bing CN)**：直连微软 Bing 国内站，免翻墙、免 API Key，随时检索最新事实与新闻资讯；
  * **网页正文深度提取 (Web Fetch)**：输入或粘贴任意网页链接，自动解析提取干净排版的 Markdown 正文；
  * **全球实时天气 (Weather Forecast)**：秒查各大城市气温、天气与生活建议；
  * **arXiv 学术文献检索**：一键检索全球最大开放科学文献库中的最新学术论文与摘要；
  * **精准系统时间**：毫秒级精准获取当前本地系统时间与时区。

---

## 📥 极速安装使用 (Quick Installation)

> 普通用户**强烈推荐直接使用预编译版本**，无需安装任何开发工具，30 秒即可在 Obsidian 中启用！

### 方式一：直接下载发布包（首选推荐）
1. 在本仓库右侧的 [Releases 页面](https://github.com/vimbackground/obsidian-aide/releases) 中下载最新版的 **`obsidian-aide.zip`**；
2. 解压压缩包，确认里面包含三个文件：
   - `main.js`
   - `manifest.json`
   - `styles.css`
3. 打开您的 Obsidian 笔记库文件夹，进入隐藏目录 `.obsidian/plugins/`（如没有可新建）；
4. 在其中创建一个名为 **`obsidian-aide`** 的文件夹，并将解压出的 3 个文件放入：
   ```text
   <您的笔记库>/.obsidian/plugins/obsidian-aide/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```
5. 打开 Obsidian，进入 **【设置】->【第三方插件 / 社区插件】**，点击右上角刷新，找到 **Aide** 并开启即可！

### 方式二：直接从仓库 output 目录获取
如果您已将本仓库下载或克隆至本地，直接将本仓库中 `output/obsidian-aide/` 整个文件夹复制到您的 `.obsidian/plugins/` 目录下即可。

---

## ⚙️ 快速配置与推荐模型

进入 Obsidian 【设置】->【Aide】设置面板，配置您习惯的模型服务商：

* **SiliconFlow（硅基流动 - 强烈推荐，带免费额度）**：
  - 注册即送免费额度，推荐对话模型：`deepseek-ai/DeepSeek-V4-Flash`
* **Groq（超高速推理）**：
  - 免费层速度极快，配合 Aide 的 **Eco 模式** 使用体验极佳，推荐对话模型：`qwen/qwen3.8-27b`
* **OpenAI / DeepSeek 官方**：
  - 填入对应官方 API Key 即可使用全系列最新模型。

---

## 🙏 开源致谢与声明 (Acknowledgments)

本项目在产品设计理念、UI 组件沉淀及早期架构上深度参考并受启发于优秀开源项目 [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer)。

在此对原作者 [glowingjade](https://github.com/glowingjade) 及其开源贡献表达诚挚的致谢与敬意！

---

## 🛠️ 开发者源码构建与自动化发布 (For Developers)

<details>
<summary><b>点击展开开发者编译与发布指引（普通用户可忽略）</b></summary>

### 1. 源码克隆与环境准备
```bash
git clone https://github.com/vimbackground/obsidian-aide.git
cd obsidian-aide
npm install
```

### 2. 本地开发与构建命令
```bash
# 本地热重载开发监听
npm run dev

# 生产环境编译构建（输出至 output/obsidian-aide/）
npm run build

# 打包 output/obsidian-aide 产物为 output/obsidian-aide.zip
npm run pack:zip

# 一键执行构建 + zip 压缩打包
npm run build:all

# 代码检查与测试
npm run type:check
npm run lint:check
npm test
```

### 3. 一步极速发布流程（Push 即发版）
本项目已配置智能云端流水线（`.github/workflows/release.yml`），**本地无需手动打 Tag，也无需执行复杂发版命令**。发布新版本仅需一步：

1. **升级版本号**（自动同步 `package.json`、`manifest.json`、`versions.json` 等）：
   ```bash
   npm run bump:patch   # 小升级 (0.8.3 -> 0.8.4)
   # 或 npm run bump:minor (0.8.3 -> 0.9.0)
   # 或 npm run bump:major (0.8.3 -> 1.0.0)
   ```
   *(可选：在 `RELEASE_NOTES.md` 顶部记录新版本的详细更新说明，若未填写将自动使用友好发布模板)*

2. **提交并推送至 GitHub（一步解决）**：
   ```bash
   git add .
   git commit -m "chore: release v0.8.4"
   git push origin main
   ```

**云端全自动处理一切**：
- GitHub Actions 监听到 `main` 分支代码推送后，自动比对当前 `package.json` 中的版本号；
- 若检测到新版本号（尚未发布过 Release），云端自动为该次提交创建 `v0.8.4` 标签；
- 自动在云端执行构建并打包生成最新的 **`obsidian-aide.zip`**；
- 自动提取并解析对应的版本更新说明；
- 自动在 GitHub Releases 中创建正式发布页面，挂载 `obsidian-aide.zip`、`main.js`、`manifest.json`、`styles.css` 全部附件！
- 若仅为普通日常代码提交（版本号未变更），流水线检测到已发布后自动跳过，绝不产生重复 Release。

</details>

---

## 📄 开源许可证 (License)

本项目基于 [MIT 许可证](LICENSE) 开源。
