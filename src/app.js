'use strict';

/* eslint-disable no-console */

const fs = require('fs/promises');
const path = require('path');

async function moveApp() {
  const src = process.argv[2];
  const dest = process.argv[3];

  try {
    // 1. Перевірка аргументів
    if (process.argv.length !== 4) {
      console.error('Error: Source and destination required');
      process.exit(0);
    }

    if (src === dest) {
      return;
    }

    // 2. Перевірка джерела
    const srcStat = await fs.stat(src);

    if (!srcStat.isFile()) {
      console.error('Error: Source is not a file');
      process.exit(0);
    }

    // 3. Визначаємо фінальний шлях
    let finalDest = dest;
    const isFolderTarget = dest.endsWith('/') || dest.endsWith('\\');

    try {
      const destStat = await fs.stat(dest);

      if (destStat.isDirectory()) {
        // Якщо dest - існуюча папка, додаємо ім'я файлу до шляху
        finalDest = path.join(dest, path.basename(src));
      }
    } catch (err) {
      // Якщо шляху не існує,
      // але він закінчується на / — це помилка (папки нема)
      if (isFolderTarget) {
        console.error('Error: Destination directory does not exist');
        process.exit(0);
      }

      // Якщо шляху не існує і немає / — перевіряємо, чи існує батьківська папка
      const parentDir = path.dirname(dest);

      try {
        await fs.access(parentDir);
      } catch (accessErr) {
        console.error('Error: Parent directory does not exist');
        process.exit(0);
      }
    }

    // 4. Переміщення
    await fs.rename(src, finalDest);
  } catch (err) {
    console.error(err.message);
    process.exit(0);
  }
}

moveApp();
