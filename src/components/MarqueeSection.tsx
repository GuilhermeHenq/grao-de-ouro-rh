import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  const text = "GRÃO DE OURO • TRADIÇÃO NO AGRO • EXCELÊNCIA • INOVAÇÃO • COMPROMISSO • ";

  return (
    <section className="bg-brown-gradient py-5 overflow-hidden">
      <Marquee speed={60} gradient={false}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-gold font-display text-xl md:text-2xl font-bold tracking-[0.2em] mx-4 whitespace-nowrap">
            {text}
          </span>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeSection;
