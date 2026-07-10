/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function move() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    console.error('Both paths should be provided');

    return;
  }

  if (source === destination) {
    return;
  }

  if (!fs.existsSync(source)) {
    console.error('Non-existent source file');

    return;
  }

  if (destination.endsWith('/')) {
    if (!fs.existsSync(destination)) {
      console.error("Directory doesn't exist");

      return;
    }

    const fileName = path.basename(source);
    const finalDest = path.join(destination, fileName);

    fs.rename(source, finalDest, (renameError) => {
      if (renameError) {
        console.error('Move error');
      }
    });

    return;
  }

  fs.stat(destination, (destError, destStats) => {
    let finalDest = destination;

    if (!destError && destStats.isDirectory()) {
      const fileName = path.basename(source);

      finalDest = path.join(destination, fileName);
    } else if (destError && destError.code !== 'ENOENT') {
      console.error('Move error');

      return;
    }

    fs.rename(source, finalDest, (renameError) => {
      if (renameError) {
        console.error('Move error');
      }
    });
  });
}

move();
