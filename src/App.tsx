import Header from "./components/Header";
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

const App = () => {
  return (
    <div className="page-bg min-h-screen text-text">
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
