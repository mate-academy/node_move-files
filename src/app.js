/* eslint-disable no-console */

const fs = require('fs');
const args = process.argv.slice(2);
const path = require('path');

function moveFile(source, destination) {
  if (!fs.existsSync(source)) {
    console.error('Source file does not exist');

    return;
  }

  if (source !== destination) {
    try {
      if (
        fs.existsSync(destination) &&
        fs.statSync(destination).isDirectory()
      ) {
        fs.renameSync(source, path.join(destination, path.basename(source)));
      } else {
        fs.renameSync(source, destination);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }
}

if (args.some((a) => a.startsWith('--') || a.startsWith('-'))) {
  console.error('Error: flags/options are not supported');
} else if (args.length !== 2 || args.some((a) => typeof a !== 'string')) {
  console.error(
    'Error: exactly two correct positional arguments are required.',
  );
} else {
  moveFile(path.resolve(args[0]), path.resolve(args[1]));
}
