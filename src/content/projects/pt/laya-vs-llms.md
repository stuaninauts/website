---
title: Laya vs LLMs
question: "O modelo mais novo é a escolha certa para uma tarefa de decisão real?"
summary: "Um modelo pequeno com um LLM de reserva chegou a 82,2%, empatado com o modelo mais caro a 1/39 do custo."
year: 2026
context: "Projeto pessoal"
metrics:
  - { value: "82,2%", label: "acurácia, modelo pequeno + LLM", note: "o mesmo LLM sozinho: 79,2%" }
  - { value: "US$ 35", label: "por 1 milhão de reclamações", note: "modelo mais caro: US$ 1.367" }
  - { value: "76,8%", label: "Laya ajustado", note: "45% sem ajuste; gpt-5.4-mini: 77,1%" }
  - { value: "1 ms", label: "baseline TF-IDF", note: "empatou com o gpt-5.4-mini (77,2% vs 77,1%)" }
stack: [Python, Hugging Face Transformers, OpenAI API, scikit-learn, ModernBERT, Laya, Ollama]
repo: https://github.com/stuaninauts/bench-laya-vs-llms
cover: ../../../assets/projects/laya-vs-llms-cover.jpg
coverAlt: "Desenho a nanquim de uma bica de bambu enchendo uma bacia de pedra; só um fio de água transborda para um lago largo, levando uma folha vermelha"
figure:
  src: ../../../assets/projects/laya-cascade_cost.png
  alt: "Gráficos de barras de acurácia e custo por milhão de reclamações: três modelos GPT sozinhos versus três cascatas que mandam só os casos duvidosos para o gpt-5.6-luna"
  caption: "As cascatas mandam só os casos duvidosos para o LLM (limiar de confiança 0,7)."
gallery:
  - { src: ../../../assets/projects/laya-cost_vs_accuracy.png, alt: "Gráfico de dispersão de custo por milhão de decisões versus acurácia de cada sistema", caption: "Custo vs acurácia" }
---

O Laya é a versão open-source do Jev, um modelo "System 1" que toma decisões tipadas com probabilidades calibradas em vez de gerar texto. Aqui ele enfrenta outros 12 sistemas nas mesmas 1.800 reclamações.

## Resultados
- **Sem ajuste, o Laya não está pronto:** 45% de acurácia zero-shot, com probabilidades mal calibradas.
- **Ajustado, ele empata com o gpt-5.4-mini** (76,8% vs 77,1%), com calibração melhor e latência 12x menor.
- **O mais novo não foi o melhor:** o ModernBERT, backbone do próprio Laya, ajustado do jeito tradicional chegou a 78,8%, e uma regressão logística com TF-IDF de 20 linhas empatou com o gpt-5.4-mini em 1 ms.
- **Os LLMs foram lentos e confiantes demais:** cerca de 1 s por decisão; quando o gpt-5.4-mini dizia 97% de chance de fraude, acertava 62% das vezes.
- **Combinar modelos deu o melhor resultado:** o ModernBERT responde quando está confiante (74% das reclamações) e repassa o resto para o gpt-5.6-luna.

## Como foi medido
- 1.800 reclamações de consumidores do mercado financeiro americano (CFPB, base pública), cada uma encaminhada a uma de 9 equipes e checada para relato de fraude; outras 3.600 para treino.
- 13 sistemas: ML clássico, modelos pequenos ajustados, LLMs locais (Ollama) e modelos GPT via API. Versões e preços de setembro e outubro de 2026.
- Acurácia, calibração, latência e custo por milhão de reclamações. Todos responderam às mesmas reclamações, então as comparações são pareadas e testadas estatisticamente.
- Tudo o que rodou localmente usou uma RTX 3060; as chamadas de API do experimento inteiro custaram cerca de US$ 2,20.

<details>
<summary>Limitações</summary>

- Os rótulos são o que o consumidor escolheu num formulário, então o teto fica abaixo de 100%.
- O conjunto de teste é balanceado por equipe e enriquecido de fraude (21,2%), diferente da produção.
- Só inglês, uma divisão e uma semente por modelo, o mesmo prompt para todos os LLMs.
- O Jev em si não foi testado (acesso antecipado).

</details>
