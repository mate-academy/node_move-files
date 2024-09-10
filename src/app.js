/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  try {
    // Resolve the absolute paths of both source and destination
    const sourcePath = path.resolve(source);
    let destinationPath = path.resolve(destination);

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.error(`Error: Source file "${source}" does not exist.`);

      return;
    }

    // Check if source is a file and not a directory
    const stats = fs.statSync(sourcePath);

    if (!stats.isFile()) {
      console.error('Error: Only file moving is supported.');

      return;
    }

    if (
      destination.endsWith(path.sep) ||
      (fs.existsSync(destinationPath) &&
        fs.statSync(destinationPath).isDirectory())
    ) {
      if (!fs.existsSync(destinationPath)) {
        console.error(
          `Error: Destination directory "${destination}" does not exist.`,
        );

        return;
      }

      // Join the source file's name with the destination directory
      destinationPath = path.join(destinationPath, path.basename(sourcePath));
    }

    // Perform the file rename (move) operation
    fs.renameSync(sourcePath, destinationPath);

    console.log(
      `File moved successfully from ${sourcePath} to ${destinationPath}`,
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Main function to read command line arguments
function main() {
  const args = process.argv.slice(2); // Remove the first two default args

  if (args.length !== 2) {
    console.error('Usage: node app.js <source_file> <destination>');

    return;
  }

  const sourceFile = args[0];
  const destination = args[1];

  moveFile(sourceFile, destination);
}

main();
