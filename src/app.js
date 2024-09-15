/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');

async function moveFile() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    throw new Error('Please provide source and destination paths');
  }

  if (source === destination) {
    return;
  }

  let destinationDir = destination;
  let destinationFile = destination;

  try {
    const stat = await fs.stat(destination);

    if (stat.isDirectory()) {
      destinationDir = destination;
      destinationFile = path.join(destination, path.basename(source));
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error(err);
    }
    destinationDir = path.dirname(destination);
  }

  const sourceDir = path.dirname(source);

  try {
    await fs.access(destinationDir);

    if (destinationDir === sourceDir) {
      await fs.rename(source, destinationFile);
    } else {
      await fs.copyFile(source, destinationFile);
      await fs.unlink(source);
    }

    console.log('File moved successfully');
  } catch (err) {
    throw new Error(err);
  }
}

moveFile().catch((err) => console.error(err));
