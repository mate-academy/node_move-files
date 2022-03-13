'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const [command, source, destination] = process.argv.slice(2);
let toPath = destination;

fs.stat(source, (error, stats) => {
  if (error) {
    throw error;
  }

  if (!stats.isFile()) {
    console.log(`\n ${source}: There is no such file!!! \n`);

    return;
  }

  if (stats.isFile()) {
    if (toPath[toPath.length - 1] === '/') {
      toPath += [...source.split('/')].pop();
    }

    if (toPath[toPath.length - 1] !== '/' && fs.existsSync(toPath)) {
      toPath += '/' + [...source.split('/')].pop();
    }

    moveFile(command, source, toPath);
  }
});

const moveFile = function(operation, fromPath, toDir) {
  if (operation !== 'mv') {
    throw Error(`${operation}: is not move command, use 'mv'`);
  }

  fs.rename(fromPath, toDir, (err) => {
    if (err) {
      console.log(err);
    }

    console.log('Complete!');
  });
};
