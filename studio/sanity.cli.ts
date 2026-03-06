import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
    api: {
        // ⚠️ PREENCHA com o Project ID do seu projeto Sanity
        projectId: "lny7ydux",
        dataset: "production",
    },
});
