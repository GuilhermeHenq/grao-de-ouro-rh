import { defineType, defineField } from "sanity";

export default defineType({
    name: "empresa",
    title: "Empresa",
    type: "document",
    fields: [
        defineField({
            name: "nome",
            title: "Nome da Empresa",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: { source: "nome", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "descricao",
            title: "Descrição",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "image",
            title: "Logo da Empresa",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "bgImage",
            title: "Imagem de Fundo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "banner",
            title: "Banner",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "corPrincipal",
            title: "Cor Principal (hex)",
            type: "string",
            description: 'Ex: #5f382c',
        }),
    ],
    preview: {
        select: {
            title: "nome",
            media: "image",
        },
    },
});
