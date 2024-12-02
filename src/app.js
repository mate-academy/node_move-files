const fs = require('fs');
const path = require('path');

(() => {
  try {
    const [source, dest] = process.argv.slice(2);

    let finalPath = dest;

    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      finalPath = path.resolve(dest, path.basename(source));
    }

    fs.renameSync(source, finalPath);
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message);
  }
})();
