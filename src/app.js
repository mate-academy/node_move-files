/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const [, , srcArg, destArg] = process.argv;

if (!srcArg || !destArg) {
  console.error('Two arguments is required');
  process.exit(0);
}

const src = path.resolve(srcArg);
const dest = path.resolve(destArg);

if (!fs.existsSync(src)) {
  console.error('Source does not exist');
  process.exit(0);
}

if (src === dest) {
  process.exit(0);
}

const srcStat = fs.statSync(src);

if (srcStat.isDirectory()) {
  console.error('Source must be a file');
  process.exit(0);
}

if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
  fs.renameSync(src, path.join(dest, path.basename(src)));
} else {
  const destDir = path.dirname(dest);

  if (!fs.existsSync(destDir)) {
    console.error('Destination directory does not exist');
    process.exit(0);
  }

  fs.renameSync(src, dest);
}
