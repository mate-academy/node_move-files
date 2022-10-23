import fs from 'fs/promises';

export function rename(source, target) {
  return fs.rename(source, target)
    .catch((err) => {
      console.log(err);
    });
}

export function exists(path) {
  const result = fs.existsSync(path);

  if (!result) {
    console.log('No such directory: ' + path);
  }

  return result;
}
