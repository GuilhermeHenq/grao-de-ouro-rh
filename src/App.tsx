import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";
import Candidatar from "./pages/Candidatar";
import Index from "./pages/Index";
import VagaDetail from "./pages/VagaDetail";
import EmpresaVagas from "./pages/EmpresaVagas";
import NotFound from "./pages/NotFound";

const StudioPage = lazy(() => import("./pages/Studio"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/studio/*" element={<Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando Studio...</div>}><StudioPage /></Suspense>} />
          <Route path="/candidatar" element={<Candidatar />} />
          <Route path="/vagas/:slug" element={<VagaDetail />} />
          <Route path="/:slug" element={<EmpresaVagas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;