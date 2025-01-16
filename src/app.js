/* eslint-disable */
const fs = require('fs');
const path = require('path');

function moveFile(src, dest) {
  try {
    if (!fs.existsSync(src)) {
      console.error(`Source file '${src}' does not exist.`);
      return;
    }

    const destDir = path.dirname(dest);

    if (dest.endsWith('/')) {
      if (!fs.existsSync(dest)) {
        console.error(`Destination directory '${dest}' does not exist.`);
        return;
      }
      dest = path.join(dest, path.basename(src));
    } else if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      dest = path.join(dest, path.basename(src));
    } else if (!fs.existsSync(destDir)) {
      console.error(`Destination directory '${destDir}' does not exist.`);
      return;
    }

    fs.renameSync(src, dest);
    console.log(`Moved '${src}' to '${dest}'`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Error: No parameters provided.');

    return;
  }

  if (args.length === 1) {
    console.error('Error: Only one parameter provided.');

    return;
  }

  if (args.length > 2) {
    console.error('Error: More than two parameters provided.');

    return;
  }

  const [source, destination] = args;
  moveFile(source, destination);
}

main();

module.exports = { main };
