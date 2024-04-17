/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [file, destination] = process.argv.slice(2);
const isExist = fs.existsSync(destination);

if (!file || !destination) {
  console.error('Need file and destination');
} else if (destination.endsWith('/') && !isExist) {
  console.error('Destination directory does not exist');
} else {
  const { name, base } = path.parse(file);
  const parsedDestination = path.parse(destination);

  if (file !== destination) {
    try {
      const fileToMove = fs.readFileSync(file, 'utf-8');
      const isDirectory = isExist && fs.lstatSync(destination).isDirectory();

      if (
        destination.endsWith('/') ||
        (!parsedDestination.ext && isDirectory)
      ) {
        fs.writeFileSync(path.join(destination, base), fileToMove);
      } else if (isExist) {
        fs.renameSync(destination, name);
        fs.writeFileSync(destination, fileToMove);
      } else {
        fs.writeFileSync(destination, fileToMove);
      }

      fs.unlinkSync(file);
    } catch (error) {
      console.error(error);
    }
  }
}
