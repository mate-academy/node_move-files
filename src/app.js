'use strict';

const path = require('path');
const { moveFiles } = require('./modules/moveFiles');

// for checking how it works, use commands below
// node src/app.js  mv file.txt ./destination/
// node src/app.js  mv file.txt ./destination/newFile
// node src/app.js  mv file.txt newFile.txt
// node src/app.js  mv file.txt a

const args = process.argv.slice(2);

const command = args[0];
const fileToMove = args[1];
const fileToMovePath = path.join(__dirname, fileToMove);
const destinationToMove = path.join(__dirname, args[2]);

moveFiles(command, fileToMove, fileToMovePath, destinationToMove);
