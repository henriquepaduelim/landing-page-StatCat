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
  return (
    <MotionConfig reducedMotion="user">
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
