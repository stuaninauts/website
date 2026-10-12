# 0002: Apresentação dos projetos

**Data:** 2026-10-09 · **Status:** aceita · **Revisada:** 2026-10-12 (card sem números)

## Decisões
- **Frase objetiva, sem números.** `summary` (até 120 caracteres) diz o que o projeto faz ou, no benchmark, o que foi
  testado. Vai no card, no topo da página e na meta description. Benchmarks também declaram a pergunta (`question`).
- **Card desacoplado do repositório:** capa, título, a frase e até 3 itens de stack. Sem datas e sem números, em
  projeto e em benchmark. Resultados mudam no repo do projeto; assim o card não precisa mudar junto.
- **Números na página.** `metrics` vira stat tiles, até 4, só na página do projeto.
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
