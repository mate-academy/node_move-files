/* eslint-disable no-console */
'use strict';

const fs = require('fs-extra');
const path = require('path');

const [from, to] = process.argv.slice(2);

async function moveFiles(source, dest) {
  if (!source || !dest) {
    throw new Error('no params');
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
    await fs.rename(fullPathSource, fullPathDest);
    console.log('Success!');
  } catch (e) {
    throw new Error(e);
  };
};

moveFiles(from, to);
