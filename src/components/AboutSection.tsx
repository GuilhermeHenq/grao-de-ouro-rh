import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-cream-dark overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Bloco de Texto - Agora ocupando 5 de 12 colunas para encurtar o width */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="max-w-xl">
              <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">
                Quem somos
              </p>
              <h2 className="text-primary font-display text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Mais de duas décadas transformando o agronegócio
              </h2>
              <div className="space-y-4 mb-10">
                <p className="text-muted-foreground leading-relaxed">
                  O Grupo Grão de Ouro nasceu no coração de Goiás com a missão de oferecer soluções completas para o produtor rural. Ao longo dos anos, expandimos nossa atuação para armazenagem de grãos, nutrição animal, comercialização de insumos agrícolas e produção de sementes certificadas.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Com 7 empresas e mais de 800 colaboradores, somos reconhecidos pela qualidade dos nossos serviços e pelo compromisso com a valorização das pessoas.
                </p>
              </div>
              
              {/* Botão para Vagas */}
              <a 
                href="#vagas" 
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold/90 text-primary font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl shadow-gold/20 group"
              >
                Ver oportunidades disponíveis
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Bloco do Vídeo - Ocupando 7 de 12 colunas para ter mais respiro */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 w-full"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl  ">
              <iframe
                src="https://www.youtube.com/embed/utKscOqkwk4?autoplay=1&mute=1&loop=1&playlist=utKscOqkwk4"
                title="Vídeo institucional"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;