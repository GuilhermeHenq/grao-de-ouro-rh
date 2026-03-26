import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import type { Vaga } from "@/data/vagas";

const VAGAS_QUERY = `*[_type in ["vaga", "vagaGrupo", "vagaMaquinas"]] | order(_createdAt desc) {
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
  uuid
}`;

/**
 * Busca todas as vagas do Sanity (todos os tipos).
 * Retorna array vazio se não houver vagas cadastradas.
 */
export function useVagas() {
    return useQuery<Vaga[]>({
        queryKey: ["vagas"],
        queryFn: async () => {
            try {
                const data = await sanityClient.fetch(VAGAS_QUERY);
                return data || [];
            } catch {
                return [];
            }
        },
        staleTime: 1000 * 60 * 5,
    });
}
