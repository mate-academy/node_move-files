'use strict';

const fs = require('fs/promises');

async function readFile(file) {
  const content = await fs.readFile(file);

  return content;
}

async function writeFile(path, data) {
  return fs.writeFile(path, data);
}

async function removeFile(path) {
  return fs.rm(path);
}

async function moveFile(filePath, movePath) {
  const fileName = filePath
    .split('/')
    .slice(-1)
    .join('');

  let resolvedMovePath = movePath;

  if (movePath.endsWith('/')) {
    resolvedMovePath += fileName;
  }

  const fileContent = await readFile(filePath);

  try {
    await writeFile(resolvedMovePath, fileContent);
    await removeFile(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Could not resolve destination path!');
    }
  }
}

module.exports = {
  moveFile,
};
