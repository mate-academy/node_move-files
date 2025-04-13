/* eslint-disable no-console */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const commands = process.argv.slice(2);
const [filePath, destinationPath] = commands;

let currDir = null;
let destDir = null;
let currFile = null;
let destFile = null;

try {
  if (typeof filePath === 'string') {
    currDir = path.dirname(filePath);
    currFile = path.basename(filePath);
  }

  if (typeof destinationPath === 'string') {
    destDir = path.dirname(destinationPath);
    destFile = path.basename(destinationPath) || currFile;
  }

  if (conditionsCheck()) {
    moveFile(filePath, destinationPath);
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
}

function conditionsCheck() {
  if (!filePath || !destinationPath) {
    throw new Error('Check arguments in command line');
  }

  if (isDirectory(filePath)) {
    throw new Error('Source is a directory!');
  }

  if (!fs.existsSync(destDir) && !destinationPath.endsWith(path.sep)) {
    throw new Error('Destination directory does not exist!');
  }

  return true;
}

function isDirectory(somePath) {
  try {
    const stats = fs.statSync(somePath);

    return stats.isDirectory();
  } catch {
    return false;
  }
}

function isLikeDirectory(destPath) {
  if (fs.existsSync(destPath)) {
    try {
      return fs.statSync(destPath).isDirectory();
    } catch {
      return false;
    }
  }

  return destPath.endsWith(path.sep);
}

function renameOrMove() {
  if (currDir === destDir && currFile === destFile) {
    return 'noop';
  }

  if (currDir === destDir && currFile !== destFile) {
    return 'rn';
  }

  if (currDir !== destDir) {
    if (currFile === destFile) {
      return 'mv';
    } else {
      return 'rnmv';
    }
  }
}

function moveFile(pathFrom, pathTo) {
  let destination = pathTo;

  if (isLikeDirectory(pathTo)) {
    destination = path.join(pathTo, currFile);
  }

  const action = renameOrMove();

  if (action === 'noop') {
    console.log('Nothing to do: source and destination are equal.');

    return;
  }

  const phrase =
    action === 'rn'
      ? 'renamed'
      : action === 'mv'
        ? 'moved'
        : action === 'rnmv'
          ? 'renamed and moved'
          : 'processed';

  if (!fs.existsSync(pathFrom)) {
    throw new Error('Wrong path to file');
  }

  fs.rename(pathFrom, destination, (error) => {
    if (error) {
      console.error(
        `Error occurred while trying to rename or move a file: ${error.message}`,
      );
    } else {
      console.log(`✅ File ${phrase} successfully!`);
    }
  });
}
