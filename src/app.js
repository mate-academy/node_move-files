/* eslint-disable no-console  */

const fs = require('fs');
const path = require('path');
const [inputPath, outputPath] = process.argv.slice(2);

async function moveFile(from, to) {
  let fromData;
  let isItFolder = false;

  try {
    fromData = await fs.promises.readFile(from, 'utf-8');

    if (fs.existsSync(to)) {
      isItFolder = (await fs.promises.stat(to)).isDirectory();
    }

    if (isItFolder) {
      const outputDirectory = path.join(to, path.basename(from));

      await fs.promises.rm(from);

      await fs.promises.writeFile(outputDirectory, fromData);

      return;
    }

    await fs.promises.rename(from, to);
  } catch (err) {
    console.error(err);
  }
}

moveFile(inputPath, outputPath);
