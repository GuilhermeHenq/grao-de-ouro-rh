export interface Vaga {
  id: number;
  titulo: string;
  empresa: string;
  categoria: string;
  localizacao: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  requisitos: string[];
  slug: string;
}

export interface Empresa {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
}

export const empresas: Empresa[] = [
  { id: 1, nome: "Grão de Ouro Armazéns", slug: "armazens", descricao: "Referência em armazenagem de grãos com tecnologia de ponta e capacidade para milhões de toneladas." },
  { id: 2, nome: "Grão de Ouro Nutrição", slug: "nutricao", descricao: "Especialistas em nutrição animal com foco em formulações de alta performance." },
  { id: 3, nome: "Grão de Ouro Insumos", slug: "insumos", descricao: "Fornecimento de insumos agrícolas de qualidade para produtores de todo o Brasil." },
  { id: 4, nome: "Grão de Ouro Rações", slug: "racoes", descricao: "Produção de rações balanceadas para diversas espécies animais." },
  { id: 5, nome: "Grão de Ouro Máquinas", slug: "maquinas", descricao: "Parceria exclusiva com New Holland para venda e manutenção de máquinas agrícolas." },
  { id: 6, nome: "Grão de Ouro Transportes", slug: "transportes", descricao: "Logística integrada para transporte de grãos e insumos em todo o centro-oeste." },
  { id: 7, nome: "Grão de Ouro Sementes", slug: "sementes", descricao: "Sementes certificadas de alta qualidade para máxima produtividade no campo." },
];

export const categorias = ["Administrativo", "Operacional", "Comercial", "Técnico"];

export const vagas: Vaga[] = [
  {
    id: 1,
    titulo: "Analista Administrativo",
    empresa: "Grão de Ouro Armazéns",
    categoria: "Administrativo",
    localizacao: "Goiânia, GO",
    descricaoCurta: "Responsável por processos administrativos e gestão de documentos da unidade.",
    descricaoCompleta: "Buscamos um Analista Administrativo para atuar na gestão de processos internos, controle de documentos, elaboração de relatórios gerenciais e suporte à diretoria. O profissional será responsável por otimizar fluxos de trabalho e garantir a eficiência operacional da unidade.",
    requisitos: ["Graduação em Administração ou áreas correlatas", "Experiência mínima de 2 anos", "Excel avançado", "Boa comunicação"],
    slug: "analista-administrativo-goiania",
  },
  {
    id: 2,
    titulo: "Operador de Máquinas Agrícolas",
    empresa: "Grão de Ouro Máquinas",
    categoria: "Operacional",
    localizacao: "Rio Verde, GO",
    descricaoCurta: "Operação de máquinas agrícolas de grande porte em campo.",
    descricaoCompleta: "Procuramos operador experiente para conduzir colheitadeiras, tratores e plantadeiras New Holland. Atuação em fazendas parceiras com foco em produtividade e segurança.",
    requisitos: ["CNH categoria C ou superior", "Experiência com máquinas agrícolas", "Disponibilidade para viagens", "Curso de operação de máquinas"],
    slug: "operador-maquinas-rio-verde",
  },
  {
    id: 3,
    titulo: "Vendedor Externo - Insumos",
    empresa: "Grão de Ouro Insumos",
    categoria: "Comercial",
    localizacao: "Jataí, GO",
    descricaoCurta: "Venda consultiva de insumos agrícolas para produtores rurais.",
    descricaoCompleta: "Responsável pela prospecção e atendimento de clientes produtores rurais, apresentação de portfólio de insumos, negociação comercial e acompanhamento pós-venda. Atuação em toda a região sudoeste de Goiás.",
    requisitos: ["Experiência em vendas no agro", "CNH categoria B", "Veículo próprio", "Conhecimento em defensivos e fertilizantes"],
    slug: "vendedor-externo-insumos-jatai",
  },
  {
    id: 4,
    titulo: "Técnico em Nutrição Animal",
    empresa: "Grão de Ouro Nutrição",
    categoria: "Técnico",
    localizacao: "Itumbiara, GO",
    descricaoCurta: "Suporte técnico em formulação de rações e nutrição animal.",
    descricaoCompleta: "Atuação na formulação de rações balanceadas, acompanhamento nutricional de rebanhos, visitas técnicas a clientes e elaboração de laudos técnicos. Trabalho em conjunto com a equipe de P&D.",
    requisitos: ["Graduação em Zootecnia ou Veterinária", "Experiência em nutrição animal", "Disponibilidade para viagens", "Conhecimento em formulação de rações"],
    slug: "tecnico-nutricao-animal-itumbiara",
  },
  {
    id: 5,
    titulo: "Auxiliar de Armazém",
    empresa: "Grão de Ouro Armazéns",
    categoria: "Operacional",
    localizacao: "Goiânia, GO",
    descricaoCurta: "Apoio nas operações de recebimento e expedição de grãos.",
    descricaoCompleta: "Auxiliar nas operações diárias do armazém, incluindo recebimento de grãos, pesagem, classificação, armazenamento e expedição. Zelar pela limpeza e organização do ambiente.",
    requisitos: ["Ensino médio completo", "Disponibilidade de horário", "Proatividade", "Trabalho em equipe"],
    slug: "auxiliar-armazem-goiania",
  },
  {
    id: 6,
    titulo: "Gerente Comercial",
    empresa: "Grão de Ouro Sementes",
    categoria: "Comercial",
    localizacao: "Anápolis, GO",
    descricaoCurta: "Gestão da equipe comercial e estratégia de vendas de sementes.",
    descricaoCompleta: "Liderar a equipe de vendas, definir metas e estratégias comerciais, acompanhar indicadores de performance e desenvolver novos canais de distribuição para sementes certificadas.",
    requisitos: ["Experiência em gestão comercial no agro", "Graduação completa", "Liderança comprovada", "Visão estratégica"],
    slug: "gerente-comercial-sementes-anapolis",
  },
  {
    id: 7,
    titulo: "Motorista de Carreta",
    empresa: "Grão de Ouro Transportes",
    categoria: "Operacional",
    localizacao: "Catalão, GO",
    descricaoCurta: "Transporte de grãos entre unidades do grupo e clientes.",
    descricaoCompleta: "Conduzir carretas graneleiras para transporte de grãos, realizar inspeções veiculares, cumprir rotas estabelecidas e manter a documentação em dia.",
    requisitos: ["CNH categoria E", "Curso MOPP", "Experiência com carreta graneleira", "Sem restrições na CNH"],
    slug: "motorista-carreta-catalao",
  },
  {
    id: 8,
    titulo: "Analista de RH",
    empresa: "Grão de Ouro Armazéns",
    categoria: "Administrativo",
    localizacao: "Goiânia, GO",
    descricaoCurta: "Gestão de processos de recrutamento e desenvolvimento de pessoas.",
    descricaoCompleta: "Conduzir processos seletivos, onboarding de novos colaboradores, programas de treinamento e desenvolvimento, gestão de clima organizacional e apoio à liderança.",
    requisitos: ["Graduação em Psicologia, RH ou áreas correlatas", "Experiência em R&S", "Conhecimento em DHO", "Empatia e comunicação"],
    slug: "analista-rh-goiania",
  },
];
