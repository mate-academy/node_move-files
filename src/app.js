// write code here
const fs = require('fs');
const path = require('path');

let dest = process.argv[3];
const src = process.argv[2];

try {
  const destInDir = fs.existsSync(dest) && fs.statSync(dest).isDirectory();

  if (destInDir) {
    const newFileName = path.basename(src);

    dest = path.join(dest, newFileName);
  }

  fs.renameSync(src, dest);
} catch (error) {
  global.console.error(error);
}
