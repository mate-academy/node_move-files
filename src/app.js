/* eslint-disable no-console */
// write code here
const fs = require('fs');

const [sourceFile, destinationDir] = process.argv.slice(2);

if (!sourceFile || !destinationDir) {
  console.error('Source file and destination directory are required.');
  process.exit(0);
}

if (sourceFile === destinationDir) {
  process.exit(0);
}

if (!fs.existsSync(sourceFile)) {
  console.error('Source file does not exist.');
  process.exit(0);
}

if (!fs.statSync(sourceFile).isFile()) {
  console.error('Source file is not a file.');
  process.exit(0);
}

const path = require('path');
const fileName = path.basename(sourceFile);
const fileRoad = path.join(destinationDir, fileName);
const isDirectory =
  fs.existsSync(destinationDir) && fs.statSync(destinationDir).isDirectory();

if (destinationDir.endsWith('/') && !isDirectory) {
  console.error('Destination directory does not exist.');
  process.exit(0);
}

if (isDirectory) {
  fs.renameSync(sourceFile, fileRoad);
  process.exit(0);
}

const pathParent = path.dirname(destinationDir);

if (!fs.existsSync(pathParent)) {
  console.error('Parent directory does not exist.');
  process.exit(0);
}

fs.renameSync(sourceFile, destinationDir);
process.exit(0);
