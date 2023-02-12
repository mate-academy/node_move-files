/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');

const moveFile = async(f, p) => {
  try {
    await fs.rename(f, p);

    console.log('File moved successfully');
  } catch (err) {
    console.error(err);
  }
};

const [file, path] = process.argv.splice(2);

moveFile(file, path);
