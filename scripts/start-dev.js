const { spawn } = require('child_process');

/**
 * This script is a wrapper for 'umi dev'.
 * It is called by the 'start:dev' script in package.json.
 */

console.log('Starting development server via scripts/start-dev.js...');

const child = spawn('npx', ['umi', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start umi dev:', err);
  process.exit(1);
});
