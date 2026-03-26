---
name: drive-sync
description: Converts repo docs to .docx via pandoc and uploads to Google Drive with native formatting (headings, tables, bold)
---

# Drive Sync — Export Documents for MNL Team

When this skill is invoked, convert repo documents to .docx via pandoc and upload them to the MNL Google Drive folder with full native formatting.

**Rule**: Repo = source of truth. Drive = read-only copy for the team. If there is a conflict, repo wins. Never edit in Drive.

## Prerequisites

- `pandoc` installed (PATH: `C:\Users\juanj\AppData\Local\Pandoc`)
- Google Drive MCP configured (mcp__google-drive__*)

## Google Drive Folder IDs

| Folder | ID |
|--------|-----|
| Mamba Negra Labs (root) | `1tE794Tge_-QU_M8wUqZB2nD8QU_4LVWj` |
| Estrategia/ | `1BW7IrsmFvdUh3WgusDlM98jYs2UoluqP` |
| Playbooks/ | `1ZUCEujuthzfN-HvHf_Jc8FTodvb9iTkE` |
| Playbooks/Perfiles por Vertical/ | `12Jb4PElrbzUqGq8bElm6OcGn9c041-_L` |
| Capacitacion/ | `1SWC6z8pHcO15ZEBntawOGbNvjQIrYqt2` |
| Reportes/ | `1s29Om6FWDRPfeQIQ1WgIZfw0QLpenHu5` |

## Step 1: Identify what changed

Check git status and recent modifications in these directories:
- `clients/mamba-negra/strategy/` — Estrategia docs
- `clients/mamba-negra/knowledge/` — Playbooks and verticals
- `clients/mamba-negra/adoption/` — Training materials
- `clients/mamba-negra/measurement/reports/` — Reports

Compare against `drive-sync/exports/MANIFEST.md` to find files that are new or updated since last export.

## Step 2: Determine export targets

Map repo files to Drive structure:

| Repo source | Drive folder | Drive folder ID |
|-------------|-------------|-----------------|
| strategy/VISION.md | Estrategia/ | `1BW7IrsmFvdUh3WgusDlM98jYs2UoluqP` |
| strategy/ROADMAP.md | Estrategia/ | `1BW7IrsmFvdUh3WgusDlM98jYs2UoluqP` |
| strategy/AI-MATURITY.md | Estrategia/ | `1BW7IrsmFvdUh3WgusDlM98jYs2UoluqP` |
| strategy/OBJECTIVES.md | Estrategia/ | `1BW7IrsmFvdUh3WgusDlM98jYs2UoluqP` |
| strategy/SERVICES.md | Estrategia/ | `1BW7IrsmFvdUh3WgusDlM98jYs2UoluqP` |
| strategy/PROCESS-AI-MAP.md | Playbooks/ | `1ZUCEujuthzfN-HvHf_Jc8FTodvb9iTkE` |
| knowledge/modash-playbook.md | Playbooks/ | `1ZUCEujuthzfN-HvHf_Jc8FTodvb9iTkE` |
| knowledge/campaign-framework.md | Playbooks/ | `1ZUCEujuthzfN-HvHf_Jc8FTodvb9iTkE` |
| knowledge/influencer-scoring.md | Playbooks/ | `1ZUCEujuthzfN-HvHf_Jc8FTodvb9iTkE` |
| knowledge/campaign-process.md | Playbooks/ | `1ZUCEujuthzfN-HvHf_Jc8FTodvb9iTkE` |
| knowledge/verticals/*.md | Playbooks/Perfiles por Vertical/ | `12Jb4PElrbzUqGq8bElm6OcGn9c041-_L` |
| adoption/AI-LITERACY.md | Capacitacion/ | `1SWC6z8pHcO15ZEBntawOGbNvjQIrYqt2` |
| adoption/TRAINING-PLAN.md | Capacitacion/ | `1SWC6z8pHcO15ZEBntawOGbNvjQIrYqt2` |
| adoption/ADOPTION-METRICS.md | Capacitacion/ | `1SWC6z8pHcO15ZEBntawOGbNvjQIrYqt2` |
| adoption/PROCESS-REORG.md | Capacitacion/ | `1SWC6z8pHcO15ZEBntawOGbNvjQIrYqt2` |
| measurement/reports/*.md | Reportes/ | `1s29Om6FWDRPfeQIQ1WgIZfw0QLpenHu5` |

## Step 3: Convert and export via pandoc

For each file that needs exporting:

1. Create a temp copy of the markdown
2. Append footer: `\n\n---\nFuente: repo openclaw-agency | Fecha: YYYY-MM-DD`
3. Remove internal notes, TODOs, `[FILL]` placeholders, and internal repo path references
4. Convert to .docx using pandoc:

```bash
export PATH="$PATH:/c/Users/juanj/AppData/Local/Pandoc"
pandoc "source.md" -f markdown -t docx -o "drive-sync/exports/[Name] YYYY-MM v[N].docx"
```

5. Name using convention: `[Title] YYYY-MM v[N].docx` (e.g., "Vision Transformacion IA 2026-03 v1.docx")

**Pandoc handles automatically**: headings, tables, bold, italic, lists, blockquotes — all as native Word/Google Docs formatting.

## Step 4: Upload to Google Drive

For each .docx file:

```
mcp__google-drive__uploadFile(
  localPath: "C:\\openclaw-agency\\drive-sync\\exports\\[filename].docx",
  name: "[filename].docx",
  parentFolderId: "[target folder ID from table above]",
  convertToGoogleFormat: true
)
```

The `convertToGoogleFormat: true` flag converts the .docx to a native Google Doc on upload. The name MUST end in `.docx` for the conversion to work.

If a previous version exists in the Drive folder, delete it first or rename the new one with incremented version number.

## Step 5: Generate sync manifest

Create or update `drive-sync/exports/MANIFEST.md` with:

```
# Drive Sync Manifest
Ultima sincronizacion: [date]

| Archivo | Version | Drive destino | Drive Doc ID | Estado |
|---------|---------|--------------|--------------|--------|
| [filename] | v[N] | [folder] | [doc ID] | Nuevo/Actualizado |
```

## Step 6: Cleanup

Remove .docx files from `drive-sync/exports/` after upload (they are intermediate artifacts, not source of truth).

## Step 7: Report

Tell Juan Jose:
- How many files were synced
- Which are new vs updated
- Any files with `[FILL]` placeholders that were skipped
- Links to the Google Drive folder

## Frequency guidelines
- Estrategia: when it changes (max 1x/month)
- Playbooks: when updated with real feedback
- Capacitacion: before each workshop
- Reportes: monthly or quarterly
