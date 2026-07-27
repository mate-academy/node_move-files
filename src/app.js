/* eslint-disable no-console */
const { rename, stat, access } = require('node:fs/promises');
const path = require('node:path');

const from = process.argv[2];
let to = process.argv[3];

async function isExists(pathToCheck) {
  try {
    await access(pathToCheck);

    return true;
  } catch {
    return false;
  }
}

async function main() {
  try {
    if (!from || !to) {
      throw new Error('Both "from" and "to" arguments are required');
    }

    if (from === to) {
      return;
    }

    if (!(await isExists(from))) {
      throw new Error(`Source file "${from}" does not exist`);
    }

    const fileName = path.basename(from);

    if (to.endsWith('/') || to.endsWith('\\')) {
      to = path.join(to, fileName);
    }

    if (await isExists(to)) {
      const stats = await stat(to);

      if (stats.isDirectory()) {
        to = path.join(to, fileName);
      }
    }

    await rename(from, to);
  } catch (err) {
    console.error(err);
  }
}

main();
