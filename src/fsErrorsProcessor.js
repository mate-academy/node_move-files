'use strict';

function fsErrorsProcessor(error) {
  switch (error.code) {
    case 'ENOENT':
      return 'The file you are trying to access does not exist';

    case 'EISDIR':
      return 'You try to read a directory';

    default:
      return 'Some error occured';
  }
}

module.exports = {
  fsErrorsProcessor,
};
