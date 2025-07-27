/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');

const moveFiles = async () => {
  const sourcePath = process.argv[2];
  let destinationPath = process.argv[3];

  if (!sourcePath || !destinationPath) {
    console.error(
      'Missing arguments: please provide source and destination paths',
    );

    return;
  }

  try {
    const sourceStat = await fs.stat(sourcePath);

    if (!sourceStat.isFile()) {
      console.error('Source path is not a file:', sourcePath);

      return;
    }

    let destinationStat;

    try {
      destinationStat = await fs.stat(destinationPath);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    if (destinationStat && destinationStat.isDirectory()) {
      const fileName = path.basename(sourcePath);

      destinationPath = path.join(destinationPath, fileName);
    }

    await fs.rename(sourcePath, destinationPath);
    console.log('File moved successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File or directory does not exist');
    } else {
      console.error('Error moving file:', err.message);
    }
  }
};

moveFiles();

module.exports = moveFiles;
