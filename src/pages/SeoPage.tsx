import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { WaitlistForm } from "../components/ui/WaitlistForm";
import { SITE } from "../lib/config";
import { getSeoPage, SEO_PAGES, type SeoPage as SeoPageType } from "../data/seoPages";

const SITE_URL = SITE.url;

export default function SeoPage({ slug }: { slug: string }) {
  const page = getSeoPage(slug);
  if (!page) return <PageLayout><div className="shell py-20 text-center text-ink-muted">Page not found.</div></PageLayout>;

  const url = `${SITE_URL}/${page.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.h1, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords.join(", ")} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="shell">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-ink-soft" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-zinc-300">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">{page.h1}</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <span className="eyebrow">
            <page.icon className="h-3.5 w-3.5 text-brand-400" />
            {page.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-balance text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">{page.intro}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/#top" className="btn-primary group">
              Join Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/what-is-studnexus" className="btn-ghost">
              What is StudNexus?
            </Link>
          </div>
        </header>

        {/* Sections */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="max-w-3xl space-y-12">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-semibold tracking-tight text-white">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 text-pretty leading-relaxed text-ink-muted">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-zinc-200">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Frequently asked questions</h2>
              <dl className="mt-5 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-ink-border bg-ink-card">
                {page.faq.map((f) => (
                  <div key={f.q} className="p-5">
                    <dt className="font-medium text-white">{f.q}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="surface p-6">
              <h2 className="text-base font-semibold text-white">Get early access</h2>
              <p className="mt-1.5 text-sm text-ink-muted">
                Join the waitlist and be among the first on StudNexus.
              </p>
              <div className="mt-4">
                <WaitlistForm source={page.slug} />
              </div>
            </div>

            <div className="surface p-6">
              <h2 className="text-sm font-semibold text-white">Explore more</h2>
              <ul className="mt-3 space-y-2">
                {page.related.map((rel) => {
                  const r = SEO_PAGES.find((p) => p.slug === rel) as SeoPageType | undefined;
                  if (!r) return null;
                  return (
                    <li key={rel}>
                      <Link
                        to={`/${r.slug}`}
                        className="group flex items-center justify-between gap-2 text-sm text-ink-muted transition-colors hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <r.icon className="h-4 w-4 text-brand-400" />
                          {r.h1}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <section className="my-20 border-gradient overflow-hidden rounded-4xl bg-ink-card px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="font-display text-balance text-2xl font-bold tracking-tight text-gradient sm:text-3xl">
            Ready to learn the smarter way?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            StudNexus brings notes, PDFs, quizzes, planning and community into one AI workspace.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <WaitlistForm size="lg" source={`${page.slug}-cta`} />
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
