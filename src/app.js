'use strict';

const fs = require('fs');

const pathFrom = process.argv[2];
let pathTo = process.argv[3];

const arrFrom = pathFrom.split('/');
const fileNameTo = arrFrom[arrFrom.length - 1];

if (fs.existsSync(pathTo)) {
  pathTo += `/${fileNameTo}`;
}

if (pathTo[pathTo.length - 1] === '/') {
  pathTo += fileNameTo;
}

try {
  const fileContent = fs.readFileSync(pathFrom, 'utf-8');

  fs.writeFileSync(pathTo, fileContent);

  fs.renameSync(pathFrom, pathTo);
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}
