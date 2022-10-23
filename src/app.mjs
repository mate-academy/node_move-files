
import { rename, exists } from './utils.mjs';
import fs from 'fs';

(() => {
  const source = process.argv[2];
  let target = process.argv[3];
  let action = 'renamed';

  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    target += '/' + source;
    action = 'moved';
  } else if (target.endsWith('/')) {
    if (!exists(target)) {
      return;
    }

    target += source;
    action = 'moved';
  } else if (target.startsWith('./') && target.split('/').length >= 3) {
    const folderName = target.split('/').slice(1, -1).join('/');

    if (!exists(folderName)) {
      return;
    }

    action = 'moved';
  }

  rename(source, target)
    .then(() => console.log(`File ${action} to ${target}`));
})();
