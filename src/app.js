/* eslint-disable no-console */

const fs = require('fs/promises');
const path = require('path');

async function moveFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    throw new Error('Invalid number of arguments');
  }

  const [src, destination] = args;

  if (src.startsWith('-') || destination.startsWith('-')) {
    throw new Error('Flags are not supported');
  }

  try {
    const srcStat = await fs.stat(src);

    if (!srcStat.isFile()) {
      throw new Error('Source is not a file');
    }
  } catch (error) {
    throw new Error('Source file does not exist');
  }

  let finalDestination = destination;

  const endsWithSlash =
    destination.endsWith('/') || destination.endsWith(path.sep);

  if (endsWithSlash) {
    try {
      const destStat = await fs.stat(destination);

      if (!destStat.isDirectory()) {
        throw new Error();
      }
    } catch (error) {
      throw new Error('Destination directory does not exist');
    }

    finalDestination = path.join(destination, path.basename(src));
  } else {
    try {
      const destStat = await fs.stat(destination);

      if (destStat.isDirectory()) {
        finalDestination = path.join(destination, path.basename(src));
      }
    } catch (error) {
      const parentDir = path.dirname(destination);

      try {
        await fs.stat(parentDir);
      } catch (parentError) {
        throw new Error('Destination directory does not exist');
      }
    }
  }

  try {
    await fs.rename(src, finalDestination);
  } catch (error) {
    throw new Error('Destination directory does not exist');
  }
}

moveFile().catch((error) => {
  console.error(error.message);
});
