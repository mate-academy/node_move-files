/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile(src, dest) {
  fs.stat(src, (err, stats) => {
    if (err) {
      console.error(`Error reading source file: ${err.code}`);

      return;
    }

    if (!stats.isFile()) {
      console.error('There is no file on this path!');

      return;
    }

    fs.stat(dest, (destErr, destStats) => {
      if (destErr) {
        if (destErr.code === 'ENOENT') {
          const destDir = path.dirname(dest);

          fs.stat(destDir, (dirErr, dirStats) => {
            if (dirErr) {
              if (dirErr.code === 'ENOENT') {
                console.error('Destination directory does not exist.');

                return;
              } else {
                console.error(
                  `Error reading destination directory: ${dirErr.code}`,
                );

                return;
              }
            }

            if (!dirStats.isDirectory()) {
              console.error('Destination is not a directory.');

              return;
            }

            fs.rename(src, dest, (renameErr) => {
              if (renameErr) {
                console.error(`Error renaming file: ${renameErr}`);

                return;
              }

              console.log('File moved and renamed successfully!');
            });
          });
        } else {
          console.error(`Error reading destination path: ${destErr.code}`);
        }

        return;
      }

      if (destStats.isDirectory()) {
        const destFilePath = path.join(dest, path.basename(src));

        fs.rename(src, destFilePath, (renameErr) => {
          if (renameErr) {
            console.error(`Error moving file to directory: ${renameErr}`);

            return;
          }

          console.log('File moved successfully to directory!');
        });
      } else {
        fs.rename(src, dest, (renameErr) => {
          if (renameErr) {
            console.error(`Error renaming file: ${renameErr}`);

            return;
          }

          console.log('File moved and renamed successfully!');
        });
      }
    });
  });
}

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error(
    'Use this app as follows: node src/app.js <srcPath> <destPath>',
  );
  process.exit();
}

moveFile(args[0], args[1]);
