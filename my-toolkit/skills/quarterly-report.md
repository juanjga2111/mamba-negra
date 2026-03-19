---
name: quarterly-report
description: Compiles metrics from measurement/ and adoption data to generate a Carlos-facing quarterly report in Spanish
---

# Quarterly Report Generator

When this skill is invoked, compile data from the project and generate a quarterly report for Carlos (director of MNL).

## Step 1: Determine reporting period

Identify the quarter being reported:
- Q1: Marzo-Mayo 2026 (Fase Cimientos)
- Q2: Junio-Agosto 2026 (Fase Eficiencia)
- Q3: Septiembre-Noviembre 2026 (Fase Ecosistema)
- Q4: Diciembre 2026 - Febrero 2027 (Fase Ecosistema)

## Step 2: Gather data from all sources

Read these files and extract relevant metrics:

### Efficiency metrics
- `clients/mamba-negra/measurement/BASELINE.md` — "before" numbers
- `clients/mamba-negra/measurement/KPIs.md` — target framework
- `clients/mamba-negra/measurement/reports/` — monthly reports from this quarter

### Adoption metrics
- `clients/mamba-negra/adoption/ADOPTION-METRICS.md` — usage rates, satisfaction scores

### Maturity assessment
- `clients/mamba-negra/strategy/AI-MATURITY.md` — dimension scores at start and end of quarter

### Progress tracking
- `clients/mamba-negra/STATUS.md` — what was accomplished
- `clients/mamba-negra/strategy/ROADMAP.md` — what was planned vs delivered

## Step 3: Calculate key indicators

Compute these for the report:

**Efficiency gains**:
- Time saved per campaign phase (hours) = baseline time - current time
- Total hours saved this quarter = per-campaign savings x number of campaigns
- Estimated COP value = hours saved x average hourly cost

**Quality improvements**:
- Influencer rejection rate change
- Modash credit waste reduction
- Report completeness improvement

**Adoption health**:
- Weekly active users (% of team)
- Messages per agent per week
- Satisfaction score trend
- Unsolicited usage rate

**Maturity movement**:
- Score change per dimension vs start of quarter
- Gap to quarterly target
- Overall average vs target

## Step 4: Generate report

Use `my-toolkit/templates/quarterly-review.md` as the structure. Fill in ALL fields — no `[FILL]` placeholders in the final output.

The report must be:
- In Spanish
- Max 3-4 pages
- Lead with impact (what changed for the business)
- Include "antes vs despues" comparisons wherever possible
- Highlight wins prominently (Carlos needs ammunition to justify investment)
- Be honest about what did NOT work — with explanation and corrective action
- End with clear decisions needed from Carlos for next quarter

## Step 5: Generate executive summary

Create a 5-line executive summary suitable for WhatsApp (Carlos often reads updates on mobile):

```
REPORTE TRIMESTRAL — MNL Transformacion IA
Periodo: [dates]

[1 line: biggest win]
[1 line: maturity score movement]
[1 line: adoption highlight]
[1 line: main challenge]
[1 line: key decision needed]

Reporte completo en Drive.
```

## Step 6: Save and prepare for distribution

- Save report to `clients/mamba-negra/measurement/reports/quarterly-[QN]-[year].md`
- Flag the report for drive-sync export
- Remind Juan Jose to schedule a 30-min meeting with Carlos to present

## Data gaps

If data is missing for any metric:
- Do NOT guess or fabricate numbers
- Mark as "Sin datos — [reason]"
- Recommend how to collect it for next quarter
- Suggest proxy metrics if available (e.g., if no time tracking, use message volume as engagement proxy)
