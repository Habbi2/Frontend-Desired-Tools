import { notFound } from 'next/navigation';
import { getToolById } from '../../../lib/tools';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Params { id: string }

export async function generateStaticParams() {
  // dynamic import to avoid circular
  const { getAllTools } = await import('../../../lib/tools');
  const list = await getAllTools();
  return list.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const tool = await getToolById(params.id);
  if (!tool) return { title: 'Not found' };
  return { title: `${tool.name} – Frontend Desired Tools`, description: tool.tagline };
}

export default async function ToolPage({ params }: { params: Params }) {
  const tool = await getToolById(params.id);
  if (!tool) notFound();
  return (
    <article className="prose dark:prose-invert max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{tool.name}</h1>
      <p className="-mt-1 text-sm text-neutral-600 dark:text-neutral-400">{tool.tagline}</p>
      <div className="flex flex-wrap gap-2 my-4">
        <span className="badge brand capitalize">{tool.status}</span>
        <span className="badge capitalize">{tool.category}</span>
        {tool.tech.map(t => <span key={t} className="badge">{t}</span>)}
      </div>
      <div className="flex gap-3 mb-6 flex-wrap text-sm">
        {tool.repo && <a href={tool.repo} className="underline hover:text-brand-600" target="_blank" rel="noreferrer">GitHub</a>}
        {tool.demo && <a href={tool.demo} className="underline hover:text-brand-600" target="_blank" rel="noreferrer">Live Demo</a>}
        {tool.npm && <a href={`https://npmjs.com/package/${tool.npm}`} className="underline hover:text-brand-600" target="_blank" rel="noreferrer">NPM</a>}
      </div>
      <h2>Features</h2>
      <ul>
        {tool.features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <hr className="my-8" />
      <MDXRemote source={tool.body} />
    </article>
  );
}
