/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const { basename } = require('path');

const [source, target] = process.argv.slice(2);
let newTarget;

fs.existsSync(target)
  ? newTarget = target + '/'
  : newTarget = target;

const isDirectory = newTarget.endsWith('/');

if (isDirectory) {
  newTarget = newTarget + basename(source);
}

fs.rename(source, newTarget, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Moved ${source} to ${target}`);
  }
});
