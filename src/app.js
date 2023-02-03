/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const { logError } = require('./logError');

const [from, to] = process.argv.slice(2);

function app() {
  const fileName = from
    .split('/')
    .reverse()[0];

  const fileExtensions = fileName
    .split('.')
    .slice(1);

  const dirFrom = from
    .split('/')
    .slice(0, -1)
    .join('/');

  const dirTo = to
    .split('/')
    .slice(0, -1)
    .join('/');

  if (dirFrom && dirTo && (dirFrom === dirTo)) {
    fs.rename(from, to, logError);

    return;
  }

  if (!to.includes('/') && !to.includes('.')) {
    if (fs.existsSync(to)) {
      const moveTo = to + '/' + fileName;

      fs.rename(from, moveTo, logError);

      return;
    }

    const startDir = dirFrom || '.';

    const finalDestination = startDir + '/' + to
      + '.' + fileExtensions.join('.');

    fs.rename(from, finalDestination, logError);

    return;
  }

  if (to[to.length - 1] === '/') {
    const finalDestination = to + fileName;

    fs.rename(from, finalDestination, logError);

    return;
  }

  if (to[to.length - 1] !== '/') {
    const finalDestination = to + '.' + fileExtensions.join('.');

    fs.rename(from, finalDestination, logError);
  }
}

app();
