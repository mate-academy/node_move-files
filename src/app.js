'use strict';

const fs = require('fs');
const path = require('path');

const [enteredSourcePath, enteredPath] = process.argv.slice(2);

const resolvedPath = path.resolve(__dirname, '../', enteredPath);

const resolvedSourcePath = path.resolve(__dirname, '../', enteredSourcePath);
const fileName = enteredSourcePath.split('/').slice(-1);


const moveFile = (sourceFilePath, destinationFilePath) => {
  try {
    fs.copyFileSync(sourceFilePath, destinationFilePath);
  } catch (error) {
    throw new Error(`An error ocurred during copying file: ${error}`);
  }

  try {
    fs.rmSync(sourceFilePath)
  } catch (error) {
    throw new Error(`An error ocurred during removing the old file: ${error}`);
  }

  console.info('File successfully moved');
}

const getStats = (path) => {
  try {
    const stats = fs.statSync(path);
    return stats;
  } catch (_e) {
    console.info('Invalid path entered. Trying to rename file...');
  }
}

const renameFile = (fileToRename, newFileName) => {
  try {
    fs.renameSync(fileToRename, newFileName);
  } catch (error) {
    console.error('An error ocurred during renaming file:', error);
  }

  console.info('File successfully renamed');
}

const stats = getStats(resolvedPath);

if (stats && stats.isDirectory()) {
  moveFile(resolvedSourcePath, `${resolvedPath}/${fileName}`)
} else if (enteredPath.slice(-1) === '/') {
  throw new Error('Invalid destination path')
} else {
  renameFile(resolvedSourcePath, `${resolvedPath}`)
}