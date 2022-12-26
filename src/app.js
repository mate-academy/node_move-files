'use strict';

const fs = require('fs');

const [currentFile, path] = process.argv.slice(2);

fs.stat(path, (statErr, stats) => {
  if (statErr && statErr.code === 'ENOENT') {
    fs.rename(currentFile, path, (renameErr) => {
      if (renameErr) {
        throw Error(`Such directory '${path}' does not exist.`);
      }
      throw Error(
        `The file '${currentFile}' was successfully
         renamed and moved to the '${path}' directory.`
      );
    });

    return;
  }

  if (stats.isDirectory()) {
    fs.copyFile(currentFile, `${path}/${currentFile}`, (copyErr) => {
      if (copyErr) {
        throw copyErr;
      }

      fs.unlink(currentFile, (unlinkErr) => {
        if (unlinkErr) {
          throw unlinkErr;
        }
      });
      throw Error(
        `The file '${currentFile}' was successfully
         copied to '${path}/${currentFile}'.`
      );
    });
  }
});
