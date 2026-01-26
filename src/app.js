'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

try {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Error');
  } else {
    const [srcRaw, destRaw] = args;

    const src = path.resolve(srcRaw);
    const destResolved = path.resolve(destRaw);

    const srcStat = fs.statSync(src);

    if (!srcStat.isFile()) {
      console.error('Error');
    } else {
      const endsWithSlash = destRaw.endsWith('/') || destRaw.endsWith('\\');

      let finalDest = destResolved;

      if (endsWithSlash) {
        if (
          !fs.existsSync(destResolved) ||
          !fs.statSync(destResolved).isDirectory()
        ) {
          console.error('Error');
        } else {
          finalDest = path.join(destResolved, path.basename(src));
        }
      } else if (
        fs.existsSync(destResolved) &&
        fs.statSync(destResolved).isDirectory()
      ) {
        finalDest = path.join(destResolved, path.basename(src));
      } else {
        const parentDir = path.dirname(destResolved);

        if (
          !fs.existsSync(parentDir) ||
          !fs.statSync(parentDir).isDirectory()
        ) {
          console.error('Error');
        }
      }

      if (finalDest === src) {
      } else if (
        !endsWithSlash ||
        (endsWithSlash &&
          fs.existsSync(destResolved) &&
          fs.statSync(destResolved).isDirectory())
      ) {
        if (fs.existsSync(finalDest) && fs.statSync(finalDest).isFile()) {
          fs.unlinkSync(finalDest);
        }

        fs.renameSync(src, finalDest);
      }
    }
  }
} catch (err) {
  console.error(err);
}
