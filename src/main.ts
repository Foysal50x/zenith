import { httpServerProcess } from '#core/http-server-process.js';

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    await httpServerProcess.start();
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Handle ESM module execution
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 