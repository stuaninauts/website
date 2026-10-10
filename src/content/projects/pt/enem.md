---
title: Enem
summary: "Um dashboard dos meus simulados do Enem: evolução das notas por área e respostas que eu sabia versus chutei."
year: 2023
context: "Projeto pessoal"
metrics:
  - { value: "25", label: "provas anteriores registradas", note: "edições do Enem de 2009 a 2020" }
  - { value: "23", label: "com acertos sabidos e chutados", note: "por área: quantos acertos eu sabia e quantos chutei" }
stack: [Python, pandas, Shiny for Python, Plotly]
repo: https://github.com/stuaninauts/enem
cover: ../../../assets/projects/enem-cover.jpg
coverAlt: "Fileiras de círculos a nanquim, dos fracos e abertos aos firmes e fechados, o último marcado com um ponto vermelho"
gallery:
  - { src: ../../../assets/projects/enem-overview.png, alt: "Gráfico com as notas de todas as disciplinas", caption: "Notas gerais de todas as disciplinas" }
  - { src: ../../../assets/projects/enem-known.png, alt: "Gráfico comparando questões que eu sabia e chutei por disciplina", caption: "Questões que eu sabia e chutei, por disciplina" }
---

Durante a preparação para a universidade, fiz edições anteriores do Enem como simulado e registrei cada resultado.

## O que eu fiz
- Um registro de cada simulado: acertos por área, nota da redação e quantas respostas eu sabia de fato e quantas chutei.
- Um dashboard em Shiny for Python em cima disso: evolução das notas por área, notas de redação, duas tentativas da mesma prova lado a lado e sabidas versus chutadas por área.

Meu primeiro projeto de dados de ponta a ponta, da coleta dos meus próprios dados a um dashboard interativo.
