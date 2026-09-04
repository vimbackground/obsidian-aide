const fs = require('fs');
const path = require('path');

const srcRoot = path.resolve(__dirname, '..');
const targetRoot = path.join(srcRoot, 'obsidian-aide');

console.log('Assembling clean obsidian-aide distribution...');
console.log('Source:', srcRoot);
console.log('Target:', targetRoot);

if (fs.existsSync(targetRoot)) {
  fs.rmSync(targetRoot, { recursive: true, force: true });
}
fs.mkdirSync(targetRoot, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const items = fs.readdirSync(src);
    for (const item of items) {
      // Exclude temp/build files
      if (item === 'node_modules' || item === '.git' || item === 'meta.json' || item.endsWith('.zip')) {
        continue;
      }
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 1. Copy directories
const dirsToCopy = ['src', '_System', 'scripts', '.github'];
for (const dir of dirsToCopy) {
  const dirPath = path.join(srcRoot, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Copying directory: ${dir}`);
    copyRecursive(dirPath, path.join(targetRoot, dir));
  }
}

// 2. Copy root files
const filesToCopy = [
  'AGENT.md',
  'LICENSE',
  'manifest.json',
  'versions.json',
  'styles.css',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'esbuild.config.mjs',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc.js',
  '.prettierignore',
  '.prettierrc',
  '.npmrc',
  '.nvmrc'
];

for (const file of filesToCopy) {
  const filePath = path.join(srcRoot, file);
  if (fs.existsSync(filePath)) {
    console.log(`Copying file: ${file}`);
    fs.copyFileSync(filePath, path.join(targetRoot, file));
  }
}

// 3. Copy output/obsidian-aide
const outSrc = path.join(srcRoot, 'output', 'obsidian-aide');
const outDest = path.join(targetRoot, 'output', 'obsidian-aide');
if (fs.existsSync(outSrc)) {
  console.log('Copying output/obsidian-aide built files...');
  copyRecursive(outSrc, outDest);
}

console.log('Base copy completed successfully.');
