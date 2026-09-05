import { App } from 'obsidian'

import { VectorManager } from './modules/vector/VectorManager'

export class DatabaseManager {
  private app: App
  private vectorManager: VectorManager | null = null

  constructor(app: App) {
    this.app = app
  }

  static async create(app: App): Promise<DatabaseManager> {
    const dbManager = new DatabaseManager(app)
    dbManager.vectorManager = new VectorManager(app)
    return dbManager
  }

  getVectorManager(): VectorManager {
    if (!this.vectorManager) {
      this.vectorManager = new VectorManager(this.app)
    }
    return this.vectorManager
  }

  // kept for compatibility if needed
  async vacuum() {
    // no-op
  }

  async cleanup() {
    this.vectorManager = null
  }
}
