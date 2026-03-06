import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
    name: "grao-de-ouro-careers",
    title: "Grão de Ouro — Painel de Vagas",

    // ⚠️ PREENCHA com o Project ID do seu projeto Sanity
    projectId: "lny7ydux",
    dataset: "production",

    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
});
