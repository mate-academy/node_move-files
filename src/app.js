const { moveFile } = require('./modules/moveFile');

const [source, destination] = process.argv.slice(2);

moveFile(source, destination);
