'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.slice(2);

  try {
    if (process.argv.length !== 4) {
      throw new Error('Please input 2 params');
    }

    const [originalFilePath, destinationPath] = args;

    if (!fs.existsSync(originalFilePath)) {
      throw new Error("Original path doesn't exist!");
    }

    if (!fs.statSync(originalFilePath).isFile()) {
      throw new Error('Original path is not a file!');
    }

    let finalDestination = destinationPath;
    const endsWithSlash = destinationPath.endsWith('/');

    if (endsWithSlash) {
      if (
        !fs.existsSync(destinationPath) ||
        !fs.statSync(destinationPath).isDirectory()
      ) {
        throw new Error("Directory path doesn't exist");
      }

      finalDestination = path.join(
        destinationPath,
        path.basename(originalFilePath),
      );
    } else if (
      fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory()
    ) {
      finalDestination = path.join(
        destinationPath,
        path.basename(originalFilePath),
      );
    } else {
      const parentDir = path.dirname(destinationPath);

      if (
        parentDir &&
        parentDir !== '.' &&
        (!fs.existsSync(parentDir) || !fs.statSync(parentDir).isDirectory())
      ) {
        throw new Error("Directory path doesn't exist");
      }
    }

    fs.rename(originalFilePath, finalDestination, (error) => {
      if (error) {
        throw new Error("Couldn't move file");
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

moveFile();
