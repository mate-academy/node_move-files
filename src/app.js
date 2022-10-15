'use strict';

const fs = require('fs');

function mv() {
  const [sourse, destination] = process.argv.slice(2);
  const isDir = destination.slice(-1) === '/';
  const finalDestination = isDir
    ? destination + sourse.split('/').slice(-1)
    : destination + '/' + sourse.split('/').slice(-1);

  try {
    fs.copyFileSync(sourse, finalDestination);
    fs.rmSync(sourse);
  } catch (error) {
    if (error.code === 'ENOENT' && !isDir) {
      fs.copyFileSync(sourse, destination);
      fs.rmSync(sourse);
    } else {
      throw error;
    }
  }
}

mv();
