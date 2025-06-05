/* eslint-disable no-console */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const [oldFilePath, newFilePath] = process.argv.slice(2);

  if (!oldFilePath || !newFilePath) {
    console.error('Please provide both the old and new file paths.');

    return;
  }

  if (!fs.existsSync(oldFilePath)) {
    console.error(`The file ${oldFilePath} does not exist.`);

    return;
  }

  let newFullPath = newFilePath;

  if (fs.existsSync(newFilePath) && fs.statSync(newFilePath).isDirectory()) {
    const fileName = path.basename(oldFilePath);

    newFullPath = path.join(newFilePath, fileName);
  }

  fs.rename(oldFilePath, newFullPath, (err) => {
    if (err) {
      console.error('Error moving file:', err);

      return;
    }
    console.log(`File moved from ${oldFilePath} to ${newFullPath}`);
  });
}

moveFile();
