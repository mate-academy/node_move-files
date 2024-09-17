'use strict';

const fs = require('fs/promises');
const path = require('path');
const [source, target] = process.argv.slice(2);

async function moveFile(sourceFile, targetFile) {
  try {
    const dst = targetFile.endsWith('/')
      ? path.join(targetFile, path.basename(sourceFile))
      : targetFile;

    const dir = path.dirname(`public/${dst}`);

    try {
      await fs.access(dir);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Destination directory doesn't exist. Creating ${dir}`);
    }

    await fs.rename(`public/${sourceFile}`, `public/${dst}`);

    // eslint-disable-next-line no-console
    console.error(`Success: File ${sourceFile} has been moved to ${dst}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error no such file or directory: ${sourceFile}`);
  }
}

if (source && target) {
  moveFile(source, target);
} else {
  // eslint-disable-next-line no-console
  console
    .error('Error: Both "sourceFile" and "targetFile" arguments are required');
}
