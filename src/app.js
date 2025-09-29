/* eslint-disable no-console */
// write code here
'use strict';

const fs = require('fs/promises');
const path = require('path');

async function move(oldPath, newPath) {
  if (!oldPath || !newPath) {
    console.error('Source and destination are required.');

    return;
  }

  if (oldPath === newPath) {
    return;
  }

  try {
    const src = oldPath;
    let dest = newPath;
    const srcStats = await fs.stat(src);

    if (!srcStats.isFile()) {
      console.error('Source is not a file');

      return;
    }

    try {
      const destStats = await fs.stat(newPath);

      if (destStats.isDirectory()) {
        const baseName = path.basename(src);

        dest = path.join(newPath, baseName);
      }
    } catch (err) {
      const destDir = path.dirname(newPath);

      try {
        const dirStats = await fs.stat(destDir);

        if (!dirStats.isDirectory()) {
          console.error('Destination directory does not exist');

          return;
        }
      } catch {
        console.error('Destination directory does not exist');

        return;
      }

      dest = newPath;
    }
    await fs.rename(src, dest);
    console.log(`Moved ${src} to ${dest}`);
  } catch (err) {
    console.error('Move error:', err.message);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Exactly two arguments are required');
  }

  const [oldPath, newPath] = args;

  move(oldPath, newPath);
}

module.exports = { move };
