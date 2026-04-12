/* eslint-disable no-console */
function main() {
  const fs = require('fs');
  const path = require('path');

  const [file, newFile] = process.argv.slice(2);

  if (!fs.existsSync(file)) {
    console.error(`${file} doesn't exist`);

    return;
  }

  const destExists = fs.existsSync(newFile);
  const stats = destExists ? fs.statSync(newFile) : null;
  const fileName = path.basename(file);

  if (newFile.endsWith('/')) {
    if (!destExists) {
      console.error(`${newFile} doesn't exist`);

      return;
    }

    fs.renameSync(file, `${newFile}${fileName}`);

    return;
  }

  if (stats.isDirectory()) {
    fs.renameSync(file, `${newFile}${fileName}`);

    return;
  }

  fs.renameSync(file, newFile);
}

main();
