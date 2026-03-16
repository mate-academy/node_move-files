/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('node:path');

function moveFiles() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Specify source and destination');

    return;
  }

  const [source, dest] = args;

  let statsSource;

  try {
    statsSource = fs.statSync(source);

    if (!statsSource.isFile()) {
      console.error('Source is not a file');

      return;
    }
  } catch {
    console.error('source file does not exist');

    return;
  }

  if (path.resolve(source) === path.resolve(dest)) {
    process.exit(0);
  }

  const isDirSyntax = dest.endsWith(path.sep);

  let statsDest;

  try {
    statsDest = fs.statSync(dest);
  } catch {
    if (isDirSyntax) {
      console.error('Destination directory does not exist');

      return;
    }

    const parentDir = path.dirname(dest);

    if (!fs.existsSync(parentDir)) {
      console.error('Destination directory does not exist');

      return;
    }

    fs.renameSync(source, dest);
    process.exit(0);
  }

  if (statsDest.isDirectory()) {
    const newPath = path.join(dest, path.basename(source));

    fs.renameSync(source, newPath);
    process.exit(0);
  }

  if (statsDest.isFile()) {
    fs.renameSync(source, dest);
    process.exit(0);
  }
}

moveFiles();
