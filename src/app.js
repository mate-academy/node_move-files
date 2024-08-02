/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');

const [src, dest] = process.argv.slice(2);

const moveFile = () => {
  if (!src || !dest) {
    console.error('Please provide correct data');

    return;
  }

  const fullSrcPath = path.resolve(src);
  const fullDestPath = path.resolve(dest);

  const isExistsDestPath = fs.existsSync(fullDestPath);

  if (isExistsDestPath) {
    const destStat = fs.statSync(fullDestPath);

    const newDestPath = destStat.isDirectory()
      ? path.join(fullDestPath, path.basename(fullSrcPath))
      : fullDestPath;

    fs.rename(fullSrcPath, newDestPath, (err) => {
      if (err) {
        console.error(err);
      }
    });

    return;
  }

  fs.rename(fullSrcPath, fullDestPath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

moveFile();
