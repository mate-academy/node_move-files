'use strict';

const getBasePath = (path) => {
  const indexBeforeName = path.lastIndexOf('/');
  const basePath = path.slice(0, indexBeforeName);

  return basePath;
};

module.exports = {
  getBasePath,
};
