/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

(async () => {
  try {
    if (process.argv.length < 4) {
      throw new Error('too few params');
    }

    const [filePath, destination] = process.argv.slice(2);
    const fileName = path.basename(filePath);
    let newFilePath = destination;

    await fs.access(filePath, fs.constants.F_OK);

    const isDir = await fs
      .lstat(destination)
      .then((stat) => stat.isDirectory())
      .catch(() => false);

    if (destination.endsWith(path.sep) && !isDir) {
      throw new Error(`directory ${destination} does not exists`);
    }

    if (isDir) {
      newFilePath = path.join(newFilePath, fileName);
    }

    await fs.rename(filePath, newFilePath);
  } catch (e) {
    console.error(e);
  }
})();
