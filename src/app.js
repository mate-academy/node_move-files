/* eslint-disable no-console */

const fs = require('fs');
const args = process.argv.slice(2);
const path = require('path');

function moveFile(source, destination) {
  if (!fs.existsSync(source)) {
    console.error('Source file does not exist');

    return;
  }

  let sourceStat;

  try {
    sourceStat = fs.statSync(source);
  } catch (err) {
    console.error(`Error: Cannot stat source: ${err.message}`);

    return;
  }

  if (!sourceStat.isFile()) {
    console.error(`Source is not a file: ${source}`);

    return;
  }

  if (source === destination) {
    return;
  }

  const isDestDirBySlash =
    destination.endsWith(path.sep) ||
    (path.sep === '\\' && destination.endsWith('/'));

  let destIsDirectory = false;
  let destDirPath = destination;

  if (isDestDirBySlash) {
    if (
      !fs.existsSync(destination) ||
      !fs.statSync(destination).isDirectory()
    ) {
      console.error(`Destination directory does not exist: ${destination}`);

      return;
    }
    destIsDirectory = true;
    destDirPath = destination;
  } else if (
    fs.existsSync(destination) &&
    fs.statSync(destination).isDirectory()
  ) {
    destIsDirectory = true;
    destDirPath = destination;
  }

  let finalDest;

  if (destIsDirectory) {
    finalDest = path.join(destDirPath, path.basename(source));
  } else {
    finalDest = destination;
  }

  try {
    fs.renameSync(source, finalDest);
  } catch (err) {
    console.error(`Error: ${err.message}`);
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
