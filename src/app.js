'use strict';

const fs = require('fs');
const path = require('path');

const terminal = process.argv.slice(2);

function renameFile() {
  const pathFile = path.join(__dirname, terminal[0]);

  if (/.txt/.test(pathFile)) {
    const pathInfo = path.join(__dirname, terminal[1]);

    fs.readFile(pathFile, (err, data) => {
      if (err) {
        process.stdout.write('This terminal[0] could not be read');

        return;
      }

      fs.writeFile(pathInfo, data, (error) => {
        if (error) {
          process.stdout.write('Error creating new terminal[0]');
        }
      });

      fs.unlink(pathFile, (error) => {
        if (error) {
          process.stdout.write(`Error while renaming terminal[0]: ${pathFile}`);
        }
      });

      process.stdout.write('terminal[0] renamed successfully');
    });
  }

  if ((/^.w*\/w*\//).test(pathFile)) {
    const pathInfo = path.join(__dirname, terminal[1]);
    const existsDirectory = fs.existsSync(pathInfo);

    if (!existsDirectory) {
      process.stdout.write('No such directory found');
    }

    fs.readFile(pathFile, (err, data) => {
      if (err) {
        process.stdout.write(`Failed to read file: ${pathFile}`);

        return;
      }

      fs.writeFile(`${pathInfo}.txt`, data, (error) => {
        if (error) {
          process.stdout.write(`Failed to create new file: ${pathInfo}.txt`);
        }
      });

      fs.unlink(pathFile, (error) => {
        if (error) {
          process.stdout.write(`Error while renaming terminal[0]: ${pathFile}`);
        }
      });
    });
  }

  if ((/w*\//).test(pathFile)) {
    const pathInfo = path.join(__dirname, terminal[1]);
    const existsDirectory = fs.existsSync(pathInfo);

    if (!existsDirectory) {
      process.stdout.write('No such directory found');
    }

    fs.readFile(pathFile, (err, data) => {
      if (err) {
        process.stdout.write(`Failed to read file: ${pathFile}`);

        return;
      }

      fs.writeFile(`${pathInfo}${terminal[0]}`, data, (error) => {
        if (error) {
          process.stdout.write(`Failed to create new file: ${pathInfo}.txt`);
        }
      });

      fs.unlink(pathFile, (error) => {
        if (error) {
          process.stdout.write(`Error while renaming terminal[0]: ${pathFile}`);
        }
      });
    });
  }

  if ((/w*/).test(pathFile)) {
    const pathInfoDirectori = `./${terminal[1]}`;
    const pathInfo = path.join(__dirname, pathInfoDirectori);
    const existsDirectory = fs.existsSync(pathInfo);

    if (!existsDirectory) {
      process.stdout.write('No such directory found');
    }

    fs.readFile(pathFile, (err, data) => {
      if (err) {
        process.stdout.write(`Failed to read file: ${pathFile}`);

        return;
      }

      fs.writeFile(`${pathInfo}${terminal[0]}`, data, (error) => {
        if (error) {
          process.stdout.write(`Failed to create new file: ${pathInfo}.txt`);
        }
      });

      fs.unlink(pathFile, (error) => {
        if (error) {
          process.stdout.write(`Error while renaming terminal[0]: ${pathFile}`);
        }
      });
    });
  }
}

if (terminal.length < 2) {
  process.stdout.write('Missing entered values');
} else {
  renameFile();
}
