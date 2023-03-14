'use strict';

const moveFiles = require('./src/app.js');

const [ sourceFile, destPath ] = process.argv.slice(2);

moveFiles(sourceFile, destPath);
