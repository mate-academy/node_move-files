/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const arg = process.argv.slice(2);

  const source = arg[0];
  const destination = arg[1];

  if (!source || !destination) {
    console.error('Invalid arguments');

    return;
  }

  if (source === destination) {
    return;
  }

  let finalDestination = destination;

  if (
    destination.endsWith('/') ||
    (fs.existsSync(destination) && fs.statSync(destination).isDirectory())
  ) {
    finalDestination = path.join(destination, path.basename(source));
  }

  try {
    fs.renameSync(source, finalDestination);
  } catch (error) {
    console.error(error.message);
  }
}

moveFile();
