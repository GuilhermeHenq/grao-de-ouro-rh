import { defineType, defineField } from "sanity";

const slugify = (text: string) =>
    (text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const buildSlug = (doc: { titulo?: string; uuid?: string }) => {
    const base = slugify(doc?.titulo || "vaga");
    const uuidPart = (doc?.uuid || "").replace(/-/g, "").slice(0, 8).toLowerCase();
    return uuidPart ? `${base}-${uuidPart}` : base;
};

export default defineType({
    name: "vagaMaquinas",
    title: "Vaga — Máquinas",
    type: "document",
    fields: [
        defineField({
            name: "titulo",
            title: "Título da Vaga",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "empresa",
            title: "Empresa",
            type: "string",
            initialValue: "Grão de Ouro Máquinas",
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: "categoria",
            title: "Categoria",
            type: "string",
            options: {
                list: [
                    { title: "Operacional", value: "Operacional" },
                    { title: "Administrativo", value: "Administrativo" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "localizacao",
            title: "Localização",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "uuid",
            title: "UUID da Vaga (FLW)",
            type: "string",
            description: "Identificador único da vaga na FLW. Também usado para gerar o slug da URL e como utm_term no envio.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            description: "Gerado automaticamente a partir do título + parte do UUID. Clique em 'Generate'.",
            options: {
                source: (doc) => buildSlug(doc as { titulo?: string; uuid?: string }),
                maxLength: 120,
            },
        }),
        defineField({
            name: "descricaoCompleta",
            title: "Descrição Completa",
            type: "text",
            rows: 6,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "requisitos",
            title: "Requisitos",
            type: "text",
            rows: 6,
            description: "Cole os requisitos já em tópicos. O texto será exibido preservando as quebras de linha.",
        }),
        defineField({
            name: "beneficios",
            title: "Benefícios",
            type: "text",
            rows: 6,
            description: "Cole os benefícios já em tópicos. O texto será exibido preservando as quebras de linha.",
        }),
    ],
    preview: {
        select: {
            title: "titulo",
        },
        prepare({ title }) {
            return {
                title,
                subtitle: "Grão de Ouro Máquinas",
            };
        },
    },
});
