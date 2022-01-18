'use strict';

const fs = require('fs');
const copy = require('./copy');

const fileCut = process.argv[2];
const fileInsert = process.argv[3];
const folderCheck1 = fileInsert[fileInsert.length - 1] === '/';
const folderCheck2 = fs.existsSync(`src/${fileInsert}`);

if (folderCheck1 || folderCheck2) {
  const data = copy(fileCut);
  const newPath = folderCheck1
    ? `src/${fileInsert}${fileCut}`
    : `src/${fileInsert}/${fileCut}`;

  fs.writeFileSync(newPath, data);
  fs.rmSync(`src/${fileCut}`);
  // eslint-disable-next-line no-console
  console.log('File moved');

  return;
}

fs.rename(`src/${fileCut}`, `src/${fileInsert}`, (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('File moved');
});
