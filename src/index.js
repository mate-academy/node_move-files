/* eslint-disable no-console */
'use strict';

const fs = require('fs');

function moveFile() {
  const fileToMove = process.argv[2];
  const selectedPath = process.argv[3];

  if (!fs.existsSync(fileToMove)) {
    console.error(`${fileToMove} does not exist`);

    return;
  }

  const content = fs.readFileSync(fileToMove);
  const writeFile = (path) => {
    fs.writeFileSync(
      path + getFileExtension(),
      content,
      (err) => {
        if (err) {
          throw new Error(err);
        }
      },
    );
  };
  const removeFile = (path) => {
    fs.rm(path, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  };

  function getFileExtension() {
    const parts = fileToMove.split('.');
    const extension = selectedPath.split('.')
      .filter(elem => elem.trim() !== '').length > 1
      ? ''
      : `.${parts[parts.length - 1]}`;

    return extension;
  };

  if (fs.existsSync(selectedPath)) {
    fs.stat(selectedPath, (error, stats) => {
      if (error) {
        throw new Error(error);
      }

      if (stats.isDirectory()) {
        writeFile(`${selectedPath}/${fileToMove}`);
      }

      if (stats.isFile()) {
        writeFile(selectedPath);
      }

      removeFile(fileToMove);
    });

    return;
  }

  const isFolder = selectedPath.endsWith('/');

  if (!isFolder) {
    writeFile(selectedPath);

    removeFile(fileToMove);
  } else {
    console.error(`${selectedPath} does not exist`);
  }
}

moveFile();
