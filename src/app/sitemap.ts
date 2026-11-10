import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.SITE_URL;
  if (!site || process.env.SITE_PUBLIC !== "true") return [];
  const pages = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((path) => ({
    url: new URL(path || "/", site).href,
  }));
  const posts = (await getPosts()).map((post) => ({
    url: new URL(`/blog/${post.slug}`, site).href,
    lastModified: new Date(`${post.publishDate}T00:00:00Z`),
  }));
  return [...pages, ...posts];
}
