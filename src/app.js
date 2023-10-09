'use strict';

const fs = require('fs/promises');

const operation = process.argv[2];

const move = async () => {
  const currPath = process.argv[3];
  const newPath = process.argv[4];

  const lastSymbol = newPath[newPath.length - 1];
  const dirs = newPath.split('/');
  const lastCurrElement = currPath.split('/')[currPath.split('/').length - 1];
  const lastNewElement = newPath.split('/')[newPath.split('/').length - 1];
  const currFolders = currPath.split('/').slice(0, dirs.length - 1).join('/');
  const newFolders = newPath.split('/').slice(0, dirs.length - 1).join('/');

  if (currPath === newPath) {
    console.log('Pathes are same');

    return;
  }

  if (lastSymbol === '/') {
    try {
      await fs.cp(currPath, `${newPath}${currPath.split('/')[currPath.split('/').length - 1]}`);
      await fs.rm(currPath);
    } catch {
      console.log('Error');
    }
  } else if (newFolders === currFolders) {
    try {
      await fs.rename(currPath, `${newFolders}/${lastNewElement}`);
    } catch {
      console.log('Error');
    }
  } else {
    const isDirectoryExists = false;

    fs.stat(newPath, (error, stats) => {
      try {
        isDirectoryExists = stats.isFile();
      } catch {
        console.log(error);
      }
    })

    if (isDirectoryExists) {
      try {
        await fs.cp(currPath, `${newPath}/${lastCurrElement}`);  
        await fs.rename(
          `${newPath}/${lastCurrElement}`,
          `${newPath}/${lastNewElement}`,
        );
        await fs.rm(currPath);
  
      } catch {
        console.log('Error');
      }
    } else {
      try {
        await fs.cp(currPath, `${newFolders}/${lastCurrElement}${pathEnd}`);  
        await fs.rename(
          `${newFolders}/${lastCurrElement}${pathEnd}`,
          `${newFolders}/${lastNewElement}${pathEnd}`,
        );
        await fs.rm(currPath);
  
      } catch {
        console.log('Error');
      }
    }
  }
};

if (operation === 'mv') {
  move();
} else {
  console.log('No such operation');
};

