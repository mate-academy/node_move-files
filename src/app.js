'use strict';

const fs = require('fs');

const renameFile = (oldName, newName, isExist) => {
  const oldPath = `src/${oldName}`;
  const newPath = isExist ? `src/${newName}/${oldName}` : `src/${newName}`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      throw new Error('Rename error');
    }
  });
};

const app = () => {
  const args = process.argv.slice(2);
  const firstPath = args[0];
  const secondPath = args[1];

  try {
    const isExists = fs.existsSync(`src/${secondPath}`);

    if (secondPath[secondPath.length - 1] === '/' && !isExists) {
      throw new Error('No such directory');
    }

    renameFile(firstPath, secondPath, isExists);
  } catch (error) {
    // Some error handling
  }
};

app();

module.exports = { app };
