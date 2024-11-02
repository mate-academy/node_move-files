const fs = require('fs');
const path = require('path');

function moveFiles(source, destination) {
  if (!source) {
    // eslint-disable-next-line no-console
    console.error('No source provided');

    return;
  }

  if (!destination) {
    // eslint-disable-next-line no-console
    console.error('No destination provided');

    return;
  }

  const isDirectory =
    destination.endsWith('/') ||
    (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory());
  let destinationPath = destination;

  if (isDirectory) {
    destinationPath = path.join(destination, path.basename(source));
  }

  fs.rename(source, destinationPath, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
}

moveFiles(...process.argv.slice(2, 4));
