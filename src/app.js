// write code here

const fs = require('node:fs/promises');
const path = require('node:path');

async function main() {
  const [, , source, dest] = process.argv;

  if (!source || !dest) {
    // eslint-disable-next-line no-console
    console.error('Source and destination are required');

    return;
  }

  if (source === dest) {
    return;
  }

  try {
    let destination = dest;
    const destStat = await fs.stat(dest).catch((error) => {
      if (error.code === 'ENOENT') {
        return null;
      }

      throw error;
    });

    if (destStat?.isDirectory()) {
      destination = path.join(dest, path.basename(source));
    }

    await fs.rename(source, destination);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

main();
