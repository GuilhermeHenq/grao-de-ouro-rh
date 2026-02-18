import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const carouselImages = [
  "https://portal.agrosummit.com.br/images/2024/07/18/liberali-implementa-erp-sap-em-empresas-do-grupo-grao-de-ouro-2jpg.jpeg",
  "https://static.wixstatic.com/media/1317fe_5efc6f0a20a545dc82909fd54ff74c24~mv2.jpg/v1/fill/w_1000,h_912,al_c,q_85,usm_0.66_1.00_0.01/1317fe_5efc6f0a20a545dc82909fd54ff74c24~mv2.jpg", 
  "https://www.aciaalfenas.com.br/images/upload/images/WhatsApp_Image_2021-02-11_at_16.31.37.jpeg"
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 lg:pt-16 overflow-hidden bg-[#050505]">
      {/* SPOTLIGHTS DE LUZ DOURADA (#f7a824) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Luz superior esquerda */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #f7a824 0%, transparent 70%)' }}
        />
        {/* Luz central suave */}
        <div 
          className="absolute top-[20%] left-[40%] w-[60%] h-[60%] rounded-full opacity-10 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #f7a824 0%, transparent 70%)' }}
        />
        {/* Luz inferior direita */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-[0.15] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #f7a824 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* COLUNA DA ESQUERDA: TEXTO + BOTÃO AGRUPADOS */}
          <div className="flex flex-col items-start justify-center order-1 lg:order-none">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#f7a824] font-bold tracking-widest uppercase text-xs md:text-sm mb-4"
            >
              Construindo o futuro do agro brasileiro
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Tradição, inovação e{" "}
              <span className="text-[#f7a824]">excelência</span> no agronegócio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg md:text-xl mb-8 max-w-xl opacity-80"
            >
              O Grupo Grão de Ouro é referência em armazenagem, nutrição animal, insumos e máquinas agrícolas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full sm:w-auto"
            >
              <a
                href="#vagas"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f7a824] text-black font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(247,168,36,0.3)] w-full sm:w-auto justify-center"
              >
                Ver vagas disponíveis
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* COLUNA DA DIREITA: CARROSSEL */}
          <div className="order-2 lg:order-none w-full relative">
            {/* Brilho atrás do carrossel */}
            <div className="absolute inset-0 bg-[#f7a824]/5 blur-[60px] rounded-full translate-x-4" />
            
            <div className="absolute -inset-2 lg:-inset-4 border border-[#f7a824]/30 rounded-2xl translate-x-2 lg:translate-x-4 translate-y-2 lg:translate-y-4 -z-10" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-[16/10] lg:aspect-[4/3] bg-zinc-900">
              <AnimatePresence initial={false}>
                <motion.img
                  key={index}
                  src={carouselImages[index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Destaques Grupo Grão de Ouro"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-6 flex gap-2 z-20">
                {carouselImages.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 transition-all duration-300 rounded-full ${index === i ? "w-6 bg-[#f7a824]" : "w-2 bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;