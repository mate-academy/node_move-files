/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

async function moveFile() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('You did not pass all parameters.');

    return;
  }

  const pathFromMove = args[0];
  let pathToMove = args[1];

  if (!fs.existsSync(path.dirname(pathToMove))) {
    console.error('File or directory does not exist');

    return;
  }

  if (pathFromMove === pathToMove) {
    console.log('Source and destination paths are the same. No action taken.');

    return;
  }

  // const stat = fs.existsSync(pathToMove) ? fs.statSync(pathToMove) : null;
  const stat = await fs.promises.stat(pathToMove).catch(() => null);

  if (stat && stat.isDirectory()) {
    pathToMove = path.join(pathToMove, path.basename(pathFromMove));
  }

  // fs.promises
  //   .cp(pathFromMove, pathToMove)
  //   .then(() => fs.promises.unlink(pathFromMove))
  //   .catch((err) => {
  //     console.error(
  // eslint-disable-next-line max-len
  //       `Error occurred while moving the file: ${err.code}\npathFromMove - ${pathFromMove}\npathToMove - ${pathToMove}`,
  //     );
  //   });
  try {
    await fs.promises.copyFile(pathFromMove, pathToMove);
    await fs.promises.unlink(pathFromMove);

    console.log(
      `File successfully moved from ${pathFromMove} to ${pathToMove}`,
    );
  } catch (err) {
    console.error(
      `Error occurred while moving the file: ${err.code}\npathFromMove - ${pathFromMove}\npathToMove - ${pathToMove}`,
    );
  }
}

moveFile();
