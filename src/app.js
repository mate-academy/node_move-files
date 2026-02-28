const fs = require('fs');
const path = require('path');

try {
  const [, , source, destination] = process.argv;

  if (!source || !destination) {
    throw new Error('Source and destination are required!');
  }

  const resolvedSource = path.resolve(source);
  const resolvedDestination = path.resolve(destination);

  // Source must exist and be a file
  if (!fs.existsSync(resolvedSource)) {
    throw new Error('Source file does not exist.');
  }

  const sourseStats = fs.statSync(resolvedSource);

  if (!sourseStats.isFile()) {
    throw new Error('Only files can be moved');
  }

  let finalDestination = resolvedDestination;

  const destinationEndsWithSlash = destination.endsWith(path.sep);

  if (destinationEndsWithSlash) {
    // Destination must be an existing directory
    if (!fs.existsSync(resolvedDestination)) {
      throw new Error('Destination directory does not exist');
    }

    const destStats = fs.statSync(resolvedDestination);

    if (!destStats.isDirectory()) {
      throw new Error('Destination is not a directory');
    }

    finalDestination = path.join(
      resolvedDestination,
      path.basename(resolvedSource),
    );
  } else if (fs.existsSync(resolvedDestination)) {
    const destStats = fs.statSync(resolvedDestination);

    if (destStats.isDirectory()) {
      // move file into existing directory
      finalDestination = path.join(
        resolvedDestination,
        path.basename(resolvedSource),
      );
    }
  }

  fs.renameSync(resolvedSource, finalDestination);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error.message);
}
