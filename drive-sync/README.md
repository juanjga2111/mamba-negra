# Drive Sync — Distribucion de Documentos al Equipo MNL

**Ultima actualizacion**: 17 Marzo 2026
**Responsable**: Juan Jose (AI Strategy Lead)

---

## Regla de Oro

**Repo = fuente de verdad. Drive = copia de lectura para el equipo.**

- Si hay conflicto entre repo y Drive, el repo gana. Siempre.
- Nunca se edita en Drive. Las ediciones van al repo y se re-exportan.
- El equipo MNL consume documentos desde Drive, no desde el repo.

---

## Estructura en Google Drive de MNL

```
MNL — Transformacion IA/
├── Estrategia/
│   ├── Vision y Norte 12 meses.pdf
│   ├── Roadmap 3-6-12 meses.pdf
│   └── AI Maturity Assessment.pdf
├── Playbooks/
│   ├── Modash Playbook.pdf
│   ├── Perfiles por Vertical/
│   │   ├── Consumo Masivo.pdf
│   │   ├── Belleza.pdf
│   │   ├── Inmobiliario.pdf
│   │   ├── Calzado.pdf
│   │   └── Servicios.pdf
│   └── Process-AI Map (9 fases).pdf
├── Capacitacion/
│   ├── Guia de uso — PM Bot.pdf
│   ├── Guia de uso — Estratega Bot.pdf
│   ├── Guia de uso — Admin Bot.pdf
│   └── Programa de Alfabetizacion IA.pdf
└── Reportes/
    ├── Baseline (Marzo 2026).pdf
    └── Reporte Trimestral Q2.pdf
```

---

## Mapeo Repo → Drive

| Archivo en Repo | Destino en Drive | Categoria |
|-----------------|------------------|-----------|
| `strategy/VISION.md` | Estrategia/Vision y Norte 12 meses.pdf | Estrategia |
| `strategy/ROADMAP.md` | Estrategia/Roadmap 3-6-12 meses.pdf | Estrategia |
| `strategy/AI-MATURITY.md` | Estrategia/AI Maturity Assessment.pdf | Estrategia |
| `strategy/PROCESS-AI-MAP.md` | Playbooks/Process-AI Map (9 fases).pdf | Playbooks |
| `knowledge/modash-playbook.md` | Playbooks/Modash Playbook.pdf | Playbooks |
| `knowledge/verticals/*.md` | Playbooks/Perfiles por Vertical/*.pdf | Playbooks |
| `adoption/AI-LITERACY.md` | Capacitacion/Programa de Alfabetizacion IA.pdf | Capacitacion |
| `adoption/TRAINING-PLAN.md` | Capacitacion/Guias de uso por bot | Capacitacion |
| `measurement/BASELINE.md` | Reportes/Baseline (Marzo 2026).pdf | Reportes |
| `measurement/KPIs.md` | Reportes/ (incluido en trimestrales) | Reportes |

---

## Frecuencia de Sincronizacion

| Categoria | Frecuencia | Trigger |
|-----------|------------|---------|
| **Estrategia** | Cuando cambia (maximo 1x/mes) | Cambio aprobado por Carlos |
| **Playbooks** | Cuando se actualiza con feedback del equipo | Post-sesion o post-campana |
| **Capacitacion** | Antes de cada workshop | 24h antes del taller |
| **Reportes** | Mensual o trimestral | Cierre de periodo |

---

## Formato de Exportacion

### Conversion
- **Formato**: Markdown → PDF
- **Herramienta**: Manual por ahora (VS Code + extensiones, o Pandoc). Automatizar en futuro.

### Convencion de Nombres
- Incluir fecha: `"Roadmap 2026-03 v1.pdf"`
- Si hay version actualizada: `"Roadmap 2026-04 v2.pdf"`
- No usar espacios excesivos ni caracteres especiales

### Footer Obligatorio
Cada PDF exportado debe incluir al final:

```
Fuente: repo openclaw-agency | Fecha: YYYY-MM-DD | Version: vX
```

---

## Proceso de Exportacion

### Quien exporta
Juan Jose (AI Strategy Lead) — unica persona con acceso al repo.

### Cuando exportar
1. Despues de que un documento se actualice y el cambio sea aprobado
2. Antes de workshops o sesiones con el equipo
3. Al cierre de cada periodo de medicion (mensual/trimestral)

### Como exportar (proceso manual actual)
1. Verificar que el archivo en el repo esta en su version final
2. Convertir de Markdown a PDF
3. Nombrar con la convencion de fecha y version
4. Subir a la carpeta correspondiente en Google Drive de MNL
5. Notificar al equipo si es un documento nuevo o un cambio relevante

### Automatizacion futura
- Posible integracion con n8n para exportacion automatica
- Trigger: commit en archivos especificos → genera PDF → sube a Drive
- Estado: NO INICIADO — priorizar cuando el volumen de exportaciones lo justifique

---

## Directorio `exports/`

La carpeta `drive-sync/exports/` almacena temporalmente los PDFs generados antes de subirlos a Drive.

- No es almacenamiento permanente — los PDFs se suben y se pueden borrar localmente
- Util para revision antes de subir
- No trackear PDFs en git (agregar a `.gitignore` si se usa git)

---

**Estado**: V1 — Estructura definida, proceso manual operativo
**Proximo paso**: Crear carpetas en Google Drive de MNL y hacer primera exportacion despues de validar documentos con Carlos
