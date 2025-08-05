/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');

async function moveFile() {
  const [src, dest] = process.argv.slice(2);

  if (!src || !dest) {
    console.error('Missing arguments');

    return;
  }

  try {
    await fs.stat(src);
  } catch {
    console.error('Source file does not exist');

    return;
  }

  if (path.resolve(src) === path.resolve(dest)) {
    return;
  }

  try {
    const destStat = await fs.stat(dest);

    if (destStat.isDirectory()) {
      const newPath = path.join(dest, path.basename(src));

      await fs.rename(src, newPath);
    } else {
      await fs.rename(src, dest);
    }
  } catch {
    const destDir = path.dirname(dest);

    try {
      await fs.stat(destDir);
    } catch {
      console.error('Destination directory does not exist');

      return;
    }

    await fs.rename(src, dest);
  }
}

moveFile();
