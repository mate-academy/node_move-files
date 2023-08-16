/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const fileToMove = process.argv[2];
  const selectedPath = process.argv[3];
  const isExistFileToMove = fs.existsSync(path.join(__dirname, fileToMove));
  const isExistSelectedPath = fs.existsSync(path.join(__dirname, selectedPath));

  if (!isExistFileToMove) {
    console.error(`${fileToMove} does not exist`);

    return;
  }

  const content = fs.readFileSync(
    path.join(__dirname, fileToMove),
    'utf8',
    (err, data) => {
      if (err) {
        throw new Error(err);
      }

      return data;
    },
  );

  if (isExistSelectedPath) {
    fs.stat(path.join(__dirname, selectedPath), (error, stats) => {
      if (error) {
        throw new Error(error);
      }

      if (stats.isDirectory()) {
        fs.writeFileSync(
          path.join(__dirname, `/${selectedPath}/${fileToMove}`),
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
          path.join(__dirname, selectedPath),
          content,
          (err) => {
            if (err) {
              throw new Error(error);
            }
          },
        );
      }

      fs.rm(path.join(__dirname, fileToMove), (err) => {
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
    const extension = parts[parts.length - 1];

    fs.writeFileSync(
      path.join(__dirname, `${selectedPath}.${extension}`),
      content,
      (err) => {
        if (err) {
          throw new Error(err);
        }
      },
    );

    fs.rm(path.join(__dirname, fileToMove), (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  } else {
    console.error(`${selectedPath} does not exist`);
  }
}

moveFile();
