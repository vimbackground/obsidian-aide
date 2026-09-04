const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 跨平台将 output/obsidian-aider 产物压缩打包为 output/obsidian-aider.zip
 * 用法: node scripts/package-zip.js
 */

const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'output', 'obsidian-aider');
const zipFile = path.join(projectRoot, 'output', 'obsidian-aider.zip');

if (!fs.existsSync(outputDir)) {
  console.error(`[Package Zip] 错误: 未找到目录 ${outputDir}，请先执行 npm run build`);
  process.exit(1);
}

const requiredFiles = ['main.js', 'manifest.json', 'styles.css'];
for (const file of requiredFiles) {
  const filePath = path.join(outputDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`[Package Zip] 错误: 未找到必要产物文件: ${file}`);
    process.exit(1);
  }
}

console.log(`[Package Zip] 开始打包 output/obsidian-aider -> output/obsidian-aider.zip ...`);

try {
  if (process.platform === 'win32') {
    // Windows 环境使用 PowerShell Compress-Archive
    if (fs.existsSync(zipFile)) {
      fs.unlinkSync(zipFile);
    }
    const psCmd = `powershell -NoProfile -Command "Compress-Archive -Path 'output/obsidian-aider/*' -DestinationPath 'output/obsidian-aider.zip' -Force"`;
    execSync(psCmd, { cwd: projectRoot, stdio: 'inherit' });
  } else {
    // Linux / macOS 环境使用标准 zip 命令
    if (fs.existsSync(zipFile)) {
      fs.unlinkSync(zipFile);
    }
    const shCmd = `cd output/obsidian-aider && zip -q -r ../obsidian-aider.zip main.js manifest.json styles.css`;
    execSync(shCmd, { cwd: projectRoot, shell: '/bin/bash', stdio: 'inherit' });
  }

  if (fs.existsSync(zipFile)) {
    const stat = fs.statSync(zipFile);
    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`[Package Zip] 打包成功: output/obsidian-aider.zip (${sizeMB} MB, ${stat.size} bytes)`);
    const idZipFile = path.join(projectRoot, 'output', 'aider.zip');
    fs.copyFileSync(zipFile, idZipFile);
    console.log(`[Package Zip] 已同步生成 output/aider.zip`);
  } else {
    throw new Error('未检测到生成的 zip 文件');
  }
} catch (error) {
  console.error('[Package Zip] 打包失败:', error.message);
  process.exit(1);
}
