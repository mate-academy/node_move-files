'use strict';

const fs = require('fs');

const moveFile = () => {
  const [file, path] = process.argv.slice(2);
  let newPath = path;
  const isDir = path[path.length - 1] === '/';

  if (isDir || (!isDir && fs.existsSync(path))) {
    newPath += file;
  }

  if (!fs.existsSync(newPath) && newPath.includes('/')) {
    throw new Error('No such directory');
  }

  const data = fs.readFileSync(file, 'utf8');

  fs.writeFileSync(newPath, data);

  fs.unlinkSync(file);
};

module.exports = {
  moveFile,
};
