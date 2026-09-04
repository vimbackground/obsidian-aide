import { Edit, Trash2 } from 'lucide-react'
import { App, Notice } from 'obsidian'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { TemplateManager } from '../../../database/json/template/TemplateManager'
import { TemplateMetadata } from '../../../database/json/template/types'
import { ObsidianButton } from '../../common/ObsidianButton'
import { ConfirmModal } from '../../modals/ConfirmModal'
import {
  CreateTemplateModal,
  EditTemplateModal,
} from '../../modals/TemplateFormModal'

type TemplateSectionProps = {
  app: App
}

export function TemplateSection({ app }: TemplateSectionProps) {
  const templateManager = useMemo(() => new TemplateManager(app), [app])

  const [templateList, setTemplateList] = useState<TemplateMetadata[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTemplateList = useCallback(async () => {
    setIsLoading(true)
    try {
      setTemplateList(await templateManager.listMetadata())
    } catch (error) {
      console.error('Failed to fetch template list:', error)
      new Notice(
        'Failed to load templates. Please try refreshing the settings.',
      )
      setTemplateList([])
    } finally {
      setIsLoading(false)
    }
  }, [templateManager])

  const handleCreate = useCallback(() => {
    new CreateTemplateModal({
      app,
      selectedSerializedNodes: null,
      onSubmit: fetchTemplateList,
    }).open()
  }, [fetchTemplateList, app])

  const handleEdit = useCallback(
    (template: TemplateMetadata) => {
      new EditTemplateModal({
        app,
        templateId: template.id,
        onSubmit: fetchTemplateList,
      }).open()
    },
    [fetchTemplateList, app],
  )

  const handleDelete = useCallback(
    (template: TemplateMetadata) => {
      const message = `确定要删除模板 "${template.name}" 吗？`
      new ConfirmModal(app, {
        title: '删除模板',
        message: message,
        ctaText: '确认删除',
        onConfirm: async () => {
          try {
            await templateManager.deleteTemplate(template.id)
            fetchTemplateList()
          } catch (error) {
            console.error('Failed to delete template:', error)
            new Notice('删除模板失败，请重试')
          }
        },
      }).open()
    },
    [templateManager, fetchTemplateList, app],
  )

  useEffect(() => {
    fetchTemplateList()
  }, [fetchTemplateList])

  return (
    <div className="aide-settings-section">
      <div className="aide-settings-header">提示词模板 (Prompt Templates)</div>

      <div className="aide-settings-sub-header-container">
        <div className="aide-settings-sub-header">已保存的模板</div>
        <ObsidianButton text="添加提示词模板" onClick={handleCreate} />
      </div>

      <div className="aide-templates-container">
        <div className="aide-templates-header">
          <div>模板名称</div>
          <div>操作</div>
        </div>
        {isLoading ? (
          <div className="aide-templates-empty">正在加载模板...</div>
        ) : templateList.length > 0 ? (
          templateList.map((template) => (
            <TemplateItem
              key={template.id}
              template={template}
              onDelete={() => {
                handleDelete(template)
              }}
              onEdit={() => {
                handleEdit(template)
              }}
            />
          ))
        ) : (
          <div className="aide-templates-empty">暂无保存的提示词模板</div>
        )}
      </div>
    </div>
  )
}

function TemplateItem({
  template,
  onEdit,
  onDelete,
}: {
  template: TemplateMetadata
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="aide-template">
      <div className="aide-template-row">
        <div className="aide-template-name">{template.name}</div>
        <div className="aide-template-actions">
          <button
            className="clickable-icon"
            aria-label="Edit Template"
            onClick={onEdit}
          >
            <Edit size={16} />
          </button>
          <button
            className="clickable-icon"
            aria-label="Delete Template"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
