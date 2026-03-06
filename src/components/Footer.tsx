import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import logo from "@/assets/logo.png";

interface FooterProps {
  brandColor?: string;
  showLogo?: boolean;
}

const Footer = ({ brandColor, showLogo = true }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const isDark = useMemo(() => {
    if (!brandColor) return true; // O marrom padrão da home é escuro

    const hex = brandColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 155;
  }, [brandColor]);

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/grupograodeouro/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@grupograodeouro5221", label: "Youtube" },
    { icon: Linkedin, href: "https://br.linkedin.com/company/gr-o-de-ouro", label: "Linkedin" },
  ];

  const bgColor = brandColor || "#5f382c";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const subTextColor = isDark ? "text-white/60" : "text-slate-600";
  const borderColor = isDark ? "border-white/10" : "border-black/10";


  const titleAndIconColor = useMemo(() => {
    if (!brandColor) return "#f7a824";
    return isDark ? "#ffffff" : "#000000";
  }, [brandColor, isDark]);

  return (
    <footer
      className={`relative py-12 overflow-hidden transition-colors duration-500 ${textColor}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/20' : 'bg-transparent'} pointer-events-none`}></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            {showLogo && (
              <img
                src={logo}
                alt="Grupo Grão de Ouro"
                width={160}
                height={80}
                className={`h-20 w-auto transition-all ${isDark ? "brightness-0 invert" : "brightness-100"}`}
              />
            )}
            <p className={`${subTextColor} text-xs leading-relaxed max-w-[200px]`}>
              Tradição e inovação no agronegócio brasileiro há mais de duas décadas.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-tight uppercase mt-6" style={{ color: titleAndIconColor }}>
              Localização
            </h4>
            <div className={`flex items-start gap-2 text-xs ${isDark ? "text-white/80" : "text-slate-800"}`}>
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: titleAndIconColor }} />
              <p>
                Av. Alberto Vieira Romão, 2739<br />
                Distrito Industrial - Alfenas/MG<br />
                CEP: 37135-516
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-tight uppercase mt-6" style={{ color: titleAndIconColor }}>
              Fale Conosco
            </h4>
            <div className={`space-y-2 text-xs ${isDark ? "text-white/80" : "text-slate-800"}`}>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" style={{ color: titleAndIconColor }} />
                <a href="mailto:sac@gouro.com.br" className="hover:opacity-70 transition-colors">sac@gouro.com.br</a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 shrink-0" style={{ color: titleAndIconColor }} />
                <div className="flex flex-col">
                  <a href="tel:3536981200" className="hover:opacity-70 transition-colors">(35) 3698-1200</a>
                  <a href="https://wa.me/5535999657668" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-colors">(35) 99965-7668</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between gap-4">
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${borderColor} ${isDark ? "bg-white/5 text-white/70" : "bg-black/5 text-black/70"}`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className={`group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${isDark ? "text-white/50 hover:text-[#f7a824]" : "text-black/50 hover:text-black"}`}
            >
              Voltar ao início
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${borderColor}`}>
                <ChevronUp size={16} />
              </div>
            </button>
          </div>
        </div>

        <div className={`border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.2em] ${borderColor} ${isDark ? "text-white/30" : "text-black/40"}`}>
          <p>© {new Date().getFullYear()} Grupo Grão de Ouro. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:opacity-100 transition-colors">Política de Privacidade</a>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: titleAndIconColor }}></span>
            <p>Excelência no Campo</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;