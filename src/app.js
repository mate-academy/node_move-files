'use strict';

const fs = require('fs-extra');
const path = require('path');
const { getErrorMessage } = require('./errorHandler');
const {
  writeToTerminal,
  closeTerminal,
} = require('./terminal');

const defaultPath = path.join(__dirname, '..');

function validatePath(relativePath) {
  return path.join(defaultPath, relativePath);
};

function setCopyFullPath() {
  const isEndsWithSlash = moveTo.endsWith('/');
  const isExists = fs.existsSync(moveTo);

  if (isExists) {
    const pathParts = sourceFile.split('/');
    const filename = pathParts[pathParts.length - 1];

    fullCopyPath += '/' + filename;
  } else if (isEndsWithSlash) {
    const error = new Error();

    error.code = 'ENOENT';

    throw error;
  }
}

const [sourceFile, moveTo] = process.argv.slice(2);

const validSourcePath = validatePath(sourceFile);

let fullCopyPath = moveTo;

try {
  setCopyFullPath();

  fs.moveSync(validSourcePath, validatePath(fullCopyPath));
} catch (err) {
  writeToTerminal(getErrorMessage(err));
}

closeTerminal();
