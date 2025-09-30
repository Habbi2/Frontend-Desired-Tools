#!/usr/bin/env node
// src/cli.ts

(async () => {
  const [, , cmd] = process.argv;
  if (cmd === 'audit' || !cmd) {
    try {
      const mod = await import('open');
      const open = (mod as any).default || (mod as any);
      await open('https://frontend-tools.site'); // adjust to your live app URL
    } catch (err) {
      console.error('Failed to open URL:', err);
      process.exit(1);
    }
  } else {
    console.log('Unknown command. Try: tools-portal audit');
  }
})();