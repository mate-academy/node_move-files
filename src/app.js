/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

async function isDirectoryExists(dirPath) {
  try {
    const stats = await fs.stat(dirPath);

    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

async function moveFile() {
  const [, , src, dest] = process.argv;

  if (!src || !dest) {
    console.error('Source and destination paths are required');

    return;
  }

  if (src === dest) {
    return;
  }

  let finalDest = dest;
  const destEndsWithSep = dest.endsWith('/') || dest.endsWith(path.sep);

  if (destEndsWithSep || (await isDirectoryExists(dest))) {
    const exists = await isDirectoryExists(dest);

    if (!exists) {
      console.error('Directory does not exist');

      return;
    }
    finalDest = path.join(dest, path.basename(src));
  }

  try {
    await fs.rename(src, finalDest);
    console.log(`File is moved from '${src}' to '${finalDest}'`);
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
  }
}

moveFile();
