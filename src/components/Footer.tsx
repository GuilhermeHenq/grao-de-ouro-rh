import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/grupograodeouro/",
      label: "Instagram" 
    },
    { 
      icon: Youtube, 
      href: "https://www.youtube.com/@grupograodeouro5221",  
      label: "Youtube" 
    },
    { 
      icon: Linkedin, 
      href: "https://br.linkedin.com/company/gr-o-de-ouro",
      label: "Linkedin" 
    },
  ];

  return (
    <footer className="relative bg-[#5f382c] py-12 overflow-hidden text-white">
      {/* TEXTURA E GRADIENTE */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* COLUNA 1: LOGO */}
          <div className="space-y-4">
            <img 
              src={logo} 
              alt="Grupo Grão de Ouro" 
              className="h-20 w-auto brightness-0 invert" // Adicionado para garantir que a logo fique branca no fundo marrom
            />
            <p className="text-white/60 text-xs leading-relaxed max-w-[200px]">
              Tradição e inovação no agronegócio brasileiro há mais de duas décadas.
            </p>
          </div>

          {/* COLUNA 2: ENDEREÇO */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-tight text-[#f7a824] uppercase mt-6">Localização</h4>
            <div className="flex items-start gap-2 text-white/80 text-xs">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#f7a824]" />
              <p>
                Av. Alberto Vieira Romão, 2739<br />
                Distrito Industrial - Alfenas/MG<br />
                CEP: 37135-516
              </p>
            </div>
          </div>

          {/* COLUNA 3: CONTATO */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-tight text-[#f7a824] uppercase mt-6">Fale Conosco</h4>
            <div className="space-y-2 text-white/80 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#f7a824]" />
                <a href="mailto:sac@gouro.com.br" className="hover:text-white transition-colors">sac@gouro.com.br</a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#f7a824]" />
                <div className="flex flex-col">
                  <a href="tel:3536981200" className="hover:text-white transition-colors">(35) 3698-1200</a>
                  <a href="https://wa.me/5535999657668" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(35) 99965-7668</a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA 4: REDES E VOLTAR AO TOPO */}
          <div className="flex flex-col items-start md:items-end justify-between gap-4">
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"           // Abre em nova aba
                  rel="noopener noreferrer" // Segurança adicional
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#f7a824]"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-[#f7a824] transition-colors"
            >
              Voltar ao início
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#f7a824]/50 transition-colors">
                <ChevronUp size={16} />
              </div>
            </button>
          </div>
        </div>

        {/* RODAPÉ FINAL */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[9px] uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Grupo Grão de Ouro. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
             <a href="#" className="hover:text-white/60 transition-colors">Política de Privacidade</a>
             <span className="w-1 h-1 rounded-full bg-[#f7a824]"></span>
             <p>Excelência no Campo</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;