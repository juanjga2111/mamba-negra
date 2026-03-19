---
name: mamba-status
description: Shows the Mamba Negra project dashboard — progress by layer, pending items, blockers, and next actions
---

# Mamba Negra Project Status Dashboard

When this skill is invoked, perform the following steps:

## Step 1: Read current state

Read these files to understand the current project state:
- `clients/mamba-negra/STATUS.md` — central dashboard
- `clients/mamba-negra/strategy/ROADMAP.md` — timeline and phase progress
- `clients/mamba-negra/strategy/AI-MATURITY.md` — current maturity levels
- `clients/mamba-negra/adoption/ADOPTION-METRICS.md` — team adoption data

## Step 2: Check each layer

Evaluate the 7 layers of the project and their completion status:

1. **strategy/** — Vision, maturity assessment, roadmap, OKRs, process-AI map
2. **knowledge/** — Campaign framework, influencer scoring, Modash playbook, verticals
3. **adoption/** — AI literacy program, training plan, process reorg, adoption metrics, workshops
4. **agents/** — openclaw.json, workspaces (estratega, pm, admin), n8n workflows
5. **measurement/** — KPIs, baseline, reports
6. **my-toolkit/** — Methodology, agents, templates, skills
7. **drive-sync/** — Exports ready for Google Drive

## Step 3: Generate dashboard

Present the status in this format (in Spanish):

```
MAMBA NEGRA — Dashboard de Proyecto
Fecha: [today]
Fase actual: [Cimientos/Eficiencia/Ecosistema]

CAPAS DEL PROYECTO
| Capa | Progreso | Estado |
|------|----------|--------|
| 1. Estrategia | X% | [emoji] |
| 2. Knowledge | X% | [emoji] |
| 3. Adopcion | X% | [emoji] |
| 4. Agentes | X% | [emoji] |
| 5. Medicion | X% | [emoji] |
| 6. My Toolkit | X% | [emoji] |
| 7. Drive Sync | X% | [emoji] |

BLOQUEADORES ACTIVOS
- [list any blockers found]

PROXIMOS PASOS (top 3)
1. [next action]
2. [next action]
3. [next action]

MADUREZ IA (5 dimensiones)
| Dimension | Nivel | Target 3m |
|-----------|-------|-----------|
```

## Step 4: Flag issues

If any of these conditions are true, flag them prominently:
- A layer has 0% progress (not started)
- STATUS.md is outdated (last update > 2 weeks ago)
- Blockers that depend on Carlos (need his decision)
- Adoption metrics below target
