import { useParams, Link } from "react-router-dom";
import { vagas } from "@/data/vagas";
import { useState } from "react";
import { ArrowLeft, MapPin, Building2, Send } from "lucide-react";

const VagaDetail = () => {
  const { slug } = useParams();
  const vaga = vagas.find((v) => v.slug === slug);

  const [form, setForm] = useState({ nome: "", idade: "", telefone: "", experiencia: "" });

  if (!vaga) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Vaga não encontrada</h1>
          <Link to="/" className="text-gold hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá, quero me inscrever para a vaga ${vaga.titulo}. Meus dados são: Nome: ${form.nome}, Idade: ${form.idade}, Telefone: ${form.telefone}, Experiência: ${form.experiencia}`
    );
    window.open(`https://wa.me/5562999999999?text=${msg}`, "_blank");
  };

  const isValid = form.nome && form.idade && form.telefone && form.experiencia;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/#vagas" className="inline-flex items-center gap-2 text-cream/80 hover:text-gold transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Voltar às vagas
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-4">
            {vaga.categoria}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{vaga.titulo}</h1>

          <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-8">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{vaga.localizacao}</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{vaga.empresa}</span>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Descrição da vaga</h3>
            <p className="text-muted-foreground leading-relaxed">{vaga.descricaoCompleta}</p>
          </div>

          <div className="mb-10">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Requisitos</h3>
            <ul className="space-y-2">
              {vaga.requisitos.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border gold-border p-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Candidate-se</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nome completo</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all text-foreground"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Idade</label>
                <input
                  type="text"
                  value={form.idade}
                  onChange={(e) => setForm({ ...form, idade: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all text-foreground"
                  placeholder="Sua idade"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefone</label>
              <input
                type="text"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all text-foreground"
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-1.5">Experiência</label>
              <textarea
                rows={4}
                value={form.experiencia}
                onChange={(e) => setForm({ ...form, experiencia: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all text-foreground resize-none"
                placeholder="Descreva brevemente sua experiência..."
              />
            </div>
            <button
              onClick={handleWhatsApp}
              disabled={!isValid}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gold text-primary font-bold text-base hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Enviar candidatura via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VagaDetail;
