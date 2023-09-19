/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const moveToDir = (file, targetDir, nameOfTheFile) => {
  fs.readdir(targetDir, (err) => {
    if (err) {
      return console.log(err.message);
    }

    const fileData = fs.readFileSync(file, 'utf8');

    fs.writeFileSync(path.join(targetDir, nameOfTheFile), fileData);
    fs.rmSync(file);
  });
};

module.exports = { moveToDir };
