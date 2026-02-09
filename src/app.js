const fs = require('fs');
const path = require('path');

/**
 * @param {string} source
 * @param {string} destination
 */
const moveFile = (source, destination) => {
  const fromPath = path.resolve(source);
  let toPath = path.resolve(destination);

  if (!fs.existsSync(fromPath)) {
    throw new Error(`Source file does not exist: ${fromPath}`);
  }

  if (!fs.statSync(fromPath).isFile()) {
    throw new Error(`Source is not a file: ${fromPath}`);
  }

  const destEndsWithSeparator = /[/\\]$/.test(destination);

  if (fs.existsSync(toPath)) {
    const destStatus = fs.statSync(toPath);

    if (destStatus.isDirectory()) {
      toPath = path.join(toPath, path.basename(fromPath));
    } else if (destEndsWithSeparator) {
      throw new Error(`Destination is not a directory: ${toPath}`);
    }
  } else if (destEndsWithSeparator) {
    throw new Error(`Destination directory does not exist: ${toPath}`);
  } else {
    const parentDir = path.dirname(toPath);

    if (!fs.existsSync(parentDir)) {
      throw new Error(`Destination directory does not exist: ${parentDir}`);
    }
  }

  fs.renameSync(fromPath, toPath);
};

const parameters = process.argv.slice(2);

if (parameters.length !== 2) {
  // eslint-disable-next-line no-console
  console.error('Usage: node app.js <source> <destination>');
} else {
  const [from, to] = parameters;

  try {
    moveFile(from, to);
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    } else {
      throw error;
    }
  }
}
