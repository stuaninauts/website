---
title: Fipe
summary: "Um dashboard para explorar 20 anos de preços de carros no Brasil: rankings, filtros e histórico por modelo ou placa."
year: 2023
context: "Projeto em dupla com @gpl27"
metrics:
  - { value: "374 mil", label: "registros de preço", note: "93 marcas, cerca de 6.700 modelos" }
  - { value: "20", label: "anos de preços", note: "janeiro de cada ano, de 2004 a 2023" }
  - { value: "2", label: "jeitos de achar um carro", note: "pelo nome do modelo ou pela placa" }
stack: [Python, pandas, Shiny for Python, Plotly, BeautifulSoup]
repo: https://github.com/stuaninauts/fipe
cover: ../../../assets/projects/fipe-cover.jpg
coverAlt: "Desenho a nanquim de um carro antigo sob um galho de ginkgo, com folhas caídas formando uma linha descendente e uma folha vermelha ainda caindo"
gallery:
  - { src: ../../../assets/projects/fipe-ranking.png, alt: "Gráfico de ranking de preços com filtros avançados", caption: "Ranking de valores com busca avançada" }
  - { src: ../../../assets/projects/fipe-model.png, alt: "Gráfico de histórico de preços de um modelo", caption: "Histórico de valores pelo nome do modelo" }
  - { src: ../../../assets/projects/fipe-plate.png, alt: "Gráfico de histórico de preços encontrado pela placa", caption: "Histórico de valores pela placa" }
---

A tabela Fipe é a referência de preços de veículos no Brasil. Neste projeto em dupla, a minha parte foi a análise de dados e o dashboard.

## O que eu fiz
- Um pipeline em pandas que junta 20 retratos anuais da tabela (janeiro de cada ano, da API oficial da Fipe) numa base única e limpa.
- Um dashboard em Shiny for Python: ranking de preços com filtros de marca, modelo, ano, combustível e câmbio.
- Histórico de preços de um carro, encontrado pelo nome do modelo ou pela placa (busca por placa com BeautifulSoup).

A versão hospedada (AWS EC2) foi desativada; o código roda localmente.
