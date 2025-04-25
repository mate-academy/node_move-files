/* eslint-disable no-console */
'use strict';

const fs = require('node:fs');
const { unlink, copyFile, rename } = require('node:fs/promises');
const path = require('node:path');

const source = process.argv[2];
const destination = process.argv[3];

async function app(src, dest) {
  if (!src || !dest) {
    console.error('Please provide source and destination paths');

    return false;
  }

  const srcBasename = path.basename(src);

  console.log('Source:', path.resolve(src), srcBasename);

  if (!fs.existsSync(src)) {
    console.error('Source file does not exist');

    return;
  }

  try {
    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      const destDir = path.join(dest, srcBasename);

      await copyFile(src, destDir);
      console.log('File copied successfully');
      await unlink(src);
      console.log('File deleted successfully');

      return;
    }

    const isDestIsFilename = !dest.includes(path.sep) && !fs.existsSync(dest);
    const finalDestPath = isDestIsFilename
      ? path.join(path.dirname(src), dest)
      : dest;

    await rename(src, finalDestPath);
    console.log('File moved successfully to', finalDestPath);
  } catch (error) {
    console.error('Error moving file:', error);
  }
}

app(source, destination);
