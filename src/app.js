/* eslint-disable no-console */
'use strict';

const path = require('path');
const fs = require('fs');

function move(path1, path2) {
  if (!path1 || !path2) {
    console.error('2 arguments are required');

    return;
  }

  let destination = path.join(process.cwd(), path2);

  if (!fs.existsSync(path1)) {
    console.error(`${path1} doesn't exist`);

    return;
  }

  if (!fs.existsSync(path.dirname(destination))) {
    console.error(`${destination} doesn't exist`);

    return;
  }

  if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
    destination = path.join(destination, path.basename(path1));
  }

  fs.renameSync(path1, destination);
}

move(...process.argv.slice(2));
