/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function moveFile(src, dest) {
  if (args.length !== 2 || !src || !dest) {
    console.error(new Error('Має бути 2 аргумента'));

    return;
  }

  if (args.some((a) => a.startsWith('-'))) {
    console.error(new Error('Недійсні аргументи: прапорці заборонені'));

    return;
  }

  const filePath = path.resolve(src);

  const fileStats = fs.statSync(filePath, { throwIfNoEntry: false });

  if (!fileStats || !fileStats.isFile()) {
    console.error(
      new Error('Вихідний файл не існує або не є звичайним файлом'),
    );

    return;
  }

  let finalDestination = dest;

  const destinationExists = fs.existsSync(dest);

  if (destinationExists) {
    const destinationStats = fs.statSync(dest);

    if (destinationStats.isDirectory()) {
      finalDestination = path.join(dest, path.basename(src));
    } else {
      if (dest.endsWith(path.sep) || dest.endsWith('/')) {
        console.error(new Error('Призначення не є каталогом'));

        return;
      }

      finalDestination = dest;
    }
  } else {
    const endsWithSlash = dest.endsWith(path.sep);

    if (endsWithSlash) {
      console.error('Каталог призначення не існує');

      return;
    }

    const parentDir = path.dirname(dest);

    if (!fs.existsSync(parentDir)) {
      console.error('Батьківський каталог призначення не існує');

      return;
    }

    const parentStats = fs.statSync(parentDir, { throwIfNoEntry: false });

    if (!parentStats || !parentStats.isDirectory()) {
      console.error(new Error('Призначення не є каталогом'));

      return;
    }
  }

  try {
    fs.renameSync(filePath, finalDestination);
    console.log(`File moved successfully to ${finalDestination}`);
  } catch (err) {
    console.error(err);
  }
}

moveFile(args[0], args[1]);
