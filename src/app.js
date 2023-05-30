/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const [oldName, newName] = process.argv.slice(2);

function move() {
  const source = `./src/${oldName}`;
  const end = `./src/${newName}/${oldName}`;
  const isItFile = newName.endsWith('.txt');

  if (isItFile) {
    fs.renameSync(source, `./src/${newName}`);

    return;
  }

  if (!isItFile) {
    const isDir = newName[newName.length - 1] === '/';

    const isDirExists = fs.existsSync(`./src/${newName.split('/').slice(0, -1).join('/')}`);

    if (!isDirExists && isDir) {
      console.log('Directory is not exist');

      return;
    }

    if (isDirExists && isDir) {
      fs.renameSync(source, end);

      return;
    }

    if (!isDir && isDirExists) {
      const newFileName = newName.split('/').slice(-1).join('');
      const oldFileExtention = oldName.split('.').slice(-1).join('');

      console.log(newName);

      const destination = newName.split('/').length > 1
        ? newName.split('/').slice(0, -1).join('/')
        : newName;

      const newEnd = `./src/${destination}/${newFileName}.${oldFileExtention}`;

      fs.renameSync(source, newEnd);
    }
  }
}

move();
