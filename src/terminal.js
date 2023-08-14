'use strict';

const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function writeToTerminal(message) {
  terminal.write(message);
}

function closeTerminal(message) {
  terminal.close();
}

module.exports = {
  writeToTerminal,
  closeTerminal,
};
