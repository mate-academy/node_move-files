'use strict';

const moveFile = require('./moveFile');
const terminal = require('./modules/terminal');

terminal.question('Enter your command: ', (key) => {
  const [command, fileName, moveTo] = key.split(' ');

  if (command !== 'mv') {
    throw new Error('Unknown command!');
  }

  moveFile(fileName, moveTo);
  terminal.close();
});
