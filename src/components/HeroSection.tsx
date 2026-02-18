import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion"; 
import { TrendingUp } from "lucide-react";
import bannerImg from "@/assets/bannersite2.png";

const HeroSection = () => {
  // Configuração para o efeito de perspectiva 3D no Hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Mapeia a posição do mouse para graus de rotação (ajuste os valores -15/15 para mais ou menos inclinação)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Variantes originais mantidas
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center pt-24 lg:pt-16 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #f7a824 0%, transparent 70%)' }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #f7a824 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            className="flex flex-col items-start justify-center order-1 lg:order-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="text-[#f7a824] font-bold tracking-widest uppercase text-xs md:text-sm mb-4"
            >
              Cultura de valor
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c3e50] leading-tight mb-6"
            >
              Oportunidades que{" "}
              <span className="text-[#f7a824]">impulsionam</span> sua carreira
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[#2c3e50] text-lg md:text-xl mb-8 max-w-xl opacity-90"
            >
              Faça parte do Grupo Grão de Ouro e cresça em um ambiente que valoriza pessoas, inovação e excelência em cada etapa do agronegócio.
            </motion.p>

            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <a
                href="#vagas"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f7a824] text-black font-bold hover:brightness-110 transition-all shadow-[0_10px_20px_rgba(247,168,36,0.2)] w-full sm:w-auto justify-center"
              >
                Ver vagas disponíveis
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Área da Imagem com Perspectiva */}
          <div className="order-2 lg:order-none w-full flex flex-col items-center">
            <motion.div 
              style={{
                perspective: "1000px", // Define a profundidade 3D
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="relative w-full h-auto mb-12 cursor-pointer"
            >
              <motion.img
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d", // Mantém o efeito nos filhos
                }}
                src={bannerImg}
                className="w-full h-auto max-h-[60vh] object-contain drop-shadow-2xl"
                alt="Banner Grupo Grão de Ouro"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center gap-6 max-w-md"
            >
              <motion.div 
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
                className="flex-shrink-0 w-16 h-16 rounded-full bg-[#fdf2e9] flex items-center justify-center"
              >
                <TrendingUp className="w-8 h-8 text-[#8b4513]" />
              </motion.div>
              <p className="text-[#2c3e50] text-lg font-medium leading-tight">
                Junte-se a nós e descubra como podemos impulsionar seu sucesso!
              </p>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;