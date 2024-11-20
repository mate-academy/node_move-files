/* eslint-disable no-console */
// write code here
const fs = require('fs');
const path = require('path');

function moveFile() {
  const [from, to] = process.argv.slice(2);

  const dest =
    fs.existsSync(to) && fs.statSync(to).isDirectory()
      ? path.join(to, path.basename(from))
      : to;

  try {
    fs.renameSync(from, dest);
    console.log(`File moved to ${dest}`);
  } catch (err) {
    console.error(`Failed to move file: ${err.message}`);
  }
}

moveFile();
