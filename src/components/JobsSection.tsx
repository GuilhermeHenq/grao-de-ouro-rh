import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import { vagas, empresas, categorias } from "@/data/vagas";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const JobsSection = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return vagas.filter((v) => {
      if (selectedEmpresa && v.empresa !== selectedEmpresa) return false;
      if (search && !v.titulo.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategorias.length > 0 && !selectedCategorias.includes(v.categoria)) return false;
      return true;
    });
  }, [selectedEmpresa, search, selectedCategorias]);

  const toggleCategoria = (c: string) => {
    setSelectedCategorias((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <section id="vagas" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2 text-center">Oportunidades</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          Vagas disponíveis
        </h2>

        {/* Empresas carousel */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <button
            onClick={() => setSelectedEmpresa(null)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              !selectedEmpresa
                ? "bg-gold text-primary border-gold"
                : "bg-card text-muted-foreground border-border hover:border-gold/50"
            }`}
          >
            Todas
          </button>
          {empresas.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedEmpresa(selectedEmpresa === e.nome ? null : e.nome)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                selectedEmpresa === e.nome
                  ? "bg-gold text-primary border-gold"
                  : "bg-card text-muted-foreground border-border hover:border-gold/50"
              }`}
            >
              {e.nome}
            </button>
          ))}
        </div>

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

        {/* Filter modal */}
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
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {vaga.titulo}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {vaga.localizacao}
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {vaga.descricaoCurta}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-4">{vaga.empresa}</p>
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
          <p className="text-center text-muted-foreground py-12">Nenhuma vaga encontrada com os filtros selecionados.</p>
        )}
      </div>
    </section>
  );
};

export default JobsSection;
