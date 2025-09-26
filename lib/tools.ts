import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export interface ToolMeta {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  repo?: string;
  demo?: string;
  npm?: string;
  tech: string[];
  features: string[];
  license?: string;
  added?: string;
  updated?: string;
}

export interface Tool extends ToolMeta { body: string; }

const contentDir = path.join(process.cwd(), 'content', 'tools');

export async function getAllTools(): Promise<ToolMeta[]> {
  const files = await fs.readdir(contentDir);
  const out: ToolMeta[] = [];
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const raw = await fs.readFile(path.join(contentDir, file), 'utf8');
    const { data } = matter(raw);
    out.push(data as ToolMeta);
  }
  // sort stable first then name
  return out.sort((a,b) => {
    const order = (s: string) => s === 'stable' ? 0 : s === 'beta' ? 1 : 2;
    const diff = order(a.status) - order(b.status);
    return diff !== 0 ? diff : a.name.localeCompare(b.name);
  });
}

export async function getToolById(id: string): Promise<Tool | null> {
  const fp = path.join(contentDir, `${id}.mdx`);
  try {
    const raw = await fs.readFile(fp, 'utf8');
    const { data, content } = matter(raw);
    return { ...(data as ToolMeta), body: content };
  } catch {
    return null;
  }
}
