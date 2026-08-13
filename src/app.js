/* eslint-disable no-console */

const fsp = require('node:fs/promises');
const path = require('node:path');

async function main() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    console.error('Source or destination is not provided');

    return;
  }

  try {
    const sourceStat = await fsp.stat(source);

    if (!sourceStat.isFile()) {
      console.error('Source must be a file');

      return;
    }
  } catch {
    console.error('Source does not exist');

    return;
  }

  if (destination.endsWith('/')) {
    try {
      const destinationStat = await fsp.stat(destination);

      if (!destinationStat.isDirectory()) {
        console.error('Destination is not a directory');

        return;
      }

      const fileName = path.basename(source);
      const target = path.join(destination, fileName);

      await fsp.rename(source, target);
    } catch {
      console.error('Destination directory does not exist');
    }

    return;
  }

  try {
    const destinationStat = await fsp.stat(destination);

    if (destinationStat.isDirectory()) {
      const fileName = path.basename(source);
      const target = path.join(destination, fileName);

      await fsp.rename(source, target);

      return;
    }

    await fsp.rename(source, destination);

    return;
  } catch {}

  const destinationDir = path.dirname(destination);

  try {
    const destinationDirStat = await fsp.stat(destinationDir);

    if (!destinationDirStat.isDirectory()) {
      console.error('Destination directory does not exist');

      return;
    }
  } catch {
    console.error('Destination directory does not exist');

    return;
  }

  await fsp.rename(source, destination);
}

main();
