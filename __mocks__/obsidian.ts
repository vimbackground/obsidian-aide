export class App {}
export class TFile {}
export class TFolder {}
export class Notice {}
export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/').replace(/\/+/g, '/')
}
