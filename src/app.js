'use strict';

const fs = require('fs');

const [ file, folder ] = [...process.argv.slice(3)];
const path = folder + '/' + file;

if (folder[folder.length - 1] !== '/') {
  throw new Error('The name of destination directory should be ended with /');
}

fs.readFile(file, (readFileErr, content) => {
  if (readFileErr) {
    throw readFileErr;
  }

  fs.writeFile(path, content, (writeFileErr) => {
    if (writeFileErr) {
      throw writeFileErr;
    }

    fs.unlink(file, (unlinkErr) => {
      if (unlinkErr) {
        throw unlinkErr;
      }

      // eslint-disable-next-line no-console
      console.log('Success. File was moved to the directory ' + folder);
    });
  });
});
