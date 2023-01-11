'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const getParsedArgv = () => {
  const [enteredSourcePath, enteredDestinationPath] = process.argv.slice(2);
  const basePath = path.resolve(__dirname, '../');

  const resolvedDestinationPath = path
    .resolve(basePath, enteredDestinationPath);
  const resolvedSourcePath = path.resolve(basePath, enteredSourcePath);

  const baseName = path.basename(enteredSourcePath);

  return {
    sourcePath: resolvedSourcePath,
    destinationPath: resolvedDestinationPath,
    fileName: baseName,
  };
}

const getStats = (pathToGetStats) => {
  try {
    return fs.statSync(pathToGetStats);
  } catch (_error) {
    console.info('Invalid path entered. Trying to rename file...');
  }
}

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

const renameFile = (fileToRename, newFileName) => {
  try {
    fs.renameSync(fileToRename, newFileName);
  } catch (error) {
    console.error('An error ocurred during renaming file:', error);
  }

  console.info('File successfully renamed');
}

const main = () => {
  const { sourcePath, destinationPath, fileName } = getParsedArgv(); 
  const stats = getStats(destinationPath);

  if (stats && stats.isDirectory()) {
    moveFile(sourcePath, `${destinationPath}/${fileName}`)
  } else if (destinationPath.endsWith('/')) {
    throw new Error('Invalid destination path')
  } else {
    renameFile(sourcePath, `${destinationPath}`)
  }
}

main();
