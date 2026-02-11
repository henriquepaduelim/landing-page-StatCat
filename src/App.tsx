import { useEffect } from "react";
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
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    if (sections.length === 0) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => {
        section.classList.add("section-reveal", "is-visible");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    sections.forEach((section) => {
      section.classList.add("section-reveal");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-bg min-h-screen text-text">
      <TrustLine />
      <div className="relative isolate overflow-hidden">
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src="/media/herolanding.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-[#0a0d12]/70"
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
  );
};

export default App;
