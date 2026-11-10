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
