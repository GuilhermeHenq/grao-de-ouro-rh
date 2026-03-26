import { defineType, defineField } from "sanity";

export default defineType({
    name: "vagaGrupo",
    title: "Vaga — Grupo",
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
            options: {
                list: [
                    { title: "Grão de Ouro", value: "Grão de Ouro" },
                    { title: "Nutrimax", value: "Nutrimax" },
                    { title: "Forte Grãos", value: "Forte Grãos" },
                    { title: "Nutrividas", value: "Nutrividas" },
                ],
                layout: "dropdown",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "categoria",
            title: "Categoria",
            type: "string",
            options: {
                list: [
                    { title: "Administrativo", value: "Administrativo" },
                    { title: "Operacional", value: "Operacional" },
                    { title: "Comercial", value: "Comercial" },
                    { title: "Técnico", value: "Técnico" },
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
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: { source: "titulo", maxLength: 120 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "descricaoCurta",
            title: "Descrição Curta",
            type: "text",
            rows: 2,
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: "descricaoCompleta",
            title: "Descrição Completa",
            type: "text",
            rows: 5,
        }),
        defineField({
            name: "requisitos",
            title: "Requisitos",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "beneficios",
            title: "Benefícios",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "uuid",
            title: "UUID da Vaga (FLW)",
            type: "string",
            description: "Identificador único da vaga na FLW. Será usado como utm_term no envio.",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "titulo",
            subtitle: "empresa",
        },
    },
});
