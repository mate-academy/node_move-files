'use strict';

const fs = require('fs');

const renameFile = (oldName, newName) => {
  fs.rename(oldName, newName, (err) => {
    if (err) {
      throw new Error('Rename error');
    }
  });
};

const app = () => {
  const args = process.argv.slice(2);
  const firstPath = args[0];
  const secondPath = args[1];
  const isExists = fs.existsSync(`src/${secondPath}`);

  const firstPathFormatted = `src/${firstPath}`;
  const secondPathFormatted = isExists
    ? `src/${secondPath}/${firstPath}`
    : `src/${secondPath}`;

  try {
    if (secondPath[secondPath.length - 1] === '/' && !isExists) {
      throw new Error('No such directory');
    }

    renameFile(firstPathFormatted, secondPathFormatted);
  } catch (error) {
    console.error(error);
  }
};

app();

module.exports = { app };
