import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = 'C:\\Users\\user\\Downloads\\3D FGU';
const skip = ['node_modules', 'server.js', '.git', 'package-lock.json', 'package.json', 'list_files.js'];

function walk(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    const rel = path.relative(root, fp);
    if (skip.some(s => rel.startsWith(s))) continue;
    const st = fs.statSync(fp);
    if (st.isDirectory()) {
      results = results.concat(walk(fp));
    } else {
      results.push({ file: rel.replace(/\\/g, '/'), size: st.size });
    }
  }
  return results;
}

const files = walk(root);
console.log(JSON.stringify(files, null, 2));
