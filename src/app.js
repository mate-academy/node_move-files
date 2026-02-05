// write code here

const fs = require('fs/promises');
const path = require('path');

async function validateSource(source) {
  const sourceStat = await fs.stat(source);

  if (!sourceStat.isFile()) {
    throw new Error('Source is not a file');
  }
}

async function setDestinationPath(destination, source) {
  let destinationPath;

  if (destination.endsWith('/')) {
    try {
      const destinationStat = await fs.stat(destination);

      if (!destinationStat.isDirectory()) {
        throw new Error('Destination is not a directory');
      }

      destinationPath = path.join(destination, path.basename(source));
    } catch (error) {
      throw new Error('Destination path is invalid');
    }
  } else {
    try {
      const destinationStat = await fs.stat(destination);

      if (destinationStat.isDirectory()) {
        destinationPath = path.join(destination, path.basename(source));
      } else {
        destinationPath = destination;
      }
    } catch (error) {
      destinationPath = destination;
    }
  }

  return destinationPath;
}

async function main() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    // eslint-disable-next-line no-console
    console.error('Source and destination paths are required');

    return;
  }

  const absoluteSource = path.resolve(source);
  const absoluteDestination = path.resolve(destination);

  if (absoluteSource === absoluteDestination) {
    return;
  }

  try {
    await validateSource(absoluteSource);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error validating source file: ' + error.message);

    return;
  }

  const destinationPath = await setDestinationPath(destination, absoluteSource);

  try {
    await fs.rename(absoluteSource, destinationPath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error moving file: ' + error.message);
  }
}

main();
