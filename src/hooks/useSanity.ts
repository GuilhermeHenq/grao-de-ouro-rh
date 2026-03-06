import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import type { Vaga } from "@/data/vagas";

// ─── Query GROQ ─────────────────────────────────────────────

const VAGAS_QUERY = `*[_type == "vaga"] | order(_createdAt desc) {
  "id": _id,
  titulo,
  empresa,
  categoria,
  localizacao,
  descricaoCurta,
  descricaoCompleta,
  requisitos,
  beneficios,
  "slug": slug.current,
  celular
}`;

// ─── Hook ───────────────────────────────────────────────────

/**
 * Busca todas as vagas do Sanity.
 * Enquanto o Sanity não tiver dados, retorna os dados estáticos como fallback.
 */
export function useVagas() {
    return useQuery<Vaga[]>({
        queryKey: ["vagas"],
        queryFn: async () => {
            try {
                const data = await sanityClient.fetch(VAGAS_QUERY);
                if (data && data.length > 0) return data;
            } catch {
                // Sanity não configurado — usa fallback
            }
            // Fallback: importa dados estáticos
            const { vagas } = await import("@/data/vagas");
            return vagas;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos de cache
    });
}
