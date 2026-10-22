// write code here
'use strict';

const fs = require('fs');
const path = require('path');

function moveFiles() {
  try {
    const data = process.argv.slice(2);

    if (data.length < 2) {
      throw new Error('Script accepts 2 arguments: source and destination');
    }

    const source = data[0];
    const destination = data[1];

    if (!fs.statSync(source).isFile()) {
      throw new Error('Source should be a file');
    }

    const isEndsWith = destination.endsWith('/');
    const isExistsPath = fs.existsSync(destination);

    if (isEndsWith && !isExistsPath) {
      throw new Error("The folder doesn't exist");
    }

    const isDirectory = isExistsPath && fs.statSync(destination).isDirectory();
    let newPath = destination;

    if (isDirectory) {
      const nameOfFile = path.basename(source);

      newPath = path.join(destination, nameOfFile);
    }

    fs.renameSync(source, newPath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

moveFiles();
