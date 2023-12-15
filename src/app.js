'use strict';
/* eslint-disable */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [src, dest] = process.argv.slice(2);

  fs.access(path.join(__dirname, src), (err) => {
    if (err) {
      console.error(`${src} does not exist`);
    } else {
      const srcPath = path.join(__dirname, src);
      const destPath = path.join(__dirname, dest);
      const finalDestPath = dest.slice(-1) === '/'
        ? path.join(destPath, path.basename(srcPath))
        : destPath;
      const destDirectory = path.dirname(finalDestPath);

      fs.access(destDirectory, (err) => {
        if (err) {
          console.error(
            `Destination directory ${destDirectory} does not exist`
          );
        } else {
          fs.rename(srcPath, finalDestPath, (err) => {
            if (err) {
              console.error('Error found:', err);
            } else {
              console.log(`Successfully moved to ${dest}`);
            }
          });
        }
      });
    }
  });
}

moveFile();
