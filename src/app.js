/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

const [source, destination] = process.argv.slice(2);

const isDirectory = async (dirPath) => {
  try {
    const stats = await fs.stat(dirPath);

    return stats.isDirectory();
  } catch (_) {
    return false;
  }
};

const moveFile = async () => {
  try {
    let destPath = destination;

    if (await isDirectory(destPath)) {
      destPath = path.join(destPath, path.basename(source));
    }
    await fs.rename(source, destPath);
  } catch (_) {
    console.error('Failed to move file');
  }
};

moveFile();
