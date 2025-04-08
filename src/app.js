/* eslint-disable no-console */
// write code here

const fs = require('fs');
const path = require('path');

const moveFiles = () => {
  const params = process.argv.slice(2);

  if (params.length < 2) {
    console.error('There are missing arguments');

    return;
  }

  const source = params[0];
  const destination = params[1];

  if (!fs.existsSync(source)) {
    console.error('Source not exist');

    return;
  }

  if (!fs.statSync(source).isFile()) {
    console.error('Source is not a file');

    return;
  }

  let finalDestination = destination;

  if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
    const fileName = path.basename(source);

    finalDestination = path.join(destination, fileName);
  } else if (destination.endsWith('/')) {
    console.error('Destination directory does not exist');

    return;
  } else {
    const destDir = path.dirname(destination);

    if (!fs.existsSync(destDir)) {
      console.error('Destination directory does not exist');

      return;
    }
  }

  if (source === finalDestination) {
    console.log('Source and destination are the same');

    return;
  }

  try {
    fs.renameSync(source, finalDestination);
  } catch (err) {
    console.error(err);
  }
};

moveFiles();
