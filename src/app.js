/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(sourcePath, pathToMove) {
  if (!sourcePath || !pathToMove) {
    console.error('Source path or destination path is missing.');

    return;
  }

  if (!fs.existsSync(sourcePath) || fs.statSync(sourcePath).isDirectory()) {
    console.error(
      `Source path "${sourcePath}" does not exist or is a directory.`,
    );

    return;
  }

  const absoluteSourcePath = path.resolve(sourcePath);
  let absolutePathToMove = path.resolve(pathToMove);

  try {
    if (
      fs.existsSync(absolutePathToMove) &&
      fs.statSync(absolutePathToMove).isDirectory()
    ) {
      const fileName = path.basename(absoluteSourcePath);

      absolutePathToMove = path.join(absolutePathToMove, fileName);
    }

    fs.renameSync(absoluteSourcePath, absolutePathToMove);
  } catch (err) {
    console.error(`Moving failed with an error: ${err.message}`);
  }
}

moveFile(...process.argv.slice(2));
