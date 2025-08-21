const fs = require('fs/promises');
const path = require('path');

async function moveFile() {
  const [moveFrom, moveTo] = process.argv.slice(2);

  if (!moveFrom || !moveTo) {
    // eslint-disable-next-line
    console.error('Error: Missing params');

    return;
  }

  const moveFromPath = path.resolve(moveFrom);
  const moveToPath = path.resolve(moveTo);

  if (moveFromPath === moveToPath) {
    return;
  }

  try {
    const data = await fs.readFile(moveFromPath, 'utf-8');

    let destinationPath = moveToPath;

    try {
      const stats = await fs.stat(moveToPath);

      if (stats.isDirectory()) {
        const fileName = path.basename(moveFromPath);

        destinationPath = path.join(moveToPath, fileName);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        // eslint-disable-next-line
        console.error(`Error: ${error.message}`);

        return;
      }
    }

    await fs.writeFile(destinationPath, data);
    await fs.unlink(moveFromPath);
  } catch (err) {
    // eslint-disable-next-line
    console.error(`Error: ${err.message}`);
  }
}

moveFile();
