'use strict';

const fs = require('fs');
const path = require('path');

function mv(fileFrom, fileTo) {
  if (fileFrom === fileTo) {
    return;
  }

  const basePath = path.join(__dirname, fileFrom);
  const content = fs.readFileSync(basePath, 'utf-8');

  try {
    fs.writeFileSync(fileTo, content);
    fs.unlinkSync(basePath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error(e);
    } else if (e.code === 'EISDIR') {
      try {
        const newPath = fileTo[fileTo.length - 1] === '/'
          ? fileTo + fileFrom
          : fileTo;

        fs.writeFileSync(newPath, content);
        fs.unlinkSync(basePath);
      } catch (err) {
        if (err.code === 'EISDIR') {
          try {
            const newPath = fileTo + '/' + fileFrom;

            fs.writeFileSync(newPath, content);
            fs.unlinkSync(basePath);
          } catch (error) {
            throw new Error(error);
          }
        } else {
          throw new Error(err);
        }
      }
    }
  }
}

mv('test.txt', 'existingDir/test.txt');

module.exports = mv;
