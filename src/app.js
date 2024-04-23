/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  try {
    const [fromLocation, toLocation] = process.argv.slice(2);
    let normalizeToLocation = toLocation;

    if (!fromLocation || !toLocation) {
      throw new Error('Please provide two correct parameters!');
    }

    if (fromLocation === toLocation) {
      return;
    }

    if (fs.existsSync(toLocation) && fs.statSync(toLocation).isDirectory()) {
      const fileName = path.basename(fromLocation);

      normalizeToLocation = path.join(normalizeToLocation, fileName);
    }

    fs.renameSync(fromLocation, normalizeToLocation);
  } catch (error) {
    console.error(error.message);
  }
}

moveFile();
