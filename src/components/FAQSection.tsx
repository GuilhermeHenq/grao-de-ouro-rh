import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import logo3d from "@/assets/cuboperguntas.png";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50/50 relative overflow-hidden text-[#2c3e50]">
      {/* Grid de Fundo */}
      <div className="absolute inset-0 opacity-[0.3] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div className="relative lg:sticky lg:top-32">
            {/* LOGO 3D COM ANIMAÇÕES */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#f7a824] font-bold tracking-[0.2em] uppercase text-xs mb-4"
            >
              Tire suas dúvidas
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1] text-[#2c3e50]"
            >
              Perguntas que <br /> <span className="text-[#f7a824]">todos</span> fazem
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#2c3e50]/70 text-lg max-w-sm mb-10 leading-relaxed"
            >
              Encontre respostas para as principais dúvidas sobre o Grupo Grão de Ouro.
            </motion.p>
            <div className="relative mb-6 inline-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  rotate: [-3, 3, -3]
                }}
                transition={{
                  duration: 0.8,
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-32 h-32 flex items-center justify-center relative z-10"
              >
                <img
                  src={logo3d}
                  alt="Cubo 3D"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.1, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-4 bg-black/20 blur-md rounded-[100%] mx-auto -mt-6"
              />
            </div>


          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="pt-4"
          >
            <Accordion type="single" collapsible defaultValue="faq-0" className="w-full space-y-2">
              {faqs.map((f, i) => (
                <motion.div key={i}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border-b border-slate-200 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-[#2c3e50] hover:text-[#f7a824] text-left text-lg py-6 font-semibold hover:no-underline group transition-all">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#2c3e50]/80 text-base leading-relaxed pb-6 pr-4">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;