/* eslint-disable no-console */
'use strict';

const fs = require('fs-extra');
const path = require('path');

async function moveFile(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath)) {
    console.log(`Error: Source file "${sourcePath}" does not exist.`);

    return;
  }

  const isDirectory = destinationPath.endsWith('/');

  try {
    if (isDirectory) {
      const destinationDir = destinationPath.slice(0, -1);

      if (!fs.existsSync(destinationDir)) {
        console.log(`Error: Destination directory "${destinationDir}" does not exist.`);

        return;
      }

      const filename = path.basename(sourcePath);
      const newFilePath = path.join(destinationDir, filename);

      await fs.move(sourcePath, newFilePath, { overwrite: true });
      console.log(`Moved "${sourcePath}" to "${newFilePath}".`);
    } else {
      await fs.move(sourcePath, destinationPath, { overwrite: true });
      console.log(`Moved "${sourcePath}" to "${destinationPath}".`);
    }
  } catch (err) {
    console.log(`Error: Failed to move "${sourcePath}" to "${destinationPath}".`);
    console.log(err);
  }
}

moveFile('file.txt', 'file2.txt');
moveFile('file.txt', './existingDir/test');
moveFile('file.txt', 'dir/');
moveFile('file.txt', 'a');
