const fs = require('fs');
const path = require('path');

function moveFile(src, dest) {
  if (!src || !dest) {
    throw new Error('Two arguments are required: <source> <destination>');
  }

  if (!fs.existsSync(src)) {
    throw new Error(`Source file not found: ${src}`);
  }

  if (fs.statSync(src).isDirectory()) {
    throw new Error(`Source is a directory, only files are supported: ${src}`);
  }

  const destEndsWithSlash = dest.endsWith('/');

  let finalDest;

  if (destEndsWithSlash) {
    if (!fs.existsSync(dest) || !fs.statSync(dest).isDirectory()) {
      throw new Error(`Destination directory does not exist: ${dest}`);
    }
    finalDest = path.join(dest, path.basename(src));
  } else if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
    finalDest = path.join(dest, path.basename(src));
  } else {
    const parentDir = path.dirname(dest);

    if (
      parentDir !== '.' &&
      (!fs.existsSync(parentDir) || !fs.statSync(parentDir).isDirectory())
    ) {
      throw new Error(`Destination directory does not exist: ${parentDir}`);
    }
    finalDest = dest;
  }

  fs.renameSync(src, finalDest);
}

const [srcPath, destPath] = process.argv.slice(2);

try {
  moveFile(srcPath, destPath);
} catch (err) {
  process.stderr.write(`Error: ${err.message}\n`);
}

module.exports = { moveFile };
