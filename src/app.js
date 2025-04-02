/* eslint-disable no-console */

// write code here
const fs = require('fs');

const path = require('path');

function moveFile(src, dst) {
  let dstFixed = dst;

  const srcFileName = path.basename(src);
  const dstFolder = path.dirname(dst);

console.log(dstFolder);

  if (src === undefined || dst === undefined) {
    console.error('error if only one argument is provided');

    return;
  }

  if (src === dst) {
    return;
  }

  // src must exist
  if (!fs.existsSync(src)) {
    console.error('error for non-existent source file');

    return;
  }

  if (!fs.existsSync(dstFolder)) {
    console.error('destination path must exist');

    return;
  }

  // if dst has a /, must exist and be a directory
  if (dst[dst.length - 1] === '/' || dst[dst.length - 1] === '\\') {
    // dst its a folder and must exist
    if (!fs.existsSync(dst)) {
      console.error('destination directory must exist');

      return;
    } else {
      if (!fs.lstatSync(dst).isDirectory()) {
        console.error('destination must be a directory');

        return;
      }

      dstFixed = path.join(dstFixed, srcFileName);
    }
  } else {
    // if dst exists mus be a directory
    if (fs.existsSync(dst)) {
      if (fs.lstatSync(dst).isDirectory()) {
        dstFixed = path.join(dstFixed, srcFileName);
      } else {
        console.error('destination already exists');

        return;
      }
    }
  }

  fs.renameSync(src, dstFixed);
}

function main() {
  if (process.argv.length !== 4) {
    console.error('Requires two arguments');

    return;
  }

  moveFile(process.argv[2], process.argv[3]);
}

main();

module.exports = { moveFile };
