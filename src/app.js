const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function main() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    throw new Error('Missing arguments');
  }

  if (!fs.existsSync(source)) {
    throw new Error('Source file does not exist');
  }

  let correctPath;

  if (destination.endsWith('/')) {
    if (
      !fs.existsSync(destination) ||
      !fs.statSync(destination).isDirectory()
    ) {
      throw new Error('Destination directory does not exist');
    }

    correctPath = path.join(destination, path.basename(source));
  } else if (
    fs.existsSync(destination) &&
    fs.statSync(destination).isDirectory()
  ) {
    correctPath = path.join(destination, path.basename(source));
  } else {
    const parentDir = path.dirname(destination);

    if (parentDir !== '.' && !fs.existsSync(parentDir)) {
      throw new Error('Parent directory does not exist');
    }

    correctPath = destination;
  }

  const dataFile = await fsPromises.readFile(source, 'utf-8');

  await fsPromises.unlink(source);
  await fsPromises.writeFile(correctPath, dataFile, 'utf-8');
}

// eslint-disable-next-line no-console
main().catch((e) => console.error(e.message));
