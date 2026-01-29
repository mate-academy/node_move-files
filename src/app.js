/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFiles() {
  const source = process.argv[2];
  let destination = process.argv[3];

  if (!source || !destination) {
    console.error('Usage: node index <source> <destination>');

    return;
  }

  try {
    const srcStats = fs.statSync(source);

    if (!srcStats.isFile()) {
      console.error('Source is not a file');

      return;
    }

    const isTargetDir = destination.endsWith('/') || destination.endsWith('\\');
    const destExists = fs.existsSync(destination);
    const isDestDir = destExists && fs.lstatSync(destination).isDirectory();

    if (isTargetDir || isDestDir) {
      if (!destExists && isTargetDir) {
        console.error('Error: Detination directory does not exist.');

        return;
      }

      destination = path.join(destination, path.basename(source));
    }

    fs.renameSync(source, destination);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('Error: File or directory not found.');
    } else {
      console.error(`Error: ${err.message}`);
    }
  }
}

moveFiles();
