/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const [oldPath, newPathInput] = process.argv.slice(2);

function app() {
  if (!oldPath || !newPathInput) {
    console.error('Please provide both old path and new path');

    return;
  }

  if (!fs.existsSync(oldPath)) {
    console.error('Source does not exist');

    return;
  }

  const oldStat = fs.statSync(oldPath);

  if (!oldStat.isFile()) {
    console.error('Source must be a file');

    return;
  }

  let destination = newPathInput;
  const stat = fs.existsSync(newPathInput) && fs.statSync(newPathInput);

  if ((stat && stat.isDirectory()) || newPathInput.endsWith('/')) {
    destination = path.join(newPathInput, path.basename(oldPath));
  }

  if (oldPath === destination) {
    return;
  }

  try {
    fs.renameSync(oldPath, destination);
    console.log(`${oldPath} was moved to ${destination}`);
  } catch (err) {
    console.error(`The file could not be moved. Error: ${err.message}`);
  }
}

app();

module.exports = app;
