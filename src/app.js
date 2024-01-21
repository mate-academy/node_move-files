'use strict';

const fs = require('fs/promises');

const app = async(file, to) => {
  try {
    await fs.rename(file, to);
  } catch (error) {
    throw error;
  }
};

app(...process.argv.slice(2));
