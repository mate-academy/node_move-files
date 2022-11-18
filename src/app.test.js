/* eslint-disable no-console */
/* eslint-disable max-len */
'use strict';

const { copyFiles } = require('./app.js');
const fs = require('fs');

describe('Succesfull copy files test', () => {
  beforeEach(() => fs.writeFileSync('./src/test/test4.txt', '123'));

  test('Successfully rename file in the same folder', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './src/test/test5.txt';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('operation success');

        fs.unlink('./src/test/test5.txt', (err) => {
          if (err) {
            console.log('Something went wrong');
          }
        });
      });
  });

  test('Successfully remove file to another existing folder', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './test/test5.txt';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('operation success');

        fs.unlink('./test/test5.txt', (err) => {
          if (err) {
            console.log('Something went wrong');
          }
        });
      });
  });

  test('Successfully remove file to another existing folder be named without extension', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './test/test5';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('operation success');

        fs.unlink(pathTo, (err) => {
          if (err) {
            console.log('Something went wrong');
          }
        });
      });
  });

  test('Successfully remove file to another existing folder', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './test/';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('operation success');

        fs.unlink('./test/test4.txt', (err) => {
          if (err) {
            console.log('Something went wrong');
          }
        });
      });
  });

  test('Successfully remove file to another existing folder', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = 'src';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('operation success');

        fs.unlink('./src/test4.txt', (err) => {
          if (err) {
            console.log('Something went wrong');
          }
        });
      });
  });

  test('Successfully remove and rename file is folder with "to" name not exist', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = 'new3';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('operation success');

        fs.unlink('./new3', (err) => {
          if (err) {
            console.log('Something went wrong');
          }
        });
      });
  });
});

describe('Unsuccessfull copy files', () => {
  beforeAll(() => fs.writeFileSync('./src/test/test4.txt', '123'));

  test('Return an error if the file and the path is the same', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './src/test/test4.txt';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('File with such name already exist');
      });
  });

  test('Return an error if the file with new name exist in new folder', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './test/sameName.txt';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('File or folder with such name already exist');
      });
  });

  test('Return an error if the file with new name exist in new folder', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = 'new';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('File or folder with such name already exist');
      });
  });

  test('Return an error if initial file path not valid', () => {
    const pathFrom = './src/test/test.txt';
    const pathTo = 'new';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('Path to copied file not valid');
      });
  });

  test('Return an error if initial file path not valid', () => {
    const pathFrom = './src/tes/test4.txt';
    const pathTo = 'new';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('Path to copied file not valid');
      });
  });

  test('Return an error if new path not valid', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './sr/';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe(`${pathTo} does not exist`);
      });
  });

  test('Return an error if new path not valid', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './src';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe(`File or folder with such name already exist`);
      });
  });

  test('Return an error if new path not valid', () => {
    const pathFrom = './src/test/test4.txt';
    const pathTo = './src/tes/test.txt';

    return copyFiles(pathFrom, pathTo)
      .then(data => {
        expect(data).toBe('Path where move file not valid');
      });
  });
});
