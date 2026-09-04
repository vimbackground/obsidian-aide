const fs = require('fs');
const path = require('path');

/**
 * 从 RELEASE_NOTES.md 中提取指定版本的更新说明
 * 用法: node scripts/extract-release-notes.js [tag] [output_file]
 * 示例: node scripts/extract-release-notes.js v0.8.3 release_notes.md
 */

const projectRoot = path.resolve(__dirname, '..');
const releaseNotesPath = path.join(projectRoot, 'RELEASE_NOTES.md');
const manifestPath = path.join(projectRoot, 'manifest.json');

// 1. 获取目标版本号
let targetTag = process.argv[2];
if (!targetTag) {
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    targetTag = manifest.version ? `v${manifest.version}` : 'v0.0.0';
  } else {
    targetTag = 'latest';
  }
}

// 规范化纯数字版本号（例如 "v0.8.3" -> "0.8.3"）
const cleanVersion = targetTag.replace(/^refs\/tags\//, '').replace(/^v/, '');
const outputFile = process.argv[3] || path.join(projectRoot, 'release_notes_extracted.md');

console.log(`[Extract Release Notes] 正在查找版本: ${targetTag} (匹配 key: ${cleanVersion})`);

let extractedContent = '';

if (fs.existsSync(releaseNotesPath)) {
  const content = fs.readFileSync(releaseNotesPath, 'utf8');

  // 匹配包含目标版本的标题（例如 # Release Notes: v0.8.3 或 ## v0.8.3 或 ## [0.8.3]）
  // 截取到下一个版本标题（^#\s 或 ^##\s 跟随版本号）或者文件结尾
  const escapedVersion = cleanVersion.replace(/\./g, '\\.');
  const sectionRegex = new RegExp(
    `(?:^|\\n)(#{1,3}\\s+[^\\n]*?\\bv?${escapedVersion}\\b[^\\n]*?\\n)([\\s\\S]*?)(?=(?:\\n#{1,2}\\s+[^\\n]*?\\bv?\\d+\\.\\d+|$))`,
    'i'
  );

  const match = content.match(sectionRegex);
  if (match) {
    const header = match[1].trim();
    const body = match[2].trim();
    extractedContent = `${header}\n\n${body}\n`;
    console.log(`[Extract Release Notes] 成功提取到版本 ${targetTag} 的更新说明 (${extractedContent.length} 字符)。`);
  } else {
    console.warn(`[Extract Release Notes] 未在 RELEASE_NOTES.md 中定位到版本 ${targetTag}，使用默认模板。`);
  }
} else {
  console.warn(`[Extract Release Notes] 未找到 RELEASE_NOTES.md 文件，使用默认模板。`);
}

// 兜底方案：如果未找到特定版本，生成通用的发布说明
if (!extractedContent) {
  extractedContent = `## Obsidian Aider ${targetTag}

🎉 **Obsidian Aider** 新版本已发布！

### 📥 安装使用指引
1. 下载下方附件中的 **\`obsidian-aider.zip\`**（或 **\`aider.zip\`**）；
2. 解压得到三个文件：\`main.js\`、\`manifest.json\`、\`styles.css\`；
3. 将这三个文件放置于您的 Obsidian 库目录中的 \`.obsidian/plugins/aider/\` 文件夹下；
4. 进入 Obsidian **【设置】->【第三方插件】**，点击右上角刷新并开启 **Aider** 即可！

---
*完整更新历史与文档请查阅仓库主页 [README.md](https://github.com/vimbackground/obsidian-aider)*
`;
}

fs.writeFileSync(outputFile, extractedContent, 'utf8');
console.log(`[Extract Release Notes] 输出已保存至: ${outputFile}`);
