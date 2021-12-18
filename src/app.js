'use strict';

/* eslint-disable no-console */

const fs = require('fs');

const [source, destination] = process.argv.slice(2);

const sourceContent = fs.readFileSync(source, {encoding: 'utf8'});

fs.writeFile(destination, sourceContent, (error, data) => {
  if (error) {
    throw error;
  }

  fs.unlink(source, (errorUnlink) => {
    if (errorUnlink) {
      throw errorUnlink;
    }

    console.log('File moved');
  });
});
