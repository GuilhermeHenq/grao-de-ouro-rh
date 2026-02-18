import { empresas } from "@/data/vagas";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const JobsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="vagas" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl text-left"> {/* Garantindo texto à esquerda no mobile */}
            <span className="inline-block px-4 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-zinc-200">
              Oportunidades
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Nossas <br /> Empresas
            </h2>
          </div>

          {/* Ajustado: items-start no mobile, md:items-end no desktop */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-zinc-500 text-sm max-w-xs text-left md:text-right">
              Conheça as empresas do grupo e encontre a oportunidade ideal para sua carreira.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-8">
              {empresas.map((empresa, index) => (
                <motion.div
                  key={empresa.id}
                  /* Adicionada a lógica para conferir se é o último card e aplicar mr-8 */
                  className={`flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_31%] min-w-0 ${index === empresas.length - 1 ? "mr-8" : ""
                    }`}
                >
                  <Link
                    to={`/${empresa.slug}`}
                    className="relative block aspect-[3/4] rounded-[2rem] overflow-hidden group shadow-2xl bg-[#281610]"
                  >
                    {/* Background Image */}
                    <img
                      src={empresa.bgImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Central Logo - Ajustada com Sombra */}
                    <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={empresa.image}
                        alt={`Logo ${empresa.nome}`}
                        className="max-w-full max-h-[120px] object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] "
                      />
                    </div>

                    {/* Tags Estilo Imobiliário */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="px-3 py-1 bg-gold text-zinc-950 text-[10px] font-bold uppercase rounded-md shadow-lg">
                        Grupo Grão de Ouro
                      </span>
                      <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-md border border-white/20">
                        Unidade Ativa
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {empresa.nome}
                      </h3>
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        <p className="text-zinc-300 text-sm mb-4 line-clamp-2">
                          {empresa.descricao}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-xs font-medium uppercase tracking-widest mt-2 group-hover:text-gold transition-colors">
                        Explorar unidade <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Botão de Setinha flutuante */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ChevronRight className="w-5 h-5 transform -rotate-45" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Controls Footer */}
          <div className="flex items-center justify-between mt-10 px-2">
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-all"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${selectedIndex === idx ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-200"
                    }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;