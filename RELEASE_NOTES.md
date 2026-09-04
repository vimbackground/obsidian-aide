# Release Notes: v0.8.3 - Obsidian Aide 正式发布

🎉 欢迎使用 **Obsidian Aide**！

Obsidian Aide 是一款轻量级、去干扰、以深度思考与创作为中心的 Obsidian AI 伴侣。不同于臃肿复杂的开发型插件，Aide 回归纯粹的聊天交互与笔记共生体验，普通用户无需安装 Node.js 即可开箱畅享免翻墙联网搜索与多模型问答。

---

## 🚀 核心特性与亮点 (Highlights)

1. **短信式原生对仗对话体验**：
   - 用户提问气泡与 AI 回复卡片高保真绑定 Obsidian 官方设计变量，自适应任意浅色、深色及第三方主题；
   - 深度思考（Reasoning / Thinking）过程类 Callout 式折叠与流式展开；
   - 支持就地修改历史提问并重新生成。
2. **免 Node.js 原生工具开箱即用**：
   - **国内必应联网搜索 (Bing CN)**：直连国内服务器，免翻墙、免 API Key；
   - **网页正文深度提取**：自动解析任意网页为干净的 Markdown 正文；
   - **实时天气预报**、**arXiv 前沿学术论文检索**、**精准当前时间**随叫随到。
3. **独家免费层友好体验（防 429 与死循环熔断）**：
   - 内置“🌱 免费层轻量模式 (Eco)”与“🚀 付费层高精度模式 (Pro)”；
   - 深度适配 Groq（8,000 TPM 限额）与 SiliconFlow 免费模型，单次提问 Token 骤降 75%；
   - 智能捕获 429 速率限制并自动静默重试，告别突兀大红屏；
   - 循环熔断机制（Loop Guard）彻底根治模型在工具调用中无休止死磕的死循环。
4. **极致轻量架构**：
   - 最终打包产物体积仅 **2.10 MB**（较传统同类插件减重 75% 以上），零多余依赖，极速加载。

---

## 📥 安装使用指南

1. 下载下方附件中的 **`obsidian-aide.zip`**；
2. 解压得到三个文件：`main.js`、`manifest.json`、`styles.css`；
3. 将这三个文件放置于您的 Obsidian 库目录中的 `.obsidian/plugins/obsidian-aide/` 文件夹下；
4. 进入 Obsidian **【设置】->【第三方插件】**，点击刷新并开启 **Aide** 即可！

---

## 🙏 致谢

本项目在产品设计理念与底层架构上深受开源项目 [obsidian-smart-composer](https://github.com/glowingjade/obsidian-smart-composer) 的启发，在此对原作者 glowingjade 表达诚挚的感谢！
