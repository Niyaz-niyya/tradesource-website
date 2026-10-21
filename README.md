# UJR TradeSource International

Static multilingual corporate website built with React, TypeScript, Vite, i18next and Lucide icons.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Languages and routes

English is selected by default. Visitors may keep multiple preferred languages checked in the language menu; the most recently selected option becomes the primary display language. Primary locales use `/en/`, `/zh/` and `/ar/`. Arabic automatically enables RTL layout.

## Static deployment on Hostinger

1. Run `npm run build`.
2. Upload the contents of `dist/` to `public_html/` in Hostinger File Manager or through SFTP.
3. Keep the generated `.htaccess` in the deployment root so deep links fall back to `index.html`.
4. Point the domain's A record to the Hostinger IP shown in hPanel, enable the free SSL certificate, and force HTTPS.
5. Update the canonical domain in `src/App.tsx`, `public/robots.txt`, and `public/sitemap.xml` if the final domain differs from `ujr.ae`, then rebuild.

For rollback, retain the previous `dist` archive before upload and restore it if required.

## Content and future backend

Verified company details and typed product/service content live in `src/data/content.ts`. The incomplete China phone number and unconfirmed alternative China addresses are intentionally not exposed. In a future API phase, replace these local exports through a small data service while preserving the component-facing types in `src/types.ts`.

No backend, database, authentication, cart, or payment system is included in this phase.

## GitHub Pages deployment

The site is deployed automatically from the `main` branch through GitHub Actions.

Repository: `Niyaz-niyya/tradesource-website`

Live URL: `https://niyaz-niyya.github.io/tradesource-website/`

The deployment workflow enables GitHub Pages and publishes the production build. Every later push to `main` will rebuild and update the website automatically.
