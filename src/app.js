/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');

function moveFiles() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Enter 2 arguments');

    return;
  }

  const source = args[0];
  const destination = args[1];

  if (!fs.existsSync(source)) {
    console.error('Non-existing source file!');

    return;
  }

  if (source === destination) {
    console.log('Source and destination are the same, doing nothing.');

    return;
  }

  const destPath = path.resolve(destination);
  const sourceName = path.basename(source);

  function rewrite(toPath) {
    const content = fs.readFileSync(source, 'utf-8');

    fs.writeFileSync(toPath, content);
    fs.rmSync(source);
  }

  if (fs.existsSync(destPath) && fs.statSync(destPath).isDirectory()) {
    const target = path.join(destPath, sourceName);

    rewrite(target);

    return;
  }

  const parentDir = path.dirname(destPath);

  if (fs.existsSync(parentDir)) {
    rewrite(destPath);
  } else {
    console.error('Non-existing parent directory!');
  }
}

moveFiles();
