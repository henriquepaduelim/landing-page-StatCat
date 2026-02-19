import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import TrustLine from "./components/TrustLine";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WebsiteService from "./components/WebsiteService";

const App = () => {
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrainedNetwork =
      connection?.saveData === true || /(^|-)2g|3g/.test(connection?.effectiveType ?? "");

    if (mediaQuery.matches || constrainedNetwork) {
      return;
    }

    const scheduleLoad = () => setShouldLoadHeroVideo(true);
    const idle = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof idle.requestIdleCallback === "function") {
      const id = idle.requestIdleCallback(() => scheduleLoad(), { timeout: 2200 });
      return () => {
        if (typeof idle.cancelIdleCallback === "function") {
          idle.cancelIdleCallback(id);
        }
      };
    }

    const timeoutId = window.setTimeout(scheduleLoad, 900);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-bg min-h-screen text-text">
        <TrustLine />
        <div className="relative isolate overflow-hidden">
          {shouldLoadHeroVideo ? (
            <video
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              poster="/media/profile.photo-1400.webp"
            >
              <source src="/media/herolanding.mp4" type="video/mp4" />
            </video>
          ) : (
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: "url('/media/profile.photo-1400.webp')" }}
              aria-hidden="true"
            />
          )}
          <div
            className="absolute inset-0 -z-10 bg-gradient-dark-overlay"
            aria-hidden="true"
          />
          <div
            className="absolute -left-20 top-8 -z-10 h-72 w-72 rounded-full bg-brand-primary/30 blur-[120px]"
            aria-hidden="true"
          />
          <Header />
          <Hero />
        </div>
        <main>
          <SocialProof />
          <Features />
          <HowItWorks />
          <UseCases />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CTA />
          <WebsiteService />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </MotionConfig>
  );
};

export default App;
