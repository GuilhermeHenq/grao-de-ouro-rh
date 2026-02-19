import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logograo.png";

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Resultados", href: "/#numeros" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Perguntas", href: "/#faq" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-zinc-100">
      {/* Aumentei a altura do container de h-16 para h-20 para acomodar a logo maior */}
      <div className="container mx-auto flex items-center justify-between h-26 px-4 lg:px-8">
        <Link to="/" className="flex items-center">

          <img 
            src={logo} 
            alt="Grupo Grão de Ouro" 
            className="h-24 w-auto object-contain transition-transform hover:scale-105" 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-lg font-semibold text-zinc-800 hover:text-[#f7a824] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#vagas"
          className="text-lg hidden md:inline-flex items-center px-6 py-2.5 rounded-full bg-[#f7a824] text-black font-bold hover:brightness-110 transition-all duration-200 hover:shadow-lg hover:shadow-[#f7a824]/20"
        >
          Ver Vagas
        </a>

        <button
          className="md:hidden text-zinc-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-4 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-4 text-zinc-800 font-medium hover:text-[#f7a824] transition-colors border-b border-zinc-50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#vagas"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block text-center px-5 py-3 rounded-full bg-[#f7a824] text-black font-bold text-sm"
          >
            Ver Vagas
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;