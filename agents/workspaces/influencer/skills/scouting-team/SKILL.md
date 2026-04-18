# SKILL: Scouting Team (Flujo Z con equipo de workers)

## Trigger

Activa este skill cuando el usuario pida scouting **end-to-end desde un brief**, con volumen alto o profundidad de analisis que justifique spawneo de workers:

- "arranca scouting completo para [marca]"
- "scouting end-to-end"
- "brief nuevo, necesito shortlist con analisis profundo"
- "shortlist + deep dive para [marca]"
- "dame 15-20 candidatos con score y copy comercial"
- Llega un brief del Google Form y hay que procesarlo automaticamente

**NO uses este skill cuando:**
- El usuario ya tiene perfiles propuestos y solo pide evaluarlos → usa `scouting-shortlist`
- Es un deep dive de UN solo perfil → llama directo a `sessions_spawn scout-report`
- Solo es analisis de video → llama directo a `sessions_spawn scout-video`

**Regla maestra:** este skill implementa un **Flujo Z con 2 checkpoints humanos obligatorios**. Nunca saltes un checkpoint aunque el usuario insista ("dale, mandale, confio"). La cuota de Discovery es limitada — un checkpoint saltado = queries desperdiciadas.

---

## Arquitectura del skill

Eres el **orquestador**. Tienes 3 workers que corren en paralelo:

| Worker | ID spawn | Funcion | Modelo | Costo |
|---|---|---|---|---|
| Discovery | `scout-discovery` | Busqueda masiva + rankeo preliminar | Flash | Discovery pool + Tavily + Drive |
| Report Pro | `scout-report` | Deep dive de 1 perfil + BGC + copy comercial | Pro | 1 Analytical Report + 3 Tavily |
| Video | `scout-video` | Analisis de 1 video vs brief | Pro | 0 (Gemini Video) |

---

## STEP 1 — INTERPRETACION (tu directo, 0 costo)

### 1.0 Crear workbook de la campaña (copia de la plantilla V2)

Por cada campana nueva, haces una copia de la plantilla maestra V2 y trabajas sobre esa copia. El nombre de la copia sigue el formato `Scouting [Marca] [YYYY-MM-DD]`.

```bash
# Plantilla maestra V2 — NUNCA escribir sobre esta
TEMPLATE_V2_ID=1cIcbnvb6IXqEb76p4ezgzvcBrtOL3KTwk1uDQjUjk3E

# Copiar para la campana
gog sheets copy $TEMPLATE_V2_ID "Scouting [Marca] $(date +%Y-%m-%d)"
# Guardar el ID retornado (campo `file.id` en el JSON) — lo vas a usar en todos los STEPs siguientes
```

La plantilla V2 tiene 8 tabs, en orden logico de trabajo:

| Tab | Rol | Quien lo llena |
|-----|-----|----------------|
| ESTRATEGIA & CRITERIOS SCOUT | Hereda estrategia de Estratega/Creative + criterios derivados + checkpoints + consumo | Scout (STEP 1), CM (CHECKPOINTS) |
| DISCOVERY | 15-40 candidatos, con columna "Fit cualitativo (CM)" que llena el CM | scout-discovery (STEP 2), CM (CHECKPOINT 2) |
| FINALISTAS DEEP DIVE | Deep dive de los 5-8 finalistas (report + video + media consolidados) | scout-report + scout-video (STEP 3) |
| PROPUESTA 1 | Propuesta final para cliente con cifras negociadas (original MNL) | Equipo comercial post-aprobacion |
| PROPUESTA 2 | Propuesta alternativa (original MNL) | Equipo comercial |
| COMPARATIVO | Cruce propuesta 1 vs 2 (original MNL) | Equipo comercial |
| EXPERIENCIA/EVENTO | Costos proveedores evento (original MNL) | Equipo de produccion |
| CHECK LIST EVENTO | Checklist operativa dia del evento (original MNL) | Equipo de produccion |

NOTA: la V2 inicialmente tiene los 3 tabs nuevos al final. Antes de empezar a usar la plantilla en produccion, alguien debe reordenar los tabs una vez (drag manual) para que ESTRATEGIA & CRITERIOS SCOUT → DISCOVERY → FINALISTAS DEEP DIVE esten al inicio. Todas las copias que se hagan DESPUES del reorden heredan el orden correcto.

---

## STEP 0 — GATE DE ARRANQUE: Estrategia cerrada (obligatorio antes de nada)

El Scout NUNCA arranca sin estrategia aprobada. Esto evita gastar queries Discovery contra criterios pre-maduros que despues cambien.

### 0.1 Consultar Campaign Strategy Index

```bash
gog sheets get 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --json
```

Localiza la fila por `Campaña` (columna A) o `Marca` (columna B). Extrae:
- **Folder ID** (columna C)
- **Estado General** (columna D) — tiene que contener "Aprobada" para arrancar (ej: "Estrategia v2 Aprobada")
- Brand Voice (columna F), Metodologia (columna G), Strategic Thinking (columna H), Ultima Actualizacion (columna L)

### 0.2 Gate duro: verificar estado

Si columna D NO contiene "Aprobada":

```
Estrategia de [Marca] no esta aprobada (estado actual: "[valor col D]").
No puedo arrancar Discovery porque los criterios pueden cambiar.

Necesito que Mar/Mae cierren la fase estrategia y actualicen el Campaign Strategy Index a "Aprobada". Arranco cuando eso pase.

¿Querés que le avise a Mar directamente?
```

Y respondes con `sessions_send estratega` si el usuario lo autoriza. NO avances al STEP 1.

### 0.3 Listar contenido del folder de la campaña

```bash
gog drive ls --parent <Folder_ID> -a ia@mambanegramkt.com
```

Identifica el doc consolidado aplicando estos patrones (en orden de preferencia):
1. Doc que empieza con `MAMBA TRACK` (es el track/resumen ejecutivo)
2. Doc con patron `03-Strategic-Thinking` — tomar la version mas alta (v2 > v1). Este doc tiene el insight + concepto + metodologia
3. Doc con patron `Estrategia [Marca]`
4. Como fallback: el Google Doc mas pesado / recien modificado del folder

Si hay varios candidatos, leer el mas reciente que cumpla el patron. Si no encontras ninguno que calce, avisa al CM:

```
Folder de [Marca] existe pero no encuentro un doc consolidado identificable.
Archivos disponibles:
- [lista]
¿Cual es la estrategia final?
```

### 0.4 Leer el doc consolidado

```bash
gog docs cat <doc_id> -a ia@mambanegramkt.com
```

Extrae de este doc los elementos heredados de la fase Estrategia:
- Brief del cliente
- Insight (de Creative)
- Concepto (de Creative)
- Metodologia (RAYO/ARCO/PRISMA/MAREA)
- Strategic Thinking (resumen)
- Ideas de contenido
- Formatos priorizados
- Plataformas priorizadas
- Objetivo
- Target demografico + psicografico
- Brand voice (si esta referenciado)

Si un elemento no esta claro en el doc, preguntale a la Estratega:
```
sessions_send estratega "Estoy arrancando scouting para [Marca]. En el doc [nombre] no encuentro claro el [elemento]. ¿Me lo confirmas?"
```

---

## STEP 1 — PREPARAR WORKBOOK (tu directo, 0 costo)

### 1.0 Crear workbook de la campana (copia de plantilla V2)

```bash
TEMPLATE_V2_ID=1cIcbnvb6IXqEb76p4ezgzvcBrtOL3KTwk1uDQjUjk3E
gog sheets copy $TEMPLATE_V2_ID "Scouting [Marca] $(date +%Y-%m-%d)"
# Guardar el file.id retornado — lo vas a usar en todos los STEPs siguientes
```

### 1.1 Escribir BLOQUE 1 — ESTRATEGIA HEREDADA (read-only desde Estratega)

Vuelca lo extraido en STEP 0 al Tab `ESTRATEGIA & CRITERIOS SCOUT`, filas 2-20 columna B.

Mapeo exacto:

| Fila | Campo | Valor |
|------|-------|-------|
| 2 | Campaña | columna A del Index |
| 3 | Marca | columna B del Index |
| 4 | Folder Drive (link) | `https://drive.google.com/drive/folders/<Folder_ID>` |
| 5 | Doc principal de estrategia (link) | `https://docs.google.com/document/d/<doc_id>` |
| 6 | Estado en Campaign Strategy Index | columna D del Index |
| 7 | Ultima actualizacion Index | columna L |
| 8 | Estratega responsable | (preguntar si no esta claro) |
| 9 | Brief (resumen 3 lineas) | del doc |
| 10 | Brand Voice (link o resumen) | columna F del Index + link si aplica |
| 11 | Insight | del doc |
| 12 | Concepto | del doc |
| 13 | Metodologia | del doc o columna G del Index |
| 14 | Strategic Thinking (resumen) | del doc o columna H |
| 15 | Ideas de contenido | del doc |
| 16 | Formatos priorizados | del doc |
| 17 | Plataformas priorizadas | del doc |
| 18 | Objetivo | awareness / conversion / brand_building |
| 19 | Target demografico | del doc |
| 20 | Target psicografico | del doc |

```bash
gog sheets update <workbook_id> "ESTRATEGIA & CRITERIOS SCOUT!B2:B20" --values-json '[...]'
```

ESTE BLOQUE ES READ-ONLY EN LA PRACTICA. No lo modifiques despues sin antes validarlo con la Estratega.

### 1.2 DERIVAR criterios cuantitativos (BLOQUE 2)

Este es tu trabajo, no se hereda. Deriva los criterios **a partir del insight + concepto + ideas de contenido + target** que extrajiste:

- **platform**: del campo "Plataformas priorizadas" del bloque 1
- **country**: del target
- **followers_from/to**: tier segun el objetivo (awareness → macro/mega; brand_building → micro/mid)
- **er_min**: awareness 1-1.5%, conversion 2-3%, brand_building 2%+
- **audience_country + audience_prc**: coincidir con target demografico
- **gender, age**: del target
- **aqs_min**: 40 default
- **Tono deseado**: derivado del concepto del bloque 1
- **Tipo de contenido**: derivado de las "Ideas de contenido" del bloque 1
- **Brand fit description**: 1-2 lineas que sinteticen que tipo de perfil encaja con el concepto
- **No-go**: politica + apuestas + competidores del cliente

Escribir en filas 23-42 columna B:

```bash
gog sheets update <workbook_id> "ESTRATEGIA & CRITERIOS SCOUT!B23:B42" --values-json '[...]'
```

### 1.3 Cargar conocimiento de vertical (opcional, complementario)

Si existe `knowledge/verticals/[vertical].md`, leelo para calibrar rangos tipicos del nicho y ajustar tus criterios derivados.

### 1.4 Presentar al CM y pedir aprobacion (CHECKPOINT 1)

El CM NO discute la estrategia (eso ya lo cerro Mar/Mae con Creative). El CHECKPOINT 1 es sobre **si los criterios cuantitativos que derivaste discriminan bien el universo que pide la estrategia**.

Manda al CM un mensaje con formato:

```
Estrategia aprobada de [Marca] leida (doc: [link]).
Insight: [una frase]
Concepto: [una frase]
Formatos/Plataformas: [X en Y]

Criterios que derive para Discovery:
- Plataforma: [X]
- Pais: [Y]
- Seguidores: [from]-[to]
- ER minimo: [N]%
- Audiencia: [X]% en [Y]
- Genero/edad: [si aplica]
- Brand fit: [frase de derivacion]

No-go: [categorias rechazadas]

¿Los criterios capturan bien el universo que la estrategia pide, o ajustamos?
(a) arranco Discovery asi
(b) ajusto [que parametro]
(c) propones perfiles tu mismo (sin Discovery)
```

**REGLA DURA**: ESPERA confirmacion explicita del CM (Juangui, Mar, o Juan Jose). Sin "dale", "ok", "arranca" o ajuste concreto, NO avances al STEP 2. Si el usuario intenta saltar este paso, responde:

> "Necesito tu aprobacion de los filtros antes de lanzar Discovery — cuota limitada. Dame 30 segundos."

Registra quien aprobo (vas a pasarlo al worker como `cm_approved_by`).

### 1.5 Escribir aprobacion CHECKPOINT 1 en el workbook

```bash
gog sheets update <workbook_id> "ESTRATEGIA & CRITERIOS SCOUT!B45:B47" --values-json '[["Juangui"],["2026-05-02 14:30"],["ajusto ER min de 2 a 2.5"]]'
```

---

## STEP 2 — DISCOVERY (spawn scout-discovery, 1-2 queries)

### 2.1 Construir el task JSON

```json
{
  "criteria": {
    "quantitative": {
      "platform": "ig",
      "country": "co",
      "followers_from": 10000,
      "followers_to": 200000,
      "er_min": 2,
      "audience_country": "co",
      "audience_prc": 40,
      "gender": "female",
      "gender_prc": 50,
      "age_from": 18,
      "age_to": 34,
      "age_prc": 30,
      "aqs_min": 40
    },
    "qualitative": {
      "tone": "casual, skincare real",
      "content_type": "tutoriales, rutinas",
      "brand_fit": "autenticidad, sin claims medicos"
    },
    "no_go": ["apuestas", "politica", "cosmetica agresiva"]
  },
  "vertical": "belleza",
  "campaign_type": "brand_building",
  "cm_approved_by": "Juangui",
  "max_pages": 2,
  "reference_profile": "@pautips"
}
```

**Campo obligatorio**: `cm_approved_by` con uno de: Juangui, Mar, Juan Jose. Sin esto, el worker aborta. Es la contraparte del CHECKPOINT 1 a nivel maquina.

### 2.2 Spawn

```
sessions_spawn scout-discovery <task_json>
```

### 2.2.1 Escribir resultados en el Tab DISCOVERY

El worker devuelve JSON con `candidates[]`. Transformar a filas del Tab DISCOVERY (13 columnas: #, Handle, Platform, Followers, ER%, Pais, Nicho, Fuente, Score preliminar, Razon, ¿Finalista?, Fit cualitativo (CM), Notas CM):

```bash
# Ejemplo — ajustar al output real del worker
gog sheets update <workbook_id> "DISCOVERY!A2:M21" --values-json '[
["1","@perfil1","ig","85000","3.2","Colombia","belleza","discover","78","ER alto, audiencia 72% CO","","",""],
...
]'
```

Las columnas K, L y M quedan **vacias** — las llena el CM durante CHECKPOINT 2:
- K "¿Finalista?": SI / NO
- L "Fit cualitativo (CM)": alto / medio / bajo — evaluacion humana real del CM sobre si el perfil encaja con insight/concepto/ideas de contenido
- M "Notas CM": texto libre con razones o caveats

**IMPORTANTE**: No intentes precalcular el Fit cualitativo con un algoritmo. El CM hace esa evaluacion abriendo el perfil en IG/TikTok y viendo su contenido. Esa es su expertise — no la reemplazamos, la facilitamos con data cuantitativa.

### 2.3 Recibir resultado + presentar al CM (CHECKPOINT 2)

El worker devuelve 15-20 candidatos con `source`, `score_preliminary`, `reason`, `followers`, `er`, `consumption`. Presenta tabla compacta al CM:

```
Discovery completado — N resultados (X de discover, Y de search, Z de Drive)
Queries Discovery usadas: N | Queries restantes: M

| # | Handle | Followers | ER% | Fuente | Razon |
|---|--------|-----------|-----|--------|-------|
| 1 | @... | 85K | 3.2 | discover | ER alto para tier, audiencia 72% CO |
| 2 | @... | ... | ... | ... | ... |

Marca los 5-8 finalistas para analisis a fondo. Si queres que analice videos especificos, pegame las URLs.
```

**REGLA DURA**: ESPERA seleccion explicita del CM. No asumas "los 5 primeros". Si CM no responde en 24h, escala a Juan Jose (Telegram 6107170400).

Si el worker retorna `discovery_skipped: "low_quota_preservation"` o error de cuota, avisa al CM en el mismo mensaje.

### 2.4 Registrar CHECKPOINT 2 en el workbook

Una vez el CM marque finalistas (en Tab DISCOVERY o en Telegram):

```bash
gog sheets update <workbook_id> "ESTRATEGIA & CRITERIOS SCOUT!B48:B51" --values-json '[["Juangui"],["2026-05-03 10:15"],["@perfil1, @perfil4, @perfil7, @perfil12, @perfil15"],["@perfil1 alto / @perfil4 medio / @perfil7 alto / ..."]]'
```

---

## STEP 3 — DEEP DIVE (spawn paralelo report + video)

### 3.1 Verificacion previa de creditos

```bash
hypeauditor credits
```

Si `restTokens < 15` cuando tengas N finalistas confirmados:
- Informa al CM: "Quedan pocos creditos de HypeAuditor ([X]). Recomiendo reducir finalistas de N a 3-4. Confirmame."
- Espera ajuste.

### 3.2 Por cada finalista marcado — spawn scout-report

```json
{
  "handle": "@influencer",
  "platform": "ig|tiktok",
  "brief": "[resumen 2-3 oraciones]",
  "insight": "[insight de la campana]",
  "campaign_type": "awareness|conversion|brand_building",
  "vertical": "belleza",
  "target": "mujeres 20-35 Colombia, interes skincare",
  "brand_name": "Bivien",
  "competitors": ["Eucerin", "CeraVe", "La Roche Posay"]
}
```

### 3.3 Por cada video señalado — spawn scout-video

```json
{
  "video_url": "https://www.instagram.com/reel/ABC123/",
  "handle": "@influencer",
  "brief": "[resumen]",
  "insight": "[insight]",
  "content_ideas": "Rutina matutina, before/after, tips rapidos",
  "vertical": "belleza",
  "brand_tone": "casual, real, sin claims medicos"
}
```

Si el CM no especifico URLs: toma el top 3 reels del scout-report en su seccion `last_posts` o, si no esta, del `hypeauditor media @handle --limit 3`.

### 3.4 Todos corren en paralelo

Espera respuestas de los N workers (usualmente 3-8 report + 3-8 video). Timeout sugerido: 5 minutos por worker.

**Costo total STEP 3**: N Analytical Reports + 3N Tavily searches (por scout-report) + 0 para scout-video.

### 3.5 Consolidar report + video en el Tab FINALISTAS DEEP DIVE

Por cada finalista, combina el output de su `scout-report` con el de sus `scout-video` (si hubo) en una fila del Tab FINALISTAS DEEP DIVE (36 columnas). Mapeo:

| Col | Campo | Fuente |
|-----|-------|--------|
| A-E | Handle, Nombre, Platform, Followers, ER total % | scout-report.identidad |
| F-H | BS score, BS mark, BS flags activos | scout-report.brand_safety |
| I-K | % Gender target, % Age target, % CO | scout-report.demographics |
| L-P | % Real, % Suspicious, % Mass, Reachability, Authenticity | scout-report.audience_quality |
| Q-S | % Pos, % Neutral, % Neg | scout-report.sentiment |
| T-X | Post $min, $max, Stories $min, $max, CPM | scout-report.pricing |
| Y-AA | BGC Controversias, Competencia, Percepcion | scout-report.background_check |
| AB-AG | Video: narrative, hook, production, brand fit, CTA, overall | scout-video (promedio de sus videos) |
| AH | Verdict | scout-report |
| AI | Score final | scout-report |
| AJ | Copy comercial | scout-report |

```bash
gog sheets update <workbook_id> "FINALISTAS DEEP DIVE!A2:AJ6" --values-json '[...5 filas con los datos...]'
```

Si un finalista no tiene video analizado, las columnas AB-AG quedan vacias.

---

## STEP 4 — CONSOLIDACION (tu directo, 0 costo API)

### 4.1 Recibir outputs

Cada `scout-report` devuelve JSON con: verdict, score, brand_safety, demographics, audience_quality, sentiment, pricing, background_check, copy_comercial, scoring_breakdown.

Cada `scout-video` devuelve JSON con: narrative, hook, production, brand_fit, brand_safety, originality, cta, engagement_potential, overall_score, verdict.

### 4.2 Consolidar en entrega final

**Formato de salida para el CM:**

```
SHORTLIST CONSOLIDADA — [Marca] — [Fecha]
Creditos usados: N Analytical Reports + M Tavily + X Discovery queries
Queries Discovery restantes: [queries_left post-ejecucion]
Analytical Reports restantes: [restTokens]

TOP [N] PERFILES RECOMENDADOS

[Por cada perfil recomendado, copiar el copy_comercial del scout-report tal cual]

@handle — [Nombre real]
Seguidores: XXK | ER: X.X% | Plataforma: IG/TikTok
Audiencia: X% CO, X% edad target, X% genero target
Fit video (si hay): X.X/10 — [summary del video]

POR QUE ESTE PERFIL:
[del copy_comercial]

RIESGO O NOTA:
[del copy_comercial, si hay]

---

TABLA RESUMEN

| # | Perfil | Score report | Score video | Verdict |
|---|--------|--------------|-------------|---------|
| 1 | @... | 87 | 8.2 | Muy recomendado |
| ... | ... | ... | ... | ... |

DESCARTADOS (con razon):
- @... — brand safety flag en politica
- @... — audiencia real 42% (red flag)
- ...

CRITERIOS DE SCOUTING PARA CM (si campana requiere mas perfiles):
Buscar en: [Plataforma]
Rango: [Seguidores minimo - maximo]
ER minimo: [X%]
Ubicacion: [Ciudad/Pais]
Nicho: [Categoria]
Tono: [Descripcion]
BUSCAR: [caracteristicas a priorizar]
EVITAR: [categorias o señales a descartar]
REFERENCIA: [2-3 perfiles aprobados como ejemplo]
```

### 4.3 Guardar en memoria

Anota en tu memoria (`.learnings/` o MEMORY.md si existe):
```
[SHORTLIST] [Marca] — N perfiles recomendados, criterios: [resumen], fecha: YYYY-MM-DD
[DECISION] [algo que aprendiste sobre el vertical/marca/tipo de perfil que funciono]
```

### 4.4 Actualizar CONSUMO en el workbook (Tab ESTRATEGIA & CRITERIOS SCOUT filas 54-58)

```bash
gog sheets update <workbook_id> "ESTRATEGIA & CRITERIOS SCOUT!B54:B58" --values-json '[
["3 paginas (60 resultados)"],
["5"],
["18"],
["994"],
["92"]
]'
```

(Filas: Discovery queries usadas / Analytical Reports usados / Tavily searches usados / queries_left al cierre / restTokens al cierre)

### 4.4.1 Actualizar Campaign Strategy Index

Al cerrar, actualiza el Index para que la Estratega pueda auditar tu trabajo:

```bash
# Col I = Criterios Scouting (link al workbook), Col J = Shortlist (link), Col L = Última Actualización
gog sheets update 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!I<fila>:L<fila>" --values-json '[["https://docs.google.com/spreadsheets/d/<workbook_id>/","https://docs.google.com/spreadsheets/d/<workbook_id>/#gid=<finalistas_gid>","","'"$(date +%Y-%m-%d)"'"]]'
```

### 4.5 Entregar link del workbook al CM

Mensaje final en Telegram debe incluir:
```
Shortlist lista: [link del workbook en Drive]
Tab DISCOVERY: N candidatos
Tab FINALISTAS DEEP DIVE: N perfiles analizados
Copy comercial por perfil: listo para cliente en Tab FINALISTAS (col AJ)
```

---

## GESTION DE CUOTAS (referencia rapida)

| Recurso | Cuota | Regla |
|---|---|---|
| Discovery queries | ~1000 (`queries_left` — verificar si es diario o mensual, factura dice 5000) | Max 2 paginas por campana default. Worker aborta si <50 restantes |
| Analytical Reports | 100/mes | ~5-8 por campana. Si `restTokens < 15`, alerta + reduce finalistas a 3-4 |
| Tavily | 1000/mes | ~3 por finalista (BGC) + 2 por Discovery fallback |
| AI Scout | 5/mes | Solo si Discovery retorna <5 relevantes Y el CM autoriza explicito |

Si agotas cualquier cuota a mitad de mes: escala a Juan Jose (Telegram 6107170400) y degrada el flujo (solo `search` + Tavily + Drive hasta rebill).

---

## CHECKLIST antes de cerrar la entrega

- [ ] Los 2 checkpoints humanos se respetaron (hay evidencia en la conversacion: aprobacion explicita del CM)
- [ ] `cm_approved_by` se paso al worker scout-discovery
- [ ] Copy comercial de cada perfil esta listo para copiar-pegar a cliente
- [ ] Descartados incluidos con razon
- [ ] Consumo de cuotas reportado en el mensaje final
- [ ] Scouting memorizado en `.learnings/` o memoria
- [ ] Si hay warnings de cuota (queries_left < 100 o restTokens < 15), se avisaron a Juan Jose

---

## EQUIPO MNL (para coordinar y escalar)

| Rol | Nombre | Telegram User ID |
|-----|--------|-------------------|
| AI Strategy Lead | Juan Jose | 6107170400 |
| CM / Campaign Manager | Juan Guillermo (Juangui) | 8028819934 |
| Estratega Senior | Mar (Mariana) | 8086667993 |
| Diseno | Maca | 8675003670 |

Aprobadores validos de filtros Discovery (`cm_approved_by`): Juangui, Mar, Juan Jose.

---

## Notas

- **Version**: V1.0 — 17-Abr-2026
- **Cambios vs V0 (borrador anterior)**: Integrados guardrails de cuota del worker scout-discovery (cm_approved_by, max_pages, umbrales queries_left). Flujo Z explicitamente bloquea avance sin checkpoint. Log de consumo pendiente de Sheet. Aprobadores listados.
- **Diferencia con `scouting-shortlist`**: este skill es end-to-end con workers; `scouting-shortlist` es evaluacion individual cuando ya hay perfiles propuestos por el equipo
- **Dependencias**: workers `scout-discovery`, `scout-report`, `scout-video` desplegados; `hypeauditor` CLI + `reel-analyzer` CLI en VM; gog autenticado; Tavily MCP activo; Discovery API activa
- **Pendiente de testear**: correr 1 E2E con brief real antes de abrir al equipo completo
