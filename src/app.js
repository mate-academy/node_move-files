'use strict';

const fs = require('fs').promises;
const path = require('path');

const copyFile = async () => {
  const [currentLocation, locationToCopy] = process.argv.slice(2);

  if (currentLocation === undefined || locationToCopy === undefined) {
    console.error('Not enough parameters');

    return;
  }

  const resolvedSource = path.resolve(currentLocation);
  const resolvedDestination = path.resolve(locationToCopy);

  if (resolvedSource === resolvedDestination) {
    return;
  }

  try {
    await fs.access(resolvedSource);
  } catch (err) {
    console.error(err);

    return;
  }

  try {
    const sourceStats = await fs.stat(resolvedSource);

    if (sourceStats.isDirectory()) {
      console.error('Source is a directory');

      return;
    }
  } catch (err) {
    console.error(err);

    return;
  }

  const content = await fs.readFile(resolvedSource, 'utf-8');

  try {
    let destinationStats;

    try {
      destinationStats = await fs.stat(resolvedDestination);

      if (destinationStats.isDirectory()) {
        await fs.writeFile(
          path.join(resolvedDestination, path.basename(resolvedSource)),
          content,
        );
      } else {
        await fs.writeFile(resolvedDestination, content);
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        const destinationDir = path.dirname(resolvedDestination);

        try {
          await fs.access(destinationDir);
        } catch {
          console.error('Destination directory does not exist');

          return;
        }

        await fs.writeFile(resolvedDestination, content);
      } else {
        throw err;
      }
    }

    await fs.unlink(resolvedSource);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { copyFile };
