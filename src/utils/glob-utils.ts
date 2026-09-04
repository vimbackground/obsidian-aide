import { minimatch } from 'minimatch'
import { Vault } from 'obsidian'

export const findFilesMatchingPatterns = async (
  patterns: string[],
  vault: Vault,
) => {
  const files = vault.getMarkdownFiles()
  return files.filter((file) => {
    return patterns.some((pattern) => {
      const cleanPattern = pattern.trim().replace(/^\/+/, '')
      if (!cleanPattern) return false
      return (
        file.path.startsWith(cleanPattern + '/') ||
        file.path === cleanPattern ||
        minimatch(file.path, cleanPattern) ||
        minimatch(file.path, `**/${cleanPattern}/**`)
      )
    })
  })
}
