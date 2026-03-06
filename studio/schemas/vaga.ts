import { defineType, defineField } from "sanity";

export default defineType({
    name: "vaga",
    title: "Vaga",
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
            type: "reference",
            to: [{ type: "empresa" }],
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
    ],
    preview: {
        select: {
            title: "titulo",
            subtitle: "categoria",
        },
    },
});
