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
