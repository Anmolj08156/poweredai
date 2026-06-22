import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AmbientBackground } from "../components/ui/AmbientBackground";
import { Logo } from "../components/ui/Logo";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found — StudNexus</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <AmbientBackground />
      <main className="grid min-h-screen place-items-center px-6">
        <div className="text-center">
          <Logo className="mx-auto" />
          <p className="mt-10 text-7xl font-semibold text-gradient-brand">404</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">This page wandered off.</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </p>
          <Link to="/" className="btn-primary mx-auto mt-8 w-fit">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
