'use strict';

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const paths = process.argv.slice(2);
const [oldFilePath, newFilePath] = paths;

if (paths.length !== 2) {
  console.error('not valid args');
} else {
  moveFile(oldFilePath, newFilePath);
}

function moveFile(source, dest) {
  const pathOrigin = path.join(source);
  const pathDest = path.join(dest);

  if (pathOrigin === pathDest) {
    return;
  }

  if (!fs.existsSync(pathOrigin)) {
    console.error('source does not exist');

    return;
  }

  const sourceStats = fs.statSync(pathOrigin);

  if (!sourceStats.isFile()) {
    console.error('Only file moving is supported');

    return;
  }

  if (pathDest.endsWith('/')) {
    if (!fs.existsSync(pathDest)) {
      console.error('dir does not exist');

      return;
    }

    const destFilePath = path.join(pathDest, path.basename(pathOrigin));

    copyAndDeleteFile(pathOrigin, destFilePath);
  } else {
    if (fs.existsSync(pathDest)) {
      const destStats = fs.statSync(pathDest);

      if (destStats.isDirectory()) {
        const destFilePath = path.join(pathDest, path.basename(pathOrigin));

        copyAndDeleteFile(pathOrigin, destFilePath);
      } else {
        copyAndDeleteFile(pathOrigin, pathDest);
      }
    } else {
      copyAndDeleteFile(pathOrigin, pathDest);
    }
  }
}

function copyAndDeleteFile(source, dest) {
  fs.copyFile(source, dest, (err) => {
    if (err) {
      console.error(err);

      return;
    }

    console.log('file/dir was moved successfully');

    fs.rm(source, (error) => {
      if (error) {
        console.error(error);

        return;
      }

      console.log('source file/dir was deleted');
    });
  });
}
