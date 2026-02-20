import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if (hash === "#vagas") {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [hash, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <MarqueeSection />
      <NumbersSection />
      <AboutSection />
      
      {/* Seção Alvo do Scroll */}
      <div id="vagas">
        <JobsSection />
      </div>

      <TalentosBancoSection />
      <CulturaSection />
      <DepoimentosSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;