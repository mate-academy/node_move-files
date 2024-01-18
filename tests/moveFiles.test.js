/* eslint-disable max-len */
'use strict';

const fs = require('fs');
const path = require('path');

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

describe('File Move Tests', () => {
  const basePath = 'node src/app.js';
  let testContent = '';

  const tempDir = path.join('tests', 'temp');
  const testFile = path.join(tempDir, 'test.txt');
  const testDir = path.join(tempDir, 'testDir');

  beforeAll(() => {
    testContent = new Array(10).fill(Date.now().toString()).join('\n');
  });

  beforeEach(() => {
    fs.mkdirSync(tempDir);
    fs.writeFileSync(testFile, testContent);
  });

  afterEach(() => {
    fs.rmdirSync(tempDir, { recursive: true });
  });

  test('should rename a file', async() => {
    const newFilePath = path.join(tempDir, 'newName.txt');

    await execAsync(`${basePath} ${testFile} ${newFilePath}`);

    const content = fs.readFileSync(newFilePath, 'utf-8');

    expect(fs.existsSync(newFilePath)).toBe(true);
    expect(fs.existsSync(testFile)).toBe(false);
    expect(content).toBe(testContent);
  });

  test('should move file to existing directory', async() => {
    fs.mkdirSync(testDir);

    const newPath = path.join(testDir, 'test.txt');

    await execAsync(`${basePath} ${testFile} ${newPath}`);

    expect(fs.existsSync(newPath)).toBe(true);
  });

  test('should throw error if destination directory does not exist', async() => {
    const nonExistingDir = path.join(tempDir, 'nonExistingDir', 'test.txt');

    const { stderr } = await execAsync(
      `${basePath} ${testFile} ${nonExistingDir}`
    );

    expect(stderr).toContain('no such file or directory');
    expect(fs.existsSync(nonExistingDir)).toBe(false);
  });

  test('should move file to directory path ending with "/"', async() => {
    fs.mkdirSync(testDir);

    const newPath = path.join(testDir, '/');

    await execAsync(`${basePath} ${testFile} ${newPath}`);

    expect(fs.existsSync(path.join(newPath, 'test.txt'))).toBe(true);
  });

  test('should move file into existing directory if last segment is directory', async() => {
    fs.mkdirSync(testDir);

    await execAsync(`${basePath} ${testFile} ${testDir}`);

    expect(fs.existsSync(path.join(testDir, 'test.txt'))).toBe(true);
  });

  test('should rename file if last segment is not an existing directory', async() => {
    const newPath = path.join(tempDir, 'newName');

    await execAsync(`${basePath} ${testFile} ${newPath}`);

    expect(fs.existsSync(newPath)).toBe(true);
  });
});
