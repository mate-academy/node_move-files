const fs = require('fs').promises;
const path = require('path');

const checkDestinationPath = async (sourcePath, destinationPath) => {
  try {
    const stats = await fs.stat(destinationPath);

    if (stats.isDirectory()) {
      const filename = path.basename(sourcePath);

      return path.join(destinationPath, filename);
    } else {
      return null;
    }
  } catch (error) {}
};

const moveFile = async () => {
  const [sourcePath, destinationPath] = process.argv.slice(2);

  try {
    const changedPathDestination = await checkDestinationPath(
      sourcePath,
      destinationPath,
    );

    await fs.rename(sourcePath, changedPathDestination || destinationPath);
  } catch (error) {
    throw new Error(`Error moving file: ${error.message}`);
  }
};

moveFile();
