// write code here
const fs = require('fs');
const path = require('path');

function moveFile() {
  const [from, to] = process.argv.slice(2);

  const destination =
    fs.existsSync(to) && fs.statSync(to).isDirectory()
      ? path.join(to, path.basename(from))
      : to;

  try {
    fs.renameSync(from, destination);
    // eslint-disable-next-line no-console
    console.log(`File moved to ${destination}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Failed to move file: ${err.message}`);
  }
}

moveFile();
