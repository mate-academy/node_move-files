/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const { SLESH } = require('./constants');

const moveFile = () => {
  const [from, to] = process.argv.slice(2);

  if (from === to) {
    return;
  }

  if (!to.includes(SLESH) && to.includes('.txt')) {
    fs.renameSync(from, to);
  }

  if (to.includes(SLESH) && to[to.length - 1] !== SLESH) {
    fs.copyFileSync(from, to);
    fs.rmSync(from);
  }

  if (to[to.length - 1] === SLESH) {
    if (fs.existsSync(to)) {
      fs.copyFileSync(from, `${to}${from}`);
      fs.rmSync(from);
    } else {
      console.log('Directory is not exist');
    }
  }

  if (!to.includes('.txt') && !to.includes(SLESH)) {
    if (fs.existsSync(to)) {
      fs.copyFileSync(from, `${to}${SLESH}${from}`);
      fs.rmSync(from);
    } else {
      fs.renameSync(from, `./${to}`);
    }
  }
};

moveFile();
