'use strict';

const { getMovedFile } = require('./getMovedFile');
const [source, destination] = process.argv.slice(2);

getMovedFile(source, destination);
