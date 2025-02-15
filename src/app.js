const fs = require('fs');
const path = require('path');

async function moveFile() {
  const [pathToFile, pathToReplace] = process.argv.slice(2);

  if (!pathToFile || !pathToReplace) {
    // eslint-disable-next-line no-console
    console.error('You must write 2 path');

    return;
  }

  if (path.resolve(pathToFile) === path.resolve(pathToReplace)) {
    // eslint-disable-next-line no-console
    console.error('This is a similar path.');

    return;
  }

  const fileName = path.basename(pathToFile);
  let newPathToReplace = pathToReplace;

  try {
    const destStat = await fs.stat(newPathToReplace).catch(() => null);

    if (
      (destStat && destStat.isDirectory()) ||
      newPathToReplace.endsWith('/')
    ) {
      newPathToReplace = path.join(newPathToReplace, fileName);
    }

    await fs.rename(pathToFile, newPathToReplace);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

moveFile();
