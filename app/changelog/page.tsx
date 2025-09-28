import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'node:fs/promises';
import path from 'node:path';

export const revalidate = 1800;

export const metadata = {
  title: 'Changelog – Frontend Desired Tools',
  description: 'Product updates and improvement log for Frontend Desired Tools.'
};

export default async function ChangelogPage() {
  const fp = path.join(process.cwd(), 'content', 'changelog.mdx');
  const raw = await fs.readFile(fp, 'utf8');
  return (
    <article className="prose dark:prose-invert max-w-3xl">
      <MDXRemote source={raw} />
    </article>
  );
}
