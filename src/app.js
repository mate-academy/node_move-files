const fs = require('fs/promises');
const path = require('path');

async function moveFile() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    // eslint-disable-next-line no-console
    console.log(!source);
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

moveFile();
