'use strict';

const fs = require('fs');
const path = require('path');

const move = () => {
  const source = process.argv[2];
  let destination = process.argv[3];

  if (source === destination) {
    return;
  }

  const fileName = path.basename(source);
  const filePath = path.resolve(path.dirname(source));

  if (destination[destination.length - 1] === '/') {
    destination = path.resolve(destination, fileName);
  } else if (!destination.includes('.') && !destination.includes('/')) {
    try {
      fs.accessSync(path.join(filePath, destination));

      destination = path.join(filePath, destination, fileName);
    } catch (error) {
      destination = path.join(filePath, destination);
    }
  }

  fs.rename(source, destination, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
};

module.exports = {
  move,
};
