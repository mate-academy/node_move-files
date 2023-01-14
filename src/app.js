'use strict';

const fs = require('fs');
const { rename, exists, getFolderName } = require('./utils.js');

function mv() {
  const source = process.argv[2];
  let target = process.argv[3];

  if (!exists(source)) {
    return;
  }

  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    target += target.endsWith('/') ? '' : '/' + source;
  } else if (target.startsWith('./') && target.split('/').length >= 3) {
    const folderName = getFolderName(target);

    if (!exists(folderName)) {
      return;
    }
  }

  rename(source, target);
}

mv();
