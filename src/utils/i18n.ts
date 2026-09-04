import { useSettings } from '../contexts/settings-context'

export const translations: Record<'en' | 'zh', Record<string, string>> = {
  en: {
    // General
    'common.add': 'Add',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.reset': 'Reset',
    'common.actions': 'Actions',
    'common.enable': 'Enable',
    'common.id': 'ID',
    'common.type': 'Type',
    'common.model': 'Model',
    'common.providerId': 'Provider',
    'common.apiKey': 'API Key',
    'common.setApiKey': 'Set API Key',
    'common.notSelected': '(Not selected)',
    'common.selectModel': 'Select model...',

    // Settings Header & Sections
    'settings.title': 'Aide Settings',
    'settings.chat': 'Chat Settings',
    'settings.chatModel': 'Chat Model',
    'settings.chatModelDesc': 'Choose the default model used for intelligence and conversation.',
    'settings.systemPrompt': 'Global System Prompt',
    'settings.systemPromptDesc': 'This prompt will be automatically prepended to every conversation.',
    'settings.includeCurrentFile': 'Include Active Note',
    'settings.includeCurrentFileDesc': 'Automatically include the active note content as conversation context.',
    'settings.enableTools': 'Enable Tools',
    'settings.enableToolsDesc': 'Allow AI to invoke built-in native tools and connected external MCP extensions.',
    'settings.maxAutoIterations': 'Max Tool Steps',
    'settings.maxAutoIterationsDesc': 'Maximum number of consecutive tool executions without manual confirmation.',

    // Providers
    'settings.providers': 'Model Providers',
    'settings.providersDesc': 'Configure API keys and endpoints for AI platforms.',
    'settings.addCustomProvider': 'Add Custom Provider',
    'settings.howToGetApiKey': 'How to obtain API keys',

    // Models
    'settings.models': 'Model Management',
    'settings.chatModels': 'Chat Models',
    'settings.chatModelsDesc': 'Models used for conversation and question-answering.',
    'settings.addCustomModel': 'Add Custom Model',
    'settings.embeddingModels': 'Embedding Models',
    'settings.embeddingModelsDesc': 'Models used for vault vector indexing and semantic retrieval.',
    'settings.dimension': 'Dimension',

    // RAG
    'settings.rag': 'Vault Knowledge Base',
    'settings.ragDesc': 'Configure semantic vector retrieval over your Obsidian vault notes.',
    'settings.backgroundIndexing': 'Background Silent Indexing',
    'settings.backgroundIndexingDesc': 'When enabled, vault changes will be indexed silently in the background. When disabled, index updates only run on-demand before queries.',
    'settings.embeddingModel': 'Active Embedding Model',
    'settings.embeddingModelDesc': 'Choose the model used to embed your notes.',
    'settings.rebuildIndex': 'Rebuild Entire Index',
    'settings.rebuildIndexBtn': 'Rebuild Index',

    // MCP
    'settings.mcp': 'Tool Extensions Ecosystem',
    'settings.mcpDesc': 'Extend AI capabilities with built-in native tools and external MCP servers.',

    // Etc
    'settings.etc': 'Other Settings',
    'settings.language': 'Interface Language',
    'settings.languageDesc': 'Choose the display language for the plugin interface.',
    'settings.resetSettings': 'Reset All Settings',
    'settings.resetSettingsDesc': 'Reset all settings back to default values.',
  },
  zh: {
    // 通用
    'common.add': '添加',
    'common.cancel': '取消',
    'common.save': '保存',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.reset': '重置',
    'common.actions': '操作',
    'common.enable': '启用',
    'common.id': '标识',
    'common.type': '类型',
    'common.model': '模型名称',
    'common.providerId': '服务商',
    'common.apiKey': 'API 密钥',
    'common.setApiKey': '设置密钥',
    'common.notSelected': '(未选择)',
    'common.selectModel': '选择模型...',

    // 设置主栏目
    'settings.title': 'Aide 设置',
    'settings.chat': '对话设置',
    'settings.chatModel': '对话模型',
    'settings.chatModelDesc': '选择默认用于智能问答与对话的模型。',
    'settings.systemPrompt': '全局系统提示词',
    'settings.systemPromptDesc': '该提示词将自动附加在每次对话的开头。',
    'settings.includeCurrentFile': '自动附加当前笔记',
    'settings.includeCurrentFileDesc': '在对话时自动将当前激活笔记的内容作为参考上下文。',
    'settings.enableTools': '启用扩展工具',
    'settings.enableToolsDesc': '允许 AI 在回答时调用内置原生工具或外部扩展工具。',
    'settings.maxAutoIterations': '最大工具调用轮次',
    'settings.maxAutoIterationsDesc': '无需手动确认即可连续执行工具的最大步数。',

    // 服务商
    'settings.providers': '模型服务商',
    'settings.providersDesc': '配置各个 AI 平台的 API 密钥与连接端点。',
    'settings.addCustomProvider': '添加自定义服务商',
    'settings.howToGetApiKey': '如何获取 API 密钥',

    // 模型
    'settings.models': '模型管理',
    'settings.chatModels': '对话模型',
    'settings.chatModelsDesc': '用于对话问答与内容创作的模型，支持随时增删管理。',
    'settings.addCustomModel': '添加自定义模型',
    'settings.embeddingModels': '嵌入模型',
    'settings.embeddingModelsDesc': '用于笔记向量化索引和智能语义检索的专用模型。',
    'settings.dimension': '向量维度',

    // RAG 知识库
    'settings.rag': '知识库检索',
    'settings.ragDesc': '配置基于本地笔记的轻量级向量化检索功能。',
    'settings.backgroundIndexing': '后台静默索引',
    'settings.backgroundIndexingDesc': '开启后：笔记修改时后台自动静默更新；关闭后：仅在提问需要时按需更新。',
    'settings.embeddingModel': '当前使用的嵌入模型',
    'settings.embeddingModelDesc': '用于知识库向量计算的模型。',
    'settings.rebuildIndex': '重建整个知识库索引',
    'settings.rebuildIndexBtn': '全量重建索引',

    // MCP
    'settings.mcp': '工具扩展生态',
    'settings.mcpDesc': '通过内置原生工具和标准协议接入联网搜索、天气、抓取等实用能力。',

    // 其他
    'settings.etc': '其他设置',
    'settings.language': '界面语言',
    'settings.languageDesc': '选择插件界面的显示语言。',
    'settings.resetSettings': '重置所有设置',
    'settings.resetSettingsDesc': '将插件所有设置项恢复为初始默认状态。',
  },
}

export type Language = 'en' | 'zh' | 'zh-CN' | 'auto'

export function getLanguage(settingsLanguage: string = 'zh'): 'en' | 'zh' {
  if (settingsLanguage === 'auto') {
    const navLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'zh'
    if (navLang.startsWith('zh')) return 'zh'
    return 'en'
  }
  if (settingsLanguage === 'zh' || settingsLanguage === 'zh-CN') {
    return 'zh'
  }
  return 'en'
}

export function translate(key: string, language: string = 'zh', defaultText?: string): string {
  const lang = getLanguage(language)
  return translations[lang]?.[key] ?? translations['en']?.[key] ?? defaultText ?? key
}

export function useI18n() {
  const { settings } = useSettings()
  const lang = getLanguage(settings?.language ?? 'zh')

  const t = (key: string, defaultText?: string): string => {
    return translations[lang]?.[key] ?? translations['en']?.[key] ?? defaultText ?? key
  }

  return { t, language: lang }
}
