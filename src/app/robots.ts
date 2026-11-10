import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const site = process.env.SITE_URL;
  const isPublic = process.env.SITE_PUBLIC === "true" && !!site;
  return {
    rules: {
      userAgent: "*",
      ...(isPublic ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    ...(isPublic ? { sitemap: new URL("/sitemap.xml", site).href } : {}),
  };
}
