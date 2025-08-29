/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const [, , src, dest] = process.argv;

if (!src || !dest) {
  throw new Error('Usage: node index <source> <destination>');
}

try {
  if (!fs.existsSync(src) || !fs.statSync(src).isFile()) {
    throw new Error(`Source file "${src}" does not exist or is not a file`);
  }

  let finalDest = dest;

  const destEndsWithSlash = dest.endsWith(path.sep) || dest.endsWith('/');
  const destExists = fs.existsSync(dest);

  if (destEndsWithSlash) {
    if (!destExists || !fs.statSync(dest).isDirectory()) {
      throw new Error(`Destination directory "${dest}" does not exist`);
    }

    finalDest = path.join(dest, path.basename(src));
  } else if (destExists && fs.statSync(dest).isDirectory()) {
    finalDest = path.join(dest, path.basename(src));
  }

  fs.renameSync(src, finalDest);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
