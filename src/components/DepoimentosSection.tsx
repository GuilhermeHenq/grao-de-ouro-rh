import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const depoimentos = [
  {
    id: 1,
    nome: "João Silva",
    cargo: "Analista Administrativo",
    videoId: "7YaIDXjwefc",
    descricao: "Excelente ambiente de trabalho e muitas oportunidades de crescimento profissional.",
  },
  {
    id: 2,
    nome: "Maria Santos",
    cargo: "Técnica em Nutrição Animal",
    videoId: "7YaIDXjwefc",
    descricao: "A equipe é muito acolhedora e valoriza o desenvolvimento de cada pessoa.",
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    cargo: "Operador de Máquinas",
    videoId: "7YaIDXjwefc",
    descricao: "Trabalhar com máquinas modernas e uma equipe que se preocupa com segurança é fantástico.",
  },
  {
    id: 4,
    nome: "Ana Costa",
    cargo: "Gerente Comercial",
    videoId: "7YaIDXjwefc",
    descricao: "Oportunidade de estar em um grupo em crescimento, com muitas possibilidades futuras.",
  },
];

// Componente Interno para gerenciar o estado do vídeo individualmente
const VideoCard = ({ depoimento }: { depoimento: typeof depoimentos[0] }) => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden h-full flex flex-col group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(95,56,44,0.1)]"
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${depoimento.videoId}?autoplay=${hasStarted ? 1 : 0}&rel=0&modestbranding=1`}
          title={depoimento.nome}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />

        {/* Overlay do Botão de Play - Só aparece se o vídeo não começou */}
        {!hasStarted && (
          <div 
            onClick={() => setHasStarted(true)}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors cursor-pointer"
          >
             {/* Thumbnail de fundo para evitar o player vazio antes do click */}
             <img 
              src={`https://img.youtube.com/vi/${depoimento.videoId}/mqdefault.jpg`} 
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
              alt="" 
            />
            <div className="relative w-16 h-16 rounded-full bg-[#f7a824] flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <Play fill="currentColor" size={28} className="ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex-1">
          <Quote className="text-[#f7a824]/20 mb-4" size={40} />
          <p className="text-[#5f382c]/80 italic text-sm md:text-base leading-relaxed mb-6">
            "{depoimento.descricao}"
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#5f382c]">{depoimento.nome}</h3>
            <p className="text-[#f7a824] text-xs font-bold uppercase tracking-wider">
              {depoimento.cargo}
            </p>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#f7a824" className="text-[#f7a824]" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DepoimentosSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Spotlights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[60%] bg-[#f7a824]/5 blur-[120px] rotate-45" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[60%] bg-[#5f382c]/5 blur-[120px] -rotate-45" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-[#f7a824]" />
            <span className="text-[#f7a824] font-bold tracking-[0.3em] uppercase text-xs">
              Histórias reais
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#5f382c] mb-6"
          >
            Vozes de quem cultiva o nosso sucesso
          </motion.h2>
          
          <p className="text-slate-600 text-lg leading-relaxed">
            Conheça as trajetórias de quem escolheu crescer junto com o Grupo Grão de Ouro.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {depoimentos.map((depoimento) => (
                <div
                  key={depoimento.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6"
                >
                  <VideoCard depoimento={depoimento} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden lg:block">
            <button
              onClick={scrollPrev}
              className="absolute -left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-slate-100 text-[#5f382c] shadow-xl hover:bg-[#5f382c] hover:text-white transition-all z-20 flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-slate-100 text-[#5f382c] shadow-xl hover:bg-[#5f382c] hover:text-white transition-all z-20 flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`group relative h-1 transition-all duration-500 rounded-full ${
                selectedIndex === idx ? "w-12 bg-[#f7a824]" : "w-4 bg-slate-200 hover:bg-[#5f382c]/30"
              }`}
            >
              <span className="absolute -top-4 left-0 w-full text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity text-[#5f382c]">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepoimentosSection;