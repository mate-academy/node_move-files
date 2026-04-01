const fs = require('fs');
const path = require('path');

function moveFiles() {
  const [source, destination] = process.argv.slice(2);

  try {
    if (!source || !destination) {
      throw new Error('Invzlid arguments');
    }

    if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
      throw new Error('Source is not a file');
    }

    let finalDest = destination;

    if (destination.endsWith('/')) {
      if (
        !fs.existsSync(destination) ||
        !fs.statSync(destination).isDirectory()
      ) {
        throw new Error('Destination directory does not exist');
      }

      finalDest = path.join(destination, path.basename(source));
    } else if (
      fs.existsSync(destination) &&
      fs.statSync(destination).isDirectory()
    ) {
      finalDest = path.join(destination, path.basename(source));
    }

    fs.renameSync(source, finalDest);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

moveFiles();
