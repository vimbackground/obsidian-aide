import { App } from 'obsidian'

import { useSettings } from '../../../contexts/settings-context'
import SmartComposerPlugin from '../../../main'
import { ObsidianToggle } from '../../common/ObsidianToggle'

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
          {isZh ? '内置原生工具 (零环境依赖)' : 'Built-in Native Tools (Zero Dependency)'}
        </div>
        <div className="aide-settings-desc">
          {isZh
            ? '由插件底层原生驱动，无需安装 Node.js 环境或配置外部进程，在桌面端和移动端（iOS / Android）均可秒开使用。'
            : 'Powered natively by the plugin engine. No Node.js required, works instantly on desktop and mobile.'}
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
    </div>
  )
}
