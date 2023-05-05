'use strict';

const fs = require('fs');
const path = require('path');

function copyFileContentAndMove(source, destination) {
  try {
    const fileContent = fs.readFileSync(source);

    fs.writeFileSync(destination, fileContent);

    fs.unlinkSync(source);
  } catch (error) {
    throw error;
  }
}

function moveFile(command, source, destination) {
  if (!fs.existsSync(source)) {
    return 'File doesn\'t exist';
  }

  if (command === 'mv') {
    const sourcePath = path.dirname(source);
    const destinationPath = path.dirname(destination);
    const sourceExt = path.extname(source);
    const destinationExt = path.extname(destination);
    const sourceFileName = path.basename(source, path.extname(source));
    let destinationFileName = '';

    if (destination[destination.length - 1] !== '/'
      && destinationPath !== '.') {
      destinationFileName = path.basename(
        destination,
        path.extname(destination)
      );
    }

    let updatedDestinationPath = destination;

    let destinationCheckResult = false;

    destinationCheckResult = fs.existsSync(destination);

    if (destinationExt !== sourceExt && destinationPath !== '.') {
      updatedDestinationPath = path.join(
        destinationPath,
        destinationFileName + sourceExt
      );
    }

    if (!destinationFileName && destinationCheckResult) {
      updatedDestinationPath = path.join(
        destination,
        sourceFileName + sourceExt
      );
    }

    if (sourcePath === destinationPath) {
      fs.rename(source, updatedDestinationPath, (error) => {
        if (error) {
          return error;
        }
      });

      return;
    }

    if (destinationPath === '.' && !destinationCheckResult) {
      fs.rename(
        source,
        path.join(sourcePath, updatedDestinationPath),
        (error) => {
          if (error) {
            return error;
          }
        }
      );

      return;
    }

    copyFileContentAndMove(source, updatedDestinationPath);
  } else {
    return 'wrong command';
  }
}

module.exports = moveFile;
