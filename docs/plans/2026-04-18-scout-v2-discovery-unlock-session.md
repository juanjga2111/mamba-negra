# Scout V2 — Discovery API Unlock + Strategy Integration

**Fecha**: 2026-04-18
**Status**: Implementado (E2E test pendiente)
**Autor**: Juan José + Claude
**Design base**: `2026-04-15-scout-hypeauditor-v2-design.md` y `-implementation.md`

## Contexto

Sesión post-activación del plan HypeAuditor con API de Discovery. El objetivo fue cerrar el gap entre el diseño Scout V2 (del 15-Abr) y el estado real del sistema, corregir bugs del CLI, alinear el flujo con la fase Estrategia de MNL, e integrar todo al Campaign Strategy Index que ya usa la Estratega.

## Diagnóstico inicial

El usuario pidió verificar si estábamos aplicando mal la API de HypeAuditor para Discovery y ContentMedia. Debugging sistemático reveló tres tipos de problemas:

1. **Parser del CLI desalineado con la doc oficial**: `hypeauditor.mjs` leía `data.result.list` con shape flat (`item.username`, `item.subscribers_count`). La doc oficial retorna `data.result.search_results` con items anidados (`basic.username`, `metrics.subscribers_count.value`). Bug latente que hubiera emergido al activar Discovery.

2. **Códigos de error malinterpretados**: la memoria previa documentaba "code 4 = plan no incluye endpoint". La doc oficial (verificada via WebFetch) lista: 3=Unknown Method, 4=Invalid Token, 8=Invalid Request, 15=Access Denied, 27=No API Access. Probes reales con credenciales válidas devolvieron code 27 para Discovery bloqueado, 15 para reportMedia pre-unlock, 8 para tiktokMedia.

3. **Discrepancia entre propuesta firmada y factura**: la Propuesta Custom de Paula marca ✅ "API de Descubrimiento de Influencers" en Starter sin costo adicional (el +$150 del add-on corresponde a "API de Manejo de Campañas"). La factura STHA20260414-5 emitida lista "Reports API access" — producto distinto al de la propuesta. Soporte inicialmente confirmó que solo Reports API estaba incluido.

## Intervenciones técnicas

### 1. HypeAuditor CLI (`tools/hypeauditor.mjs`)

**Parser fix en `formatDiscover`** — soporta ambas shapes por compatibilidad:
- Primary: `data.result.search_results` con items `{basic, metrics, features}` nested
- Fallback: `data.result.list` con items flat (legacy)
- Agrega `current_page` y `total_pages` al output

**Nuevo comando `hypeauditor media <username>`** — llama `auditor.reportMedia`:
- Devuelve posts cacheados (6-10 posts × perfil) con likes_count, comments_count, video_views_count, er, er_mark, caption, type (post/reel/igtv/carousel)
- 0 créditos si el perfil ya fue reportado previamente (unlocked)
- Flags: `--limit N` (default 10), `--raw` (JSON completo)
- Código 15 "Access denied" si el perfil no fue unlocked

**Deploy**: `/usr/local/bin/hypeauditor.mjs` en VM, wrapper bash en `/usr/local/bin/hypeauditor` carga fnm.

### 2. Estado verificado de endpoints HypeAuditor (17-Abr tarde)

| Endpoint | Status | Notas |
|----------|--------|-------|
| `auditor.suggester` | ✅ Gratis | Baseline de auth |
| `auditor.report?v=2` | ✅ Funciona | 97 Analytical Reports restantes |
| `auditor.tiktok` | ✅ Funciona | — |
| `auditor.reportMedia` | ✅ Post-unlock | Code 15 si el perfil no fue reportado antes |
| `auditor.search` (Discovery) | ✅ **DESBLOQUEADO** | `queries_left` arrancó en 1000, decrementa 1 por llamada |
| `auditor.searchSandbox` | ✅ Funciona | No consume créditos |
| `auditor.tiktokMedia` | ❌ Code 8 "Invalid request" | Probados 8 variantes de params. **NO es plan** (está todo activo), es contrato desconocido. Pendiente de aclaración con Paula |

**Discrepancia de cuota pendiente**: la factura dice "Daily limit: 5000 / Monthly limit: 5000" para Discovery, pero el campo `queries_left` del API arrancó en 1000. No hay endpoint programático para consultar la cuota real del plan. Tres hipótesis a validar con Paula:
- Los 5000 son items/resultados (20 por página → 250 páginas max/mes)
- `queries_left` es rate limit diario separado del mensual
- La factura tiene un error de redacción

### 3. Credenciales y Client ID

La memoria previa tenía `HYPEAUDITOR_ID = 2840388` — incorrecto. El valor real en `.env` de la VM es **2705001**. Token `$2y$04$vUP/...` confirmado por prefix. Memoria corregida.

## Scout V2 — workspaces y skill

### `agents/workspaces/scout-discovery/AGENTS.md` — guardrails duros

Reescrito con sección **GUARDRAILS DE CUOTA** no negociable:

1. Campo `cm_approved_by` obligatorio en el task — sin nombre de aprobador (Juangui/Mar/Juan Jose), worker aborta con error JSON
2. Máximo 2 páginas por default, cap de 5 sin escalar a Juan Jose
3. Revisar Drive (shortlists previas) ANTES de gastar Discovery
4. Verificar `queries_left` post-página 1 — si <100, no paginar más
5. Abort preventivo si `queries_left < 50` al arrancar — degrada a `search` + Tavily + Drive
6. Filtros mínimos obligatorios: platform + country + followers + er_min
7. Nunca gastar Analytical Reports desde este worker

Output JSON extendido con campo `consumption` (pages_used, queries_left_after, tavily_used, drive_used).

### `agents/workspaces/influencer/skills/scouting-team/SKILL.md` — nuevo (V1.0)

Skill que implementa el Flujo Z completo con 2 checkpoints humanos obligatorios. Triggers:
- "arranca scouting completo para [marca]"
- "shortlist + deep dive"
- "brief nuevo necesito shortlist con análisis profundo"
- Llegada automática de brief del Google Form

**STEP 0 — Gate de arranque (estrategia cerrada)**:
- Consulta `Campaign Strategy Index` (sheet `1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c`)
- Verifica columna D "Estado General" contiene "Aprobada"
- Si NO → aborta y escala a Estratega (Mar/Mae) con `sessions_send`
- Si SÍ → localiza Folder ID de la campaña (columna C), busca doc consolidado dentro con patrones: `MAMBA TRACK` > `03-Strategic-Thinking-v[N]` > `Estrategia [Marca]`
- Lee el doc con `gog docs cat` y extrae: brief, insight, concepto, metodología, Strategic Thinking, ideas de contenido, formatos, plataformas, objetivo, target

**STEP 1 — Preparar workbook**:
- Crea copia de Template V2 con nombre `Scouting [Marca] YYYY-MM-DD`
- Escribe BLOQUE 1 (estrategia heredada, filas 2-20) en el Tab `ESTRATEGIA & CRITERIOS SCOUT`
- Deriva criterios cuantitativos del insight/target/plataformas — escribe BLOQUE 2 (filas 23-42)
- Presenta al CM: el CHECKPOINT 1 NO discute la estrategia (ya cerrada por Mar+Musa), discute si los criterios derivados capturan bien el universo

**STEP 2 — Discovery con spawn de worker**:
- Spawnea `scout-discovery` con task JSON que incluye `cm_approved_by`
- Escribe resultados en Tab DISCOVERY (cols A-M)
- Presenta tabla al CM — columnas K/L/M las llena el CM en CHECKPOINT 2 (¿Finalista?, Fit cualitativo, Notas CM)
- Registra aprobación CHECKPOINT 2 en filas 48-51 del Tab ESTRATEGIA

**STEP 3 — Deep dive paralelo**:
- Verifica `restTokens` (Analytical Reports restantes) — si <15, alerta al CM para reducir finalistas
- Spawnea N×`scout-report` + M×`scout-video` en paralelo
- Consolida outputs en Tab FINALISTAS DEEP DIVE (36 columnas agrupadas: identidad, Brand Safety, demographics, audience quality, sentiment, pricing, BGC, video fit, verdict, score, copy comercial)
- `hypeauditor media` se integra aquí solo para finalistas (no en Discovery)

**STEP 4 — Consolidación**:
- Entrega final con copy comercial listo para cliente + descartados con razón + criterios de scouting para CM
- Actualiza BLOQUE 4 del Tab ESTRATEGIA (filas 54-58) con consumo total
- Actualiza Campaign Strategy Index cols I (Criterios Scouting) + J (Shortlist) + L (Última Actualización) → cierra el loop con la Estratega

**Filosofía del fit cualitativo**: explícitamente NO se auto-calcula. El CM abre el perfil en IG/TikTok y evalúa — esa expertise no se reemplaza, se facilita con data cuantitativa.

### TOOLS.md actualizados

- `influencer/TOOLS.md`: Discovery ACTIVO, 97 créditos restantes, comando `media` documentado, tabla de situaciones actualizada
- `scout-discovery/TOOLS.md`: Discovery activo con flags, cuota aclarada (queries_left vs factura), fallbacks si cuota baja
- `scout-report/TOOLS.md`: comando `media` como bonus post-unlock (0 créditos adicionales)

## Google Sheets — Plantilla V2

**Copia maestra creada** del template original `1X741NbqqPrL57tJ3x3Ozx3E9FgWqnXcwHNLV_vQEMgU`:
- ID V2: `1cIcbnvb6IXqEb76p4ezgzvcBrtOL3KTwk1uDQjUjk3E`
- Nombre: `PLANTILLA PROPUESTA INFLUENCERS MN V2 - HACER COPIA (NO USAR)`

**3 tabs nuevos** agregados (pendiente reordenar al inicio manualmente una vez):

1. **ESTRATEGIA & CRITERIOS SCOUT** (61 filas, 4 bloques label/valor):
   - Bloque 1 (filas 2-20): **Estrategia heredada** (read-only) — campaña, marca, folder Drive, doc principal, estado Index, estratega, brief, brand voice, insight, concepto, metodología, strategic thinking, ideas contenido, formatos, plataformas, objetivo, target demográfico/psicográfico
   - Bloque 2 (filas 23-42): **Criterios Scout derivados** — platform, país, followers, ER, audiencia, género, edad, AQS, referencia, tono, tipo contenido, brand fit, no-go, competidores
   - Bloque 3 (filas 45-51): **Checkpoints** — aprobadores, fechas, ajustes, finalistas seleccionados, fit cualitativo consolidado
   - Bloque 4 (filas 54-58): **Consumo total** — Discovery queries, Analytical Reports, Tavily, queries_left/restTokens al cierre

2. **DISCOVERY** (13 columnas, headers en fila 1):
   - A-J: `#`, `Handle`, `Platform`, `Followers`, `ER%`, `País`, `Nicho/Categoría`, `Fuente`, `Score preliminar`, `Razón`
   - K: `¿Finalista?` — lo marca el CM
   - L: `Fit cualitativo (CM)` — evaluación humana (alto/medio/bajo) en CHECKPOINT 2
   - M: `Notas CM` — texto libre

3. **FINALISTAS DEEP DIVE** (36 columnas, headers en fila 1):
   - Identidad (A-E): Handle, Nombre, Platform, Followers, ER
   - Brand Safety (F-H): score, mark, flags activos
   - Demographics match (I-K): % género target, % edad target, % CO
   - Audience Quality (L-P): % real, suspicious, mass, reachability, authenticity
   - Sentiment (Q-S): % pos, neutral, neg
   - Pricing (T-X): post min/max, stories min/max, CPM
   - Background Check (Y-AA): controversias, competencia, percepción
   - Video fit (AB-AG): narrative, hook, production, brand_fit, CTA, overall
   - Veredicto y entrega (AH-AJ): verdict, score final, copy comercial

**Integración con Campaign Strategy Index**:
- El skill cierra el loop actualizando cols I/J/L del Index para que la Estratega audite sin salir del Index
- El Tab ESTRATEGIA & CRITERIOS SCOUT referencia explícitamente el Folder Drive y el doc consolidado de la campaña

## Documentos comerciales

### Email a HypeAuditor support — redactado (ES + EN)

Cubre la discrepancia propuesta ↔ factura en 3 puntos:
1. La propuesta firmada marca ✅ "API de Descubrimiento de Influencers" incluida en Starter sin costo extra
2. El +$150 del add-on en la propuesta corresponde a "API de Manejo de Campañas", no a "Reports API"
3. La factura lista "Reports API access" — producto distinto al de la propuesta

Pide una de dos opciones:
- A (preferida): Activar Discovery API (Client ID 2705001) como figura en la propuesta
- B: Reembolso completo (USD 664) + cancelación

**Estado**: DESPUÉS del envío del email a Paula + support, el plan se activó con Discovery completo (verificado 17-Abr tarde). Email funcionó.

## Pendientes

1. **Reordenar tabs manualmente** en la plantilla V2 una vez (3 tabs nuevos al inicio, antes de PROPUESTA 1). Operación única sobre la maestra — las copias futuras heredan el orden.
2. **Aclarar con Paula**:
   - Contrato exacto de `tiktokMedia` (code 8 "Invalid request" persistente)
   - Discrepancia cuota Discovery (queries_left 1000 vs factura 5000)
3. **Test E2E con brief real** — correr un scouting completo antes de abrir al equipo. Brief sugerido: Arepatón Harina Diana (ya tiene folder preparado con doc MAMBA TRACK).
4. **Log de consumo de créditos** — actualmente se reporta en cada workbook de campaña, pero no hay consolidación global mensual. Evaluar si conviene un Sheet aparte de monitoreo.
5. **Validar con Mar/Mae** los patrones de nombre del doc consolidado dentro del folder (MAMBA TRACK / Strategic-Thinking-v[N] / Estrategia). Si convergen en uno solo, hardcodearlo.

## Archivos modificados/creados

| Path | Tipo | Nota |
|------|------|------|
| `clients/mamba-negra/tools/hypeauditor.mjs` | Modificado | Parser fix + comando `media` |
| `clients/mamba-negra/agents/workspaces/scout-discovery/AGENTS.md` | Modificado | Guardrails duros de cuota |
| `clients/mamba-negra/agents/workspaces/scout-discovery/TOOLS.md` | Modificado | Discovery activo |
| `clients/mamba-negra/agents/workspaces/scout-report/TOOLS.md` | Modificado | Comando `media` post-unlock |
| `clients/mamba-negra/agents/workspaces/influencer/TOOLS.md` | Modificado | Discovery activo, 97 créditos, `media` |
| `clients/mamba-negra/agents/workspaces/influencer/skills/scouting-team/SKILL.md` | Nuevo (V1.0) | Skill end-to-end del Flujo Z |
| Google Drive: `1cIcbnvb6IXq...` | Nuevo | Plantilla V2 con 3 tabs nuevos |
| `~/.claude/.../memory/reference_hypeauditor_api.md` | Reescrito | Estado verificado 17-Abr |
| `~/.claude/.../memory/feedback_hypeauditor_error_codes.md` | Reescrito | Tabla oficial de códigos |
| `~/.claude/.../memory/reference_mamba_scouting_template_v2.md` | Nuevo | Plantilla V2 + ubicaciones de escritura |
| `~/.claude/.../memory/MEMORY.md` | Actualizado | Índice |

VM en sync — todos los archivos de `agents/workspaces/` también fueron desplegados a `/home/juanj/.openclaw/workspaces/` via scp.
