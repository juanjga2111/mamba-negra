---
name: drive-sync
description: Identifies changed docs and prepares export-ready versions for Google Drive distribution to the MNL team
---

# Drive Sync — Export Documents for MNL Team

When this skill is invoked, prepare documents from the repo for upload to MNL's Google Drive.

**Rule**: Repo = source of truth. Drive = read-only copy for the team. If there is a conflict, repo wins. Never edit in Drive.

## Step 1: Identify what changed

Check git status and recent modifications in these directories:
- `clients/mamba-negra/strategy/` — Estrategia docs
- `clients/mamba-negra/knowledge/` — Playbooks and verticals
- `clients/mamba-negra/adoption/` — Training materials
- `clients/mamba-negra/measurement/reports/` — Reports

Compare against `drive-sync/exports/` to find files that are new or updated since last export.

## Step 2: Determine export targets

Map repo files to Drive structure:

| Repo source | Drive folder | Format |
|-------------|-------------|--------|
| strategy/VISION.md | Estrategia/ | PDF |
| strategy/ROADMAP.md | Estrategia/ | PDF |
| strategy/AI-MATURITY.md | Estrategia/ | PDF |
| knowledge/modash-playbook.md | Playbooks/ | PDF |
| knowledge/verticals/*.md | Playbooks/Perfiles por Vertical/ | PDF |
| strategy/PROCESS-AI-MAP.md | Playbooks/ | PDF |
| adoption/AI-LITERACY.md | Capacitacion/ | PDF |
| adoption/TRAINING-PLAN.md | Capacitacion/ | PDF |
| measurement/reports/*.md | Reportes/ | PDF |

## Step 3: Prepare export-ready versions

For each file that needs exporting:

1. Copy the markdown content
2. Add a footer: `Fuente: repo openclaw-agency | Fecha: YYYY-MM-DD`
3. Name using convention: `[Title] YYYY-MM v[N].md` (e.g., "Roadmap 2026-03 v1.md")
4. Save to `drive-sync/exports/` organized by Drive folder structure
5. Remove any internal notes, TODOs, or `[FILL]` placeholders — these are not for the team

## Step 4: Generate sync manifest

Create or update `drive-sync/exports/MANIFEST.md` with:

```
# Drive Sync Manifest
Ultima sincronizacion: [date]

| Archivo | Version | Drive destino | Estado |
|---------|---------|--------------|--------|
| [filename] | v[N] | [folder] | Nuevo/Actualizado |
```

## Step 5: Report

Tell Juan Jose:
- How many files need uploading
- Which are new vs updated
- Any files with `[FILL]` placeholders that should NOT be exported yet
- Reminder: upload manually to Google Drive (no API automation yet)

## Frequency guidelines
- Estrategia: when it changes (max 1x/month)
- Playbooks: when updated with real feedback
- Capacitacion: before each workshop
- Reportes: monthly or quarterly
