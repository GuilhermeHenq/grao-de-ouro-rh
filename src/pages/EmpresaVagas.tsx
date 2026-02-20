import { useParams, Link } from "react-router-dom";
import { vagas, empresas, categorias } from "@/data/vagas";
import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, MapPin, Search, SlidersHorizontal, X, Check, Briefcase, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

const EmpresaVagas = () => {
  const { slug } = useParams();
  const empresa = empresas.find((e) => e.slug === slug);

  // Estados dos Filtros
  const [search, setSearch] = useState("");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedCidades, setSelectedCidades] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extrair cidades únicas das vagas desta empresa
  const cidadesDisponiveis = useMemo(() => {
    if (!empresa) return [];
    const cidades = vagas
      .filter(v => v.empresa === empresa.nome)
      .map(v => v.localizacao);
    return Array.from(new Set(cidades));
  }, [empresa]);

  // Bloqueio de scroll
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const filtered = useMemo(() => {
    if (!empresa) return [];
    return vagas.filter((v) => {
      if (v.empresa !== empresa.nome) return false;
      if (search && !v.titulo.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategorias.length > 0 && !selectedCategorias.includes(v.categoria)) return false;
      if (selectedCidades.length > 0 && !selectedCidades.includes(v.localizacao)) return false;
      return true;
    });
  }, [empresa, search, selectedCategorias, selectedCidades]);

  if (!empresa) return null; // Fallback tratado anteriormente

  const brandColor = empresa.corPrincipal || "#f7a824";

  // Função auxiliar para toggle de arrays
  const toggleSelection = (item: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner (Mantido conforme original) */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={empresa.bgImage} alt={empresa.nome} className="w-full h-full object-cover" />
          <div className="absolute inset-0 opacity-90" style={{ background: `linear-gradient(to right, #1a1a1a, ${brandColor}99)` }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12 lg:py-20">
          <Link to="/#vagas" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-white/20 hover:scale-105 transition-all mb-8 group">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Voltar às empresas
          </Link>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 bg-white rounded-3xl p-4 shadow-2xl flex items-center justify-center">
              <img src={empresa.image} alt={empresa.nome} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{empresa.nome}</h1>
              <p className="text-white/80 max-w-2xl text-lg leading-relaxed">{empresa.descricao}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Buscar vagas na ${empresa.nome}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border focus:ring-2 transition-all outline-none"
              style={{ caretColor: brandColor }}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-4 rounded-xl border bg-card flex items-center justify-center gap-2 font-bold transition-all hover:shadow-lg"
            style={{ borderColor: brandColor, color: brandColor }}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros {(selectedCategorias.length + selectedCidades.length) > 0 && `(${(selectedCategorias.length + selectedCidades.length)})`}
          </button>
        </div>

        {/* Modal de Filtros Avançados */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

                <div className="p-6 border-b flex justify-between items-center bg-white">
                  <h2 className="text-xl font-bold text-slate-900">Refinar busca</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"><X /></button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8">
                  {/* Seção de Categorias */}
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">
                      <Briefcase className="w-4 h-4" /> Área de Atuação
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categorias.map((cat) => {
                        const active = selectedCategorias.includes(cat);
                        return (
                          <button
                            key={cat}
                            onClick={() => toggleSelection(cat, selectedCategorias, setSelectedCategorias)}
                            className="px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all flex items-center gap-2"
                            style={{
                              borderColor: active ? brandColor : '#e2e8f0',
                              color: active ? brandColor : '#64748b',
                              backgroundColor: 'transparent'
                            }}
                          >
                            {cat} {active && <Check className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Seção de Cidades */}
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">
                      <Building2 className="w-4 h-4" /> Localidade
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cidadesDisponiveis.map((cidade) => {
                        const active = selectedCidades.includes(cidade);
                        return (
                          <label key={cidade} className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all"
                            style={{ borderColor: active ? brandColor : '#f1f5f9', color: active ? brandColor : '#475569' }}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={active}
                              onChange={() => toggleSelection(cidade, selectedCidades, setSelectedCidades)}
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${active ? 'bg-transparent' : 'bg-white'}`} style={{ borderColor: active ? brandColor : '#cbd5e1' }}>
                              {active && <Check className="w-3 h-3" style={{ color: brandColor }} />}
                            </div>
                            <span className="font-medium">{cidade}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t flex gap-3">
                  <button
                    onClick={() => { setSelectedCategorias([]); setSelectedCidades([]); }}
                    className="flex-1 py-3 font-bold rounded-xl border-2 transition-all"
                    style={{ borderColor: brandColor, color: brandColor }}
                  >
                    Limpar tudo
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 font-bold rounded-xl shadow-lg transition-all"
                    style={{ backgroundColor: brandColor, color: '#fff' }}
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Grid de Vagas ou Empty State */}
        <div className="min-h-[400px] flex flex-col">
          {filtered.length > 0 ? (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((vaga, index) => (
                  <motion.div
                    key={vaga.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-card rounded-2xl border border-border hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
                  >
                    <div className="p-8 flex flex-col h-full">
                      <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold mb-4 self-start" style={{ backgroundColor: `${brandColor}15`, color: brandColor }}>
                        {vaga.categoria}
                      </div>
                      <h3 className="text-xl font-bold mb-3 flex-grow">{vaga.titulo}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                        <MapPin className="w-4 h-4" /> {vaga.localizacao}
                      </div>
                      <Link to={`/vagas/${vaga.slug}`} className="flex items-center justify-between font-bold text-sm group/btn" style={{ color: brandColor }}>
                        Ver detalhes
                        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover/btn:scale-110 shadow-md" style={{ backgroundColor: brandColor, color: '#fff' }}>
                          <ArrowLeft className="w-5 h-5 rotate-180" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Estado Vazio (Nenhuma vaga encontrada) */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-64 h-64 mb-8 relative">
                {/* PLACEHOLDER DA IMAGEM */}
                <div className="absolute inset-0 bg-slate-100 rounded-full flex items-center justify-center border-4 border-dashed border-slate-200">
                  <Search size={80} className="text-slate-300" />
                  {/* Quando tiver a imagem, basta substituir o componente acima por:
                   <img src={suaImagemURL} alt="Nenhuma vaga" className="w-full h-full object-contain" /> 
                   */}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Nenhuma vaga encontrada
              </h3>
              <p className="text-slate-500 max-w-sm mb-8">
                Não encontramos oportunidades para os filtros selecionados ou para o termo: <span className="font-bold text-slate-700 italic">"{search}"</span>
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategorias([]);
                  setSelectedCidades([]);
                }}
                className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
              >
                Limpar todos os filtros
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer brandColor={empresa.corPrincipal} showLogo={false} />
    </div>
  );
};

export default EmpresaVagas;