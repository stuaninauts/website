---
name: ordenar-projetos
description: Change the display order of projects and benchmarks in the site grids (home and /projects) by editing src/data/project-order.ts, then validate with check and build. Use when the user wants to reorder, move up/down, or recategorize projects.
argument-hint: "[nova ordem, ex.: \"enem, fipe\" ou \"enem primeiro\"]"
disable-model-invocation: true
allowed-tools: Read Edit(src/data/project-order.ts) Bash(npm run check) Bash(npm run build) Bash(ls src/content/projects/en)
---

# Ordenar projetos

Pedido: `$ARGUMENTS`

## Ordem atual

!`cat src/data/project-order.ts`

## Projetos existentes (slug = nome do arquivo)

!`ls src/content/projects/en`

## Passos

1. Mostre a ordem atual como lista numerada por categoria, com slug e título (leia o `title` em
   `src/content/projects/en/<slug>.md`).
2. Interprete o pedido. Aceite nomes parciais ou títulos ("enem", "Laya") e movimentos relativos
   ("fipe para o topo", "trocar enem e fipe"). Se estiver ambíguo, ou se não houver pedido, pergunte a nova ordem.
3. Edite **apenas** `src/data/project-order.ts`. Mover um projeto para outra categoria (`projects` ↔ `benchmarks`) é permitido
   se o usuário pedir. Cada slug aparece uma única vez; não invente slugs.
4. Rode `npm run check` e `npm run build`. O build falha se a lista e os arquivos divergirem; corrija e rode de novo.
5. Mostre a ordem final (antes → depois) e lembre que a mudança ficou só no working tree: **não commite**.
