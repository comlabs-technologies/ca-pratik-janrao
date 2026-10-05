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

```bash
# Admin dashboard sign-in (required to use /admin)
ADMIN_PASSWORD=choose-a-long-passphrase
# Optional: separate secret for signing session cookies (defaults to ADMIN_PASSWORD)
ADMIN_SESSION_SECRET=

# Bearer token for the MCP server at /api/mcp (the endpoint is disabled when unset)
MCP_API_KEY=generate-a-long-random-string

# Where submissions, blog/case-study JSON, resumes and uploaded images are stored
# (default: ./.data). Point this at a persistent volume in production.
CMS_DATA_DIR=/var/data/pja

# Set to "false" to fall back to mailto drafts instead of storing form submissions
NEXT_PUBLIC_CONTACT_FORM_ENABLED=
NEXT_PUBLIC_CAREER_FORM_ENABLED=
```

> Storage is a simple JSON-file store (`lib/cms/store.ts`), which suits a single server with a persistent disk.
> On serverless or multi-instance hosting, replace that module with a database client.

## Admin dashboard

Sign in at `/admin`. It provides:

- **Overview**: new enquiries, applications, and content counts at a glance.
- **Submissions**: everyone who filled in the contact or careers form, with filters, search, status, internal notes, resume download and CSV export.
- **Blogs / Case studies**: create, edit, publish/unpublish and delete content, with an HTML editor, preview and cover-image upload.

Published blogs appear on `/blogs` alongside the built-in articles; published case studies appear on `/case-studies`.

## MCP server

An MCP server (Streamable HTTP, stateless) is served at `/api/mcp` so an LLM can manage content.
Authenticate with `Authorization: Bearer $MCP_API_KEY`.

| Tool | Purpose |
| --- | --- |
| `list_posts`, `get_post` | Browse blog posts |
| `create_draft_post`, `update_post`, `publish_post`, `delete_post` | Manage blog posts |
| `list_case_studies`, `get_case_study` | Browse case studies |
| `create_case_study`, `update_case_study`, `publish_case_study`, `delete_case_study` | Manage case studies |
| `upload_image`, `upload_image_from_url` | Host an image and get back a `/media/...` path |

Bodies are HTML and are sanitised on write. Slug, summary and SEO fields are generated when omitted.

Connect from Claude Code:

```bash
claude mcp add --transport http pja-cms https://YOUR-DOMAIN/api/mcp --header "Authorization: Bearer $MCP_API_KEY"
```

Form submissions are intentionally not exposed through MCP.

## Routes

- `/`
- `/about-us`
- `/our-team`
- `/our-team/[slug]`
- `/our-services`
- `/our-services/[slug]`
- `/blogs`
- `/blogs/[slug]`
- `/case-studies`
- `/case-studies/[slug]`
- `/knowledge-bank`
- `/knowledge-bank/[section]`
- `/knowledge-bank/[section]/[slug]`
- `/careers`
- `/contact-us`
- `/disclaimer`
- `/admin` (sign-in required)
- `POST /api/contact`, `POST /api/careers`, `POST /api/mcp`

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
