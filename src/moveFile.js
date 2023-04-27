'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function move(dir, file, data) {
  fs.mkdir(dir, { recursive: true }, (e) => {
    if (e) {
    // eslint-disable-next-line no-console
      console.log(e);

      return;
    }

    fs.writeFile(path.join(dir, path.basename(file)), data, (err) => {
      if (err) {
      // eslint-disable-next-line no-console
        console.log(e);

        return;
      }

      fs.unlink(file, () => {});
      // eslint-disable-next-line no-console
      console.log('File saved successfully!');
    });
  });
};
