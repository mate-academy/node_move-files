/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);
  const [sourcePath, destinationPath] = args;

  if (!sourcePath || !destinationPath) {
    console.error('One or both paths are missing');

    return;
  }

  const sourceAbsPath = path.resolve(sourcePath);
  const destAbsPath = path.resolve(destinationPath);

  if (sourceAbsPath === destAbsPath) {
    console.log('Source and destination are the same. Nothing to do.');

    return;
  }

  await moveFile(sourceAbsPath, destAbsPath);
}

async function moveFile(sourceAbsPath, destAbsPath) {
  let currDestAbsPath = destAbsPath;

  try {
    await fs.access(sourceAbsPath);
  } catch (error) {
    console.error('Source path is not exist');

    return;
  }

  try {
    const destStat = await fs.stat(currDestAbsPath).catch(() => null);

    if (destAbsPath.endsWith('/') || (destStat && destStat.isDirectory())) {
      currDestAbsPath = path.join(
        currDestAbsPath,
        path.basename(sourceAbsPath),
      );
    }

    const destDir = path.dirname(currDestAbsPath);

    try {
      await fs.access(destDir);
    } catch (error) {
      console.error('Destination path is not exist');

      return;
    }

    await fs.rename(sourceAbsPath, currDestAbsPath);
  } catch (error) {
    console.error(error);
  }
}

main();
