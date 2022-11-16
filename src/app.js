'use strict';

const mv = require('mv');
const [path, newPath] = process.argv.slice(2);

const splittedPath = path.split('/');
const splittedNewPath = newPath.split('/');

let fixedPath = newPath;

if (splittedNewPath.length) {
  if (splittedNewPath[splittedNewPath.length - 1].length === 0) {
    fixedPath = newPath + splittedPath[splittedPath.length - 1];
  }
}

mv(`./${path}`, `./${fixedPath}`, (error) => {
  if (error) {
    console.log(error);
  }
});
