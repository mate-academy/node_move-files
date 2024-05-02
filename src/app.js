/* eslint-disable no-console */
const file1 = process.argv[2];
const file2 = process.argv[3];

const fs = require('fs');
const path = require('path');

/**
 * Moves a file from one location to another.
 * @param {string} urlMain - The source file path.
 * @param {string} urlMoveTo - The destination file path.
 */
function move(urlMain, urlMoveTo) {
  if (!urlMain || !urlMoveTo) {
    console.error('no parameter');

    return;
  }

  if (urlMain === urlMoveTo) {
    return;
  }

  let destination = urlMoveTo;

  if (fs.existsSync(destination)) {
    const { base: fileName } = path.parse(urlMain);

    destination = path.join(destination, fileName);
  }

  fs.rename(urlMain, destination, (error) => {
    if (error) {
      console.error('Error moving file:', error);
    } else {
      console.log('File moved successfully.');
    }
  });
}

move(file1, file2);
