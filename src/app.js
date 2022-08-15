/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const readLine = require('readline');

const terminal = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionForUser = (question) => {
  return new Promise((resolve) => {
    terminal.question(question, (answer) => {
      if (!answer.length) {
        console.log('Please, enter something');

        return questionForUser(question);
      } else {
        resolve(answer);
      }
    });
  });
};

const moveFile = async() => {
  const originalName = await questionForUser('Choose a file to move: ');
  const newName = await questionForUser('Choose a new name and path: ');

  fs.rename(`${originalName}`, `${newName}`, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('You have successfully moved the file');
    }
  });

  terminal.close();
};

moveFile();
