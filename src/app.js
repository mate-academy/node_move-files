const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [sourceFile, destination] = args;
let destinationPath = '';

if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
  destinationPath = path.join(destination, `\\${path.basename(sourceFile)}`);
} else {
  destinationPath = destination;
}

if (args.length < 2) {
  // eslint-disable-next-line no-console
  console.error('missing parameter');
} else {
  fs.rename(sourceFile, destinationPath, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
}
