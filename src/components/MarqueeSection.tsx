import Marquee from "react-fast-marquee";
import { empresas } from "@/data/vagas";

const MarqueeSection = () => {
  return (
    <section className="bg-brown-gradient py-8 overflow-hidden">
      <Marquee speed={50} gradient={false}>
        {[...Array(3)].map((_, outerIndex) => (
          <div key={outerIndex} className="flex items-center gap-12 mx-6">
            {empresas.map((empresa) => (
              <div key={`${outerIndex}-${empresa.id}`} className="flex items-center justify-center h-16 w-40">
                <img 
                  src={empresa.image} 
                  alt={empresa.nome}
                  className="h-12 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeSection;
