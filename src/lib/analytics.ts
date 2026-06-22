/**
 * Lightweight analytics bootstrap.
 *
 * All providers are optional and configured purely through environment
 * variables (Vite `VITE_*`). Nothing is loaded unless an id/key is provided,
 * keeping the landing page fast and privacy-friendly out of the box.
 *
 *   VITE_GA_ID         Google Analytics 4 measurement id (G-XXXXXXX)
 *   VITE_CLARITY_ID    Microsoft Clarity project id
 *   VITE_POSTHOG_KEY   PostHog project API key
 *   VITE_POSTHOG_HOST  PostHog host (defaults to https://app.posthog.com)
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  }
}

let initialised = false;

function injectScript(src: string, async = true) {
  const s = document.createElement("script");
  s.src = src;
  s.async = async;
  document.head.appendChild(s);
  return s;
}

function initGA(id: string) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${id}`);
}

function initClarity(id: string) {
  (function (c: any, l: Document, a: string, r: string) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + id;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script");
}

function initPostHog(key: string, host: string) {
  const cleanHost = host.replace(/\/$/, "");
  injectScript(`${cleanHost}/static/array.js`);
  window.posthog = window.posthog || ({} as Window["posthog"]);
  // Stash config for the snippet to consume once it loads.
  (window as unknown as { __ph_config?: unknown }).__ph_config = {
    api_key: key,
    api_host: cleanHost,
  };
}

export function initAnalytics() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  const ga = import.meta.env.VITE_GA_ID;
  const clarity = import.meta.env.VITE_CLARITY_ID;
  const ph = import.meta.env.VITE_POSTHOG_KEY;
  const phHost = import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

  try {
    if (ga) initGA(ga);
    if (clarity) initClarity(clarity);
    if (ph) initPostHog(ph, phHost);
  } catch {
    /* never let analytics break the page */
  }
}

/** Fire a custom event to whatever analytics providers are configured. */
export function track(event: string, props?: Record<string, unknown>) {
  try {
    window.gtag?.("event", event, props);
    window.clarity?.("event", event);
    window.posthog?.capture(event, props);
  } catch {
    /* noop */
  }
}
