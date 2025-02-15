const fs = require('fs');
const path = require('path');

const [pathToFile, pathToReplace] = process.argv.slice(2);

if (!pathToFile || !pathToReplace) {
  // eslint-disable-next-line no-console
  console.error('You must write 2 path');
} else {
  if (path.resolve(pathToFile) === path.resolve(pathToReplace)) {
    // eslint-disable-next-line no-console
    console.error('This is a similar path.');
  }

  fs.stat(pathToFile, (error, stats) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Path does not exist');

      return;
    }

    if (stats.isFile()) {
      fs.rename(pathToFile, pathToReplace, (renameError) => {
        if (renameError) {
          // eslint-disable-next-line no-console
          console.error('File dont move');
        } else {
          // eslint-disable-next-line no-console
          console.log('This file has been moved');
        }
      });
    } else {
      fs.cp(pathToFile, pathToReplace, { recursive: true }, (copyError) => {
        if (copyError) {
          // eslint-disable-next-line no-console
          console.error('Move Error');
        } else {
          fs.rm(pathToFile, { recursive: true }, (rmError) => {
            if (rmError) {
              // eslint-disable-next-line no-console
              console.error('Old directory could not be removed.');
            } else {
              // eslint-disable-next-line no-console
              return console.log('The directory has been moved');
            }
          });
        }
      });
    }
  });
}
