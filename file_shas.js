import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = 'C:\\Users\\user\\Downloads\\3D FGU';
const deployFiles = [
  'index.html',
  'css/style.css',
  'data/announcements.json',
  'data/islands.json',
  'js/lib/three.standalone.js',
  'js/lib/OrbitControls.standalone.js',
  'js/data.js',
  'js/main.js'
];

const result = deployFiles.map(f => {
  const fp = path.join(root, f.replace(/\//g, '\\'));
  const content = fs.readFileSync(fp);
  const sha = crypto.createHash('sha1').update(content).digest('hex');
  return { file: f, sha: sha, size: content.length };
});

console.log(JSON.stringify(result, null, 2));
