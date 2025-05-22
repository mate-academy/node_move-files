/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

const moveFile = async () => {
  try {
    const [sourceFile, destination] = process.argv.slice(2);

    if (!sourceFile || !destination) {
      throw new Error('You must provide source and destination paths.');
    }

    let destinationStat;

    try {
      await fs.stat(sourceFile);
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error('Source file does not exist');
      }
      throw err;
    }

    try {
      destinationStat = await fs.stat(destination);

      if (destinationStat.isDirectory()) {
        const finalPathWithdestination = path.join(
          destination,
          path.basename(sourceFile),
        );

        await fs.rename(sourceFile, finalPathWithdestination);
      } else {
        if (destination.endsWith('/')) {
          throw new Error(
            // eslint-disable-next-line max-len
            'Destination path is expected to be a directory but does not exist or is not recognized as one',
          );
        }
        await fs.rename(sourceFile, destination);
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.rename(sourceFile, destination);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

moveFile();
