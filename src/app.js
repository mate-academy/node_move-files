/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function app() {
  if (process.argv.length < 4) {
    console.error('notEnoughArgs');

    return;
  }

  const [from, to] = process.argv.slice(2, 4);

  if (!fs.existsSync(from)) {
    console.error('fromNonexistent');

    return;
  }

  if (fs.lstatSync(from).isDirectory()) {
    console.error('sourceIsDir');

    return;
  }

  let addExt = false;

  if (to.endsWith('/')) {
    if (!fs.existsSync(to) || !fs.lstatSync(to).isDirectory()) {
      console.error('toNonexistent');

      return;
    }
    addExt = true;
  } else if (fs.existsSync(to) && fs.lstatSync(to).isDirectory()) {
    addExt = true;
  } else {
    if (
      !fs.existsSync(path.dirname(to)) ||
      !fs.lstatSync(path.dirname(to)).isDirectory()
    ) {
      console.error('toNonexistent');

      return;
    }
  }

  if (from === (addExt ? path.join(to, path.basename(from)) : to)) {
    return;
  }

  fs.renameSync(from, addExt ? path.join(to, path.basename(from)) : to);
}

app();
