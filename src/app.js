/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.slice(2);
  const [source, destination] = args;

  if (!source || !destination) {
    console.error('Both source and destination are required');

    return;
  }

  if (!fs.existsSync(source)) {
    console.error('Source file does not exist');

    return;
  }

  const sourceStat = fs.statSync(source);

  if (!sourceStat.isFile()) {
    console.error('Source is not a file');

    return;
  }

  let targetDestination = destination;

  if (fs.existsSync(destination)) {
    const destinationStat = fs.statSync(destination);

    if (destinationStat.isDirectory()) {
      targetDestination = path.join(destination, path.basename(source));
    }
  } else {
    if (destination.endsWith(path.sep)) {
      console.error('Destination directory does not exist');

      return;
    }

    const parentDir = path.dirname(destination);

    if (!fs.existsSync(parentDir)) {
      console.error('Parent directory does not exist');

      return;
    }
  }

  try {
    fs.renameSync(source, targetDestination);
  } catch (e) {
    console.error(e.message);
  }
}

moveFile();
