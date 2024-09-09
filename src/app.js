/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.slice(2);
  const fromFile = args[0];
  const toFile = args[1];

  if (!fromFile || !toFile) {
    return console.error('one of the paths is not correct');
  }

  const fileNamePath = path.resolve(fromFile);
  let newFileNamePath = path.resolve(toFile);

  if (fromFile === toFile) {
    return;
  }

  try {
    if (fs.existsSync(newFileNamePath)) {
      const basename = path.basename(fileNamePath);

      newFileNamePath = path.join(newFileNamePath, basename);
    }
    fs.renameSync(fileNamePath, newFileNamePath);
  } catch (err) {
    console.error(err);
  }
}

moveFile();
