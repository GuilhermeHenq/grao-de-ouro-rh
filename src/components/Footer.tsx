import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brown-dark py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="font-display text-xl font-bold text-cream mb-4">
              <span className="text-gold">Grão</span> de Ouro
            </h3>
            <p className="text-cream/50 text-sm leading-relaxed">
              Tradição e inovação no agronegócio brasileiro há mais de duas décadas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-cream mb-4">Contato</h4>
            <div className="space-y-3 text-cream/50 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Av. Principal, 1000 - Centro, Goiânia - GO, 74000-000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>contato@graodeouro.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>(62) 3333-4444</span>
              </div>
              <p className="text-xs">CNPJ: 00.000.000/0001-00</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-cream mb-4">Links</h4>
            <div className="space-y-2 text-cream/50 text-sm mb-6">
              <a href="#" className="block hover:text-gold transition-colors">Política de Privacidade</a>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 text-center text-cream/30 text-xs">
          © {new Date().getFullYear()} Grupo Grão de Ouro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
