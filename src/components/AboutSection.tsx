import { Target, Eye, Award } from "lucide-react";

const diferenciais = [
  { icon: Target, title: "Missão", desc: "Oferecer soluções completas e de excelência para o agronegócio brasileiro, valorizando pessoas e sustentabilidade." },
  { icon: Eye, title: "Visão", desc: "Ser referência nacional em armazenagem, nutrição animal e insumos agrícolas, expandindo nossa atuação com inovação." },
  { icon: Award, title: "Valores", desc: "Compromisso com a qualidade, ética, respeito às pessoas, sustentabilidade e valorização do produtor rural." },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-cream-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">Quem somos</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Mais de duas décadas transformando o agronegócio
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O Grupo Grão de Ouro nasceu no coração de Goiás com a missão de oferecer soluções completas para o produtor rural. Ao longo dos anos, expandimos nossa atuação para armazenagem de grãos, nutrição animal, comercialização de insumos agrícolas, distribuição de máquinas e equipamentos, transporte logístico e produção de sementes certificadas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Com 7 empresas e mais de 800 colaboradores, somos reconhecidos pela qualidade dos nossos serviços, pelo compromisso com a sustentabilidade e pela valorização das pessoas que fazem parte da nossa história.
            </p>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vídeo institucional"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {diferenciais.map((d, i) => (
            <div key={i} className="bg-card rounded-xl p-6 border gold-border gold-border-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                <d.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{d.title}</h3>
              <p className="text-muted-foreground text-sm">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
