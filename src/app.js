/* eslint-disable no-console */
// node ./src/app.js ./testMove/test.txt ./testMove/init/test.txt
'use strict';

const fs = require('fs');

const [currentPath, newPath] = process.argv.slice(2);

const moveFile = () => {
  const isDir = newPath[newPath.length - 1] === '/';
  const newFilePath = newPath + '/' + currentPath.split('/').pop();

  try {
    if (isDir) {
      fs.renameSync(currentPath, newFilePath);
    }

    if (!isDir) {
      fs.renameSync(currentPath, newPath);
    }
  } catch (error) {
    console.log('Error:', error);
  }

  console.log('File moved successfully!');
};

moveFile();
