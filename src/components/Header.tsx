import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logograo.png";

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Números", href: "/#numeros" },
  { label: "Vagas", href: "/#vagas" },
  { label: "Perguntas", href: "/#faq" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // Fundo branco (bg-white/95), letras pretas e sombra para destaque (shadow-md)
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-zinc-100">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center">
          {/* Ajustei a altura da logo para ficar harmônica no fundo branco */}
          <img src={logo} alt="Grupo Grão de Ouro" className="h-10 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              // Texto em cinza escuro/preto com hover no dourado da marca
              className="text-sm font-semibold text-zinc-800 hover:text-gold transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#vagas"
          // Botão dourado com texto preto para máxima leitura
          className="hidden md:inline-flex items-center px-6 py-2 rounded-full bg-gold text-black font-bold text-sm hover:bg-gold-light transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
        >
          Ver Vagas
        </a>

        <button
          className="md:hidden text-zinc-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Também em Branco */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-4 pb-6 shadow-xl">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-4 text-zinc-800 font-medium hover:text-gold transition-colors border-b border-zinc-50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#vagas"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block text-center px-5 py-3 rounded-full bg-gold text-black font-bold text-sm"
          >
            Ver Vagas
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;