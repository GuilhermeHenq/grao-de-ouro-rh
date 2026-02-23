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
          <div className="max-w-2xl text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-zinc-200">
              Oportunidades
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Nossas <br /> Empresas
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-zinc-500 text-sm max-w-xs text-left md:text-right">
              Selecione uma empresa do grupo para ver as vagas disponíveis
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
                  className={`flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_31%] min-w-0 ${
                    index === empresas.length - 1 ? "mr-8" : ""
                  }`}
                >
                  <Link
                    to={`/${empresa.slug}`}
                    className="relative aspect-[3/4.5] rounded-[2rem] overflow-hidden group border border-zinc-200 bg-white flex flex-col"
                  >
                    {/* Container da Imagem (Parte Superior) */}  
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={empresa.bgImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay para destaque das tags superiores */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                      {/* Tags Superiores */}
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="px-3 py-1 bg-gold text-zinc-950 text-[10px] font-bold uppercase rounded-md">
                          Grupo Grão de Ouro
                        </span>
                      </div>

                      {/* Botão de Setinha flutuante */}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ChevronRight className="w-5 h-5 transform -rotate-45" />
                      </div>
                    </div>

                    {/* Barra Branca Inferior (Logo + Infos) */}
                    <div className="bg-white p-6 flex flex-col items-center text-center gap-3">
                      {/* Logo sem shadow para não vazar no fundo */}
                      <div className="h-16 w-full flex items-center justify-center">
                        <img
                          src={empresa.image}
                          alt={`Logo ${empresa.nome}`}
                          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Nome da Empresa e Link */}
                      <div className="flex flex-col items-center">
                        <h3 className="text-xl font-bold text-zinc-900 leading-tight">
                          {empresa.nome}
                        </h3>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest group-hover:text-gold transition-colors">
                          Ver Vagas <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
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
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    selectedIndex === idx ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-200"
                  }`}
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