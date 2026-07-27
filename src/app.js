const fs = require('fs');
const path = require('path');

function moveFile() {
  const source = process.argv[2];
  const destination = process.argv[3];

  try {
    if (!source || !destination) {
      throw new Error('Missing source or destination argument.');
    }

    if (source === destination) {
      return;
    }

    if (!fs.existsSync(source)) {
      throw new Error('The specified source file does not exist.');
    }

    let finalDestination = destination;
    const isDestinationEndingWithSlash =
      destination.endsWith('/') || destination.endsWith('\\');

    if (isDestinationEndingWithSlash) {
      if (
        !fs.existsSync(destination) ||
        !fs.statSync(destination).isDirectory()
      ) {
        throw new Error('The specified destination directory does not exist.');
      }
      finalDestination = path.join(destination, path.basename(source));
    } else {
      if (
        fs.existsSync(destination) &&
        fs.statSync(destination).isDirectory()
      ) {
        finalDestination = path.join(destination, path.basename(source));
      } else {
        const parentDirectory = path.dirname(destination);

        if (parentDirectory !== '.' && !fs.existsSync(parentDirectory)) {
          throw new Error(
            'The parent directory for the specified destination not exist',
          );
        }
      }
    }

    fs.renameSync(source, finalDestination);
  } catch (error) {
    process.stderr.write('Error: ' + error.message + '\n');
  }
}

moveFile();
