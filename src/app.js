/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Error: enter source and destination');

    return;
  }

  if (
    !fs.existsSync(path.resolve(args[0])) ||
    !fs.statSync(path.resolve(args[0])).isFile()
  ) {
    console.error(`Error: Source file does not exist or is not a file`);

    return;
  }

  const destinationLooksLikeDir =
    args[1].endsWith('/') ||
    (fs.existsSync(path.resolve(args[1])) &&
      fs.statSync(path.resolve(args[1])).isDirectory());

  if (destinationLooksLikeDir) {
    if (!fs.existsSync(path.resolve(args[1]))) {
      console.error(`Error: Destination directory "${args[1]}" does not exist`);

      return;
    }

    const newFilePath = path.join(
      path.resolve(args[1]),
      path.basename(args[0]),
    );

    fs.renameSync(path.resolve(args[0]), newFilePath);
  } else {
    const destinationDir = path.dirname(path.resolve(args[1]));

    if (!fs.existsSync(destinationDir)) {
      console.error(
        `Error: Destination directory "${destinationDir}" does not exist`,
      );

      return;
    }
    fs.renameSync(path.resolve(args[0]), path.resolve(args[1]));
  }

  console.log(`File moved successfully: from ${args[0]} to ${args[1]}`);
}

moveFile();
