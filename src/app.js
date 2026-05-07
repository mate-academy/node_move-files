/* eslint-disable no-console */
'use strict';

const { move } = require('./move');

function app() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Wrong number of arguments');

    return;
  }

  const [src, dest] = args;

  if (src === dest) {
    return;
  }

  try {
    move(src, dest);
  } catch (error) {
    console.error(error.message);
  }
}

app();

module.exports = { app };
