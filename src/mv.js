/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const [sourceFilePath, targetFolder] = process.argv.slice(2);

moveFile(sourceFilePath, targetFolder);

function moveFile(fileToCopyPath, toPastePath) {
  try {
    if (!fs.existsSync(fileToCopyPath)) {
      throw new Error("Cant't find source file");
    }

    if (!fs.existsSync(toPastePath)) {
      throw new Error("Cant't find target folder");
    }

    const fileNameStartIndex = fileToCopyPath.lastIndexOf('/');
    const fileName = (fileNameStartIndex >= 0)
      ? fileToCopyPath.slice(fileNameStartIndex + 1)
      : fileToCopyPath;

    const contentToCopy = fs.readFileSync(fileToCopyPath, 'utf8');

    const targetFilePath = toPastePath + `/${fileName}`;

    fs.writeFileSync(targetFilePath, contentToCopy);
    fs.unlinkSync(sourceFilePath);
  } catch (error) {
    console.log(error);
  }
};
