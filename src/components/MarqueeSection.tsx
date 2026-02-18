import Marquee from "react-fast-marquee";

// Dados internos das logos
const logosParceiras = [
  { 
    id: 1, 
    nome: "Nutrimax", 
    src: "https://nutrimax.ind.br/img/logo_1.png"
  },
  { 
    id: 2, 
    nome: "Grão de Ouro", 
    src: "/src/assets/logograo.png"
  },
  { 
    id: 3, 
    nome: "Forte graos", 
    src: "/src/assets/logofortegraos.png"
  },
  { 
    id: 4, 
    nome: "Semente Interlagos", 
    src: "/src/assets/logosemente.png"
  },
  { 
    id: 5, 
    nome: "Grão de ouro Rental", 
    src: "/src/assets/logorental.png"
  },
  { 
    id: 6, 
    nome: "Nutrividas", 
    src: "/src/assets/logonutrividas.png"
  },
];

const MarqueeSection = () => {
  return (
    <section className="bg-white-gradient py-12 overflow-hidden border-y border-slate-100">
      <Marquee speed={40} gradient={false} pauseOnHover={false}>
        <div className="flex items-center gap-20 mx-10">
          {/* O map agora gera apenas containers visuais, sem links */}
          {logosParceiras.concat(logosParceiras).map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              /* Aumentado de h-20 para h-32 e w-48 para w-64 */
              className="flex items-center justify-center h-32 w-64 transition-opacity duration-500"
            >
              <img
                src={logo.src}
                alt={logo.nome}
                /* Aumentado de h-10/12 para h-16/20 */
                className="h-16 md:h-20 max-w-full object-contain transition-opacity duration-300 pointer-events-none select-none"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default MarqueeSection;