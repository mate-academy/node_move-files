'use strict';

const fs = require('fs');

const [currentFile, dest] = process.argv.slice(2);

const renameFile = (oldName, newName) => {
  fs.rename(oldName, newName, () => {});
};

const moveFile = (fileName, path) => {
  const data = fs.readFileSync(fileName, 'utf8');

  fs.rm(fileName, () => {});
  fs.writeFileSync(path + fileName, data);
};

if (!dest.endsWith('/')) {
  try {
    const stats = fs.statSync(dest);

    if (stats.isDirectory()) {
      moveFile(currentFile, dest + '/');
    } else {
      renameFile(currentFile, dest);
    }
  } catch (e) {
    renameFile(currentFile, dest);
  }
}

if (dest.endsWith('/')) {
  try {
    const stats = fs.statSync(dest);

    if (stats.isDirectory()) {
      moveFile(currentFile, dest);
    }
  } catch (e) {
    throw e;
  }
}
