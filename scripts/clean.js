import { rimrafSync } from 'rimraf';
import { join } from 'path';

const patterns = [
  'dist',
  'src/**/*.js',
  'src/**/*.js.map',
  'src/**/*.d.ts',
  'src/**/*.d.ts.map',
  'generated/**/*.js',
  'generated/**/*.js.map',
  'generated/**/*.d.ts',
  'generated/**/*.d.ts.map',
  '*.js',
  '*.js.map',
  '*.d.ts',
  '*.d.ts.map'
];

const excludes = [
  'eslint.config.js',
  'jest.config.js', // Although we have .mjs, let's be safe
];

console.log('Cleaning up generated files...');

patterns.forEach(pattern => {
  try {
    rimrafSync(pattern, { glob: true });
  } catch (err) {
    console.error(`Error deleting ${pattern}:`, err.message);
  }
});

console.log('Cleanup finished.');
