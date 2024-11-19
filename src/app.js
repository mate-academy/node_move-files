/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const fun = (firsts, seconds) => {
  if (!fs.existsSync(firsts)) {
    console.error(`Source file does not exist: ${firsts}`);

    return;
  }

  const destination =
    fs.existsSync(seconds) && fs.statSync(seconds).isDirectory()
      ? path.join(seconds, path.basename(firsts))
      : seconds;

  try {
    fs.renameSync(firsts, destination);
    console.log(`File moved to ${destination}`);
  } catch (e) {
    console.error(`Failed to move file: ${e.message}`);
  }
};

const first = process.argv[2];
const second = process.argv[3];

fun(first, second);
