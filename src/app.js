/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');

const sourcePath = process.argv[2];
let destinationPath = process.argv[3];

const moveFiles = async () => {
  if (!sourcePath || !destinationPath) {
    console.error('Error: Source file and destination path must be specified');

    return;
  }

  try {
    const sourceStats = await fs.stat(sourcePath);

    if (!sourceStats.isFile()) {
      console.error(`Source path '${sourcePath}' is not a file`);

      return;
    }

    let destStats;

    try {
      destStats = await fs.stat(destinationPath);
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }

    if (destStats && destStats.isDirectory()) {
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
