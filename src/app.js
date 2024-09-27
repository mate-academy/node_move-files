/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const moveFile = () => {
  try {
    const args = process.argv.slice(2);
    const [from, to] = args;
    let normalizeTo = to;

    if (!from || !to) {
      throw new Error('Give two correct params');
    }

    if (from === to) {
      return;
    }

    if (!fs.existsSync(from)) {
      throw new Error(`source doesn't exist`);
    }

    if (fs.existsSync(to) && fs.statSync(to).isDirectory()) {
      const fileName = path.basename(from);

      normalizeTo = path.join(normalizeTo, fileName);
    }

    fs.renameSync(from, normalizeTo);
  } catch (error) {
    console.error(error);
  }
};

moveFile();
