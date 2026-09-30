/* eslint-disable no-console */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const [src, dest] = process.argv.slice(2);

try {
  let finalDest = dest;

  if (fs.existsSync(finalDest) && fs.statSync(dest).isDirectory()) {
    const fileName = path.basename(src);

    finalDest = path.join(dest, fileName);
  }

  fs.renameSync(src, finalDest);
} catch (err) {
  console.error(err);
}
