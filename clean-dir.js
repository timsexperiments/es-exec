import fs from 'fs';

export function cleanDir(path) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
