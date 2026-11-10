import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout, PolicyContact } from "@/components/policy-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Loom Digital handles website enquiries and visitor information.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <PolicyLayout
      title="Privacy policy"
      introduction="This notice explains how Loom Digital handles information when you browse this website or contact us."
    >
      <section>
        <h2>Who to contact</h2>
        <p>
          Loom Digital is based in Zimbabwe. For questions about this notice or
          your personal information, email <PolicyContact />.
        </p>
      </section>
      <section>
        <h2>Information you provide</h2>
        <p>
          If you email us, we receive your email address and the information in
          your message. When the website enquiry form is enabled, it asks for
          your name, email address, service of interest and project description.
          Organisation, budget and timeframe are optional.
        </p>
        <p>
          Please share only the information needed to discuss your project.
          Avoid sending passwords, payment details or sensitive personal records
          through the enquiry form.
        </p>
      </section>
      <section>
        <h2>How we use your information</h2>
        <p>
          We use enquiry information to respond to your request, discuss
          requirements, prepare a proposal and manage any resulting business
          relationship. We may also use relevant information to investigate
          misuse, keep the website secure and meet applicable record-keeping
          obligations.
        </p>
        <p>
          The current website does not include advertising trackers, visitor
          analytics or a newsletter sign-up, and enquiry submission does not
          subscribe you to marketing.
        </p>
      </section>
      <section>
        <h2>Website delivery and service providers</h2>
        <p>
          Delivering a website involves technical information such as IP
          addresses, requested pages, browser details and error information.
          Hosting and infrastructure providers may process this information to
          deliver and secure the service.
        </p>
        <p>
          When online enquiry delivery is enabled, messages are sent through
          Resend to our business inbox. The website does not save enquiry
          submissions to its own database. Copies may remain in our mailbox and
          in the email provider’s systems.
        </p>
        <p>
          Service providers may process information in other countries. Their
          own policies describe their processing practices. You can read{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resend’s privacy policy (opens in a new tab)
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Retention and protection</h2>
        <p>
          We keep enquiry correspondence as needed to handle your request and
          any resulting project, and where required for business records or
          legal obligations. Retention in service-provider systems depends on
          their practices. Do not use the website enquiry form as a secure
          document-transfer service.
        </p>
      </section>
      <section>
        <h2>Your requests</h2>
        <p>
          You can contact <PolicyContact /> to ask about information you have
          shared with us, request a correction, or request deletion. We will
          consider your request under applicable requirements and explain if
          information needs to be retained.
        </p>
      </section>
      <section>
        <h2>Cookies and other websites</h2>
        <p>
          Read our <Link href="/cookies">Cookies page</Link> for information
          about browser storage. Links to other websites take you to services
          governed by their own privacy notices.
        </p>
      </section>
      <section>
        <h2>Updates</h2>
        <p>
          We may revise this notice as the website and our services change. The
          date above identifies the latest version.
        </p>
      </section>
    </PolicyLayout>
  );
}
