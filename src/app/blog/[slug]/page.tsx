import type { Metadata } from "next";
import { LoadingImage } from "@/components/loading-image";
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
          <LoadingImage
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
