'use strict';

const fs = require('fs');
const path = require('path');

const normalizePath = (filePath, newPath) => {
  switch (true) {
    case newPath.endsWith(path.sep):
      return path.join(newPath, filePath);

    case fs.existsSync(newPath):
      return path.join(newPath, path.sep, filePath);

    default:
      return newPath;
  }
};

const moveFiles = () => {
  const [source, dest] = process.argv.slice(2);

  if (!source || !dest) {
    throw new Error(
      'You should pass the way to the old path and the new path.'
    );
  }

  const oldPath = path.resolve(source);
  const newPath = path.resolve(dest);

  const filePath = oldPath.split(path.sep).pop();
  const normalizedPath = normalizePath(filePath, newPath);

  try {
    fs.renameSync(oldPath, normalizedPath);
  } catch (error) {
    throw new Error('Something went wrong\n: ', error);
  }
};

moveFiles();
