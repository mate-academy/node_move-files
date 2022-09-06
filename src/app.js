/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');

let correctAddress;
const address = process.argv[3];

fs.stat(address)
  .then(stats => {
    if (stats.isDirectory()) {
      correctAddress = (!address.includes('/'))
        ? `./${address}/${process.argv[2]}`
        : `${address}${process.argv[2]}`;
    }
  })
  .catch(error => {
    if (error.code === 'ENOENT') {
      if (!address.includes('/') || address[address.length - 1] !== '/') {
        correctAddress = address;
      } else {
        console.log(error);
      }
    }
  })
  .then(() => {
    if (correctAddress) {
      fs.rename(process.argv[2], correctAddress);
    }
  })
  .catch((err) => console.log(err));
