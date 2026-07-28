const fs = require('fs');
const path = require('path');

function moveFiles(source, target) {
  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    throw new Error(`Source file does not exist: ${source}`);
  }

  const isDirTarget = target.endsWith('/');
  let destination;

  if (isDirTarget) {
    if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
      throw new Error(`Destination directory does not exist: ${target}`);
    }

    destination = path.join(target, path.basename(source));
  } else if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    destination = path.join(target, path.basename(source));
  } else {
    const destDir = path.dirname(target);

    if (!fs.existsSync(destDir)) {
      throw new Error(`Destination directory does not exist: ${destDir}`);
    }

    destination = target;
  }

  if (path.resolve(source) === path.resolve(destination)) {
    return;
  }

  fs.renameSync(source, destination);
}

function main() {
  const [source, target] = process.argv.slice(2);

  if (!source || !target) {
    throw new Error('Usage: node app.js <source> <target>');
  }

  moveFiles(source, target);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

module.exports = {
  moveFiles,
};
