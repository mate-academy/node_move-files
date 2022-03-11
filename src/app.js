'use strict';

const fs = require('fs');
const fsPromises = require('fs/promises');

const copyFile = async(fromPath, toPath) => {
  if (fs.existsSync(toPath)) {
    await fsPromises.copyFile(fromPath, `${toPath}/${fromPath}`);
  } else {
    await fsPromises.copyFile(fromPath, toPath);
  }
};

const handleErrors = (error, fromPath, toPath) => {
  switch (true) {
    case (fromPath === undefined && toPath === undefined):
      console.log('mv: missing file operand');
      break;

    case (toPath === undefined):
      console.log(`mv: missing destination file operand after ${fromPath}`);
      break;

    case (error.code === 'ENOENT' && !fs.existsSync(fromPath)):
      console.log(`mv: cannot stat '${fromPath}': No such file or directory`);

      break;

    case (error.code === 'ENOENT' && !fs.existsSync(toPath)):
      console.log(
        `mv: cannot create regular file '${toPath}':`,
        `No such file or directory`
      );

      break;

    case (fromPath === toPath):
      console.log(`mv: '${fromPath}' and '${toPath}' are the same file`);
      break;

    default:
      console.log(error);
  }
};

const main = async(fromPath, toPath) => {
  try {
    await copyFile(fromPath, toPath);
  } catch (error) {
    handleErrors(error, fromPath, toPath);
  }
};

const terminalArguments = process.argv.slice(2);

if (terminalArguments[0] === 'mv') {
  main(terminalArguments[1], terminalArguments[2]);
  fsPromises.rm(terminalArguments[1]);
} else {
  console.log('app: command not found');
}
