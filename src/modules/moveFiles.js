'use strict';

const { readFile } = require('./readFile');
const { writeFile } = require('./writeFile');
const { deleteFile } = require('./deleteFile');
const { renameFile } = require('./renameFile');

const moveFiles = (
  command,
  fileToMove,
  fileToMovePath,
  destinationToMove
) => {
  if (command === 'mv') {
    const data = readFile(fileToMovePath);

    if (destinationToMove.endsWith('.txt')) {
      renameFile(fileToMovePath, destinationToMove);
    } else if (destinationToMove.endsWith('/')) {
      writeFile(destinationToMove + fileToMove, data);

      deleteFile(fileToMovePath);
    } else {
      const status = writeFile(destinationToMove + '/' + fileToMove, data);

      if (status === -1) {
        writeFile(destinationToMove + '.txt', data);
      }

      deleteFile(fileToMovePath);
    }
  } else {
    global.console.log('Wrong command - for moving use "mv"');
  }
};

module.exports = { moveFiles };
