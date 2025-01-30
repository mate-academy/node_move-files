const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  try {
    if (!source || !destination) {
      throw new Error('Source and destination are required');
    }

    if (source === destination) {
      return;
    }

    const sourcePath = path.resolve(source);
    let destinationPath = path.resolve(destination);

    if (!fs.existsSync(sourcePath)) {
      throw new Error('Source file not found');
    }

    fs.statSync(sourcePath, (error, stats) => {
      if (error) {
        throw new Error('Source file not found');
      }

      if (!stats.isFile()) {
        throw new Error('Source is not a file');
      }
    });

    if (
      destinationPath.endsWith('/') ||
      (fs.existsSync(destinationPath) &&
        fs.statSync(destinationPath).isDirectory())
    ) {
      destinationPath = path.join(destinationPath, path.basename(source));
    }

    fs.renameSync(source, destinationPath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

module.exports = {
  moveFile,
};
