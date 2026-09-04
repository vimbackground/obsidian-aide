# Developer & Technical Guide (开发与技术操作指南)

This document provides detailed technical operations, local development commands, architectural standards, and automated release pipeline mechanics for developers and contributors of **Obsidian Aider**.

---

## 1. Project Architecture & Output Conventions

* **Source Code**: [`src/`](../src) written in TypeScript & React 18.
* **Output Directory**: All production artifacts are compiled to `output/obsidian-aider/`:
  - `main.js`: Bundled plugin entry (strictly controlled under ~2.1 MB);
  - `manifest.json`: Plugin manifest metadata;
  - `styles.css`: Native theme-adapted stylesheets.
* **Release Archive**: `output/obsidian-aider.zip` & `output/aider.zip` (contains the 3 files above, ready for manual installation or distribution).

---

## 2. Local Development & Build

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Hot-reload development watch
npm run dev

# 3. Production build (type checks & esbuild bundle)
npm run build

# 4. Package distribution zip archive (cross-platform)
npm run pack:zip

# 5. One-step build & package
npm run build:all

# 6. Quality assurance checks
npm run type:check
npm run lint:check
npm test
```

---

## 3. Automated Release Pipeline (CI/CD)

The project utilizes a cloud-aware GitHub Actions pipeline configured in [`.github/workflows/release.yml`](../.github/workflows/release.yml).

### Push-to-Release Workflow (One-Step Automation)
Developers **do not need to manually create Git tags or draft releases**:

1. **Bump version** in configuration files:
   ```bash
   npm run bump:patch   # e.g., 0.8.3 -> 0.8.4
   # or npm run bump:minor (0.8.3 -> 0.9.0)
   # or npm run bump:major (0.8.3 -> 1.0.0)
   ```
   This script ([`scripts/bump-version.js`](../scripts/bump-version.js)) automatically synchronizes:
   - `package.json`
   - `manifest.json`
   - `output/obsidian-aider/manifest.json`
   - `versions.json` (Obsidian minAppVersion mapping)

2. *(Optional)* Record update highlights at the top of [`RELEASE_NOTES.md`](../RELEASE_NOTES.md).

3. **Commit and push to `main`**:
   ```bash
   git add .
   git commit -m "chore: release 0.8.4"
   git push origin main
   ```

### What Happens in the Cloud:
- **Version Sensing & De-duplication**:
  The workflow checks `package.json` version against existing GitHub Releases via `gh release view`.
  - If the version has already been released (normal commits): the pipeline exits cleanly in seconds without creating redundant releases.
  - If a new version is detected: it triggers the full release pipeline.
- **Automated Tagging**: Automatically creates Git tag `X.Y.Z` (without `v` prefix, strictly required by Obsidian Community Plugins) pointing to the commit.
- **Compilation & Packaging**: Runs `npm run build` and `scripts/package-zip.js` to bundle `output/obsidian-aider.zip` & `output/aider.zip`.
- **Release Notes Extraction**: Calls `scripts/extract-release-notes.js` to extract the corresponding version section from `RELEASE_NOTES.md` (with built-in fallback).
- **Asset Publishing**: Automatically publishes the GitHub Release with attached assets:
  - `obsidian-aider.zip`
  - `aider.zip`
  - `main.js`
  - `manifest.json`
  - `styles.css`
