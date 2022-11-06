'use strict';

const fs = require('fs');
const path = require('path');

const mv = (fileToMove, dest) => {
  try {
    const file = fs.readFileSync(path.join(__dirname, fileToMove));

    fs.writeFileSync(path.join(__dirname, dest), file, 'utf-8');

    fs.rm(path.join(__dirname, fileToMove), err => {
      if (err) {
        throw new Error(err);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

mv('./test/file.txt', './test/folder/new_name.txt');

module.exports = { mv };
