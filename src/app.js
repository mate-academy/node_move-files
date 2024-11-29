const fs = require('fs');
const path = require('path');

const [fromDir, toDir] = process.argv.slice(2);

function moveFiles(from, to) {
  if (!from || !to) {
    // eslint-disable-next-line no-console
    console.error('without params');

    return;
  }

  if (from === to) {
    return;
  }

  let pathTo = to;
  const fileName = path.basename(from);

  if (fs.existsSync(to)) {
    pathTo = path.join(pathTo, fileName);
  }

  try {
    fs.renameSync(from, pathTo);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

moveFiles(fromDir, toDir);
