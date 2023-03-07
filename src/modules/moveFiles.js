'use strict';

const { renameFile } = require('./renameFile');

const moveFiles = (
  command,
  fileToMove,
  fileToMovePath,
  destinationToMove
) => {
  if (command === 'mv') {
    if (destinationToMove.endsWith('.txt')) {
      renameFile(fileToMovePath, destinationToMove);
    } else if (destinationToMove.endsWith('/')) {
      renameFile(fileToMovePath, destinationToMove + fileToMove);
    } else {
      try {
        renameFile(fileToMovePath, destinationToMove + '/' + fileToMove);
      } catch (error) {
        renameFile(fileToMovePath, destinationToMove + '.txt');
      }
    }
  } else {
    global.console.log('Wrong command - for moving use "mv"');
  }
};

module.exports = { moveFiles };
