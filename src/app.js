'use strict';

const fs = require('fs');

const [outputFile, location] = process.argv.slice(2);

fs.stat(location, (statErr, stats) => {
  if (statErr && statErr.code === 'ENOENT') {
    // handles simple renaming of the file
    // && moving to existing directory with new filename
    fs.rename(outputFile, location, (renameErr) => {
      if (renameErr) {
        // eslint-disable-next-line
        console.log(`Such directory ('${location}') does not exists!`);

        return;
      }

      // eslint-disable-next-line
       console.log(`File ${outputFile} was succesfully renamed/moved to ${location}!`);
    });

    return;
  }

  if (stats.isDirectory()) {
    // handles cases when one word is passed (like src)
    fs.copyFile(outputFile, `${location}/${outputFile}`, (copyErr) => {
      if (copyErr) {
        // eslint-disable-next-line
        console.log(copyErr);

        return;
      }

      // deletes the original file when it's copied to a new location
      fs.unlink(outputFile, (unlinkErr) => {
        if (unlinkErr) {
          // eslint-disable-next-line
          console.log(unlinkErr);
        }
      });

      // eslint-disable-next-line
      console.log(`File ${outputFile} was succesfully copied to ${location}/${outputFile}!`);
    });
  }
});
