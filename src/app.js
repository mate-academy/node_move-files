'use strict';

const fs = require('fs');

const args = process.argv.slice(2);
const fileName = args[0];
let movePath = args[1];

if (movePath[movePath.length - 1] === '/') {
  movePath += fileName.slice(fileName.lastIndexOf('/') + 1);
}

fs.rename(fileName, movePath, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`File sucssesfuly move to ${movePath}`);
});
