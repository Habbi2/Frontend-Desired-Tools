<p align="center">
	<strong>Frontend Desired Tools Portal</strong><br/>
	Curated micro devtools: security · UX · performance – fast to open, zero onboarding.
</p>

> Live: https://frontend-desired-tools.vercel.app

![Stars](https://img.shields.io/github/stars/Habbi2/Frontend-Desired-Tools?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square) ![Status](https://img.shields.io/badge/OG-images-planned-yellow?style=flat-square)

The portal showcases a curated set of small, sharp frontend / web performance & security utilities. Each tool entry is authored in MDX with structured frontmatter and rendered through a searchable, filterable UI.

## Features
- MDX powered content with typed meta frontmatter
- Search + category + status quick filters
- Tool detail pages with full markdown body
- One‑click external "Open App" demo buttons
- Auto sitemap generation (`/sitemap.xml` via `app/sitemap.ts`)
- Dark mode ready (leverages system preference / Tailwind classes)

## Adding / Editing a Tool
Create a new file under `content/tools/<id>.mdx`.

Frontmatter fields (all lower-case keys):
```yaml
id: unique-id   # required, also becomes route /tools/<id>
name: Tool Name # required
tagline: Short concise sentence
category: category-name # e.g. performance, security, ux, analysis
status: stable | beta | wip
repo: https://github.com/you/yourrepo  # optional
demo: https://your-live-app.example    # optional (enables Open App button)
npm: package-name                      # optional
tech: [Next.js, TypeScript, Tailwind]  # array required (>=1)
features: ["Thing one", "Thing two"]  # array required (>=1)
license: MIT                           # optional
added: 2024-01-10                      # optional ISO date
updated: 2024-02-02                    # optional ISO date
```

Body content below the frontmatter delimiter (`---`) is rendered on the detail page.

## Development
Install deps & run dev (from this folder):
```
npm install
npm run dev
```

Environment (optional):
```
NEXT_PUBLIC_SITE_URL=https://frontend-tools.example
```
Used for generating canonical URLs in the sitemap.

## Sitemap
Implemented via `app/sitemap.ts` and enumerates:
- `/`
- `/about`
- `/tools/<id>` for every MDX file

## Type Safety
`lib/tools.ts` exports `ToolMeta` and parsing utilities. Frontmatter is cast; keep it valid. To extend metadata add fields to `ToolMeta` interface and update related UI components.

## Future Enhancements (Backlog)
- GitHub / NPM stats enrichment (stars, downloads)
- OG image generation per tool
- JSON-LD structured data
- Incremental build cache for MDX parse
- RSS / JSON feed of tool catalog

## Contributing
1. Add / update MDX under `content/tools`.
2. Validate frontmatter keys/naming.
3. If adding fields update `ToolMeta` and any consuming components.
4. Open PR / commit.

## License
Covering portal code: MIT (adjust if needed). Individual tools may have their own licenses—always check those repos.

## Social / OG Image Plan
Planned dynamic OG generation for each tool: large title + tagline + category pill + minimal screenshot strip. Fallback static `/public/og/<id>.png` if dynamic route fails.
