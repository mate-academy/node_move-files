'use strict';

const { moveFile } = require('./moveFile');
const [sourcePath, directPath] = process.argv.slice(2);

moveFile(`src/${sourcePath}`, `src/${directPath}`);
