/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');

const moveFile = async () => {
  const params = process.argv.slice(2);

  if (params.length !== 2) {
    console.error('Expected two params, old path and new path.');

    return;
  }

  const [oldName, newName] = params;
  const oldPath = path.resolve(oldName);
  let newPath = path.resolve(newName);
  const fileName = path.basename(oldPath);

  try {
    // 1. Перевіряємо, чи існує вихідний файл
    try {
      const statSource = await fs.stat(oldPath);

      if (!statSource.isFile()) {
        throw new Error('Source file not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }

    // 2. Визначаємо, чи є новий шлях директорією
    let isDestinationDirectory = false;

    if (newPath.endsWith(path.sep)) {
      isDestinationDirectory = true;

      try {
        const statD = await fs.stat(newPath);

        await fs.access(newPath);

        if (!statD.isFile()) {
          throw new Error('Destination directory does not exist');
        }
      } catch (err) {
        throw new Error('Destination directory does not exist');
      }
    } else {
      // Якщо слешу немає, намагаємося перевірити, чи це вже існуюча директорія
      try {
        const statDest = await fs.stat(newPath);

        isDestinationDirectory = statDest.isDirectory();
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw new Error(error.message);
        }
      }
    }

    // 3. Формуємо фінальний шлях, якщо призначення — це папка

    if (isDestinationDirectory) {
      newPath = path.join(newPath, fileName);
    }
    // 4. Переносимо / перейменовуємо файл

    await fs.rename(oldPath, newPath);
  } catch (error) {
    console.error(error.message);
  }
};

moveFile();
