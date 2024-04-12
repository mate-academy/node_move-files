/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function move() {
  if (process.argv.length < 4) {
    console.error('Two parametres required');
  } else {
    const [src, dest] = process.argv.slice(2);

    if (src === dest) {
      return;
    }

    try {
      const fileData = fs.readFileSync(src, 'utf-8');

      const destinationExists = fs.existsSync(dest);

      const destinationIsDirectory = destinationExists
        ? fs.statSync(dest).isDirectory()
        : false;

      const fileName = path.basename(src);

      const newDest = destinationIsDirectory ? path.join(dest, fileName) : dest;

      if (destinationIsDirectory && !destinationExists) {
        console.error(`Directory doesn't exist`);

        return;
      }

      fs.writeFileSync(newDest, fileData);
      fs.unlinkSync(src);
      console.log('File moved successfully');
    } catch (err) {
      console.error(err);
    }
  }
}

move();
