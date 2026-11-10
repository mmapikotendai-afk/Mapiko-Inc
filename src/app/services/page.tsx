import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
import { PageIntro, CTA } from "@/components/shared";
import { Arrow } from "@/components/icons";
import { EditorialImage } from "@/components/editorial-image";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, custom applications, school systems, AI prototypes and software maintenance from Loom Digital",
};
export default function Services() {
  return (
    <>
      <PageIntro
        title={
          <>
            Built around
            <br />
            <span>your next step.</span>
          </>
        }
        description="A website, a workflow, a new possibility. Start with what you need to make better."
      />
      <div className="container services-detail">
        <EditorialImage
          subject="services-development"
          className="services-image"
        />
        {services.map((s) => (
          <section className="service-detail" id={s.id} key={s.id}>
            <div>
              <h2>{s.title}</h2>
              <p className="service-audience">{s.audience}</p>
            </div>
            <div>
              <p className="large-copy">{s.description}</p>
              <ul className="feature-list">
                {s.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="proof-note">{s.proof}</p>
              <Link className="text-link" href={`/contact?service=${s.id}`}>
                Discuss your project <Arrow diagonal />
              </Link>
            </div>
          </section>
        ))}
        <div className="scope-note">
          <h3>A scope that makes sense.</h3>
          <p>
            Every project starts with a conversation. We agree on requirements,
            cost, schedule and support before the work begins.
          </p>
        </div>
      </div>
      <CTA />
    </>
  );
}
