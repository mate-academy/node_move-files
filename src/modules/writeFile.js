'use strict';

const fs = require('fs');

const writeFile = (destinationFileDirectory, data) => {
  try {
    fs.writeFileSync(destinationFileDirectory, data);
    global.console.log('File successfully moved');
  } catch (error) {
    global.console.log('Unable to write file');

    return -1;
  }
};

module.exports = { writeFile };
