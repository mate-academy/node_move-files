'use strict';

const fs = require('fs');

const [ file, folder ] = [...process.argv.slice(3)];

if (folder[folder.length - 1] !== '/') {
  throw new Error('The name of destination directory should be ended with /');
}

fs.readFile(file, (err, content) => {
  if (err) {
    throw err;
  }

  fs.writeFile(folder + '/' + file, content, (err1) => {
    if (err1) {
      throw err1;
    }

    fs.unlink(file, (err2) => {
      if (err2) {
        throw err2;
      }

      // eslint-disable-next-line no-console
      console.log('Success. File was moved to the directory ' + folder);
    });
  });
});
