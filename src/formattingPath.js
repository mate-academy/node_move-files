'use strict';

const formatingPath = (path, fileToMove) => {
  let divider = '/';

  if (!fileToMove.includes(divider)) {
    divider = '\\';
  }

  const lastDirectory = fileToMove.split(divider).slice(-1);
  const newPath = path + lastDirectory;

  return newPath;
};

exports.formatingPath = formatingPath;
