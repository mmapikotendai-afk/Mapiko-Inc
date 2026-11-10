import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
const publicSite = process.env.SITE_PUBLIC === "true" && !!process.env.SITE_URL;
export const metadata: Metadata = {
  title: {
    default: "Mapiko Inc. — Software that moves your business forward",
    template: "%s | Mapiko Inc.",
  },
  description:
    "Custom software, websites, school systems and practical AI solutions. A founder-led development company based in Zimbabwe.",
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  robots: { index: publicSite, follow: publicSite },
  openGraph: {
    title: "Mapiko Inc.",
    description: "Custom software, websites, and practical AI solutions.",
    type: "website",
    locale: "en_ZW",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
