import { Edit, Trash } from 'lucide-react'
import { App } from 'obsidian'
import { useCallback, useEffect, useState } from 'react'

import { useSettings } from '../../../contexts/settings-context'
import { McpManager } from '../../../core/mcp/mcpManager'
import SmartComposerPlugin from '../../../main'
import {
  McpServerState,
  McpServerStatus,
} from '../../../types/mcp.types'
import { ObsidianButton } from '../../common/ObsidianButton'
import { ObsidianToggle } from '../../common/ObsidianToggle'
import { ConfirmModal } from '../../modals/ConfirmModal'
import {
  AddMcpServerModal,
  EditMcpServerModal,
} from '../modals/McpServerFormModal'

type McpSectionProps = {
  app: App
  plugin: SmartComposerPlugin
}

type BuiltinToolInfo = {
  key: string
  titleZh: string
  titleEn: string
  descZh: string
  descEn: string
}

const BUILTIN_TOOLS_CONFIG: BuiltinToolInfo[] = [
  {
    key: 'bing_search',
    titleZh: '国内必应网络搜索',
    titleEn: 'Bing CN Web Search',
    descZh: '直连微软 Bing 国内节点，检索最新事实、资讯与新闻，免翻墙、免 API 密钥。',
    descEn: 'Search current web facts and news via Bing China node without proxy or API key.',
  },
  {
    key: 'web_fetch',
    titleZh: '网页正文抓取提取',
    titleEn: 'Web Page Content Fetch',
    descZh: '抓取任意网页 URL 并提取为干净的 Markdown 文本供 AI 研读与总结。',
    descEn: 'Fetch any web page URL and convert content into clean Markdown for AI reading.',
  },
  {
    key: 'weather_service',
    titleZh: '全球实时天气预报',
    titleEn: 'Global Weather Forecast',
    descZh: '基于 Open-Meteo 全球开放接口，查询中国及全球任意城市的当前气象与未来预报。',
    descEn: 'Real-time and 3-day weather forecast for any city via Open-Meteo open API.',
  },
  {
    key: 'arxiv_search',
    titleZh: 'arXiv 学术论文检索',
    titleEn: 'arXiv Academic Search',
    descZh: '直连全球最大开放文献库，检索人工智能、物理、数学、计算机等前沿论文与摘要。',
    descEn: 'Search scientific papers and abstracts from arXiv open research repository.',
  },
  {
    key: 'current_time',
    titleZh: '当前精准时间与时区',
    titleEn: 'Accurate Time & Timezone',
    descZh: '获取当前系统的精确时间、日期、星期几以及所在时区，避免模型时间认知错乱。',
    descEn: 'Get current accurate date, day, 24h time and timezone for precise time awareness.',
  },
]

export function McpSection({ app, plugin }: McpSectionProps) {
  const { settings, setSettings } = useSettings()
  const language = settings.language ?? 'en'
  const isZh = language === 'zh'

  const [mcpManager, setMcpManager] = useState<McpManager | null>(null)
  const [mcpServers, setMcpServers] = useState<McpServerState[]>([])

  useEffect(() => {
    const initMCPManager = async () => {
      const manager = await plugin.getMcpManager()
      setMcpManager(manager)
      setMcpServers(manager.getServers())
    }
    initMCPManager()
  }, [plugin])

  useEffect(() => {
    if (mcpManager) {
      const unsubscribe = mcpManager.subscribeServersChange((servers) => {
        setMcpServers(servers)
      })
      return () => {
        unsubscribe()
      }
    }
  }, [mcpManager])

  const handleToggleBuiltinTool = async (key: string, enabled: boolean) => {
    const current = settings.mcp?.builtinTools ?? {}
    await setSettings({
      ...settings,
      mcp: {
        ...settings.mcp,
        builtinTools: {
          ...current,
          [key]: enabled,
        },
      },
    })
  }

  const builtinSettings = settings.mcp?.builtinTools ?? {}

  return (
    <div className="aide-settings-section">
      <div className="aide-settings-header">
        {isZh ? '工具扩展生态' : 'Tool Extensions Ecosystem'}
      </div>

      {/* 1. 内置原生工具引擎 */}
      <div style={{ marginBottom: '28px' }}>
        <div className="aide-settings-sub-header">
          {isZh ? '内置原生工具 (免环境支持)' : 'Built-in Native Tools (Zero Dependency)'}
        </div>
        <div className="aide-settings-desc">
          {isZh
            ? '由插件底层原生驱动，无需安装 Node.js 环境或配置外部进程，在桌面端和移动端均可秒开使用。'
            : 'Powered natively by the plugin engine. No Node.js required, works on all platforms.'}
        </div>

        <div className="aide-settings-table-container">
          <table className="aide-settings-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>{isZh ? '工具名称' : 'Tool Name'}</th>
                <th style={{ width: '48%' }}>{isZh ? '功能说明' : 'Description'}</th>
                <th style={{ width: '12%', textAlign: 'center' }}>{isZh ? '状态' : 'Status'}</th>
                <th style={{ width: '12%', textAlign: 'center' }}>{isZh ? '启用' : 'Enabled'}</th>
              </tr>
            </thead>
            <tbody>
              {BUILTIN_TOOLS_CONFIG.map((t) => {
                const isEnabled = builtinSettings[t.key] ?? true
                return (
                  <tr key={t.key}>
                    <td style={{ fontWeight: 600 }}>{isZh ? t.titleZh : t.titleEn}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>
                      {isZh ? t.descZh : t.descEn}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          color: isEnabled ? 'var(--text-success)' : 'var(--text-muted)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          backgroundColor: isEnabled
                            ? 'rgba(var(--color-green-rgb), 0.1)'
                            : 'var(--background-secondary)',
                        }}
                      >
                        {isEnabled
                          ? isZh ? '正常就绪' : 'Ready'
                          : isZh ? '已停用' : 'Disabled'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <ObsidianToggle
                        value={isEnabled}
                        onChange={(val) => handleToggleBuiltinTool(t.key, val)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. 外部 MCP 扩展服务 */}
      <div>
        <div className="aide-settings-sub-header-container">
          <div className="aide-settings-sub-header">
            {isZh ? '外部扩展服务' : 'External MCP Servers'}
          </div>
          {!mcpManager?.disabled && (
            <ObsidianButton
              text={isZh ? '添加外部服务' : 'Add External Server'}
              onClick={() => new AddMcpServerModal(app, plugin).open()}
            />
          )}
        </div>
        <div className="aide-settings-desc">
          {isZh
            ? '支持接入遵循 Model Context Protocol 标准的外部命令行子进程服务（需要系统安装 Node.js 环境）。'
            : 'Connect custom external CLI sub-process servers adhering to Model Context Protocol (Node.js required).'}
          {!mcpManager?.disabled && (
            <span
              style={{
                marginLeft: '8px',
                color: 'var(--text-accent)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => window.open('https://nodejs.org/', '_blank')}
            >
              {isZh ? '前往 Node.js 官网下载 →' : 'Visit Node.js Website →'}
            </span>
          )}
        </div>

        {mcpManager?.disabled ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', padding: '12px 0' }}>
            {isZh
              ? '当前处于移动端设备，外部子进程扩展服务仅在桌面端可用。内置原生工具已正常工作。'
              : 'External CLI subprocess servers are only available on desktop. Built-in tools are working properly.'}
          </div>
        ) : (
          <div className="aide-mcp-servers-container" style={{ marginTop: '12px' }}>
            <div className="aide-mcp-servers-header">
              <div>{isZh ? '服务名称' : 'Server Name'}</div>
              <div>{isZh ? '状态' : 'Status'}</div>
              <div>{isZh ? '启用' : 'Enabled'}</div>
              <div>{isZh ? '操作' : 'Actions'}</div>
            </div>
            {mcpServers.length > 0 ? (
              mcpServers.map((server) => (
                <McpServerComponent
                  key={server.name}
                  server={server}
                  app={app}
                  plugin={plugin}
                  isZh={isZh}
                />
              ))
            ) : (
              <div className="aide-mcp-servers-empty">
                {isZh ? '暂无外部服务配置' : 'No external servers configured'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function McpServerComponent({
  server,
  app,
  plugin,
  isZh,
}: {
  server: McpServerState
  app: App
  plugin: SmartComposerPlugin
  isZh: boolean
}) {
  const { settings, setSettings } = useSettings()

  const handleEdit = useCallback(() => {
    new EditMcpServerModal(app, plugin, server.name).open()
  }, [server.name, app, plugin])

  const handleDelete = useCallback(() => {
    const title = isZh ? '删除外部服务' : 'Delete External Server'
    const message = isZh
      ? `确定要删除外部服务 "${server.name}" 吗？`
      : `Are you sure you want to delete external server "${server.name}"?`
    new ConfirmModal(app, {
      title,
      message,
      ctaText: isZh ? '删除' : 'Delete',
      onConfirm: async () => {
        await setSettings({
          ...settings,
          mcp: {
            ...settings.mcp,
            servers: settings.mcp.servers.filter((s) => s.id !== server.name),
          },
        })
      },
    }).open()
  }, [server.name, settings, setSettings, app, isZh])

  const handleToggleEnabled = useCallback(
    async (enabled: boolean) => {
      await setSettings({
        ...settings,
        mcp: {
          ...settings.mcp,
          servers: settings.mcp.servers.map((s) =>
            s.id === server.name ? { ...s, enabled } : s,
          ),
        },
      })
    },
    [settings, setSettings, server.name],
  )

  return (
    <div className="aide-mcp-server">
      <div className="aide-mcp-server-row">
        <div className="aide-mcp-server-name">{server.name}</div>
        <div className="aide-mcp-server-status">
          <McpServerStatusBadge status={server.status} isZh={isZh} />
        </div>
        <div className="aide-mcp-server-toggle">
          <ObsidianToggle
            value={server.config.enabled}
            onChange={handleToggleEnabled}
          />
        </div>
        <div className="aide-mcp-server-actions">
          <button
            onClick={handleEdit}
            className="clickable-icon"
            aria-label={isZh ? '编辑' : 'Edit'}
            title={isZh ? '编辑' : 'Edit'}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="clickable-icon"
            aria-label={isZh ? '删除' : 'Delete'}
            title={isZh ? '删除' : 'Delete'}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

function McpServerStatusBadge({
  status,
  isZh,
}: {
  status: McpServerStatus
  isZh: boolean
}) {
  switch (status) {
    case McpServerStatus.Connected:
      return (
        <span style={{ color: 'var(--text-success)' }}>
          {isZh ? '已连接' : 'Connected'}
        </span>
      )
    case McpServerStatus.Connecting:
      return (
        <span style={{ color: 'var(--text-accent)' }}>
          {isZh ? '连接中...' : 'Connecting...'}
        </span>
      )
    case McpServerStatus.Disconnected:
      return (
        <span style={{ color: 'var(--text-muted)' }}>
          {isZh ? '未连接' : 'Disconnected'}
        </span>
      )
    case McpServerStatus.Error:
      return (
        <span style={{ color: 'var(--text-error)' }}>
          {isZh ? '连接异常' : 'Error'}
        </span>
      )
  }
}
