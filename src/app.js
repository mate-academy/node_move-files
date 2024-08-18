/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile(fileForMove, moveToDestination) {
  try {
    // Перевірка наявності вхідних параметрів
    if (!fileForMove || !moveToDestination) {
      throw new Error('Usage: node app.js <source> <destination>');
    }

    const sourcePath = path.resolve(fileForMove);
    const destPath = path.resolve(moveToDestination);

    // Перевірка існування вихідного файлу
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Error: Source file "${sourcePath}" does not exist.`);
    }

    // Перевірка, чи кінцевий шлях є каталогом
    if (fs.existsSync(destPath) && fs.lstatSync(destPath).isDirectory()) {
      const fileName = path.basename(sourcePath);
      const finalDestPath = path.join(destPath, fileName);

      fs.renameSync(sourcePath, finalDestPath);
      console.log(`File moved from "${sourcePath}" to "${finalDestPath}"`);
    } else {
      // Перевірка наявності директорії для шляху, куди переміщуємо файл
      const destDir = path.dirname(destPath);

      if (!fs.existsSync(destDir)) {
        throw new Error(
          `Error: Destination directory "${destDir}" does not exist.`,
        );
      }

      // Якщо це не каталог, то це нове ім'я файлу
      fs.renameSync(sourcePath, destPath);
      console.log(`File moved from "${sourcePath}" to "${destPath}"`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

const [file, destination] = process.argv.slice(2);

moveFile(file, destination);
