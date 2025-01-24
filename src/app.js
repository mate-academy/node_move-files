/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

async function moveFile(source, destination) {
  try {
    if (!source || !destination) {
      throw new Error('Error: Source and destination must be provided.');
    }

    const sourcePath = path.resolve(source);
    let destinationPath = path.resolve(destination);

    const sourceStats = await fs.stat(sourcePath);

    if (!sourceStats.isFile()) {
      throw new Error(`Source "${source}" is not a file.`);
    }

    if (destination.endsWith('/')) {
      try {
        await fs.access(destinationPath);
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new Error(`Folder "${destination}" does not exist.`);
        } else {
          throw error;
        }
      }

      const fileName = path.basename(sourcePath);

      destinationPath = path.join(destinationPath, fileName);
    } else {
      const destStats = await fs.stat(destinationPath).catch(() => null);

      if (destStats && destStats.isDirectory()) {
        destinationPath = path.join(destinationPath, path.basename(sourcePath));
      }
    }

    await fs.rename(sourcePath, destinationPath);
    console.log(`File is successfuly moved to "${destinationPath}".`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Зчитування аргументів командного рядка
const args = process.argv.slice(2);

const [sourceFile, destPath] = args;

moveFile(sourceFile, destPath);
