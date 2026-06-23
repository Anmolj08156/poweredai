import { Mail, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./ui/Logo";
import { FOOTER_LINKS } from "../data/content";
import { SITE } from "../lib/config";
import { scrollToId } from "../lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  const onLink = (href: string) => {
    if (href.startsWith("#")) scrollToId(href.slice(1));
  };

  return (
    <footer className="relative border-t border-white/[0.06] pt-16">
      <div className="shell">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              The Learning Operating System. One platform to organize, understand, practice and
              master everything you learn.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-brand-400" />
              {SITE.email}
            </a>
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Twitter, label: "Twitter", href: SITE.social.twitter },
                { icon: Linkedin, label: "LinkedIn", href: SITE.social.linkedin },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-ink-muted transition-colors hover:border-white/20 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-white">{col.heading}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => onLink(link.href)}
                        className="text-sm text-ink-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-ink-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Built by DataSmith */}
        <a
          href={SITE.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-sm text-ink-muted transition-colors hover:border-white/20 hover:text-white"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-brand-500 to-indigo-accent text-[11px] font-bold text-white">
            D
          </span>
          A product of <span className="font-semibold text-white">{SITE.company}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-7 sm:flex-row">
          <p className="text-xs text-ink-soft">
            © {year} {SITE.product} by {SITE.company}. All rights reserved. · {SITE.tagline}
          </p>
          <div className="flex items-center gap-5 text-xs text-ink-soft">
            <a href="#" className="transition-colors hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-zinc-300">Terms</a>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
