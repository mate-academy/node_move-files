const fs = require('fs');
const path = require('path');

function renameFile() {
  const [, , oldPath, newPath] = process.argv;

  if (!oldPath || !newPath) {
    // eslint-disable-next-line no-console
    console.error('Please provide both source and destination.');

    return;
  }

  if (!fs.existsSync(oldPath)) {
    // eslint-disable-next-line no-console
    console.error(`Source file does not exist: ${oldPath}`);

    return;
  }

  const endsWithSlash = newPath.endsWith('/') || newPath.endsWith('\\');

  if (endsWithSlash && !fs.existsSync(newPath)) {
    // eslint-disable-next-line no-console
    console.error(`Destination directory does not exist: ${newPath}`);

    return;
  }

  let finalDestination = newPath;

  if (fs.existsSync(newPath)) {
    const stats = fs.statSync(newPath);

    if (stats.isDirectory()) {
      finalDestination = path.join(newPath, path.basename(oldPath));
    } else {
      finalDestination = newPath;
    }
  } else {
    const parentDir = path.dirname(newPath);

    if (!fs.existsSync(parentDir)) {
      // eslint-disable-next-line no-console
      console.error(
        `The directory for the new path does not exist: ${parentDir}`,
      );

      return;
    }

    finalDestination = newPath;
  }

  try {
    fs.renameSync(oldPath, finalDestination);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Operation failed: ${err.message}`);
  }
}

renameFile();
