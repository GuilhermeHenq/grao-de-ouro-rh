import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como me candidatar a uma vaga?",
    a: "Basta acessar a seção de vagas, escolher a oportunidade desejada, preencher o formulário com seus dados e enviar sua candidatura diretamente pelo WhatsApp.",
  },
  {
    q: "Preciso ter experiência para me candidatar?",
    a: "Depende da vaga. Temos oportunidades para todos os níveis, desde vagas de entrada até posições seniores. Confira os requisitos de cada vaga.",
  },
  {
    q: "Posso me candidatar para mais de uma vaga?",
    a: "Sim! Você pode se candidatar para quantas vagas desejar. Recomendamos focar nas que mais se alinham ao seu perfil.",
  },
  {
    q: "Onde ficam as unidades do grupo?",
    a: "Nossas unidades estão localizadas em diversas cidades de Goiás, incluindo Goiânia, Rio Verde, Jataí, Itumbiara, Anápolis e Catalão.",
  },
  {
    q: "Quais benefícios o grupo oferece?",
    a: "Oferecemos plano de saúde, vale-alimentação, seguro de vida, programas de capacitação e um ambiente de trabalho que valoriza o crescimento profissional.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-brown-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">Tire suas dúvidas</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
              Perguntas que todos fazem
            </h2>
            <p className="text-cream/60 leading-relaxed">
              Encontre respostas para as principais dúvidas sobre oportunidades, processos seletivos e o Grupo Grão de Ouro.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-gold/10 pb-2"
              >
                <AccordionTrigger className="text-cream hover:text-gold text-left font-medium py-4 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-cream/60 leading-relaxed pb-4">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
