'use strict';

const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv = process.argv.slice(2);

const [oldPath, newPath] = argv;

const mv = require('mv');

let path = newPath;

const checkNewPath = newPath.split('/');
const checkOldPath = oldPath.split('/');

if (checkNewPath.length > 1) {
  if (checkNewPath[checkNewPath.length - 1].length === 0) {
    path = newPath + checkOldPath[checkOldPath.length - 1];
  }
}

mv(`./${oldPath}`, `./${path}`, (err) => {
  if (err) {
    terminal.write(err);
  }
});
