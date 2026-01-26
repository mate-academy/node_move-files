'use strict';

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

try {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    throw new Error('Error');
  }

  const [srcRaw, destRaw] = args;

  const src = path.resolve(srcRaw);
  const destResolved = path.resolve(destRaw);

  const srcStat = fs.statSync(src);

  if (!srcStat.isFile()) {
    throw new Error('Error');
  }

  const endsWithSlash = destRaw.endsWith('/') || destRaw.endsWith('\\');
  let finalDest = destResolved;

  if (endsWithSlash) {
    if (
      !fs.existsSync(destResolved) ||
      !fs.statSync(destResolved).isDirectory()
    ) {
      throw new Error('Error');
    }

    finalDest = path.join(destResolved, path.basename(src));
  } else if (
    fs.existsSync(destResolved) &&
    fs.statSync(destResolved).isDirectory()
  ) {
    finalDest = path.join(destResolved, path.basename(src));
  } else {
    const parentDir = path.dirname(destResolved);

    if (!fs.existsSync(parentDir) || !fs.statSync(parentDir).isDirectory()) {
      throw new Error('Error');
    }
  }

  if (finalDest !== src) {
    fs.renameSync(src, finalDest);
  }
} catch (err) {
  console.error(err);
}
