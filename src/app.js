const fs = require('node:fs');
const path = require('node:path');

const [fileName, destination] = process.argv.slice(2);

function moveFile(file, location) {
  if (!file || !location) {
    // eslint-disable-next-line no-console
    console.error('Please specify both source file and destination.');

    return;
  }

  if (!fs.existsSync(file)) {
    // eslint-disable-next-line no-console
    console.error('Source file does not exist.');

    return;
  }

  if (file === location) {
    return;
  }

  try {
    const isDestinationDir =
      fs.existsSync(location) && fs.statSync(location).isDirectory();

    if (isDestinationDir) {
      const targetPath = path.join(location, path.basename(file));

      fs.copyFileSync(file, targetPath);
      fs.rmSync(file);

      // eslint-disable-next-line no-console
      console.log(`Moved file to directory: ${targetPath}`);

      return;
    }

    const destDir = path.dirname(location);
    const destExists = fs.existsSync(destDir);

    if (destExists) {
      fs.renameSync(file, location);

      // eslint-disable-next-line no-console
      console.log(`File renamed/moved to: ${location}`);

      return;
    }

    // eslint-disable-next-line no-console
    console.error('Destination does not exist');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while moving file:', err.message);
  }
}

moveFile(fileName, destination);
