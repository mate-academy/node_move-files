'use strict';

import readline from 'readline';
import fs from 'fs';

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

terminal.question("Input the command in format: 'mv file.txt ./someDirectory/'\n", (input) => {
  const words = input.split(' ');

  if (words.length === 3 && words[0] === 'mv') {
    if (words[2].charAt(words[2].length - 1) !== '/') {
      throw new Error("The name of destination directory should be ended with '/'");
    };

    fs.readFile(words[1], (err, content) => {
      if (err) {
        throw err;
        terminal.close();
      }

      fs.writeFile(words[2] + "/" + words[1], content, (err, data) => {
        if (err) {
          throw err;
          terminal.close();
        }

        fs.unlink(words[1], (err) => {
          if (err) {
            throw err;
            terminal.close();
          }
            console.log("Success.");
            terminal.close();
        });
      });
    });
  } else {
    console.log("Please, check the input data");
    terminal.close();
  }
})
