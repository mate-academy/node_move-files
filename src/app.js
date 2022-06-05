'use strict';

const fs = require('fs');

const files = process.argv.slice(2);

if (!files[1].includes('/') && files[1].includes('.')) {
  fs.rename(`src/${files[0]}`, `src/${files[1]}`, (err) => {
    return err;
  });
}

if (files[1].endsWith('/')) {
  files[1] = files[1] + files[0];

  relocatedFile(files);
}

if (!files[1].includes('/') && !files[1].includes('.')) {
  files[1] = files[1] + '/' + files[0];

  relocatedFile(files);
}

if (files[1].includes('./')) {
  files[1] = files[1].slice(2) + '/' + files[0];

  relocatedFile(files);
}

function relocatedFile(arr) {
  fs.cpSync(`src/${arr[0]}`, `src/${arr[1]}`, { recursive: true }, (err) => {
    return err;
  });

  fs.rmSync(`src/${arr[0]}`, { recursive: true }, (err) => {
    return err;
  });
}
