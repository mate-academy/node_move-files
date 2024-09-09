/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function getUpdatedPathName(currentPath, targetPath) {
  const currentName = path.basename(currentPath);
  const targetPathExists = fs.existsSync(targetPath);
  const fileType = path.extname(currentPath);
  const hasExtName = path.extname(targetPath);

  if (targetPathExists) {
    return path.join(targetPath, currentName);
  } else if (!hasExtName) {
    return path.join(targetPath, `${currentName}${fileType}`);
  }
}

async function checkArgs() {
  return new Promise((resolve, reject) => {
    const params = process.argv.slice(2);

    console.log(params);

    if (params.length < 1) {
      reject(new Error('No params were provided!'));
    }

    const [currentPath, targetPath] = params;

    if (!currentPath || !targetPath) {
      reject(new Error('Current path or target path wasn`t provided'));
    }

    const fileExists = fs.existsSync(currentPath);
    const targetDirectoryExists = fs.existsSync(path.dirname(targetPath));

    if (!fileExists) {
      reject(new Error('Current file doesn`t exist'));
    }

    if (!targetDirectoryExists) {
      reject(new Error('Current file doesn`t exist'));
    }

    resolve({ currentPath, targetPath });
  });
}

checkArgs()
  .then(({ currentPath, targetPath }) => {
    const data = fs.readFileSync(currentPath, 'utf-8');

    if (currentPath === targetPath) {
      return;
    }

    fs.writeFile(targetPath, data, (err) => {
      if (err) {
        const newPathName = getUpdatedPathName(currentPath, targetPath);

        if (newPathName) {
          fs.writeFileSync(newPathName, data, (err2) => {
            if (err2) {
              console.error(err2);
            }

            fs.rm(currentPath, (err1) => {
              if (err1) {
                console.error(err1);
              }
            });
          });
        } else {
          console.error(err);
        }
      }

      fs.rm(currentPath, (err1) => {
        if (err1) {
          console.error(err1);
        }
      });
    });

    return currentPath;
  })
  .catch((errors) => {
    console.error(errors);
  });
