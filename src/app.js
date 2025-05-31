// write code here

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    throw new Error('Please provide source and destination paths');
  }

  const [sourcePath, destinationPath] = args;

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file '${sourcePath}' does not exist`);
  }

  const sourceStats = fs.statSync(sourcePath);

  if (!sourceStats.isFile()) {
    throw new Error(`Source '${sourcePath}' is not a file`);
  }

  const destinationIsDirectory = destinationPath.endsWith('/');

  let finalDestination;

  if (destinationIsDirectory) {
    if (!fs.existsSync(destinationPath)) {
      throw new Error(
        `Destination directory '${destinationPath}' does not exist`,
      );
    }

    const fileName = path.basename(sourcePath);

    finalDestination = path.join(destinationPath, fileName);
  } else {
    if (
      fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory()
    ) {
      const fileName = path.basename(sourcePath);

      finalDestination = path.join(destinationPath, fileName);
    } else {
      finalDestination = destinationPath;
    }
  }

  try {
    fs.renameSync(sourcePath, finalDestination);
    console.log(`File moved from ${sourcePath} to ${finalDestination}`);
  } catch (error) {
    throw new Error(`Failed to move file: ${error.message}`);
  }
}

try {
  moveFile();
} catch (error) {
  console.error(`Error: ${error.message}`);
}
