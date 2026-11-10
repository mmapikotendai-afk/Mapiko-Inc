import type { Metadata } from "next";
import { PageIntro, CTA, ButtonLink } from "@/components/shared";
import { EditorialImage } from "@/components/editorial-image";
export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Tendai Mapiko and the practical, founder-led approach behind Loom Digital, based in Zimbabwe.",
};
export default function About() {
  return (
    <>
      <PageIntro
        title={
          <>
            Technology with
            <br />
            <span>a practical purpose.</span>
          </>
        }
        description="Loom Digital is a founder-led software development company based in Zimbabwe, serving local and international clients."
      />
      <section className="founder-section">
        <div className="container founder-grid">
          <div className="founder-name">
            <h2>
              Tendai
              <br />
              Mapiko.
            </h2>
            <span>Founder, Loom Digital</span>
            <EditorialImage subject="workspace" className="about-image" />
            <div className="founder-line" />
            <p>
              Understanding the problem.
              <br />
              Building something useful.
            </p>
          </div>
          <div className="founder-story">
            <h2>A builder’s perspective.</h2>
            <p>
              My work starts with a simple question: what would make this easier
              for the people using it?
            </p>
            <p>
              That question has shaped projects from school results workflows
              and organisation websites to Python APIs and machine learning
              demonstrations.
            </p>
            <p>
              I’m studying toward a BSc Honours in Artificial Intelligence and
              Machine Learning at the University of Zimbabwe, alongside hands-on
              work in full-stack development, databases and applied AI.
            </p>
            <p>
              Loom Digital brings that practical approach to businesses and
              institutions: understand the need, communicate clearly and build a
              solution with a purpose.
            </p>
            <ButtonLink href="/work" secondary>
              Explore the work
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <h2>
            How we approach
            <br />
            the work.
          </h2>
          <p>A good partnership matters as much as good code.</p>
        </div>
        <dl className="values-list">
          {[
            [
              "Practical problem-solving",
              "Start with the need. Choose technology that serves it.",
            ],
            [
              "Clear communication",
              "Make scope, decisions and progress understandable.",
            ],
            [
              "Careful implementation",
              "Pay attention to the details people rely on.",
            ],
            [
              "Continuous learning",
              "Keep improving through hands-on work and study.",
            ],
            [
              "Long-term maintainability",
              "Build with the next update and handover in mind.",
            ],
          ].map(([title, desc]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{desc}</dd>
            </div>
          ))}
        </dl>
      </section>
      <CTA />
    </>
  );
}
