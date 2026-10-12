---
title: Laya vs LLMs vs BERT
question: "Is the newest model the right choice for a real decision task?"
summary: "Laya, BERT models and LLMs tested side by side on routing consumer complaints and flagging fraud."
year: 2026
context: "Personal project"
metrics:
  - { value: "82.2%", label: "accuracy, small model + LLM", note: "the same LLM alone: 79.2%" }
  - { value: "US$ 35", label: "per 1M complaints", note: "most expensive model: US$ 1,367" }
  - { value: "76.8%", label: "Laya, fine-tuned", note: "45% zero-shot; gpt-5.4-mini: 77.1%" }
  - { value: "1 ms", label: "TF-IDF baseline", note: "tied with gpt-5.4-mini (77.2% vs 77.1%)" }
stack: [Python, Hugging Face Transformers, OpenAI API, scikit-learn, ModernBERT, Laya, Ollama]
repo: https://github.com/stuaninauts/bench-laya-vs-llms
cover: ../../../assets/projects/laya-vs-llms-cover.jpg
coverAlt: "Ink drawing of a bamboo spout filling a stone basin; only a thin stream overflows toward a wide lake, carrying a red leaf"
figure:
  src: ../../../assets/projects/laya-cascade_cost.png
  alt: "Bar charts of accuracy and cost per 1M complaints: three GPT models alone versus three cascades that send only doubtful cases to gpt-5.6-luna"
  caption: "Cascades send only the doubtful cases to the LLM (confidence threshold 0.7)."
gallery:
  - { src: ../../../assets/projects/laya-cost_vs_accuracy.png, alt: "Scatter plot of cost per million decisions versus accuracy for each system", caption: "Cost vs accuracy" }
---

Laya is the open-source counterpart of Jev, a "System 1" model that makes typed decisions with calibrated probabilities instead of generating text. Here it faces 12 other systems on the same 1,800 complaints.

## Findings
- **Out of the box, Laya isn't ready:** 45% accuracy zero-shot, with badly calibrated probabilities.
- **Fine-tuned, it matches gpt-5.4-mini** (76.8% vs 77.1%), with better calibration and 12x lower latency.
- **The newest option wasn't the best:** ModernBERT, Laya's own backbone, fine-tuned the ordinary way reached 78.8%, and a 20-line TF-IDF + logistic regression tied gpt-5.4-mini in 1 ms.
- **LLMs were slow and overconfident:** about 1 s per decision; when gpt-5.4-mini said 97% fraud, it was right 62% of the time.
- **Combining models gave the best result:** ModernBERT answers when confident (74% of complaints) and passes the rest to gpt-5.6-luna.

## How it was measured
- 1,800 US consumer-finance complaints (CFPB, public), each routed to one of 9 teams and checked for a fraud report; 3,600 more for training.
- 13 systems: classic ML, fine-tuned small models, local LLMs (Ollama) and GPT models via API. Versions and prices as of September and October 2026.
- Accuracy, calibration, latency and cost per 1M complaints. Every system answered the same complaints, so comparisons are paired and tested for significance.
- Local runs on one RTX 3060; the API calls for the whole experiment cost about US$ 2.20.

<details>
<summary>Limitations</summary>

- Labels are what consumers picked in a form, so the ceiling is below 100%.
- The test set is balanced by team and enriched for fraud (21.2%), unlike production.
- English only, one split and one seed per model, the same prompt for every LLM.
- Jev itself was not tested (early access only).

</details>
