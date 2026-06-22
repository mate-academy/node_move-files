/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const fs = require('fs/promises');
const path = require('node:path');

const sourceFile = process.argv[2];
const destination = process.argv[3];

if (process.argv.length <= 2) {
  console.error('Zero argument is provided');
  process.exit(0);
}

if (process.argv.length === 3) {
  console.error('Only one argument is provided');
  process.exit(0);
}

const filePath = path.join(destination, path.basename(sourceFile));

async function move(file, to, fullPath) {
  let isDirectory = false;

  try {
    const stats = await fs.stat(to);

    isDirectory = stats.isDirectory();
  } catch {
    isDirectory = false;
  }

  if (to.endsWith('/') || to.endsWith('\\')) {
    try {
      if (isDirectory) {
        await fs.rename(file, fullPath);
      } else {
        console.error('directory is not exist');
        process.exit(0);
      }
    } catch (err) {
      console.error('Something went wrong');
      process.exit(0);
    }
  } else if (isDirectory) {
    try {
      await fs.rename(file, fullPath);
    } catch {
      console.error('directory does not exist');
      process.exit(0);
    }
  } else {
    try {
      await fs.rename(file, to);
    } catch {
      console.error('Source file is not exist');
      process.exit(0);
    }
  }
}

move(sourceFile, destination, filePath);
