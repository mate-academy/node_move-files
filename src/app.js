/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [from, to] = process.argv.slice(2);

function moveFiles(source, dest) {
  if (!source || !dest) {
    console.error('no params');

    return;
  }

  if (source === dest) {
    return;
  }

  const fullPathSource = path.resolve(source);
  let fullPathDest = path.resolve(dest);
  const fileName = path.basename(fullPathSource);

  if (fs.existsSync(fullPathDest)) {
    fullPathDest = path.join(fullPathDest, fileName);
  }

  try {
    fs.renameSync(fullPathSource, fullPathDest);
    console.log('Success!');
  } catch (e) {
    console.error(e);
  };
};

moveFiles(from, to);
