/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (src, dest) => {
  if (src === dest) {
    console.log('Source and destination paths are the same');

    return;
  }

  if (!fs.existsSync(src)) {
    console.log('Source file does not exist');

    return;
  }

  if (!fs.existsSync(path.dirname(dest))) {
    console.log('Destination directory does not exist');

    return;
  }

  const destIsDirectory = dest.endsWith('/');

  if (destIsDirectory) {
    const filename = path.basename(src);
    const newFilePath = path.join(dest, filename);

    try {
      fs.renameSync(src, newFilePath);
      console.log('File moved successfully');
    } catch (err) {
      console.error('Error moving file:', err);
    }
  } else {
    try {
      fs.renameSync(src, dest);
      console.log('File renamed/replaced successfully');
    } catch (err) {
      console.error('Error renaming/replacing file:', err);
    }
  }
};

moveFile('src/file2.txt', 'src/dir/');
