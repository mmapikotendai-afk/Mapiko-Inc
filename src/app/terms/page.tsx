import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout, PolicyContact } from "@/components/policy-layout";

export const metadata: Metadata = {
  title: "Website Terms",
  description:
    "Terms for using the Loom Digital website and making project enquiries.",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <PolicyLayout
      title="Website terms"
      introduction="These terms explain the intended use of the Loom Digital website. Separate written agreements apply to commissioned services."
    >
      <section>
        <h2>Using this website</h2>
        <p>
          You may browse the website, read our articles and share links to our
          pages. Please use the website lawfully and do not attempt unauthorised
          access, interfere with its operation, distribute malicious software or
          submit spam.
        </p>
      </section>
      <section>
        <h2>Information and examples</h2>
        <p>
          Website content provides general information about our services and
          work. It is not a project specification, a binding quote or a promise
          of a particular outcome. We aim to keep information useful and
          current, but you should confirm details relevant to your project with
          us.
        </p>
        <p>
          Portfolio entries may include development work and demonstrations.
          Prototypes are described as such; illustrative images and interface
          concepts should not be treated as evidence of a completed client
          deployment.
        </p>
      </section>
      <section>
        <h2>Project enquiries and agreements</h2>
        <p>
          Sending an enquiry does not create a service contract or reserve a
          delivery date. Scope, fees, timelines, payment arrangements,
          ownership, support and other project terms must be agreed separately
          in writing.
        </p>
      </section>
      <section>
        <h2>Content and third-party materials</h2>
        <p>
          Website text, designs, code and images may be protected by
          intellectual-property rights. Sharing a link does not transfer those
          rights. For reuse beyond what applicable law or a relevant licence
          permits, contact <PolicyContact />. Third-party materials and linked
          repositories remain subject to their respective terms and licences.
        </p>
      </section>
      <section>
        <h2>Availability and external links</h2>
        <p>
          The website may be updated, interrupted or temporarily unavailable.
          External links are provided for context; we do not control those
          services or their availability. Check their terms before using them.
        </p>
      </section>
      <section>
        <h2>Privacy</h2>
        <p>
          Our <Link href="/privacy">Privacy policy</Link> explains how website
          and enquiry information is handled. Our{" "}
          <Link href="/cookies">Cookies page</Link> describes the current use of
          browser storage.
        </p>
      </section>
      <section>
        <h2>Questions and changes</h2>
        <p>
          For questions about these website terms, email <PolicyContact />. We
          may update these terms as the website changes; the date above
          identifies the latest version. Nothing here is intended to remove
          rights that cannot lawfully be excluded.
        </p>
      </section>
    </PolicyLayout>
  );
}
