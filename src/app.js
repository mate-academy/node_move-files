// write code here
const fs = require('fs');

const path = require('path');

function moveFile(sourcePath, destinationPath) {
  try {
    if (!fs.existsSync(sourcePath)) {
      console.error(`Error: Source file: ${sourcePath} does not exist.`);

      return;
    }

    if (!fs.existsSync(destinationPath)) {
      let destinationFolder = '';

      if (destinationPath.lastIndexOf('/') !== -1) {
        destinationFolder = destinationPath.substr(
          0,
          destinationPath.lastIndexOf('/'),
        );
      } else if (destinationPath.lastIndexOf('\\') !== -1) {
        destinationFolder = destinationPath.substr(
          0,
          destinationPath.lastIndexOf('\\'),
        );
      }

      if (destinationFolder !== '') {
        if (!fs.existsSync(destinationFolder)) {
          console.error(
            `Error: destination path: ${destinationPath} does not exist and destination folder: ${destinationFolder} does not exist.`,
          );

          return;
        }
      }
    }

    if (
      fs.existsSync(destinationPath) &&
      fs.lstatSync(destinationPath).isDirectory()
    ) {
      const fileName = path.basename(sourcePath);

      fs.renameSync(sourcePath, path.join(destinationPath, fileName));
    } else {
      fs.renameSync(sourcePath, destinationPath);
    }

    console.log(
      `Successful moving file from: ${sourcePath} to: ${destinationPath}`,
    );
  } catch (error) {
    console.error(error);
  }
}

function main() {
  if (process.argv.length !== 4) {
    console.log(
      'Invalid arguments. E.g. node src/app.js {sourcePath} {destinationPath}',
    );
  }

  const sourcePath = process.argv[2];
  const destinationPath = process.argv[3];

  moveFile(sourcePath, destinationPath);
}

main();
