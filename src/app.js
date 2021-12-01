'use strict';

import readline from 'readline';
import fs from 'fs';

const args = process.argv.slice(3);

if (args[1][args[1].length - 1] !== '/') {
  console.log(args[1]);
  throw new Error("The name of destination directory should be ended with '/'");
}

fs.readFile(args[0], (err, content) => {
  if (err) {
    throw err;
  }

  fs.writeFile(args[1] + "/" + args[0], content, (err, data) => {
    if (err) {
      throw err;
    }

    fs.unlink(args[0], (err) => {
      if (err) {
        throw err;
      }
        console.log("Success. File was movied to the directory " + args[1]);
    });
  });
});
