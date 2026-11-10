import Link from "next/link";
import { services, projects } from "@/lib/content";
import { Arrow } from "@/components/icons";
import { ButtonLink, CTA } from "@/components/shared";
import { EditorialImage } from "@/components/editorial-image";
import { ProjectVisual } from "@/components/project-visual";
export default function Home() {
  return (
    <>
      <section className="home-hero container">
        <h1>
          Software that moves
          <br /> your business <span>forward.</span>
        </h1>
        <div className="hero-lower">
          <div className="hero-copy">
            <p>
              Websites, custom systems, and practical AI solutions built around
              the way you work.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/contact">Discuss your project</ButtonLink>
              <Link className="text-link" href="/work">
                Explore our work <Arrow />
              </Link>
            </div>
            <div className="hero-note">
              <span className="location-dot" />
              Based in Zimbabwe. Working beyond borders.
            </div>
          </div>
          <EditorialImage subject="workspace" className="hero-image" preload />
        </div>
      </section>
      <section className="intro-band">
        <div className="container intro-grid">
          <h2>
            Good software starts
            <br />
            with your everyday.
          </h2>
          <div>
            <p>
              Loom Digital develops websites, custom software, and AI-powered
              applications for businesses and institutions.
            </p>
            <p>
              We turn everyday challenges into practical digital tools—from
              managing school results to improving how organisations work
              online.
            </p>
            <Link href="/about" className="text-link">
              Meet Loom Digital <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <h2>
            What can we
            <br />
            build for you?
          </h2>
          <p>
            From a stronger online presence to a system that simplifies your
            day.
          </p>
        </div>
        <div className="service-list">
          {services.map((s) => (
            <Link className="service-row" href={`/services#${s.id}`} key={s.id}>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <Arrow diagonal />
            </Link>
          ))}
        </div>
      </section>
      <section className="work-section">
        <div className="container">
          <div className="section-heading">
            <h2>Ideas, made tangible.</h2>
            <Link className="text-link" href="/work">
              View all work <Arrow />
            </Link>
          </div>
          <div className="featured-work">
            {[projects[0], projects[2]].map((p) => (
              <Link
                href={`/work#${p.slug}`}
                key={p.slug}
                className="project-tile"
              >
                <ProjectVisual kind={p.visual} name={p.name} />
                <div className="project-tile-heading">
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.category}</p>
                  </div>
                  <Arrow diagonal />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <h2>
            A clear path
            <br />
            from idea to launch.
          </h2>
          <p>
            Thoughtful steps. Open communication. A shared understanding of what
            comes next.
          </p>
        </div>
        <ol className="process-list">
          {[
            [
              "Discover",
              "We listen, ask questions and define the problem worth solving.",
            ],
            [
              "Design",
              "We shape the experience and agree on a practical approach.",
            ],
            [
              "Build",
              "We develop, review and refine the agreed functionality.",
            ],
            [
              "Launch & support",
              "We deploy, hand over and plan the support you need.",
            ],
          ].map(([title, desc], i) => (
            <li key={title}>
              <span className="process-step">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ol>
      </section>
      <CTA />
    </>
  );
}
