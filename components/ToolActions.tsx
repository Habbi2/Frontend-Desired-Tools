"use client";
import React from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import Link from 'next/link';
import type { ToolMeta } from '../lib/tools';

export default function ToolActions({ tool }: { tool: ToolMeta }) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {tool.demo ? (
        <Button size="sm" onClick={() => window.open(tool.demo!, '_blank','noopener')}>Open App ↗</Button>
      ) : (
        <Badge tone="neutral" className="opacity-70">No Demo</Badge>
      )}
      {tool.repo && (
        <Button variant="outline" size="sm" onClick={() => window.open(tool.repo!,'_blank','noopener')}>Repo ↗</Button>
      )}
      <Link href={`/tools/${tool.id}`}><Button variant="outline" size="sm" type="button">Details</Button></Link>
    </div>
  );
}
