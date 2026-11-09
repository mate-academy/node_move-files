'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [originalFilePath, destinationPath] = process.argv.slice(2);

  try {
    if (process.argv.length < 4) {
      throw new Error('Please input 2 params');
    }

    if (!fs.existsSync(originalFilePath)) {
      throw new Error(`Original path doesn't exist!`);
    }

    if (
      path.dirname(originalFilePath) === path.dirname(destinationPath) &&
      !fs.existsSync(destinationPath)
    ) {
      fs.rename(originalFilePath, destinationPath, function (error) {
        if (error) {
          throw new Error(`Couldn't move file`);
        }
      });

      return;
    }

    if (!fs.existsSync(path.dirname(destinationPath))) {
      throw new Error(`Directory path doesn't exist`);
    }

    try {
      fs.statSync(destinationPath).isDirectory();
    } catch (error) {
      fs.rename(originalFilePath, destinationPath, function (err) {
        if (err) {
          throw new Error(`Couldn't move file`);
        }
      });

      return;
    }

    if (fs.statSync(destinationPath).isDirectory()) {
      const fileName = originalFilePath.split('/');

      fs.rename(
        originalFilePath,
        destinationPath + '/' + fileName[fileName.length - 1],
        function (error) {
          if (error) {
            throw new Error(`Couldn't move file`);
          }
        },
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

moveFile();
