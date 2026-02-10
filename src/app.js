// write code here
const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    // eslint-disable-next-line no-console
    console.error('Two arguments required: source and destination');

    return;
  }

  const [source, destination] = args;

  const sourcePath = path.resolve(source);

  if (!fs.existsSync(sourcePath)) {
    // eslint-disable-next-line no-console
    console.error('Source file does not exist');

    return;
  }

  let destinationPath = path.resolve(destination);

  try {
    const destinationExists = fs.existsSync(destinationPath);
    const destinationIsDir =
      destinationExists && fs.statSync(destinationPath).isDirectory();

    const endsWithSlash = destination.endsWith(path.sep);

    if (destinationIsDir || endsWithSlash) {
      if (!destinationExists || !destinationIsDir) {
        throw new Error('Destination directory does not exist');
      }

      const fileName = path.basename(sourcePath);

      destinationPath = path.join(destinationPath, fileName);
    }

    fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

main();
