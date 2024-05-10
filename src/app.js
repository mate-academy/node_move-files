/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    console.error('Please provide source and destination paths.');

    return;
  }

  fs.stat(source, (sourceError, sourceStat) => {
    if (sourceError) {
      console.error(`Error:`, sourceError);

      return;
    }

    if (!sourceStat.isFile()) {
      console.error(`Error: Source is not a file.`);

      return;
    }

    fs.stat(destination, (destStatError, destStat) => {
      if (destStatError) {
        fs.rename(source, destination, (renameError) => {
          if (renameError) {
            console.error(`Error:`, renameError);
          } else {
            console.log(`File renamed successfully`);
          }
        });

        return;
      }

      const destPath =
        destStat && destStat.isDirectory()
          ? path.join(destination, path.basename(source))
          : destination;

      fs.rename(source, destPath, (renameError) => {
        if (renameError) {
          console.error(`Error:`, renameError);
        } else {
          console.log(`File moved successfully`);
        }
      });
    });
  });
}

moveFile();
