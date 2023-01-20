'use strict';

const fs = require('fs');

const [currentFile, dest] = process.argv.slice(2);

const renameFile = (oldName, newName) => {
  fs.rename(oldName, newName, () => {});
};

if (!dest.endsWith('/')) {
  if (fs.existsSync(dest + '/')) {
    renameFile(currentFile, dest + '/' + currentFile);
  } else {
    const lastUrlInx = dest.lastIndexOf('/') + 1;
    const folderPath = dest.slice(0, lastUrlInx);

    if (fs.existsSync(folderPath)) {
      renameFile(currentFile, dest);
    } else {
      throw new Error('Folder does not exist');
    }
  }
}

if (dest.endsWith('/')) {
  if (fs.existsSync(dest)) {
    renameFile(currentFile, dest + currentFile);
  } else {
    throw new Error('Folder does not exist');
  }
}
