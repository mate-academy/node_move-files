'use strict';

const fs = require('fs');
const path = require('path');

const [from, to] = process.argv.slice(2);

const destination = to.endsWith('/')
  ? path.join(to, path.basename(from)) : to;

if (!fs.existsSync(path.dirname(destination))) {
  throw new Error('Directory does not exists.');
}

try {
  fs.renameSync(from, destination);
} catch (error) {
  throw new Error(error.message);
}
