/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  try {
    const [source, destination] = process.argv.slice(2);
    let finalDestination = destination;

    if (!source || !destination) {
      throw new Error('Please provide two parameters!');
    } else if (source === destination) {
      return;
    }

    if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
      const fileName = path.basename(source);

      finalDestination = path.join(finalDestination, fileName);
    }

    fs.renameSync(source, finalDestination);

    console.log('File moved successfully');
  } catch (error) {
    console.error(error.message);
  }
}

moveFile();
