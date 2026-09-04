export type VectorMetaData = {
  startLine: number
  endLine: number
}

export type SelectEmbedding = {
  id: number
  path: string
  mtime: number
  content: string
  model: string
  dimension: number
  embedding: number[]
  metadata: VectorMetaData
}

export type InsertEmbedding = Omit<SelectEmbedding, 'id'>
