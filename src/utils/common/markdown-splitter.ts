export type MarkdownChunk = {
  pageContent: string
  startLine: number
  endLine: number
}

type Paragraph = {
  lines: string[]
  startLine: number
  endLine: number
  charLength: number
  isHeading: boolean
}

/**
 * Strip YAML frontmatter from markdown text completely
 */
export function stripFrontmatter(text: string): string {
  if (!text) return ''
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim()
}

/**
 * Replace frontmatter content with blank lines to preserve line numbers for indexing
 */
export function stripFrontmatterPreserveLines(text: string): string {
  if (!text) return ''
  const match = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  if (!match) return text
  const frontmatterStr = match[0]
  const lineCount = frontmatterStr.split('\n').length - 1
  const emptyLines = '\n'.repeat(lineCount)
  return emptyLines + text.slice(frontmatterStr.length)
}

/**
 * Splits markdown text prioritizing natural paragraph boundaries (double newlines, headings)
 * instead of arbitrary character counts, ensuring semantic completeness.
 * Zero external dependencies.
 */
export function splitMarkdown(
  text: string,
  chunkSize: number = 1000,
): MarkdownChunk[] {
  if (!text || text.trim().length === 0) return []

  const cleanText = stripFrontmatterPreserveLines(text)
  const rawLines = cleanText.split('\n')
  const paragraphs: Paragraph[] = []

  let currentParaLines: string[] = []
  let paraStartLine = 1

  const flushParagraph = (endLine: number) => {
    if (currentParaLines.length > 0) {
      const isHeading = currentParaLines.length === 1 && /^#{1,6}\s/.test(currentParaLines[0].trim())
      const textBlock = currentParaLines.join('\n')
      paragraphs.push({
        lines: [...currentParaLines],
        startLine: paraStartLine,
        endLine: endLine,
        charLength: textBlock.length + 1,
        isHeading,
      })
      currentParaLines = []
    }
  }

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i]
    const lineNumber = i + 1
    const trimmed = line.trim()

    // Heading starts a new paragraph boundary
    if (/^#{1,6}\s/.test(trimmed)) {
      flushParagraph(lineNumber - 1)
      paragraphs.push({
        lines: [line],
        startLine: lineNumber,
        endLine: lineNumber,
        charLength: line.length + 1,
        isHeading: true,
      })
      paraStartLine = lineNumber + 1
      continue
    }

    // Empty line indicates paragraph break
    if (trimmed === '') {
      flushParagraph(lineNumber - 1)
      paraStartLine = lineNumber + 1
      continue
    }

    if (currentParaLines.length === 0) {
      paraStartLine = lineNumber
    }
    currentParaLines.push(line)
  }

  flushParagraph(rawLines.length)

  if (paragraphs.length === 0) return []

  // Group paragraphs into chunks up to chunkSize
  const chunks: MarkdownChunk[] = []
  let currentChunkParas: Paragraph[] = []
  let currentChunkLength = 0

  const flushChunk = () => {
    if (currentChunkParas.length > 0) {
      const content = currentChunkParas
        .map((p) => p.lines.join('\n'))
        .join('\n\n')
        .trim()
      if (content.length > 0) {
        chunks.push({
          pageContent: content,
          startLine: currentChunkParas[0].startLine,
          endLine: currentChunkParas[currentChunkParas.length - 1].endLine,
        })
      }
      currentChunkParas = []
      currentChunkLength = 0
    }
  }

  for (const para of paragraphs) {
    // If a single paragraph is larger than chunkSize, break it by sentences
    if (para.charLength > chunkSize) {
      flushChunk()
      const subChunks = splitLargeParagraph(para, chunkSize)
      chunks.push(...subChunks)
      continue
    }

    if (currentChunkLength + para.charLength > chunkSize && currentChunkParas.length > 0) {
      flushChunk()
    }

    currentChunkParas.push(para)
    currentChunkLength += para.charLength
  }

  flushChunk()

  return chunks
}

/**
 * Fallback for abnormally large single paragraphs: splits by sentence endings
 */
function splitLargeParagraph(para: Paragraph, chunkSize: number): MarkdownChunk[] {
  const chunks: MarkdownChunk[] = []
  const fullText = para.lines.join('\n')

  // Split by sentence punctuation followed by space or newline
  const sentenceRegex = /[^。！？!?\n]+[。！？!?\n]+|[^。！？!?\n]+$/g
  const sentences = fullText.match(sentenceRegex) || [fullText]

  let currentText = ''
  let startLine = para.startLine

  for (const sentence of sentences) {
    if (currentText.length + sentence.length > chunkSize && currentText.length > 0) {
      chunks.push({
        pageContent: currentText.trim(),
        startLine: startLine,
        endLine: para.endLine,
      })
      currentText = ''
    }
    currentText += sentence
  }

  if (currentText.trim().length > 0) {
    chunks.push({
      pageContent: currentText.trim(),
      startLine: startLine,
      endLine: para.endLine,
    })
  }

  return chunks
}
