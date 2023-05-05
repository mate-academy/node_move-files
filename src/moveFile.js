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

function moveFile(source, destination) {
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

  const destinationCheckResult = fs.existsSync(destination);

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

  if (destinationPath === '.' && !destinationCheckResult) {
    updatedDestinationPath += destinationExt || sourceExt;

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

  if (!destinationCheckResult) {
    throw new Error('Destination doesn\'t exist');
  };

  if (sourcePath === destinationPath) {
    fs.rename(source, updatedDestinationPath, (error) => {
      if (error) {
        return error;
      }
    });

    return;
  }

  copyFileContentAndMove(source, updatedDestinationPath);
}

module.exports = moveFile;
