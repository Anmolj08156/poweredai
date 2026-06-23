import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Logo } from "./ui/Logo";
import { AmbientBackground } from "./ui/AmbientBackground";
import { Footer } from "./Footer";

/** Lightweight chrome for content / SEO sub-pages. */
export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AmbientBackground />

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="shell">
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-ink/70 px-4 py-2.5 shadow-card backdrop-blur-xl sm:px-5">
            <Link to="/" aria-label="StudNexus home">
              <Logo />
            </Link>
            <Link to="/#top" className="btn-primary group py-2.5">
              Join Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-28 sm:pt-32">{children}</main>

      <Footer />
    </>
  );
}
