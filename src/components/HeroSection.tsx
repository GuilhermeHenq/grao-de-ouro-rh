import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Campo de trigo ao pôr do sol" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/95 via-brown-dark/80 to-brown-dark/40" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gold font-semibold tracking-widest uppercase text-sm mb-4"
            >
              Construindo o futuro do agro brasileiro
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6"
            >
              Tradição, inovação e{" "}
              <span className="text-gradient-gold">excelência</span> no agronegócio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-cream/70 text-lg md:text-xl leading-relaxed mb-8"
            >
              O Grupo Grão de Ouro é referência em armazenagem, nutrição animal, insumos e máquinas agrícolas. Junte-se a nós e faça parte dessa história.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              href="#vagas"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-primary font-bold text-base hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Ver vagas disponíveis
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </motion.a>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <img 
                src="https://portal.agrosummit.com.br/images/2024/07/18/liberali-implementa-erp-sap-em-empresas-do-grupo-grao-de-ouro-2jpg.jpeg" 
                alt="Profissional do agronegócio" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
