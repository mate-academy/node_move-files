/* eslint-disable padding-line-between-statements */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFiles(source, dest) {
  if (!source || !dest) {
    const error = new Error('Missing required arguments');
    console.error(error);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    return;
  }

  let targetPath = dest;

  try {
    if (!fs.existsSync(source)) {
      throw new Error(`Source file does not exist: ${source}`);
    }

    const isDir =
      fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory();
    const endsWithSlash = targetPath.endsWith('/') || targetPath.endsWith('\\');

    if (isDir || endsWithSlash) {
      if (!fs.existsSync(targetPath)) {
        throw new Error(`Destination directory does not exist: ${targetPath}`);
      }
      targetPath = path.join(targetPath, path.basename(source));
    } else {
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        throw new Error(`Destination directory does not exist: ${parentDir}`);
      }
    }

    fs.renameSync(source, targetPath);
  } catch (error) {
    console.error(error);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  moveFiles(args[0], args[1]);
}

module.exports = { moveFiles };
