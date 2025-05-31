const fsp = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function remove() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    console.error('Need 2 arguments');

    return;
  }

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  if (!fs.existsSync(sourcePath)) {
    console.error("Source doesn't exist");

    return;
  }

  if (sourcePath === destinationPath) {
    return;
  }

  try {
    if (fs.existsSync(destinationPath)) {
      const stats = await fsp.stat(destinationPath);

      if (stats.isDirectory()) {
        const filename = path.basename(sourcePath);
        const targetPath = path.join(destinationPath, filename);

        await fsp.rename(sourcePath, targetPath);
      }
    } else {
      await fsp.rename(sourcePath, destinationPath);
    }
  } catch (err) {
    console.error(err);
  }
}

remove();
