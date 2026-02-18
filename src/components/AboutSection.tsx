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
                Mais de 35 anos reformando o agronegócio
              </h2>
              <div className="space-y-4 mb-10">
                <p className="text-muted-foreground leading-relaxed">
                  O Grupo Grão de Ouro é uma organização consolidada no agronegócio brasileiro, com atuação estratégica em armazenagem de grãos, nutrição animal, produção agrícola, comercialização, insumos e máquinas agrícolas. Construído sobre pilares como ética, confiança e excelência operacional, o grupo desenvolveu, ao longo de sua trajetória, uma estrutura sólida e integrada, voltada a oferecer soluções completas e contribuir diretamente para o crescimento sustentável do setor agropecuário.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mais do que uma empresa, o Grupo Grão de Ouro é formado por pessoas que compartilham o propósito de evoluir, inovar e gerar valor em tudo o que fazem. Com foco no desenvolvimento de talentos e na construção de um ambiente colaborativo, o grupo acredita que o crescimento da organização está diretamente conectado ao crescimento de sua equipe.
                </p>
              </div>
              
              {/* Botão para Vagas */}
              <a 
                href="#vagas" 
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold/90 text-primary font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl shadow-gold/20 group"
              >
                Saiba mais
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