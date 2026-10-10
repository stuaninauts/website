---
title: Fipe
summary: "A dashboard to explore 20 years of Brazilian car prices: rankings, filters and price history by model or plate."
year: 2023
context: "Team project with @gpl27"
metrics:
  - { value: "374k", label: "price records", note: "93 brands, about 6,700 models" }
  - { value: "20", label: "years of prices", note: "January of each year, 2004 to 2023" }
  - { value: "2", label: "ways to look up a car", note: "by model name or by license plate" }
stack: [Python, pandas, Shiny for Python, Plotly, BeautifulSoup]
repo: https://github.com/stuaninauts/fipe
cover: ../../../assets/projects/fipe-cover.jpg
coverAlt: "Ink drawing of a vintage car under a ginkgo branch, with fallen leaves forming a descending line and one red leaf still falling"
gallery:
  - { src: ../../../assets/projects/fipe-ranking.png, alt: "Price ranking chart with advanced filters", caption: "Price ranking with advanced search" }
  - { src: ../../../assets/projects/fipe-model.png, alt: "Price history chart for a car model", caption: "Price history by model name" }
  - { src: ../../../assets/projects/fipe-plate.png, alt: "Price history chart found through a license plate", caption: "Price history by license plate" }
---

The FIPE table is the reference for vehicle prices in Brazil. My part of this team project was the data analysis and the dashboard.

## What I built
- A pandas pipeline that merges 20 yearly snapshots of the table (January of each year, from the official FIPE API) into one clean dataset.
- A Shiny for Python dashboard: price rankings filtered by brand, model, year, fuel and transmission.
- Price history for a single car, found by model name or by license plate (plate lookup with BeautifulSoup).

The hosted version (AWS EC2) has been retired; the code runs locally.
