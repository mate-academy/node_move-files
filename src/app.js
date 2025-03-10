/* eslint-disable no-console */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

if (process.argv.length !== 4) {
  console.error('Bad request.');
  process.exit();
}

const [sourceFile, destination] = process.argv.splice(2);

if (sourceFile === destination) {
  process.exit();
}

try {
  const destinationFile =
    fs.existsSync(destination) && fs.statSync(destination).isDirectory()
      ? path.join(destination, path.basename(sourceFile))
      : destination;

  fs.writeFileSync(destinationFile, fs.readFileSync(sourceFile, 'utf8'));
  fs.rmSync(sourceFile);
} catch (err) {
  switch (err.code) {
    case 'EISDIR':
      console.error('This is a directory.');
      break;

    case 'ENOENT':
      console.error('No such file.');
      break;
  }
}
