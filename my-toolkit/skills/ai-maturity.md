---
name: ai-maturity
description: Runs the 5-dimension AI maturity assessment for Mamba Negra — evaluates Strategy, Operations, Content, Reporting, and Culture on a 1-5 scale
---

# AI Maturity Assessment — 5 Dimensiones

When this skill is invoked, guide Juan Jose through an AI maturity assessment of Mamba Negra Latam.

## The 5 Dimensions

| Dimension | What it measures |
|-----------|-----------------|
| **Estrategia** | Como se define y planifica campanas con IA |
| **Operacion** | Como se ejecutan procesos del dia a dia con IA |
| **Contenido** | Como se genera, analiza y optimiza contenido con IA |
| **Reporting** | Como se mide, reporta y analiza resultados con IA |
| **Cultura** | Cuanto adopta el equipo la IA como parte natural del trabajo |

## Maturity Scale (1-5)

| Level | Name | Description |
|-------|------|-------------|
| 1 | **Manual** | Todo se hace a mano, sin IA |
| 2 | **Asistido** | IA se usa puntualmente (ChatGPT para textos sueltos) |
| 3 | **Integrado** | IA esta en el proceso formal (agentes, workflows definidos) |
| 4 | **Optimizado** | IA mejora metricas medibles vs el proceso manual |
| 5 | **Autonomo** | IA opera con supervision minima, el equipo gestiona excepciones |

## Step 1: Read current state

Read these files for context:
- `clients/mamba-negra/strategy/AI-MATURITY.md` — previous assessment (if exists)
- `clients/mamba-negra/strategy/PROCESS-AI-MAP.md` — current process-AI mapping
- `clients/mamba-negra/adoption/ADOPTION-METRICS.md` — adoption data
- `clients/mamba-negra/measurement/BASELINE.md` — baseline metrics

## Step 2: Evaluate each dimension

For each of the 5 dimensions, assess the current level by asking:

### Estrategia
- Se usan agentes/IA para definir estrategia de campana? (brief parsing, perfil de influencer, propuesta)
- Hay un proceso formal que incluya IA, o es ad-hoc?
- Evidence: Estratega bot usage, strategy outputs quality

### Operacion
- Se usa IA para coordinar tareas, tracking, alertas?
- El PM bot esta integrado al flujo diario?
- Evidence: PM bot adoption, Notion/tracking automation

### Contenido
- Se genera contenido (reportes, propuestas, insights) con asistencia de IA?
- Hay templates pre-llenados por IA?
- Evidence: Report generation time, content quality feedback

### Reporting
- Se consolida data automaticamente para reportes?
- Los reportes incluyen insights generados por IA?
- Evidence: Reporting time reduction, completeness metrics

### Cultura
- El equipo usa IA sin que se lo pidan?
- Proponen nuevos usos?
- Ven IA como herramienta util vs tarea extra?
- Evidence: Weekly usage rates, satisfaction scores, unsolicited usage

## Step 3: Score and compare

Present results in this format:

```
AI MATURITY ASSESSMENT — Mamba Negra Latam
Fecha: [date]
Evaluador: Juan Jose (AI Strategy Lead)

| Dimension | Nivel anterior | Nivel actual | Target 3m | Target 6m | Gap |
|-----------|---------------|-------------|-----------|-----------|-----|
| Estrategia | [N] | [N] | 3 | 4 | [+/-N] |
| Operacion | [N] | [N] | 3 | 4 | [+/-N] |
| Contenido | [N] | [N] | 2 | 3 | [+/-N] |
| Reporting | [N] | [N] | 3 | 4 | [+/-N] |
| Cultura | [N] | [N] | 3 | 3 | [+/-N] |

Promedio: [N.N] → Target 3m: [N.N]

CAMBIOS DESDE ULTIMO ASSESSMENT:
- [dimension]: [explanation of change]

ACCIONES RECOMENDADAS:
1. [action to close biggest gap]
2. [action]
3. [action]
```

## Step 4: Update files

- Update `strategy/AI-MATURITY.md` with new scores and date
- If this is the first assessment, establish it as the baseline
- Compare against targets from the design doc (section 2)

## When to run
- Baseline: before any AI tools are adopted (Week 1)
- Follow-up: every 3 months (aligned with quarterly reports)
- Ad-hoc: when Carlos requests or after major milestones
