/* eslint-disable no-console */

// something new x2

function main() {
  const fs = require('fs');
  const path = require('path');

  if (process.argv.slice(2).length !== 2) {
    console.error('Usage: node app.js <file> <newFile>');
    // throw new Error('Usage: node app.js <file> <newFile>');

    return;
  }

  const [file, newFile] = process.argv.slice(2);

  if (!fs.existsSync(file)) {
    console.error(`${file} doesn't exist`);
    // throw new Error(`${file} doesn't exist`);

    return;
  }

  const srcStats = fs.statSync(file);

  if (!srcStats.isFile()) {
    console.error(`${file} must be a File`);
    // throw new Error(`${file} must be a File`);

    return;
  }

  const destExists = fs.existsSync(newFile);
  const stats = destExists ? fs.statSync(newFile) : null;
  const fileName = path.basename(file);
  const parentDir = path.dirname(newFile);

  if (newFile.endsWith('/')) {
    if (!destExists) {
      console.error(`${newFile} doesn't exist`);
      // throw new Error(`${newFile} doesn't exist`);

      return;
    }

    const newPath = path.join(newFile, fileName);

    fs.renameSync(file, newPath);

    return;
  }

  if (stats && stats.isDirectory()) {
    const newPath = path.join(newFile, fileName);

    fs.renameSync(file, newPath);

    return;
  }

  if (!fs.existsSync(parentDir)) {
    console.error(`Invalid destination path: ${newFile}`);
    // throw new Error(`Invalid destination path: ${newFile}`);

    return;
  }

  fs.renameSync(file, newFile);
}

main();
