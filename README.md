# Mapiko Inc.

A five-page company website using Next.js App Router, React, strict TypeScript and Tailwind CSS. Locally served Manrope and DM Sans fonts. The rejected generated logo is not included; the site uses a text wordmark.

## Run locally

Requires Node.js 22.18+ and npm (Node 24 is suitable). This also supports the TypeScript test runner used by the project.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use `npm run typecheck`, `npm test`, and `npm run build` for verification. Production preview: `npm start` after building.

## Edit content

Services and project details: `src/lib/content.ts`. Founder content: `src/app/about/page.tsx`. Design: `src/app/globals.css`. Shared navigation and footer: `src/components/`. No database is used.

## Loading states

Next.js route loading boundaries show responsive skeletons while navigation is pending, with dedicated layouts for Contact, the blog feed and articles. Ready or prefetched pages appear immediately without an artificial delay. `src/components/loading-image.tsx` provides separate image placeholders until images load and a fallback if an image fails. Motion respects reduced-motion preferences. On a first visit, the browser must receive the initial HTML and CSS before it can display a skeleton.

Brand imagery is in `public/images/`, rendered through `src/components/editorial-image.tsx`. Image origins and generation prompts are documented in `ASSETS.md`. These are labelled conceptual images, not real office or client photographs.

## Blog

Articles live in `content/blog/*.mdx`; featured images live in `public/images/`. See `BLOG-GUIDE.md` for the complete implementation guide, full source listings, frontmatter format, draft workflow and SEO configuration. Add a post, then rebuild and redeploy. Drafts and future-dated articles are excluded from public routes. Only trusted repository authors should edit MDX, which is executable code.

## Email configuration

Copy `.env.example` to `.env.local`. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (the business inbox), and `CONTACT_FROM_EMAIL` (an address on a domain verified in Resend). Never prefix secrets with `NEXT_PUBLIC_`. Restart the local server after changing configuration.

The form is explicitly unavailable until all three settings exist. Visitor details are not stored in a database. Once configured, valid enquiries are emailed through Resend with the visitor as Reply-To. Failure keeps inputs available for retry; the provider's idempotency key prevents duplicate sends on unchanged retries. Basic spam protections include a honeypot, elapsed-time check, input limits and origin checking. For substantial public traffic, add platform-level rate limiting or a bot challenge. No real email has been tested without account configuration.

## Deploy to Vercel

1. Create a GitHub repository and push this project. Do not commit `.env.local`.
2. Import the repository into Vercel, with Next.js selected and this folder as the root.
3. Add the email environment variables and deploy.
4. Configure `SITE_URL` with the real canonical https URL. Set `SITE_PUBLIC=true` only when the public site is ready. Otherwise robots and metadata keep previews unindexed. Vercel Preview environments should keep `SITE_PUBLIC=false`.
5. Test a real enquiry and verify its arrival before launching. Link any custom domain through Vercel.

## Content accuracy

Project visuals are labelled illustrative concepts, not screenshots. Machine learning demos are labelled accurately. Supplied repository URLs may be private or unavailable; verify access before public launch. No testimonials, invented metrics, personal CV contacts, payment system, client accounts, or booking backend are included.

## Setup still needed

Website policy pages are `/privacy`, `/terms` and `/cookies`. The owner-provided temporary policy email is configured once in `src/lib/company.ts`. Keep these pages current when contact details, data practices, hosting or tracking features change.

Business email and Resend credentials, verified sending domain, final public URL, GitHub remote and Vercel project. Actual screenshots can replace conceptual previews later.
