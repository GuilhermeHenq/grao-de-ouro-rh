import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, User, Briefcase, GraduationCap, Search, 
  Users, Target, FileText, Heart, ShieldCheck, 
  AlertCircle, CheckCircle2, ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// --- COMPONENTE DE CAMPO (FORA DO PAI PARA PRESERVAR FOCO) ---
const Field = ({ label, name, type = "text", placeholder, isTextArea = false, value, onChange, onBlur, error, touched }: any) => {
  const hasError = touched && error;
  const isSuccess = touched && !error && value.length > 0;

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold text-slate-500 uppercase ml-1">{label}</label>
      <div className="relative">
        {isTextArea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={4}
            className={`w-full px-6 py-4 rounded-2xl bg-white border transition-all resize-none outline-none ${
              hasError ? "border-red-500 ring-4 ring-red-500/10" : "border-slate-200 focus:border-[#f7a824]"
            }`}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full px-6 py-4 rounded-2xl bg-white border transition-all outline-none ${
              hasError ? "border-red-500 ring-4 ring-red-500/10" : "border-slate-200 focus:border-[#f7a824]"
            }`}
          />
        )}
        
        <div className="absolute right-4 top-4 flex gap-2">
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

// --- COMPONENTE PRINCIPAL ---
const Candidatar = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nome: "", email: "", whatsapp: "", linkedin: "",
    area: "Administrativo", pretensao: "", resumo: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const finalValue = name === "whatsapp" ? maskPhone(value) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    let error = "";
    if (name === "nome" && value.trim().length < 3) error = "Mínimo de 3 caracteres.";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "E-mail inválido.";
    }
    if (name === "whatsapp" && value.length < 15) error = "WhatsApp incompleto.";
    if (name === "resumo" && value.trim().length < 10) error = "Resumo muito curto.";

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (formData.nome.trim().length < 3) newErrors.nome = "Nome inválido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "E-mail inválido.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ nome: true, email: true, whatsapp: true, resumo: true });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      toast({ title: "Enviado!", description: "Dados registrados com sucesso." });
      setFormData({ nome: "", email: "", whatsapp: "", linkedin: "", area: "Administrativo", pretensao: "", resumo: "" });
      setTouched({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative">
      {/* Top Bar Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-[100] flex items-center">
        <div className="container mx-auto px-4">
          <Link 
            to="/#vagas" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#f7a824] font-bold transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Voltar a vagas
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          <div className="bg-[#5f382c] p-10 text-center text-white">
             <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Banco de Talentos</h1>
             <p className="text-slate-300 italic">Preencha seus dados para futuras oportunidades.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Field 
                label="Nome Completo" name="nome" placeholder="Seu nome" 
                value={formData.nome} onChange={handleChange} onBlur={handleBlur}
                error={errors.nome} touched={touched.nome}
              />
              <Field 
                label="E-mail" name="email" type="email" placeholder="seu@email.com" 
                value={formData.email} onChange={handleChange} onBlur={handleBlur}
                error={errors.email} touched={touched.email}
              />
              <Field 
                label="WhatsApp" name="whatsapp" placeholder="(00) 00000-0000" 
                value={formData.whatsapp} onChange={handleChange} onBlur={handleBlur}
                error={errors.whatsapp} touched={touched.whatsapp}
              />
              <Field 
                label="LinkedIn" name="linkedin" placeholder="https://..." 
                value={formData.linkedin} onChange={handleChange} onBlur={handleBlur}
                error={errors.linkedin} touched={touched.linkedin}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Área de Interesse</label>
                <div className="relative">
                  <select 
                    name="area" value={formData.area} onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-[#f7a824] outline-none appearance-none"
                  >
                    <option>Administrativo</option>
                    <option>Operacional</option>
                    <option>Comercial</option>
                    <option>Logística</option>
                    <option>TI</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none border-t-4 border-t-slate-400 border-l-4 border-l-transparent border-r-4 border-r-transparent"></div>
                </div>
              </div>
              <Field 
                label="Pretensão Salarial" name="pretensao" placeholder="R$ 0.000,00" 
                value={formData.pretensao} onChange={handleChange} onBlur={handleBlur}
                error={errors.pretensao} touched={touched.pretensao}
              />
            </div>

            <Field 
              label="Resumo Profissional" name="resumo" isTextArea placeholder="Conte sobre você..." 
              value={formData.resumo} onChange={handleChange} onBlur={handleBlur}
              error={errors.resumo} touched={touched.resumo}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 rounded-3xl bg-[#f7a824] text-[#5f382c] font-black text-xl hover:brightness-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar Candidatura"}
            </button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Candidatar;