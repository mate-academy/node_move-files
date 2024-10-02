/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    return console.error('Please provide source and destination paths.');
  }

  const resolvedSource = path.resolve(source);
  const resolvedDestination = path.resolve(destination);

  if (resolvedSource === resolvedDestination) {
    return console.log(
      'Source and destination paths are the same. No action taken.',
    );
  }

  fs.stat(source, (sourceError, sourceStat) => {
    if (sourceError) {
      return console.error(
        'Error: Source path does not exist or is inaccessible.',
      );
    }

    if (!sourceStat.isFile()) {
      return console.error('Error: Source is not a file.');
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

        console.log(`File moved successfully to ${destPath}`);
      });
    });
  });
}

moveFile();
