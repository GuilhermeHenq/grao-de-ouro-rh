import { motion } from "framer-motion";
import { 
  Send, User, Briefcase, GraduationCap, Search, 
  Users, Target, FileText, Heart, ShieldCheck
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const HexagonIcon = ({ icon: Icon, top, left, delay, opacity, size = 24 }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [-15, 15, -15],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut" 
    }}
    className="absolute pointer-events-none z-0 flex items-center justify-center"
    style={{ 
      top, 
      left, 
      opacity,
      filter: "drop-shadow(0 10px 15px rgba(95, 56, 44, 0.1))"
    }}
  >
    {/* Hexágono com efeito Glassmorphism */}
    <div 
      className="relative flex items-center justify-center w-16 h-16 bg-white/40 backdrop-blur-md border border-white/50 shadow-inner"
      style={{
        clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)"
      }}
    >
      <Icon size={size} className="text-[#5f382c]" />
    </div>
  </motion.div>
);

const Candidatar = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Candidatura Registrada!",
      description: "Seus dados foram salvos no nosso banco de talentos com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
      <Header />

      {/* Camada de Hexágonos Flutuantes (Liquid Glass) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Geração de 50 hexágonos distribuídos aleatoriamente */}
        {Array.from({ length: 50 }).map((_, i) => {
          const icons = [Users, Briefcase, Target, GraduationCap, Search, FileText, Heart, ShieldCheck];
          const icon = icons[i % icons.length];
          const randomTop = Math.random() * 100;
          const randomLeft = Math.random() * 100;
          const randomDelay = Math.random() * 5;
          const randomOpacity = 0.3 + Math.random() * 0.6;
          const randomSize = 16 + Math.random() * 24;

          return (
            <HexagonIcon
              key={i}
              icon={icon}
              top={`${randomTop}%`}
              left={`${randomLeft}%`}
              delay={randomDelay}
              opacity={randomOpacity}
              size={randomSize}
            />
          );
        })}
      </div>

      <main className="pt-32 pb-20 container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(95,56,44,0.15)] border border-white/80 overflow-hidden"
        >
          {/* Header do Formulário */}
          <div className="bg-[#5f382c] p-10 md:p-14 text-center text-white relative overflow-hidden">
             {/* Spotlights decorativos */}
             <div className="absolute top-0 right-0 w-40 h-40 bg-[#f7a824] opacity-20 blur-[80px] rounded-full -mr-20 -mt-20"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f7a824] opacity-15 blur-[60px] rounded-full -ml-16 -mb-16"></div>
             
             <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Banco de Talentos</h1>
             <p className="text-slate-300 italic text-lg max-w-md mx-auto leading-relaxed">
               Deixe seus dados e faça parte da colheita de grandes oportunidades.
             </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
            {/* Seção: Dados Pessoais */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#f7a824]/10 rounded-lg">
                    <User size={20} className="text-[#f7a824]" />
                </div>
                <h3 className="text-[#5f382c] font-black uppercase tracking-wider text-sm">Informações de Contato</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome Completo</label>
                  <input required type="text" placeholder="Seu nome completo" className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-[#f7a824] focus:ring-4 focus:ring-[#f7a824]/10 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">E-mail</label>
                  <input required type="email" placeholder="seu@email.com" className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-[#f7a824] focus:ring-4 focus:ring-[#f7a824]/10 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">WhatsApp</label>
                  <input required type="tel" placeholder="(00) 00000-0000" className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-[#f7a824] focus:ring-4 focus:ring-[#f7a824]/10 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">LinkedIn / Portfólio</label>
                  <input required type="url" placeholder="https://link.com" className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-[#f7a824] focus:ring-4 focus:ring-[#f7a824]/10 outline-none transition-all" />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Seção: Profissional */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#f7a824]/10 rounded-lg">
                    <Briefcase size={20} className="text-[#f7a824]" />
                </div>
                <h3 className="text-[#5f382c] font-black uppercase tracking-wider text-sm">Perfil Profissional</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Área de Interesse</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-[#f7a824] outline-none transition-all cursor-pointer appearance-none">
                    <option>Administrativo</option>
                    <option>Operacional / Produção</option>
                    <option>Comercial / Vendas</option>
                    <option>Logística / Transporte</option>
                    <option>Tecnologia / TI</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Pretensão Salarial</label>
                  <input type="text" placeholder="R$ 0.000,00" className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-[#f7a824] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Resumo Profissional</label>
                <textarea 
                  rows={4} 
                  placeholder="Conte-nos seus diferenciais..."
                  className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-[#f7a824] outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-6 rounded-[1.5rem] bg-[#f7a824] text-[#5f382c] font-black text-xl hover:shadow-[0_20px_40px_rgba(247,168,36,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] group"
            >
              Enviar minha candidatura
              <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Candidatar;