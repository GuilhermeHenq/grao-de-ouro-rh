import { useParams, Link } from "react-router-dom";
import { vagas, empresas } from "@/data/vagas";
import { useState, useMemo } from "react";
import { 
  ArrowLeft, MapPin, Building2, Send, User, 
  Briefcase, Target, GraduationCap, Search, 
  FileText, Heart, ShieldCheck, Link as LinkIcon, DollarSign, Map as MapIcon,
  AlertCircle, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// --- COMPONENTE DE CAMPO ISOLADO (PRESERVA O FOCO NO MOBILE) ---
const Field = ({ label, icon: Icon, name, type = "text", placeholder, isTextArea = false, value, onChange, onBlur, error, touched, brandColor }: any) => {
  const hasError = touched && error;
  const isSuccess = touched && !error && value.length > 0;

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold text-slate-500 uppercase ml-1">{label}</label>
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
            style={!hasError ? { "--focus-color": brandColor } as any : {}}
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

const HexagonIcon = ({ icon: Icon, top, left, delay, opacity, size = 24, color }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity, delay: delay, ease: "easeInOut" }}
    className="absolute pointer-events-none z-0 flex items-center justify-center"
    style={{ top, left, opacity }}
  >
    <div 
      className="relative flex items-center justify-center w-16 h-16 bg-white/40 backdrop-blur-md border border-white/50 shadow-inner"
      style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }}
    >
      <Icon size={size} style={{ color: color }} />
    </div>
  </motion.div>
);

const VagaDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  
  const vaga = vagas.find((v) => v.slug === slug);
  const empresa = empresas.find((e) => e.nome === vaga?.empresa);
  const brandColor = empresa?.corPrincipal || "#f7a824";

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

  const maskPhone = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const finalValue = name === "whatsapp" ? maskPhone(value) : value;
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
    if (name === "resumo" && value.trim().length < 10) error = "Conte um pouco mais.";

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação final
    const hasErrors = Object.values(errors).some(err => err !== "");
    const hasEmpty = !form.nome || !form.email || !form.whatsapp || !form.resumo;

    if (hasErrors || hasEmpty) {
      setTouched({ nome: true, email: true, whatsapp: true, cidade: true, resumo: true });
      toast({ variant: "destructive", title: "Ops!", description: "Preencha os campos corretamente." });
      return;
    }

    const msg = encodeURIComponent(
      `Olá! Me chamo ${form.nome}, sou de ${form.cidade} e gostaria de me candidatar à vaga de ${vaga.titulo}.\n\n` +
      `Resumo: ${form.resumo}\n` +
      `Pretensão: ${form.pretensao}\n` +
      `LinkedIn: ${form.linkedin}`
    );
    window.open(`https://wa.me/5535999657668?text=${msg}`, "_blank");
    toast({ title: "Candidatura Iniciada!", description: "Você está sendo redirecionado para o WhatsApp." });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
      
      {/* TOPBAR DINÂMICA */}
      <div 
        className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center border-b border-white/10 backdrop-blur-xl transition-colors"
        style={{ backgroundColor: `${brandColor}CC` }}
      >
        <div className="container mx-auto px-4">
          <Link 
            to="/#vagas" 
            className={`inline-flex items-center gap-3 font-bold text-sm transition-all hover:scale-105 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            <div className={`p-1.5 rounded-full border ${isDark ? 'border-white/30 bg-white/10' : 'border-slate-900/20 bg-black/5'}`}>
              <ArrowLeft size={18} />
            </div>
            Voltar às vagas
          </Link>
        </div>
      </div>

      {/* Camada de Hexágonos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {Array.from({ length: 20 }).map((_, i) => {
          const icons = [User, Briefcase, Target, GraduationCap, Search, FileText, Heart, ShieldCheck];
          return (
            <HexagonIcon
              key={i}
              icon={icons[i % icons.length]}
              top={`${Math.random() * 100}%`}
              left={`${Math.random() * 100}%`}
              delay={Math.random() * 5}
              opacity={0.3 + Math.random() * 0.5}
              size={18 + Math.random() * 12}
              color={brandColor}
            />
          );
        })}
      </div>

      <main className="pt-32 pb-20 container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden"
        >
          {/* Header do Form */}
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
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-l-4 px-3" style={{ borderColor: brandColor }}>Descrição</h3>
                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{vaga.descricaoCompleta}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-l-4 px-3" style={{ borderColor: brandColor }}>Requisitos</h3>
                <ul className="grid gap-2">
                  {vaga.requisitos.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
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
                  label="LinkedIn / Portfólio" name="linkedin" icon={LinkIcon} placeholder="https://..." 
                  value={form.linkedin} onChange={handleChange} onBlur={handleBlur}
                  error={errors.linkedin} touched={touched.linkedin} brandColor={brandColor}
                />
                <Field 
                  label="Pretensão Salarial" name="pretensao" icon={DollarSign} placeholder="R$ 0.000,00" 
                  value={form.pretensao} onChange={handleChange} onBlur={handleBlur}
                  error={errors.pretensao} touched={touched.pretensao} brandColor={brandColor}
                />
              </div>

              <Field 
                label="Resumo Profissional" name="resumo" isTextArea placeholder="Conte-nos por que você é ideal para esta vaga..." 
                value={form.resumo} onChange={handleChange} onBlur={handleBlur}
                error={errors.resumo} touched={touched.resumo} brandColor={brandColor}
              />
            </div>

            <button
              type="submit"
              className="w-full py-6 rounded-3xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] group"
              style={{ backgroundColor: brandColor, color: isDark ? '#fff' : '#0f172a' }}
            >
              Enviar minha candidatura
              <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </main>
      
      <Footer brandColor={brandColor} showLogo={false} />
    </div>
  );
};

export default VagaDetail;