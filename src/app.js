'use strict';

const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-shadow
const moveFile = (currentPath, newPath) => {
  const fileData = fs.readFileSync(currentPath, 'utf-8');
  const destinationPath = newPath.endsWith('/')
    ? newPath + path.basename(currentPath)
    : newPath;

  if (newPath.includes('/') && !fs.existsSync(newPath + '/')) {
    fs.writeFileSync(newPath, fileData);
  } else {
    fs.writeFileSync(destinationPath, fileData);
  }

  fs.unlinkSync(currentPath);
};

const [currentPath, newPath] = process.argv.slice(2);

if (!fs.existsSync(newPath) && newPath.includes('/')) {
  throw new Error(`this directory '${newPath}' does not exist.`);
}

moveFile(currentPath, newPath);
