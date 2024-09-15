/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const moveFilesApp = (source, destination) => {
  if (!source && !destination) {
    console.error('No arguments provided');

    return;
  }

  if (source === destination) {
    return;
  }

  if (!source || !destination) {
    console.error('One argument is missing');

    return;
  }

  let destinationPath = path.resolve(destination);

  const checkPathIsDirectory = () => {
    try {
      const isExists = fs.existsSync(destinationPath);
      const isDirectory = fs.lstatSync(destinationPath).isDirectory();

      return isExists && isDirectory;
    } catch (error) {
      return false;
    }
  };

  const isDestPathDirectory = checkPathIsDirectory(destinationPath);

  destinationPath = isDestPathDirectory
    ? path.join(destinationPath, path.basename(source))
    : destinationPath;

  const moveFiles = () => {
    try {
      fs.renameSync(source, destinationPath);
    } catch (error) {
      console.error(error);
    }
  };

  moveFiles();
};

const [origin, move] = process.argv.slice(2);

moveFilesApp(origin, move);
