/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const [, , source, destination] = process.argv;

  if (!source || !destination) {
    console.error('Please provide source and destination');

    return;
  }

  if (source === destination) {
    return;
  }

  let destinationCopy = destination;

  if (fs.existsSync(destination)) {
    const { base: fileName } = path.parse(source);

    destinationCopy = path.join(destination, fileName);
  }

  fs.rename(source, destinationCopy, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('sSuccesfully moved');
    }
  });
}

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('enter source and destination');
} else {
  const [source, destination] = args.map((arg) => path.resolve(arg));

  moveFile(source, destination);
}

module.exports = {
  moveFile,
};
