import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck } from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { LEGAL_DOCS, type LegalBlock } from "../data/legal";
import { SITE } from "../lib/config";

/** Bold the short "Label:" or "Term —" lead of a bullet, if present. */
function Bullet({ text }: { text: string }) {
  const m = text.match(/^([^:—]{2,28})(:|—)\s*(.*)$/);
  if (!m) return <>{text}</>;
  const [, lead, delim, rest] = m;
  return (
    <>
      <span className="font-semibold text-zinc-100">{lead.trim()}</span>
      {delim === ":" ? ": " : " — "}
      {rest}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if ("p" in block) {
    return <p className="mt-3 text-pretty leading-relaxed text-ink-muted">{block.p}</p>;
  }
  return (
    <ul className="mt-3 space-y-2">
      {block.ul.map((item) => (
        <li key={item} className="flex gap-3 text-ink-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
          <span className="leading-relaxed">
            <Bullet text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage({ slug }: { slug: "privacy" | "terms" }) {
  const doc = LEGAL_DOCS[slug];
  const url = `${SITE.url}/${doc.slug}`;

  return (
    <PageLayout>
      <Helmet>
        <title>{doc.metaTitle}</title>
        <meta name="description" content={doc.metaDescription} />
        <link rel="canonical" href={url} />
      </Helmet>

      <article className="shell max-w-3xl">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-ink-soft" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-zinc-300">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">{doc.title}</span>
        </nav>

        <header>
          <span className="eyebrow">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
            Legal
          </span>
          <h1 className="mt-5 font-display text-balance text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-ink-soft">Last updated: {doc.lastUpdated}</p>
          <p className="mt-5 text-pretty leading-relaxed text-ink-muted">{doc.intro}</p>
        </header>

        <div className="mt-12 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight text-white">{section.heading}</h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="surface mt-12 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Questions or requests?</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Contact us for any privacy, data or account requests.
            </p>
          </div>
          <a href={`mailto:${SITE.email}`} className="btn-ghost shrink-0">
            <Mail className="h-4 w-4 text-brand-400" />
            {SITE.email}
          </a>
        </div>

        {/* Disclaimer */}
        <p className="mb-20 mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-ink-soft">
          {doc.note}
        </p>
      </article>
    </PageLayout>
  );
}
