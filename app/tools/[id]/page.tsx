import { notFound } from 'next/navigation';
import { getToolById, getAllTools } from '../../../lib/tools';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const revalidate = 1800;

interface Params { id: string }

export async function generateStaticParams() {
  const list = await getAllTools();
  return list.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const tool = await getToolById(params.id);
  if (!tool) return { title: 'Tool not found' };
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-desired-tools.vercel.app';
  const og = `${base}/api/og/${tool.id}`;
  return {
    title: `${tool.name} – Frontend Desired Tools`,
    description: tool.tagline,
    openGraph: { title: tool.name, description: tool.tagline, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: tool.name, description: tool.tagline, images: [og] }
  };
}

export default async function ToolPage({ params }: { params: Params }) {
  const tool = await getToolById(params.id);
  if (!tool) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-tools.site';
  const canonical = `${site}/tools/${tool.id}`;
  const sameAs = [tool.repo, tool.demo, tool.npm && `https://www.npmjs.com/package/${tool.npm}`].filter(Boolean) as string[];
  const licenseMap: Record<string, string> = {
    MIT: 'https://opensource.org/license/mit/'
  };
  const license = (tool.license && licenseMap[tool.license]) || tool.license;
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
      {/* JSON-LD: SoftwareApplication for this tool */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: tool.category,
          operatingSystem: 'Web',
          description: tool.tagline,
          url: canonical,
          sameAs,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          author: { '@type': 'Organization', name: 'Frontend Desired Tools', url: site },
          publisher: { '@type': 'Organization', name: 'Frontend Desired Tools', url: site },
          license: license
        }) }}
      />
      {tool.features?.length > 0 && <>
        <h2>Features</h2>
        <ul>{tool.features.map(f => <li key={f}>{f}</li>)}</ul>
      </>}
      <hr className="my-8" />
      <MDXRemote source={tool.body} />
    </article>
  );
}
