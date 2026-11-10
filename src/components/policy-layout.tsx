import Link from "next/link";
import { company } from "@/lib/company";

export function PolicyContact() {
  return <a href={`mailto:${company.policyEmail}`}>{company.policyEmail}</a>;
}

export function PolicyLayout({
  title,
  introduction,
  children,
}: {
  title: string;
  introduction: string;
  children: React.ReactNode;
}) {
  return (
    <section className="policy-page container">
      <header>
        <h1>{title}</h1>
        <p className="policy-introduction">{introduction}</p>
        <p className="policy-date">
          Last updated:{" "}
          <time dateTime="2026-11-04">{company.policyUpdated}</time>
        </p>
      </header>
      <nav aria-label="Website policies" className="policy-navigation">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/cookies">Cookies</Link>
      </nav>
      <div className="policy-content">{children}</div>
    </section>
  );
}
