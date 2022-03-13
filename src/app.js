'use strict';

import readline from 'readline';
import fs from 'fs';

const [ file, folder ] = [...process.argv.slice(3)];

if (folder[folder.length - 1] !== '/') {
  throw new Error("The name of destination directory should be ended with '/'");
}

fs.readFile(file, (err, content) => {
  if (err) {
    throw err;
  }

  fs.writeFile(folder + "/" + file, content, (err, data) => {
    if (err) {
      throw err;
    }

    fs.unlink(file, (err) => {
      if (err) {
        throw err;
      }
        console.log("Success. File was moved to the directory " + folder);
    });
  });
});
