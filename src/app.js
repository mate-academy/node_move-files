const fs = require('fs-extra');
const path = require('path');

const isFileExists = (fileName) => {
  if (fs.existsSync(fileName)) {
    console.log(`File exists: ${fileName}`);
    return true;
  } else {
    console.log(`No such file: ${fileName}`);
    return false;
  }
};

const isPathExists = (targetDirectory) => {
  if (fs.existsSync(targetDirectory)) {
    return true;
  } else {
    return false;
  }
};

const moveSyncWrap = (fileName, targetDirectory) => {
    fs.moveSync(fileName, path.join(targetDirectory, path.basename(fileName)), { overwrite: true });
};

const moveFiles = () => {
  const args = process.argv.slice(2);
  const fName = args[0];
  let targDir = path.normalize(args[1]);

  isFileExists(fName);

  console.log(path.normalize(targDir));

  if (targDir.endsWith(path.sep)) {
    if (isPathExists(targDir)) {
        moveSyncWrap(fName, targDir);
    } else {
        throw new Error(`Wrong path!`);
    }
  } else {
    if (isPathExists(targDir)) {
        targDir += path.sep;

        moveSyncWrap(fName, targDir);
    } else {
        targDir += path.extname(fName);

        moveSyncWrap(fName, targDir);
    }
  }
};

moveFiles();
