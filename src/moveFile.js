'use strict';

const fs = require('fs');
const path = require('path');

function copyFileContentAndMove(source, destination) {
  try {
    const fileContent = fs.readFileSync(source, (err) => {
      if (err) {
        return err;
      }
    });

    fs.writeFileSync(destination, fileContent, (err) => {
      if (err) {
        return err;
      }
    });

    fs.unlink(source, (err) => {
      if (err) {
        return err;
      }
    });
  } catch (error) {
    throw error;
  }
}

function moveFile(command, source, destination) {
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

    switch (true) {
      case sourcePath === destinationPath:
        fs.rename(source, updatedDestinationPath, (error) => {
          if (error) {
            return error;
          }
        });
        break;

      case destinationPath === '.' && !destinationCheckResult:
        updatedDestinationPath = destinationExt ? destination
          : destination + sourceExt;

        fs.rename(
          source,
          path.join(sourcePath, updatedDestinationPath),
          (error) => {
            if (error) {
              return error;
            }
          }
        );
        break;

      default:
        copyFileContentAndMove(source, updatedDestinationPath);
    }
  } else {
    return 'wrong command';
  }
}

module.exports = moveFile;
