'use strict';

const fs = require('fs').promises;

const pathInfo = async(path) => {
  try {
    const stats = await fs.stat(path);

    return {
      isExist: true,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
    };
  } catch (err) {
    return {
      isExist: false,
    };
  }
};

module.exports = {
  pathInfo,
};
