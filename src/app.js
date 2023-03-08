'use strict';

const path = require('path');
const { moveFiles } = require('./modules/moveFiles');

// for checking how it works, use commands below
// node src/app.js  mv file.txt ./destination/
// node src/app.js  mv file.txt ./destination/newFile
// node src/app.js  mv file.txt file.txt
// node src/app.js  mv file.txt a
// node src/app.js  mv file.txt b

const [command, fileToMove, destination] = process.argv.slice(2);

const fileToMovePath = path.join(__dirname, fileToMove);
const destinationToMove = path.join(__dirname, destination);

moveFiles(command, fileToMove, fileToMovePath, destinationToMove);
