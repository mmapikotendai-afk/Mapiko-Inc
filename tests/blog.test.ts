import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  parsePost,
  isPublished,
  readPublishedPosts,
  slugSchema,
} from "../src/lib/blog-core.ts";

const makePost = (slug: string, date = "2026-11-04", draft = false) => `---
title: "A useful article"
slug: "${slug}"
description: "A useful description."
author: "Mapiko Inc."
publishDate: "${date}"
tags: ["Software"]
featuredImage: "/images/workspace.webp"
imageAlt: "A workspace"
draft: ${draft}
---
## Useful content
An article with some content.
`;
test("frontmatter validates dates, filename matching and traversal", () => {
  assert.equal(parsePost(makePost("hello"), "hello.mdx").slug, "hello");
  assert.throws(() => parsePost(makePost("hello"), "wrong.mdx"), /Filename/);
  assert.throws(
    () => parsePost(makePost("hello", "2026-02-30"), "hello.mdx"),
    /frontmatter/,
  );
  assert.equal(slugSchema.safeParse("../private").success, false);
  assert.throws(
    () =>
      parsePost(
        makePost("hello").replace(
          "/images/workspace.webp",
          "/images/../private.png",
        ),
        "hello.mdx",
      ),
    /frontmatter/,
  );
});
test("drafts and future dates are excluded", () => {
  const now = new Date("2026-11-04T12:00:00Z");
  assert.equal(
    isPublished(parsePost(makePost("hello"), "hello.mdx"), now),
    true,
  );
  assert.equal(
    isPublished(
      parsePost(makePost("hello", "2026-11-04", true), "hello.mdx"),
      now,
    ),
    false,
  );
  assert.equal(
    isPublished(parsePost(makePost("hello", "2026-11-05"), "hello.mdx"), now),
    false,
  );
});
test("filesystem loader sorts published posts and rejects invalid content", async () => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "mapiko-blog-test-"),
  );
  try {
    await Promise.all([
      fs.writeFile(path.join(directory, "newer.mdx"), makePost("newer")),
      fs.writeFile(
        path.join(directory, "older.mdx"),
        makePost("older", "2026-10-01"),
      ),
      fs.writeFile(
        path.join(directory, "draft.mdx"),
        makePost("draft", "2026-10-01", true),
      ),
      fs.writeFile(
        path.join(directory, "future.mdx"),
        makePost("future", "2026-12-01"),
      ),
    ]);
    assert.deepEqual(
      (
        await readPublishedPosts(directory, new Date("2026-11-04T12:00:00Z"))
      ).map((p) => p.slug),
      ["newer", "older"],
    );
    await fs.writeFile(
      path.join(directory, "invalid.mdx"),
      "---\ntitle: Missing fields\n---\nContent",
    );
    await assert.rejects(readPublishedPosts(directory), /frontmatter/);
  } finally {
    if (
      path.dirname(directory) === os.tmpdir() &&
      path.basename(directory).startsWith("mapiko-blog-test-")
    )
      await fs.rm(directory, { recursive: true, force: true });
  }
});
