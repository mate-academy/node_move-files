/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [from, to] = process.argv.slice(2);

async function moveFiles(source, dest) {
  const fullPathSource = path.resolve(source);
  let fullPathDest = path.resolve(dest);
  const fileName = path.basename(fullPathSource);

  if (fs.existsSync(fullPathDest) && fs.statSync(fullPathDest).isDirectory()) {
    fullPathDest = path.join(fullPathDest, fileName);
  }

  try {
    fs.renameSync(fullPathSource, fullPathDest);
  } catch (e) {
    throw new Error(e);
  }
};

moveFiles(from, to);
