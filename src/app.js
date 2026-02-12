const fs = require('fs');
const path = require('path');

function fail(message) {
  // eslint-disable-next-line no-console
  console.error(message);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    fail('Two arguments required: source and destination');

    return;
  }

  const [source, destination] = args;

  const sourcePath = path.resolve(source);

  if (!fs.existsSync(sourcePath)) {
    fail('Source file does not exist');

    return;
  }

  try {
    const sourceStat = fs.statSync(sourcePath);

    if (!sourceStat.isFile()) {
      fail('Source must be a file');

      return;
    }
  } catch (e) {
    fail('Source file does not exist');

    return;
  }

  let destinationPath = path.resolve(destination);

  if (destinationPath === sourcePath) {
    return;
  }

  try {
    const destinationExists = fs.existsSync(destinationPath);
    const destinationIsDir =
      destinationExists && fs.statSync(destinationPath).isDirectory();

    const endsWithSlash =
      destination.endsWith('/') || destination.endsWith(path.sep);

    if (destinationIsDir || endsWithSlash) {
      if (!destinationExists || !destinationIsDir) {
        throw new Error('Destination directory does not exist');
      }

      destinationPath = path.join(destinationPath, path.basename(sourcePath));

      if (destinationPath === sourcePath) {
        return;
      }
    }

    fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    fail(error.message);
  }
}

main();
