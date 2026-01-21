/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function main() {
  const params = process.argv.slice(2);
  const oldFile = params[0];
  let newFile = params[1];

  if (params.length < 2) {
    console.error('2 parameters are required');

    return;
  }

  if (!fs.existsSync(oldFile)) {
    console.error('Source file does not exist');

    return;
  }

  const fileName = path.basename(oldFile);

  const endsWithSlash = newFile.endsWith('/');
  const targetExists = fs.existsSync(newFile);
  const isDirectory = targetExists && fs.lstatSync(newFile).isDirectory();

  if (endsWithSlash || isDirectory) {
    if (!targetExists && endsWithSlash) {
      throw new Error('Destination directory does not exist');
    }

    newFile = path.join(newFile, fileName);
  }

  const targetFolder = path.dirname(newFile);

  if (!fs.existsSync(targetFolder)) {
    console.error('Directory does not exist');

    return;
  }

  fs.renameSync(oldFile, newFile);
}

main();
