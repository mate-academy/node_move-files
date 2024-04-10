/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const [sourcePath, destPath] = process.argv.slice(2);

if (!sourcePath || !destPath) {
  console.error('You should provide 2 params');
}

if (sourcePath !== destPath) {
  try {
    const fileName = path.basename(sourcePath);
    const fullPathSource = path.resolve(sourcePath);
    const fullPathDest = fs.existsSync(destPath)
      ? path.join(destPath, fileName)
      : path.resolve(destPath);

    fs.renameSync(fullPathSource, fullPathDest);
    console.log('File moved successfully');
  } catch (error) {
    console.error('An error occured: ', error);
  }
}
