/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function moveAFile(src, dest) {
  if (args.length !== 2 || !src || !dest) {
    console.error(new Error('Two valid arguments must be entered'));

    return;
  }

  if (args.some((a) => a.startsWith('-'))) {
    console.error(new Error('Invalid arguments: flags are not allowed'));

    return;
  }

  const filePath = path.resolve(src);

  const fileStats = fs.statSync(filePath, { throwIfNoEntry: false });

  if (!fileStats || !fileStats.isFile()) {
    console.error(
      new Error('Source file does not exist or is not a regular file.'),
    );

    return;
  }

  let fullPath;

  try {
    if (dest.endsWith('/') || dest.endsWith('\\')) {
      if (!fs.existsSync(dest)) {
        console.error(
          new Error('Destination directory does not exist: ' + dest),
        );

        return;
      }

      if (!fs.statSync(dest).isDirectory()) {
        console.error(
          new Error('Destination path is not a directory: ' + dest),
        );

        return;
      }
      fullPath = path.join(dest, path.basename(src));
    } else {
      const destStats = fs.statSync(dest, { throwIfNoEntry: false });

      if (destStats && destStats.isDirectory()) {
        fullPath = path.join(dest, path.basename(src));
      } else {
        fullPath = dest;

        const parentDir = path.dirname(fullPath);
        const parentStats = fs.statSync(parentDir, { throwIfNoEntry: false });

        if (!parentStats || !parentStats.isDirectory()) {
          console.error(
            new Error(
              'Parent directory does not exist or is not a directory: ' +
                parentDir,
            ),
          );

          return;
        }
      }
    }

    if (path.resolve(fullPath) === filePath) {
      return;
    }

    fs.renameSync(filePath, fullPath);
    console.log(`File moved successfully to ${fullPath}`);
  } catch (err) {
    console.error(err);
  }
}

moveAFile(args[0], args[1]);
