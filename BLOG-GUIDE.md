# Mapiko Inc. — local MDX blog implementation

This guide documents the working implementation in this project. The application uses a **src directory**, so the requested app/blog routes are implemented under **src/app/blog**. No second root app directory is needed.

## 1. Choose the content pipeline and install it

For this small, repository-authored blog, use the official **@mdx-js/mdx** compiler, **gray-matter** for YAML frontmatter, the existing **Zod** dependency for validation, and **remark-gfm** for tables and other GitHub-style Markdown. Everything compiles on the server. MDX is executable code: keep authorship limited to trusted repository contributors; do not evaluate user submissions or arbitrary remote content.

The official next-mdx-remote repository was archived on 9 April 2026. It is not the default for this new implementation. @next/mdx is the official Next.js integration and is a good alternative for MDX imported as modules or used directly as routes. Here the direct compiler keeps frontmatter, content discovery, and the [slug] route together without adding a generated content layer or custom Next configuration. Contentlayer is not required.

Installed versions: @mdx-js/mdx 3.1.1, gray-matter 4.0.3, remark-gfm 4.0.1, @tailwindcss/typography 0.5.20.

```sh
npm install --save-exact @mdx-js/mdx gray-matter remark-gfm server-only
npm install --save-dev --save-exact @tailwindcss/typography
```

Zod, Next.js, React, TypeScript and Tailwind CSS are already installed. Commit package.json and package-lock.json; use npm ci on another machine. No @next/mdx plugin or mdx-components.tsx is needed for this direct-compiler approach.

## 2. Create this folder structure

```text
mapiko-inc/
├── content/
│   └── blog/
│       ├── planning-a-useful-software-project.mdx
│       ├── what-makes-a-useful-business-website.mdx
│       └── draft-example.mdx
├── public/
│   └── images/
│       ├── workspace.webp
│       └── services-development.webp
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── blog-card.tsx
│   │   ├── mdx-content.tsx
│   │   ├── icons.tsx                  # existing Arrow icon
│   │   ├── navigation.tsx             # Blog link added
│   │   └── shared.tsx                 # existing site layout and footer
│   └── lib/
│       ├── blog-core.ts
│       └── posts.ts
├── tests/
│   └── blog.test.ts
├── postcss.config.mjs
├── package.json
└── BLOG-GUIDE.md
```

## 3. Author a post with validated frontmatter

The filename must exactly match the slug plus .mdx. Dates use quoted YYYY-MM-DD values, interpreted as UTC calendar dates. Use local image URLs beginning /images/ (without /public). title, slug, description, author, publishDate, featuredImage and imageAlt are required; tags defaults to an empty array and draft defaults to false.

Start a new article with draft: true. Use ## and ### in its body: the reading layout already supplies its h1. A supplied Callout component is available without importing it. Markdown links, lists, tables and fenced code blocks are supported. Use reviewed custom components when adding advanced content.

Example: content/blog/planning-a-useful-software-project.mdx

```mdx
---
title: "Start with the workflow, not the feature list"
slug: "planning-a-useful-software-project"
description: "A practical way to turn an everyday business problem into a clear, manageable software brief."
author: "Mapiko Inc."
publishDate: "2026-11-04"
tags: ["Software planning", "Business systems"]
featuredImage: "/images/services-development.webp"
imageAlt: "Software wireframes being sketched beside a laptop dashboard"
draft: false
---

A useful software project starts with something that needs to work better. Before choosing a framework or writing a long feature list, look at the people doing the work and the decisions they make every day.

## Map the work as it happens

Choose one workflow. It might be preparing school report cards, updating a website, or moving a customer enquiry from the inbox to the right person.

Write down:

- Who starts the process and what information they need.
- Where that information comes from.
- Who checks, changes, or approves it.
- What a completed task looks like.

The awkward steps are often the most useful ones to discuss. A repeated copy-and-paste task can reveal a clearer opportunity than a request for a new dashboard.

<Callout>
  Describe a recent example of the problem. A real workflow gives a developer something concrete to design around.
</Callout>

## Separate the first release from later ideas

A smaller first release is easier to review when its purpose is clear. Keep a separate list for useful additions that can wait.

| Question | What to capture |
| --- | --- |
| Who will use it? | Roles and access needs |
| What must work first? | The essential workflow |
| How will we review it? | Clear acceptance criteria |
| What happens after launch? | Ownership and support |

## Agree on a practical definition of done

Instead of saying that a system should be easy to use, describe what someone should be able to do. For example: an authorised teacher can upload valid marks and see which rows need correction before publishing anything.

That description helps guide the interface, the checks behind it, and the review at handover.

## Leave room for the conversation

You do not need every answer before contacting a developer. A clear problem, an example of the current process, and an idea of your constraints are enough to begin.

If you have a workflow you would like to improve, [tell us about your project](/contact).
```

## 4. Load, validate and filter local posts

The core loader validates slugs, dates, fields, matching filenames and local featured-image existence. It excludes drafts and future dates and sorts newest first. Invalid authored content fails the build with a useful error rather than silently becoming a broken article. A missing/empty content directory produces the feed's empty state. Equal publication dates are ordered by slug.

src/lib/blog-core.ts

```ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const date = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((value) => {
      const parsed = new Date(`${value}T00:00:00Z`);
      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
      );
    }, "Use a real calendar date in YYYY-MM-DD format."),
);
export const slugSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const postSchema = z.object({
  title: z.string().trim().min(1).max(140),
  slug: slugSchema,
  description: z.string().trim().min(1).max(240),
  author: z.string().trim().min(1).max(100),
  publishDate: date,
  tags: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
  featuredImage: z
    .string()
    .regex(/^\/images\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpe?g|avif)$/),
  imageAlt: z.string().trim().min(1).max(250),
  draft: z.boolean().default(false),
});
export type PostMetadata = z.infer<typeof postSchema>;
export type Post = PostMetadata & { content: string; readingMinutes: number };

export function parsePost(source: string, filename: string): Post {
  const { data, content } = matter(source);
  const parsed = postSchema.safeParse(data);
  if (!parsed.success)
    throw new Error(
      `Invalid frontmatter in ${filename}: ${parsed.error.message}`,
    );
  if (`${parsed.data.slug}.mdx` !== filename)
    throw new Error(`Filename must match slug: ${filename}`);
  if (!content.trim()) throw new Error(`Post has no content: ${filename}`);
  return {
    ...parsed.data,
    content,
    readingMinutes: Math.max(
      1,
      Math.ceil(content.trim().split(/\s+/).length / 220),
    ),
  };
}

export function isPublished(post: PostMetadata, now = new Date()): boolean {
  return (
    !post.draft &&
    new Date(`${post.publishDate}T00:00:00Z`).getTime() <= now.getTime()
  );
}

export async function readPublishedPosts(
  directory: string,
  now = new Date(),
): Promise<Post[]> {
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map(async (entry) => {
        const post = parsePost(
          await fs.readFile(path.join(directory, entry.name), "utf8"),
          entry.name,
        );
        await fs.access(
          path.join(process.cwd(), "public", post.featuredImage.slice(1)),
        );
        return post;
      }),
  );
  return posts
    .filter((post) => isPublished(post, now))
    .sort(
      (a, b) =>
        b.publishDate.localeCompare(a.publishDate) ||
        a.slug.localeCompare(b.slug),
    );
}

export function formatPostDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
```

The server-only wrapper reads content from the project root and uses React cache for repeated reads within a server render. The slug is checked and matched against the published collection; request parameters never become arbitrary filesystem paths. Do not import this module into a Client Component.

src/lib/posts.ts

```ts
import "server-only";
import path from "node:path";
import { cache } from "react";
import { readPublishedPosts, slugSchema } from "./blog-core";

export const getPosts = cache(async () =>
  readPublishedPosts(path.join(process.cwd(), "content", "blog")),
);
export const getPost = cache(async (slug: string) => {
  if (!slugSchema.safeParse(slug).success) return undefined;
  return (await getPosts()).find((post) => post.slug === slug);
});
```

## 5. Enable Tailwind Typography and render MDX

This project uses Tailwind CSS v4. Add the plugin directly after the existing import in src/app/globals.css:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

The existing PostCSS setup remains:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

The reading layout uses prose prose-lg. The scoped overrides below preserve Markdown spacing, lists and link underlines because this site's pre-existing global resets are outside Tailwind's layers. Without these overrides, an unlayered global ul/ol reset would win over the typography plugin.

```css
.blog-prose {
  --tw-prose-body: #435166;
  --tw-prose-headings: #13233b;
  --tw-prose-links: #254ded;
  --tw-prose-bold: #13233b;
  --tw-prose-counters: #596270;
  --tw-prose-bullets: #596270;
  --tw-prose-quotes: #13233b;
  --tw-prose-code: #13233b;
}
.blog-card h2 {
  margin-top: 0.75rem;
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  line-height: 1.2;
}
.blog-card > p {
  margin-top: 1rem;
}
.blog-article header h1 {
  font-size: clamp(2.5rem, 5.2vw, 4.5rem);
  line-height: 1.12;
}
.blog-article header > p {
  margin-top: 1.5rem;
}
.blog-article header > ul {
  margin-top: 1.25rem;
}
.blog-prose .not-prose p {
  margin: 0;
}
.blog-prose p {
  margin-block: 1.25em;
}
.blog-prose h2 {
  margin-block: 2em 0.8em;
  font-size: 1.65em;
}
.blog-prose h3 {
  margin-block: 1.6em 0.7em;
  font-size: 1.3em;
}
.blog-prose ul {
  list-style: disc;
  padding-left: 1.5em;
  margin-block: 1.25em;
}
.blog-prose ol {
  list-style: decimal;
  padding-left: 1.5em;
  margin-block: 1.25em;
}
.blog-prose li {
  margin-block: 0.5em;
  padding-left: 0.25em;
}
.blog-prose a {
  text-decoration: underline;
}
.blog-prose pre {
  max-width: 100%;
}
.blog-prose table {
  width: 100%;
  border-collapse: collapse;
}
.blog-prose th,
.blog-prose td {
  padding: 0.7em;
  border-bottom: 1px solid var(--rule);
  text-align: left;
}
.blog-prose > :first-child {
  margin-top: 0;
}
```

Compile and render trusted MDX with the official evaluator. This is a Server Component; no compiler or dynamic-code evaluation is shipped to the visitor's browser, and no browser CSP relaxation is needed. Custom Callout and table components inherit the website's design.

src/components/mdx-content.tsx

```tsx
import "server-only";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 border border-[#bac8ec] bg-[#eef2ff] p-6 text-base leading-relaxed text-ink">
      {children}
    </aside>
  );
}
function ArticleTable(props: ComponentProps<"table">) {
  return (
    <div
      className="my-8 overflow-x-auto"
      role="region"
      aria-label="Article table"
      tabIndex={0}
    >
      <table {...props} />
    </div>
  );
}
export async function MdxContent({ source }: { source: string }) {
  // MDX is executable code. Only repository-authored, reviewed content is evaluated.
  const { default: Content } = await evaluate(source, {
    ...runtime,
    development: false,
    remarkPlugins: [remarkGfm],
  });
  return <Content components={{ Callout, table: ArticleTable }} />;
}
```

## 6. Build the responsive card and /blog feed

Cards use Next Image, semantic dates, author information and topics. The feed is one column on phones and two columns from the md breakpoint. It has a useful empty state and requires no client-side JavaScript. Arrow is an existing SVG component in this project.

src/components/blog-card.tsx

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog-core";
import { formatPostDate } from "@/lib/blog-core";
import { Arrow } from "./icons";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="blog-card group min-w-0 border-b border-[#d9dcd9] pb-9">
      <Link
        href={`/blog/${post.slug}`}
        className="block"
        aria-label={`Read ${post.title}`}
      >
        <div className="aspect-[16/10] overflow-hidden bg-[#e9ece7]">
          <Image
            src={post.featuredImage}
            alt={post.imageAlt}
            width={1600}
            height={1000}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 50vw, 640px"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      </Link>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#596270]">
        <time dateTime={post.publishDate}>
          {formatPostDate(post.publishDate)}
        </time>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h2 className="mt-3 text-2xl leading-tight md:text-3xl">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-4 text-base text-[#596270]">{post.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span>By {post.author}</span>
        <ul className="flex flex-wrap gap-3 text-[#596270]" aria-label="Topics">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <Link className="text-link mt-4" href={`/blog/${post.slug}`}>
        Read article <Arrow diagonal />
        <span className="sr-only">: {post.title}</span>
      </Link>
    </article>
  );
}
```

src/app/blog/page.tsx

```tsx
import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";
import { PageIntro } from "@/components/shared";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on websites, custom software and applied AI from Mapiko Inc.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Ideas for useful software | Mapiko Inc.",
    description: "Practical notes on websites, custom software and applied AI.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/images/workspace.webp",
        alt: "A software development workspace",
      },
    ],
  },
};
export default async function Blog() {
  const posts = await getPosts();
  return (
    <>
      <PageIntro
        title={
          <>
            Ideas for
            <br />
            <span>useful software.</span>
          </>
        }
        description="Practical notes on building better websites, simplifying workflows and making sense of AI."
      />
      <section className="container pb-20 md:pb-28" aria-label="Blog articles">
        {posts.length ? (
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="border-t border-[#d9dcd9] py-12">
            <h2 className="text-3xl">More ideas are on the way.</h2>
            <p className="mt-4 text-[#596270]">
              There are no published articles yet. Check back soon.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
```

## 7. Add article routes and dynamic SEO

generateStaticParams creates published article pages at build time. dynamicParams=false makes unbuilt slugs return 404; getPost and notFound also guard missing content. Next.js App Router params is a Promise in this project and is awaited in both the page and generateMetadata.

generateMetadata derives the title, description, canonical URL, authors, publication time, tags, Open Graph article image and Twitter summary card from the same validated frontmatter. The article title uses the existing root title template, resulting in Article title | Mapiko Inc. Missing posts do not receive misleading article metadata.

src/app/blog/[slug]/page.tsx

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { formatPostDate } from "@/lib/blog-core";
import { MdxContent } from "@/components/mdx-content";
import { CTA } from "@/components/shared";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const runtime = "nodejs";

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const url = `/blog/${post.slug}`;
  const image = { url: post.featuredImage, alt: post.imageAlt };
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Mapiko Inc.",
      type: "article",
      publishedTime: `${post.publishDate}T00:00:00.000Z`,
      authors: [post.author],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
    },
  };
}
export default async function Article({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <>
      <article className="blog-article container py-12 md:py-20">
        <header className="mx-auto max-w-[900px]">
          <Link href="/blog" className="text-link mb-8">
            Back to the blog
          </Link>
          <h1 className="text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.12]">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#596270] md:text-xl">
            {post.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#596270]">
            <span>By {post.author}</span>
            <time dateTime={post.publishDate}>
              {formatPostDate(post.publishDate)}
            </time>
            <span>{post.readingMinutes} min read</span>
          </div>
          <ul
            aria-label="Article topics"
            className="mt-5 flex flex-wrap gap-4 text-sm text-brand"
          >
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>
        <div className="mx-auto my-10 max-w-[1100px] overflow-hidden md:my-14">
          <Image
            src={post.featuredImage}
            alt={post.imageAlt}
            width={1600}
            height={900}
            preload
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), 1100px"
            className="aspect-[16/9] h-auto w-full object-cover"
          />
        </div>
        <div className="blog-prose prose prose-lg mx-auto max-w-[70ch] prose-headings:font-[family-name:var(--heading)] prose-headings:text-ink prose-a:text-brand prose-a:underline-offset-4 prose-img:h-auto prose-img:max-w-full prose-pre:overflow-x-auto">
          <MdxContent source={post.content} />
        </div>
        <footer className="mx-auto mt-14 max-w-[70ch] border-t border-[#d9dcd9] pt-7">
          <Link className="text-link" href="/blog">
            Explore more articles
          </Link>
        </footer>
      </article>
      <CTA />
    </>
  );
}
```

## 8. Connect navigation, sitemap and production URLs

A Blog link has been added to the main navigation and footer. Article routes keep Blog highlighted. The menu changes to its mobile form up to 980 px so the extra link does not crowd tablet navigation.

The sitemap includes the feed and published articles only when public indexing is enabled:

src/app/sitemap.ts

```ts
import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.SITE_URL;
  if (!site || process.env.SITE_PUBLIC !== "true") return [];
  const pages = ["", "/services", "/work", "/about", "/contact", "/blog"].map(
    (path) => ({
      url: new URL(path || "/", site).href,
    }),
  );
  const posts = (await getPosts()).map((post) => ({
    url: new URL(`/blog/${post.slug}`, site).href,
    lastModified: new Date(`${post.publishDate}T00:00:00Z`),
  }));
  return [...pages, ...posts];
}
```

The existing root metadataBase uses new URL(process.env.SITE_URL || 'http://localhost:3000'). Set SITE_URL to the real canonical HTTPS address in production and SITE_PUBLIC=true only when ready to index. This resolves relative canonical and image URLs into absolute URLs. Keep SITE_PUBLIC=false for previews. Set these variables before building because most pages are generated statically. Images in public are included automatically; content is read at build time for these static routes.

## 9. Publish and maintain posts

1. Create content/blog/your-post-slug.mdx and add its image under public/images/.
2. Fill in frontmatter and write the body. Keep draft: true while reviewing.
3. Set draft: false and a publishDate no later than the intended build date.
4. Run npm test and npm run build.
5. Run npm start and review /blog and /blog/your-post-slug, including its page metadata.
6. Commit the content, images and code; deploy through the existing Vercel/GitHub workflow.

Local files are not a runtime CMS. Adding, editing, deleting, or publishing a post requires a rebuild and deployment in production. Future-dated posts do not automatically appear at midnight: rebuild on or after their date. Restart the production server after a local build. During development, refresh the blog page after saving an MDX file; if the development cache persists, restart npm run dev.

The starter content includes two published examples and a draft that returns 404. Treat the examples as editable starter copy before public launch. No comments, accounts, admin dashboard, CMS, search, pagination or tag-filter routes have been added.

## Verification commands

```sh
npm test
npm run build
npm start
```

The blog tests cover date and schema validation, filename/slug consistency, path traversal rejection, sorting, drafts, future dates and malformed content. Review /blog, an article, an unknown slug and /blog/draft-example. In a public production build, check the article's canonical and og:image URL, article metadata and sitemap entries.

## Primary references

- [Official MDX compiler API](https://mdxjs.com/packages/mdx/)
- [Next.js MDX guidance](https://nextjs.org/docs/app/guides/mdx)
- [next-mdx-remote repository and archive status](https://github.com/hashicorp/next-mdx-remote)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Official Tailwind Typography setup](https://github.com/tailwindlabs/tailwindcss-typography)
- [gray-matter frontmatter parser](https://github.com/jonschlinkert/gray-matter)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
