'use strict';

const fs = require('fs');
const path = require('path');

const renameTheFile = (fileToMove, startPath, endPath) => {
  const extsn = path.extname(fileToMove);

  fs.renameSync(startPath, `${endPath}${extsn}`);
};

module.exports = { renameTheFile };
