/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.splice(2);
  const [source, dest] = args;

  if (!source || !dest) {
    throw new Error('File name and destination are required!');
  }

  const normalizeSource = path.join(__dirname, source);
  const normalizeDestination = path.join(__dirname, dest);

  try {
    const data = fs.readFileSync(normalizeSource, 'utf8');

    if (dest.endsWith(source.split('.')[1])) {
      fs.renameSync(normalizeSource, normalizeDestination);

      return;
    }

    if (!fs.existsSync(normalizeDestination)) {
      throw new Error('No such directory');
    }

    const sourceArr = source.split('/');
    const filename = sourceArr[sourceArr.length - 1];

    fs.rmSync(normalizeSource);

    fs.writeFileSync(
      path.join(normalizeDestination, filename),
      data,
      'utf8',
    );
  } catch (e) {
    console.error(e);
  }
};

moveFile();
