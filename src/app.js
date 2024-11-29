/* eslint-disable no-console */
// write code here

const fs = require('fs');
const path = require('path');

const [source, destination] = process.argv.slice(2);

const moveFile = (src, dest) => {
  fs.stat(dest, (destStatError, destStat) => {
    if (destStatError && destStatError.code !== 'ENOENT') {
      return console.error('Error: Destination path check failed.');
    }

    const destPath =
      destStat && destStat.isDirectory()
        ? path.join(dest, path.basename(src))
        : dest;

    fs.rename(src, destPath, (renameError) => {
      if (renameError) {
        return console.error('Error: Failed to move file.', renameError);
      }

      console.log(`File moved successfully to ${destPath}`);
    });
  });
};

if (!source || !destination) {
  console.error('Source or destination is not exist');
} else {
  moveFile(source, destination);
}
