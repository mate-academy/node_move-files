/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [command, prevFile, newFilePath] = process.argv.slice(2);

  if (!command) {
    console.log('The command isn\'t exist');

    return;
  }

  const isCorrectCommand = ['mv', 'move'].includes(command.toLowerCase());
  const absolutePrevFilePath = path.join(__dirname, prevFile);

  const newPath = newFilePath.split('/').slice(1, -1);

  if (!isCorrectCommand) {
    console.log('The command isn\'t correct');

    return;
  }

  if (isCorrectCommand && fs.existsSync(absolutePrevFilePath)) {
    const data = fs.readFileSync(absolutePrevFilePath, 'utf-8');

    fs.unlinkSync(absolutePrevFilePath);

    const pathToNewFile = newPath.reduce((dirPath, folder) => {
      const gluedPath = path.join(dirPath, folder);

      if (fs.existsSync(gluedPath)) {
        return gluedPath;
      }

      fs.mkdirSync(gluedPath);

      return gluedPath;
    }, __dirname);

    fs.writeFileSync(path.join(pathToNewFile, prevFile), data, 'utf-8');
  }
}

moveFile();
