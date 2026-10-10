# 0002: Apresentação dos projetos

**Data:** 2026-10-09 · **Status:** aceita

## Decisões
- **Resultado primeiro.** `summary` é uma manchete de uma frase (até 120 caracteres) com o resultado, usada no card,
  no topo da página e na meta description. Benchmarks também declaram a pergunta que respondem (`question`).
- **Números à vista.** `metrics` vira stat tiles: os 2 primeiros no card, até 4 na página.
- **Card:** capa, título, uma frase e até 3 itens de stack. Sem datas. Só benchmarks mostram números no card
  (2 primeiros `metrics`): número no card é resultado, não tamanho. Projeto com um resultado de impacto pode mudar isso.
- **Frase do card:** no benchmark, o resultado; no projeto, o que ele faz. Números de escala do projeto ficam só na página.
- **Página, projeto:** manchete, ano e contexto, links, números, telas em carrossel, "o que eu fiz" em 3 a 4 bullets, stack no fim.
- **Página, benchmark:** pergunta, manchete, números, gráfico-chave fixo (`figure`), contexto curto, resultados (3 a 5 bullets),
  método (3 a 4 bullets), limitações recolhidas em `<details>`, outros gráficos, stack.
- **Carrossel** só a partir de 2 imagens: CSS scroll-snap, JS mínimo bundled (botões e contador revelados pelo script),
  sem autoplay, padrão WAI-ARIA de carrossel; cada imagem abre a versão grande.
- **Datas:** um ano (`year`) na página, junto do contexto; nunca no card.
- **Capa:** escondida na página do projeto em telas pequenas (o visitante acabou de vê-la no card). Capas seguem
  um padrão de arte (sumi-e, washi, um acento vermilion), sem texto nem números; o prompt fica fora do git.
- **Corte de conteúdo:** só entra projeto com resultado claro e verificável nos dados do próprio repositório.

## Regras no build (`src/lib/projects.ts`, `src/content.config.ts`)
- Todo slug precisa estar em `src/data/project-order.ts`.
- Benchmark sem `question` ou com menos de 3 `metrics` falha.
- Limites de tamanho no schema: título 40, manchete 120, pergunta 90, valor do número 14, rótulo 32, nota 60.
