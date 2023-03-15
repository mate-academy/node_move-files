/* eslint-disable no-console */
'use strict';

const path = require('path');
const { showError } = require('./showError');
const { changeFile } = require('./changeFile');

const moveFile = (userInput) => {
  const [
    command,
    source,
    destination,
  ] = userInput.split(' ');

  if (command !== 'mv') {
    showError('You entered the wrong command.', moveFile);

    return;
  }

  if (!source) {
    showError('You didn\'t specify the source file.', moveFile);

    return;
  }

  if (!destination) {
    showError('You didn\'t specify the destination information.', moveFile);

    return;
  }

  const fileName = path.basename(source);
  const sourceDirName = path.dirname(source);
  let destinationDirName = path.dirname(destination);
  let endsWithSlash = false;

  if (destination.endsWith('/')) {
    destinationDirName = destination.slice(0, -1);
    endsWithSlash = true;
  }

  const isPathTheSame = sourceDirName === destinationDirName;

  if (source === destination || (isPathTheSame && endsWithSlash)) {
    showError('You try to move the file to the same location.', moveFile);

    return;
  }

  if (isPathTheSame && !endsWithSlash) {
    changeFile(
      source,
      destination,
      'The file was successfully renamed.',
    );

    return;
  }

  if (endsWithSlash) {
    changeFile(
      source,
      destination + fileName,
    );

    return;
  }

  changeFile(source, destination);
};

module.exports = { moveFile };
