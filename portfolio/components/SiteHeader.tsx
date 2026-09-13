"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "@/lib/data";

const SECTIONS = ["work", "experience", "about"];

export default function SiteHeader() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const navLink = (href: string, id: string, label: string) => (
    <Link
      href={href}
      data-cursor="link"
      className={`relative transition-colors hover:text-ink ${
        active === id ? "text-ink" : ""
      }`}
    >
      {label}
      {active === id && (
        <span className="absolute -bottom-1.5 left-0 h-px w-full bg-signal" aria-hidden="true" />
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          data-cursor="link"
          className="font-display text-[15px] font-medium tracking-tight text-ink"
        >
          Sisay Tadewos
        </Link>

        <nav className="hidden items-center gap-8 text-[14px] text-muted md:flex">
          {navLink("/#work", "work", "Work")}
          {navLink("/#experience", "experience", "Experience")}
          <Link
            href="/blog"
            data-cursor="link"
            className={`transition-colors hover:text-ink ${
              pathname === "/blog" ? "text-ink" : ""
            }`}
          >
            Blog
          </Link>
          {navLink("/#about", "about", "About")}
        </nav>

        <a
          href={`mailto:${contact.email}`}
          data-cursor="link"
          className="rounded-full border border-line px-4 py-1.5 text-[13px] text-ink transition-colors hover:border-signal hover:text-signal"
        >
          Let&rsquo;s talk
        </a>
      </div>
    </header>
  );
}
