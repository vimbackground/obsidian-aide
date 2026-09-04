# Obsidian Aider

<p align="center">
  <b>轻量、去干扰、与笔记共生的 Obsidian 原生 AI 伴侣，专为笔记创作者、学者与深度思考者打造。</b>
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> | <a href="README_zh.md"><b>简体中文</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.9.0-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/platform-Obsidian-purple.svg" alt="platform">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/Node.js-无需安装-brightgreen.svg" alt="zero-config">
</p>

---

## 💡 项目定位与适用人群

**Obsidian Aider** 是一款深度融入 Obsidian 的轻量级原生 AI 对话与知识伴侣。它专注于笔记阅读、文献理解、灵感构思与内容创作，帮助用户在不离开写作界面的前提下与自己的知识库和前沿大模型自然对话。

### 解决的核心痛点
- **拒绝过度工程化**：摆脱充满程序员向 Diff 比对、繁杂操作和笨重依赖的环境，回归纯粹的文字创作与思绪整理；
- **拒绝脱离笔记的套壳**：告别单纯的网页套壳，实现随时精准引用库内笔记、感知当前激活文档、提炼知识脉络；
- **解决免费额度限流痛点**：针对普通用户常用的免费模型平台，内置严格控流与上下文优化，防止频繁触发 429 报错。

### 适合人群
- 📚 **科研人员与学者**：快速梳理长篇文献、检索 arXiv 论文、跨笔记交叉比对观点；
- ✍️ **知识博主与写作者**：在侧边栏探讨文章大纲、润色文字表达、突破写作瓶颈；
- 🎒 **学生与自学者**：将个人笔记库变成互动式专属导师，联网查证新概念、提炼核心考点；
- 💡 **PKM 个人知识管理爱好者**：追求安静、克制、原生般流畅体验的 Obsidian 资深用户。

---

## ⚖️ 主要差异与核心特性

### 相比同类产品的核心差异
1. **零技术门槛，无需 Node.js**：无需配置开发环境，解压即用；体积仅 **~2.1 MB**（较传统同类插件减重 75%+），启动秒开，不拖慢笔记库。
2. **纯粹的内容创作界面**：彻底精简程序员专属的代码 Diff/Apply 按钮，让视觉完完全全回归笔记内容本身。
3. **极致免费层友好**：默认启用 **🌱 Eco 轻量模式**，Token 消耗节省高达 75%，配合智能防 429 熔断与静默重试，让免费模型也能极其耐用稳定。
4. **原生视觉共生**：短信式气泡自适应官方与社区主题，推理模型的思考过程优雅折叠流式展示。

### 核心特性速览
- **知识库边读边聊 (`@` 联动)**：输入 `@` 即可模糊检索并引用库内笔记或文件夹，自动感知当前激活编辑窗口并一键提炼要点。
- **免 API Key 原生工具 & MCP 生态**：
  - 内置**国内必应联网搜索**（直连免翻墙、免 Key）；
  - 内置**网页正文抓取**（输入网址秒转干净 Markdown）；
  - 内置**实时天气与 arXiv 论文检索**，并全面支持标准 **MCP** (Model Context Protocol) 协议扩展。
- **开箱即用多服务商体系**：预置 **OpenAI、DeepSeek、OpenRouter、SiliconFlow** 4 家核心服务商，默认搭载 SiliconFlow 的 `deepseek-ai/DeepSeek-V4-Flash` 模型；默认英文界面（支持随时切为中文）。

---

## 🚀 快速上手与使用

### 1. 安装与启用
1. 前往 [最新 Releases 页面](https://github.com/vimbackground/obsidian-aider/releases/latest) 下载 **`aider.zip`**；
2. 解压得到 `main.js`、`manifest.json`、`styles.css` 三个文件；
3. 将它们放入笔记库目录 `<你的笔记库>/.obsidian/plugins/aider/`；
4. 打开 Obsidian，进入 **设置 -> 第三方插件**，点击刷新并启用 **Aider**。
*(若从源码仓库安装，直接将 `output/obsidian-aider/` 文件夹复制到 `.obsidian/plugins/` 亦可)*

### 2. 开始使用
- **唤起对话**：点击 Obsidian 左侧边栏的图标（或通过命令面板 `Ctrl/Cmd + P` 搜索 `Open chat`）打开 Aider 侧边栏；
- **关联笔记**：在输入框键入 `@` 选择要引用的笔记或文件夹，Aider 将自动提取上下文；
- **配置模型**：进入 **设置 -> Aider**，填入所选服务商的 API Key，即可在对话框顶部随时切换心仪模型。

---

## 🛠️ 开发者与技术操作指南

如果您是开发者，希望从源码进行编译调试、探索底层轻量化架构，或了解 GitHub Actions 自动构建发版流水线，请参阅专门的：

👉 **[开发者与技术操作指南 (docs/DEVELOPMENT.md)](docs/DEVELOPMENT.md)**

---

## 🙏 致谢

本项目在产品设计理念与早期底层架构上深受开源项目 [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer) 的启发，在此对原作者 [glowingjade](https://github.com/glowingjade) 的无私开源贡献表达诚挚的感谢！

---

## 📄 开源许可证

本项目基于 [MIT 许可证](LICENSE) 开源。
