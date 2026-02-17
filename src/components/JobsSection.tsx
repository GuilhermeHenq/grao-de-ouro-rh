import { empresas } from "@/data/vagas";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

const JobsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="vagas" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2 text-center">Oportunidades</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Nossas Empresas
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Selecione uma empresa do grupo para ver as vagas disponíveis
        </p>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-gold text-primary shadow-lg hover:bg-gold-light transition-all duration-300 flex items-center justify-center"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-gold text-primary shadow-lg hover:bg-gold-light transition-all duration-300 flex items-center justify-center"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {empresas.map((empresa, i) => (
                <motion.div
                  key={empresa.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                >
                  <Link
                    to={`/${empresa.slug}`}
                    className="block bg-card rounded-2xl border gold-border gold-border-hover p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 group h-[380px] flex flex-col"
                  >
                    <div className="w-full h-24 flex items-center justify-center mb-6 overflow-hidden">
                      <img 
                        src={empresa.image} 
                        alt={`Logo ${empresa.nome}`}
                        className="h-full max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                      {empresa.nome}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">
                      {empresa.descricao}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
                      Ver vagas
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
