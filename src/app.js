/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const args = process.argv.slice(2);
const currentLocation = args[0];
let newLocation = args[1];
const endsWithSlash = newLocation[newLocation.length - 1] === '/';
const fileName = currentLocation.split('/').pop();

fs.stat(newLocation, (error, stats) => {
  if (error && error.code === 'ENOENT' && endsWithSlash) {
    throw Error('This directory doesn\'t exist');
  }

  if (!error && stats.isDirectory()) {
    newLocation = `${newLocation}${endsWithSlash ? '' : '/'}${fileName}`;
  }

  rename(currentLocation, newLocation);
});

const rename = (currentPath, newPath) => {
  fs.rename(currentPath, newPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
