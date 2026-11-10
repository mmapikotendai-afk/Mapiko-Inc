import type { Metadata } from "next";
import { PageIntro } from "@/components/shared";
import { ContactForm } from "@/components/contact-form";
import { isContactConfigured, serviceIds } from "@/lib/contact";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Mapiko Inc. about your website, custom software or AI project.",
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initial = serviceIds.find((s) => s === service) || "";
  return (
    <>
      <PageIntro
        title={
          <>
            Tell us about
            <br />
            <span>your project.</span>
          </>
        }
        description="You don’t need a finished specification. Start with the problem you want to solve."
      />
      <section className="container contact-layout">
        <aside className="contact-aside">
          <h2>
            Let’s find
            <br />a way forward.
          </h2>
          <p>
            Tell us what you have in mind, what matters to your organisation,
            and where you need help.
          </p>
          <h3>What happens next?</h3>
          <ol>
            <li>We review your enquiry.</li>
            <li>We discuss your needs and questions.</li>
            <li>We agree on scope, cost and next steps.</li>
          </ol>
          <div className="contact-location">
            Based in Zimbabwe
            <br />
            <span>Local and international projects</span>
          </div>
        </aside>
        <ContactForm
          configured={isContactConfigured()}
          initialService={initial}
        />
      </section>
    </>
  );
}
