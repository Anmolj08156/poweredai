import { Helmet } from "react-helmet-async";
import { AmbientBackground } from "./components/ui/AmbientBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LogoMarquee } from "./components/LogoMarquee";
import { Problem } from "./components/Problem";
import { Solution } from "./components/Solution";
import { Features } from "./components/Features";
import { Categories } from "./components/Categories";
import { HowItWorks } from "./components/HowItWorks";
import { SocialProof } from "./components/SocialProof";
import { EarlyAccessCTA } from "./components/EarlyAccessCTA";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/ui/BackToTop";
import { DemoModal } from "./components/DemoModal";

export default function App() {
  return (
    <>
      <Helmet>
        <title>StudNexus - AI Powered Learning Operating System for Students</title>
        <meta
          name="description"
          content="StudNexus is an AI-powered Learning Operating System that helps students organize notes, generate quizzes, chat with PDFs, and accelerate learning."
        />
        <link rel="canonical" href="https://studnexus.com/" />
      </Helmet>

      <AmbientBackground />
      <Navbar />

      <main>
        <Hero />
        <LogoMarquee />
        <Problem />
        <Solution />
        <Features />
        <Categories />
        <HowItWorks />
        <SocialProof />
        <EarlyAccessCTA />
        <FAQ />
      </main>

      <Footer />
      <BackToTop />
      <DemoModal />
    </>
  );
}
