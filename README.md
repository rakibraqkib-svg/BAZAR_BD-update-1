# BazarBD — বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর

BazarBD is a Bengali/English React dashboard for browsing commodity prices, comparing markets, viewing price trends, managing a watchlist, and administering sample price records.

> **Data transparency:** The included starter dataset is sample/demo data and browser changes are stored locally by default. The app does not automatically receive verified live prices from DAM, TCB, or any government API. Only label prices as official/live after a trusted data source and verification workflow have actually been connected.

## Features

- Bengali and English interface
- Commodity search, category filters, sorting, and market selection
- Price history, market comparison, trends, and printable daily report
- Favorites and price alerts
- Admin dashboard for managing the local demo dataset
- Supabase connection setup and SQL schema helper
- Responsive React + TypeScript + Tailwind interface

## Requirements

- Node.js 20.19+ (recommended for the Vite version in this project)
- npm 10+
- A modern browser

Check versions:

```bash
node --version
npm --version
```

## Run on Windows (VS Code)

1. Extract the ZIP file.
2. Open the extracted `bazarbd_extracted` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

```powershell
npm install
```

5. Start the development server:

```powershell
npm.cmd run dev
```

If PowerShell allows npm scripts, `npm run dev` also works. Open the local URL printed by Vite (normally `http://localhost:3000`).

## Environment variables (optional Supabase setup)

Copy `.env.example` to `.env.local`, then fill in your own Supabase project URL and anon/publishable key:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
```

Never put a Supabase `service_role` key or other secret key in a `VITE_` variable. Vite exposes `VITE_` values to the browser. Use Supabase Row Level Security (RLS) policies to protect data.

To connect Supabase, create a project at https://supabase.com, open its SQL Editor, and run the schema from `src/services/supabaseSchema.ts`. Review and enable suitable RLS policies before using real user or market data.

The current app still has a local-storage demo store in `src/services/store.ts`; setting environment variables alone does not migrate all app data to Supabase.

## Build for production

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Deploy to Cloudflare Pages

- Connect the GitHub repository to Cloudflare Pages.
- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Pages environment settings only if Supabase is configured.

## GitHub upload

Run these commands from the project folder (replace the URL with your own repository):

```bash
git init
git add .
git commit -m "Initial BazarBD project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Do not commit `.env.local` or real secrets. The `.gitignore` excludes `.env*` except `.env.example`.

## Important production checklist

- Connect the UI to a real, permission-protected database (the current local store is browser-specific).
- Establish a documented price source, collection time, market, unit, and verification status for every published price.
- Configure Supabase RLS and test admin authorization; hiding an admin button is not access control.
- Configure a secure server-side proxy for Gemini/AI API calls; never expose private API keys in frontend code.
- Test desktop and mobile layouts, empty states, and production build before launch.
