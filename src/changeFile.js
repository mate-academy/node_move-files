/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const { terminal } = require('./terminal');

const changeFile = (
  source,
  destination,
  message = 'The file was successfully moved.',
) => {
  const fileData = fs.readFileSync(source, 'utf8');

  fs.writeFile(destination, fileData, (err) => {
    if (err) {
      console.log(err);

      return;
    }

    fs.unlink(source, (deletionError) => {
      if (deletionError) {
        console.log(deletionError);
      }
    });

    console.log(message);
    terminal.close();
  });
};

module.exports = { changeFile };
