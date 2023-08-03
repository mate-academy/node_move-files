'use strict';

const moveFile = require('./moveFile');
const terminal = require('./modules/terminal');

terminal.question('Enter your command: ', (key) => {
  const [command, fileName, moveTo] = key.trim().split(' ');

  if (command !== 'mv') {
    throw new Error('Unknown command!');
  }

  try {
    moveFile(fileName, moveTo);
    terminal.close();
  } catch (error) {
    throw new Error(error);
  }
});
