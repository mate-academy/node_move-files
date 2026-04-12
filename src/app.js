function main() {
  const fs = require('fs');
  const path = require('path');

  if (process.argv.slice(2).length !== 2) {
    throw new Error('Usage: node app.js <file> <newFile>');
  }

  const [file, newFile] = process.argv.slice(2);

  if (!fs.statSync(newFile).isFile()) {
    throw new Error(`${file} must be a File`);
  }

  if (!fs.existsSync(file)) {
    throw new Error(`${file} doesn't exist`);
  }

  const destExists = fs.existsSync(newFile);
  const stats = destExists ? fs.statSync(newFile) : null;
  const fileName = path.basename(file);
  const parentDir = path.dirname(newFile);

  if (newFile.endsWith('/')) {
    if (!destExists) {
      throw new Error(`${newFile} doesn't exist`);
    }

    const newPath = path.join(newFile, fileName);

    fs.renameSync(file, newPath);

    return;
  }

  if (stats && stats.isDirectory()) {
    const newPath = path.join(newFile, fileName);

    fs.renameSync(file, newPath);

    return;
  }

  if (!fs.existsSync(parentDir)) {
    throw new Error(`Invalid destination path: ${newFile}`);
  }

  fs.renameSync(file, newFile);
}

main();
