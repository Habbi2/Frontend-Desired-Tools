import { getAllTools, type ToolMeta } from '../lib/tools';
import Link from 'next/link';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import ToolActions from '../components/ToolActions';

export const revalidate = 1800; // 30m

export default async function HomePage() {
  const tools = await getAllTools();
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t: ToolMeta) => {
          const statusTone = t.status === 'stable' ? 'success' : t.status === 'beta' ? 'warn' : 'info';
          return (
            <Card key={t.id} interactive className="flex flex-col p-5 gap-3">
              <div className="flex items-start justify-between gap-3">
                <Link href={`/tools/${t.id}`} className="font-semibold tracking-tight text-base hover:text-brand-600 line-clamp-1">{t.name}</Link>
                <Badge tone={statusTone}>{t.status}</Badge>
              </div>
              <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-4 flex-1">{t.tagline}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge>{t.category}</Badge>
                {t.tech.slice(0,2).map((tech: string) => <Badge key={tech}>{tech}</Badge>)}
              </div>
              <ToolActions tool={t} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
