/* eslint-disable no-console */

const { rename } = require('fs/promises');
const { statSync, existsSync } = require('fs');
const path = require('path');

async function app() {
  const args = process.argv.slice(2);
  const [source, destination] = args;

  if (!source || !destination) {
    console.error(`Two arguments was needed`);

    return;
  }

  if (existsSync(source) && !statSync(source).isFile()) {
    console.error(`I can move just files! `);

    return;
  }

  const slicedDest = destination.endsWith('/')
    ? destination.slice(0, -1)
    : destination;

  try {
    const isDestDir =
      existsSync(slicedDest) && statSync(slicedDest).isDirectory();

    const finDest = isDestDir
      ? path.join(slicedDest, path.basename(source))
      : slicedDest;

    await rename(source, finDest);
    console.log(`${source} was moved to ${destination}`);
  } catch (e) {
    console.error(`The file could not be moved. Error: ${e}`);
  }
}

app();

module.exports = { app };
