/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');

const [sourcePath, destinationPath] = process.argv.slice(2);

const moveFile = async () => {
  if (!sourcePath || !destinationPath) {
    console.error('No source or destination provided');

    return;
  }

  try {
    await fs.access(sourcePath);
  } catch {
    console.error("Source file doesn't exist");

    return;
  }

  let destinationPathFull = destinationPath;

  try {
    const destStat = await fs.lstat(destinationPath);

    if (destStat.isDirectory()) {
      destinationPathFull = path.join(
        destinationPath,
        path.basename(sourcePath),
      );
    }
  } catch (err) {
    if (err.code === 'ENOENT' && destinationPath.endsWith('/')) {
      console.error("Destination directory doesn't exist");

      return;
    } else if (err.code !== 'ENOENT') {
      console.error('Error reading destination path:', err);

      return;
    }
  }

  if (path.resolve(sourcePath) === path.resolve(destinationPathFull)) {
    console.log('Source and destination paths are the same. Nothing to move.');

    return;
  }

  try {
    await fs.copyFile(sourcePath, destinationPathFull);
    await fs.rm(sourcePath);
    console.log('The file was moved successfully.');
  } catch (err) {
    console.error('Error moving file', err);
  }
};

moveFile();
