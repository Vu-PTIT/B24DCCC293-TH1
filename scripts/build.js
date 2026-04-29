const { spawn } = require('child_process');

/**
 * This script is a wrapper for 'umi build'.
 * It is called by the 'build' script in package.json.
 */

console.log('Starting build process via scripts/build.js...');

const child = spawn('npx', ['umi', 'build'], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start umi build:', err);
  process.exit(1);
});
