import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout, PolicyContact } from "@/components/policy-layout";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "How the Mapiko Inc. website currently uses cookies and browser storage.",
  alternates: { canonical: "/cookies" },
};
export default function Cookies() {
  return (
    <PolicyLayout
      title="Cookies"
      introduction="This page describes cookies and similar browser storage used by the current Mapiko Inc. website."
    >
      <section>
        <h2>What cookies do</h2>
        <p>
          Cookies are small pieces of information a website can store in your
          browser. Similar technologies include local storage and session
          storage. They can support features such as sign-in, preferences or
          analytics.
        </p>
      </section>
      <section>
        <h2>Our current website</h2>
        <p>
          The current website does not set application cookies or use local
          storage or session storage to track visitors. It does not include
          advertising trackers, visitor analytics, accounts or embedded
          third-party media.
        </p>
        <p>
          The enquiry form holds entries in the current page while you complete
          or retry it; those entries are not saved to persistent browser storage
          by the website. Refreshing or closing the page may clear them.
        </p>
      </section>
      <section>
        <h2>Infrastructure and external services</h2>
        <p>
          A browser may cache website files to load them more efficiently.
          Browser caching is different from advertising or analytics cookies.
        </p>
        <p>
          Cookies set by the application or browser you use to open this
          website, and cookies used by external websites you choose to visit,
          are governed by those services. Hosting or security features may also
          introduce storage as the deployment changes. This page will need
          updating if we enable features that change the website’s cookie use.
        </p>
      </section>
      <section>
        <h2>Your browser controls</h2>
        <p>
          You can review, block or remove cookies and site storage through your
          browser’s privacy settings. The current website does not require an
          advertising or analytics cookie choice because those features are not
          enabled.
        </p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>
          Email <PolicyContact /> with questions about this page, or read our{" "}
          <Link href="/privacy">Privacy policy</Link> for information about
          enquiries and service providers.
        </p>
      </section>
    </PolicyLayout>
  );
}
