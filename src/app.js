/* eslint-disable no-console */
/* eslint-disable strict */
const fs = require('fs/promises');
const path = require('path');

async function moveFiles() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Invalid input!');

    return;
  }

  const [source, destination] = args;

  try {
    await fs.access(source);
  } catch (err) {
    console.error('Source file does not exist!');

    return;
  }

  // if source & dest is in one folder, we can just rename them
  if (path.dirname(source) === path.dirname(destination)) {
    try {
      await fs.rename(source, destination);
    } catch (err) {
      console.error('Error renaming file:', err.message);
    }

    return;
  }

  // if destination ends with ('/'), this dir should exists
  if (destination.endsWith(path.sep)) {
    try {
      const stats = await fs.stat(destination);

      if (!stats.isDirectory()) {
        console.error('Destination is not a directory!');

        return;
      }
    } catch (err) {
      console.error('Destination directory does not exist!');

      return;
    }

    const fullDestPath = path.join(destination, path.basename(source));

    try {
      await fs.rename(source, fullDestPath);
    } catch (err) {
      console.error('Error moving file:', err.message);
    }

    return;
  }

  // if destination exists, and it's a dir
  try {
    const stats = await fs.stat(destination);

    if (stats.isDirectory()) {
      const fullDestPath = path.join(destination, path.basename(source));

      try {
        await fs.rename(source, fullDestPath);
      } catch (err) {
        console.error('Error moving file:', err.message);
      }

      return;
    }
  } catch (err) {
  }

  // just renaming source to destination files in other cases
  try {
    await fs.rename(source, destination);
  } catch (err) {
    console.error('Error renaming/moving file:', err.message);
  }
}

moveFiles();
