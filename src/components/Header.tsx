import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Números", href: "#numeros" },
  { label: "Vagas", href: "#vagas" },
  { label: "Perguntas", href: "#faq" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-gold/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#inicio" className="font-display text-xl font-bold text-cream tracking-wide">
          <span className="text-gold">Grão</span> de Ouro
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-cream/80 hover:text-gold transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#vagas"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-gold text-primary font-semibold text-sm hover:bg-gold-light transition-colors duration-200"
        >
          Ver Vagas
        </a>

        <button
          className="md:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-gold/10 px-4 pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-cream/80 hover:text-gold transition-colors border-b border-gold/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#vagas"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block text-center px-5 py-2 rounded-full bg-gold text-primary font-semibold text-sm"
          >
            Ver Vagas
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
