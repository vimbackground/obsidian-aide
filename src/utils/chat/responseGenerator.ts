import { v4 as uuidv4 } from 'uuid'

import { BaseLLMProvider } from '../../core/llm/base'
import { McpManager } from '../../core/mcp/mcpManager'
import {
  ChatAssistantMessage,
  ChatMessage,
  ChatToolMessage,
} from '../../types/chat'
import { ChatModel } from '../../types/chat-model.types'
import { RequestMessage, RequestTool } from '../../types/llm/request'
import {
  Annotation,
  LLMResponseStreaming,
  ToolCallDelta,
} from '../../types/llm/response'
import { LLMProvider } from '../../types/provider.types'
import {
  ToolCallRequest,
  ToolCallResponseStatus,
} from '../../types/tool-call.types'

import { fetchAnnotationTitles } from './fetch-annotation-titles'
import { PromptGenerator } from './promptGenerator'
import {
  extractTextToolCalls,
  normalizeToolName,
  sanitizeAssistantContent,
} from './textToolExtractor'

export type ResponseGeneratorParams = {
  providerClient: BaseLLMProvider<LLMProvider>
  model: ChatModel
  messages: ChatMessage[]
  conversationId: string
  enableTools: boolean
  maxAutoIterations: number
  runtimeProfile?: 'eco' | 'pro'
  promptGenerator: PromptGenerator
  mcpManager: McpManager
  abortSignal?: AbortSignal
}

export class ResponseGenerator {
  private readonly providerClient: BaseLLMProvider<LLMProvider>
  private readonly model: ChatModel
  private readonly conversationId: string
  private readonly enableTools: boolean
  private readonly promptGenerator: PromptGenerator
  private readonly mcpManager: McpManager
  private readonly abortSignal?: AbortSignal
  private readonly receivedMessages: ChatMessage[]
  private readonly maxAutoIterations: number
  private readonly runtimeProfile: 'eco' | 'pro'

  private responseMessages: ChatMessage[] = [] // Response messages that are generated after the initial messages
  private subscribers: ((messages: ChatMessage[]) => void)[] = []

  constructor(params: ResponseGeneratorParams) {
    this.providerClient = params.providerClient
    this.model = params.model
    this.conversationId = params.conversationId
    this.enableTools = params.enableTools
    this.runtimeProfile = params.runtimeProfile ?? 'eco'
    this.maxAutoIterations = Math.max(1, params.maxAutoIterations) // Ensure maxAutoIterations is at least 1
    this.receivedMessages = params.messages
    this.promptGenerator = params.promptGenerator
    this.mcpManager = params.mcpManager
    this.abortSignal = params.abortSignal
  }

  public subscribe(callback: (messages: ChatMessage[]) => void) {
    this.subscribers.push(callback)

    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback)
    }
  }

  public async run() {
    const isEco = this.runtimeProfile === 'eco'
    // eco 模式下严格限制最多 2 轮（第 1 轮调用工具，第 2 轮强制收尾总结）
    const effectiveMaxIterations = isEco
      ? Math.min(2, this.maxAutoIterations)
      : this.maxAutoIterations

    for (let i = 0; i < effectiveMaxIterations; i++) {
      // 当达到最后一轮时，禁止再发起工具调用，强行迫使模型结合已有上下文输出最终 Markdown 解答
      const isFinalIteration = i === effectiveMaxIterations - 1
      const allowTools = !isFinalIteration

      const { toolCallRequests } = await this.streamSingleResponse(allowTools)
      if (toolCallRequests.length === 0) {
        return
      }

      const toolMessage: ChatToolMessage = {
        role: 'tool' as const,
        id: uuidv4(),
        toolCalls: toolCallRequests.map((toolCall) => ({
          request: toolCall,
          response: {
            status: this.mcpManager.isToolExecutionAllowed({
              requestToolName: toolCall.name,
              conversationId: this.conversationId,
            })
              ? ToolCallResponseStatus.Running
              : ToolCallResponseStatus.PendingApproval,
          },
        })),
      }

      this.updateResponseMessages((messages) => [...messages, toolMessage])

      await Promise.all(
        toolMessage.toolCalls
          .filter(
            (toolCall) =>
              toolCall.response.status === ToolCallResponseStatus.Running,
          )
          .map(async (toolCall) => {
            const response = await this.mcpManager.callTool({
              name: toolCall.request.name,
              args: toolCall.request.arguments,
              id: toolCall.request.id,
              signal: this.abortSignal,
            })
            this.updateResponseMessages((messages) =>
              messages.map((message) =>
                message.id === toolMessage.id && message.role === 'tool'
                  ? {
                      ...message,
                      toolCalls: message.toolCalls?.map((tc) =>
                        tc.request.id === toolCall.request.id
                          ? {
                              ...tc,
                              response,
                            }
                          : tc,
                      ),
                    }
                  : message,
              ),
            )
          }),
      )

      const updatedToolMessage = this.responseMessages.find(
        (message) => message.id === toolMessage.id && message.role === 'tool',
      ) as ChatToolMessage | undefined
      if (
        !updatedToolMessage?.toolCalls?.every((toolCall) =>
          [
            ToolCallResponseStatus.Success,
            ToolCallResponseStatus.Error,
          ].includes(toolCall.response.status),
        )
      ) {
        // Exit the auto-iteration loop if any tool call hasn't completed
        // Only 'success' or 'error' states are considered complete
        return
      }
    }
  }

  private async streamSingleResponse(allowTools = true): Promise<{
    toolCallRequests: ToolCallRequest[]
  }> {
    const requestMessages = await this.promptGenerator.generateRequestMessages({
      messages: [...this.receivedMessages, ...this.responseMessages],
    })

    // 收官轮次强制注入终局作答指令，给模型明确的下台阶与收敛目标
    if (!allowTools) {
      requestMessages.push({
        role: 'user',
        content:
          '【系统指令】：网络检索阶段已全部结束。请根据目前已掌握的全部事实与已知背景，立即向用户输出正式、详尽、结构清晰的中文对比分析总结。若部分特定统计数据在公开渠道未直接披露，请如实说明并基于已有行业公认数据给出客观分析。严禁再输出任何搜索指令、代码块或工具调用语法（如 <tool_call>、<|DSML|> 等）。',
      })
    }

    const availableTools =
      this.enableTools && allowTools
        ? await this.mcpManager.listAvailableTools()
        : []

    // Set tools to undefined when no tools are available since some providers
    // reject empty tools arrays.
    const tools: RequestTool[] | undefined =
      availableTools.length > 0
        ? availableTools.map((tool) => ({
            type: 'function',
            function: {
              name: tool.name,
              description: tool.description,
              parameters: {
                ...tool.inputSchema,
                properties: tool.inputSchema.properties ?? {},
              },
            },
          }))
        : undefined

    const stream = await this.providerClient.streamResponse(
      this.model,
      {
        model: this.model.model,
        messages: requestMessages,
        tools,
        stream: true,
      },
      {
        signal: this.abortSignal,
      },
    )

    // Create a new assistant message for the response if it doesn't exist
    if (this.responseMessages.at(-1)?.role !== 'assistant') {
      this.responseMessages.push({
        role: 'assistant',
        content: '',
        id: uuidv4(),
        metadata: {
          model: this.model,
        },
      })
    }
    const lastMessage = this.responseMessages.at(-1)
    if (lastMessage?.role !== 'assistant') {
      throw new Error('Last message is not an assistant message')
    }
    const responseMessageId = lastMessage.id
    let responseToolCalls: Record<number, ToolCallDelta> = {}
    for await (const chunk of stream) {
      const { updatedToolCalls } = this.processChunk(
        chunk,
        responseMessageId,
        responseToolCalls,
      )
      responseToolCalls = updatedToolCalls
    }
    let toolCallRequests: ToolCallRequest[] = Object.values(responseToolCalls)
      .map((toolCall) => {
        // filter out invalid tool calls without a name
        if (!toolCall.function?.name) {
          return null
        }
        return {
          id: toolCall.id ?? uuidv4(),
          name: normalizeToolName(toolCall.function.name),
          arguments: toolCall.function.arguments,
        }
      })
      .filter((toolCall) => toolCall !== null)

    const currentAssistantMessage = this.responseMessages.find(
      (message) =>
        message.id === responseMessageId && message.role === 'assistant',
    ) as ChatAssistantMessage | undefined
    const rawContent = currentAssistantMessage?.content ?? ''

    // 1. 如果允许调用工具且标准 API 未识别出 tool_calls，检查模型是否在正文中以文本输出了工具调用（DSML 或 <tool_call>）
    if (allowTools && toolCallRequests.length === 0) {
      const extracted = extractTextToolCalls(rawContent)
      if (extracted.toolCalls.length > 0) {
        toolCallRequests = extracted.toolCalls
        this.updateResponseMessages((messages) =>
          messages.map((message) =>
            message.id === responseMessageId && message.role === 'assistant'
              ? {
                  ...message,
                  content: extracted.cleanedContent,
                  toolCallRequests: toolCallRequests,
                }
              : message,
          ),
        )
      }
    }

    // 2. 如果不允许调用工具（收官轮次），净化可能残存的机器语法
    if (!allowTools && toolCallRequests.length === 0) {
      const sanitized = sanitizeAssistantContent(rawContent)
      if (sanitized) {
        this.updateResponseMessages((messages) =>
          messages.map((message) =>
            message.id === responseMessageId && message.role === 'assistant'
              ? {
                  ...message,
                  content: sanitized,
                  toolCallRequests: undefined,
                }
              : message,
          ),
        )
      } else {
        // 模型整轮只输出了标签导致净化后为空，发起一次兜底生成，确保输出实际回答
        await this.generateFallbackSynthesis(responseMessageId, requestMessages)
      }
    } else if (toolCallRequests.length > 0) {
      this.updateResponseMessages((messages) =>
        messages.map((message) =>
          message.id === responseMessageId && message.role === 'assistant'
            ? {
                ...message,
                toolCallRequests: toolCallRequests,
              }
            : message,
        ),
      )
    }

    return {
      toolCallRequests: toolCallRequests,
    }
  }

  private async generateFallbackSynthesis(
    responseMessageId: string,
    requestMessages: RequestMessage[],
  ): Promise<void> {
    const fallbackMessages: RequestMessage[] = [
      ...requestMessages,
      {
        role: 'user',
        content:
          '请基于前文检索到的全部信息与已知背景，直接向用户给出详尽客观的中文对比分析与正式回答。',
      },
    ]

    try {
      const stream = await this.providerClient.streamResponse(
        this.model,
        {
          model: this.model.model,
          messages: fallbackMessages,
          stream: true,
        },
        {
          signal: this.abortSignal,
        },
      )

      for await (const chunk of stream) {
        const deltaContent = chunk.choices[0]?.delta?.content ?? ''
        if (deltaContent) {
          this.updateResponseMessages((messages) =>
            messages.map((message) =>
              message.id === responseMessageId && message.role === 'assistant'
                ? {
                    ...message,
                    content: sanitizeAssistantContent(
                      message.content + deltaContent,
                    ),
                  }
                : message,
            ),
          )
        }
      }
    } catch (error) {
      console.warn('Fallback synthesis failed', error)
    }
  }

  private processChunk(
    chunk: LLMResponseStreaming,
    responseMessageId: string,
    responseToolCalls: Record<number, ToolCallDelta>,
  ): {
    updatedToolCalls: Record<number, ToolCallDelta>
  } {
    const content = chunk.choices[0]?.delta?.content ?? ''
    const reasoning = chunk.choices[0]?.delta?.reasoning
    const toolCalls = chunk.choices[0]?.delta?.tool_calls
    const annotations = chunk.choices[0]?.delta?.annotations

    const updatedToolCalls = toolCalls
      ? this.mergeToolCallDeltas(toolCalls, responseToolCalls)
      : responseToolCalls

    if (annotations) {
      // For annotations with empty titles, fetch the title of the URL and update the chat messages
      fetchAnnotationTitles(annotations, (url, title) => {
        this.updateResponseMessages((messages) =>
          messages.map((message) =>
            message.id === responseMessageId && message.role === 'assistant'
              ? {
                  ...message,
                  annotations: message.annotations?.map((a) =>
                    a.type === 'url_citation' && a.url_citation.url === url
                      ? {
                          ...a,
                          url_citation: {
                            ...a.url_citation,
                            title: title ?? undefined,
                          },
                        }
                      : a,
                  ),
                }
              : message,
          ),
        )
      })
    }

    const providerMetadata = chunk.choices[0]?.delta?.providerMetadata

    this.updateResponseMessages((messages) =>
      messages.map((message) =>
        message.id === responseMessageId && message.role === 'assistant'
          ? {
              ...message,
              content: message.content + content,
              reasoning: reasoning
                ? (message.reasoning ?? '') + reasoning
                : message.reasoning,
              annotations: this.mergeAnnotations(
                message.annotations,
                annotations,
              ),
              metadata: {
                ...message.metadata,
                usage: chunk.usage ?? message.metadata?.usage,
              },
              // Keep the first providerMetadata received (signature is sent once)
              providerMetadata: message.providerMetadata ?? providerMetadata,
            }
          : message,
      ),
    )

    return {
      updatedToolCalls,
    }
  }

  private updateResponseMessages(
    updaterFunction: (messages: ChatMessage[]) => ChatMessage[],
  ) {
    this.responseMessages = updaterFunction(this.responseMessages)
    this.notifySubscribers(this.responseMessages)
  }

  private notifySubscribers(messages: ChatMessage[]) {
    this.subscribers.forEach((callback) => callback(messages))
  }

  private mergeToolCallDeltas(
    toolCalls: ToolCallDelta[],
    existingToolCalls: Record<number, ToolCallDelta>,
  ): Record<number, ToolCallDelta> {
    const merged = { ...existingToolCalls }

    for (const toolCall of toolCalls) {
      const { index } = toolCall

      if (!merged[index]) {
        merged[index] = toolCall
        continue
      }

      const mergedToolCall: ToolCallDelta = {
        index,
        id: merged[index].id ?? toolCall.id,
        type: merged[index].type ?? toolCall.type,
      }

      if (merged[index].function || toolCall.function) {
        const existingArgs = merged[index].function?.arguments
        const newArgs = toolCall.function?.arguments

        mergedToolCall.function = {
          name: merged[index].function?.name ?? toolCall.function?.name,
          arguments:
            existingArgs || newArgs
              ? [existingArgs ?? '', newArgs ?? ''].join('')
              : undefined,
        }
      }

      merged[index] = mergedToolCall
    }

    return merged
  }

  private mergeAnnotations(
    prevAnnotations?: Annotation[],
    newAnnotations?: Annotation[],
  ): Annotation[] | undefined {
    if (!prevAnnotations) return newAnnotations
    if (!newAnnotations) return prevAnnotations

    const mergedAnnotations = [...prevAnnotations]
    for (const newAnnotation of newAnnotations) {
      if (
        !mergedAnnotations.find(
          (annotation) =>
            annotation.url_citation.url === newAnnotation.url_citation.url,
        )
      ) {
        mergedAnnotations.push(newAnnotation)
      }
    }
    return mergedAnnotations
  }
}
