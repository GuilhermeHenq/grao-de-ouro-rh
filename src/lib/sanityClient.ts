import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "lny7ydux",
    dataset: import.meta.env.VITE_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Gera URL otimizada para imagens hospedadas no Sanity.
 * Uso: urlFor(empresa.image).width(400).url()
 */
export function urlFor(source: any) {
    return builder.image(source);
}
