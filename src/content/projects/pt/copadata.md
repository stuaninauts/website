---
title: CopaData
summary: "Confere o que a torcida diz sobre a Copa com décadas de dados de jogos, com a regra do veredito definida antes de olhar."
year: 2026
context: "Projeto pessoal"
metrics:
  - { value: "11", label: "Copas", note: "edições masculinas, de 1986 a 2026" }
  - { value: "708", label: "jogos", note: "todos os jogos dessas edições" }
  - { value: "23", label: "frases testadas", note: "em duas levas fechadas" }
  - { value: "7", label: "frases no site", note: "4 mitos e 3 verdadeiras" }
stack: [Python, pandas, Astro, Observable Plot, pytest, Cloudflare Workers]
repo: https://github.com/stuaninauts/copadata
cover: ../../../assets/projects/copadata-cover.jpg
coverAlt: "Pintura a nanquim de uma bola de couro antiga no capim alto, um gol sumindo na névoa e uma folha de bordo vermelha presa na rede"
# Fica fora do site até copa.stuaninauts.com entrar no ar (ADR 0007 do CopaData); aí entra `demo` e a posição em project-order.ts.
draft: true
---

Toda Copa traz de volta as mesmas frases: 2 a 0 é o placar mais perigoso, o favorito sofre no mata-mata, jogar em casa ajuda. Este projeto confere cada uma com todas as Copas masculinas desde 1986.

## O que eu fiz
- Um pipeline em Python que junta duas bases públicas de jogos (Fjelstul para 1986-2022, OpenFootball para 2026), calcula métricas de tempo e de decisão e a força das seleções por Elo, e exporta tabelas versionadas.
- Uma lista fechada de frases, cada uma com uma medida e uma regra de veredito escritas antes de rodar. As que deram inconclusivo ou ambíguo ficaram fora do site.
- Um site bilíngue em Astro com uma página por frase e por novidade de 2026, além de um explorador e uma página de método.
- Gráficos desenhados em SVG no build, sem script no navegador. Todo número de uma página sai dos dados exportados, então um número que não existe quebra o build.

Dados do Fjelstul World Cup Database (CC-BY-SA 4.0), do OpenFootball (CC0) e de resultados internacionais desde 1872 (CC0).
