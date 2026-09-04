import { ChatModel } from './types/chat-model.types'
import { EmbeddingModel } from './types/embedding-model.types'
import { LLMProvider, LLMProviderType } from './types/provider.types'

export const CHAT_VIEW_TYPE = 'aide-chat-view'
export const APPLY_VIEW_TYPE = 'aide-apply-view'

export const PGLITE_DB_PATH = '.aider/vector_db.tar.gz'

export const CODEX_CLIENT_ID = 'app_EMoamEEZ73f0CkXaXp7hrann'
export const CODEX_ISSUER = 'https://auth.openai.com'
export const CODEX_REDIRECT_PORT = 1455 // Other ports are blocked by OpenAI
export const CODEX_REDIRECT_URI = `http://localhost:${CODEX_REDIRECT_PORT}/auth/callback`
export const CODEX_AUTH_CLAIMS_URL = 'https://api.openai.com/auth'
export const CODEX_RESPONSES_ENDPOINT =
  'https://chatgpt.com/backend-api/codex/responses'

export const CLAUDE_CODE_CLIENT_ID = '9d1c250a-e61b-44d9-88ed-5944d1962f5e'
export const CLAUDE_CODE_AUTHORIZE_BASE_URL = 'https://claude.ai'
export const CLAUDE_CODE_CONSOLE_BASE_URL = 'https://console.anthropic.com'
export const CLAUDE_CODE_OAUTH_TOKEN_ENDPOINT =
  'https://console.anthropic.com/v1/oauth/token'
export const CLAUDE_CODE_REDIRECT_URI =
  'https://console.anthropic.com/oauth/code/callback'
export const CLAUDE_CODE_MESSAGES_ENDPOINT =
  'https://api.anthropic.com/v1/messages'
export const CLAUDE_CODE_DEFAULT_BETAS = [
  'oauth-2025-04-20',
  'interleaved-thinking-2025-05-14',
  'claude-code-20250219',
]
export const CLAUDE_CODE_SYSTEM_MESSAGE =
  "You are Claude Code, Anthropic's official CLI for Claude."
export const CLAUDE_CODE_USER_AGENT = 'claude-cli/2.1.2 (external, cli)'

// Keep in sync with opencode-gemini-auth constants.
export const GEMINI_OAUTH_CLIENT_ID =
  '681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com'
export const GEMINI_OAUTH_CLIENT_SECRET = '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'
export const GEMINI_OAUTH_REDIRECT_URI = 'http://localhost:8085/oauth2callback'
export const GEMINI_OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
] as const
export const GEMINI_CODE_ASSIST_ENDPOINT = 'https://cloudcode-pa.googleapis.com'
export const GEMINI_CODE_ASSIST_HEADERS = {
  'User-Agent': 'google-api-nodejs-client/9.15.1',
  'X-Goog-Api-Client': 'gl-node/22.17.0',
  'Client-Metadata':
    'ideType=IDE_UNSPECIFIED,platform=PLATFORM_UNSPECIFIED,pluginType=GEMINI',
} as const

// Default model ids
export const DEFAULT_CHAT_MODEL_ID = 'deepseek-ai/DeepSeek-V4-Flash'
export const DEFAULT_APPLY_MODEL_ID = ''

// Recommended model ids
export const RECOMMENDED_MODELS_FOR_CHAT = [
  'deepseek-ai/DeepSeek-V4-Flash',
  'claude-sonnet-4.5',
  'gpt-5.2',
]
export const RECOMMENDED_MODELS_FOR_APPLY = ['gpt-4.1-mini']
export const RECOMMENDED_MODELS_FOR_EMBEDDING = [
  'openai/text-embedding-3-small',
]

export const PLAN_PROVIDER_TYPES: readonly LLMProviderType[] = [
  'anthropic-plan',
  'openai-plan',
  'gemini-plan',
] as const
export const PROVIDER_TYPES_INFO = {
  'anthropic-plan': {
    label: 'Claude Plan',
    defaultProviderId: 'anthropic-plan',
    requireApiKey: false,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  'openai-plan': {
    label: 'OpenAI Plan',
    defaultProviderId: 'openai-plan',
    requireApiKey: false,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  'gemini-plan': {
    label: 'Gemini Plan',
    defaultProviderId: 'gemini-plan',
    requireApiKey: false,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  anthropic: {
    label: 'Anthropic',
    defaultProviderId: 'anthropic',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  openai: {
    label: 'OpenAI',
    defaultProviderId: 'openai',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  gemini: {
    label: 'Gemini',
    defaultProviderId: 'gemini',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  xai: {
    label: 'xAI',
    defaultProviderId: 'xai',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  deepseek: {
    label: 'DeepSeek',
    defaultProviderId: 'deepseek',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  siliconflow: {
    label: 'SiliconFlow (硅基流动)',
    defaultProviderId: 'siliconflow',
    requireApiKey: true,
    requireBaseUrl: true,
    supportEmbedding: true,
    additionalSettings: [],
  },
  mistral: {
    label: 'Mistral',
    defaultProviderId: 'mistral',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  perplexity: {
    label: 'Perplexity',
    defaultProviderId: 'perplexity',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  openrouter: {
    label: 'OpenRouter',
    defaultProviderId: 'openrouter',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  groq: {
    label: 'Groq',
    defaultProviderId: 'groq',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: false,
    additionalSettings: [],
  },
  modelscope: {
    label: 'ModelScope (魔搭社区)',
    defaultProviderId: 'modelscope',
    requireApiKey: true,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  ollama: {
    label: 'Ollama',
    defaultProviderId: 'ollama',
    requireApiKey: false,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  'lm-studio': {
    label: 'LM Studio',
    defaultProviderId: 'lm-studio',
    requireApiKey: false,
    requireBaseUrl: false,
    supportEmbedding: true,
    additionalSettings: [],
  },
  'azure-openai': {
    label: 'Azure OpenAI',
    defaultProviderId: null, // no default provider for this type
    requireApiKey: true,
    requireBaseUrl: true,
    supportEmbedding: false,
    additionalSettings: [
      {
        label: 'Deployment',
        key: 'deployment',
        placeholder: 'Enter your deployment name',
        type: 'text',
        required: true,
      },
      {
        label: 'API Version',
        key: 'apiVersion',
        placeholder: 'Enter your API version',
        type: 'text',
        required: true,
      },
    ],
  },
  'openai-compatible': {
    label: 'OpenAI Compatible',
    defaultProviderId: null, // no default provider for this type
    requireApiKey: false,
    requireBaseUrl: true,
    supportEmbedding: true,
    additionalSettings: [
      {
        label: 'No Stainless Headers',
        key: 'noStainless',
        type: 'toggle',
        required: false,
        description:
          'Enable this if you encounter CORS errors related to Stainless headers (x-stainless-os, etc.)',
      },
    ],
  },
} as const satisfies Record<
  LLMProviderType,
  {
    label: string
    defaultProviderId: string | null
    requireApiKey: boolean
    requireBaseUrl: boolean
    supportEmbedding: boolean
    additionalSettings: {
      label: string
      key: string
      type: 'text' | 'toggle'
      placeholder?: string
      description?: string
      required?: boolean
    }[]
  }
>

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
    id: 'deepseek-ai/DeepSeek-V4-Flash',
    model: 'deepseek-ai/DeepSeek-V4-Flash',
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
