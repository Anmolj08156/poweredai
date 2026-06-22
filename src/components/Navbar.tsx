import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./ui/Logo";
import { NAV_LINKS } from "../data/content";
import { openDemoModal } from "./DemoModal";
import { cn, scrollToId } from "../lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleAnchor = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) scrollToId(href.slice(1));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled
              ? "border border-white/[0.07] bg-ink/70 shadow-card backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          )}
        >
          <a href="#top" onClick={() => handleAnchor("#top")} aria-label="StudNexus home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleAnchor(link.href)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button onClick={openDemoModal} className="btn-ghost py-2.5">
              Book Demo
            </button>
            <button
              onClick={() => handleAnchor("#top")}
              className="btn-primary group py-2.5"
            >
              Join Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
              className="relative mx-5 mt-20 flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-ink-card/90 p-4 shadow-card"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleAnchor(link.href)}
                  className="rounded-xl px-4 py-3 text-left text-base font-medium text-zinc-200 hover:bg-white/[0.04]"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 grid gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    openDemoModal();
                  }}
                  className="btn-ghost w-full"
                >
                  Book Demo
                </button>
                <button onClick={() => handleAnchor("#top")} className="btn-primary w-full">
                  Join Early Access
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
