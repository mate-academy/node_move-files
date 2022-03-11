/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const src = process.argv[2];
let dest = process.argv[3];

if (src === dest) {
  console.log('No changes');
  process.exit();
}

if (!dest.includes('.') && !dest.includes('/')) {
  dest = dest + '/' + src;
} else if (dest[dest.length - 1] === '/') {
  dest = dest + src;
} else {
  dest = dest + src.slice(src.lastIndexOf('.'));
}

fs.copyFile(src, dest, (err) => {
  if (err) throw err;

  fs.rm(src, (err) => {
    if (err) throw err;

    console.log('Completed');
  })
});
