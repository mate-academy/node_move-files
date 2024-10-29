'use strict';

/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('node:path');

const moveFile = (source, destination) => {
  if (!fs.existsSync(source)) {
    console.error(`Error: Source file does not exist: ${source}`);
    return;
  }

  if (source === destination) {
    return;
  }

  let finalDestination = destination;

  if (
    (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) ||
    destination.endsWith('/')
  ) {
    finalDestination = path.join(destination, path.basename(source));
  }

  try {
    const fileData = fs.readFileSync(source, 'utf8');

    try {
      fs.writeFileSync(finalDestination, fileData, 'utf8');
      fs.rmSync(source, { force: true });
    } catch (e) {
      console.error(`Error writing file: ${finalDestination}\n${e.message}`);
    }
  } catch (e) {
    console.error(`Error reading file: ${source}\n${e.message}`);
  }
};

const params = process.argv.slice(2);

if (params.length !== 2) {
  console.error(
    'Error: Exactly 2 parameters are required (source and destination paths).',
  );
} else {
  moveFile(...params);
}

module.exports = { moveFile };
