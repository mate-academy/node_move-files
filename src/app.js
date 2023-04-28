'use strict';

const fs = require('fs');
const path = require('path');
const moveFile = require('./moveFile');

const [source, destination] = process.argv.slice(2);

if (!fs.existsSync(source)) {
  throw Error('file not found');
}

if (!fs.existsSync(path.dirname(destination))) {
  throw Error('this catalog not found');
}

const isDir = destination.endsWith('/');
const destPath = isDir ? destination.slice(0, -1) : destination;
const dirPath = path.dirname(destPath);
const fileName = path.basename(destPath);

const fileContent = fs.readFileSync(path.basename(source));

if (path.extname(fileName)) {
  moveFile(dirPath, fileName, fileContent, source);
} else {
  moveFile(destPath, path.basename(source), fileContent, source);
}
