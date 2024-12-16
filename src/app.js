'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  try {
    const [file, newFile] = process.argv.slice(2);
    let improve = newFile;

    if (!file || !newFile) {
      throw new Error('Please provide two parameters!');
    } else if (file === newFile) {
      return;
    }

    if (fs.existsSync(newFile) && fs.statSync(newFile).isDirectory()) {
      const fileName = path.basename(file);

      improve = path.join(improve, fileName);
    }

    fs.renameSync(file, improve);

    // eslint-disable-next-line no-console
    console.log('File moved successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

moveFile();
