"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = ['all','security','performance','ux','devtools','utility'];
const statuses = ['all','stable','beta','experimental'];

export default function SearchFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const [query, setQuery] = useState(sp.get('q') || '');
  const [category, setCategory] = useState(sp.get('cat') || 'all');
  const [status, setStatus] = useState(sp.get('status') || 'all');
  const [isDirty, setDirty] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  function push(opts: { replace?: boolean } = {}) {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'all') params.set('cat', category);
    if (status !== 'all') params.set('status', status);
    const qs = params.toString();
    (opts.replace ? router.replace : router.push)(qs ? `/?${qs}` : '/');
    setDirty(false);
  }

  function reset() {
    setQuery('');
    setCategory('all');
    setStatus('all');
    router.push('/');
    setDirty(false);
  }

  // Debounce search typing for smoother UX
  useEffect(() => {
    setDirty(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      push({ replace: true });
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); push(); }}
      className="flex flex-wrap gap-4 items-end rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/40 dark:bg-neutral-900/40 backdrop-blur"
      role="search"
      aria-label="Filter tools"
    >
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1" htmlFor="tool-search">Search</label>
        <input
          id="tool-search"
          value={query}
          onChange={e=> setQuery(e.target.value)}
          placeholder="Search tools (name, tagline, feature)"
          className="px-3 py-2 text-sm rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500 min-w-[14rem]"
          aria-describedby="search-hint"
        />
        <span id="search-hint" className="sr-only">Type to filter tools, results update after a short pause.</span>
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1" htmlFor="filter-category">Category</label>
        <select id="filter-category" value={category} onChange={e=> { setCategory(e.target.value); push(); }} className="px-3 py-2 text-sm rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1" htmlFor="filter-status">Status</label>
        <select id="filter-status" value={status} onChange={e=> { setStatus(e.target.value); push(); }} className="px-3 py-2 text-sm rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex gap-2 h-9 items-center">
        <button type="submit" className="h-9 px-4 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isDirty}>Apply</button>
        <button type="button" onClick={reset} className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm hover:border-brand-500 transition-colors">Reset</button>
      </div>
    </form>
  );
}
