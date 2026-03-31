import Marquee from "react-fast-marquee";

import logoGrao from "/src/assets/logograo.png";
import logoForte from "/src/assets/logofortegraos.png";
import logoSemente from "/src/assets/logosemente.png";
import logoRental from "/src/assets/logorental.png";
import logoNutrividas from "/src/assets/logonutrividas.png";
import logomaquinas from "/src/assets/logomaquinas.png";
import logoNutrimax from "/src/assets/LogoNutrimax.png";

const logosParceiras = [
  { id: 1, nome: "Nutrimax", src: logoNutrimax },
  { id: 2, nome: "Grão de Ouro", src: logoGrao },
  { id: 3, nome: "Forte graos", src: logoForte },
  { id: 4, nome: "Semente Interlagos", src: logoSemente },
  { id: 5, nome: "Grão de ouro Rental", src: logoRental },
  { id: 6, nome: "Nutrividas", src: logoNutrividas },
  { id: 7, nome: "Grão de Ouro Máquinas", src: logomaquinas },
];

const MarqueeSection = () => {
  return (
    <section
      className="bg-white-gradient py-12 border-y border-slate-100 w-full overflow-hidden select-none"
      style={{ touchAction: 'pan-y' }}
    >
      <Marquee
        speed={60}
        gradient={false}
        pauseOnHover={true}
        aria-hidden="true"
        className="overflow-hidden"
      >
        {logosParceiras.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex items-center justify-center h-32 w-64 mx-10 flex-shrink-0"
          >
            <img
              src={logo.src}
              alt={logo.nome}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain pointer-events-none"
              width="206"
              height="128"
            />
          </div>
        ))}
      </Marquee>

      <div className="sr-only" role="region" aria-label="Empresas parceiras">
        {logosParceiras.map((logo) => (
          <span key={logo.id}>{logo.nome}</span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;