/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const comands = process.argv.slice(2);

const name = path.basename(comands[0]);

fs.readFile(comands[1], 'utf-8', (err, data) => {
  if (err.code === 'EISDIR') {
    fs.rename(comands[0], `${comands[1]}/${name}`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  } else {
    fs.rename(comands[0], comands[1], (error1) => {
      if (error1) {
        console.log(error1);
      }
    });
  }
});
