#!/usr/bin/env node
// src/cli.ts
import open from 'open';

const [, , cmd] = process.argv;
if (cmd === 'audit' || !cmd) {
  await open('https://frontend-tools.site');   // or wherever your live app lives
} else {
  console.log('Unknown command.  Try: tools-portal audit');
}