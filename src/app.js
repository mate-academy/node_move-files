/* eslint-disable no-console */
const fsp = require('fs').promises;
const path = require('path');

async function moveFile() {
  const source = process.argv[2];
  const destination = process.argv[3];

  if (source && destination) {
    const sourcePath = path.resolve(source);
    let destinationPath = path.resolve(destination);

    try {
      await fsp.access(sourcePath);
    } catch (err) {
      console.error(err);
    }

    let isDestinationDir = destination.endsWith('/');

    try {
      const destStats = await fsp.stat(destinationPath);

      if (destStats.isDirectory()) {
        isDestinationDir = true;
      }
    } catch {}

    if (isDestinationDir) {
      try {
        const destStats = await fsp.stat(destinationPath);

        if (!destStats.isDirectory()) {
          throw new Error();
        }
      } catch (err) {
        console.error(err);
      }

      destinationPath = path.join(destinationPath, path.basename(source));
    } else {
      const parentDir = path.dirname(destinationPath);

      try {
        const stats = await fsp.stat(parentDir);

        if (!stats.isDirectory()) {
          throw new Error();
        }
      } catch (err) {
        console.error(err);
      }
    }

    try {
      await fsp.rename(sourcePath, destinationPath);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.error('not enough args');
  }
}

moveFile();
