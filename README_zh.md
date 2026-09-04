# Obsidian Aide

<p align="center">
  <b>轻量、去干扰、与笔记共生的 Obsidian 原生 AI 伴侣，专为笔记创作者、学者与深度思考者打造。</b>
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> | <a href="README_zh.md"><b>简体中文</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.8.3-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/platform-Obsidian-purple.svg" alt="platform">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/Node.js-无需安装-brightgreen.svg" alt="zero-config">
</p>

---

## 💡 为什么需要 Obsidian Aide？（价值与意义）

当下 Obsidian 生态中的各类 AI 插件往往走向两个极端：要么**过于技术化、工程化**（充斥着程序员专属的代码合并 Diff 按钮、繁杂的多层侧边栏、必须安装配置 Node.js 运行环境），要么**过于浅层**（仅仅是一个与笔记毫无互动的网页套壳）。

**Obsidian Aide 选择了完全不同的产品路线：**
* **零技术门槛，开箱即用**：普通笔记用户**完全不需要懂编程，也无需安装 Node.js 或配置复杂的本地命令行**。下载解压 30 秒即可在 Obsidian 中启用；
* **视觉与体验原生共生**：不做突兀的外来物。短信式气泡完美对齐 Obsidian 官方设计变量，自动融入浅色、深色及任何第三方精美主题；
* **真正的知识库伴侣**：不喧宾夺主。随时通过 `@` 键引用当前库中的笔记与文献，在阅读长文时边读边聊、提炼要点、对比观点；
* **普通人也用得起的免费生态**：无需承担高昂的订阅费用。内置针对 Groq、硅基流动等免费大模型的极致轻量与防限流调优，让免费模型也能极速、稳定、不报错。

---

## 🎯 适合哪些人群？（适用人群）

* 📚 **学者、科研人员与高校师生**：阅读长篇文献与学术笔记，直接使用内置工具检索 arXiv 最新论文，对多篇笔记进行横向交叉比对；
* ✍️ **知识创作者、博主与作家**：告别写作面对空白页的焦虑，随时在侧边栏探讨大纲架构、润色表达、扩展思路，专注沉浸写作；
* 🎒 **终身学习者与考研/考证党**：将笔记库变为随时答疑的专属导师，免翻墙联网搜索最新概念，整理知识树与问答卡片；
* 💡 **所有个人知识管理（PKM）爱好者**：渴望拥有一个安静、克制、像原生功能一样自然融入 Obsidian 的 AI 助手。

---

## ✨ 核心特性

### 1. 轻量对话聚焦内容 (Lightweight & Content-Focused)
* **消除工程化噪音**：彻底剔除侵入式的代码差异比对（Diff）与合并按钮（Apply），告别眼花缭乱的技术标签，让界面完完全全属于您的文字与思绪；
* **羽量级极速秒开**：最终插件体积严格控制在 **~2.1 MB**（较同类传统插件减重 75% 以上），不占用多余系统资源，丝毫不会拖慢您的笔记库。

### 2. 现代聊天体验 (Modern Native Chat UI)
* **短信式对仗气泡**：用户提问右侧轻量呈现，AI 回复左侧优雅展开，自适应所有官方及社区主题（如 Minimal）；
* **深度思考折叠展开**：针对最新的推理思考模型（如 DeepSeek-R1、Qwen-Thinking），思考推理过程采用优雅的 Callout 折叠块流式呈现，答案清爽一目了然；
* **就地修改历史提问**：鼠标悬停于历史提问上方，点击编辑即可修改上一轮问题并立即重新回答。

### 3. 知识库功能 (Vault Knowledge Copilot)
* **`@` 键精准引用**：输入 `@` 即可模糊检索并关联当前笔记库内的任意文档或特定文件夹；
* **当前笔记边读边聊**：自动感知当前打开的编辑窗口，一键总结长文核心观点、提炼行动清单或生成 Q&A 对答。

### 4. 免费层友好 (Free-Tier Friendly & Anti-429)
* **🌱 免费层轻量模式 (Eco)**：专为普通用户打造，单次提问 Token 消耗骤降 75%，完美契合 Groq（每分钟 8,000 TPM 限额）等平台的免费额度；
* **智能防 429 熔断与静默重试**：遇到平台瞬时限流后台自动静默避让重试，遇到长时限流提供贴心的倒计时中文指引，彻底告别刺眼大红屏；
* **防死循环熔断器 (Loop Guard)**：根治部分模型在连续调用工具时无休止死磕的死循环，确保稳定输出最终长文。

### 5. MCP 友好（工具扩展生态）
* **深度集成开放标准 MCP**：支持标准 Model Context Protocol (MCP) 协议，可根据未来需求自由接入外部 MCP 工具服务；
* **免 Node.js 原生工具开箱即用**：
  * **国内必应联网搜索 (Bing CN)**：直连国内服务器，**免翻墙、免 API Key**，秒查最新资讯与事实；
  * **网页正文深度提取**：随意输入网页链接，秒级提取出干净排版的 Markdown 正文；
  * **实时天气与学术检索**：随时查询全球天气与 arXiv 前沿科学论文。

---

## 📥 30 秒极速安装（普通用户首选）

> 普通用户**强烈推荐直接使用打包好的发布包**，无需任何开发工具或命令行操作！

### 方式一：直接下载安装包（首选推荐）
1. 在本仓库的 [最新 Releases 页面](https://github.com/vimbackground/obsidian-aide/releases/latest) 中下载 **`obsidian-aide.zip`**；
2. 解压该压缩包，确认得到三个文件：`main.js`、`manifest.json`、`styles.css`；
3. 打开您的 Obsidian 笔记库文件夹，找到并进入隐藏目录 `.obsidian/plugins/`（如果没有该目录可手动新建）；
4. 在其中新建一个名为 **`obsidian-aide`** 的文件夹，并将这 3 个文件放入：
   ```text
   <您的笔记库>/.obsidian/plugins/obsidian-aide/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```
5. 打开 Obsidian，进入 **【设置】->【第三方插件】**，点击右上角刷新图标，找到 **Aide** 并开启即可！

### 方式二：直接从仓库 output 目录获取
如果您已将本项目克隆或下载到本地，直接将本仓库中的 `output/obsidian-aide/` 整个文件夹复制到您的 `.obsidian/plugins/` 目录下即可。

---

## ⚙️ 推荐模型与配置建议

进入 Obsidian **【设置】->【Aide】** 面板，填入模型服务商信息：

| 服务商 | 为什么推荐普通用户使用 | 推荐日常对话模型 |
| :--- | :--- | :--- |
| **SiliconFlow（硅基流动）** | 国内服务器直连极速，注册即送免费额度，免翻墙 | `deepseek-ai/DeepSeek-V4-Flash` |
| **Groq** | 全球极速推理，搭配 Aide 的 **Eco 模式** 免费额度极为耐用 | `qwen/qwen3.8-27b` |
| **OpenAI / DeepSeek 官方** | 行业顶尖大模型实力，深度思考与分析能力卓越 | `deepseek-chat` / `gpt-4o` |

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
