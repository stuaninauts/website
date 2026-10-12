---
title: CopaData
summary: "Checks what fans say about the World Cup against decades of match data, with the verdict rule set before looking."
year: 2026
context: "Personal project"
metrics:
  - { value: "11", label: "World Cups", note: "men's editions, 1986 to 2026" }
  - { value: "708", label: "matches", note: "every match of those editions" }
  - { value: "23", label: "claims tested", note: "in two closed batches" }
  - { value: "7", label: "claims on the site", note: "4 myths and 3 true" }
stack: [Python, pandas, Astro, Observable Plot, pytest, Cloudflare Workers]
repo: https://github.com/stuaninauts/copadata
cover: ../../../assets/projects/copadata-cover.jpg
coverAlt: "Ink painting of an old leather football in tall grass, a goal fading into the mist and one red maple leaf caught in the net"
# Fica fora do site até copa.stuaninauts.com entrar no ar (ADR 0007 do CopaData); aí entra `demo` e a posição em project-order.ts.
draft: true
---

Every World Cup brings back the same claims: 2-0 is the most dangerous lead, the favorite struggles in the knockout, playing at home helps. This project checks them against every men's World Cup since 1986.

## What I built
- A Python pipeline that pulls two public match datasets (Fjelstul for 1986-2022, OpenFootball for 2026), computes time and decision metrics plus team strength by Elo, and exports versioned tables.
- A closed list of claims, each with one measure and a verdict rule written before running it. Claims that came out inconclusive or ambiguous stayed off the site.
- A bilingual Astro site with one page per claim and per thing that was new in 2026, plus an explorer and a method page.
- Charts drawn as SVG at build time, with no script in the browser. Every number on a page is read from the exported data, so a missing one breaks the build.

Data from the Fjelstul World Cup Database (CC-BY-SA 4.0), OpenFootball (CC0) and international results since 1872 (CC0).
