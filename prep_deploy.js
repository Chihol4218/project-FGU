import fs from 'fs';
import path from 'path';

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
  const b64 = content.toString('base64');
  return { file: f, data: b64, encoding: 'base64' };
});

fs.writeFileSync(path.join(root, 'deploy_payload.json'), JSON.stringify(result, null, 0));
console.log('OK, files:', result.length, ', total base64 chars:', result.reduce((s,r) => s + r.data.length, 0));
