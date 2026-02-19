import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import NumbersSection from "@/components/NumbersSection";
import AboutSection from "@/components/AboutSection";
import JobsSection from "@/components/JobsSection";
import TalentosBancoSection from "@/components/TalentosBancoSection";
import CulturaSection from "@/components/CulturaSection";
import DepoimentosSection from "@/components/DepoimentosSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <MarqueeSection />
      <NumbersSection />
      <AboutSection />
      <JobsSection />
      <TalentosBancoSection />
      <CulturaSection />
      <DepoimentosSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
