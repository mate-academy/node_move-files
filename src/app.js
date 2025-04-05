/* eslint-disable no-console */
const fsp = require('fs/promises');
const path = require('path');

async function main() {
  const oldPath = process.argv[2];
  let newPath = process.argv[3];

  try {
    const destStat = await fsp.stat(newPath);

    if (destStat.isDirectory()) {
      const filename = path.basename(oldPath);

      newPath = path.join(newPath, filename);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      const parentDir = path.dirname(newPath);

      try {
        const parentStat = await fsp.stat(parentDir);

        if (!parentStat.isDirectory()) {
          console.error(err);
        }
      } catch {
        console.error(err);
      }
    } else {
      console.error(err);
    }
  }

  if (oldPath !== newPath) {
    try {
      await fsp.rename(oldPath, newPath);
    } catch (error) {
      console.error(error);
    }
  }
}

main();
