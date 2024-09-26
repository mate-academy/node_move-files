/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  try {
    const [pathFrom, pathTo] = process.argv.slice(2);

    const absPathFrom = path.resolve(pathFrom);
    let absPathTo = path.resolve(pathTo);

    if (!fs.existsSync(absPathFrom)) {
      throw new Error('Path does not exist!');
    }

    const sourceStats = fs.statSync(absPathFrom);

    if (!sourceStats.isFile()) {
      throw new Error('There is no file!');
    }

    const isDirectory =
      fs.existsSync(absPathTo) && fs.statSync(absPathTo).isDirectory();

    if (isDirectory) {
      if (!fs.existsSync(absPathTo)) {
        throw new Error('Path already exists!');
      }

      const fileName = path.basename(pathFrom);

      absPathTo = path.join(absPathTo, fileName);
    }

    fs.renameSync(absPathFrom, absPathTo);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

moveFile();
