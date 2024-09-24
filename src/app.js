/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFiles() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    throw new Error(
      'Please enter the correct command: node app.js <source> <destination>',
    );
  }

  const [source, dest] = args;

  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    throw new Error('Source file not found.');
  }

  if (dest.endsWith('/')) {
    if (!fs.existsSync(dest) || !fs.statSync(dest).isDirectory()) {
      throw new Error('Destination folder not found.');
    }

    const newPath = path.join(dest, path.basename(source));

    fs.renameSync(source, newPath);
  } else {
    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      const newPath = path.join(dest, path.basename(source));

      fs.renameSync(source, newPath);
    } else {
      fs.renameSync(source, dest);
    }
  }
}

try {
  moveFiles();
} catch (error) {
  console.error(error.message);
}
