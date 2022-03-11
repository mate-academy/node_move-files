'use strict';

const fs = require('fs');

const fileCut = process.argv[2];
const fileInsert = process.argv[3];

fs.stat(`${fileCut}`, (error, status) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('Ви вказали не правильний шлях звідки хочете вирізати файли');
  }

  fs.stat(`${fileInsert}`, (errer, stats) => {
    if (errer) {
      // eslint-disable-next-line no-console
      console.log('Змінює назву файла на назву');

      fs.rename(`${fileCut}`, `${fileInsert}`, (err) => {
        if (err) {
          throw err;
        }
        // eslint-disable-next-line no-console
        console.log('File rename: ', '>>', fileInsert, '<<');
      });

      return;
    }

    if (stats.isDirectory()) {
      const contentFileCut = fs.readFile(fileCut, 'utf8', (err, data) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
      const destArr = fileCut.split('/');
      const nameFile = destArr[1];

      // eslint-disable-next-line max-len
      fs.appendFile(`${fileInsert}${nameFile}`, `${contentFileCut}`, (err1, data) => {
        if (err1) {
          // eslint-disable-next-line no-console
          console.log('не копіює з шляхом папка/');
          throw err1;
        }

        fs.unlink(fileCut, (errorUnlink) => {
          if (errorUnlink) {
            throw errorUnlink;
          }
          // eslint-disable-next-line no-console
          console.log('File moved');
        });
      });
    }
  });
});
