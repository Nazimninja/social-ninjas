import fs from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'public', '_redirects');
const dest = path.join(process.cwd(), 'dist', '_redirects');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied _redirects to dist/');
} else {
  console.error('Source _redirects file not found at: ' + src);
}
