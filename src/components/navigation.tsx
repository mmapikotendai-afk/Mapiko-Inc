"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";
import { BrandLogo } from "./brand-logo";
const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Our work", "/work"],
  ["About", "/about"],
  ["Blog", "/blog"],
] as const;
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="wordmark" aria-label="Loom Digital home">
          <BrandLogo />
        </Link>
        <button
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          {links.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (
                  href === "/"
                    ? path === href
                    : path === href || path.startsWith(`${href}/`)
                )
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="nav-contact"
            aria-current={path === "/contact" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Discuss your project <Arrow diagonal />
          </Link>
        </nav>
      </div>
    </header>
  );
}
