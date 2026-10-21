---
title: Fipe
summary: "A dashboard to explore Brazilian car prices from the FIPE table: rankings, filters and price history by model."
year: 2023
context: "Team project with @gpl27"
metrics:
  - { value: "374k", label: "price records", note: "93 brands, about 6,700 models" }
  - { value: "20", label: "years of prices", note: "January of each year, 2004 to 2023" }
stack: [Python, pandas, Shiny for Python, Plotly]
repo: https://github.com/stuaninauts/fipe
cover: ../../../assets/projects/fipe-cover.jpg
coverAlt: "Ink drawing of a vintage car under a ginkgo branch, with fallen leaves forming a descending line and one red leaf still falling"
gallery:
  - { src: ../../../assets/projects/fipe-ranking.png, alt: "Price ranking chart with advanced filters", caption: "Price ranking with advanced search" }
  - { src: ../../../assets/projects/fipe-model.png, alt: "Price history chart for a car model", caption: "Price history by model name" }
---

The FIPE table is the reference for vehicle prices in Brazil. My part of this team project was the data analysis and the dashboard.

## What I built
- A pandas pipeline that merges 20 yearly snapshots of the table (January of each year, collected from the FIPE website) into one dataset.
- A Shiny for Python dashboard: price rankings filtered by brand, model, year, fuel and transmission.
- Price history for a single car, found by model name. A license plate lookup relied on a third-party site and was retired.

The hosted version (AWS EC2) has been retired.
