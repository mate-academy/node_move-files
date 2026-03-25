/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');
const path = require('path');

async function moveFile() {
  const args = process.argv.slice(2);

  const originPath = args[0];
  const pathToMove = args[1];

  if (!originPath) {
    console.error('Source file path was not provided');

    return;
  }

  if (!pathToMove) {
    console.error('Destination path was not provided');

    return;
  }

  if (originPath === pathToMove) {
    return;
  }

  let sourceStat = null;

  try {
    sourceStat = await fs.stat(originPath);
  } catch (e) {
    console.error('File does not exist');

    return;
  }

  if (sourceStat.isDirectory()) {
    console.error('Error: Source is a directory');

    return;
  }

  try {
    let finalDest = pathToMove;

    try {
      const destStat = await fs.stat(pathToMove);

      if (destStat.isDirectory()) {
        finalDest = path.join(pathToMove, path.basename(originPath));
      }
    } catch (e) {
      if (pathToMove.endsWith('/') || pathToMove.endsWith('\\')) {
        console.error('Path does not exist');

        return;
      }
    }

    await fs.rename(originPath, finalDest);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

moveFile();
