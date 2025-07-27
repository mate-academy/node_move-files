'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [, , source, destination] = process.argv;

  if (!source || !destination) {
    throw new Error('Please provide source and destination paths');
  }

  const sourcePath = path.resolve(source);
  const destPath = path.resolve(destination);

  if (sourcePath === destPath) {
    return;
  }

  const sourceStats = fs.statSync(sourcePath);

  if (sourceStats.isDirectory()) {
    throw new Error('Source is a directory');
  }

  let finalDestPath = destPath;

  if (destination.endsWith('/')) {
    if (!fs.existsSync(destPath) || !fs.statSync(destPath).isDirectory()) {
      throw new Error('Destination directory does not exist');
    }
    finalDestPath = path.join(destPath, path.basename(sourcePath));
  } else if (fs.existsSync(destPath) && fs.statSync(destPath).isDirectory()) {
    finalDestPath = path.join(destPath, path.basename(sourcePath));
  }

  const destDir = path.dirname(finalDestPath);

  if (!fs.existsSync(destDir) || !fs.statSync(destDir).isDirectory()) {
    throw new Error('Destination directory does not exist');
  }

  fs.renameSync(sourcePath, finalDestPath);
}

try {
  moveFile();
} catch (error) {
  process.stderr.write(`Error: ${error.message}\n`);
}
