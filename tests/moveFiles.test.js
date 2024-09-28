/* eslint-disable max-len */
'use strict';

const fs = require('fs');
const path = require('path');

const { faker } = require('@faker-js/faker');

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

describe('File Move Tests', () => {
  const basePath = 'node src/app.js';
  const testContent = faker.lorem.paragraphs();
  const testFileName = faker.system.commonFileName('txt');

  const tempDir = path.join('tests', faker.word.noun());
  const testFilePath = path.join(tempDir, testFileName);
  const testDir = path.join('tests', faker.word.noun());

  beforeEach(() => {
    fs.mkdirSync(tempDir);
    fs.writeFileSync(testFilePath, testContent);
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir, { recursive: true });
    }

    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir, { recursive: true });
    }
  });

  describe('without params', () => {
    test('should throw error', async () => {
      const { stderr } = await execAsync(basePath);

      expect(stderr.length).toBeGreaterThan(0);
    });
  });

  describe('with one param', () => {
    test('should throw error', async () => {
      const { stderr } = await execAsync(`${basePath} ${testFilePath}`);

      expect(stderr.length).toBeGreaterThan(0);
    });
  });

  describe('with two params', () => {
    test('if source file does not exist, should throw error', async () => {
      const nonExistingFile = path.join(
        tempDir,
        faker.system.commonFileName('txt'),
      );

      const { stderr } = await execAsync(
        `${basePath} ${nonExistingFile} ${testFilePath}`,
      );

      expect(stderr.length).toBeGreaterThan(0);
    });

    test('should rename a file, if destination is a new filename', async () => {
      const newFilePath = path.join(tempDir, faker.lorem.word());

      const { stderr } = await execAsync(
        `${basePath} ${testFilePath} ${newFilePath}`,
      );

      expect(stderr).toBeFalsy();

      const content = fs.readFileSync(newFilePath, 'utf-8');

      expect(fs.existsSync(newFilePath)).toBe(true);
      expect(fs.existsSync(testFilePath)).toBe(false);
      expect(content).toBe(testContent);
    });

    test('should do nothing if source and destination are the same', async () => {
      const { stderr } = await execAsync(
        `${basePath} ${testFilePath} ${testFilePath}`,
      );

      const content = fs.readFileSync(testFilePath, 'utf-8');

      expect(stderr).toBeFalsy();
      expect(fs.existsSync(testFilePath)).toBe(true);
      expect(content).toBe(testContent);
    });

    test('should move file, if passed destination is a file without extension', async () => {
      const newFilePath = path.join(tempDir, faker.lorem.word());
      const { stderr } = await execAsync(
        `${basePath} ${testFilePath} ${newFilePath}`,
      );

      expect(stderr).toBeFalsy();
      expect(fs.existsSync(newFilePath)).toBe(true);
      expect(fs.existsSync(testFilePath)).toBe(false);
    });

    test('should move file, if passed destination is a directory', async () => {
      fs.mkdirSync(testDir);

      const { stderr } = await execAsync(
        `${basePath} ${testFilePath} ${testDir}`,
      );

      expect(stderr).toBeFalsy();

      const newPath = path.join(testDir, testFileName);
      const content = fs.readFileSync(newPath, 'utf-8');

      expect(fs.existsSync(newPath)).toBe(true);
      expect(fs.existsSync(testFilePath)).toBe(false);
      expect(content).toBe(testContent);
    });

    test('should throw error if destination directory does not exist', async () => {
      const nonExistingDir = path.join(
        tempDir,
        'nonExistingDir',
        faker.word.noun(),
      );

      const { stderr } = await execAsync(
        `${basePath} ${testFilePath} ${nonExistingDir}`,
      );

      expect(stderr.length).toBeGreaterThan(0);
      expect(fs.existsSync(nonExistingDir)).toBe(false);
      expect(fs.existsSync(testFilePath)).toBe(true);
    });

    test('should throw error if destination is non-existed directory with fileName', async () => {
      const nonExistingDir = path.join(
        tempDir,
        'nonExistingDir',
        faker.word.noun(),
      );

      const { stderr } = await execAsync(
        `${basePath} ${testFilePath} ${nonExistingDir}`,
      );

      expect(stderr.length).toBeGreaterThan(0);
      expect(fs.existsSync(nonExistingDir)).toBe(false);
      expect(fs.existsSync(testFilePath)).toBe(true);
    });

    test('should move file to directory path ending with "/" with the same filename', async () => {
      fs.mkdirSync(testDir);

      const newPath = path.join(testDir, '/');

      await execAsync(`${basePath} ${testFilePath} ${newPath}`);

      expect(fs.existsSync(path.join(newPath, testFileName))).toBe(true);
    });
  });
});
