/* eslint-disable no-console */
// write code here
const fs = require('fs');
const path = require('path');

const moveFiles = () => {
  const args = process.argv.slice(2);

  const [fileName, newPath] = args;

  if (args.length < 2) {
    console.error('You need fileName and destination');

    return;
  }

  try {
    const isDirectory =
      fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory();

    const updatedPath = isDirectory
      ? path.join(newPath, path.basename(fileName))
      : newPath;

    fs.renameSync(fileName, updatedPath);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

moveFiles();

module.exports = {
  moveFiles,
};
