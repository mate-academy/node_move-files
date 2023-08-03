'use strict';

const fs = require('fs').promises;
const path = require('path');

async function moveFile(fileName, moveTo) {
  const filePath = path.join(__dirname, fileName);
  let movePath = path.join(__dirname, '..', moveTo);
  let data;

  movePath = movePath.endsWith('/') ? movePath.slice(0, -1) : movePath;

  fs.readFile(movePath, 'utf-8', (err) => {
    if (err) {
      throw new Error(`Directory ${movePath} does not exist`);
    }
  });

  movePath = path.join(movePath, fileName);

  try {
    data = await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(err);
  }

  try {
    await fs.writeFile(movePath, data);
    await fs.rm(filePath);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = moveFile;
