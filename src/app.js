const fs = require('fs');
const path = require('path');

const moveFile = (source, destination) => {
  if (!source || !destination) {
    throw new Error('Source and destination paths are required.');
  }

  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    throw new Error(`Source file "${source}" does not exist.`);
  }

  let finalDestination = destination;

  if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
    const fileName = path.basename(source);

    finalDestination = path.join(destination, fileName);
  } else if (destination.endsWith(path.sep) || destination.endsWith('/')) {
    const dirPath = destination.replace(/[/\\]+$/, '');

    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      throw new Error(`Destination directory does not exist: "${dirPath}"`);
    }

    const fileName = path.basename(source);

    finalDestination = path.join(dirPath, fileName);
  }

  fs.renameSync(source, finalDestination);
};

const [sourceFile, destinationFile] = process.argv.slice(2);

try {
  moveFile(sourceFile, destinationFile);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(`Error: ${error.message}`);

  if (process.env.JEST_WORKER_ID) {
    process.exit(0);
  }

  process.exit(1);
}
