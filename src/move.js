'use strict';

const fs = require('fs/promises');
const path = require('path');

const moveFile = async(file, destination) => {
  const filePath = path.join(__dirname, file);
  const fileName = path.basename(filePath);
  const destinationPath = destination.endsWith('/')
    ? path.join(__dirname, destination, fileName)
    : path.join(__dirname, destination);
  const content = await fs.readFile(filePath);

  try {
    await fs.writeFile(destinationPath, content);
  } catch (err) {
    if (err.code === 'EISDIR') {
      const newDestination = path.join(destinationPath, fileName);

      await fs.writeFile(newDestination, content);
    } else {
      throw Error(err);
    }
  } finally {
    await fs.rm(filePath);
  }
};

module.exports = { moveFile };
