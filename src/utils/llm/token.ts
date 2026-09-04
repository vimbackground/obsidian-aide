/**
 * Lightweight heuristic token count estimator.
 * Avoids bundling the massive 5.3MB js-tiktoken dictionary while providing
 * high accuracy for threshold estimation (e.g. 8192 token limit checks).
 */
export async function tokenCount(text: string): Promise<number> {
  if (!text) return 0

  // Count CJK (Chinese, Japanese, Korean) characters
  // Each CJK character is roughly 1 to 1.5 tokens in modern tokenizers
  const cjkMatches = text.match(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g)
  const cjkCount = cjkMatches ? cjkMatches.length : 0

  // Non-CJK text (English words, numbers, punctuation)
  const nonCjkText = text.replace(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g, ' ')
  // Split words by whitespace and symbols
  const words = nonCjkText.trim().split(/\s+/)
  const nonCjkWordCount = words[0] === '' ? 0 : words.length

  // Roughly: 1 CJK char ~= 1.3 tokens, 1 English word ~= 1.3 tokens, plus punctuation/symbol variance
  const estimatedTokens = Math.ceil(cjkCount * 1.3 + nonCjkWordCount * 1.3)

  return Math.max(1, estimatedTokens)
}
