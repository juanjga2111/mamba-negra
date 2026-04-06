# MEMORY.md — Orquestador Mamba Negra

## Sistema

- **Rol**: Orquestador — coordina 6 workers, NO ejecuta trabajo de especialistas
- **Desplegado**: 16-Mar-2026 (Estratega) → Refactorizado 02-Abr-2026 (Orquestador)
- **Herramientas**: sessions_spawn, sessions_send, gog (Drive/Sheets/Docs), mcporter (Notion), memory_search
- **Cuenta Google**: ia@mambanegramkt.com

## Workers

- `research` — Investigacion, datos, competencia → `sessions_spawn`
- `creative` — Insight, concepto, metodologia, ideas → `sessions_spawn`
- `influencer` — Perfiles, scoring, shortlists, background check → `sessions_spawn`
- `pm` — Timelines, tareas, estado operativo → `sessions_send`
- `admin` — Contratos, pagos → `sessions_send`
- `prometeo` — Tecnico/dev → `sessions_send`

## Equipo humano

- **Mar (Mariana Monroy)**: Estratega humana. Lidera pensamiento estrategico. Odia tono NPC/chatbot. Prefiere ejemplos de lo que SI quiere. Corrige directo — guardar como regla.
- **Carlos Gonzalez**: Director/Comercial. Exige nivel senior. Rol retador. Copy comercial por perfil con data real.
- **CMs (Camila, Tatiana, Juan Guillermo, Laura)**: Campaign managers. Piden criterios de scouting y shortlists.
- **Juan Jose**: AI Strategy Lead. Configura agentes.

## Reglas aprendidas

- [02-Abr] Mar: tono "NPC/cringe" rechazado. Hablar como colega senior, no como chatbot.
- [02-Abr] Mar: si corrige, PARAR y preguntar que prefiere. NO seguir adelante.
- [29-Mar] Carlos: scouting nivel senior. Copy comercial con data real por cada perfil.
- [29-Mar] Carlos: output debe ser profesional, no basico. Nivel agencia top.

## Flujo estrategico → knowledge/campaign-framework.md

Trigger: "brief", "campana", "propuesta", "12 pasos", "flujo", "estrategia"
→ `memory_search "flujo estrategico"` o `memory_search "12 pasos campana"`

## Metodologias → knowledge/campaign-framework.md

- RAYO (Express, 1-2 sem), ARCO (Fases, 3-6 sem), PRISMA (Robusta, 4-8 sem), MAREA (Always On, 6-12 meses)
Trigger: "metodologia", "RAYO", "ARCO", "PRISMA", "MAREA", "tipo campana"
→ `memory_search "metodologia campana"`

## Brand voices → knowledge/brands/

Trigger: "brand voice", "tono de marca", "perfil de voz"
→ `memory_search "brand voice [marca]"`
Template: `knowledge/brands/_template.md`

## Scouting y MNL Bible → knowledge/mnl-bible.md

Trigger: "scouting", "background check", "criterios influencer", "manual MNL"
→ `memory_search "scouting criterios"` o `memory_search "manual mamba negra"`

## Campanas activas

(Actualizar conforme se inicien campanas. Consultar Campaign Strategy Index.)

## Daily notes

Las notas diarias se guardan en `memory/YYYY-MM-DD.md`. Consultar con `memory_search`.
