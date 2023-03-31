'use strict';

const move = require('./move');

const [fromPath, toPath] = process.argv.slice(2);

move.moveFile(fromPath, toPath);
