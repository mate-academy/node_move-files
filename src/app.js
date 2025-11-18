// write code here
const fs = require('fs');
const path = require('path');
const argv = process.argv.slice(2);
const [file, directory] = argv;

if (argv.length !== 2) {
  /* eslint-disable-next-line no-console */
  console.error('Provide source and destination');
  process.exit(0);
}

const rawDest = directory;

const endsWithSep = rawDest.endsWith(path.sep) || rawDest.endsWith('/');
let isDir;

try {
  const destExists = fs.existsSync(rawDest);

  if (destExists) {
    const destStat = fs.statSync(rawDest);

    isDir = destStat.isDirectory();
  } else {
    isDir = false;
  }
} catch (error) {
  /* eslint-disable-next-line no-console */
  console.error(error);
  process.exit(1);
}

const looksLikeDir = endsWithSep || isDir;

try {
  const stats = fs.statSync(file);

  if (!stats.isFile()) {
    /* eslint-disable-next-line no-console */
    console.error('Source is not a file');

    process.exit(0);
  }
} catch (error) {
  /* eslint-disable-next-line no-console */
  console.error(error);

  process.exit(0);
}

let targetPath;

if (rawDest.endsWith(path.sep) && !fs.existsSync(rawDest)) {
  /* eslint-disable-next-line no-console */
  console.error('Directory does not exist');
  process.exit(0);
}

if (looksLikeDir) {
  targetPath = path.join(rawDest, path.basename(file));
} else {
  targetPath = rawDest;
}

if (path.resolve(file) !== path.resolve(targetPath)) {
  try {
    fs.renameSync(file, targetPath);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);

    process.exit(0);
  }
}
