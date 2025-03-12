/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  try {
    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination);

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file "${source}" does not exist.`);
    }

    const sourceStats = fs.statSync(sourcePath);

    if (!sourceStats.isFile()) {
      throw new Error(`"${source}" is not a file.`);
    }

    let targetPath = destinationPath;

    if (
      destination.endsWith(path.sep) ||
      (fs.existsSync(destinationPath) &&
        fs.statSync(destinationPath).isDirectory())
    ) {
      if (!fs.existsSync(destinationPath)) {
        throw new Error(
          `Destination directory "${destination}" does not exist.`,
        );
      }
      targetPath = path.join(destinationPath, path.basename(source));
    }

    fs.renameSync(sourcePath, targetPath);
    console.log(`File moved from "${source}" to "${targetPath}"`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = {
  moveFile,
};
