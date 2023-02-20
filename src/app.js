'use strict';

const fs = require('fs');

const logError = (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

function app() {
  const from = process.argv[2];
  const to = process.argv[3];

  if (fs.existsSync(to, logError)) {
    fs.cp(from, to, logError);
  } else if (to.at(-1) === '/') {
    throw Error('Destination directory does not exist.');
  } else {
    fs.rename(from, `./${to}`, logError);
  }
}

app();
