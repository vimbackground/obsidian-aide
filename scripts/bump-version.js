const fs = require('fs');
const path = require('path');

// Usage: node scripts/bump-version.js [major|minor|patch]
const type = (process.argv[2] || 'patch').toLowerCase();

const pkgPath = path.resolve(__dirname, '../package.json');
const manifestPath = path.resolve(__dirname, '../manifest.json');
const outputManifestPath = path.resolve(__dirname, '../output/obsidian-aide/manifest.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const oldVersion = pkg.version || '0.1.0';

const [major, minor, patch] = oldVersion.split('.').map((num) => parseInt(num, 10));

let newVersion = '';
if (type === 'major') {
  newVersion = `${major + 1}.0.0`;
} else if (type === 'minor') {
  newVersion = `${major}.${minor + 1}.0`;
} else {
  newVersion = `${major}.${minor}.${patch + 1}`;
}

console.log(`[Version Bump] ${oldVersion} -> ${newVersion} (${type.toUpperCase()} upgrade)`);

// Update package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

// Update manifest.json
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.version = newVersion;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

// Update output/osd-aide/manifest.json if exists
if (fs.existsSync(outputManifestPath)) {
  const outManifest = JSON.parse(fs.readFileSync(outputManifestPath, 'utf8'));
  outManifest.version = newVersion;
  fs.writeFileSync(outputManifestPath, JSON.stringify(outManifest, null, 2) + '\n', 'utf8');
}

console.log(`Successfully updated version to ${newVersion} in all manifest & package files.`);
