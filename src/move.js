/* eslint-disable no-console */
'use strict';

const { existsSync } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const moveFile = async(fromPath, toPath) => {
  if (!existsSync(fromPath)) {
    console.error(`Source file "${fromPath}" does not exist!`);

    return;
  }

  try {
    let newPath = toPath;

    if (existsSync(newPath)) {
      newPath = path.join(toPath, '/', path.basename(fromPath));

      await fs.rename(fromPath, newPath);
    } else {
      await fs.rename(fromPath, newPath);
    }

    console.log(`Successfully moved from "${fromPath}" to "${newPath}"`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { moveFile };
