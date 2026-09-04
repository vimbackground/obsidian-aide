import { ChevronDown, ChevronUp } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'

import DotLoader from '../common/DotLoader'
import { useSettings } from '../../contexts/settings-context'

import { ObsidianMarkdown } from './ObsidianMarkdown'

const AssistantMessageReasoning = memo(function AssistantMessageReasoning({
  reasoning,
}: {
  reasoning: string
}) {
  const { settings } = useSettings()
  const language = settings.language ?? 'zh'
  const isZh = language === 'zh' || language === 'zh-CN'
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const previousReasoning = useRef(reasoning)
  const hasUserInteracted = useRef(false)

  useEffect(() => {
    if (
      previousReasoning.current !== reasoning &&
      previousReasoning.current !== ''
    ) {
      setShowLoader(true)
      if (!hasUserInteracted.current) {
        setIsExpanded(true)
      }
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
    previousReasoning.current = reasoning
  }, [reasoning])

  const handleToggle = () => {
    hasUserInteracted.current = true
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="aide-assistant-message-metadata">
      <div
        className="aide-assistant-message-metadata-toggle"
        onClick={handleToggle}
      >
        <span>{isZh ? '深度思考' : 'Reasoning'} {showLoader && <DotLoader />}</span>
        {isExpanded ? (
          <ChevronUp className="aide-assistant-message-metadata-toggle-icon" />
        ) : (
          <ChevronDown className="aide-assistant-message-metadata-toggle-icon" />
        )}
      </div>
      {isExpanded && (
        <div className="aide-assistant-message-metadata-content">
          <ObsidianMarkdown content={reasoning} scale="xs" />
        </div>
      )}
    </div>
  )
})

export default AssistantMessageReasoning
