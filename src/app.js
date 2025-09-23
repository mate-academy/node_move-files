const fs = require('fs');
const path = require('path');

function move() {
  if (process.argv.slice(2).length !== 2) {
    // eslint-disable-next-line no-console
    console.error(
      'Wrong number of arguments is supplied, should pass 2 arguments',
    );

    return;
  }

  const [sourceFile, destinationFile] = process.argv.slice(2);

  if (!fs.existsSync(sourceFile)) {
    // eslint-disable-next-line no-console
    console.error('Non-existent source file');

    return;
  }

  const dirName = path.dirname(destinationFile);

  if (!fs.existsSync(dirName)) {
    // eslint-disable-next-line no-console
    console.error('Destination directory does not exist');

    return;
  }

  const normalizedSource = path.resolve(sourceFile);
  const normalizedDest = path.resolve(destinationFile);

  if (normalizedSource === normalizedDest) {
    return;
  }

  if (
    fs.existsSync(normalizedDest) &&
    fs.statSync(normalizedDest).isDirectory()
  ) {
    const newFilePath = path.join(normalizedDest, path.basename(sourceFile));

    fs.renameSync(sourceFile, newFilePath);

    return;
  }

  if (destinationFile.endsWith(path.sep)) {
    const newFilePath = path.join(normalizedDest, path.basename(sourceFile));

    fs.renameSync(sourceFile, newFilePath);

    return;
  }

  fs.renameSync(sourceFile, normalizedDest);
}

move();

module.exports = {
  move,
};
