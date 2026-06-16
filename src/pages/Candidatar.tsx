import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Field = ({
  label, name, type = "text", placeholder,
  isTextArea = false, value, onChange, onBlur, error, touched, optional
}: any) => {
  const hasError = touched && error;
  const isSuccess = touched && !error && value?.trim().length > 0;
  const isOptional = optional || name === "linkedin";

  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        {label}{" "}
        {isOptional && (
          <span className="text-slate-300 font-normal normal-case">(Opcional)</span>
        )}
      </label>
      <div className="relative">
        {isTextArea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={3}
            className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm transition-all resize-none outline-none placeholder:text-slate-300 ${
              hasError
                ? "border-red-400 ring-2 ring-red-400/10"
                : "border-slate-200 focus:border-[#f7a824] focus:ring-2 focus:ring-[#f7a824]/10"
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
            className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm transition-all outline-none placeholder:text-slate-300 ${
              hasError
                ? "border-red-400 ring-2 ring-red-400/10"
                : "border-slate-200 focus:border-[#f7a824] focus:ring-2 focus:ring-[#f7a824]/10"
            }`}
          />
        )}

        <div
          className={`absolute right-3 flex gap-1.5 ${
            isTextArea ? "top-2.5" : "top-1/2 -translate-y-1/2"
          }`}
        >
          <AnimatePresence mode="wait">
            {hasError && (
              <motion.div
                key="err"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <AlertCircle className="text-red-400" size={15} />
              </motion.div>
            )}
            {isSuccess && (
              <motion.div
                key="ok"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <CheckCircle2 className="text-green-500" size={15} />
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
            className="text-red-500 text-xs"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const Candidatar = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nome: "", email: "", whatsapp: "", linkedin: "",
    area: "Administrativo", pretensao: "", resumo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const maskPhone = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const finalValue = name === "whatsapp" ? maskPhone(value) : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = "";
    if (name === "nome" && value.trim().length < 3) error = "Mínimo de 3 caracteres.";
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "E-mail inválido.";
    }
    if (name === "whatsapp" && value.length < 15) error = "WhatsApp incompleto.";
    if (name === "resumo" && value.trim().length < 10) error = "Resumo muito curto.";
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (formData.nome.trim().length < 3) newErrors.nome = "Nome inválido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "E-mail inválido.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ nome: true, email: true, whatsapp: true, resumo: true });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      toast({ title: "Enviado!", description: "Dados registrados com sucesso." });
      setFormData({
        nome: "", email: "", whatsapp: "", linkedin: "",
        area: "Administrativo", pretensao: "", resumo: "",
      });
      setTouched({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative">
      {/* Background overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'url("https://editalconcursosbrasil.com.br/wp-content/uploads/2018/12/setor-administrativo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md border-b border-slate-100 z-[100] flex items-center">
        <div className="container mx-auto px-4">
          <Link
            to="/#vagas"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#f7a824] font-semibold transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Voltar às vagas
          </Link>
        </div>
      </nav>

      <main className="pt-20 pb-10 container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#5f382c] py-5 px-6 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
              Banco de Talentos
            </h1>
            <p className="text-slate-300 text-sm">
              Preencha seus dados para futuras oportunidades.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 md:p-7 space-y-4">
            {/* Row 1: Nome + Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Nome Completo"
                name="nome"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.nome}
                touched={touched.nome}
              />
              <Field
                label="E-mail"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />
            </div>

            {/* Row 2: WhatsApp + LinkedIn */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="WhatsApp"
                name="whatsapp"
                placeholder="(00) 00000-0000"
                value={formData.whatsapp}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.whatsapp}
                touched={touched.whatsapp}
              />
              <Field
                label="LinkedIn"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedin}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.linkedin}
                touched={touched.linkedin}
              />
            </div>

            {/* Row 3: Area + Pretensao */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Área de Interesse
                </label>
                <div className="relative">
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#f7a824] focus:ring-2 focus:ring-[#f7a824]/10 outline-none appearance-none text-sm text-slate-700"
                  >
                    <option>Administrativo</option>
                    <option>Operacional</option>
                    <option>Comercial</option>
                    <option>Logística</option>
                    <option>TI</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-t-[5px] border-t-slate-400 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent" />
                </div>
              </div>
              <Field
                label="Última Remuneração"
                name="pretensao"
                optional
                placeholder="R$ 0.000,00"
                value={formData.pretensao}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.pretensao}
                touched={touched.pretensao}
              />
            </div>

            {/* Resumo */}
            <Field
              label="Resumo Profissional"
              name="resumo"
              isTextArea
              placeholder="Conte brevemente sobre sua experiência e objetivos..."
              value={formData.resumo}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.resumo}
              touched={touched.resumo}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#f7a824] text-[#5f382c] font-bold text-sm hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  Enviar Candidatura
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Candidatar;
