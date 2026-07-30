import {
  Home,
  Sparkles,
  FileText,
  ListChecks,
  RefreshCw,
  Bookmark,
  Search,
  Bell,
  Upload,
} from "lucide-react";
import { cn } from "../lib/utils";

/** A polished, static product-dashboard mockup (not a real screenshot). */
export function HeroVisual() {
  const nav = [
    { icon: Home, label: "Home", active: true },
    { icon: Sparkles, label: "AI Workspace" },
    { icon: FileText, label: "Notes" },
    { icon: ListChecks, label: "Quizzes" },
    { icon: RefreshCw, label: "Revision" },
    { icon: Bookmark, label: "Bookmarks" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-300/20 blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-ink-border bg-white shadow-[0_30px_60px_-30px_rgba(17,12,8,0.35)]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-ink-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-6 w-6 rounded-md" />
            <span className="text-sm font-semibold text-neutral-900">
              Stud<span className="text-gradient-brand">Nexus</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-ink-soft">
            <Search className="h-4 w-4" />
            <Bell className="h-4 w-4" />
            <span className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <nav className="hidden w-36 shrink-0 space-y-1 border-r border-ink-border p-2.5 sm:block">
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.label}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium",
                    n.active ? "bg-brand-50 text-brand-700" : "text-ink-muted"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {n.label}
                </div>
              );
            })}
          </nav>

          {/* Main */}
          <div className="min-w-0 flex-1 p-4">
            <h3 className="text-sm font-bold text-neutral-900">Good morning, Anmol 👋</h3>
            <p className="text-[11px] text-ink-muted">What do you want to learn today?</p>

            {/* Upload */}
            <div className="mt-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-5 text-center">
              <Upload className="mx-auto h-4 w-4 text-brand-500" />
              <p className="mt-1.5 text-[11px] font-medium text-neutral-700">
                Drop your PDF here or click to upload
              </p>
              <p className="text-[10px] text-ink-soft">Supports PDF, PPT, DOCX, TXT</p>
            </div>

            {/* Cards */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-ink-border p-2.5">
                <p className="text-[10px] font-medium text-ink-soft">Continue learning</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="grid h-5 w-5 place-items-center rounded bg-rose-100 text-[8px] font-bold text-rose-500">
                    PDF
                  </span>
                  <span className="truncate text-[11px] font-semibold text-neutral-900">Thermodynamics.pdf</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                </div>
                <button className="mt-2 w-full rounded-md bg-neutral-900 py-1 text-[10px] font-semibold text-white">
                  Continue
                </button>
              </div>

              <div className="rounded-xl border border-ink-border p-2.5">
                <p className="text-[10px] font-medium text-ink-soft">Today's Goal</p>
                <p className="mt-1.5 text-[11px] font-semibold text-neutral-900">Finish Thermodynamics</p>
                <p className="mt-2 text-xl font-bold text-brand-600">82%</p>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                </div>
                <p className="mt-1.5 text-[10px] text-ink-soft">You're doing great!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
