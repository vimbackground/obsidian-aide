import { ChatModel } from './types/chat-model.types'
import { EmbeddingModel } from './types/embedding-model.types'
import { LLMProvider, LLMProviderType } from './types/provider.types'

export const CHAT_VIEW_TYPE = 'aide-chat-view'

// Default model ids
export const DEFAULT_CHAT_MODEL_ID = 'Qwen/Qwen3.5-4B'
export const DEFAULT_APPLY_MODEL_ID = ''

// Recommended model ids
export const RECOMMENDED_MODELS_FOR_CHAT = [
  'claude-sonnet-4.5',
  'gpt-5.2',
]
export const RECOMMENDED_MODELS_FOR_APPLY = ['gpt-4.1-mini']
export const RECOMMENDED_MODELS_FOR_EMBEDDING = [
  'openai/text-embedding-3-small',
]

export const PLAN_PROVIDER_TYPES: readonly LLMProviderType[] = []
export const PROVIDER_TYPES_INFO = {
  anthropic: {
    label: 'Anthropic',
    labelZh: 'Anthropic',
    defaultProviderId: 'anthropic',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  openai: {
    label: 'OpenAI',
    labelZh: 'OpenAI',
    defaultProviderId: 'openai',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  gemini: {
    label: 'Gemini',
    labelZh: 'Gemini',
    defaultProviderId: 'gemini',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  xai: {
    label: 'xAI',
    labelZh: 'xAI',
    defaultProviderId: 'xai',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  deepseek: {
    label: 'DeepSeek',
    labelZh: 'DeepSeek',
    defaultProviderId: 'deepseek',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  siliconflow: {
    label: 'SiliconFlow',
    labelZh: '硅基流动 (SiliconFlow)',
    defaultProviderId: 'siliconflow',
    requireApiKey: true,
    requireBaseUrl: true,
    supportEmbedding: true,
    additionalSettings: [],
  },
  mistral: {
    label: 'Mistral',
    labelZh: 'Mistral',
    defaultProviderId: 'mistral',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  perplexity: {
    label: 'Perplexity',
    labelZh: 'Perplexity',
    defaultProviderId: 'perplexity',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  openrouter: {
    label: 'OpenRouter',
    labelZh: 'OpenRouter',
    defaultProviderId: 'openrouter',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  groq: {
    label: 'Groq',
    labelZh: 'Groq',
    defaultProviderId: 'groq',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  modelscope: {
    label: 'ModelScope',
    labelZh: '魔搭社区 (ModelScope)',
    defaultProviderId: 'modelscope',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  ollama: {
    label: 'Ollama',
    labelZh: 'Ollama (本地私有部署)',
    defaultProviderId: 'ollama',
    requireApiKey: false,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  'lm-studio': {
    label: 'LM Studio',
    labelZh: 'LM Studio (本地私有部署)',
    defaultProviderId: 'lm-studio',
    requireApiKey: false,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  'azure-openai': {
    label: 'Azure OpenAI',
    labelZh: 'Azure OpenAI',
    defaultProviderId: null, // no default provider for this type
    requireApiKey: true,
    requireBaseUrl: true,
    supportEmbedding: false,
    additionalSettings: [
      {
        label: 'Deployment',
        labelZh: '部署名称 (Deployment)',
        key: 'deployment',
        placeholder: 'Enter your deployment name',
        placeholderZh: '输入你的部署名称',
        type: 'text',
        required: true,
      },
      {
        label: 'API Version',
        labelZh: 'API 版本 (API Version)',
        key: 'apiVersion',
        placeholder: 'Enter your API version',
        placeholderZh: '输入你的 API 版本',
        type: 'text',
        required: true,
      },
    ],
  },
  'openai-compatible': {
    label: 'OpenAI Compatible',
    labelZh: '自定义 OpenAI 兼容接口',
    defaultProviderId: null, // no default provider for this type
    requireApiKey: false,
    requireBaseUrl: true,
    supportEmbedding: true,
    additionalSettings: [
      {
        label: 'No Stainless Headers',
        labelZh: '移除 Stainless 请求头',
        key: 'noStainless',
        type: 'toggle',
        required: false,
        description:
          'Enable this if you encounter CORS errors related to Stainless headers (x-stainless-os, etc.)',
        descriptionZh:
          '若在连接特定中转时遇到 Stainless 请求头导致的跨域错误，开启此项可自动剥除该头。',
      },
    ],
  },
} as const satisfies Record<
  LLMProviderType,
  {
    label: string
    labelZh: string
    defaultProviderId: string | null
    requireApiKey: boolean
    requireBaseUrl: boolean
    supportEmbedding: boolean
    additionalSettings: {
      label: string
      labelZh?: string
      key: string
      type: 'text' | 'toggle'
      placeholder?: string
      placeholderZh?: string
      description?: string
      descriptionZh?: string
      required?: boolean
    }[]
  }
>

export function getProviderTypeLabel(
  type: LLMProviderType,
  language: string = 'en',
): string {
  const info = PROVIDER_TYPES_INFO[type]
  if (!info) return type
  return language === 'zh' ? info.labelZh : info.label
}

/**
 * Important
 * 1. When adding new default provider, settings migration should be added
 * 2. If there's same provider id in user's settings, it's data should be overwritten by default provider
 */
export const DEFAULT_PROVIDERS: readonly LLMProvider[] = [
  {
    type: 'openai',
    id: PROVIDER_TYPES_INFO.openai.defaultProviderId,
  },
  {
    type: 'deepseek',
    id: PROVIDER_TYPES_INFO.deepseek.defaultProviderId,
  },
  {
    type: 'openrouter',
    id: PROVIDER_TYPES_INFO.openrouter.defaultProviderId,
  },
  {
    type: 'siliconflow',
    id: PROVIDER_TYPES_INFO.siliconflow.defaultProviderId,
    baseUrl: 'https://api.siliconflow.cn/v1',
  },
]

/**
 * Important
 * 1. When adding new default model, settings migration should be added
 * 2. If there's same model id in user's settings, it's data should be overwritten by default model
 */
export const DEFAULT_CHAT_MODELS: readonly ChatModel[] = [
  {
    providerType: 'siliconflow',
    providerId: PROVIDER_TYPES_INFO.siliconflow.defaultProviderId,
    id: 'Qwen/Qwen3.5-4B',
    model: 'Qwen/Qwen3.5-4B',
    enable: true,
  },
]

export const DEFAULT_SYSTEM_PROMPT = `You are an intelligent assistant and creative collaborator powered by Aider. Your responsibility is to objectively, neutrally, and accurately assist users with reading, understanding, writing, and processing documents and various tasks.

### Core Principles & Guidelines:
1. **Objectivity and Neutrality**: Always maintain a rational, rigorous, and neutral stance without presupposed subjective opinions or value biases. Present different perspectives and factual evidence objectively on open-ended or controversial topics.
2. **Standard Markdown Format**: Strictly adhere to standard Markdown formatting (appropriate use of heading levels, paragraphs, lists, tables, code blocks, etc.) to ensure optimal compatibility and layout across any Markdown editor.
3. **Fidelity to Reference Facts**: When the user references notes, documents, or contextual materials in the conversation, prioritize rigorous analysis and responses based strictly on the provided factual materials. If materials are insufficient or facts cannot be deduced, truthfully inform the user without fabricating facts.
4. **Conciseness and Rigorous Logic**: Keep writing concise, well-structured, and directly focused on the core topic, avoiding empty rhetoric and redundant boilerplate.`


/**
 * Important
 * 1. When adding new default embedding model, settings migration should be added
 * 2. If there's same embedding model id in user's settings, it's data should be overwritten by default embedding model
 */
export const DEFAULT_EMBEDDING_MODELS: readonly EmbeddingModel[] = [
  {
    providerType: 'siliconflow',
    providerId: PROVIDER_TYPES_INFO.siliconflow.defaultProviderId,
    id: 'bge-m3',
    model: 'BAAI/bge-m3',
    dimension: 1024,
  },
]

// Pricing in dollars per million tokens
type ModelPricing = {
  input: number
  output: number
}

export const OPENAI_PRICES: Record<string, ModelPricing> = {
  'gpt-5.2': { input: 1.75, output: 14 },
  'gpt-5.1': { input: 1.25, output: 10 },
  'gpt-5': { input: 1.25, output: 10 },
  'gpt-5-mini': { input: 0.25, output: 2 },
  'gpt-5-nano': { input: 0.05, output: 0.4 },
  'gpt-4.1': { input: 2.0, output: 8.0 },
  'gpt-4.1-mini': { input: 0.4, output: 1.6 },
  'gpt-4.1-nano': { input: 0.1, output: 0.4 },
  'gpt-4o': { input: 2.5, output: 10 },
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
  o3: { input: 10, output: 40 },
  o1: { input: 15, output: 60 },
  'o4-mini': { input: 1.1, output: 4.4 },
  'o3-mini': { input: 1.1, output: 4.4 },
  'o1-mini': { input: 1.1, output: 4.4 },
}

export const ANTHROPIC_PRICES: Record<string, ModelPricing> = {
  'claude-opus-4-5': { input: 5, output: 25 },
  'claude-opus-4-1': { input: 15, output: 75 },
  'claude-opus-4-0': { input: 15, output: 75 },
  'claude-sonnet-4-5': { input: 3, output: 15 },
  'claude-sonnet-4-0': { input: 3, output: 15 },
  'claude-3-5-sonnet-latest': { input: 3, output: 15 },
  'claude-3-7-sonnet-latest': { input: 3, output: 15 },
  'claude-haiku-4-5': { input: 1, output: 5 },
  'claude-3-5-haiku-latest': { input: 1, output: 5 },
}

// Gemini is currently free for low rate limits
export const GEMINI_PRICES: Record<string, ModelPricing> = {}

export const XAI_PRICES: Record<string, ModelPricing> = {
  'grok-4-1-fast': { input: 0.2, output: 0.5 },
  'grok-4-1-fast-non-reasoning': { input: 0.2, output: 0.5 },
}

export const DEEPSEEK_PRICES: Record<string, ModelPricing> = {
  // Model version: DeepSeek-V3.2
  'deepseek-chat': { input: 0.28, output: 0.42 },
  'deepseek-reasoner': { input: 0.28, output: 0.42 },
}

export type PresetPromptTemplate = {
  id: string
  nameZh: string
  nameEn: string
  contentZh: string
  contentEn: string
}

export const OBSIDIAN_PRESET_TEMPLATES: readonly PresetPromptTemplate[] = [
  {
    id: 'preset-atomic-note',
    nameZh: '卡片笔记重构 (卡片化提炼)',
    nameEn: 'Atomic Note Refactoring',
    contentZh: '请将上述选中的内容或笔记，按照卡片笔记（Atomic Notes）原则进行重构提炼：\n1. 提炼出唯一的核心论点作为主题句；\n2. 剥离次要细节，保留关键支撑论据与逻辑链条；\n3. 使用清晰明了的短句，确保单张卡片自成一体（Self-contained）。',
    contentEn: 'Please refactor and distill the selected note content following the principles of Atomic Notes:\n1. Formulate a single core thesis as the theme sentence;\n2. Strip away minor details, retaining key supporting arguments and logical chains;\n3. Use clear, concise phrasing to ensure the note is self-contained.',
  },
  {
    id: 'preset-wikilink-extract',
    nameZh: '双链关键词提取与链接建议',
    nameEn: 'Extract WikiLinks & Concept Connections',
    contentZh: '请通读当前笔记内容，挖掘其中潜在的核心概念、领域实体与衍生主题：\n1. 找出 5~8 个最适合在 Obsidian 中建立双向链接的关键词，使用 `[[概念名称]]` 格式给出；\n2. 为每个双链概念提供 1 句话的关联解释，说明它们如何能与知识库中的其它可能笔记产生交织网状关联。',
    contentEn: 'Please read through the current note to discover core concepts, domain entities, and potential cross-links:\n1. Identify 5-8 keywords most suitable for bidirectional linking in Obsidian, formatted as `[[Concept Name]]`;\n2. Provide a 1-sentence contextual justification for each link, explaining how it connects to other notes in the vault.',
  },
  {
    id: 'preset-daily-review',
    nameZh: '日记与每日复盘总结 (Daily Review)',
    nameEn: 'Daily Journal & Reflection Review',
    contentZh: '请帮我梳理今天的笔记记录，生成结构化的每日复盘复盘纪要：\n- 🎯 **今日核心成果与推进事项**：列出完成的关键进展；\n- 💡 **关键洞察与新认知**：提炼今天产生的思考、灵感或经验教训；\n- ⏳ **未决问题与阻塞点**：指出需要后续继续攻克的问题；\n- 📋 **明日首要推进动作 (Top 3)**：明确最优先处理的 3 项任务。',
    contentEn: 'Please analyze today\'s journal entries and generate a structured daily reflection:\n- 🎯 **Core Achievements**: Key progress accomplished today;\n- 💡 **Key Insights & Learnings**: New ideas, reflections, or lessons learned;\n- ⏳ **Open Questions & Blockers**: Issues pending resolution;\n- 📋 **Top 3 Priorities for Tomorrow**: Next actionable steps.',
  },
  {
    id: 'preset-meeting-minutes',
    nameZh: '会议纪要提炼与行动项 (Action Items)',
    nameEn: 'Meeting Minutes & Action Items',
    contentZh: '请将以下凌乱的会议记录或讨论草稿整理成专业的结构化会议纪要：\n1. 📌 **会议核心主题与目标**；\n2. 🗣️ **主要讨论共识与关键决策**；\n3. ✅ **行动项与待办清单 (Action Items)**：以 `- [ ] @负责人 任务内容 (截止日期)` 明确列出。',
    contentEn: 'Please organize the following meeting discussion notes into structured professional minutes:\n1. 📌 **Meeting Objective & Overview**;\n2. 🗣️ **Key Decisions & Consensus**;\n3. ✅ **Action Items Checklist**: Explicitly formatted as `- [ ] @Assignee Task description (Due date)`.',
  },
  {
    id: 'preset-structure-outline',
    nameZh: '长文思维导图大纲重构',
    nameEn: 'Structured Outline & Mindmap Tree',
    contentZh: '请将提供的文本进行逻辑分层，输出为适合 Obsidian 阅读的清晰多级 Markdown 大纲：\n1. 采用严格的 `# 一级`、`## 二级`、`### 三级` 结构；\n2. 每个层级提取 1~2 个核心要点，条理严密，展现层层递进的思维脉络。',
    contentEn: 'Please parse the provided text into a hierarchical Markdown outline suitable for Obsidian:\n1. Use strict heading levels (`#`, `##`, `###`);\n2. Summarize 1-2 key points under each branch, demonstrating a clear logical progression.',
  },
  {
    id: 'preset-academic-distill',
    nameZh: '学术文献与论文要点速读',
    nameEn: 'Academic Paper & Research Digest',
    contentZh: '请从研究者视角帮我速读与总结以下论文/学术文献：\n1. 🔬 **Research Question (研究问题)**：作者试图解决什么核心矛盾？\n2. 🛠️ **Methodology (核心方法与创新点)**：提出的技术路线或理论机制是什么？\n3. 📊 **Key Findings (核心结论与实验结果)**；\n4. ⚖️ **Limitations & Potential (局限性与未来启发)**。',
    contentEn: 'Please digest and synthesize the following academic paper from a researcher\'s perspective:\n1. 🔬 **Research Question**: What core problem does the author address?\n2. 🛠️ **Methodology & Novelty**: What is the key mechanism or technical approach?\n3. 📊 **Key Findings & Evidence**;\n4. ⚖️ **Limitations & Future Directions**.',
  },
  {
    id: 'preset-feynman-explain',
    nameZh: '费曼技巧通俗化概念讲解',
    nameEn: 'Feynman Technique Simple Explanation',
    contentZh: '请运用费曼学习法（Feynman Technique），将上述复杂的概念用最通俗易懂的大白话进行讲解：\n1. 像给一个没有任何专业背景的中学生解释一样，使用生活中的生动比喻；\n2. 避开晦涩的学术黑话；\n3. 最后举一个日常生活中的实际应用场景来加深理解。',
    contentEn: 'Using the Feynman Technique, explain the complex concept above in simple, intuitive terms:\n1. Explain it as if to a high schooler without prior domain background, using vivid real-life analogies;\n2. Avoid obscure jargon;\n3. Conclude with a practical daily example to solidify understanding.',
  },
  {
    id: 'preset-bilingual-polish',
    nameZh: '中英双语精准学术润色',
    nameEn: 'Bilingual Polishing & Refinement',
    contentZh: '请对以下文本进行严谨的写作润色与表达优化：\n1. 修正语法、拼写、标点及中英标点混用错误；\n2. 提升词汇丰富度与学术/专业用词精确性；\n3. 分别提供【润色后的文本】与【关键修改建议解析】。',
    contentEn: 'Please perform a thorough and professional polish on the following text:\n1. Correct grammar, syntax, punctuation, and wording inconsistencies;\n2. Enhance vocabulary precision and flow;\n3. Provide both the [Polished Version] and a concise explanation of [Key Improvements].',
  },
  {
    id: 'preset-critical-review',
    nameZh: '魔鬼代言人 (逻辑谬误与漏洞审查)',
    nameEn: 'Devil\'s Advocate (Critical Review)',
    contentZh: '请扮演一位极其严苛的“魔鬼代言人”与批判性审稿人，审视当前笔记或观点：\n1. 指出推导过程中可能存在的逻辑漏洞、幸存者偏差或未经证实的假设；\n2. 提出 3 个最具杀伤力的反面质询问题；\n3. 给出如何增强该论点说服力的具体防御性建议。',
    contentEn: 'Act as a rigorous "Devil\'s Advocate" and critically review the arguments in this note:\n1. Identify logical fallacies, unverified assumptions, or blind spots;\n2. Pose the 3 most challenging counter-questions;\n3. Suggest actionable ways to strengthen the robustness of the argument.',
  },
  {
    id: 'preset-action-plan',
    nameZh: '目标拆解与可执行动作规划 (WBS)',
    nameEn: 'Action Plan & Task Breakdown (WBS)',
    contentZh: '请将上述目标或计划进行工作分解（Work Breakdown Structure）：\n1. 拆解为可立即着手行动的微任务（每个任务预计可在 30~60 分钟内完成）；\n2. 标注任务的前置依赖条件；\n3. 采用 Obsidian 兼容的任务列表格式 `- [ ]` 输出。',
    contentEn: 'Please break down the goal above into an actionable Work Breakdown Structure (WBS):\n1. Decompose into concrete micro-tasks (executable within 30-60 minutes each);\n2. Highlight dependencies between tasks;\n3. Output in standard Obsidian Markdown task checkbox format (`- [ ]`).',
  },
]
