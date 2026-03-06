import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
    name: "grao-de-ouro-careers",
    title: "Grão de Ouro — Painel de Vagas",
    projectId: "lny7ydux",
    dataset: "production",
    basePath: "/studio",
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
});
