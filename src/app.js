/* eslint-disable no-console */
// write code here
const fs = require('fs');
const path = require('path');

function main() {
  const [sourceVar, destVar] = process.argv.slice(2);

  if (sourceVar === undefined || destVar === undefined) {
    console.error('Specify params');

    return;
  }

  const source = sourceVar.replaceAll(path.sep, '/');
  const dest = destVar.replaceAll(path.sep, '/');

  if (!fs.existsSync(source)) {
    console.error('Source file does not exist');

    return;
  }

  if (source === dest) {
    console.log('The destination is same as source');

    return;
  }

  const sourcePath = source.split('/');
  const sourceFileName = sourcePath.at(-1);

  const destPath = dest.split('/');
  const destDirectory = destPath.slice(0, -1).join('/');

  if (dest.endsWith('/')) {
    const folderExists = fs.existsSync(dest);

    if (folderExists) {
      fs.copyFileSync(source, path.join(dest, sourceFileName));
      fs.unlinkSync(source);

      return;
    } else {
      console.error('Folder does not exist');

      return;
    }
  }

  if (fs.existsSync(dest)) {
    fs.copyFileSync(source, path.join(dest, sourceFileName));
    fs.unlinkSync(source);

    return;
  }

  if (fs.existsSync(destDirectory)) {
    fs.copyFileSync(source, dest);
    fs.unlinkSync(source);

    return;
  }

  console.error('Folder does not exist');
}

main();
