'use strict';

const fs = require('node:fs');

module.exports = {
  moveFile,
};

function moveFile(src, dst) {
  /* eslint-disable no-console */
  fs.rename(src, dst, (err) => {
    if (err) {
      throw err;
    }
    console.info(`Successfully moved ${src} to ${dst}`);
  });
}
