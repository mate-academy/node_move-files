'use strict';

const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-shadow
function moveFile(currentPath, newPath) {
  const fileData = fs.readFileSync(currentPath, 'utf-8');

  if (newPath.endsWith('/')) {
    fs.writeFileSync(newPath + path.basename(currentPath), fileData);
  } else {
    if (newPath.includes('/')) {
      fs.writeFileSync(newPath, fileData);
    } else {
      if (fs.existsSync(newPath + '/')) {
        fs.writeFileSync(newPath + '/' + path.basename(currentPath), fileData);
      } else {
        fs.renameSync(currentPath, newPath);

        return;
      }
    }
  }

  fs.unlinkSync(currentPath);
};

const [currentPath, newPath] = process.argv.slice(2);

if (!fs.existsSync(newPath) && newPath.includes('/')) {
  throw new Error(`this directory '${newPath}' does not exist.`);
}

moveFile(currentPath, newPath);
