import logoGrao from "@/assets/LogoGraoDeOuro.png";
import logoGraoMaquina from "@/assets/logograodeouromaquinas.png";
import logoForte from "@/assets/logofortegraosfundo.png";
import logoNutrividas from "@/assets/logonutrividasfundo.png";
import fundoNutrimax from "@/assets/nutrimax.png";
import fundoNutrividas from "@/assets/nutrividas.png";
import fundoForteGraos from "@/assets/fortegraos.png";
import fundoGraoDeOuro from "@/assets/graodeourofundo.png";
import bannerGraoDeOuro from "@/assets/bgGraodeOuro.png";
import bannerNutrimax from "@/assets/bgNutrimax.png";
import bannerForteGraos from "@/assets/bgForteGraos.png";
import bannerGraoDeOuroMaquinas from "@/assets/bgGraodeOuroMaquinas.png";
import bannerTodas from "@/assets/bgTodas.png";
import bannerNutrividas from "@/assets/bgNutrividas.png";
import fundoGraoDeOuroMaquinas from "@/assets/graodeouromaquinas.png";
import todas from "@/assets/todas.png";
import logoGrupo from "@/assets/logogrupo.png";
import logoNutrimax from "@/assets/LogoNutrimax.png";

export interface Vaga {
  id: number | string;
  titulo: string;
  empresa: string;
  categoria: string;
  localizacao: string;
  descricaoCompleta: string;
  requisitos?: string;
  beneficios?: string;
  slug: string;
  uuid?: string;
}

export interface Empresa {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  image?: string;
  bgImage?: string;
  corPrincipal?: string;
  banner?: string;
}


export const empresas: Empresa[] = [
  {
    id: 4,
    nome: "Todas as Empresas",
    slug: "todas",
    descricao: "Explore todas as oportunidades disponíveis em nosso ecossistema de empresas.",
    bgImage: todas,
    image: logoGrupo,
    corPrincipal: "#080808",
    banner: bannerTodas,
  },
  {
    id: 1,
    nome: "Grão de Ouro",
    slug: "graodeouro",
    descricao: "Especialistas em armazenagem, comercialização de grãos e nutrição animal, com excelência e tradição no agronegócio.",
    image: logoGrao || "https://via.placeholder.com/150",
    bgImage: fundoGraoDeOuro || "https://via.placeholder.com/1920x600",
    corPrincipal: "#5f382c",
    banner: bannerGraoDeOuro || "https://via.placeholder.com/1920x400",
  },
  {
    id: 2,
    nome: "Grão de Ouro Máquinas",
    slug: "maquinas",
    descricao: "Concessionária New Holland, oferecendo máquinas, equipamentos e suporte especializado ao produtor rural.",
    image: logoGraoMaquina || "https://via.placeholder.com/150",
    bgImage: fundoGraoDeOuroMaquinas || "https://via.placeholder.com/1920x600",
    corPrincipal: "#001a5c",
    banner: bannerGraoDeOuroMaquinas || "https://via.placeholder.com/1920x400",
  },
  {
    id: 3,
    nome: "Nutrimax",
    slug: "nutrimax",
    descricao: "Nutrimax é referência em Nutrição Animal em toda sua área de atuação.",
    image: logoNutrimax,
    bgImage: fundoNutrimax || "https://via.placeholder.com/1920x600",
    corPrincipal: "#c22131",
    banner: bannerNutrimax || "https://via.placeholder.com/1920x400",
  },
  {
    id: 5,
    nome: "Forte Grãos",
    slug: "fortegraos",
    descricao: "Atua na produção e comercialização de grãos, utilizando tecnologias modernas e estrutura própria para garantir alta produtividade e eficiência no campo.",
    image: logoForte || "https://via.placeholder.com/150",
    bgImage: fundoForteGraos || "https://via.placeholder.com/1920x600",
    corPrincipal: "#ffcc00",
    banner: bannerForteGraos || "https://via.placeholder.com/1920x400",
  },

  {
    id: 6,
    nome: "Nutrividas",
    slug: "nutrividas",
    descricao: "Nutrividas é referência em Nutrição Animal em toda sua área de atuação.",
    image: logoNutrividas || "https://via.placeholder.com/150",
    bgImage: fundoNutrividas || "https://via.placeholder.com/1920x600",
    corPrincipal: "#1e642f",
    banner: bannerNutrividas || "https://via.placeholder.com/1920x400",
  },
];

export const categorias = ["Administrativo", "Operacional"];

