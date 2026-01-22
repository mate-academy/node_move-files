/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');
const path = require('path');

const [, , source, dest] = process.argv;

if (!source) {
  console.error('Please provide source path');
}

if (!dest) {
  console.error('Please provide destination path');
}

if (source === dest) {
  process.exit(0);
}

(async () => {
  try {
    const srcStat = await fs.stat(source);

    if (!srcStat.isFile()) {
      console.error('Source is not a file');
    }

    let target = dest;

    if (dest.endsWith('/')) {
      const dirStat = await fs.stat(dest);

      if (!dirStat.isDirectory()) {
        console.error('Destination directory does not exist');
      }

      target = path.join(dest, path.basename(source));
    } else {
      try {
        const destStat = await fs.stat(dest);

        if (destStat.isDirectory()) {
          target = path.join(dest, path.basename(source));
        }
      } catch {
        const parentDir = path.dirname(dest);

        try {
          const parentStat = await fs.stat(parentDir);

          if (!parentStat.isDirectory()) {
            console.error('Destination directory does not exist');
          }
        } catch {
          console.error('Destination directory does not exist');
        }
      }
    }

    await fs.rename(source, target);
    console.log(`File moved from "${source}" to "${target}"`);
  } catch (err) {
    console.error(err.message);
  }
})();
