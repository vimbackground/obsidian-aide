import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import { App } from 'obsidian'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { editorStateToPlainText } from '../components/chat-view/chat-input/utils/editor-state-to-plain-text'
import { useApp } from '../contexts/app-context'
import { ChatConversationMetadata } from '../database/json/chat/types'
import { ChatMessage, SerializedChatMessage } from '../types/chat'
import { Mentionable } from '../types/mentionable'
import {
  deserializeMentionable,
  serializeMentionable,
} from '../utils/chat/mentionable'

import { useChatManager } from './useJsonManagers'

export type ChatMetadataWithArticle = ChatConversationMetadata & {
  articlePath?: string
}

type UseChatHistory = {
  createOrUpdateConversation: (
    id: string,
    messages: ChatMessage[],
    articlePath?: string,
  ) => Promise<void> | undefined
  deleteConversation: (id: string) => Promise<void>
  getChatMessagesById: (id: string) => Promise<ChatMessage[] | null>
  updateConversationTitle: (id: string, title: string) => Promise<void>
  chatList: ChatMetadataWithArticle[]
  getChatsForArticle: (articlePath: string) => Promise<ChatMetadataWithArticle[]>
}

export function useChatHistory(): UseChatHistory {
  const app = useApp()
  const chatManager = useChatManager()
  const [chatList, setChatList] = useState<ChatMetadataWithArticle[]>([])
  const articleCacheRef = useRef<Map<string, string>>(new Map()) // id -> articlePath

  const fetchChatList = useCallback(async () => {
    const list = await chatManager.listChats()
    // Enrich with cached article paths
    const enrichedList: ChatMetadataWithArticle[] = list.map((item) => ({
      ...item,
      articlePath: articleCacheRef.current.get(item.id),
    }))
    setChatList(enrichedList)
  }, [chatManager])

  useEffect(() => {
    void fetchChatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const extractArticlePathFromMessages = (
    messages: ChatMessage[],
    fallbackPath?: string,
  ): string | undefined => {
    if (fallbackPath) return fallbackPath
    for (const msg of messages) {
      if (msg.role === 'user' && msg.mentionables) {
        for (const m of msg.mentionables) {
          if (
            (m.type === 'current-file' || m.type === 'file') &&
            'file' in m &&
            m.file
          ) {
            return m.file.path
          }
        }
      }
    }
    return undefined
  }

  const createOrUpdateConversation = useMemo(
    () =>
      debounce(
        async (
          id: string,
          messages: ChatMessage[],
          articlePath?: string,
        ): Promise<void> => {
          if (messages.length === 0) return

          const serializedMessages = messages.map(serializeChatMessage)
          const targetArticlePath = extractArticlePathFromMessages(
            messages,
            articlePath,
          )

          if (targetArticlePath) {
            articleCacheRef.current.set(id, targetArticlePath)
          }

          // Auto generate meaningful title from first user query
          const firstUserMessage = messages.find((v) => v.role === 'user')
          let generatedTitle = '新对话'
          if (firstUserMessage?.content) {
            const plain = editorStateToPlainText(firstUserMessage.content).trim()
            if (plain.length > 0) {
              generatedTitle = plain.substring(0, 30).replace(/[\r\n\t]+/g, ' ')
            }
          } else if (targetArticlePath) {
            const baseName =
              targetArticlePath.split('/').pop()?.replace(/\.md$/, '') ||
              targetArticlePath
            generatedTitle = `关于《${baseName}》`
          }

          const existingConversation = await chatManager.findById(id)

          if (existingConversation) {
            const shouldUpdateTitle =
              (!existingConversation.title ||
                existingConversation.title === 'New chat' ||
                existingConversation.title === '新对话') &&
              generatedTitle !== '新对话'

            if (
              isEqual(existingConversation.messages, serializedMessages) &&
              !shouldUpdateTitle
            ) {
              return
            }

            await chatManager.updateChat(existingConversation.id, {
              messages: serializedMessages,
              title: shouldUpdateTitle
                ? generatedTitle
                : existingConversation.title,
              articlePath: targetArticlePath || existingConversation.articlePath,
            })
          } else {
            await chatManager.createChat({
              id,
              title: generatedTitle,
              messages: serializedMessages,
              articlePath: targetArticlePath,
            })
          }

          await fetchChatList()
        },
        300,
        {
          maxWait: 1000,
        },
      ),
    [chatManager, fetchChatList],
  )

  const deleteConversation = useCallback(
    async (id: string): Promise<void> => {
      articleCacheRef.current.delete(id)
      await chatManager.deleteChat(id)
      await fetchChatList()
    },
    [chatManager, fetchChatList],
  )

  const getChatMessagesById = useCallback(
    async (id: string): Promise<ChatMessage[] | null> => {
      const conversation = await chatManager.findById(id)
      if (!conversation) {
        return null
      }
      if (conversation.articlePath) {
        articleCacheRef.current.set(id, conversation.articlePath)
      }
      return conversation.messages.map((message) =>
        deserializeChatMessage(message, app),
      )
    },
    [chatManager, app],
  )

  const updateConversationTitle = useCallback(
    async (id: string, title: string): Promise<void> => {
      if (title.length === 0) {
        throw new Error('Chat title cannot be empty')
      }
      const conversation = await chatManager.findById(id)
      if (!conversation) {
        throw new Error('Conversation not found')
      }
      await chatManager.updateChat(conversation.id, {
        title,
      })
      await fetchChatList()
    },
    [chatManager, fetchChatList],
  )

  const getChatsForArticle = useCallback(
    async (articlePath: string): Promise<ChatMetadataWithArticle[]> => {
      if (!articlePath) return []
      const all = await chatManager.listChats()
      const matching: ChatMetadataWithArticle[] = []

      for (const meta of all) {
        let cachedPath = articleCacheRef.current.get(meta.id)
        if (!cachedPath) {
          const detail = await chatManager.findById(meta.id)
          if (detail?.articlePath) {
            cachedPath = detail.articlePath
            articleCacheRef.current.set(meta.id, cachedPath)
          } else if (detail?.messages) {
            cachedPath = extractArticlePathFromMessages(
              detail.messages.map((m) => deserializeChatMessage(m, app)),
            )
            if (cachedPath) {
              articleCacheRef.current.set(meta.id, cachedPath)
            }
          }
        }
        if (cachedPath === articlePath) {
          matching.push({ ...meta, articlePath: cachedPath })
        }
      }

      return matching.sort((a, b) => b.updatedAt - a.updatedAt)
    },
    [chatManager, app],
  )

  return {
    createOrUpdateConversation,
    deleteConversation,
    getChatMessagesById,
    updateConversationTitle,
    chatList,
    getChatsForArticle,
  }
}

const serializeChatMessage = (message: ChatMessage): SerializedChatMessage => {
  switch (message.role) {
    case 'user':
      return {
        role: 'user',
        content: message.content,
        promptContent: message.promptContent,
        id: message.id,
        mentionables: message.mentionables.map(serializeMentionable),
        similaritySearchResults: message.similaritySearchResults,
      }
    case 'assistant':
      return {
        role: 'assistant',
        content: message.content,
        reasoning: message.reasoning,
        annotations: message.annotations,
        toolCallRequests: message.toolCallRequests,
        id: message.id,
        metadata: message.metadata,
        providerMetadata: message.providerMetadata,
      }
    case 'tool':
      return {
        role: 'tool',
        toolCalls: message.toolCalls,
        id: message.id,
      }
  }
}

const deserializeChatMessage = (
  message: SerializedChatMessage,
  app: App,
): ChatMessage => {
  switch (message.role) {
    case 'user':
      return {
        role: 'user',
        content: message.content,
        promptContent: message.promptContent,
        id: message.id,
        mentionables: message.mentionables
          .map((m) => deserializeMentionable(m, app))
          .filter((v): v is Mentionable => v !== null),
        similaritySearchResults: message.similaritySearchResults,
      }
    case 'assistant':
      return {
        role: 'assistant',
        content: message.content,
        reasoning: message.reasoning,
        annotations: message.annotations,
        toolCallRequests: message.toolCallRequests,
        id: message.id,
        metadata: message.metadata,
        providerMetadata: message.providerMetadata,
      }
    case 'tool':
      return {
        role: 'tool',
        toolCalls: message.toolCalls,
        id: message.id,
      }
  }
}
