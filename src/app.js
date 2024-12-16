'use strict';

const fs = require('fs/promises');
const path = require('path');

function isEqualParentPath(path1, path2) {
  return (
    path1
      .split(path.sep)
      .slice(0, path1.split(path.sep).length - 1)
      .join(path.sep) ===
    path2
      .split(path.sep)
      .slice(0, path2.split(path.sep).length - 1)
      .join(path.sep)
  );
}

async function moveFile(src, dest) {
  try {
    const absSrc = path.resolve(src);
    const absDest = path.resolve(dest);

    if (absSrc === absDest) {
      return;
    }

    if (isEqualParentPath(absSrc, absDest)) {
      await fs.rename(absSrc, absDest);

      return;
    }

    const destStats = await fs.stat(absDest);

    if (destStats.isDirectory()) {
      await fs.rename(absSrc, `${absDest}/${absSrc.split(path.sep).pop()}`);

      return;
    }

    await fs.moveFile(absSrc, absDest);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
  }
}

const [, , source, destination] = process.argv;

moveFile(source, destination);
