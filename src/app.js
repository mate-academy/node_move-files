/* eslint-disable no-console */
'use strict';

/* I am not mentor to write tests for a plain task with README,
plz notify mentor if you have any suggestions about tests.
Also, writing tests is going out of the README scope. */

const fs = require('fs');
const path = require('path');

function fail(msg) {
  console.error(msg);
}

function isExistingDir(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function isExistingFile(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

function app() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    fail('Expected 2 arguments');

    return;
  }

  const [src, dest] = args;

  if (src === dest) {
    return;
  }

  if (!fs.existsSync(src)) {
    fail(`Source file does not exist: ${src}`);

    return;
  }

  if (!fs.statSync(src).isFile()) {
    fail(`Source must be a file: ${src}`);

    return;
  }

  const srcBase = path.basename(src);

  if (dest.endsWith('/')) {
    if (!isExistingDir(dest)) {
      fail('Wrong destination directory');

      return;
    }

    const finalDest = path.join(dest, srcBase);

    if (isExistingFile(finalDest)) {
      fs.unlinkSync(finalDest);
    }

    fs.renameSync(src, finalDest);

    return;
  }

  if (fs.existsSync(dest)) {
    const dstStat = fs.statSync(dest);

    if (dstStat.isDirectory()) {
      const finalDest = path.join(dest, srcBase);

      if (isExistingFile(finalDest)) {
        fs.unlinkSync(finalDest);
      }

      fs.renameSync(src, finalDest);

      return;
    }

    if (dstStat.isFile()) {
      fs.unlinkSync(dest);
      fs.renameSync(src, dest);

      return;
    }

    fail('Wrong destination directory');

    return;
  }

  const parent = path.dirname(dest);

  if (!isExistingDir(parent)) {
    fail('Wrong destination directory');

    return;
  }

  fs.renameSync(src, dest);
}

app();
