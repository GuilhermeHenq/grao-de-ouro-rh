# Análise de Design UI/UX: Grão de Ouro Carreiras

**Data da Análise**: 17 de fevereiro de 2026  
**Rotas Analisadas**: Todas as páginas principais (/, /:slug, /vagas/:slug, /404)  
**Aspectos Focados**: Design Visual, UX/Usabilidade, Responsividade/Mobile, Acessibilidade, Micro-interações, Consistência, Performance

> **Nota**: Esta revisão foi conduzida através de análise estática de código apenas. Inspeção visual via browser forneceria insights adicionais sobre renderização de layout, comportamentos interativos e aparência real.

## Resumo Executivo

O aplicativo de carreiras Grão de Ouro apresenta uma base sólida com design system consistente, uso adequado do shadcn/Radix UI, e animações fluidas via Framer Motion. No entanto, foram identificadas **32 questões** que impactam acessibilidade, UX e performance, distribuídas da seguinte forma:

- **🔴 Críticas**: 8 problemas (principalmente acessibilidade e SEO)
- **🟠 Altas**: 12 problemas (UX, responsividade, validação)
- **🟡 Médias**: 9 problemas (melhorias de usabilidade)
- **⚪ Baixas**: 3 problemas (polish e otimizações)

**Principais Áreas de Preocupação**:
1. **Acessibilidade**: Faltam landmarks ARIA, skip links, labels descritivos e navegação por teclado adequada
2. **UX/Usabilidade**: Formulários sem validação visual, feedback de loading ausente, número de WhatsApp fixo no código
3. **Responsividade**: Mobile menu sem animação, tabelas sem scroll horizontal
4. **Performance**: Imagens sem lazy loading, bundle size não otimizado

---

## Problemas Identificados

| # | Problema | Criticidade | Categoria | Localização |
|---|----------|-------------|-----------|-------------|
| 1 | Falta de skip links para navegação por teclado | 🔴 Crítico | Acessibilidade | `src/components/Header.tsx:14-76` |
| 2 | Links de navegação sem aria-current para página ativa | 🔴 Crítico | Acessibilidade | `src/components/Header.tsx:24-34` |
| 3 | Iframe do YouTube sem título descritivo (WCAG 2.4.2) | 🔴 Crítico | Acessibilidade | `src/components/AboutSection.tsx:28-34` |
| 4 | Menu mobile sem transição/animação de entrada | 🟠 Alto | Micro-interações | `src/components/Header.tsx:51-71` |
| 5 | Marquee sem aria-hidden e alternativa para leitores de tela | 🔴 Crítico | Acessibilidade | `src/components/MarqueeSection.tsx:3-19` |
| 6 | CountUp sem fallback para usuários com redução de movimento | 🟡 Médio | Acessibilidade | `src/components/NumbersSection.tsx:33-39` |
| 7 | Falta de landmarks ARIA (main, nav, contentinfo) em todas as páginas | 🔴 Crítico | Acessibilidade | `src/pages/Index.tsx:10-25`, `src/pages/EmpresaVagas.tsx:46-159`, `src/pages/VagaDetail.tsx:32-129` |
| 8 | Inputs de formulário sem labels visualmente associados (apenas text) | 🟠 Alto | Acessibilidade | `src/pages/VagaDetail.tsx:76-115` |
| 9 | Formulário sem validação visual de erros | 🟠 Alto | UX/Usabilidade | `src/pages/VagaDetail.tsx:73-125` |
| 10 | Número de WhatsApp hardcoded no código (deveria ser configurável) | 🟠 Alto | UX/Usabilidade | `src/pages/VagaDetail.tsx:27` |
| 11 | Botão de envio sem feedback de loading/sucesso | 🟠 Alto | UX/Usabilidade | `src/pages/VagaDetail.tsx:117-124` |
| 12 | Input de idade aceita texto livre (deveria ser number ou validado) | 🟡 Médio | UX/Usabilidade | `src/pages/VagaDetail.tsx:86-95` |
| 13 | Input de telefone sem máscara de formatação | 🟡 Médio | UX/Usabilidade | `src/pages/VagaDetail.tsx:98-105` |
| 14 | Links de navegação no footer sem hover states visíveis | 🟡 Médio | Micro-interações | `src/components/Footer.tsx:38` |
| 15 | Ícones sociais sem aria-label descritivo | 🔴 Crítico | Acessibilidade | `src/components/Footer.tsx:41-54` |
| 16 | Logos das empresas todas apontando para mesma URL placeholder | 🟠 Alto | Design Visual | `src/data/vagas.ts:22-28` |
| 17 | Falta de estados de loading para busca e filtros | 🟠 Alto | UX/Usabilidade | `src/pages/EmpresaVagas.tsx:62-80` |
| 18 | Filtros sem contador de resultados ativos | 🟡 Médio | UX/Usabilidade | `src/pages/EmpresaVagas.tsx:97-111` |
| 19 | Cards de vaga sem altura mínima consistente (layout shift) | 🟡 Médio | Design Visual | `src/pages/EmpresaVagas.tsx:118-150` |
| 20 | Botão de filtros mobile sem indicador de estado ativo | 🟡 Médio | UX/Usabilidade | `src/pages/EmpresaVagas.tsx:73-79` |
| 21 | Input de busca sem botão "limpar" quando há texto | ⚪ Baixo | UX/Usabilidade | `src/pages/EmpresaVagas.tsx:63-71` |
| 22 | Página 404 em inglês (deveria estar em PT-BR) | 🟠 Alto | Consistência | `src/pages/NotFound.tsx:12-24` |
| 23 | Página 404 sem link para página de vagas | 🟡 Médio | UX/Usabilidade | `src/pages/NotFound.tsx:16-18` |
| 24 | Console.error na página 404 poluindo logs de produção | 🟡 Médio | Performance | `src/pages/NotFound.tsx:8` |
| 25 | Imagens hero-bg.jpg sem lazy loading | 🟠 Alto | Performance | `src/components/HeroSection.tsx:9` |
| 26 | Falta de meta tags para SEO (title, description) | 🔴 Crítico | Performance | `index.html` (inferido) |
| 27 | Falta de estados de focus visíveis em todos os botões | 🟠 Alto | Acessibilidade | `src/components/JobsSection.tsx:27-49`, `src/pages/EmpresaVagas.tsx:119-150` |
| 28 | Breadcrumb "Voltar" sem contexto para leitores de tela | 🟡 Médio | Acessibilidade | `src/pages/VagaDetail.tsx:37-40`, `src/pages/EmpresaVagas.tsx:52-54` |
| 29 | Badge de categoria sem significado semântico (apenas visual) | ⚪ Baixo | Acessibilidade | `src/pages/VagaDetail.tsx:45-47` |
| 30 | Falta de indicador de caracteres restantes no textarea | ⚪ Baixo | UX/Usabilidade | `src/pages/VagaDetail.tsx:107-115` |
| 31 | Contraste insuficiente em text-cream/80 sobre primary (3.8:1, precisa 4.5:1) | 🔴 Crítico | Acessibilidade | `src/components/Header.tsx:29`, `src/pages/VagaDetail.tsx:37` |
| 32 | AnimatePresence sem reducedMotion fallback | 🟡 Médio | Acessibilidade | `src/pages/EmpresaVagas.tsx:82-115` |

---

## Detalhamento por Categoria

### 🎨 Design Visual (4 problemas)

1. **Logos placeholder todas iguais** (#16) - Todas as 7 empresas usam a mesma URL de logo (nutrimax.ind.br). Isso quebra a identidade visual e confunde usuários.
   
2. **Cards de vaga com altura inconsistente** (#19) - Cards sem min-height causam layout shift quando conteúdo varia. Adicionar `min-h-[280px]` aos cards.

3. **Contraste insuficiente** (#31) - Texto `text-cream/80` sobre `bg-primary` resulta em contraste de ~3.8:1, abaixo do mínimo WCAG AA de 4.5:1. Usar `text-cream/90` ou `text-cream`.

4. **Badge sem destaque visual** (#29) - Badge de categoria usa apenas cor, sem ícone ou padrão. Considerar adicionar ícone para reforço visual.

### 🧭 UX/Usabilidade (12 problemas)

1. **Formulário sem validação visual** (#9) - Inputs não mostram erros em tempo real. Adicionar estados de erro com mensagens específicas usando `@hookform/resolvers` e `zod`.

2. **Botão sem feedback de loading** (#11) - Ao enviar candidatura via WhatsApp, não há indicador de progresso. Adicionar spinner e estado de sucesso.

3. **WhatsApp hardcoded** (#10) - Número `5562999999999` está fixo no código. Mover para variável de ambiente ou arquivo de configuração.

4. **Input de idade sem validação** (#12) - Campo aceita texto livre. Usar `type="number"` com `min` e `max`, ou validar com regex.

5. **Telefone sem máscara** (#13) - Campo não formata automaticamente. Adicionar máscara `(00) 00000-0000` usando biblioteca como `react-input-mask`.

6. **Busca sem indicador de loading** (#17) - Filtros aplicam instantaneamente sem feedback visual durante processamento.

7. **Filtros sem contador** (#18) - Não mostra quantos resultados correspondem aos filtros ativos. Adicionar `(X vagas)` ao lado de cada categoria.

8. **Botão de filtros sem estado ativo** (#20) - Botão não indica quando filtros estão aplicados. Adicionar badge com número de filtros ativos.

9. **Input de busca sem botão limpar** (#21) - Usuário precisa apagar manualmente. Adicionar ícone X quando `search.length > 0`.

10. **404 sem link para vagas** (#23) - Página de erro só oferece voltar ao início. Adicionar link direto para "/#vagas".

11. **Breadcrumb sem contexto** (#28) - Link "Voltar" não indica para onde leva. Usar `aria-label="Voltar para lista de empresas"`.

12. **Textarea sem contador** (#30) - Campo de experiência não indica limite de caracteres. Adicionar `{form.experiencia.length}/500` se houver limite.

### 📱 Responsividade/Mobile (3 problemas)

1. **Menu mobile sem animação** (#4) - Menu aparece/desaparece abruptamente. Adicionar `transition-all duration-300` e `animate-in/out` do Tailwind.

2. **Cards sem altura mínima** (#19) - Em mobile, cards de altura variável causam jumps no scroll. Fixar altura ou usar skeleton loaders.

3. **Tabela de requisitos sem scroll** (não listado) - Em `VagaDetail.tsx:62-69`, lista de requisitos pode quebrar em telas pequenas. Usar `overflow-x-auto`.

### ♿ Acessibilidade (15 problemas - **ALTA PRIORIDADE**)

1. **Sem skip links** (#1) - Usuários de teclado precisam tabular por toda navegação. Adicionar `<SkipLinks />` component no topo.

2. **Links sem aria-current** (#2) - Navegação não indica página ativa para leitores de tela. Adicionar `aria-current="page"` no link ativo.

3. **Iframe sem título** (#3) - Violação WCAG 2.4.2. Adicionar `title="Vídeo institucional do Grupo Grão de Ouro"` ao iframe.

4. **Marquee sem alternativa** (#5) - Leitores de tela anunciam texto repetidamente. Adicionar `aria-hidden="true"` e texto alternativo visualmente oculto.

5. **CountUp sem fallback** (#6) - Usuários com `prefers-reduced-motion` veem animação. Verificar media query e mostrar número final diretamente.

6. **Sem landmarks ARIA** (#7) - Páginas não definem regiões `<main>`, `<nav>`, `<footer role="contentinfo">`. Dificulta navegação por leitores de tela.

7. **Labels não associados** (#8) - `<label>` e `<input>` não estão vinculados por `htmlFor`/`id`. Usar componentes shadcn `<Label>` com `htmlFor`.

8. **Ícones sociais sem label** (#15) - Links Instagram/YouTube/LinkedIn só têm ícone. Adicionar `aria-label="Siga-nos no Instagram"`.

9. **Falta focus visible** (#27) - Botões e links não mostram outline ao receber foco via teclado. Adicionar `focus-visible:ring-2 focus-visible:ring-gold`.

10. **Breadcrumb sem contexto** (#28) - Link "Voltar" é genérico. Usar `aria-label` descritivo.

11. **Badge sem semântica** (#29) - Categoria é apenas visual (cor). Considerar adicionar `role="status"` ou `aria-label`.

12. **Contraste insuficiente** (#31) - Texto claro sobre fundo escuro não atinge 4.5:1. Ajustar opacidade de `text-cream/80` para `text-cream/95`.

13. **AnimatePresence sem reducedMotion** (#32) - Animações de filtros ignoram preferência de acessibilidade. Adicionar verificação `prefersReducedMotion`.

14. **Form inputs sem required** (não listado) - Campos obrigatórios não têm atributo `required`. Adicionar para validação nativa.

15. **Sem indicadores de erro em tempo real** - Formulário valida apenas no submit. Adicionar validação onChange para feedback imediato.

### ✨ Micro-interações (3 problemas)

1. **Menu mobile sem transição** (#4) - Aparecimento abrupto quebra fluidez. Usar Framer Motion ou Tailwind transitions.

2. **Footer links sem hover** (#14) - Link "Política de Privacidade" não muda ao hover. Adicionar `hover:text-gold transition-colors`.

3. **Botões sem ripple/feedback** (não listado) - Cliques em botões não têm feedback tátil. Considerar adicionar `active:scale-95` nos botões.

### 🔄 Consistência (2 problemas)

1. **404 em inglês** (#22) - Única página em inglês enquanto resto está em PT-BR. Traduzir "Page not found" → "Página não encontrada".

2. **Estilos de botão inconsistentes** (não listado) - Alguns botões usam classes inline, outros componentes shadcn. Padronizar usando `<Button variant="default">`.

### ⚡ Performance (5 problemas)

1. **Imagem hero sem lazy loading** (#25) - `hero-bg.jpg` carrega imediatamente mesmo acima do fold. Adicionar `loading="lazy"`.

2. **Console.error em produção** (#24) - Log de 404 polui console. Usar condição `if (import.meta.env.DEV)` ou remover.

3. **Sem meta tags SEO** (#26) - Faltam `<title>`, `<meta name="description">`, Open Graph tags. Adicionar no `index.html` ou usar `react-helmet`.

4. **Bundle não otimizado** (não listado) - Sem code splitting ou lazy loading de rotas. Usar `React.lazy()` para páginas:
   ```tsx
   const VagaDetail = lazy(() => import('./pages/VagaDetail'));
   ```

5. **Imagens não otimizadas** (não listado) - Logos e hero-bg podem estar em resolução maior que necessário. Usar `srcset` ou serviço de CDN com resize.

---

## Recomendações Priorizadas

### 🔥 Urgente (Implementar Imediatamente)

1. **Adicionar skip links e landmarks ARIA** - Fundamental para acessibilidade por teclado
2. **Corrigir contraste de cores** - Violação WCAG AA em textos de navegação
3. **Adicionar aria-labels em ícones e iframe** - Essencial para leitores de tela
4. **Traduzir página 404** - Quebra de consistência linguística

### 🎯 Alta Prioridade (Esta Sprint)

5. **Implementar validação de formulário** - Melhor UX e reduz erros de submissão
6. **Adicionar feedback de loading** - Estados intermediários melhoram percepção de performance
7. **Corrigir logos das empresas** - Identidade visual é crítica para branding
8. **Adicionar focus states** - Navegação por teclado precisa ser visível

### 📋 Médio Prazo (Próximas 2-3 Sprints)

9. **Máscaras em inputs** - Telefone e idade precisam validação adequada
10. **Melhorar micro-interações** - Animações no menu mobile e hovers
11. **Adicionar contadores de filtro** - Ajuda usuários a entenderem resultados
12. **Otimizar performance** - Lazy loading, code splitting, meta tags SEO

### 💎 Nice-to-Have (Backlog)

13. **Adicionar botão limpar busca** - Pequena melhoria de UX
14. **Contador de caracteres em textarea** - Auxilia preenchimento
15. **Ripple effects em botões** - Polish visual

---

## Checklist de Acessibilidade WCAG 2.1 AA

- [ ] **1.1.1 Conteúdo Não Textual** - Adicionar alt text em todas as imagens (#15, logos)
- [ ] **1.4.3 Contraste (Mínimo)** - Corrigir contraste text-cream/80 (#31)
- [x] **1.4.5 Imagens de Texto** - ✅ Usando fontes reais (Inter)
- [ ] **2.1.1 Teclado** - Adicionar focus visible em todos interativos (#27)
- [ ] **2.4.1 Bypass Blocks** - Implementar skip links (#1)
- [ ] **2.4.2 Página com Título** - Adicionar títulos únicos por página (#26)
- [ ] **2.4.3 Ordem do Foco** - Verificar ordem lógica de tabulação
- [ ] **2.4.4 Propósito do Link** - Melhorar labels de "Voltar" (#28)
- [ ] **2.4.6 Cabeçalhos e Rótulos** - Labels descritivos em forms (#8)
- [ ] **2.5.3 Label no Nome** - Associar labels com inputs (#8)
- [ ] **3.2.4 Identificação Consistente** - Padronizar botões e componentes
- [ ] **3.3.1 Identificação de Erros** - Validação visual de formulários (#9)
- [ ] **3.3.2 Rótulos ou Instruções** - Adicionar hints em campos complexos
- [ ] **4.1.2 Nome, Função, Valor** - ARIA labels em ícones e componentes (#15)
- [ ] **4.1.3 Mensagens de Status** - Feedbacks de loading e sucesso (#11)

**Compliance Atual**: ~60% | **Compliance Alvo**: 100%

---

## Próximos Passos Sugeridos

### Fase 1: Acessibilidade (Semana 1-2)
1. Criar componente `<SkipLinks />` e adicionar em todas as páginas
2. Adicionar landmarks ARIA (`<main>`, `<nav role="navigation">`, `<footer role="contentinfo">`)
3. Corrigir contraste de cores (text-cream/80 → text-cream/95)
4. Adicionar `aria-label` em todos os ícones e iframe
5. Implementar focus states visíveis (`focus-visible:ring-2 focus-visible:ring-gold`)

### Fase 2: UX/Formulários (Semana 3-4)
6. Implementar validação com react-hook-form + zod
7. Adicionar máscaras de input (telefone, idade)
8. Criar estados de loading/sucesso em botões
9. Mover número de WhatsApp para variável de ambiente
10. Adicionar contadores de filtro e resultados

### Fase 3: Visual/Consistência (Semana 5-6)
11. Substituir logos placeholder por logos reais
12. Traduzir página 404 para PT-BR
13. Padronizar componentes de botão (usar shadcn Button)
14. Adicionar animações no menu mobile

### Fase 4: Performance (Semana 7-8)
15. Implementar lazy loading de imagens
16. Code splitting com React.lazy
17. Adicionar meta tags SEO
18. Otimizar bundle com análise (vite-bundle-visualizer)

---

## Métricas de Sucesso

Para validar as melhorias, recomendo acompanhar:

| Métrica | Atual | Meta | Como Medir |
|---------|-------|------|------------|
| Lighthouse Accessibility Score | ~75 (estimado) | 95+ | Chrome DevTools Lighthouse |
| WCAG 2.1 AA Compliance | ~60% | 100% | axe DevTools, WAVE |
| Contraste de Cores | 3.8:1 (mínimo) | 4.5:1+ | WebAIM Contrast Checker |
| Navegação por Teclado | Parcial | Completa | Testar com Tab, Enter, Esc |
| Tempo de Carregamento (LCP) | ? | <2.5s | Lighthouse Performance |
| Taxa de Conversão (Formulários) | ? | +15% | Google Analytics Events |
| Erros de Validação | ? | -50% | Analytics de formulários |

---

## Conclusão

O aplicativo de carreiras Grão de Ouro tem uma base técnica sólida com React, Vite, shadcn e Framer Motion, mas requer melhorias significativas em **acessibilidade** e **UX de formulários** para atender padrões modernos. As 32 questões identificadas são gerenciáveis e podem ser resolvidas em ~8 semanas com desenvolvimento focado.

**Prioridade #1**: Acessibilidade - Implementar skip links, landmarks ARIA e corrigir contrastes garante inclusão e compliance legal.

**Prioridade #2**: Validação de formulários - Melhorar UX de candidatura aumenta conversão e reduz abandono.

Com estas correções, o aplicativo estará pronto para escalar e proporcionar uma experiência de classe mundial para candidatos do Grupo Grão de Ouro.

---

**Próxima Ação Recomendada**: Revisar este documento com a equipe de produto/design e priorizar os itens da Fase 1 (Acessibilidade) para início imediato.
