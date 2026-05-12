import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";

const AboutSection = () => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // Carrega a API do YouTube IFrame
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      if (containerRef.current && !playerRef.current) {
        playerRef.current = new (window as any).YT.Player(containerRef.current, {
          videoId: "KVGy8T9eBvw", // https://youtu.be/KVGy8T9eBvw
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: "KVGy8T9eBvw",
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              event.target.setPlaybackQuality("hd1080");
              setPlayerReady(true);
            },
          },
        });
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const handleUnmute = useCallback(() => {
    if (playerRef.current && playerReady) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  }, [isMuted, playerReady]);

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-cream-dark overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Bloco de Texto */}
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
                Nossa história
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

          {/* Bloco do Vídeo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 w-full"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <div ref={containerRef} className="absolute inset-0 w-full h-full" />

              {/* Overlay de Unmute */}
              <AnimatePresence>
                {isMuted && playerReady && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    onClick={handleUnmute}
                    className="absolute inset-0 z-20 flex items-end justify-center pb-8 cursor-pointer"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }}
                  >
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full shadow-xl"
                    >
                      <VolumeX className="w-5 h-5" />
                      <span className="text-sm font-bold tracking-wide">
                        O vídeo já começou, clique e desmute
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botão de mute/unmute flutuante (após desmutar) */}
              <AnimatePresence>
                {!isMuted && playerReady && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleUnmute}
                    className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;