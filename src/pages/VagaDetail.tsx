import { useParams, Link } from "react-router-dom";
import { vagas, empresas } from "@/data/vagas";
import { useState, useMemo } from "react";
import { 
  ArrowLeft, MapPin, Building2, Send, User, 
  FileText, Link as LinkIcon, DollarSign, Map as MapIcon,
  AlertCircle, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// --- COMPONENTE DE CAMPO ISOLADO ---
const Field = ({ label, icon: Icon, name, type = "text", placeholder, isTextArea = false, value, onChange, onBlur, error, touched, brandColor, optional }: any) => {
  const hasError = touched && error;
  const isSuccess = touched && !error && value.length > 0;

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold text-slate-500 uppercase ml-1">
        {label} {optional && <span className="text-slate-400 font-normal normal-case">(Opcional)</span>}
      </label>
      <div className="relative">
        {!isTextArea && Icon && (
          <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
        )}
        
        {isTextArea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={4}
            className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all resize-none outline-none ${
              hasError ? "border-red-500 ring-4 ring-red-500/10" : "border-slate-200 focus:bg-white"
            }`}
            onFocus={(e) => {
              if (!hasError) {
                e.currentTarget.style.borderColor = brandColor;
                e.currentTarget.style.boxShadow = `0 0 0 4px ${brandColor}20`;
              }
            }}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full ${Icon ? 'pl-12' : 'px-6'} pr-12 py-4 rounded-2xl bg-slate-50 border transition-all outline-none ${
              hasError ? "border-red-500 ring-4 ring-red-500/10" : "border-slate-200 focus:bg-white"
            }`}
            onFocus={(e) => {
              if (!hasError) {
                e.currentTarget.style.borderColor = brandColor;
                e.currentTarget.style.boxShadow = `0 0 0 4px ${brandColor}20`;
              }
            }}
          />
        )}
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
          <AnimatePresence mode="wait">
            {hasError && (
              <motion.div key="err" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <AlertCircle className="text-red-500" size={20} />
              </motion.div>
            )}
            {isSuccess && (
              <motion.div key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <CheckCircle2 className="text-green-500" size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs font-semibold ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const VagaDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  
  const vaga = vagas.find((v) => v.slug === slug);
  const empresa = empresas.find((e) => e.nome === vaga?.empresa);
  const brandColor = empresa?.corPrincipal || "#f7a824";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    nome: "", email: "", whatsapp: "", linkedin: "",
    cidade: "", pretensao: "", resumo: "", area: vaga?.categoria || ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isDark = useMemo(() => {
    const hex = brandColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 155;
  }, [brandColor]);

  if (!vaga || !empresa) return null;

  // Máscaras
  const maskPhone = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
  };

  const maskCurrency = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "");
    if (!onlyDigits) return "";
    const formatted = (Number(onlyDigits) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "whatsapp") finalValue = maskPhone(value);
    if (name === "pretensao") finalValue = maskCurrency(value);

    setForm(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    let error = "";
    if (name === "nome" && value.trim().length < 3) error = "Nome muito curto.";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "E-mail inválido.";
    if (name === "whatsapp" && value.length < 15) error = "WhatsApp incompleto.";
    if (name === "cidade" && value.trim().length < 3) error = "Informe sua cidade.";
    // LinkedIn e Resumo são opcionais, sem validação de erro aqui.

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    const hasErrors = Object.values(errors).some(err => err !== "");
    const hasRequiredEmpty = !form.nome || !form.email || !form.whatsapp || !form.cidade;

    if (hasErrors || hasRequiredEmpty) {
      setTouched({ nome: true, email: true, whatsapp: true, cidade: true });
      toast({ variant: "destructive", title: "Ops!", description: "Preencha os campos obrigatórios." });
      return;
    }

    setIsSubmitting(true);

    try {
      /* // --- LÓGICA GOOGLE SHEETS (COMENTADA) ---
      const GOOGLE_SCRIPT_URL = "SUA_URL_AQUI";
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, vaga: vaga.titulo, empresa: vaga.empresa })
      });
      */

      const mensagem = encodeURIComponent(
        `*Nova Candidatura*\n\n` +
        `*Vaga:* ${vaga.titulo}\n` +
        `*Empresa:* ${vaga.empresa}\n\n` +
        `*Nome:* ${form.nome}\n` +
        `*Cidade:* ${form.cidade}\n` +
        `*WhatsApp:* ${form.whatsapp}\n` +
        `*LinkedIn:* ${form.linkedin || 'Não informado'}\n` +
        `*Pretensão:* ${form.pretensao || 'Não informado'}\n\n` +
        `*Resumo:* ${form.resumo || 'Não informado'}`
      );

      window.open(`https://wa.me/553598724449?text=${mensagem}`, "_blank");
      toast({ title: "Sucesso!", description: "Redirecionando para o WhatsApp..." });
      
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: "Falha ao processar." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${empresa.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.15 
        }} 
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white/50 to-[#f8fafc]" />

      <div 
        className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center border-b border-white/10 backdrop-blur-xl transition-colors"
        style={{ backgroundColor: `${brandColor}CC` }}
      >
        <div className="container mx-auto px-4">
          <Link to="/#vagas" className={`inline-flex items-center gap-3 font-bold text-sm transition-all hover:scale-105 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <div className={`p-1.5 rounded-full border ${isDark ? 'border-white/30 bg-white/10' : 'border-slate-900/20 bg-black/5'}`}>
              <ArrowLeft size={18} />
            </div>
            Voltar às vagas
          </Link>
        </div>
      </div>

      <main className="pt-32 pb-20 container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden">
          
          <div className="p-10 md:p-14 text-center relative overflow-hidden" style={{ backgroundColor: brandColor }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <h1 className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {vaga.titulo}
            </h1>
            <div className={`flex flex-wrap justify-center gap-6 text-sm font-medium ${isDark ? 'text-white/80' : 'text-slate-800'}`}>
              <span className="flex items-center gap-1.5"><MapPin size={18} /> {vaga.localizacao}</span>
              <span className="flex items-center gap-1.5"><Building2 size={18} /> {vaga.empresa}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
            <div className="grid md:grid-cols-2 gap-10 text-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-l-4 px-3" style={{ borderColor: brandColor }}>Descrição</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{vaga.descricaoCompleta}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-l-4 px-3" style={{ borderColor: brandColor }}>Requisitos</h3>
                <ul className="grid gap-2">
                  {vaga.requisitos.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandColor }} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${brandColor}15` }}>
                  <User size={20} style={{ color: brandColor }} />
                </div>
                <h3 className="font-black uppercase tracking-wider text-sm text-slate-800">Dados da Candidatura</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Field 
                  label="Nome Completo" name="nome" icon={User} placeholder="Seu nome" 
                  value={form.nome} onChange={handleChange} onBlur={handleBlur}
                  error={errors.nome} touched={touched.nome} brandColor={brandColor}
                />
                <Field 
                  label="E-mail" name="email" type="email" icon={FileText} placeholder="seu@email.com" 
                  value={form.email} onChange={handleChange} onBlur={handleBlur}
                  error={errors.email} touched={touched.email} brandColor={brandColor}
                />
                <Field 
                  label="WhatsApp" name="whatsapp" icon={Send} placeholder="(00) 00000-0000" 
                  value={form.whatsapp} onChange={handleChange} onBlur={handleBlur}
                  error={errors.whatsapp} touched={touched.whatsapp} brandColor={brandColor}
                />
                <Field 
                  label="Cidade/UF" name="cidade" icon={MapIcon} placeholder="Ex: Alfenas/MG" 
                  value={form.cidade} onChange={handleChange} onBlur={handleBlur}
                  error={errors.cidade} touched={touched.cidade} brandColor={brandColor}
                />
                <Field 
                  label="LinkedIn / Portfólio" name="linkedin" icon={LinkIcon} placeholder="https://..." optional
                  value={form.linkedin} onChange={handleChange} onBlur={handleBlur}
                  error={errors.linkedin} touched={touched.linkedin} brandColor={brandColor}
                />
                <Field 
                  label="Pretensão Salarial" name="pretensao" icon={DollarSign} placeholder="R$ 0,00" 
                  value={form.pretensao} onChange={handleChange} onBlur={handleBlur}
                  error={errors.pretensao} touched={touched.pretensao} brandColor={brandColor}
                />
              </div>

              <Field 
                label="Resumo Profissional" name="resumo" isTextArea placeholder="Conte-nos um pouco sobre você..." optional
                value={form.resumo} onChange={handleChange} onBlur={handleBlur}
                error={errors.resumo} touched={touched.resumo} brandColor={brandColor}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 rounded-3xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] group disabled:opacity-50"
              style={{ backgroundColor: brandColor, color: isDark ? '#fff' : '#0f172a' }}
            >
              {isSubmitting ? "Enviando..." : "Enviar Candidatura via WhatsApp"}
              {!isSubmitting && <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </form>
        </motion.div>
      </main>
      
      <Footer brandColor={brandColor} showLogo={false} />
    </div>
  );
};

export default VagaDetail;