/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const [sourcePath, destinationPath] = process.argv.slice(2);

try {
  if (!sourcePath || !destinationPath) {
    throw new Error('Missing arguments');
  }

  if (!fs.statSync(sourcePath).isFile()) {
    throw new Error('Source path is not a file');
  }

  let destinationFilePath;

  if (
    destinationPath.endsWith('/') ||
    (fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory())
  ) {
    const destinationFileName = path.basename(sourcePath);

    destinationFilePath = path.join(destinationPath, destinationFileName);
  } else {
    destinationFilePath = destinationPath;
  }

  fs.renameSync(sourcePath, destinationFilePath);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
