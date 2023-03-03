'use strict';

const fs = require('fs');
const path = require('path');

function moveFileIn(source, destination) {
  if (!source || !destination) {
    throw new Error('Script accepts 2 arguments');
  }

  const isFolder = destination.endsWith('/');
  const isFolerExist = fs.existsSync(destination);

  if (isFolder && !isFolerExist) {
    throw new Error(`The ${destination} directory doesn't exist`);
  }

  const sourceName = path.basename(source);
  const destinationName = isFolder
    ? path.join(destination, sourceName)
    : destination;

  fs.rename(source, destinationName, (error) => {
    if (error) {
      throw new Error(`Code fail with error - ${error.code}`);
    }
  });
}

module.exports = {
  moveFileIn,
};
