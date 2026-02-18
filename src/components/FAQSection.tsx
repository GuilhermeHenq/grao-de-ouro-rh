import { HelpCircle } from "lucide-react";
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
    <section id="faq" className="py-20 lg:py-28 bg-[#281610] relative overflow-hidden text-white">
      {/* Background Grid Pattern - Ajustado para contrastar com o marrom */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Luz Dourada de Fundo - Opacidade levemente aumentada para destacar no marrom */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            {/* --- MOLDURA DO ÍCONE --- */}
            <div className="relative mb-10 ml-4 inline-block">
              {/* Moldura Externa */}
              <div className="absolute -inset-4 border border-white/40 rounded-[2.5rem]"></div>
              
              {/* Container do Ícone Central - Background marrom mais escuro para profundidade */}
              <div className="relative w-20 h-20 rounded-3xl border border-white/40 bg-[#25130e] flex items-center justify-center shadow-2xl">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <HelpCircle className="w-7 h-7 text-black stroke-[2.5px]" />
                </div>
              </div>
            </div>
            {/* ---------------------------------- */}

            <p className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">
              Tire suas dúvidas
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
              Perguntas que <br /> todos fazem
            </h2>
            <p className="text-white/70 text-lg max-w-sm mb-10 leading-relaxed">
              Encontre respostas para as principais dúvidas sobre o Grupo Grão de Ouro.
            </p>

          </div>

          <div>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-white/10 transition-all duration-300"
                >
                  <AccordionTrigger className="text-white hover:text-gold text-left text-lg py-6 font-semibold hover:no-underline group transition-all">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 text-base leading-relaxed pb-6 pr-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FAQSection;