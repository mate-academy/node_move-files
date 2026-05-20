// write code here

const fs = require('fs/promises');
const path = require('path');

async function setDestinationPath(sourcePath, destinationPath) {
  const absoluteDestination = path.resolve(destinationPath);

  try {
    const stats = await fs.stat(absoluteDestination);

    if (stats.isDirectory()) {
      return path.join(absoluteDestination, path.basename(sourcePath));
    }

    return absoluteDestination;
  } catch {
    if (destinationPath.endsWith(path.sep)) {
      throw new Error('Directory does not exist');
    }

    return absoluteDestination;
  }
}

async function main() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    // eslint-disable-next-line no-console
    console.error('Source and destination paths are required');

    return;
  }

  const absoluteSource = path.resolve(source);

  try {
    await fs.access(absoluteSource);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('File does not exist');

    return;
  }

  try {
    const normalizedDestination = await setDestinationPath(
      absoluteSource,
      destination,
    );

    if (absoluteSource === normalizedDestination) {
      return;
    }

    await fs.rename(absoluteSource, normalizedDestination);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

main();
