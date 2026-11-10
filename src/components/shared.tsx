import Link from "next/link";
import { Arrow } from "./icons";
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""}`}
    >
      {children}
      <Arrow diagonal />
    </Link>
  );
}
export function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <h2>
            Have something
            <br />
            in mind?
          </h2>
          <p>Let’s turn the problem into a plan.</p>
        </div>
        <ButtonLink href="/contact">Discuss your project</ButtonLink>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="wordmark">
            Mapiko<span> Inc.</span>
          </Link>
          <p>
            Custom software, websites,
            <br />
            and practical AI solutions.
          </p>
          <div className="footer-links">
            <Link href="/services">Services</Link>
            <Link href="/work">Our work</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mapiko Inc.</span>
          <span>Based in Zimbabwe. Built for connection.</span>
          <nav className="footer-policy-links" aria-label="Legal and privacy">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
export function PageIntro({
  title,
  description,
  children,
}: {
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  );
}
