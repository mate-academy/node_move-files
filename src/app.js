/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');
const path = require('path');

const [sourcePath, destPath] = process.argv.slice(2);

async function move() {
  if (!sourcePath || !destPath) {
    console.error('Please specify the source and destination file paths');

    return;
  }

  const fileName = path.basename(sourcePath);

  let finalPath;

  if (destPath.endsWith('/') || destPath.endsWith('\\')) {
    finalPath = path.join(destPath, fileName);
  } else {
    try {
      const stats = await fs.stat(destPath);

      if (stats.isDirectory()) {
        finalPath = path.join(destPath, fileName);
      } else {
        finalPath = destPath;
      }
    } catch (error) {
      finalPath = destPath;
    }
  }

  try {
    await fs.rename(sourcePath, finalPath);
  } catch (error) {
    console.error(error);
  }
}

move();
