import Marquee from "react-fast-marquee";


import logoGrao from "/src/assets/logograo.png";
import logoForte from "/src/assets/logofortegraos.png";
import logoSemente from "/src/assets/logosemente.png";
import logoRental from "/src/assets/logorental.png";
import logoNutrividas from "/src/assets/logonutrividas.png";
import logomaquinas from "/src/assets/logomaquinas.png";


const logosParceiras = [
  { 
    id: 1, 
    nome: "Nutrimax", 
    src: "https://nutrimax.ind.br/img/logo_1.png"
  },
  { 
    id: 2, 
    nome: "Grão de Ouro", 
    src: logoGrao
  },
  { 
    id: 3, 
    nome: "Forte graos", 
    src: logoForte 
  },
  { 
    id: 4, 
    nome: "Semente Interlagos", 
    src: logoSemente 
  },
  { 
    id: 5, 
    nome: "Grão de ouro Rental", 
    src: logoRental 
  },
  { 
    id: 6, 
    nome: "Nutrividas", 
    src: logoNutrividas 
  },
  { 
    id: 7, 
    nome: "Grão de Ouro Máquinas", 
    src: logomaquinas 
  },
];

const MarqueeSection = () => {
  return (
    <section className="bg-white-gradient py-12 overflow-hidden border-y border-slate-100">
      <Marquee speed={40} gradient={false} pauseOnHover={false}>
        <div className="flex items-center gap-20 mx-10">
          {logosParceiras.concat(logosParceiras).map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex items-center justify-center h-32 w-64 transition-opacity duration-500"
            >
              <img
                src={logo.src}
                alt={logo.nome}
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