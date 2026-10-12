---
title: Enem
summary: "A dashboard of my own ENEM practice exams: score trends by subject and answers I knew versus guessed."
year: 2023
context: "Personal project"
metrics:
  - { value: "25", label: "past exams logged", note: "ENEM editions from 2009 to 2020" }
  - { value: "23", label: "with known vs guessed answers", note: "in 3 areas: humanities, math and natural sciences" }
  - { value: "90% vs 29%", label: "right answers: known vs guessed", note: "2,069 known and 269 guessed answers in 23 exams" }
stack: [Python, pandas, Shiny for Python, Plotly]
repo: https://github.com/stuaninauts/enem
cover: ../../../assets/projects/enem-cover.jpg
coverAlt: "Rows of brushed ink circles, from faint and broken to bold and closed, the last one marked with a red dot"
gallery:
  - { src: ../../../assets/projects/enem-overview.png, alt: "Chart with scores across all subjects", caption: "Scores across all subjects" }
  - { src: ../../../assets/projects/enem-known.png, alt: "Chart comparing known and guessed answers per subject", caption: "Answers I knew versus guessed, per subject" }
---

While preparing for university, I took past editions of ENEM, Brazil's national entrance exam, as practice and logged every result.

## What I built
- A log of every practice exam: right answers per area, essay score, and how many answers I knew versus guessed.
- A Shiny for Python dashboard on top of it: score trends per area, essay scores, two attempts of the same exam side by side, and known versus guessed per area.

My first end-to-end data project, from collecting my own data to an interactive dashboard.
