'use strict';

function getErrorMessage(error) {
  switch (error.code) {
    case ('ENOENT'):
      return 'There is no such file or directory!';

    default:
      return 'Some unknown error happend!';
  }
}

module.exports = { getErrorMessage };
