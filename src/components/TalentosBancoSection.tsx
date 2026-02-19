import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import Pessoa1 from "@/assets/Pessoa1.png";
import Pessoa2 from "@/assets/Pessoa2.png";
import { Link } from "react-router-dom";

const TalentosBancoSection = () => {
  const containerRef = useRef(null);
  
  // Efeito de Parallax suave ao rolar a página
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-36 bg-white overflow-hidden"
    >
      {/* Background Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-[0.03] z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#5f382c" strokeWidth="0.5" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          
          {/* Imagem Esquerda - Flutuante */}
          <motion.div
            style={{ y: yLeft }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-1 hidden lg:block"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#f7a824]/20 rounded-3xl blur-2xl group-hover:bg-[#f7a824]/30 transition-colors"></div>
              <img
                src={Pessoa1}
                alt="Colaborador Grupo Grão de Ouro"
                className="relative w-full h-auto object-cover rounded-[2.5rem] border-2 border-white shadow-2xl rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Conteúdo Central - Card de Destaque */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 text-center px-6 py-12 lg:py-16 rounded-[3rem] bg-gradient-to-b from-slate-50 to-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(95,56,44,0.1)] relative overflow-hidden"
          >
            {/* Spotlight interno no card */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#f7a824]/10 blur-[80px] rounded-full"></div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="text-[#5f382c] font-bold tracking-[0.2em] uppercase text-xs">Oportunidades Futuras</span>
            </motion.div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#5f382c] mb-8 leading-tight">
              Não encontrou a vaga ideal <br />
              <span className="text-[#f7a824] italic font-serif">neste momento?</span>
            </h2>
            
            <p className="text-slate-600 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Faça parte do nosso banco de talentos! Nós sempre buscamos pessoas que partilham dos nossos valores.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
                to="/candidatar" // Mudança aqui
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#f7a824] text-[#5f382c] font-black text-lg hover:shadow-[0_20px_40px_rgba(247,168,36,0.4)] transition-all duration-300 group"
            >
                Cadastre seu currículo
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            </motion.div>
          </motion.div>

          {/* Imagem Direita - Flutuante */}
          <motion.div
            style={{ y: yRight }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-1 hidden lg:block"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#5f382c]/10 rounded-3xl blur-2xl group-hover:bg-[#5f382c]/20 transition-colors"></div>
              <img
                src={Pessoa2}
                alt="Talento Grupo Grão de Ouro"
                className="relative w-full h-auto object-cover rounded-[2.5rem] border-2 border-white shadow-2xl rotate-[3deg] group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Imagens para Mobile (aparecem abaixo do texto no celular) */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mt-8">
             <img src={Pessoa1} className="rounded-2xl shadow-lg" alt="Pessoa 1" />
             <img src={Pessoa2} className="rounded-2xl shadow-lg" alt="Pessoa 2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentosBancoSection;