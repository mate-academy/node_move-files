/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const { terminal } = require('./terminal');

const [,, sourcePath, destinationPath] = process.argv;

const moveFileToDirectory = (source, destination) => {
  if (process.argv.length < 4) {
    console.log('Please, enter correct file name and destination to move');
    start();

    return;
  }

  const isDirectory = destination.endsWith('/');
  const newDestinationPath = isDirectory
    ? path.join(destination, path.basename(source))
    : destination;

  if (!fs.existsSync(source)) {
    console.error('Source file doesnt exist');
    start();

    return;
  }

  if (source === newDestinationPath) {
    console.error('You cant move file to the same folder');
    start();

    return;
  }

  if (!fs.existsSync(newDestinationPath) && isDirectory) {
    console.error('This directory doesnt exist');
    start();

    return;
  }

  fs.rename(source, newDestinationPath, (error) => {
    if (error) {
      console.error(error);
    }

    console.log('Operation was done');
    terminal.close();
  });
};

const start = () => {
  terminal.question(
    'To move a file u need to write: "move /file-to-copy/ /new-file/" ',
    () => moveFileToDirectory(sourcePath, destinationPath),
  );
};

start();
