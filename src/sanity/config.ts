import { defineConfig, Template } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { deskStructure } from "./deskStructure";

const templates: Template[] = [
    {
        id: "vaga-grupo",
        title: "Vaga — Grupo Grão de Ouro",
        schemaType: "vaga",
        value: { empresa: "Grão de Ouro" },
    },
    {
        id: "vaga-maquinas",
        title: "Vaga — Grão de Ouro Máquinas",
        schemaType: "vaga",
        value: { empresa: "Grão de Ouro Máquinas" },
    },
];

export default defineConfig({
    name: "grao-de-ouro-careers",
    title: "Grão de Ouro — Painel de Vagas",
    projectId: "lny7ydux",
    dataset: "production",
    basePath: "/studio",
    plugins: [
        structureTool({ structure: deskStructure }),
        visionTool(),
    ],
    schema: {
        types: schemaTypes,
        templates: (prev) => [...prev, ...templates],
    },
});
