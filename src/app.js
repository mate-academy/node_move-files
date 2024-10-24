/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const moveFile = (targetFile, moveTo) => {
  try {
    if (targetFile === moveTo) {
      console.log('Initial file and target destination are the same');

      return;
    }

    let targetIsDirectory = false;

    if (fs.existsSync(moveTo)) {
      targetIsDirectory = fs.lstatSync(moveTo).isDirectory();
    } else if (moveTo.endsWith('/')) {
      console.error('Error: Destination directory does not exist');

      return;
    }

    const destinationPath = targetIsDirectory
      ? path.join(moveTo, path.basename(targetFile))
      : moveTo;

    fs.rename(targetFile, destinationPath, (err) => {
      if (err) {
        console.error('Error happened during the rename operation:', err);
      } else {
        console.log('File moved/renamed successfully!');
      }
    });
  } catch (error) {
    console.error('Error happened during try/catch block:', error);
  }
};

const params = process.argv.slice(2);

if (params.length < 2) {
  console.error('No params provided');
} else {
  moveFile(...params);
}

module.exports = {
  moveFile,
};
