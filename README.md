# Pratik Janrao & Associates

A multi-page editorial website for Pratik Janrao & Associates, Chartered Accountants in Pune.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Environment variables

Contact and career forms are disabled by default and fall back to mailto links.

```bash
# Enable configured form submission when an API route/provider is added
NEXT_PUBLIC_CONTACT_FORM_ENABLED=true
NEXT_PUBLIC_CAREER_FORM_ENABLED=true
```

When disabled, users are directed to `office@capratikjanrao.com`.

## Routes

- `/`
- `/about-us`
- `/our-team`
- `/our-team/[slug]`
- `/our-services`
- `/our-services/[slug]`
- `/blogs`
- `/blogs/[slug]`
- `/knowledge-bank`
- `/knowledge-bank/[section]`
- `/knowledge-bank/[section]/[slug]`
- `/careers`
- `/contact-us`
- `/disclaimer`

Legacy service and profile slugs from the previous website are preserved.

## Content

Structured content lives in `content/`:

- `site.ts`
- `navigation.ts`
- `services.ts`
- `team.ts`
- `blogs.ts`
- `knowledge-bank.ts`

All production image assets are included in `public/images`.
