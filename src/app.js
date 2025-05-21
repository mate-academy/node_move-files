const fs = require('fs');
const path = require('path');

const moveFile = () => {
  const params = process.argv.slice(2);
  const file = params[0];
  const destination = params[1];

  if (!file || !destination) {
    // eslint-disable-next-line no-console
    console.error('Error');

    return;
  }

  if (!fs.existsSync(file) || !fs.lstatSync(file).isFile()) {
    // eslint-disable-next-line no-console
    console.error(`File doesn't exists or its not a file`);

    return;
  }

  let finalDestination = destination;
  const destinationExists = fs.existsSync(destination);
  const endSlash = destination.endsWith(path.sep);

  if (destinationExists && fs.lstatSync(destination).isDirectory()) {
    finalDestination = path.join(destination, path.basename(file));
  } else if (!destinationExists && endSlash) {
    // eslint-disable-next-line no-console
    console.error(`Destination directory "${destination}" does not exist.`);

    return;
  }

  const parentDir = path.dirname(finalDestination);

  if (!fs.existsSync(parentDir)) {
    // eslint-disable-next-line no-console
    console.error(`Error: Parent directory "${parentDir}" does not exist.`);

    return;
  }

  try {
    fs.renameSync(file, finalDestination);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error moving file: ${err.message}`);
  }
};

moveFile();
