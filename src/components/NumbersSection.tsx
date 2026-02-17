import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, TrendingUp, Award } from "lucide-react";

const stats = [
  { icon: Award, value: 96, suffix: "%", label: "de aprovação entre colaboradores", prefix: "+" },
  { icon: Users, value: 800, suffix: "", label: "colaboradores", prefix: "+" },
  { icon: TrendingUp, value: 2, suffix: "bi", label: "faturados em 2025", prefix: "+R$" },
];

const NumbersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="numeros" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2 text-center">Nosso impacto</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
          Sucesso em números
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 text-center border gold-border gold-border-hover transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <s.icon className="w-7 h-7 text-gold" />
              </div>
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {inView ? (
                  <CountUp start={0} end={s.value} duration={2.5} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  <span>{s.prefix}0{s.suffix}</span>
                )}
              </div>
              <p className="text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
