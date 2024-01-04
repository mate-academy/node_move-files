'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (currentPath, newPath) => {
  if (!currentPath || !fs.existsSync(currentPath)) {
    throw new Error(`Invalid or non-existent source file: '${currentPath}'`);
  }

  const fileData = fs.readFileSync(currentPath, 'utf-8');

  if (!newPath) {
    throw new Error('Destination path not provided.');
  }

  const destinationPath = newPath.endsWith('/')
    ? newPath + path.basename(currentPath)
    : newPath;

  if (newPath.includes('/') && !fs.existsSync(newPath)) {
    fs.mkdirSync(newPath, { recursive: true });
  }

  try {
    fs.writeFileSync(destinationPath, fileData);
  } catch (err) {
    throw new Error(`Error writing to destination file: ${err.message}`);
  }

  try {
    fs.unlinkSync(currentPath);
  } catch (err) {
    throw new Error(`Error deleting source file: ${err.message}`);
  }
};

try {
  const [currentPath, newPath] = process.argv.slice(2);

  moveFile(currentPath, newPath);
} catch (error) {
  throw new Error(`Error: ${error.message}`);
}
