import { Edit2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useSettings } from '../../contexts/settings-context'
import { ChatUserMessage } from '../../types/chat'
import { Mentionable } from '../../types/mentionable'
import {
  getMentionableKey,
  serializeMentionable,
} from '../../utils/chat/mentionable'

import { editorStateToPlainText } from './chat-input/utils/editor-state-to-plain-text'
import MentionableBadge from './chat-input/MentionableBadge'
import SimilaritySearchResults from './SimilaritySearchResults'

export type UserMessageItemProps = {
  message: ChatUserMessage
  chatUserInputRef?: (ref: any) => void
  onInputChange?: (content: any) => void
  onSubmit?: (content: any, useVaultSearch: boolean) => void
  onFocus?: () => void
  onMentionablesChange?: (mentionables: Mentionable[]) => void
  onEditAndResubmit?: (messageId: string, newText: string) => void
}

export default function UserMessageItem({
  message,
  onEditAndResubmit,
}: UserMessageItemProps) {
  const { settings } = useSettings()
  const language = settings.language ?? 'en'

  const textContent = useMemo(() => {
    if (!message.content) return ''
    return editorStateToPlainText(message.content)
  }, [message.content])

  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(textContent)

  const userMentionables = useMemo(() => {
    return (message.mentionables || []).filter((m) => m.type !== 'current-file')
  }, [message.mentionables])

  const handleStartEdit = () => {
    setDraftText(textContent)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setDraftText(textContent)
  }

  const handleSaveAndResubmit = () => {
    const trimmed = draftText.trim()
    if (!trimmed) return
    setIsEditing(false)
    onEditAndResubmit?.(message.id, trimmed)
  }

  return (
    <div className="aide-chat-messages-user">
      {userMentionables.length > 0 && (
        <div
          className="aide-chat-user-input-files"
          style={{ paddingBottom: 0, justifyContent: 'flex-end' }}
        >
          {userMentionables.map((m) => (
            <MentionableBadge
              key={getMentionableKey(serializeMentionable(m))}
              mentionable={m}
              readOnly
            />
          ))}
        </div>
      )}

      {isEditing ? (
        <div className="aide-user-message-edit-box">
          <textarea
            className="aide-user-message-edit-textarea"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={Math.min(8, Math.max(2, draftText.split('\n').length))}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                handleSaveAndResubmit()
              } else if (e.key === 'Escape') {
                e.preventDefault()
                handleCancelEdit()
              }
            }}
          />
          <div className="aide-user-message-edit-actions">
            <button
              type="button"
              className="aide-user-edit-btn aide-user-edit-cancel"
              onClick={handleCancelEdit}
            >
              {language === 'zh' ? '取消' : 'Cancel'}
            </button>
            <button
              type="button"
              className="aide-user-edit-btn aide-user-edit-save"
              onClick={handleSaveAndResubmit}
              disabled={!draftText.trim()}
            >
              {language === 'zh' ? '保存并重新生成' : 'Save & Submit'}
            </button>
          </div>
        </div>
      ) : (
        <div className="aide-user-message-bubble-wrapper">
          {onEditAndResubmit && (
            <button
              type="button"
              className="clickable-icon aide-user-message-edit-trigger"
              onClick={handleStartEdit}
              title={language === 'zh' ? '编辑提示词' : 'Edit prompt'}
              aria-label={language === 'zh' ? '编辑提示词' : 'Edit prompt'}
            >
              <Edit2 size={12} />
            </button>
          )}
          <div
            className="aide-user-message-bubble"
            onDoubleClick={onEditAndResubmit ? handleStartEdit : undefined}
            title={
              onEditAndResubmit
                ? language === 'zh'
                  ? '双击可直接编辑提示词'
                  : 'Double-click to edit prompt'
                : undefined
            }
          >
            {textContent || (language === 'zh' ? '(无文本内容)' : '(No content)')}
          </div>
        </div>
      )}

      {message.similaritySearchResults && (
        <SimilaritySearchResults
          similaritySearchResults={message.similaritySearchResults}
        />
      )}
    </div>
  )
}
