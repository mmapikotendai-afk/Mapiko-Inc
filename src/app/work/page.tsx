import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { PageIntro, CTA } from "@/components/shared";
import { ProjectVisual } from "@/components/project-visual";
import { Arrow } from "@/components/icons";
export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore Loom Digital’s school websites, education software, fashion website work and applied AI demonstrations.",
};
export default function Work() {
  return (
    <>
      <PageIntro
        title={
          <>
            Practical ideas.
            <br />
            <span>Working possibilities.</span>
          </>
        }
        description="A selection of website development, custom software and AI demonstrations. Each starts with a specific problem."
      />
      <div className="container portfolio">
        {projects.map((p) => (
          <article id={p.slug} className="portfolio-project" key={p.slug}>
            <ProjectVisual kind={p.visual} name={p.name} />
            <div className="portfolio-copy">
              <span className="project-category">{p.category}</span>
              <h2>{p.name}</h2>
              <p className="project-summary">{p.summary}</p>
              <p>{p.description}</p>
              <ul className="feature-list">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <ul className="stack-list" aria-label="Project technologies">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="project-status">{p.status}</p>
              {p.repo && (
                <a
                  className="text-link"
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View repository <Arrow diagonal />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <CTA />
    </>
  );
}
