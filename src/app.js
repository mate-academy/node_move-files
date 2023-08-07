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

  try {
    const data = fs.readFileSync(source);

    if (dest.endsWith(source.split('.')[1])) {
      fs.renameSync(source, dest);

      return;
    }

    if (!fs.existsSync(dest)) {
      throw new Error('No such directory');
    }

    const sourceArr = source.split('/');
    const filename = sourceArr[sourceArr.length - 1];

    fs.rmSync(source);

    fs.writeFileSync(
      path.join(dest, filename),
      data,
    );
  } catch (e) {
    console.error(e);
  }
};

moveFile();
