'use strict';

const { move } = require('./move');

const [fileName, newPath] = process.argv.slice(2);

move(fileName, newPath);
