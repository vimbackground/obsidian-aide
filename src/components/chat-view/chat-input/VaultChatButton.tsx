import * as Tooltip from '@radix-ui/react-tooltip'
import {
  ArrowBigUp,
  ChevronUp,
  Command,
  CornerDownLeftIcon,
} from 'lucide-react'
import { Platform } from 'obsidian'

import { useI18n } from '../../../utils/i18n'

export function VaultChatButton({ onClick }: { onClick: () => void }) {
  const { language } = useI18n()
  return (
    <>
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div
              className="aide-chat-user-input-submit-button"
              onClick={onClick}
            >
              <div className="aide-chat-user-input-submit-button-icons">
                {Platform.isMacOS ? (
                  <Command size={12} />
                ) : (
                  <ChevronUp size={14} />
                )}
                <ArrowBigUp size={14} />
                <CornerDownLeftIcon size={14} />
              </div>
              <div>{language === 'zh' ? '全知识库对话' : 'Vault Chat'}</div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="aide-tooltip-content" sideOffset={5}>
              {language === 'zh'
                ? '结合整个知识库的笔记向量索引进行深度问答 (Shift + Enter 或快捷键)'
                : 'Chat with entire vault knowledge base'}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  )
}
