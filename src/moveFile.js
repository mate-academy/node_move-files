const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  try {
    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination);

    // Check if the source file exists
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file "${source}" does not exist.`);
    }

    // Check if the source is a file
    const sourceStats = fs.statSync(sourcePath);

    if (!sourceStats.isFile()) {
      throw new Error(`"${source}" is not a file.`);
    }

    let targetPath = destinationPath;

    // If the destination ends with '/', treat it as a directory
    if (
      destination.endsWith(path.sep) ||
      (fs.existsSync(destinationPath) &&
        fs.statSync(destinationPath).isDirectory())
    ) {
      // Ensure the destination directory exists
      if (!fs.existsSync(destinationPath)) {
        throw new Error(
          `Destination directory "${destination}" does not exist.`,
        );
      }
      targetPath = path.join(destinationPath, path.basename(source));
    }

    fs.renameSync(sourcePath, targetPath);
    // eslint-disable-next-line no-console
    console.log(`File moved from "${source}" to "${targetPath}"`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${error.message}`);
  }
}

module.exports = {
  moveFile,
};
