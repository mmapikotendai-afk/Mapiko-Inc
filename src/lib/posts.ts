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
