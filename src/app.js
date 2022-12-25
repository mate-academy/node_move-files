'use strict';

const fs = require('fs');

const [currentFile, path] = process.argv.slice(2);

fs.stat(path, (statErr, stats) => {
  if (statErr && statErr.code === 'ENOENT') {
    fs.rename(currentFile, path, (renameErr) => {
      if (renameErr) {
        // eslint-disable-next-line no-console
        console.log(`Such directory '${path}' does not exist.`);

        return;
      }

      // eslint-disable-next-line no-console
      console.log(
        // eslint-disable-next-line max-len
        `The file '${currentFile}' was successfully renamed and moved to the '${path}' directory.`
      );
    });

    return;
  }

  if (stats.isDirectory()) {
    fs.copyFile(currentFile, `${path}/${currentFile}`, (copyErr) => {
      if (copyErr) {
        // eslint-disable-next-line no-console
        console.log(copyErr);

        return;
      }

      fs.unlink(currentFile, (unlinkErr) => {
        if (unlinkErr) {
          // eslint-disable-next-line no-console
          console.log(unlinkErr);
        }
      });

      // eslint-disable-next-line no-console
      console.log(
        // eslint-disable-next-line max-len
        `The file '${currentFile}' was successfully copied to '${path}/${currentFile}'.`
      );
    });
  }
});
