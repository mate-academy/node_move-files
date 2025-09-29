/* eslint-disable no-console */
// write code here
'use strict';

const fs = require('fs/promises');
const path = require('path');

async function move(oldPath, newPath) {
  try {
    if (!oldPath || !newPath) {
      throw new Error('Exactly two arguments are required');
    }

    if (oldPath === newPath) {
      return;
    }

    const srcStats = await fs.stat(oldPath);

    if (!srcStats.isFile()) {
      throw new Error('Source is not a file');
    }

    const trailing = newPath.endsWith(path.sep) || newPath.endsWith('/');
    let dest;

    if (trailing) {
      const destStats = await fs.stat(newPath);

      if (!destStats.isDirectory()) {
        throw new Error('Destination is not a directory');
      }

      dest = path.join(newPath, path.basename(oldPath));
    } else {
      try {
        const destStats = await fs.stat(newPath);

        if (destStats.isDirectory()) {
          dest = path.join(newPath, path.basename(oldPath));
        } else {
          dest = newPath;
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          const destDir = path.dirname(newPath);
          const dirStats = await fs.stat(destDir);

          if (!dirStats.isDirectory()) {
            throw new Error('Destination directory does not exist');
          }

          dest = newPath;
        } else {
          throw err;
        }
      }
    }

    await fs.rename(oldPath, dest);
    console.log(`Moved ${oldPath} to ${dest}`);
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

  move(oldPath, newPath).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { move };
