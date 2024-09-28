/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const [source, destination] = process.argv.slice(2);

try {
  const sourceBaseName = path.basename(source);
  const initialExistDirectory = fs.existsSync(destination);

  if (source !== destination) {
    if (initialExistDirectory) {
      const destPath = path.join(destination, sourceBaseName);

      fs.renameSync(source, destPath);
    } else {
      fs.renameSync(source, destination);
    }
  }
} catch (e) {
  console.error(e.message);
}
