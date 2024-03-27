// write code here
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile(srcFile, destFile) {
  if (!srcFile || !destFile) {
    console.error('Expected 2 args');

    return;
  }

  if (srcFile === destFile) {
    return;
  }

  const absSrcPath = path.resolve(srcFile);
  let absDestPath = path.resolve(destFile);

  const isDirectory =
    fs.existsSync(absDestPath) && fs.statSync(absDestPath).isDirectory();

  try {
    if (isDirectory) {
      const filePath = path.basename(absSrcPath);

      absDestPath = path.join(absDestPath, filePath);
    }

    fs.renameSync(absSrcPath, absDestPath);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

moveFile(...process.argv.slice(2));
