'use strict';

const fs = require('fs');
const fsPromises = require('fs/promises');

function rename(source, target) {
  return fsPromises.rename(source, target)
    .then(() => console.log(`File ${source} moved/renamed to ${target}`))
    .catch(() => console.log('Failed to perform operation'));
}

function exists(path) {
  const result = fs.existsSync(path);

  if (!result) {
    console.log('No such file/directory: ' + path);
  }

  return result;
}

function getFolderName(target) {
  return target.split('/').slice(1, -1).join('/');
}

module.exports = {
  rename,
  exists,
  getFolderName,
};
