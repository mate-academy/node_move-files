'use strict';

const { removeFile } = require('./removeFile');

const getAddress = () => {
  const [from, to] = process.argv.slice(2);

  removeFile(from, to);
};

getAddress();
