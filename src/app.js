const fs = require('node:fs');
const path = require('node:path');

function moveFiles() {
  const argv = process.argv.slice(2);

  if (argv.length !== 2) {
    /* eslint-disable no-console */
    // throw new Error('You need to pass two arguments!');
    console.error('You need to pass two arguments!');

    return;
  }

  const [srcArg, destArgv] = argv;

  const src = path.resolve(srcArg);
  const dest = path.resolve(destArgv);

  if (!fs.existsSync(src) || !fs.statSync(src).isFile()) {
    // throw new Error('Please check if the file you want to transfer exists!');

    console.error('Please check if the file you want to transfer exists!');

    return;
  }

  const destIsDir = destArgv.endsWith(path.sep);
  let finalPath = '';

  if (destIsDir) {
    if (!fs.existsSync(dest) || !fs.statSync(dest).isDirectory()) {
      // throw new Error('Destination must be an existing directory!');
      console.error('Destination must be an existing directory!');

      return;
    }

    finalPath = path.join(dest, path.basename(src));
  } else {
    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      finalPath = path.join(dest, path.basename(src));
    } else {
      finalPath = dest;
    }
  }

  const parentDir = path.dirname(finalPath);

  if (!fs.existsSync(parentDir)) {
    // throw new Error('Destination directory does not exist!');
    console.error('Destination directory does not exist!');

    return;
  }

  try {
    fs.renameSync(src, finalPath);
  } catch (err) {
    console.error(`Failed to move file: ${err.message}`);
  }
}

moveFiles();
