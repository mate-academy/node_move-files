const fs = require('fs');
const path = require('path');

function renameFile() {
  const [, , oldPath, newPath] = process.argv;

  if (!oldPath || !newPath) {
    // eslint-disable-next-line no-console
    console.error('Usage: node script.js <oldPath> <newPath>');

    return;
  }

  if (oldPath === newPath) {
    return;
  }

  if (!fs.existsSync(oldPath)) {
    // eslint-disable-next-line no-console
    console.error(`Source does not exist: ${oldPath}`);

    return;
  }

  let finalDestination = newPath;

  if (fs.existsSync(newPath)) {
    const stats = fs.statSync(newPath);

    if (stats.isDirectory()) {
      finalDestination = path.join(newPath, path.basename(oldPath));
    }
  } else {
    const parentDir = path.dirname(newPath);

    if (!fs.existsSync(parentDir)) {
      // eslint-disable-next-line no-console
      console.error(`Destination directory does not exist: ${parentDir}`);

      return;
    }
  }

  try {
    fs.renameSync(oldPath, finalDestination);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error during rename: ${err.message}`);
  }
}

renameFile();
