/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const app = () => {
  const sourcePath = process.argv[2];
  const destinationPath = process.argv[3];
  let finalDestination = destinationPath;

  if (!sourcePath || !destinationPath) {
    throw new Error('Missing arguments');
  }

  if (sourcePath === destinationPath) {
    return;
  }

  if (destinationPath[destinationPath.length - 1] === '/') {
    if (!fs.existsSync(destinationPath)) {
      throw new Error('No such directory');
    } else {
      finalDestination = path.join(destinationPath, path.basename(sourcePath));
    }
  } else {
    const targetDir = path.dirname(destinationPath);

    if (!fs.existsSync(targetDir)) {
      throw new Error('No such directory');
    }

    if (
      fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory()
    ) {
      finalDestination = path.join(destinationPath, path.basename(sourcePath));
    }
  }

  try {
    const content = fs.readFileSync(sourcePath);

    fs.writeFileSync(finalDestination, content);
    fs.unlinkSync(sourcePath);
  } catch (error) {
    throw error;
  }
};

module.exports = { app };

try {
  app();
} catch (error) {
  console.error(error.message);
}
