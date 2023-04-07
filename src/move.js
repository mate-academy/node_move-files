'use strict';

const path = require('path');
const fs = require('fs');

function moveFile(file, destination) {
  if (!file || !destination) {
    throw new Error('Error: 2 arguments passed are expected');
  }

  const filePath = path.join(__dirname, file);
  const destinationPath = path.join(__dirname, destination);
  const fileName = path.basename(filePath);
  const isDirectory = destination.endsWith('/');

  if (isDirectory && !fs.existsSync(destinationPath)) {
    throw new Error('Error: the directory does not exist');
  }

  try {
    fs.renameSync(
      filePath,
      isDirectory ? path.join(destinationPath, fileName) : destinationPath
    );
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { moveFile };
