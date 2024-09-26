/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const callback = (error) => {
  if (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Can`t move file.', error);
    throw error;
  }
  console.log('\x1b[32m%s\x1b[0m', 'Successfully moved!');
};

const moveFile = (sourcePath, destinationPath) => {
  fs.stat(destinationPath, (err, stats) => {
    if (stats === undefined && !destinationPath.includes('/')) {
      const newDestinationPath = './' + destinationPath;

      fs.rename(sourcePath, newDestinationPath, callback);
    }

    if (stats === undefined
    && destinationPath.includes('/')
    && !destinationPath.endsWith('/')) {
      const destinationSplitted = destinationPath.split('/');
      const directoryToCheck
      = destinationSplitted.slice(0, destinationSplitted.length - 1).join('/');

      fs.stat(directoryToCheck, (error, newDirStats) => {
        if (newDirStats.isDirectory()) {
          fs.rename(sourcePath, destinationPath, callback);
        } else {
          console.error('\x1b[31m%s\x1b[0m',
            'destination directory does not exist');
          throw error;
        }
      });

      return;
    }

    if (err) {
      console.error('\x1b[31m%s\x1b[0m',
        'destination directory does not exist');
      throw err;
    }

    if (stats.isFile()) {
      fs.rename(sourcePath, destinationPath, callback);
    }

    if (stats.isDirectory()) {
      const sourcePathSplitted = sourcePath.split('/');
      const fileName = sourcePathSplitted[sourcePathSplitted.length - 1];
      const newDestinationPath = destinationPath.endsWith('/')
        ? destinationPath + fileName
        : destinationPath + '/' + fileName;

      fs.rename(sourcePath, newDestinationPath, callback);
    }
  });
};

const [file, moveTo] = process.argv.slice(2);

moveFile(file, moveTo);
