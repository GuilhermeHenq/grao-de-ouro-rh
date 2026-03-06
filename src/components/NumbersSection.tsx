import CountUp from "react-countup";
import { useInView, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { Users, BarChart3, MoveUpRight } from "lucide-react";
import { empresas } from "@/data/vagas";

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
      className="relative group overflow-hidden rounded-[2.5rem] p-[2px] flex flex-col"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
          style={{
            background: "conic-gradient(from 0deg, transparent 65%, #f7a824 80%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${mouseX}px ${mouseY}px,
              rgba(247, 168, 36, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 bg-white w-full h-full rounded-[2.4rem] p-10 flex flex-col items-start transition-all duration-500 shadow-sm group-hover:shadow-xl">
        <div className="flex gap-2 mb-10">
          {s.icons.map((Icon, idx) => {
            const isActive = Icon === s.activeIcon;
            return (
              <div
                key={idx}
                className={`w-12 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${isActive
                    ? "bg-[#f7a824]/10 border-[#f7a824]/40 text-[#f7a824]"
                    : "bg-transparent border-transparent text-zinc-200"
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

  const stats = [
    {
      activeIcon: Users,
      icons: [Users, BarChart3, MoveUpRight],
      value: 35,
      label: "anos de história",
      prefix: "+"
    },
    {
      activeIcon: BarChart3,
      icons: [Users, BarChart3, MoveUpRight],
      value: 870,
      label: "colaboradores no grupo",
      prefix: "+"
    },
    {
      activeIcon: MoveUpRight,
      icons: [Users, BarChart3, MoveUpRight],
      value: empresas.length,
      label: "unidades de negócio",
      prefix: ""
    },
  ];

  return (
    <section id="numeros" className="py-20 lg:py-28 bg-[#F9FAFB] relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <div className="bg-white rounded-[40px] p-8 md:p-16 border border-neutral-100 shadow-sm relative overflow-hidden">

          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 relative z-10">
            <div>
              <p className="text-[#f7a824] font-bold tracking-widest uppercase text-xs mb-3">Nosso Impacto</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-900">
                Conheça nossos resultados:
              </h2>
            </div>
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