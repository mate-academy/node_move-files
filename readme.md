# Move files

**Read [the guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before start**

Write an app that will move a file from one location to another like Linux mv
command: `mv file.txt ./someDir/` (this will create `file.txt` in `./someDir`
and remove the source file).
- If a destination contains `/` in the end it must be considered as a directory.
- In case destination directory does not exist an error must be thrown.
- The app must support only moving of files, and no additional options (flags).

Examples:
- `node index file.txt file2.txt` simply renames the file.
- `node index file.txt ./existingDir/test` moves the file under `existingDir` with the name `test`.
- `node index file.txt dir/` moves the file under the `dir`. In case `dir` does not exist an error is thrown.
- `node index file.txt a` in case `a` is an existing directory `file.txt` will be moved to ./a/file.txt. If `a` does not exist the file will be renamed to `./a`

    const checkDirectory = fs.isDirectory(newPath);
