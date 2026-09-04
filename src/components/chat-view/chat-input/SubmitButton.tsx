import { CornerDownLeftIcon } from 'lucide-react'

import { useI18n } from '../../../utils/i18n'

export function SubmitButton({ onClick }: { onClick: () => void }) {
  const { language } = useI18n()
  return (
    <div
      className="aide-chat-user-input-submit-button"
      onClick={onClick}
      title={language === 'zh' ? '针对当前打开的文章进行问答 (Enter)' : 'Chat about current article (Enter)'}
    >
      <div className="aide-chat-user-input-submit-button-icons">
        <CornerDownLeftIcon size={14} />
      </div>
      <div>{language === 'zh' ? '文章对话' : 'Article Chat'}</div>
    </div>
  )
}
