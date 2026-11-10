import { LoadingImage } from "./loading-image";
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
          <LoadingImage
            wrapperClassName="h-full"
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
