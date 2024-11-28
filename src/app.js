/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const params = process.argv.slice(2);
  const source = params[0];
  const destination = params[1];

  if (!source || !destination) {
    console.error('Please provide a source file and a destination file.');

    return;
  }

  if (!fs.existsSync(source)) {
    console.error('File does not exist.');

    return;
  }

  const destinationExists = fs.existsSync(destination);

  if (destinationExists) {
    const destStat = fs.statSync(destination);

    const newDestPath = destStat.isDirectory()
      ? path.join(destination, path.basename(source))
      : destination;

    fs.rename(source, newDestPath, (err) => {
      if (err) {
        console.error(err);
      }
    });

    return;
  }

  fs.copyFile(source, destination, (copyErr) => {
    if (copyErr) {
      console.error('Error during copying:', copyErr.message);

      return;
    }

    fs.unlink(source, (unlinkErr) => {
      if (unlinkErr) {
        console.error(
          'Error during deletion of source file:',
          unlinkErr.message,
        );

        return;
      }

      console.log('File successfully moved!');
    });
  });
}

moveFile();
