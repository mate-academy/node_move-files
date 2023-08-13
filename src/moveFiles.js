/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFiles(firstPath, secondPath) {
  const folder = path.dirname(secondPath);

  if (!fs.existsSync(folder)) {
    console.log(`Folder ${folder} does not exists.`);

    return;
  }

  if (!fs.existsSync(firstPath)) {
    console.log(`File ${firstPath} does not exists.`);

    return;
  }

  fs.rename(firstPath, secondPath, (err) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log(`${firstPath} has been moved to ${folder}`);
    }
  });
};

module.exports = { moveFiles };
