/* eslint-disable no-console */
/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');

const moveFile = () => {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    return console.error('Please enter source file and destination!');
  }

  if (path.resolve(source) === path.resolve(destination)) {
    return console.log(
      'Error: Source and destination cannot be the same. Move operation canceled!',
    );
  }

  fs.stat(destination, (destStatError, destStat) => {
    if (destStatError && destStatError.code !== 'ENOENT') {
      return console.error('Error: Destination path check failed.');
    }

    const destPath =
      destStat && destStat.isDirectory()
        ? path.join(destination, path.basename(source))
        : destination;

    fs.rename(source, destPath, (renameError) => {
      if (renameError) {
        return console.error('Error: Failed to move file.', renameError);
      }

      console.log(`File successfully moved to ${destPath}`);
    });
  });
};

moveFile();
