'use strict';

const fs = require('fs');
const path = require('path');

function fail(message) {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(0);
}

(function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    return fail('Invalid number of arguments');
  }

  const [sourceArg, destinationArg] = args;
  const sourcePath = path.resolve(sourceArg);
  const destinationPath = path.resolve(destinationArg);

  if (!fs.existsSync(sourcePath)) {
    return fail('Source file does not exist');
  }

  if (!fs.statSync(sourcePath).isFile()) {
    return fail('Source is not a file');
  }

  const destinationExists = fs.existsSync(destinationPath);
  const destinationIsDirectory =
    destinationExists && fs.statSync(destinationPath).isDirectory();
  const destinationEndsWithSlash =
    destinationArg.endsWith('/') || destinationArg.endsWith(path.sep);

  let finalDestination;

  if (destinationIsDirectory || destinationEndsWithSlash) {
    if (!destinationIsDirectory) {
      return fail('Destination directory does not exist');
    }
    finalDestination = path.join(destinationPath, path.basename(sourcePath));
  } else {
    const destDir = path.dirname(destinationPath);

    if (!fs.existsSync(destDir)) {
      return fail('Destination directory does not exist');
    }
    finalDestination = destinationPath;
  }

  if (sourcePath === finalDestination) {
    return;
  }

  try {
    fs.renameSync(sourcePath, finalDestination);
  } catch (err) {
    return fail(`Cannot move file: ${err.message}`);
  }
})();
