import { useParams, Link } from "react-router-dom";
import { vagas, empresas } from "@/data/vagas";
import { useState, useMemo } from "react";
import { ArrowLeft, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categorias } from "@/data/vagas";

const EmpresaVagas = () => {
  const { slug } = useParams();
  const empresa = empresas.find((e) => e.slug === slug);

  const [search, setSearch] = useState("");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    if (!empresa) return [];
    return vagas.filter((v) => {
      if (v.empresa !== empresa.nome) return false;
      if (search && !v.titulo.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategorias.length > 0 && !selectedCategorias.includes(v.categoria)) return false;
      return true;
    });
  }, [empresa, search, selectedCategorias]);

  const toggleCategoria = (c: string) => {
    setSelectedCategorias((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  if (!empresa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Empresa não encontrada</h1>
          <Link to="/" className="text-gold hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner */}
      <div className="bg-brown-gradient pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/#vagas" className="inline-flex items-center gap-2 text-cream/60 hover:text-gold transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Voltar às empresas
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-cream mb-3">{empresa.nome}</h1>
          <p className="text-cream/70 max-w-2xl">{empresa.descricao}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Search & Filters */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar vaga por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-5 py-3 rounded-xl border border-border bg-card hover:border-gold/50 transition-all flex items-center gap-2 text-muted-foreground"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Filtrar por categoria</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categorias.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleCategoria(c)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        selectedCategorias.includes(c)
                          ? "bg-gold text-primary border-gold"
                          : "bg-background text-muted-foreground border-border hover:border-gold/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jobs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vaga) => (
            <motion.div
              key={vaga.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border gold-border gold-border-hover transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-gold/5 group"
            >
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-3">
                  {vaga.categoria}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {vaga.titulo}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {vaga.localizacao}
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {vaga.descricaoCurta}
                </p>
                <Link
                  to={`/vagas/${vaga.slug}`}
                  className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
                >
                  Ver detalhes
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Nenhuma vaga encontrada para esta empresa.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EmpresaVagas;
