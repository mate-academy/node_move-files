/* eslint-disable no-console */
// write code here

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const [moveFrom, moveTo] = process.argv.slice(2);

if (!moveFrom || !moveTo) {
  console.error('Args must be existed');
} else if (!fs.existsSync(moveFrom)) {
  console.error('Source not exists');
} else if (moveFrom !== moveTo) {
  let destination = moveTo;

  if (fs.existsSync(moveTo) && fs.lstatSync(moveTo).isDirectory()) {
    destination = path.join(moveTo, moveFrom.split('/').slice(-1)[0]);
  }

  fsp
    .copyFile(moveFrom, destination)
    .then(() => {
      fsp.unlink(moveFrom);
    })
    .catch((e) => console.error(e));
}
