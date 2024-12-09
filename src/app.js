/* eslint-disable no-console */
// write code here
const fs = require('fs/promises');
const path = require('path');

async function moveFile() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    console.log(!source);
    console.error('Please enter source file and destination');

    return;
  }

  if (source === destination) {
    return;
  }

  const fileName = path.basename(source);
  let newDestination = destination;

  try {
    const destStat = await fs.stat(newDestination).catch(() => null);

    if ((destStat && destStat.isDirectory()) || newDestination.endsWith('/')) {
      newDestination = path.join(newDestination, fileName);
    }

    await fs.rename(source, newDestination);
  } catch (error) {
    console.error(error);
  }
}

moveFile();
