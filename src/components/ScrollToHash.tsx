import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Remove o '#' para pegar o ID puro
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        // Pequeno delay para garantir que a página Home carregou
        const timer = setTimeout(() => {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [hash, pathname]); // Executa quando o hash ou a rota muda

  return null;
};

export default ScrollToHash;