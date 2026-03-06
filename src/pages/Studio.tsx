import { useEffect, useRef } from "react";

/**
 * Página do Sanity Studio embutido.
 * Carregado via lazy loading em /studio para não pesar no bundle principal.
 */
export default function StudioPage() {
    const studioRef = useRef<HTMLDivElement>(null);
    const mountedRef = useRef(false);

    useEffect(() => {
        if (mountedRef.current) return;
        mountedRef.current = true;

        const loadStudio = async () => {
            const { createRoot } = await import("react-dom/client");
            const { Studio } = await import("sanity");
            const { default: config } = await import("@/sanity/config");

            if (studioRef.current) {
                const root = createRoot(studioRef.current);
                // @ts-ignore - Studio works with React 18 via legacy-peer-deps
                root.render(<Studio config={config} />);
            }
        };

        loadStudio();
    }, []);

    return (
        <div
            ref={studioRef}
            style={{ height: "100vh", width: "100vw" }}
        />
    );
}
