const fs = require('fs');
const path = require('path');

function fail(message) {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exitCode = 1;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    fail('Two arguments required: source and destination');

    return;
  }

  const [source, destination] = args;

  const sourcePath = path.resolve(source);

  if (!fs.existsSync(sourcePath)) {
    fail('Source file does not exist');

    return;
  }

  // ✅ source должен быть именно файлом
  try {
    const sourceStat = fs.statSync(sourcePath);

    if (!sourceStat.isFile()) {
      fail('Source must be a file');

      return;
    }
  } catch (e) {
    fail('Source file does not exist');

    return;
  }

  // destination может быть файлом (переименование) или директорией
  let destinationPath = path.resolve(destination);

  // ✅ если одно и то же — ничего не делаем
  if (destinationPath === sourcePath) {
    return;
  }

  try {
    const destinationExists = fs.existsSync(destinationPath);
    const destinationIsDir =
      destinationExists && fs.statSync(destinationPath).isDirectory();

    // ✅ по спекам “директория” может быть с хвостовым "/"
    const endsWithSlash =
      destination.endsWith('/') || destination.endsWith(path.sep);

    if (destinationIsDir || endsWithSlash) {
      if (!destinationExists || !destinationIsDir) {
        throw new Error('Destination directory does not exist');
      }

      const fileName = path.basename(sourcePath);

      destinationPath = path.join(destinationPath, fileName);

      // если вдруг итоговый путь совпал с исходным — ничего не делаем
      if (destinationPath === sourcePath) {
        return;
      }
    }

    fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    // ✅ ошибка должна быть видна тестам (stderr + non-zero exit)
    fail(error.message);
  }
}

main();
