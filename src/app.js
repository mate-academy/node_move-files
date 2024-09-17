// write code here

const file1 = process.argv[2];
const file2 = process.argv[3];

const fs = require('fs');
const path = require('path');

function move(urlMain, urlMoveTo) {
  let actualUrlMoveTo = urlMoveTo;

  if (!urlMain || !urlMoveTo) {
    // eslint-disable-next-line no-console
    console.error('no parameter');

    return;
  }

  if (
    fs.existsSync(actualUrlMoveTo) &&
    fs.lstatSync(actualUrlMoveTo).isDirectory()
  ) {
    const fileName = path.basename(urlMain);

    if (!actualUrlMoveTo.endsWith('/')) {
      actualUrlMoveTo += '/';
    }

    actualUrlMoveTo += fileName;
  }

  fs.rename(urlMain, actualUrlMoveTo, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error moving file:', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('File moved successfully.');
    }
  });
}

move(file1, file2);
