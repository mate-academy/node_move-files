/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const moveFile = () => {
  const [file, destination] = process.argv.slice(2);

  if (!file || !destination) {
    console.error('Usage: node app.js <file> <destination>');

    return;
  }

  const sourcePath = path.resolve(file);
  const destinationPath = path.resolve(destination);

  if (sourcePath === destinationPath) {
    return;
  }

  let data;

  try {
    data = fs.readFileSync(sourcePath);
  } catch (err) {
    console.error(err.message);

    return;
  }

  try {
    if (destination[destination.length - 1] === '/') {
      if (!fs.existsSync(destination)) {
        console.error(`Destination directory does not exist: ${destination}`);

        return;
      } else {
        fs.writeFileSync(path.join(destination, file), data);
      }
    } else if (fs.existsSync(destinationPath)) {
      const stats = fs.statSync(destinationPath);

      if (stats.isDirectory()) {
        fs.writeFileSync(
          path.join(destinationPath, path.basename(sourcePath)),
          data,
        );
      } else {
        fs.writeFileSync(destinationPath, data);
      }
    } else {
      const destinationDir = path.dirname(destinationPath);

      if (!fs.existsSync(destinationDir)) {
        console.error(
          `Destination directory does not exist: ${destinationDir}`,
        );

        return;
      }

      fs.writeFileSync(destinationPath, data);
    }

    fs.unlinkSync(sourcePath);
  } catch (err) {
    console.error(err.message);
  }
};

moveFile();

module.exports = {
  moveFile,
};
