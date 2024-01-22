'use strict';

const fs = require('fs');
const path = require('path');

const [, , fileName, folderName] = process.argv;

const sourcePath = path.join('./src', fileName);
const destinationPath = path.join('./src', folderName, fileName);

if (!fs.existsSync(path.join('./src', folderName))) {
  fs.mkdirSync(path.join('./src', folderName), { recursive: true });
}

fs.rename(sourcePath, destinationPath, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${error.message}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`File '${fileName}' moved to '${folderName}' successfully.`);
  }
});
