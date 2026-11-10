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
