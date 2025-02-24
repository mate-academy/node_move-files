/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');

const main = function () {
  const [pathIn, pathOut] = process.argv.slice(2);

  if (!pathIn || !pathOut) {
    console.error('It must have two passed args.');
  }

  if (!fs.existsSync(pathIn)) {
    console.error('The file does not exists.');
  }

  try {
    let destinationPath = pathOut;

    if (fs.existsSync(pathOut) && fs.statSync(pathOut).isDirectory()) {
      destinationPath = path.join(pathOut, path.basename(pathIn));
    }
    fs.renameSync(pathIn, destinationPath);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

main();
