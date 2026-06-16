import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import type { Vaga } from "@/data/vagas";

const VAGAS_QUERY = `*[_type in ["vaga", "vagaGrupo", "vagaMaquinas"]] | order(_createdAt desc) {
  "id": _id,
  titulo,
  empresa,
  categoria,
  localizacao,
  descricaoCompleta,
  requisitos,
  beneficios,
  "slug": slug.current,
  uuid
}`;

const slugify = (text: string) =>
    text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const buildVagaSlug = (titulo: string, uuid?: string | null) => {
    const base = slugify(titulo || "vaga");
    const uuidPart = (uuid || "").replace(/-/g, "").slice(0, 8).toLowerCase();
    return uuidPart ? `${base}-${uuidPart}` : base;
};

const toText = (value: unknown): string => {
    if (Array.isArray(value)) return value.filter(Boolean).join("\n");
    if (typeof value === "string") return value;
    return "";
};

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
                return (data || []).map((v: Vaga) => ({
                    ...v,
                    slug: buildVagaSlug(v.titulo, v.uuid),
                    requisitos: toText((v as { requisitos?: unknown }).requisitos),
                    beneficios: toText((v as { beneficios?: unknown }).beneficios),
                }));
            } catch {
                return [];
            }
        },
        staleTime: 1000 * 60 * 5,
    });
}
