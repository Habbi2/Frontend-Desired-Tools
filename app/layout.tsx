import './globals.css';
import ogImage from '../frontend-tools-og.png';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://frontend-tools.site'),
  title: 'Frontend Desired Tools',
  description: 'A hub for frontend and security tooling projects, offering simple tools to enhance your web development experience.',
  openGraph: {
    url: 'https://frontend-tools.site/',
    type: 'website',
    title: 'Frontend Desired Tools',
    description: 'A hub for frontend and security tooling projects, offering simple tools to enhance your web development experience.',
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }]
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://frontend-tools.site/',
    title: 'Frontend Desired Tools',
    description: 'A hub for frontend and security tooling projects, offering simple tools to enhance your web development experience.',
    images: [ogImage.src]
  },
  verification: {
    google: 'PrcdcE0AX6G33ywFSFNjLd6CUgeYlZM2p1cyfTt7h9Q'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-screen flex flex-col bg-neutral-950 text-neutral-200">
        {/* JSON-LD: Organization */}
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Frontend Desired Tools',
          url: (process as any).env.SITE_URL || 'https://frontend-tools.site',
          sameAs: [
            'https://github.com/Habbi2'
          ]
        }) }} />
        {/* JSON-LD: WebSite + SearchAction */}
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Frontend Desired Tools',
          url: (process as any).env.SITE_URL || 'https://frontend-tools.site'
        }) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-brand-600 text-white px-4 py-2 rounded-md shadow">Skip to content</a>
  <header className="border-b border-neutral-800 bg-neutral-950/90">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
            <div className="flex items-center gap-3">
              <a href="/" className="text-lg font-semibold tracking-tight hover:text-brand-600">Frontend Desired Tools</a>
              <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-brand-600 text-white">MVP</span>
            </div>
            <nav className="flex items-center gap-6 text-sm ml-auto" aria-label="Primary">
              <a href="/about" className="hover:text-brand-400">About</a>
              <a href="/changelog" className="hover:text-brand-400">Changelog</a>
              <a href="https://www.habbiwebdesign.site/" target="_blank" rel="noreferrer" className="hover:text-brand-400">Habbi Web Design ↗</a>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 py-10 space-y-10">{children}</main>
        <footer className="mt-auto border-t border-neutral-800 bg-neutral-950/90">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 grid gap-4 md:grid-cols-3 items-center">
            <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-4">
              <span>&copy; {new Date().getFullYear()} Frontend Desired Tools</span>
              <a href="/about" className="hover:text-brand-400">About</a>
              <a href="/changelog" className="hover:text-brand-400">Changelog</a>
              <a href="https://github.com/Habbi2" target="_blank" rel="noreferrer" className="hover:text-brand-400">GitHub ↗</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
