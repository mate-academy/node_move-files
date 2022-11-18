/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const chalk = require('chalk');

function moveFile(from, to) {
  const data = fs.readFileSync(from);

  fs.writeFileSync(to, data);

  fs.unlink(from, (err) => {
    if (err) {
      console.log(chalk.bold.red('Something went wrong'));
    }
  });
}

module.exports = { moveFile };
