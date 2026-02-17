import { empresas } from "@/data/vagas";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";

const JobsSection = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {empresas.map((empresa, i) => (
            <motion.div
              key={empresa.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/${empresa.slug}`}
                className="block bg-card rounded-2xl border gold-border gold-border-hover p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 group h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Building2 className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                  {empresa.nome}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {empresa.descricao}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                  Ver vagas <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
