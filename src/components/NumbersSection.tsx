import CountUp from "react-countup";
import { useInView, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { DollarSign, BarChart3, MoveUpRight } from "lucide-react";
// 1. Importe os dados do seu arquivo
import { vagas, empresas } from "@/data/vagas"; 

const StatCard = ({ s, inView }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="relative group overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              140px circle at ${mouseX}px ${mouseY}px,
              rgba(247, 168, 36, 0.8),
              transparent 90%
            )
          `,
        }}
      />

      <div className="relative z-10 bg-white/60 backdrop-blur-xl rounded-3xl p-10 border border-[#f7a824]/20 flex flex-col items-start transition-all duration-500 group-hover:border-[#f7a824]/50 group-hover:shadow-2xl group-hover:shadow-[#f7a824]/10">
        <div className="flex gap-2 mb-10">
          {s.icons.map((Icon, idx) => {
            const isActive = Icon === s.activeIcon;
            return (
              <div
                key={idx}
                className={`w-12 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  isActive 
                  ? "bg-[#f7a824]/10 border-[#f7a824]/20 text-[#f7a824]" 
                  : "bg-transparent border-transparent text-zinc-300"
                }`}
              >
                <Icon size={20} />
              </div>
            );
          })}
        </div>

        <div className="font-display text-5xl font-bold text-zinc-900 mb-4 tracking-tighter">
          {inView ? (
            <CountUp start={0} end={s.value} duration={2.5} prefix={s.prefix} separator="." />
          ) : (
            <span>{s.prefix}0</span>
          )}
        </div>
        <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">{s.label}</p>
      </div>
    </div>
  );
};

const NumbersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // 2. Movi o array para dentro do componente para usar as variáveis importadas
  const stats = [
    { 
      activeIcon: DollarSign, 
      icons: [DollarSign, BarChart3, MoveUpRight], 
      value: vagas.length, // Dinâmico
      label: "vagas disponíveis", 
      prefix: "+" 
    },
    { 
      activeIcon: BarChart3, 
      icons: [DollarSign, BarChart3, MoveUpRight], 
      value: 870, 
      label: "colaboradores no grupo", 
      prefix: "+" 
    },
    { 
      activeIcon: MoveUpRight, 
      icons: [DollarSign, BarChart3, MoveUpRight], 
      value: empresas.length, // Dinâmico
      label: "unidades de negócio", 
      prefix: "" 
    },
  ];

  return (
    <section id="numeros" className="py-20 lg:py-28 bg-[#F9FAFB] relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [1100, 1000, 1100], 
            y: [150, 130, 150],
            opacity: [0.4, 0.4, 0.4] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-[200px] h-[400px] bg-[#f7a824]/30 blur-[80px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [-1000, -900, -1000], 
            y: [20, -20, 20],
            opacity: [0.4, 0.4, 0.4] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-[200px] h-[400px] bg-[#f7a824]/60 blur-[80px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="bg-neutral-100 backdrop-blur-md rounded-[40px] p-8 md:p-16 border border-neutral-200 shadow-sm relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#f7a824]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 relative z-10">
            <div>
              <p className="text-[#f7a824] font-bold tracking-widest uppercase text-xs mb-3">A Grão de Ouro Impacta</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-900">
                Sucesso em números
              </h2>
            </div>
            <p className="text-zinc-500 text-sm md:text-right max-w-[280px] leading-relaxed">
              Nossa expertise foi desenvolvida para manter a excelência em cada hectare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {stats.map((s, i) => (
              <StatCard key={i} s={s} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;