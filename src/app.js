/* eslint-disable no-console */
'use strict';

const fs = require('fs').promises;
const path = require('path');

const args = process.argv.slice(2);
const [src, dest] = args;

if (!src || !dest) {
  console.error('Source or destination is not defined');
  process.exit(0);
}

const resolvedSrc = path.resolve(src);
let resolvedDest = path.resolve(dest);

if (resolvedSrc === resolvedDest) {
  console.log('Source and destination are the same.');
  process.exit(0);
}

const fileMove = async () => {
  try {
    try {
      const srcStats = await fs.stat(resolvedSrc);

      if (!srcStats || !srcStats.isFile()) {
        console.error('Source is not a file or does not exists');
        process.exit(0);
      }

      try {
        const destStats = await fs.stat(resolvedDest);

        if (destStats && destStats.isDirectory()) {
          const baseName = path.basename(resolvedSrc);

          resolvedDest = path.join(resolvedDest, baseName);
        } else {
          const parentDir = path.dirname(resolvedDest);

          try {
            const parentStats = await fs.stat(parentDir);

            if (!parentStats.isDirectory()) {
              console.error('Destination parent path is not a directory.');
              process.exit(0);
            }
          } catch (parentErr) {
            if (parentErr.code === 'ENOENT') {
              console.error('Destination directory does not exist.');
            } else {
              console.error(
                'Error accessing destination path:',
                parentErr.message,
              );
            }
            process.exit(0);
          }
        }
      } catch (errDestStat) {
        if (errDestStat.code === 'ENOENT') {
          const parentDir = path.dirname(resolvedDest);

          try {
            const parentStats = await fs.stat(parentDir);

            if (!parentStats.isDirectory()) {
              console.error('Destination parent path is not a directory.');
              process.exit(0);
            }
          } catch (parentErr) {
            if (parentErr.code === 'ENOENT') {
              console.error('Destination directory does not exist.');
            } else {
              console.error(
                'Error accessing destination path:',
                parentErr.message,
              );
            }
            process.exit(0);
          }
        } else {
          console.error(
            'Error accessing destination file:',
            errDestStat.message,
          );
          process.exit(0);
        }
      }
    } catch (errSrcStat) {
      if (errSrcStat.code === 'ENOENT') {
        console.error(`Source file does not exist: ${resolvedSrc}`);
        process.exit(0);
      }
      throw errSrcStat;
    }

    await fs.copyFile(resolvedSrc, resolvedDest);
    await fs.unlink(resolvedSrc);

    console.log(`Moved: ${resolvedSrc} → ${resolvedDest}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(0);
  }
};

fileMove();
