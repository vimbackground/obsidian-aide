import { htmlToMarkdown, requestUrl } from 'obsidian'

import { McpTool } from '../../types/mcp.types'

export type BuiltinTool = {
  tool: McpTool
  execute: (args: Record<string, unknown>) => Promise<string>
}

// 1. 国内必应搜索 (Bing CN Search) - 直连 cn.bing.com，免翻墙，免 Key
async function executeBingSearch(
  args: Record<string, unknown>,
): Promise<string> {
  const query =
    typeof args.query === 'string'
      ? args.query
      : typeof args.keyword === 'string'
        ? args.keyword
        : ''
  if (!query) return '错误：请提供搜索关键词 (query)'

  try {
    const url = `https://cn.bing.com/search?q=${encodeURIComponent(query)}&setlang=zh-hans`
    const res = await requestUrl({
      url,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      },
    })

    if (res.status !== 200) {
      return `搜索请求失败，状态码: ${String(res.status)}`
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(res.text, 'text/html')
    const results: { title: string; link: string; snippet: string }[] = []

    const items = doc.querySelectorAll('.b_algo')
    items.forEach((item) => {
      if (results.length >= 6) return
      const titleEl = item.querySelector('h2 a')
      const snippetEl =
        item.querySelector('.b_caption p') ||
        item.querySelector('.b_algoSlug') ||
        (item.querySelector('p') as HTMLElement | null)

      if (titleEl && titleEl.textContent) {
        const title = titleEl.textContent.trim()
        const link = titleEl.getAttribute('href') || ''
        const snippet = snippetEl?.textContent?.trim() || ''
        if (link && link.startsWith('http')) {
          results.push({ title, link, snippet })
        }
      }
    })

    if (results.length === 0) {
      return `未能找到关于 "${query}" 的相关搜索结果，建议更换关键词。`
    }

    let output = `### 针对 "${query}" 的网络搜索结果：\n\n`
    results.forEach((r, idx) => {
      output += `${String(idx + 1)}. **[${r.title}](${r.link})**\n   ${r.snippet}\n\n`
    })
    return output.trim()
  } catch (error) {
    return `网络搜索发生异常: ${error instanceof Error ? error.message : String(error)}`
  }
}

// 2. 网页正文抓取与提取 (Web Fetch) - 原生 htmlToMarkdown，免无头浏览器
async function executeWebFetch(
  args: Record<string, unknown>,
): Promise<string> {
  const url = typeof args.url === 'string' ? args.url : ''
  if (!url) return '错误：请提供有效的网页 URL'

  try {
    const res = await requestUrl({
      url,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    if (res.status !== 200) {
      return `抓取网页失败，HTTP 状态码: ${String(res.status)}`
    }

    let markdown = htmlToMarkdown(res.text)
    const maxChars = typeof args.max_chars === 'number' ? args.max_chars : 2500
    if (markdown.length > maxChars) {
      markdown =
        markdown.substring(0, maxChars) +
        '\n\n...(内容过长，已为避免触发平台速率限制进行智能截断)...'
    }

    return `### 网页 [${url}] 的抓取内容：\n\n${markdown}`
  } catch (error) {
    return `网页抓取失败: ${error instanceof Error ? error.message : String(error)}`
  }
}

// 3. 实时天气查询 (Weather Service) - 基于 Open-Meteo 全球公开免 Key 气象源
async function executeWeather(
  args: Record<string, unknown>,
): Promise<string> {
  const city =
    typeof args.city === 'string'
      ? args.city
      : typeof args.location === 'string'
        ? args.location
        : ''
  if (!city)
    return '错误：请提供要查询的城市或地区名称（如“北京”、“上海”、“深圳”）'

  try {
    // 1. 地理编码查询
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh`
    const geoRes = await requestUrl({ url: geoUrl, method: 'GET' })
    const geoData = geoRes.json as {
      results?: Array<{
        latitude: number
        longitude: number
        name: string
        country: string
      }>
    }
    if (!geoData.results || geoData.results.length === 0) {
      return `未能检索到城市 "${city}" 的地理坐标，请核对城市名称。`
    }

    const { latitude, longitude, name, country } = geoData.results[0]

    // 2. 气象预报查询
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${String(latitude)}&longitude=${String(longitude)}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    const weatherRes = await requestUrl({ url: weatherUrl, method: 'GET' })
    const wData = weatherRes.json as {
      current?: {
        weather_code?: number
        temperature_2m?: number
        relative_humidity_2m?: number
        wind_speed_10m?: number
      }
      daily?: {
        time?: string[]
        temperature_2m_max?: number[]
        temperature_2m_min?: number[]
        weather_code?: number[]
      }
    }

    const weatherCodeMap: Record<number, string> = {
      0: '晴朗 ☀️',
      1: '大部晴朗 🌤️',
      2: '局部多云 ⛅',
      3: '阴天 ☁️',
      45: '有雾 🌫️',
      48: '沉积雾 🌫️',
      51: '轻微毛毛雨 🌦️',
      53: '毛毛雨 🌦️',
      55: '较强毛毛雨 🌧️',
      61: '小雨 🌧️',
      63: '中雨 🌧️',
      65: '大雨 🌧️',
      71: '小雪 🌨️',
      73: '中雪 🌨️',
      75: '大雪 ❄️',
      80: '阵雨 🌦️',
      81: '强阵雨 🌧️',
      82: '暴雨 ⛈️',
      95: '雷阵雨 ⛈️',
    }

    const currentCode = wData.current?.weather_code ?? 0
    const currentDesc = weatherCodeMap[currentCode] || '多云'
    const temp =
      wData.current?.temperature_2m != null
        ? String(wData.current.temperature_2m)
        : '未知'
    const humidity =
      wData.current?.relative_humidity_2m != null
        ? String(wData.current.relative_humidity_2m)
        : '未知'
    const wind =
      wData.current?.wind_speed_10m != null
        ? String(wData.current.wind_speed_10m)
        : '未知'

    let report = `### 【${name} (${country})】实时天气预报\n\n`
    report += `- **当前状况**: ${currentDesc}\n`
    report += `- **当前气温**: ${temp} °C\n`
    report += `- **相对湿度**: ${humidity}%\n`
    report += `- **当前风速**: ${wind} km/h\n`

    if (wData.daily && Array.isArray(wData.daily.time)) {
      report += `\n**未来 3 日天气趋势：**\n`
      for (let i = 0; i < Math.min(3, wData.daily.time.length); i++) {
        const date = wData.daily.time[i]
        const maxT = wData.daily.temperature_2m_max?.[i] ?? 0
        const minT = wData.daily.temperature_2m_min?.[i] ?? 0
        const dCode = wData.daily.weather_code?.[i] ?? 0
        const dDesc = weatherCodeMap[dCode] || '晴到多云'
        report += `- ${date}: ${dDesc}, ${String(minT)}°C ~ ${String(maxT)}°C\n`
      }
    }

    return report.trim()
  } catch (error) {
    return `天气数据获取失败: ${error instanceof Error ? error.message : String(error)}`
  }
}

// 4. arXiv 学术论文检索 (arXiv Search) - 直连 arXiv 官方开放 API
async function executeArxivSearch(
  args: Record<string, unknown>,
): Promise<string> {
  const query =
    typeof args.query === 'string'
      ? args.query
      : typeof args.keyword === 'string'
        ? args.keyword
        : ''
  if (!query) return '错误：请提供论文关键词或主题 (query)'

  try {
    const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`
    const res = await requestUrl({ url, method: 'GET' })

    if (res.status !== 200) {
      return `检索 arXiv 失败，HTTP 状态码: ${String(res.status)}`
    }

    const parser = new DOMParser()
    const xml = parser.parseFromString(res.text, 'application/xml')
    const entries = xml.querySelectorAll('entry')

    if (entries.length === 0) {
      return `未在 arXiv 找到与 "${query}" 相关的论文。`
    }

    let output = `### arXiv 学术检索结果 (${query})：\n\n`
    entries.forEach((entry, idx) => {
      const title =
        entry.querySelector('title')?.textContent?.trim().replace(/\n/g, ' ') ||
        '无标题'
      const summary =
        entry.querySelector('summary')?.textContent?.trim().replace(/\n/g, ' ') ||
        ''
      const published =
        entry.querySelector('published')?.textContent?.substring(0, 10) || ''
      const link = entry.querySelector('id')?.textContent?.trim() || ''

      const authors: string[] = []
      entry.querySelectorAll('author name').forEach((a) => {
        if (a.textContent) authors.push(a.textContent.trim())
      })

      output += `${String(idx + 1)}. **[${title}](${link})**\n`
      output += `   - **作者**: ${authors.slice(0, 4).join(', ')}${authors.length > 4 ? ' 等' : ''}\n`
      output += `   - **发布日期**: ${published}\n`
      output += `   - **摘要**: ${summary.substring(0, 200)}...\n\n`
    })

    return output.trim()
  } catch (error) {
    return `arXiv 论文检索异常: ${error instanceof Error ? error.message : String(error)}`
  }
}

// 5. 实时时间与时区 (Current Time) - 原生 JS 执行，毫秒级绝对精准
async function executeCurrentTime(): Promise<string> {
  const now = new Date()
  const formatted = now.toLocaleString('zh-CN', {
    timeZoneName: 'long',
    hour12: false,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const iso = now.toISOString()
  const timestamp = now.getTime()

  return `当前准确时间：${formatted} (UTC: ${iso}, Timestamp: ${timestamp})`
}

export const BUILTIN_TOOLS: Record<string, BuiltinTool> = {
  bing_search: {
    tool: {
      name: 'builtin__bing_search',
      description:
        '通过国内 Bing 搜索引擎进行联网搜索，检索最新的新闻、网络信息、事实与答案（免翻墙直连）。',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: '要在搜索引擎中查找的关键词或问题描述',
          },
        },
        required: ['query'],
      },
    },
    execute: executeBingSearch,
  },
  web_fetch: {
    tool: {
      name: 'builtin__web_fetch',
      description:
        '抓取指定网址 (URL) 的正文网页内容，并提取为格式清晰的 Markdown 文本供分析与总结。',
      inputSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: '要抓取阅读的完整 HTTP/HTTPS 网页网址',
          },
        },
        required: ['url'],
      },
    },
    execute: executeWebFetch,
  },
  weather_service: {
    tool: {
      name: 'builtin__weather_service',
      description:
        '查询指定城市或地区的当前实时天气情况、气温、风速、湿度以及未来数日天气预报。',
      inputSchema: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: '城市或地区名称（如“北京”、“深圳”、“杭州”、“纽约”等）',
          },
        },
        required: ['city'],
      },
    },
    execute: executeWeather,
  },
  arxiv_search: {
    tool: {
      name: 'builtin__arxiv_search',
      description:
        '在 arXiv 全球最大开放科学文献库中检索计算机科学、人工智能、物理、数学等领域的学术论文。',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: '论文搜索关键词、主题概念或论文标题',
          },
        },
        required: ['query'],
      },
    },
    execute: executeArxivSearch,
  },
  current_time: {
    tool: {
      name: 'builtin__current_time',
      description:
        '获取用户当前的精确系统时间、日期、星期几以及所在时区信息。',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    execute: executeCurrentTime,
  },
}

export function normalizeToolName(toolName: string): string {
  if (!toolName) return ''
  const trimmed = toolName.trim()
  if (trimmed.startsWith('builtin__')) return trimmed
  if (trimmed.startsWith('builtin_')) return trimmed.replace('builtin_', 'builtin__')
  if (trimmed.startsWith('builtin')) return trimmed.replace('builtin', 'builtin__')
  return trimmed
}

export function isBuiltinTool(toolName: string): boolean {
  const norm = normalizeToolName(toolName)
  if (norm.startsWith('builtin__')) return true
  return Object.keys(BUILTIN_TOOLS).includes(toolName)
}

export function getBuiltinToolsList(): McpTool[] {
  return Object.values(BUILTIN_TOOLS).map((b) => b.tool)
}

export async function executeBuiltinTool(
  toolName: string,
  args: Record<string, unknown> = {},
): Promise<string> {
  const norm = normalizeToolName(toolName)
  const normalizedName = norm.startsWith('builtin__')
    ? norm.replace('builtin__', '')
    : norm

  const handler = BUILTIN_TOOLS[normalizedName]
  if (!handler) {
    throw new Error(`未找到内置工具: ${toolName}`)
  }
  return await handler.execute(args)
}
