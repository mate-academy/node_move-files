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

  if (fs.existsSync(selectedPath)) {
    fs.stat(selectedPath, (error, stats) => {
      if (error) {
        throw new Error(error);
      }

      if (stats.isDirectory()) {
        fs.writeFileSync(
          `${selectedPath}/${fileToMove}`,
          content,
          (err) => {
            if (err) {
              throw new Error(error);
            }
          },
        );
      }

      if (stats.isFile()) {
        fs.writeFileSync(
          selectedPath,
          content,
          (err) => {
            if (err) {
              throw new Error(error);
            }
          },
        );
      }

      fs.rm(fileToMove, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    });

    return;
  }

  const isFolder = selectedPath.endsWith('/');

  if (!isFolder) {
    const parts = fileToMove.split('.');
    const extension = selectedPath.split('.').length > 1
      ? ''
      : `.${parts[parts.length - 1]}`;

    fs.writeFileSync(
      (selectedPath + extension),
      content,
      (err) => {
        if (err) {
          throw new Error(err);
        }
      },
    );

    fs.rm(fileToMove, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  } else {
    console.error(`${selectedPath} does not exist`);
  }
}

moveFile();
