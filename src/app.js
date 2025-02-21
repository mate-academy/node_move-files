const fs = require('fs');
const path = require('path');

function moveFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Error: Please provide both source and destination paths');
    return;
  }

  const [source, destination] = args;
  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
    console.error(
      `Error: Source file "${source}" does not exist or is not a file`,
    );
    return;
  }

  const destinationLooksLikeDir =
    destination.endsWith('/') ||
    (fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory());

  if (destinationLooksLikeDir) {
    if (!fs.existsSync(destinationPath)) {
      console.error(
        `Error: Destination directory "${destinationPath}" does not exist`,
      );
      return;
    }

    const newFilePath = path.join(destinationPath, path.basename(sourcePath));
    fs.renameSync(sourcePath, newFilePath);
  } else {
    const destinationDir = path.dirname(destinationPath);

    if (!fs.existsSync(destinationDir)) {
      console.error(
        `Error: Destination directory "${destinationDir}" does not exist`,
      );
      return;
    }
    fs.renameSync(sourcePath, destinationPath);
  }

  console.log(`File moved successfully: ${sourcePath} -> ${destinationPath}`);
}

moveFile();
