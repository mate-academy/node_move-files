// write code here
/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

async function isDirectoryExists(directoryPath) {
  try {
    const stats = await fs.stat(directoryPath);

    return stats.isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

async function moveFile() {
  const [, , source, destination] = process.argv;

  if (!source || !destination) {
    console.error('Please provide both source and destination paths.');

    return;
  }

  if (source === destination) {
    return;
  }

  const lastChar = destination[destination.length - 1];
  let newDestination = destination;

  if (lastChar === '/') {
    const directoryExists = await isDirectoryExists(destination);

    if (!directoryExists) {
      console.error('directory not exists');

      return;
    }

    newDestination = destination + path.basename(source);
  } else {
    const directoryExists = await isDirectoryExists(destination);

    if (directoryExists) {
      newDestination = destination + '/' + path.basename(source);
    }
  }

  try {
    await fs.rename(source, newDestination);
    console.log(`Moved '${source}' to '${newDestination}'`);
  } catch (error) {
    console.error(`Error moving file: ${error.message}`);
  }
}

moveFile();
