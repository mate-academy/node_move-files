/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [paramFile, paramDestination] = process.argv.slice(2);

const green = '\x1b[32m';
const red = '\x1b[31m';

const logs = {
  arguments: () => {
    console.log(
      `${red}You need to write the old file name and the new path. \x1b[0m`
       + `\nLike ${green}node ./src/moveFile.js file.txt ./someDir/`
    );
  },
  directory: () => {
    console.log(
      `${red}The directory does not exist`
    );
  },
  error: () => {
    console.log(
      `${red}Something went wrong. Try again!`
    );
  },
  success: (destinationPath) => {
    console.log(
      `${green}Success!`
      + `\nMoved to: ${destinationPath}`
    );
  },
};

function moveFile(file, destination) {
  if (!file || !destination) {
    logs.arguments();

    return;
  }

  const filePath = path.join(__dirname, file);
  const destinationPath = path.join(__dirname, destination);
  const fileName = path.basename(filePath);
  const isValid = destination.endsWith('/');

  if (isValid && !fs.existsSync(destinationPath)) {
    logs.directory();
  }

  try {
    fs.renameSync(
      filePath,
      isValid ? path.join(destinationPath, fileName) : destinationPath,
    );
    logs.success(destinationPath);
  } catch (err) {
    logs.error();
  }
}

moveFile(paramFile, paramDestination);
