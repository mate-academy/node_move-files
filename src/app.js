/* eslint-disable no-console */
'use strict';

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const file = args[0];
const moveTo = args[1];

function exitWithError(err) {
  console.error(`${err}\n`);
  process.exitCode = 0;
}

function main() {
  if (file === undefined) {
    exitWithError('Absent source file.');

    return;
  }

  if (moveTo === undefined) {
    exitWithError('Absent directory.');

    return;
  }

  if (!fs.existsSync(file)) {
    exitWithError('Source file does not exist.');

    return;
  }

  if (!fs.statSync(file).isFile()) {
    exitWithError('Source path is not a file.');

    return;
  }

  try {
    const destinationExists = fs.existsSync(moveTo);
    const isDirectoryTarget =
      moveTo.endsWith('/') ||
      (destinationExists && fs.statSync(moveTo).isDirectory());
    const pathFile = isDirectoryTarget
      ? path.join(moveTo, path.basename(file))
      : moveTo;
    const parentDir = path.dirname(pathFile);

    if (!fs.existsSync(parentDir)) {
      exitWithError('Rename is not complete');

      return;
    }

    fs.renameSync(file, pathFile);

    console.log('Rename completed');
  } catch {
    exitWithError('Rename is not complete');
  }
}

main();
