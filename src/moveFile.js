'use strict';

const fs = require('node:fs');

module.exports = {
  moveFile,
};

function moveFile(src = '', dst = '') {
  let newPath = dst;
  const srcFileName = (src.match(/[\w\.]*$/g) || [''])[0]; //eslint-disable-line

  if (dst.charAt(dst.length - 1) === '/') {
    newPath += srcFileName;
  }

  if (fs.existsSync(dst)) {
    newPath = newPath.concat('/', srcFileName);
  }

  fs.renameSync(src, newPath);

  return [src, newPath];
}
