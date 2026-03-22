/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

if (process.argv.length !== 4) {
  console.error('Wrong number of arguments');
} else {
  const file1 = process.argv[2];
  const destination = process.argv[3];

  if (!fs.existsSync(file1)) {
    console.error(`File ${file1} does not exist`);
  } else {
    const sourcePath = path.resolve(file1);
    let targetPath = destination;
    const destinationEndsWithSlash =
      destination.endsWith(path.sep) || destination.endsWith('/');

    if (destinationEndsWithSlash) {
      // Destination must be an existing directory
      if (
        !fs.existsSync(destination) ||
        !fs.statSync(destination).isDirectory()
      ) {
        console.error(`Destination directory ${destination} does not exist`);
        targetPath = null;
      } else {
        targetPath = path.join(destination, path.basename(file1));
      }
    } else if (fs.existsSync(destination)) {
      const destStat = fs.statSync(destination);

      if (destStat.isDirectory()) {
        targetPath = path.join(destination, path.basename(file1));
      }
    } else {
      const destinationDir = path.dirname(destination);

      const missingDestinationDir = !fs.existsSync(destinationDir);
      const invalidDestinationDir =
        !missingDestinationDir && !fs.statSync(destinationDir).isDirectory();

      if (missingDestinationDir || invalidDestinationDir) {
        console.error(`Destination directory ${destinationDir} does not exist`);
        targetPath = null;
      }
    }

    if (targetPath && sourcePath !== path.resolve(targetPath)) {
      try {
        fs.renameSync(file1, targetPath);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
}
