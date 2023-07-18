'use strict';

const fs = require('fs');

const mv = () => {
  const [filePath, newPath] = process.argv.slice(2);
  let data = '';

  const newPass
    = newPath[newPath.length - 1] === '/' ? newPath + filePath : newPath;

  try {
    data = fs.readFileSync(filePath, 'utf-8');
    fs.rmSync(filePath);
    fs.writeFileSync(newPass, data);
  } catch (e) {
    console.log('error', e);
  }
};

mv();
