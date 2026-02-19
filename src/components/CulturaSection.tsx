import { motion, Variants } from "framer-motion";
import { 
  Target, 
  Compass, 
  ShieldCheck, 
  Heart, 
  Zap, 
  Users2, 
  MoveRight 
} from "lucide-react";

const CulturaSection = () => {
  const pillars = [
    {
      icon: Target,
      title: "Missão",
      description: "Levar soluções ao agronegócio com responsabilidade e excelência através de parcerias sustentáveis com nossos clientes.",
      accent: "from-amber-400 to-orange-600",
    },
    {
      icon: Compass,
      title: "Visão",
      description: "Ser reconhecida como a melhor empresa do agronegócio pela qualidade, eficiência e inovação de seus produtos e serviços, promovendo o desenvolvimento econômico, social e ambiental na região onde atua.",
      accent: "from-blue-400 to-indigo-600",
    },
  ];

  const valores = [
    { 
      icon: ShieldCheck, 
      title: "Integridade", 
      description: "Agir de maneira coerente e transparente com nossos clientes, colaboradores e fornecedores." 
    },
    { 
      icon: Heart, 
      title: "Amor", 
      description: "Agir com dedicação, promovendo o bem incondicionalmente." 
    },
    { 
      icon: Zap, 
      title: "Comprometimento", 
      description: "Ser determinado e responsável nos compromissos e resultados." 
    },
    { 
      icon: Users2, 
      title: "Respeito", 
      description: "Valorizar as pessoas e o meio ambiente para uma convivência saudável." 
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section id="cultura" className="relative py-24 lg:py-32 overflow-hidden bg-[#fafafa]">
      {/* TEXTURA DE FUNDO SUTIL */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
      
      {/* BLOBS DE LUZ DINÂMICOS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px] mix-blend-multiply"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="max-w-4xl mb-20">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-[#2c3e50] leading-tight"
          >
            Nossa cultura é o que <br /> 
            <span className="text-gold italic font-serif">nos move</span>
          </motion.h2>
        </div>

        {/* MISSÃO E VISÃO - LIQUID GLASS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-8 mb-24"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* EFEITO GLASSMORPHISM */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] z-0"></div>
              
              <div className="relative z-10 p-10 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.accent} flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-6 transition-transform duration-500`}>
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-[#2c3e50] mb-5 flex items-center gap-3">
                  {pillar.title}
                  <MoveRight className="w-6 h-6 text-gold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                
                <p className="text-[#2c3e50]/80 text-lg leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SEÇÃO DE VALORES */}
        <div className="relative">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex items-center justify-center gap-4 mb-16"
          >
            <div className="h-[1px] flex-1 bg-slate-200"></div>
            <h3 className="text-xl font-bold text-[#2c3e50] uppercase tracking-[0.4em] px-6">Valores</h3>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valores.map((valor, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative overflow-hidden bg-white/60 backdrop-blur-sm p-8 rounded-[2rem] border border-white/80 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 group"
              >
                {/* Efeito de brilho líquido interno */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/5 rounded-full group-hover:scale-[3] transition-transform duration-700"></div>

                <div className="relative z-10 text-gold mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <valor.icon size={36} strokeWidth={1.5} />
                </div>
                
                <h4 className="relative z-10 font-bold text-xl text-[#2c3e50] mb-3 group-hover:text-gold transition-colors">
                  {valor.title}
                </h4>
                
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                  {valor.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CulturaSection;