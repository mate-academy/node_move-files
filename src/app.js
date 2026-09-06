// write code here
const fs = require('fs');
const path = require('path');

const infoData = process.argv.slice(2);

const [adresFile, changeIN] = infoData;

function main() {
  if (!adresFile || !changeIN) {
    // eslint-disable-next-line no-console
    console.error('Please write data');

    return;
  }

  let newPath = changeIN;

  if (changeIN.endsWith('/')) {
    if (!fs.existsSync(changeIN)) {
      // eslint-disable-next-line no-console
      console.error('Directory does not exist');

      return;
    }

    const fileName = path.basename(adresFile);

    newPath = path.join(changeIN, fileName);
  } else if (fs.existsSync(changeIN) && fs.statSync(changeIN).isDirectory()) {
    const fileName = path.basename(adresFile);

    newPath = path.join(changeIN, fileName);
  }

  if (path.resolve(adresFile) === path.resolve(newPath)) {
    return;
  }

  fs.rename(adresFile, newPath, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
}

main();
