import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(root, '../source');
const files = ['ADORN_MANUAL.md', 'ASF_MANUAL.md', 'ASSIGNMENT_SHARING.md', 'ADORN_USER_DATA.md', 'SELLER_NEXUS_REQUIREMENTS.md', 'RIDDLE_AUTHORING.md', 'RIDDLE_TIERS_QUICK_GUIDE.md', 'RIDDLE_SYSTEM_DEVELOPER_GUIDE.md'];
for (const name of files) fs.copyFileSync(path.join(source, name), path.join(root, 'content', name));
fs.mkdirSync(path.join(root, 'assets'), { recursive: true });
fs.copyFileSync(path.resolve(root, '../release Docs/graphics/adorn-wordmark-v4.png'), path.join(root, 'assets/adorn-wordmark-v4.png'));
for (const name of ['dum3.ttf', 'gemfont.txt']) fs.copyFileSync(path.join(source, 'ui/assets', name), path.join(root, 'assets', name));
console.log(`Synced ${files.length} maintained guides, wordmark v4 and the mod's heading font.`);
